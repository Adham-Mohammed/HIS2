from django.db import models

class Doctor(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

class Patient(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    height = models.FloatField()
    weight = models.FloatField()
    drugs = models.TextField()
    tests = models.TextField()
    illness = models.TextField()
    recommendations = models.TextField()
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)