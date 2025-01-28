from rest_framework_simplejwt.authentication import JWTAuthentication

class MyJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Ajoutez un log pour vérifier le token d'authentification
        print(f"Authenticating token: {request.headers.get('Authorization')}")
        return super().authenticate(request)