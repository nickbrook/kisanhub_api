from django.db import models


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
    name = models.CharField(max_length=16)


class DataSource(models.Model):
    """
    Where does the data come from? Somewhat over-engineered, but in general I don't like
    hard-coding URLs for data that's fetched from the Web, as they can change. Of course
    so can the data format
    """
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    metric = models.ForeignKey(WeatherMetric, on_delete=models.CASCADE)
    url = models.URLField()


class WeatherMetricReading(models.Model):
    """
    An individual weather metric reading e.g rainfall in mm for Jan 1940
    """
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    metric = models.ForeignKey(WeatherMetric, on_delete=models.CASCADE)
    year = models.PositiveSmallIntegerField()
    month = models.PositiveSmallIntegerField()
    value = models.FloatField()
