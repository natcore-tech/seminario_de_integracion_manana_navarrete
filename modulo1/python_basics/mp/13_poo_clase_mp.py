class Estudiante:
    institucion = "Universidad"

    def __init__(self, nombre, matricula):
        self.nombre = nombre
        self.matricula = matricula
        self.notas = []

    def saludar(self):
        return f"Estudiante: {self.nombre}, Matrícula: {self.matricula}"

    def cumplir_anios(self):
        self.notas.append(0)
        print(f"Se agregó un registro para {self.nombre}.")

    def __str__(self):
        return f"Estudiante({self.nombre}, {self.matricula})"

    def __repr__(self):
        return f"Estudiante(nombre={self.nombre!r}, matricula={self.matricula!r})"

estudiante1 = Estudiante("Ana García", "EST001")
estudiante2 = Estudiante("Luis Pérez", "EST002")

print(estudiante1.saludar())
print(estudiante2.saludar())
estudiante1.cumplir_anios()
print(str(estudiante1))
print(repr(estudiante1))
print(Estudiante.institucion)