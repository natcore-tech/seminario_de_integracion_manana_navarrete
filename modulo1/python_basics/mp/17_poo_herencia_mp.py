class Estudiante:
    def __init__(self, nombre, apellido, matricula):
        self.nombre = nombre
        self.apellido = apellido
        self.matricula = matricula
        self._promedio = 0

    def agregar_nota(self, incremento):
        self._promedio += incremento
        return self

    def restar_nota(self, decremento):
        self._promedio = max(0, self._promedio - decremento)
        return self

    def __str__(self):
        return f"{self.nombre} {self.apellido} ({self.matricula}) — Promedio: {self._promedio}"

class EstudiantePresencial(Estudiante):
    def __init__(self, nombre, apellido, matricula, grupo=1):
        super().__init__(nombre, apellido, matricula)
        self.grupo = grupo

    def asistir(self):
        return f"{self.nombre} {self.apellido}: Presente"

    def __str__(self):
        return f"{super().__str__()} (Grupo: {self.grupo})"

class EstudianteVirtual(Estudiante):
    def __init__(self, nombre, apellido, matricula, plataforma):
        super().__init__(nombre, apellido, matricula)
        self.plataforma = plataforma

    def conectar(self):
        return f"📱 {self.nombre} se conecta desde {self.plataforma}"

    def __str__(self):
        return f"{super().__str__()} ({self.plataforma})"

class EstudianteHibridoAvanzado(EstudiantePresencial):
    def __init__(self, nombre, apellido, matricula, calificacion_especial):
        super().__init__(nombre, apellido, matricula)
        self.__calificacion_especial = calificacion_especial
        self.__creditos = 100

    def acumular_creditos(self, porcentaje=100):
        self.__creditos = min(100, self.__creditos + porcentaje)
        return self

    @property
    def puntos_disponibles(self):
        return self.__calificacion_especial * self.__creditos / 100

    def __str__(self):
        return (f"{super().__str__()} | "
                f"Créditos: {self.__creditos}% | "
                f"Puntos: {self.puntos_disponibles:.0f}")

estudiante = EstudianteHibridoAvanzado("Juan", "Pérez", 12345, 50)
estudiante.agregar_nota(8)
print(estudiante)

print(isinstance(estudiante, EstudianteHibridoAvanzado))
print(isinstance(estudiante, EstudiantePresencial))
print(isinstance(estudiante, Estudiante))
print(isinstance(estudiante, EstudianteVirtual))

print(EstudianteHibridoAvanzado.__mro__)