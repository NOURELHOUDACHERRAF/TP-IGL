from django.urls import path

from django.contrib import admin
from django.urls import include
from TPIGL import views 
from django.conf import settings
from django.conf.urls.static import static

from django.urls import path
from TPIGL.views import rechercher_dossier_par_nss

urlpatterns = [
    # Autres URL
        path('admin/', admin.site.urls),  # This enables the admin page

    path('api/dossier/<str:nss>/', rechercher_dossier_par_nss, name='rechercher_dossier_par_nss'),
]



# Ajouter les URL pour les fichiers médias uniquement en mode DEBUG
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

 
