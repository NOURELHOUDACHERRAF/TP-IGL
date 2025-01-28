from rest_framework import serializers
from .models import Patients, DossierPatient,Medecin
import qrcode
from io import BytesIO
import base64


class PatientSerializer(serializers.ModelSerializer):
    dossier = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Patients
        fields = '__all__'




class MedecinSerializer(serializers.ModelSerializer):
    nom = serializers.CharField(source='user.nom')
    prenom = serializers.CharField(source='user.prenom')

    class Meta:
        model = Medecin
        fields = [ 'nom', 'prenom', 'speciality']


class DossierPatientSerializer(serializers.ModelSerializer):
    patient = serializers.PrimaryKeyRelatedField(queryset=Patients.objects.all())  # Relier par ID patient
    #medecins_traitants = MedecinSerializer(many=True)  # Sérialiseur imbriqué pour plusieurs médecins
    medecins_traitants = serializers.PrimaryKeyRelatedField(queryset=Medecin.objects.all(), many=True)  # Accepter une liste d'IDs de médecins

    qr_code_url = serializers.SerializerMethodField()

    class Meta:
        model = DossierPatient
        fields = '__all__'


    def get_qr_code_url(self, obj):
        if obj.qr_code:
            return obj.qr_code.url
        return None
    
    def create(self, validated_data):
        medecins_data = validated_data.pop('medecins_traitants', [])
        dossier = DossierPatient.objects.create(**validated_data)
        for medecin_data in medecins_data:
            medecin = Medecin.objects.get(userID=medecin_data['userID'])  # Associez les médecins existants
            dossier.medecins_traitants.add(medecin)
        return dossier




        
