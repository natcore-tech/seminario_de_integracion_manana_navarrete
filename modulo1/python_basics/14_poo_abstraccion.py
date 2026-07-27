# abstraccion.py
from abc import ABC, abstractmethod

# ABC (Abstract Base Class) — clase abstracta que no puede instanciarse
class Forma(ABC):
    def __init__(self, color="negro"):
        self.color = color

    # Método abstracto — CADA subclase DEBE implementarlo
    @abstractmethod
    def area(self) -> float:
        pass

    @abstractmethod
    def perimetro(self) -> float:
        pass

    # Método concreto — compartido por todas las formas
    def describir(self) -> str:
        return (f"{self.__class__.__name__} {self.color}: "
                f"área={self.area():.2f}, perímetro={self.perimetro():.2f}")

# Forma()  # TypeError — no puede instanciarse

class Circulo(Forma):
    def __init__(self, radio, color="negro"):
        super().__init__(color)
        self.radio = radio

    def area(self):
        import math
        return math.pi * self.radio ** 2

    def perimetro(self):
        import math
        return 2 * math.pi * self.radio

class Rectangulo(Forma):
    def __init__(self, ancho, alto, color="negro"):
        super().__init__(color)
        self.ancho = ancho
        self.alto  = alto

    def area(self):
        return self.ancho * self.alto

    def perimetro(self):
        return 2 * (self.ancho + self.alto)

class Triangulo(Forma):
    def __init__(self, a, b, c, color="negro"):
        super().__init__(color)
        self.a, self.b, self.c = a, b, c

    def perimetro(self):
        return self.a + self.b + self.c

    def area(self):
        s = self.perimetro() / 2
        return (s * (s - self.a) * (s - self.b) * (s - self.c)) ** 0.5

# Polimorfismo — mismo código para cualquier Forma
formas = [Circulo(5, "rojo"), Rectangulo(4, 6, "azul"), Triangulo(3, 4, 5, "verde")]

for forma in formas:
    print(forma.describir())

area_total = sum(f.area() for f in formas)
print(f"Área total: {area_total:.2f}")