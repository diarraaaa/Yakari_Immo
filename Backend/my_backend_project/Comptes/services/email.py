from django.core.mail import send_mail
from django.conf import settings

def send_verification_email(user):

    #on va créer le lien de vérification
    verification_link = f"https://redesigned-dollop-7v7jr45j69pfr6ww-8000.app.github.dev//api/verify-email/{user.verification_token}/"
    send_mail(
        subject="Vérification de votre email sur Yakari Immo",
        message=f"Veuillez cliquer sur le lien suivant pour vérifier votre email: {verification_link}",
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        fail_silently=False,
    )