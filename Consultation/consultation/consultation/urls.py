from django.urls import path, include
from rest_framework.routers import DefaultRouter
from cons.views import PatientViewSet, ConsultationViewSet
from cons.views import OrdonnanceViewSet, BilanBiologiqueViewSet, BilanRadiologiqueViewSet
from django.contrib import admin

from cons.views import UpdateBilanRadiologiqueView
router = DefaultRouter()
router.register(r'patients', PatientViewSet)
router.register(r'consultations', ConsultationViewSet)
router.register(r'ordonnances', OrdonnanceViewSet)
router.register(r'bilans-biologiques', BilanBiologiqueViewSet)
router.register(r'bilans-radiologiques', BilanRadiologiqueViewSet)
urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
     path('update-bilan-radiologique/<int:consultation_id>/', UpdateBilanRadiologiqueView.as_view(), name='update-bilan-radiologique'),
   
]


