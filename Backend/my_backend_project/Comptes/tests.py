from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import User

class SignupTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.signup_url = '/api/signup/'
    def test_signup_success(self):
        #on crée un dataset de test
        data = {
            "username": "testuser2",
            "email": "test@example.com",
            "password": "password123",
            "role": "locataire",
            "first_name": "Jane",
            "last_name": "Smith",
            "telephone": "987654321",
            "numero_carte_identite": "ID654321"
        }
        #on crée la requete POST pour l'inscription
        response = self.client.post(self.signup_url, data, format='json')
        #on vérifie la réponse
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        #on véréifie que l'utilisateur a été créé dans la base de données
        self.assertTrue(User.objects.filter(email="test@example.com").exists())
    def test_signup_email_already_exists(self):
        #on crée un utilisateur existant
        User.objects.create_user(username="existing", email="test@example.com", password="123")
        #on tente de s'inscrire avec le même email
        data = {
            "username": "testuser2",
            "email": "test@example.com",
            "password": "password123",
            "role": "locataire",
            "first_name": "Jane",
            "last_name": "Smith",
            "telephone": "987654321",
            "numero_carte_identite": "ID654321"
        }
        #on envoie le request POST
        response = self.client.post(self.signup_url, data, format='json')
        #on verifie la réponse pour voir si on a l'erreur attendue
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        #on vérifie que l'utilisateur n'a pas été créé
        self.assertEqual(User.objects.count(), 1)

class LoginTestCase(TestCase):
    def setUp(self):
        #on met en place le client de test et crée un utilisateur pour les tests de connexion
        self.client = APIClient()
        self.login_url = '/api/login/'
        self.user = User.objects.create_user(
            username="testuser",
            email="test@example.com",
            password="strongpassword123",
            role="locataire",
            is_verified=True  #on s'assure que l'utilisateur est vérifié
        )

    def test_login_success(self):
        #on crée les données de connexion
        data = {"email": "test@example.com", "password": "strongpassword123"}
        #on envoie la requête POST pour la connexion
        response = self.client.post(self.login_url, data, format='json')
        #on vérifie la réponse
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        #on vérifie que les tokens JWT sont présents dans la réponse
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_login_invalid_password(self):
        data = {"email": "test@example.com", "password": "wrongpassword"}
        response = self.client.post(self.login_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_login_unverified_user(self):
        #on crée un utilisateur non vérifié
        user = User.objects.create_user(
            username="unverifieduser",
            email="unverified@example.com",
            password="strongpassword123",
            role="locataire",
            is_verified=False  #on s'assure que l'utilisateur n'est pas vérifié
        )
        data={
            "email": "unverified@example.com",
            "password": "strongpassword123"
        }
        #on envoie la requête POST pour la connexion
        response = self.client.post(self.login_url, data, format='json')
        #on vérifie la réponse
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
