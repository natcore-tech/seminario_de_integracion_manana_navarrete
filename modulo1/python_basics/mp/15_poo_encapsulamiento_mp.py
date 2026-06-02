class RegistroNotas:
    def __init__(self, titular, saldo_inicial=0):
        self.titular = titular
        self.__saldo = saldo_inicial
        self.__historial = []
        self.__activa = True
        self.__registrar(f"Registro creado con nota inicial {saldo_inicial}")

    @property
    def saldo(self):
        return self.__saldo

    @property
    def activa(self):
        return self.__activa

    @property
    def historial(self):
        return list(self.__historial)

    def depositar(self, cantidad):
        if cantidad <= 0:
            raise ValueError("La nota debe ser positiva")
        self.__saldo += cantidad
        self.__registrar(f"Nota agregada: +{cantidad}")
        return self

    def retirar(self, cantidad):
        if cantidad <= 0:
            raise ValueError("La nota debe ser positiva")
        if cantidad > self.__saldo:
            raise ValueError(f"Nota insuficiente (disponible: {self.__saldo})")
        self.__saldo -= cantidad
        self.__registrar(f"Nota reducida: -{cantidad}")
        return self

    def transferir(self, destino, cantidad):
        self.retirar(cantidad)
        destino.depositar(cantidad)
        self.__registrar(f"Transferencia de nota a {destino.titular}: -{cantidad}")
        return self

    def __registrar(self, operacion):
        from datetime import datetime
        hora = datetime.now().strftime("%H:%M:%S")
        self.__historial.append(f"[{hora}] {operacion}")

    def __str__(self):
        return f"RegistroNotas({self.titular}: {self.__saldo})"

registro1 = RegistroNotas("Ana García", 1000)
registro2 = RegistroNotas("Luis Pérez", 500)

registro1.depositar(500).retirar(200)
registro1.transferir(registro2, 300)

print(registro1)
print(registro2)
print(f"Nota de Ana: {registro1.saldo}")

for entrada in registro1.historial:
    print(f"  {entrada}")