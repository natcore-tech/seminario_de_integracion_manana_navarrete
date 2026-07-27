registros = []
print("Sistema de registro de notas")

cantidad = 1
while cantidad <= 5:
    nombre = input(f"Alumno {cantidad} - Nombre (dejar vacio para omitir): ")
    if nombre == "":
        cantidad += 1
        continue
    try:
        nota = float(input(f"{nombre} - Nota (0-100): "))
    except ValueError:
        print("Nota inválida, se omite alumno")
        cantidad += 1
        continue
    registros.append((nombre, nota))
    cantidad += 1

print("Resumen de registros:")
for alumno, nota in registros:
    print(f"Alumno: {alumno} - Nota: {nota}")

print("Registro por entrada hasta 0")
valor = None
valor = input("Ingrese nota (0 para finalizar): ")
while valor != "0":
    try:
        v = float(valor)
        print(f"Nota registrada: {v}")
    except ValueError:
        print("Entrada no válida")
    valor = input("Ingrese nota (0 para finalizar): ")

cont = 1
while cont <= 5:
    print(f"Procesando registro {cont}")
    cont += 1
else:
    print("Procesamiento completado")

cont = 1
while True:
    if cont > 5:
        break
    print(f"Verificando registro {cont}")
    cont += 1

clave = "profesor"
while True:
    intento = input("Ingrese la clave del sistema: ")
    if intento == clave:
        print("Acceso concedido")
        break
    else:
        print("Clave incorrecta")