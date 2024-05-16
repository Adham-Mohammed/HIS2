# models.py
from django.db import models

class DICOMImage(models.Model):
    id = models.IntegerField(primary_key=True)  # Explicitly set the ID as the primary key
    file = models.FileField(upload_to='dicom_images/')
    metadata = models.TextField(null=True, blank=True)


