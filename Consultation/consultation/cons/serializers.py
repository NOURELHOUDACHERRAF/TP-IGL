from rest_framework import serializers
from .models import Patient, Consultation, Ordonnance, BilanBiologique, BilanRadiologique, Antecedent

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['id', 'nss', 'nom', 'prenom', 'date_naissance', 'adresse', 'telephone', 'mutuelle', 'medecin_traitant', 'personne_a_contacter']

class OrdonnanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ordonnance
        fields = ['id', 'consultation', 'medicament', 'dose', 'duree']
class AntecedentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Antecedent
        fields = ['id', 'consultation', 'nom', 'type']

class BilanBiologiqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = BilanBiologique
        fields = ['id', 'consultation', 'type_analyse', 'resultat']


class BilanRadiologiqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = BilanRadiologique
        #fields = ['id', 'type_examen', 'consultation', 'radio', 'compte_rendu']
        fields = ['id', 'type_examen', 'consultation', 'images']


class BilanRadiologiqueLiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = BilanRadiologique
        fields = ['id', 'type_examen']

class ConsultationSerializer(serializers.ModelSerializer):
    bilans_radiologiques = BilanRadiologiqueLiteSerializer(many=True, read_only=True)

    class Meta:
        model = Consultation
        fields = ['id', 'patient', 'medecin', 'date', 'description', 'diagnostic','bilans_biologiques', 'bilans_radiologiques']

class BilanRadiologiqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = BilanRadiologique
        fields = ['id', 'type_examen', 'consultation', 'images', 'compte_rendu']


from rest_framework import serializers
from .models import BilanRadiologique

class BilanRadiologiqueCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BilanRadiologique
        fields = ['type_examen']  # Seul le champ type_examen est visible à la création

class BilanRadiologiqueUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BilanRadiologique
        fields = ['type_examen', 'compte_rendu', 'images']  # Tous les champs sont visibles lors de la mise à jour