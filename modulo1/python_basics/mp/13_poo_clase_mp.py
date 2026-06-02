# primera-clase.py

class Persona:
    # Atributo de clase — compartido por TODAS las instancias
    especie = "Homo sapiens"

    # __init__ es el constructor — se ejecuta al crear la instancia
    def __init__(self, nombre, edad):
        # Atributos de instancia — propios de cada objeto
        self.nombre = nombre
        self.edad   = edad

    # Método de instancia — self es la referencia al objeto
    def saludar(self):
        return f"Hola, soy {self.nombre} y tengo {self.edad} años."

    def cumplir_anios(self):
        self.edad += 1
        print(f"¡Feliz cumpleaños, {self.nombre}! Ahora tienes {self.edad}.")

    # __str__ — representación legible (para print y str())
    def __str__(self):
        return f"Persona({self.nombre}, {self.edad})"

    # __repr__ — representación oficial (para depuración)
    def __repr__(self):
        return f"Persona(nombre={self.nombre!r}, edad={self.edad!r})"

# Crear instancias (objetos) con la clase como función
ana  = Persona("Ana García", 28)
luis = Persona("Luis Pérez", 31)

print(ana.saludar())       # Hola, soy Ana García y tengo 28 años.
print(luis.saludar())      # Hola, soy Luis Pérez y tengo 31 años.
ana.cumplir_anios()        # ¡Feliz cumpleaños, Ana García! Ahora tienes 29.
print(str(ana))            # Persona(Ana García, 29)
print(repr(ana))           # Persona(nombre='Ana García', edad=29)
print(Persona.especie)     # Homo sapiens  — atributo de clase