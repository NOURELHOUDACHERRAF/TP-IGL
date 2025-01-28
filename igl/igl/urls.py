from django.urls import path
from TPIGL.views import creer_dossier_patient,MedecinListView
from django.contrib import admin
from django.urls import include
from TPIGL import views 
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    path('admin/', admin.site.urls),  # This enables the admin page

    path('medecins/', MedecinListView.as_view(), name='medecin-list'),

    #path('api/create-dossier-patient/', CreateDossierPatientView.as_view(), name='create-dossier-patient'),
    path('creer_dossier_patient/', creer_dossier_patient, name='creer_dossier_patient'),
    #path('api/medecins/search/', MedecinSearchView.as_view(), name='medecin-search'),
    




]
# Ajouter les URL pour les fichiers médias uniquement en mode DEBUG
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
