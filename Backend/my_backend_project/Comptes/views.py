from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import InscriptionSerializer,ConnectionSerializer
from .models import User
from django.utils import timezone
from datetime import timedelta
from django.core.mail import send_mail
from django.conf import settings
import uuid
from google.oauth2 import id_token
from google.auth.transport import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
import os
import dotenv
dotenv.load_dotenv()

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
#on crée une vue pour renvoyer le mail de vérification
class ResendVerificationEmailView(APIView):
    def post(self,request):
        email=request.data.get('email')
        try:
            user=User.objects.get(email=email)
        except(User.DoesNotExist):
            return Response({"error":"User with this email does not exist."},status=status.HTTP_400_BAD_REQUEST)
        if user.is_verified:
            return Response({"message":"This email is already verified."},status=status.HTTP_200_OK)
        token=uuid.uuid4()
        user.verification_token=token
        user.token_expires_at=timezone.now()+timezone.timedelta(hours=24)
        user.save()
        verification_link = f"https://glowing-fishstick-wwrrpx5x6v5f96rq-8000.app.github.dev/api/verify-email/{user.verification_token}/"
        send_mail(
            subject="Verification de votre email sur Yakari Immo",
            message=f"Veuillez vérifier votre email en cliquant sur le lien suivant : {verification_link}",
            html_message=f"<p>Bonjour {user.first_name} {user.last_name}, Veuillez vérifier votre email en cliquant sur le lien suivant : <a href='{verification_link}'>Vérifier l'email</a></p>",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            fail_silently=False,
        )
        return Response({"message":"Verification email resent."},status=status.HTTP_200_OK)
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
#on va créer une vue pour l'inscription via google
class GoogleAuthView(APIView):
    def post(self,request):
        token=request.data.get("token")
        try:
            idinfo=id_token.verify_oauth2_token(token,requests.Request(),os.getenv("GOOGLE_CLIENT_ID"))
            email=idinfo.get("email")
            first_name=idinfo.get("given_name","")
            last_name=idinfo.get("family_name","")
            try:
                user=User.objects.get(email=email)
            except User.DoesNotExist:
                user=User.objects.create(
                    email=email,
                    first_name=first_name,
                    last_name=last_name,
                    is_verified=True
                )
                user.set_unusable_password()
                user.save()
            refresh=RefreshToken.for_user(user)
            return Response({
                "refresh":str(refresh),
                "access":str(refresh.access_token),
                "user":{
                    "id":user.id,
                    "email":user.email,
                    "first_name":user.first_name,
                    "last_name":user.last_name
                }
            },status=status.HTTP_200_OK)
        except ValueError:
            return Response({"error":"Invalid token"},status=status.HTTP_400_BAD_REQUEST)

