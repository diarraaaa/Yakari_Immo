import django 
from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils import timezone
from datetime import timedelta

# Create your models here.
#On crée un modèle personnalisé pour les utilisateurs en héritant du modèle AbstractUser de Django
class User(AbstractUser):
    roles=[
        ('proprietaire','Proprietaire'),
        ('locataire','Locataire'),
    ]
#on crée un champ supplémentaire pour stocker le rôle de l'utilisateur
    role=models.CharField(max_length=20,choices=roles)
    email=models.EmailField(unique=True)
    is_verified=models.BooleanField(default=False)
    verification_token=models.CharField(max_length=100,null=True,blank=True)
    moyen_connexion=models.CharField(max_length=50,default='email') #standard, google, facebook, etc.
    #on met une limite d'expiration pour le token de vérification
    token_expires_at=models.DateTimeField(default=timezone.now()+timedelta(hours=24))
    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_set',
        blank=True,
        help_text='The groups this user belongs to.'
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_permissions_set',
        blank=True,
        help_text='Specific permissions for this user.'
    )
    #on crée les méthodes pour avoir le role de l'utilisateur
    def is_proprietaire(self):
        return self.role=='proprietaire'
    @property
    def is_locataire(self):
        return self.role=='locataire'
    @property
    def __str__(self):
        return self.email
    
#on crée un modèle pour les locataires qui est lié au modèle User par une relation OneToOne
class Locataire(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE,related_name='locataire_profile')
    telephone=models.CharField(max_length=15)
    numero_carte_identite=models.CharField(max_length=50)
    def __str__(self):
        return f"Locataire: {self.user.email} {self.user.first_name} {self.user.last_name}"

#on crée un modèle pour les propriétaires qui est lié au modèle User par une relation OneToOne
class Proprietaire(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE,related_name='proprietaire_profile')
    telephone=models.CharField(max_length=15)
    numero_carte_identite=models.CharField(max_length=50)
    def __str__(self):
        return f"Propriétaire: {self.user.email} {self.user.first_name} {self.user.last_name}"