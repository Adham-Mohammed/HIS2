import os
from django.conf import settings
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'journalBullet.settings')
django.setup()

# Now you can import and use your Django models
from emr.models import Doctor

# doctor = Doctor.objects.create(username='Sara', password='222')

# doctor.save()
# doctors = Doctor.objects.all()

# for doctor in doctors:
#     print(f"Doctor ID: {doctor.id}, Name: {doctor.username}")

doctor_id = 1  
try:
    doctor = Doctor.objects.get(id=doctor_id)
except Doctor.DoesNotExist:
    print("Doctor does not exist.")
else:
    doctor.delete()
    print("Doctor deleted successfully.")
