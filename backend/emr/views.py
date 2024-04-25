from django.shortcuts import render

from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import Patient
from .serializers import PatientSerializer

def list_patients(request):
    patients = Patient.objects.all()
    serializer = PatientSerializer(patients, many=True)
    return JsonResponse(serializer.data, safe=False)

def create_patient(request):
    # Assuming data is passed via POST request
    serializer = PatientSerializer(data=request.POST)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)

def delete_patient(request, patient_id):
    patient = get_object_or_404(Patient, pk=patient_id)
    patient.delete()
    return JsonResponse({'message': 'Patient deleted successfully'}, status=204)
