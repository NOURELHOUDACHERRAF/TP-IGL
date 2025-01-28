from django.urls import path
from django.http import HttpResponse  # Import HttpResponse
from rest_framework_simplejwt import views as jwt_views
from .views import UserProfileView ,LogoutView
from .views import TrendDataAPIView
from . import views
from .views  import ajouter_soin



urlpatterns = [
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/profile/', UserProfileView.as_view(), name='user_profile'),
    path('api/logout/', LogoutView.as_view(), name='logout'),  # Ajout de la route logout
    path('api/trend-data/<int:patient_id>/<str:exam_name>/', TrendDataAPIView.as_view(), name='trend-data'),
    path('api/medical-records/', views.create_medical_record, name='create-medical-record'),
    path('api/soins/ajouter/', ajouter_soin, name='ajouter_soin'),

    path('home/', lambda request: HttpResponse("Welcome to the homepage!"), name='home'),

 ]