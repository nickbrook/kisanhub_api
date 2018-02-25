from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.views import APIView

from apps.weather.models import WeatherMetricReading


class WeatherTimeSeries(APIView):
    def get(self, request, location, metric):
        readings = WeatherMetricReading.objects.filter(source__location__name=location,
                                                       source__metric__code=metric)
        return Response([{'year': r.year, 'month': r.month, 'value': r.value} for r in readings])