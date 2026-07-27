print("Condicionales simples")
edad=input("Incluye edad")
if (int(edad)>=18):
    print("Mayor de edad")

print("Condicionales dos caminos")
temperatura=input("Incluye temperatura")
if (int(temperatura)>=38):
    print("Temperatura alta")
else:
    print("Temperatura normal")

print("Condicionales if anidados")
tiene_reserva=True
dinero=25
plato="pizza"
if (tiene_reserva):
    if (dinero>=20):
        if plato=="pizza":
            print("Tu pizza cuesta $20. Pedido confirmado")
        else:
            print("Plato disponible")
    else:
        print("Dinero insuficiente")
else:
    print("No tiene reserva")