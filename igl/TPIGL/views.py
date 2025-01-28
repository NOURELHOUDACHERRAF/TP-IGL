from rest_framework.views import APIView
from rest_framework.decorators import api_view

from rest_framework.response import Response
from rest_framework import status
from .models import Patients, DossierPatient
from .serializers import PatientSerializer, DossierPatientSerializer



@api_view(['GET'])
def rechercher_dossier_par_nss(request, nss):
    """
    Recherche un dossier patient par NSS.
    :param request: La requête HTTP.
    :param nss: Le numéro de sécurité sociale du patient.
    :return: Les détails du dossier patient ou un message d'erreur.
    """
    try:
        # Trouver le patient par son NSS
        patient = Patients.objects.get(nss=nss)
        
        # Récupérer le dossier correspondant au patient
        dossier = DossierPatient.objects.get(patient=patient)
        
        # Sérialiser les données du dossier
        serializer = DossierPatientSerializer(dossier)
        
        # Retourner les données sérialisées
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Patients.DoesNotExist:
        return Response(
            {"erreur": "Aucun patient trouvé avec ce NSS."},
            status=status.HTTP_404_NOT_FOUND
        )
    except DossierPatient.DoesNotExist:
        return Response(
            {"erreur": "Aucun dossier trouvé pour ce patient."},
            status=status.HTTP_404_NOT_FOUND
        )
