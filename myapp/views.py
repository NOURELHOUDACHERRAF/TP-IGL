from django.shortcuts import render
from django.http import HttpResponse
from django.http import HttpResponseForbidden
from functools import wraps
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from django.http import HttpResponse
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import BasePermission
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404

from .models import MedicalRecord
from datetime import datetime
from .serializers import MedicalRecordSerializer
from .models import Soin, Patients, Infermier




 

class UserProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'user_id': user.id,
            "username": user.username,
            "role": user.role,  # You can return role or other profile data
        })
    
 
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            tokens = OutstandingToken.objects.filter(user=request.user)
            for token in tokens:
                BlacklistedToken.objects.get_or_create(token=token)
                print(f"Token {token} blacklisted.")
            return Response({"message": "Déconnexion réussie"}, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Error during logout: {e}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)




class TrendDataAPIView(APIView):
    def get(self, request, patient_id, exam_name):
        """
        Récupérer les données pour générer le graphe de tendance.
        Filtrage par patient_id et nom de l'examen.
        """
        exams = MedicalRecord.objects.filter(patient_id=patient_id, exam_name=exam_name).order_by('date')

        if not exams.exists():
            return Response({"error": "No data found for this patient and exam name"}, status=404)

        # Construire les données pour l'API
        data = {
            "dates": [exam.date for exam in exams],
            "results": [exam.result for exam in exams],
            "reference_value": exams[0].reference_value  # On suppose que la valeur de référence est la même
        }
        return Response(data)


from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes


@api_view(['POST'])
@permission_classes([AllowAny])  # Cela désactive la vérification d'authentification pour cette vue
def create_medical_record(request):
    """
    Cette vue permet à un laborantin de saisir les résultats d'un examen médical
    """
    if request.method == 'POST':
        serializer = MedicalRecordSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Sauvegarde dans la base de données
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Soin, Infermier
from rest_framework.permissions import AllowAny

@api_view(['POST'])
@permission_classes([AllowAny])  # Cela désactive la vérification d'authentification pour cette vue
def ajouter_soin(request):
    try:
        infermier_id = request.data.get('infermier_id')  # ID de l'infirmier
        description = request.data.get('description')  # Description du soin
        date = request.data.get('date')  # Description du soin

        if not infermier_id or not description:
            return Response({"error": "Missing required fields"}, status=400)

        infermier = Infermier.objects.get(id=infermier_id)

        soin = Soin.objects.create(
            infermier=infermier,
            description=description,
            date=date,
        )

        return Response({
            "message": "Soin added successfully",
            "soin_id": soin.id,
            "description": soin.description,
            "date": soin.date,
        }, status=201)
    except Infermier.DoesNotExist:
        return Response({"error": "Infermier not found"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
