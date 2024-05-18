# models.py
from django.db import models

class DICOMImage(models.Model):
    id = models.IntegerField(primary_key=True)  # Explicitly set the ID as the primary key
    metadata = models.TextField(null=True, blank=True)

def dicom_image_upload_path(instance, filename):
    return f'dicom_images/{instance.id}/{filename}'

class DICOMImageFile(models.Model):
    image = models.ForeignKey(DICOMImage, on_delete=models.CASCADE, related_name='images')
    file = models.FileField(upload_to=dicom_image_upload_path)
