from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import Patient
from .serializers import PatientSerializer

# Retrieves a list of all patients
def list_patients(request):
    patients = Patient.objects.all()
    serializer = PatientSerializer(patients, many=True)
    return JsonResponse(serializer.data, safe=False)


def create_patient(request):
    if request.method == 'POST':
        serializer = PatientSerializer(data=request.POST)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

# Retrieves details of a specific patient
def retrieve_patient(request, patient_id):
    patient = get_object_or_404(Patient, pk=patient_id)
    serializer = PatientSerializer(patient)
    return JsonResponse(serializer.data)

def update_patient(request, patient_id):
    patient = get_object_or_404(Patient, pk=patient_id)
    if request.method == 'POST':
        serializer = PatientSerializer(patient, data=request.POST)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

def delete_patient(request, patient_id):
    patient = get_object_or_404(Patient, pk=patient_id)
    if request.method == 'POST':
        patient.delete()
        return JsonResponse({'message': 'Patient deleted successfully'}, status=204)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
