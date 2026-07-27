# store/services/email.py
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings


def _send(subject: str, to: str, txt_template: str, html_template: str, context: dict) -> None:
    """
    Helper privado: renderiza ambas versiones del correo (texto plano + HTML)
    y lo envía con EmailMultiAlternatives.

    EmailMultiAlternatives envía texto plano como cuerpo principal y adjunta
    la versión HTML como alternativa. Los clientes que soportan HTML muestran
    la versión HTML; el resto usa texto plano.
    """
    text_body = render_to_string(txt_template, context)
    html_body = render_to_string(html_template, context)

    msg = EmailMultiAlternatives(
        subject=subject,
        body=text_body,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[to],
    )
    msg.attach_alternative(html_body, 'text/html')
    msg.send(fail_silently=False)


def send_welcome_email(user) -> None:
    """Envía correo de bienvenida cuando se registra un nuevo usuario."""
    _send(
        subject='¡Bienvenido a ShopAPI!',
        to=user.email,
        txt_template='emails/welcome.txt',
        html_template='emails/welcome.html',
        context={
            'username': user.username,
            'email':    user.email,
        },
    )

def send_password_reset_email(user, uid: str, token: str) -> None:
    """
    Envía correo con enlace de recuperación de contraseña.
    El enlace apunta al frontend, que luego llamará al endpoint de confirmación de la API.
    """
    reset_url = f"{settings.FRONTEND_URL}/password-reset/confirm/?uid={uid}&token={token}"

    _send(
        subject='Recuperación de contraseña — ShopAPI',
        to=user.email,
        txt_template='emails/password_reset.txt',
        html_template='emails/password_reset.html',
        context={
            'username':  user.username,
            'reset_url': reset_url,
        },
    )    

def send_order_confirmation_email(order) -> None:
    """
    Envía correo de confirmación cuando se crea una nueva orden.
    Incluye el detalle de ítems y el total.
    """
    items = [
        {
            'product_name': item.product.name,
            'quantity':     item.quantity,
            'unit_price':   item.unit_price,
            'subtotal':     round(item.quantity * float(item.unit_price), 2),
        }
        for item in order.items.select_related('product').all()
    ]

    _send(
        subject=f'Confirmación de pedido #{order.id} — ShopAPI',
        to=order.user.email,
        txt_template='emails/order_confirmation.txt',
        html_template='emails/order_confirmation.html',
        context={
            'username':   order.user.username,
            'order_id':   order.id,
            'items':      items,
            'total':      order.total,
            'status':     order.status,
            'created_at': order.created_at.strftime('%d/%m/%Y %H:%M'),
        },
    )    

def send_notification_email(user, subject: str, message: str) -> None:
    """
    Envía un correo de notificación personalizada a un usuario.
    Usada tanto para envíos individuales como masivos.
    """
    _send(
        subject=subject,
        to=user.email,
        txt_template='emails/notification.txt',
        html_template='emails/notification.html',
        context={
            'username': user.username,
            'subject':  subject,
            'message':  message,
        },
    )    