from django.db import models

class Event(models.Model):
    name = models.CharField(max_length=150)
    description = models.CharField(max_length=7000)
    end_time = models.DateTimeField()
    place_name = models.CharField(max_length=100)
    place_location_city = models.CharField(max_length = 30)
    place_location_country = models.CharField(max_length = 30)
    place_location_latitude = models.FloatField(max_length=25)
    place_location_longitude = models.FloatField(max_length=25)
    place_location_street = models.CharField(max_length = 30)
    place_location_zip = models.IntegerField(max_length=8)
    place_id = models.IntegerField(max_length=30)
    start_time = end_time = models.DateTimeField()
    id_fb = models.IntegerField(max_length=30)

    genere = models.CharField(max_length = 30)
    created_by = models.CharField(max_length = 30)


    def __str__(self):
        return self.name
