# herencia.py

class Vehiculo:
    def __init__(self, marca, modelo, año):
        self.marca  = marca
        self.modelo = modelo
        self.año    = año
        self._velocidad = 0    # _ → convención "protegido"

    def acelerar(self, incremento):
        self._velocidad += incremento
        return self

    def frenar(self, decremento):
        self._velocidad = max(0, self._velocidad - decremento)
        return self

    def __str__(self):
        return f"{self.marca} {self.modelo} ({self.año}) — {self._velocidad} km/h"

class Coche(Vehiculo):
    def __init__(self, marca, modelo, año, puertas=4):
        super().__init__(marca, modelo, año)   # llama al constructor del padre
        self.puertas = puertas

    def bocinar(self):
        return f"{self.marca} {self.modelo}: ¡Piiip!"

    def __str__(self):
        return f"{super().__str__()} ({self.puertas} puertas)"

class Moto(Vehiculo):
    def __init__(self, marca, modelo, año, cilindrada):
        super().__init__(marca, modelo, año)
        self.cilindrada = cilindrada

    def hacer_wheelie(self):
        return f"🏍 {self.marca} hace un wheelie!"

    def __str__(self):
        return f"{super().__str__()} ({self.cilindrada}cc)"

class CocheElectrico(Coche):
    def __init__(self, marca, modelo, año, autonomia):
        super().__init__(marca, modelo, año)
        self.__autonomia = autonomia
        self.__bateria   = 100

    def cargar(self, porcentaje=100):
        self.__bateria = min(100, self.__bateria + porcentaje)
        return self

    @property
    def autonomia_restante(self):
        return self.__autonomia * self.__bateria / 100

    def __str__(self):
        return (f"{super().__str__()} | "
                f"Batería: {self.__bateria}% | "
                f"Autonomía: {self.autonomia_restante:.0f}km")

# Herencia — cada objeto es también de todos sus tipos padre
tesla = CocheElectrico("Tesla", "Model 3", 2024, 500)
tesla.acelerar(100)
print(tesla)

print(isinstance(tesla, CocheElectrico))  # True
print(isinstance(tesla, Coche))           # True — herencia
print(isinstance(tesla, Vehiculo))        # True — herencia transitiva
print(isinstance(tesla, Moto))            # False

# MRO — Method Resolution Order
print(CocheElectrico.__mro__)