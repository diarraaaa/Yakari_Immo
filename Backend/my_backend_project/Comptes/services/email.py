from django.core.mail import send_mail
from django.conf import settings

def send_verification_email(user):

    #on va créer le lien de vérification
    verification_link = f"https://glowing-fishstick-wwrrpx5x6v5f96rq.github.dev///api/verify-email/{user.verification_token}/"
    send_mail(
        subject="Vérification de votre email sur Yakari Immo",
        message=f"Veuillez cliquer sur le lien suivant pour vérifier votre email sur Yakari Immo: {verification_link}",
        html_message=f"<p>Veuillez cliquer sur le lien suivant pour vérifier votre email sur Yakari Immo: <a href='{verification_link}'>Vérifier mon email</a></p>",
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        fail_silently=False,
    )