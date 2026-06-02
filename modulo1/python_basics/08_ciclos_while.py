contador = 1
while (contador <= 5):
    print(f"Contador: {contador}")
    contador += 1


print("control del ciclo")
print("continue")
i = 1
while (i <= 5):
    i+=1
    if i == 2:
        continue
    print(f"Contador: {i}")
print("break")
i = 1
while (i <= 5):
    if i == 3:
        break
    print(f"Contador: {i}")
    i+=1

numero = int(input("Ingrese numero: "))
while numero!= 0:
    print("Ingresaste:", numero)
    numero = int(input("Ingrese numero: "))

contador = 1
while (contador <= 5):
    print(f"Contador: {contador}")
    contador += 1
else:
    print("Fin del ciclo")


contador = 1
while True:
    print(f"Contador: {contador}")
    contador += 1
    if not (contador <= 5):
        break


contrasena = "123"
while True:
    entrada = input("Ingrese la contraseña: ")
    if entrada == contrasena:
        print("acceso permitido")
        break
    else:
        print("Contraseña incorrecta")