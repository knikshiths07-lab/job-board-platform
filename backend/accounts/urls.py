from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import ProfileAPIView, RegisterAPIView

urlpatterns = [
    path("register/", RegisterAPIView.as_view(), name="auth-register"),
    path("login/", TokenObtainPairView.as_view(), name="auth-login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("profile/", ProfileAPIView.as_view(), name="auth-profile"),
]
