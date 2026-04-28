def descuento(edad, precio):
    if edad < 18:
        return (precio * 0.2)
    elif edad < 60:
        return (precio * 0.3)
    else:
        return "Sin descuento"

for i in range(1, 5):
    nombre=input("Ingrese su nombre: ")
    edad=int(input(f"{nombre}, ingrese su edad: "))
    precio=float(input(f"{nombre}, ingrese su tipo de plan (Tipo 1 o Tipo 2): "))
    if precio == 1:
        precio=30.00
    elif precio == 2:
        precio=50.00
    else:
        print("Tipo de plan no válido")
        continue        
    des=descuento(edad,precio)
    print(f"{nombre}, Tipo plan: {precio}, Descuento: {des}")