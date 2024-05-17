import json
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import DICOMImage, DICOMImageFile
from .serializers import DICOMImageSerializer
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseBadRequest
from django.core.files.storage import FileSystemStorage
import os
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist

# Retrieves a list of all DICOM images
def list_dicom_images(request):
    dicom_images = DICOMImage.objects.all()
    serializer = DICOMImageSerializer(dicom_images, many=True)
    return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def add_dicom_image(request):
    if request.method == 'POST':
        # Extract form data
        patient_id = request.POST.get('id')
        metadata = request.POST.get('metadata', '')

        # Check if DICOM image with the same ID already exists
        existing_dicom_image = DICOMImage.objects.filter(pk=patient_id).exists()
        if existing_dicom_image:
            return JsonResponse({'error': f'DICOM image with ID {patient_id} already exists'}, status=400)

        # Save the DICOM image object
        dicom_image = DICOMImage.objects.create(id=patient_id, metadata=metadata)

        # Handle image files
        files = request.FILES.getlist('files')
        if len(files) != 4:
            return JsonResponse({'error': 'Exactly 4 DICOM files must be selected'}, status=400)

        # Create directory if not exists
        directory = os.path.join(settings.MEDIA_ROOT, f'dicom_images/{patient_id}')
        os.makedirs(directory, exist_ok=True)

        for index, file in enumerate(files):
            # Save the file to the appropriate directory
            file_path = os.path.join(directory, f'dicom_image_{index+1}.dcm')
            with open(file_path, 'wb+') as destination:
                for chunk in file.chunks():
                    destination.write(chunk)

            # Create DICOMImageFile instance
            DICOMImageFile.objects.create(image=dicom_image, file=file_path)

        return JsonResponse({'message': 'DICOM images added successfully'}, status=201)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)


def retrieve_dicom_image(request, image_id):
    if request.method == 'GET':
        try:
            # Retrieve specific DICOM image by ID
            dicom_image = DICOMImage.objects.get(pk=image_id)
            files = DICOMImageFile.objects.filter(image=dicom_image)
            file_paths = [file.file.url for file in files]
            response_data = {
                'id': dicom_image.id,
                'metadata': dicom_image.metadata,
                'file_paths': file_paths
            }
            return JsonResponse(response_data)
        except ObjectDoesNotExist:
            return JsonResponse({'error': f'DICOM image with ID {image_id} not found'}, status=404)
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
