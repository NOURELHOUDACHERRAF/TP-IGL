from rest_framework.test import APITestCase
from rest_framework import status
from cons.models import Consultation, Ordonnance, Patient
from django.urls import reverse
from datetime import date

class OrdonnanceTests(APITestCase):
    
    def setUp(self):
        self.patient = Patient.objects.create(
            nss="123456789", 
            date_naissance=date(1990, 1, 1)  # Providing a valid date
        )
        self.consultation = Consultation.objects.create(patient=self.patient, date="2025-01-30")
        self.url = reverse('ordonnance-list') 
    
    def test_create_ordonnance(self):
        # Prepare data for ordonnance
        data = {
            'consultation': self.consultation.id,
            'medicament': 'Paracetamol',
            'dose': '500mg',
            'duree': '5 days',
        }
        
        # Make the POST request to create ordonnance
        response = self.client.post(self.url, data, format='json')
        
        # Assert that the ordonnance was created successfully
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # Verify the ordonnance in the database
        ordonnance = Ordonnance.objects.first()
        self.assertEqual(ordonnance.medicament, 'Paracetamol')
        self.assertEqual(ordonnance.dose, '500mg')
        self.assertEqual(ordonnance.duree, '5 days')
        self.assertEqual(ordonnance.consultation.id, self.consultation.id)


import pytest
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APIClient
from rest_framework import status
from cons.models import BilanRadiologique, Consultation, Patient

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def patient():
    return Patient.objects.create(nss="123456789", nom="Doe", prenom="John", date_naissance="2002-02-02")

@pytest.fixture
def consultation(patient):
    return Consultation.objects.create(patient=patient)

@pytest.fixture
def bilan_radiologique(consultation):
    return BilanRadiologique.objects.create(
        consultation=consultation,
        type_examen="Radiographie",
        compte_rendu="Initial compte rendu"
    )
'''
@pytest.mark.django_db
def test_upload_files_to_bilan_radiologique(api_client, bilan_radiologique):
    # Prepare the file and data for the PATCH request
    image = SimpleUploadedFile("test_image.jpg", b"file_content", content_type="image/jpeg")
    data = {
        "compte_rendu": "Updated compte rendu",
        "images": image
    }

    # Make the PATCH request to the upload_files endpoint
    url = f"/api/bilanradiologique/{bilan_radiologique.id}/upload_files/"
    response = api_client.patch(url, data, format="multipart")

    # Assert the response status code
    assert response.status_code == status.HTTP_200_OK

    # Assert the response data
    response_data = response.data
    assert response_data["type_examen"] == "Radiographie"
    assert response_data["compte_rendu"] == "Updated compte rendu"
    assert "test_image.jpg" in response_data["images"]

    # Refresh the bilan_radiologique instance from the database
    bilan_radiologique.refresh_from_db()

    # Assert the updated fields in the database
    assert bilan_radiologique.compte_rendu == "Updated compte rendu"
    assert bilan_radiologique.images.name.endswith("test_image.jpg")
'''
@pytest.mark.django_db
def test_upload_files_to_nonexistent_bilan_radiologique(api_client):
    # Make a PATCH request to a non-existent bilan_radiologique
    url = "/api/bilanradiologique/999/upload_files/"
    response = api_client.patch(url, {}, format="multipart")

    # Assert the response status code
    assert response.status_code == status.HTTP_404_NOT_FOUND