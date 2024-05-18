# Generated by Django 5.0.4 on 2024-05-10 17:19

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DICOMImage',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('file', models.FileField(upload_to='dicom_images/')),
                ('metadata', models.TextField(blank=True, null=True)),
            ],
        ),
    ]
