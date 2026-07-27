# encapsulamiento.py

class CuentaBancaria:
    def __init__(self, titular, saldo_inicial=0):
        self.titular    = titular
        self.__saldo    = saldo_inicial     # __ → privado (name mangling)
        self.__historial = []
        self.__activa   = True
        self.__registrar(f"Cuenta creada con {saldo_inicial}€")

    # Property — getter (acceso como atributo, no como método)
    @property
    def saldo(self):
        return self.__saldo

    @property
    def activa(self):
        return self.__activa

    @property
    def historial(self):
        return list(self.__historial)   # devuelve copia, no referencia

    # Método público — la "ventanilla"
    def depositar(self, cantidad):
        if cantidad <= 0:
            raise ValueError("La cantidad debe ser positiva")
        self.__saldo += cantidad
        self.__registrar(f"Depósito: +{cantidad}€")
        return self

    def retirar(self, cantidad):
        if cantidad <= 0:
            raise ValueError("La cantidad debe ser positiva")
        if cantidad > self.__saldo:
            raise ValueError(f"Saldo insuficiente (disponible: {self.__saldo}€)")
        self.__saldo -= cantidad
        self.__registrar(f"Retiro: -{cantidad}€")
        return self

    def transferir(self, destino, cantidad):
        self.retirar(cantidad)
        destino.depositar(cantidad)
        self.__registrar(f"Transferencia a {destino.titular}: -{cantidad}€")
        return self

    # Método privado — solo para uso interno
    def __registrar(self, operacion):
        from datetime import datetime
        hora = datetime.now().strftime("%H:%M:%S")
        self.__historial.append(f"[{hora}] {operacion}")

    def __str__(self):
        return f"Cuenta({self.titular}: {self.__saldo}€)"

# Uso
c1 = CuentaBancaria("Ana García", 1000)
c2 = CuentaBancaria("Luis Pérez", 500)

c1.depositar(500).retirar(200)     # encadenamiento — depositar y retirar devuelven self
c1.transferir(c2, 300)

print(c1)    # Cuenta(Ana García: 1000€)
print(c2)    # Cuenta(Luis Pérez: 800€)
print(f"Saldo Ana: {c1.saldo}€")   # acceso como atributo (property)

# c1.__saldo = 99999  # AttributeError — acceso directo denegado
# c1.saldo = 99999    # AttributeError — no hay setter

for entrada in c1.historial:
    print(f"  {entrada}")