import pytest
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth.models import User

import django
import os
from django.conf import settings

os.environ['DJANGO_SETTINGS_MODULE'] = 'myproject.settings'
django.setup()


# Initialisation du client de test
@pytest.fixture
def api_client():
    return APIClient()

# Créer un utilisateur pour les tests
@pytest.fixture
def user():
    return User.objects.create_user(username='testuser', password='testpassword')

# Test de login avec un utilisateur valide
def test_login_success(api_client, user):
    # Préparer les données de connexion
    data = {
        'username': 'aridj_b',
        'password': '2004',
    }
    # Effectuer la requête POST pour obtenir le token
    response = api_client.post('/api/token/', data, format='json')

    # Vérifier que la réponse est un succès
    assert response.status_code == status.HTTP_200_OK

    # Vérifier que la réponse contient un token
    assert 'access' in response.data
    assert 'refresh' in response.data

# Test de login avec un utilisateur invalide
def test_login_failure_invalid_credentials(api_client):
    # Préparer les données de connexion invalides
    data = {
        'username': 'wronguser',
        'password': 'wrongpassword',
    }
    # Effectuer la requête POST pour obtenir le token
    response = api_client.post('/api/token/', data, format='json')

    # Vérifier que la réponse contient une erreur
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert 'detail' in response.data
    assert response.data['detail'] == 'No active account found with the given credentials'

# Test de login avec mot de passe incorrect
def test_login_failure_wrong_password(api_client, user):
    # Préparer les données de connexion avec un mauvais mot de passe
    data = {
        'username': 'aridj_b',
        'password': '2005',
    }
    # Effectuer la requête POST pour obtenir le token
    response = api_client.post('/api/token/', data, format='json')

    # Vérifier que la réponse est une erreur d'authentification
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert 'detail' in response.data
    assert response.data['detail'] == 'No active account found with the given credentials'