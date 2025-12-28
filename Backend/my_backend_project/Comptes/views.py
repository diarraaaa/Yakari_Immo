from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import InscriptionSerializer,ConnectionSerializer
from .models import User
from django.utils import timezone
from django.core.mail import send_mail
from django.conf import settings
#on va créer une vue pour l'inscription des utilisateurs
class SignupView(APIView):
    def get(self,request):
        return Response({"message": "Use a post request to register a new user."}, status=status.HTTP_200_OK)
    def post(self,request):
        #on envoie les données au serializer pour la validation et la création de l'utilisateur
        serializer=InscriptionSerializer(data=request.data)
        #on verifie si les données sont valides
        if serializer.is_valid():
            #on sauvegarde l'utilisateur en faisant appel  à la methode create du serializer et on retourne les données de l'utilisateur créé
            user=serializer.save()
            serializer_data=serializer.data
            return Response(serializer_data,status=status.HTTP_201_CREATED)
        #on retourne les erreurs de validation
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

#on va crée une vue pour la connexion des utilisateurs
class LoginView(APIView):
    def get(self,request):
        return Response({"message": "Use a post request to login a user."}, status=status.HTTP_200_OK)
    def post(self,request):
        serializer=ConnectionSerializer(data=request.data)
        if serializer.is_valid():
            #logique de connexion à implémenter
            serializer_data=serializer.data
            #on ecrit les données pour verifier la connexion
            return Response(serializer_data,status=status.HTTP_200_OK)
        
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
#on va créer une vue pour la vérification de l'email des utilisateurs
class VerifyEmailView(APIView):
    def get(self,request,token):
        try:
            user=User.objects.get(verification_token=token)
        except(User.DoesNotExist):
                return Response({"error":"Invalid token."},status=status.HTTP_400_BAD_REQUEST)
        if  timezone.now()>user.token_expires_at   :
                return Response({"error":"Token is expired."},status=status.HTTP_400_BAD_REQUEST)
        user.is_verified=True
        user.token_expires_at=None
        user.verification_token=None
        user.save()
        send_mail(
            subject="Bienvenue sur Yakari Immo",
            message=f"Bienvenue sur Yakari Immo: {user.first_name} {user.last_name}, votre email a été vérifié avec succès.",
            html_message=f"<p>Bienvenue sur Yakari Immo: {user.first_name} {user.last_name}, votre email a été vérifié avec succès.</p>",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            fail_silently=False,
        )
        return Response({"message":"Email verified successfully."},status=status.HTTP_200_OK)