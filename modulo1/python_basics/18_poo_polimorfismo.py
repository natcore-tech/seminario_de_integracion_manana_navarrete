# polimorfismo.py

# POLIMORFISMO POR HERENCIA — override de métodos
class Notificacion:
    """Clase base abstracta."""
    def __init__(self, destinatario, mensaje):
        self.destinatario = destinatario
        self.mensaje      = mensaje

    def enviar(self):
        raise NotImplementedError("Las subclases deben implementar enviar()")

    def __str__(self):
        return f"{self.__class__.__name__} → {self.destinatario}"

class NotificacionEmail(Notificacion):
    def __init__(self, destinatario, mensaje, asunto="Sin asunto"):
        super().__init__(destinatario, mensaje)
        self.asunto = asunto

    def enviar(self):
        return f"📧 Email a {self.destinatario}: [{self.asunto}] {self.mensaje}"

class NotificacionSMS(Notificacion):
    MAX_CHARS = 160

    def enviar(self):
        msg = self.mensaje[:self.MAX_CHARS]
        return f"📱 SMS a {self.destinatario}: {msg}"

class NotificacionPush(Notificacion):
    def enviar(self):
        return f"🔔 Push a {self.destinatario}: {self.mensaje[:50]}..."

class NotificacionSlack(Notificacion):
    def __init__(self, canal, mensaje):
        super().__init__(canal, mensaje)

    def enviar(self):
        return f"💬 Slack #{self.destinatario}: {self.mensaje}"

# Polimorfismo en acción — misma función, distintos tipos
def notificar_todos(notificaciones: list):
    for notif in notificaciones:
        print(f"  {notif.enviar()}")   # cada uno envía a su manera

alertas = [
    NotificacionEmail("ana@email.com",  "Tu pedido fue enviado", "Pedido #1234"),
    NotificacionSMS("600111222",        "Tu pedido está en camino"),
    NotificacionPush("dispositivo-abc", "¡Nuevo mensaje recibido!"),
    NotificacionSlack("alertas",        "Servidor caído — revisar urgente"),
]

print("Enviando notificaciones:")
notificar_todos(alertas)

# POLIMORFISMO DUCK TYPING — sin herencia
# "Si camina como un pato y grazna como un pato, es un pato"
class ArchivoLocal:
    def leer(self):   return "datos desde disco local"
    def escribir(self, datos): print(f"Guardando en disco: {datos[:30]}...")

class ArchivoNube:
    def leer(self):   return "datos desde la nube"
    def escribir(self, datos): print(f"Subiendo a la nube: {datos[:30]}...")

class ArchivoBD:
    def leer(self):   return "datos desde base de datos"
    def escribir(self, datos): print(f"Insertando en BD: {datos[:30]}...")

# Esta función funciona con CUALQUIER objeto que tenga leer() y escribir()
def procesar_archivo(archivo):
    contenido = archivo.leer()
    print(f"Procesando: {contenido}")
    archivo.escribir(f"resultado_{contenido}")

for archivo in [ArchivoLocal(), ArchivoNube(), ArchivoBD()]:
    procesar_archivo(archivo)