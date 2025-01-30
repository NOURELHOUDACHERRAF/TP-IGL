from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import Patient, Consultation, Ordonnance, BilanBiologique, BilanRadiologique
from .forms import ConsultationForm, OrdonnanceForm, BilanBiologiqueForm, BilanRadiologiqueForm
from django.shortcuts import render, get_object_or_404, redirect
from .models import Consultation, Ordonnance
from .forms import OrdonnanceForm  # Un formulaire que nous allons créer
from rest_framework import viewsets
from .models import Patient, Consultation
from .serializers import AntecedentSerializer, PatientSerializer, ConsultationSerializer
from rest_framework import viewsets
from .models import Ordonnance, BilanBiologique, BilanRadiologique
from .serializers import OrdonnanceSerializer, BilanBiologiqueSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .models import BilanRadiologique
from .serializers import BilanRadiologiqueSerializer



from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from .models import Patient, Consultation, Ordonnance, Antecedent, BilanBiologique, BilanRadiologique
from .forms import ConsultationForm, OrdonnanceForm, AntecedentsForm, BilanBiologiqueForm, BilanRadiologiqueForm
def creer_consultation(request):
    if request.method == 'POST':
        # Get the patient by NSS
        nss = request.POST.get('nss')
        patient = get_object_or_404(Patient, nss=nss)

        # Create the consultation
        consultation_form = ConsultationForm(request.POST)
        if consultation_form.is_valid():
            consultation = consultation_form.save(commit=False)
            consultation.patient = patient
            consultation.save()

            # Add ordonnances
            ordonnances = request.POST.getlist('ordonnances')  # List of ordonnance data (e.g., [{medicament: "XYZ", dose: "10mg", duree: "5 days"}])
            for ordonnance_data in ordonnances:
                Ordonnance.objects.create(
                    consultation=consultation,
                    medicament=ordonnance_data['medicament'],
                    dose=ordonnance_data['dose'],
                    duree=ordonnance_data['duree']
                )

            # Add antecedents
            antecedents = request.POST.getlist('antecedents')  # List of antecedent data (e.g., [{nom: "Hypertension", type: "Medical History"}])
            for antecedent_data in antecedents:
                Antecedent.objects.create(
                    consultation=consultation,
                    nom=antecedent_data['nom'],
                    type=antecedent_data['type']
                )

            # Add bilans biologiques
            bilans_biologiques = request.POST.getlist('bilans_biologiques')  # List of bilan biologique data
            for bilan in bilans_biologiques:
                BilanBiologique.objects.create(
                    consultation=consultation,
                    type_analyse=bilan['type_analyse'],
                    resultat=bilan['resultat']
                )

           # Add bilans radiologiques (only type_examen is included)
            bilans_radiologiques = request.POST.getlist('bilans_radiologiques')
            for bilan in bilans_radiologiques:
                BilanRadiologique.objects.create(
                    consultation=consultation,
                    type_examen=bilan['type_examen']
                )

            return JsonResponse({'message': 'Consultation créée avec succès.'})
        else:
            return JsonResponse({'errors': consultation_form.errors}, status=400)

    else:
        return JsonResponse({'error': 'Méthode non autorisée.'}, status=405)

def ajouter_ordonnance(request, consultation_id):
    consultation = get_object_or_404(Consultation, id=consultation_id)
    if request.method == "POST":
        form = OrdonnanceForm(request.POST)
        if form.is_valid():
            ordonnance = form.save(commit=False)
            ordonnance.consultation = consultation
            ordonnance.save()
            return redirect('detail_consultation', consultation_id=consultation.id)
    else:
        form = OrdonnanceForm()
    return render(request, 'ajouter_ordonnance.html', {'form': form, 'consultation': consultation})
from .forms import BilanBiologiqueForm
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Consultation
from .serializers import (
    ConsultationSerializer,
   
)


def ajouter_bilan_biologique(request, consultation_id):
    consultation = get_object_or_404(Consultation, id=consultation_id)
    if request.method == "POST":
        form = BilanBiologiqueForm(request.POST)
        if form.is_valid():
            bilan = form.save(commit=False)
            bilan.consultation = consultation
            bilan.save()
            return redirect('detail_consultation', consultation_id=consultation.id)
    else:
        form = BilanBiologiqueForm()
    return render(request, 'ajouter_bilan_biologique.html', {'form': form, 'consultation': consultation})





class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


class OrdonnanceViewSet(viewsets.ModelViewSet):
    queryset = Ordonnance.objects.all()
    serializer_class = OrdonnanceSerializer
class AntecedentViewSet(viewsets.ModelViewSet):
    queryset = Ordonnance.objects.all()
    serializer_class = AntecedentSerializer

class BilanBiologiqueViewSet(viewsets.ModelViewSet):
    queryset = BilanBiologique.objects.all()
    serializer_class = BilanBiologiqueSerializer

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import BilanRadiologique

  
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from .models import BilanRadiologique
from .serializers import (
  BilanRadiologiqueLiteSerializer,BilanRadiologiqueSerializer
)
'''
class BilanRadiologiqueViewSet(viewsets.ModelViewSet):
    queryset = BilanRadiologique.objects.all()
    serializer_class = BilanRadiologiqueSerializer
'''

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Consultation, BilanRadiologique
from .serializers import (
    ConsultationSerializer,
   
)

class ConsultationViewSet(viewsets.ModelViewSet):
    queryset = Consultation.objects.all()
    serializer_class = ConsultationSerializer



from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .models import BilanRadiologique
from .serializers import BilanRadiologiqueSerializer
'''
class UpdateBilanRadiologiqueView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def patch(self, request, consultation_id):
        bilan = BilanRadiologique.objects.filter(consultation_id=consultation_id).first()
        if not bilan:
            return Response(
                {"error": "Bilan radiologique non trouvé."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Update images and compte rendu
        images = request.FILES.getlist('images')
        compte_rendu = request.data.get('compte_rendu')

        if images:
            bilan.images = images[0]  # Save the first image (or handle multiple images)
        if compte_rendu:
            bilan.compte_rendu = compte_rendu

        bilan.save()

        serializer = BilanRadiologiqueSerializer(bilan)
        return Response(serializer.data, status=status.HTTP_200_OK)


'''
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from .models import BilanRadiologique
from .serializers import BilanRadiologiqueSerializer

class UpdateBilanRadiologiqueView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def patch(self, request, consultation_id):
        bilan = BilanRadiologique.objects.filter(consultation_id=consultation_id).first()
        if not bilan:
            return Response(
                {"error": "Bilan radiologique non trouvé."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Mettre à jour les champs
        if 'compte_rendu' in request.data:
            bilan.compte_rendu = request.data['compte_rendu']
        if 'images' in request.FILES:
            bilan.images = request.FILES['images']

        bilan.save()
        serializer = BilanRadiologiqueSerializer(bilan)
        return Response(serializer.data, status=status.HTTP_200_OK)

'''
class BilanRadiologiqueViewSet(viewsets.ModelViewSet):
    queryset = BilanRadiologique.objects.all()
    serializer_class = BilanRadiologiqueSerializer
    parser_classes = [MultiPartParser, FormParser]  # To handle file uploads
'''

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import BilanRadiologique
from .serializers import BilanRadiologiqueCreateSerializer, BilanRadiologiqueUpdateSerializer

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import BilanRadiologique
from .serializers import BilanRadiologiqueCreateSerializer, BilanRadiologiqueUpdateSerializer

class BilanRadiologiqueViewSet(viewsets.ModelViewSet):
    queryset = BilanRadiologique.objects.all()
    parser_classes = [MultiPartParser, FormParser]

    def get_serializer_class(self):
        if self.action == 'create':
            return BilanRadiologiqueCreateSerializer
        return BilanRadiologiqueUpdateSerializer

    @action(detail=True, methods=['patch'], parser_classes=[MultiPartParser, FormParser])
    def upload_files(self, request, pk=None):
        bilan = self.get_object()
        if 'images' in request.FILES:
            bilan.images = request.FILES['images']
        if 'compte_rendu' in request.data:
            bilan.compte_rendu = request.data['compte_rendu']
        bilan.save()
        serializer = BilanRadiologiqueUpdateSerializer(bilan)
        return Response(serializer.data)