from abc import ABC, abstractmethod

class Evaluacion(ABC):
    def __init__(self, nombre=""):
        self.nombre = nombre

    @abstractmethod
    def area(self) -> float:
        pass

    @abstractmethod
    def perimetro(self) -> float:
        pass

    def describir(self) -> str:
        return (f"{self.__class__.__name__} {self.nombre}: "
                f"área={self.area():.2f}, perímetro={self.perimetro():.2f}")

class Examen(Evaluacion):
    def __init__(self, radio, nombre=""):
        super().__init__(nombre)
        self.radio = radio

    def area(self):
        import math
        return math.pi * self.radio ** 2

    def perimetro(self):
        import math
        return 2 * math.pi * self.radio

class Tarea(Evaluacion):
    def __init__(self, ancho, alto, nombre=""):
        super().__init__(nombre)
        self.ancho = ancho
        self.alto  = alto

    def area(self):
        return self.ancho * self.alto

    def perimetro(self):
        return 2 * (self.ancho + self.alto)

class Proyecto(Evaluacion):
    def __init__(self, a, b, c, nombre=""):
        super().__init__(nombre)
        self.a, self.b, self.c = a, b, c

    def perimetro(self):
        return self.a + self.b + self.c

    def area(self):
        s = self.perimetro() / 2
        return (s * (s - self.a) * (s - self.b) * (s - self.c)) ** 0.5

evaluaciones = [Examen(5, "Matemáticas"), Tarea(4, 6, "Programación"), Proyecto(3, 4, 5, "Física")]

for evaluacion in evaluaciones:
    print(evaluacion.describir())

total = sum(f.area() for f in evaluaciones)
print(f"Total: {total:.2f}")