from django.urls import path
from .views import SignupView,LoginView,VerifyEmailView,ResendVerificationEmailView,GoogleAuthView

urlpatterns = [
    path('signup/',SignupView.as_view(),name='signup'),
    path('login/',LoginView.as_view(),name='login'),
    path('verify-email/<uuid:token>/',VerifyEmailView.as_view(),name='verify-email'),
    path('resend-verification-email/',ResendVerificationEmailView.as_view(),name='resend-verification-email'),
    path('google-auth/',GoogleAuthView.as_view(),name='google-auth'),
]