from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from apps.weather import views

urlpatterns = [
    url(r'^timeseries/(?P<location>.+)/(?P<metric>.+)/$', views.WeatherTimeSeries.as_view()),
]
