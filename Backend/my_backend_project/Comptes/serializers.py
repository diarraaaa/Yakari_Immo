from rest_framework import serializers
from .models import User, Locataire, Proprietaire

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
        #on sauvegarde l'utilisateur
        user.save()
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

        