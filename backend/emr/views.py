import json
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import Patient
from .serializers import PatientSerializer
from django.views.decorators.csrf import csrf_exempt
from .models import Doctor


# Retrieves a list of all patients
def list_patients(request):
    patients = Patient.objects.all()
    serializer = PatientSerializer(patients, many=True)
    return JsonResponse(serializer.data, safe=False)


@csrf_exempt

def create_patient(request):
    if request.method == 'POST':
        # Parse request data
        data = json.loads(request.body)
        
        # Validate data (you can add more validation as needed)
        if 'name' not in data:
            return JsonResponse({'error': 'Name is required'}, status=400)
        # Assuming 'doctor_id' is the ID of the Doctor you want to assign
        doctor_id = data['doctor']

        # Fetch the Doctor instance corresponding to the ID
        doctor = get_object_or_404(Doctor, pk=doctor_id)
        patient = Patient.objects.create(name=data['name'], age=data['age'],height=data['height'],weight=data['weight'],drugs=data['drugs'], tests=data['tests'],illness=data['illness'],recommendations=data['recommendations'], doctor=doctor)

        # Create patient object
        # patient = Patient(name=data['name'], age=data['age'],height=data['height'],weight=data['weight'],drugs=data['drugs'], tests=data['tests'],illness=data['illness'],recommendations=data['recommendations'],doctor=data['doctor'])      
        # Save patient to database
        patient.save()
        # Return success response
        return JsonResponse({'message': 'Patient created successfully'}, status=201)
    
    # Return error for unsupported request method
    return JsonResponse({'error': 'Only POST method is allowed'}, status=405)



# fetches details of a specific patient
def retrieve_patient(request, patient_id):
    if request.method == 'GET':
        patient = get_object_or_404(Patient, pk=patient_id)
        serializer = PatientSerializer(patient)
        return JsonResponse(serializer.data)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)


@csrf_exempt
def update_patient(request, patient_id):
    if request.method == 'POST':
        patient = get_object_or_404(Patient, pk=patient_id)
        data = json.loads(request.body)

        # Update only the provided fields
        for key, value in data.items():
            setattr(patient, key, value)
        patient.save()
        serializer = PatientSerializer(patient)
        return JsonResponse(serializer.data)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

# Deletes a specific patient
@csrf_exempt
def delete_patient(request, patient_id):
    if request.method == 'POST':
        patient = get_object_or_404(Patient, pk=patient_id)
        patient.delete()
        return JsonResponse({'message': 'Patient deleted successfully'}, status=204)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)


# # Retrieves details of a specific patient
# def retrieve_patient(request, patient_id):
#     patient = get_object_or_404(Patient, pk=patient_id)
#     serializer = PatientSerializer(patient)
#     return JsonResponse(serializer.data)

# def update_patient(request, patient_id):
#     patient = get_object_or_404(Patient, pk=patient_id)
#     if request.method == 'POST':
#         serializer = PatientSerializer(patient, data=request.POST)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data)
#         return JsonResponse(serializer.errors, status=400)
#     else:
#         return JsonResponse({'error': 'Method not allowed'}, status=405)

# def delete_patient(request, patient_id):
#     patient = get_object_or_404(Patient, pk=patient_id)
#     if request.method == 'POST':
#         patient.delete()
#         return JsonResponse({'message': 'Patient deleted successfully'}, status=204)
#     else:
#         return JsonResponse({'error': 'Method not allowed'}, status=405)

# def create_patient(request):
#     if request.method == 'POST':
#         serializer = PatientSerializer(data=request.POST)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data, status=201)
#         return JsonResponse(serializer.errors, status=400)
#     else:
#         return JsonResponse({'error': 'Method not allowed'}, status=405)