from rest_framework.test import APIClient
from rest_framework import status
from django.test import TestCase
from myapp.models import MedicalRecord, Patients
from myapp.serializers import MedicalRecordSerializer

class MedicalRecordTestCase(TestCase):
    def setUp(self):
        # Create a mock patient for the medical record
        self.patient = Patients.objects.create(
            first_name="John",
            last_name="Doe",
            date_of_birth="1990-01-01"
        )
        
        # Instantiate the APIClient
        self.client = APIClient()
        
        # Sample data for creating a medical record
        self.valid_data = {
            "patient_id": self.patient.id,
            "exam_name": "Blood Test",
            "result": "Normal",
            "date": "2025-01-01",
            "reference_value": "Normal Range"
        }
        
        self.invalid_data = {
            "patient_id": self.patient.id,
            "exam_name": "",
            "result": "Normal",
            "date": "2025-01-01",
            "reference_value": "Normal Range"
        }

    def test_create_medical_record_success(self):
        # Send POST request with valid data
        response = self.client.post('http://127.0.0.1:8000/api/medical-records/', self.valid_data, format='json')
        
        # Check that the response status code is 201 Created
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # Check that the data returned in the response matches the data sent
        self.assertEqual(response.data['exam_name'], self.valid_data['exam_name'])
        self.assertEqual(response.data['result'], self.valid_data['result'])
        self.assertEqual(response.data['patient_id'], self.valid_data['patient_id'])

        # Check if the medical record was saved in the database
        self.assertEqual(MedicalRecord.objects.count(), 1)

    def test_create_medical_record_missing_exam_name(self):
        # Send POST request with invalid data (missing exam_name)
        response = self.client.post('http://127.0.0.1:8000/api/medical-records/', self.invalid_data, format='json')
        
        # Check that the response status code is 400 Bad Request
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
        # Ensure that the error response contains a validation error for the exam_name
        self.assertIn('exam_name', response.data)
