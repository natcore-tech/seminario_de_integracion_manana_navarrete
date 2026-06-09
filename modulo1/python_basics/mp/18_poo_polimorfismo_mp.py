class Nota:
    def __init__(self, estudiante, contenido):
        self.estudiante = estudiante
        self.contenido  = contenido

    def registrar(self):
        raise NotImplementedError("Las subclases deben implementar registrar()")

    def __str__(self):
        return f"{self.__class__.__name__} → {self.estudiante}"

class NotaMatematicas(Nota):
    def __init__(self, estudiante, contenido, calificacion=0.0):
        super().__init__(estudiante, contenido)
        self.calificacion = calificacion

    def registrar(self):
        return f"📐 Matemáticas para {self.estudiante}: [{self.calificacion}] {self.contenido}"

class NotaLenguaje(Nota):
    MAX_CHARS = 200

    def registrar(self):
        msg = self.contenido[:self.MAX_CHARS]
        return f"📖 Lenguaje para {self.estudiante}: {msg}"

class NotaCiencias(Nota):
    def registrar(self):
        return f"🔬 Ciencias para {self.estudiante}: {self.contenido[:50]}..."

class NotaHistoria(Nota):
    def __init__(self, periodo, contenido):
        super().__init__(periodo, contenido)

    def registrar(self):
        return f"📜 Historia {self.estudiante}: {self.contenido}"

def notificar_todos(notas: list):
    for nota in notas:
        print(f"  {nota.registrar()}")

registros = [
    NotaMatematicas("Juan García",  "Cálculo diferencial aprobado", 8.5),
    NotaLenguaje("María López",     "Análisis de literatura contemporánea"),
    NotaCiencias("Carlos Ruiz",     "Experimento de física completado exitosamente"),
    NotaHistoria("Edad Media",      "Manuscrito sobre feudalismo revisado"),
]

print("Registrando notas:")
notificar_todos(registros)

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