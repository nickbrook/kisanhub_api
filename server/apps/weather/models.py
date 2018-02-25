from django.db import models

#
# Fully denormalised data structures in the Django Way
#
# Is this the best / most-efficient way to store this data? Depending on usage: probably not - if you spend most
# of your time working on the data as a whole, then storing in more convenient data structures in MongoDB may
# make more sense. Of course this particular dataset is so small that it's pretty much a moot point: you can hoover
# the whole lot into RAM in ms.
#

class Location(models.Model):
    """
    We need to encompass England, etc and the UK. So what is a country?
    Let's play it safe and have a Location
    """
    name = models.CharField(max_length=255)


class WeatherMetric(models.Model):
    """
    The weather metric e.g min temp, max temp. We could have placed all metrics in the
    same reading for a given month/year, but this is the most generic and extensible approach
    """
    code = models.CharField(max_length=16)


class DataSource(models.Model):
    """
    Where does the data come from for a particular metric and location?
    """
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    metric = models.ForeignKey(WeatherMetric, on_delete=models.CASCADE)
    url = models.URLField()


class WeatherMetricReading(models.Model):
    """
    An individual weather metric reading e.g rainfall in mm for Jan 1940
    """
    class Meta:
        ordering = ['year', 'month']

    source = models.ForeignKey(DataSource, on_delete=models.CASCADE)
    year = models.PositiveSmallIntegerField()
    month = models.PositiveSmallIntegerField()
    value = models.FloatField()
