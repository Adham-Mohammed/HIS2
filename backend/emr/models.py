from django.db import models
from django.contrib.postgres.fields import ArrayField, JSONField

class Doctor(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

class Patient(models.Model):
    name = models.CharField(max_length=100)
    age = models.TextField(blank=True, null=True)
    height = models.TextField(blank=True, null=True)
    weight = models.TextField(blank=True, null=True)
    drugs = models.JSONField(default=list)  # Modify this field to use JSONField
    tests = models.JSONField(default=list)  # Modify this field to use JSONField
    illness = models.JSONField(default=list)  # Modify this field to use JSONField
    recommendations = models.JSONField(default=list)  # Modify this field to use JSONField
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)