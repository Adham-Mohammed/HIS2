from django.test import TestCase
from django.urls import reverse
from .models import Doctor, Patient

class DoctorModelTest(TestCase):
    def setUp(self):
        self.doctor = Doctor.objects.create(username='test_user', password='test_password')

    def test_doctor_creation(self):
        self.assertEqual(self.doctor.username, 'test_user')
        self.assertEqual(self.doctor.password, 'test_password')

class PatientModelTest(TestCase):
    def setUp(self):
        self.doctor = Doctor.objects.create(username='test_user', password='test_password')
        self.patient = Patient.objects.create(
            name='John Doe',
            age=30,
            height=180.0,
            weight=75.0,
            drugs='Drug A, Drug B',
            tests='Test X, Test Y',
            illness='Illness description',
            recommendations='Recommendation details',
            doctor=self.doctor
        )

    def test_patient_creation(self):
        self.assertEqual(self.patient.name, 'John Doe')
        self.assertEqual(self.patient.age, 30)
        self.assertEqual(self.patient.height, 180.0)
        self.assertEqual(self.patient.weight, 75.0)
        self.assertEqual(self.patient.drugs, 'Drug A, Drug B')
        self.assertEqual(self.patient.tests, 'Test X, Test Y')
        self.assertEqual(self.patient.illness, 'Illness description')
        self.assertEqual(self.patient.recommendations, 'Recommendation details')
        self.assertEqual(self.patient.doctor, self.doctor)

class PatientCRUDTests(TestCase):
    def setUp(self):
        self.doctor = Doctor.objects.create(username='test_user', password='test_password')
        self.patient = Patient.objects.create(
            name='John Doe',
            age=30,
            height=180.0,
            weight=75.0,
            drugs='Drug A, Drug B',
            tests='Test X, Test Y',
            illness='Illness description',
            recommendations='Recommendation details',
            doctor=self.doctor
        )

    def test_list_patients(self):
        response = self.client.get(reverse('list_patients'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, self.patient.name)

    def test_create_patient(self):
        new_patient_data = {
            'name': 'Jane Smith',
            'age': 25,
            'height': 160.0,
            'weight': 60.0,
            'drugs': 'Drug C',
            'tests': 'Test Z',
            'illness': 'New illness',
            'recommendations': 'New recommendation',
            'doctor': self.doctor.id
        }
        response = self.client.post(reverse('create_patient'), data=new_patient_data)
        self.assertEqual(response.status_code, 201)
        self.assertTrue(Patient.objects.filter(name='Jane Smith').exists())

