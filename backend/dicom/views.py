# views.py
import json
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import DICOMImage
from .serializers import DICOMImageSerializer
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseBadRequest
import os 
from django.core.exceptions import ObjectDoesNotExist

# Retrieves a list of all DICOM images
def list_dicom_images(request):
    dicom_images = DICOMImage.objects.all()
    serializer = DICOMImageSerializer(dicom_images, many=True)
    return JsonResponse(serializer.data, safe=False)


@csrf_exempt
# update to add 4 imgs or floder  by dina
def add_dicom_image(request): 
    if request.method == 'POST':
        # Check if a DICOM file was uploaded
        if 'file' not in request.FILES:
            return JsonResponse({'error': 'DICOM file not provided'}, status=400)
        
        # Extract other form data
        image_id = request.POST.get('id')
        metadata = request.POST.get('metadata', '')

        # Check if DICOM image with the same ID already exists
        existing_dicom_image = DICOMImage.objects.filter(pk=image_id).exists()
        if existing_dicom_image:
            print("the is file already exists")
            return JsonResponse({'error': f'DICOM image with ID {image_id} already exists'}, status=400)

        # Save the DICOM file
        dicom_file = request.FILES['file']
        # Process and save the DICOM file as needed

        # Save the file as a field in a model
        dicom_image = DICOMImage.objects.create(file=dicom_file, id=image_id, metadata=metadata)
        dicom_image.save()
        
        return JsonResponse({'message': 'DICOM image added successfully'}, status=201)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)


def retrieve_dicom_image(request, image_id):
    if request.method == 'GET':
        # Retrieve specific DICOM image by ID
        dicom_image = get_object_or_404(DICOMImage, pk=image_id)
        serializer = DICOMImageSerializer(dicom_image)
        return JsonResponse(serializer.data)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def delete_dicom_image(request, image_id):
    if request.method == 'DELETE':
        # Retrieve the DICOM image object by ID
        dicom_image = get_object_or_404(DICOMImage, pk=image_id)
        
        # Delete the DICOM image object
        dicom_image.delete()
        
        return JsonResponse({'message': f'DICOM image with ID {image_id} has been deleted'}, status=204)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

# Add handel data base to the model by handy