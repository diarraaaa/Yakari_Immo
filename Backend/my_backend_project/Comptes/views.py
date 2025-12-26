from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import InscriptionSerializer,ConnectionSerializer
from .models import User
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
            return Response(serializer_data,status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
#on va créer une vue pour la vérification de l'email des utilisateurs
class VerifyEmailView(APIView):
    def get(self,request,token):
        if not token:
            return Response({"error":"Token is required."},status=status.HTTP_400_BAD_REQUEST)
        try:
            user=User.objects.get(verification_token=token)
            user.is_verified=True
            user.verification_token=None
            user.save()
            return Response({"message":"Email verified successfully."},status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error":"Invalid token."},status=status.HTTP_400_BAD_REQUEST)