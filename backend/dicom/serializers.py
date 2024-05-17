# serializers.py
from rest_framework import serializers
from .models import DICOMImage, DICOMImageFile

class DICOMImageFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = DICOMImageFile
        fields = ['file']

class DICOMImageSerializer(serializers.ModelSerializer):
    images = DICOMImageFileSerializer(many=True, read_only=True)

    class Meta:
        model = DICOMImage
        fields = ['id', 'metadata', 'images']
        extra_kwargs = {
            'metadata': {'required': False}
        }