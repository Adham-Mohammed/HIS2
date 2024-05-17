from django.contrib import admin
from .models import DICOMImage, DICOMImageFile

class DICOMImageFileInline(admin.TabularInline):
    model = DICOMImageFile
    extra = 1  # Number of extra forms to display

class DICOMImageAdmin(admin.ModelAdmin):
    inlines = [DICOMImageFileInline]
    list_display = ['id', 'metadata']
    search_fields = ['id', 'metadata']

admin.site.register(DICOMImage, DICOMImageAdmin)
admin.site.register(DICOMImageFile)
