from rest_framework import serializers
from .models import User, Locataire, Proprietaire
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone
from .services.email import send_verification_email
import uuid

#on va créer un serializer pour l'inscription des utilisateurs

class InscriptionSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    telephone=serializers.CharField(required=True,write_only=True)
    numero_carte_identite=serializers.CharField(required=True,write_only=True)

    class Meta:
        model=User
        fields=['username','email','password','role','first_name','last_name','telephone','numero_carte_identite']

    def create(self,validated_data):
        #on va recuperer les données supplémentaires
        role=validated_data.pop('role')
        telephone=validated_data.pop('telephone')
        numero_carte_identite=validated_data.pop('numero_carte_identite')
        password=validated_data.pop('password')
        #on crée l'utilisateur 
        user=User(**validated_data)
        #on définit le mot de passe avec la méthode set_password pour le hasher
        user.set_password(password)
        user.role=role
        user.verification_token=uuid.uuid4()
        #on sauvegarde l'utilisateur
        user.save()
        #on envoie l'email de vérification
        send_verification_email(user)
        #maintenant on crée le profil en fonction du rôle
        if role=='locataire':
            Locataire.objects.create(
                user=user,
                telephone=telephone,
                numero_carte_identite=numero_carte_identite
            )
        elif role=='propriétaire':
            Proprietaire.objects.create(
                user=user,
                telephone=telephone,
                numero_carte_identite=numero_carte_identite
            )
        return user
#on va créer un serializer pour la connexion des utilisateurs
class ConnectionSerializer(serializers.Serializer):
    password=serializers.CharField(write_only=True)
    email=serializers.EmailField(required=True)

    def validate(self,attrs):
        email=attrs.get('email')
        password=attrs.get('password')
        #je recupère l'utilisateur qui a cet email
        user=User.objects.filter(email=email).first()
        #je fais la validation
        if not user or not user.check_password(password):
            raise serializers.ValidationError("Identifiants de connexion invalides")
        if not user.is_active or not user.is_verified:
            raise serializers.ValidationError("Compte utilisateur désactivé")
        #on met à jour la date du dernier login
        User.objects.filter(email=email).update(last_login=timezone.now())
        #on génère les tokens JWT
        refresh=RefreshToken.for_user(user)
        return({
            'refresh':str(refresh),
            'access':str(refresh.access_token),
            'role':user.role,
            'username':user.username,
            'email':user.email,
        })
