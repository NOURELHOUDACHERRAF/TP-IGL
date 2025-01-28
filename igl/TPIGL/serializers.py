from rest_framework import serializers
from .models import Patients, DossierPatient

class PatientSerializer(serializers.ModelSerializer):
    dossier = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Patients
        fields = '__all__'

class DossierPatientSerializer(serializers.ModelSerializer):
    patient = serializers.PrimaryKeyRelatedField(queryset=Patients.objects.all())  # Relier par ID patient

    class Meta:
        model = DossierPatient
        fields = '__all__'
