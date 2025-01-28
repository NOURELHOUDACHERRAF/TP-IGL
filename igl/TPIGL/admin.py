from django.contrib import admin
from .models import DossierPatient,Patients,Medecin

# Register your models here.

@admin.register(Medecin)
class MedecinAdmin(admin.ModelAdmin):
    list_display = ('userID', 'speciality')  # Afficher ces champs dans la liste des médecins
    search_fields = ('userID__nom', 'userID__prenom', 'speciality')  # Permettre la recherche par nom, prénom ou spécialité

# Inline pour les médecins traitants
class MedecinTraitantInline(admin.TabularInline):  # Ou admin.StackedInline pour un affichage vertical
    model = DossierPatient.medecins_traitants.through  # Utiliser la table intermédiaire
    extra = 1  # Nombre de formulaires vides affichés par défaut
 # Permettre la recherche par nom, prénom ou spécialité
admin.site.register(Patients)
admin.site.register(DossierPatient)

