from concurrent.futures import ThreadPoolExecutor

import requests
from django.core.management.base import BaseCommand

from apps.weather.models import WeatherMetric, Location, WeatherMetricReading, DataSource

METRICS = [
    'Tmax',
    'Tmin',
    'Tmean',
    'Sunshine',
    'Rainfall'
]

LOCATIONS = [
    'UK',
    'Scotland',
    'England',
    'Wales'
]


def parse_line(line):
    """
    Split into (year, [monthly data])
    :param line:
    :return:
    """
    values = [x for x in line.split(" ") if x.strip()][:13]
    # first value is int, rest are float, so parse
    return int(values[0]), [float(x) for x in values[1:]]


def import_data_source(ds: DataSource):
    # This is a trivially small dataset, so there's no real performance penalty in doing this the simple way
    # i.e check for existence of each data point in turn and populate if it's not there.
    # For any larger dataset you'd just find the latest (year,month) in the DB and start populating from there
    print("Importing {}".format(ds.url))
    for year_data in [parse_line(l) for l in requests.get(ds.url).text.split("\r\n")[8:] if l.strip()]:
        year, data_by_month = year_data
        to_add = []
        for month_number, value in enumerate(data_by_month):
            if not WeatherMetricReading.objects.filter(source=ds, year=year, month=month_number+1):
                to_add.append(WeatherMetricReading(source=ds, year=year, month=month_number+1, value=value))
        WeatherMetricReading.objects.bulk_create(to_add)


class Command(BaseCommand):
    help = 'Fetch and store the Metoffice timeseries data'

    def add_arguments(self, parser):
        parser.add_argument('--init', action="store_true", dest='init',
                            help="Completely reinitialise the data i.e delete and "
                                 "repopulate the lot")

    def handle(self, *args, **options):
        if options['init'] or not WeatherMetric.objects.count():
            # nuke from orbit
            WeatherMetric.objects.all().delete()
            Location.objects.all().delete()
            WeatherMetricReading.objects.all().delete()

            all_locs = set()
            for name in LOCATIONS:
                loc = Location.objects.create(name=name)
                all_locs.add(loc)

            all_metrics = []
            for code in METRICS:
                m = WeatherMetric.objects.create(code=code)
                all_metrics.append(m)

            # create data sources
            for loc in all_locs:
                for metric_obj in all_metrics:
                    DataSource.objects.create(metric=metric_obj,
                                              location=loc,
                                              url="https://www.metoffice.gov.uk/pub/data/weather/uk/climate/datasets/"
                                                  "{metric_code}/date/{country}.txt".format(
                                                  metric_code=metric_obj.code, country=loc.name))

        for ds in DataSource.objects.all():
            import_data_source(ds)

        # I'm not entirely convinced that sqlite3 is thread-safe

        # # use threads, because life is too short
        # with ThreadPoolExecutor(4) as executor:
        #     # update all data sources
        #     for ds in DataSource.objects.all():
        #         executor.submit(import_data_source, ds)
