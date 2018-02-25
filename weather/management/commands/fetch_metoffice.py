from django.core.management.base import BaseCommand, CommandError

from weather.models import WeatherMetric, Location, WeatherMetricReading, DataSource

METRIC_TO_URL_KEY = {
    'max temp': 'Tmax',
    'min temp': 'Tmin',
    'mean temp': 'Tmean',
    'sunshine': 'Sunshine',
    'rainfall': 'Rainfall',
}

LOCATIONS = [
    'UK', 'Scotland', 'England', 'Wales'
]


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

            all_metrics = set()
            for metric_name in METRIC_TO_URL_KEY.keys():
                m = WeatherMetric.objects.create(name=metric_name)
                all_metrics.add(m)

            # create data sources
            for loc in all_locs:
                for metric in all_metrics:
                    DataSource.objects.create(metric=metric,
                                              location=loc,
                                              url="https://www.metoffice.gov.uk/pub/data/weather/uk/climate/datasets/"
                                                  "{metric_key}/date/{country}.txt".format(
                                                  metric_key=METRIC_TO_URL_KEY[metric.name], country=loc.name))

