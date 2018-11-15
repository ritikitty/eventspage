from django.db import models
from django.contrib.auth.models import User

class Event(models.Model):
    name = models.CharField(max_length=150)
    description = models.CharField(max_length=7000)
    
    end_time = models.DateTimeField(null=True)
    place_name = models.CharField(null=True, max_length=100)
    place_location_city = models.CharField(null=True, max_length = 30)
    place_location_country = models.CharField(null=True, max_length = 30)
    place_location_latitude = models.FloatField(null=True, max_length=25)
    place_location_longitude = models.FloatField(null=True, max_length=25)
    place_location_street = models.CharField(null=True, max_length = 30)
    place_location_zip = models.CharField(null=True, max_length=30)
    place_id = models.IntegerField(null=True)
    start_time = models.DateTimeField(null=True)
    id_fb = models.IntegerField(null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True)
    genere = models.CharField(null=True, max_length = 30)
    #created_by = models.CharField(User, max_length = 30)


    def __str__(self):
        return self.name


