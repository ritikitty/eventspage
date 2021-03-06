# Generated by Django 2.1.3 on 2018-11-14 13:02

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='event',
            name='end_time',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='genere',
            field=models.CharField(max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='id_fb',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='place_id',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='place_location_city',
            field=models.CharField(max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='place_location_country',
            field=models.CharField(max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='place_location_latitude',
            field=models.FloatField(max_length=25, null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='place_location_longitude',
            field=models.FloatField(max_length=25, null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='place_location_street',
            field=models.CharField(max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='place_location_zip',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='place_name',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='start_time',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='updated_at',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='description',
            field=models.CharField(max_length=7000),
        ),
        migrations.AlterField(
            model_name='event',
            name='name',
            field=models.CharField(max_length=150),
        ),
    ]
