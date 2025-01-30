from django import forms
from .models import Antecedent, Consultation, Ordonnance, BilanBiologique, BilanRadiologique

class ConsultationForm(forms.ModelForm):
    class Meta:
        model = Consultation
        fields = ['medecin', 'description', 'diagnostic']

class OrdonnanceForm(forms.ModelForm):
    class Meta:
        model = Ordonnance
        fields = ['medicament', 'dose', 'duree']
class AntecedentsForm(forms.ModelForm):
    class Meta:
        model = Antecedent
        fields =['nom' ,'type']
class BilanBiologiqueForm(forms.ModelForm):
    class Meta:
        model = BilanBiologique
        #fields = ['type_analyse', 'resultat']
        fields = ['type_analyse']




class BilanRadiologiqueForm(forms.ModelForm):
    class Meta:
        model = BilanRadiologique
        #fields = ['type_examen', 'images']
        fields = ['type_examen']



