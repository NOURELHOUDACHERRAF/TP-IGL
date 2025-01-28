from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.db.models import Q


from .models import Patients, DossierPatient,Medecin
from .serializers import PatientSerializer, DossierPatientSerializer, MedecinSerializer
from django.http import JsonResponse



class MedecinListView(APIView):
    def get(self, request):
        medecins = Medecin.objects.all()
        serializer = MedecinSerializer(medecins, many=True)
        return Response(serializer.data)


@api_view(['POST'])
def creer_dossier_patient(request):
    if request.method == 'POST':
        try:
            # Récupération des données envoyées par le formulaire
            patient_data = {
                'PatientId':request.data.get('PatientId',''),
                'nom': request.data.get('nom', ''),
                'prenom': request.data.get('prenom', ''),
                'nss': request.data.get('nss', ''),
                'date_naissance': request.data.get('date_naissance', ''),
                'adresse': request.data.get('adresse', ''),
                'tel': request.data.get('tel', ''),
                'contact': request.data.get('contact', ''),
                'mutuelle': request.data.get('mutuelle', ''),
                'sexe': request.data.get('sexe', ''),  # Récupération du sexe
                'group_sanguin': request.data.get('group_sanguin', '')  # Récupération du groupe sanguin
            }
            traitement  =  request.data.get('traitement', '')
            antecedents = request.data.get('antecedents', [])
            medecins_ids = request.data.get('medecins_traitants', [])  # Liste des IDs des médecins

            # medecins_ids = request.data.get('medecins_traitants', [])  # Liste des IDs des médecins


            # Vérifier si un patient avec le même NSS existe
            patient = Patients.objects.filter(nss=patient_data['nss']).first()

            if not patient:
                # Créer un nouveau patient
                patient_serializer = PatientSerializer(data=patient_data)
                if patient_serializer.is_valid():
                    patient = patient_serializer.save()
                else:
                    return JsonResponse({
                        'status': 'error',
                        'message': 'Erreur lors de la création du patient.',
                        'errors': patient_serializer.errors
                    }, status=status.HTTP_400_BAD_REQUEST)


            if DossierPatient.objects.filter(patient=patient).exists():
                return JsonResponse({
                    'status': 'error',
                    'message': 'Ce patient a déjà un dossier.'
                }, status=status.HTTP_400_BAD_REQUEST)

            # Créer un dossier pour le patient
            dossier = DossierPatient.objects.create(
                patient=patient,
                traitement=traitement,
                antecedents=antecedents,
                
            )
            # Associer les médecins traitants
            
            medecins = Medecin.objects.filter(userID__in=medecins_ids)
            dossier.medecins_traitants.set(medecins)
            dossier.save()
             # Générer automatiquement le QR code

            dossier.generate_qr_code()

            

            return JsonResponse({
                'status': 'success',
                'message': f"Dossier créé avec succès pour le patient {patient.nom} {patient.prenom}.",
                'dossier_id': dossier.id ,
                'qr_code_url': request.build_absolute_uri(dossier.qr_code.url) if dossier.qr_code else None,

                #'qr_code_url': request.build_absolute_uri(dossier.qr_code.url) if dossier.qr_code else None

            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return JsonResponse({
                'status': 'error',
                'message': f"Erreur inattendue : {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return JsonResponse({
        'status': 'error',
        'message': 'Méthode non autorisée.'
    }, status=status.HTTP_405_METHOD_NOT_ALLOWED)
  