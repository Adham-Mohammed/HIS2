"""
URL configuration for journalBullet project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from emr import views as emr_views
from dicom import views as dicom_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/v1/auth/", include('djoser.urls')),
    path("api/v1/auth/", include('djoser.urls.jwt')),
    path('patients/', emr_views.list_patients, name='list_patients'),
    path('patients/create/', emr_views.create_patient, name='create_patient'),
    path('patients/<int:patient_id>/delete/', emr_views.delete_patient, name='delete_patient'),
    path('patients/<int:patient_id>/', emr_views.retrieve_patient, name='retrieve_patient'),
    path('patients/<int:patient_id>/update/', emr_views.update_patient, name='update_patient'),

    # DICOM URLs
    path('dicom/dicomimage/', dicom_views.list_dicom_images, name='list_dicom_images'),
    path('dicom/dicomimage/add/', dicom_views.add_dicom_image, name='add_dicom_image'),
    path('dicom/dicomimage/<int:image_id>/', dicom_views.retrieve_dicom_image, name='retrieve_dicom_image'),
    path('dicom/dicomimage/<int:image_id>/delete/', dicom_views.delete_dicom_image, name='delete_dicom_image'),

]
