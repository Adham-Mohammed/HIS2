# Generated by Django 5.0.4 on 2024-05-15 17:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dicom', '0002_alter_dicomimage_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dicomimage',
            name='id',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
    ]
