print("Registro de Notas - Sistema de Estudiantes")
asignaturas=["Matematica","Programacion","Fisica","Historia",]
for asignatura in asignaturas:
    print(asignatura)
print("Calificaciones por letra")
for letra in "ABCDEF":
    print(letra)

print("Generador de IDs de estudiantes")
for i in range(1,10,2):
    print(f"ID Estudiante: {i}")

print("Enumeracion de asignaturas")
for i in enumerate(asignaturas):
    print(i)

print("Registro de estudiantes y notas")
estudiantes=["Maria","Jose","Luis",]
notas=[18,24]
for estudiante,nota in zip(estudiantes,notas):
    print(f"{estudiante}: {nota} puntos")

print("Validacion de notas aprobadas")
print("Filtrar notas menores a 10")
for i in range(5):
    if i==6:
        break
    print(f"Nota minima requerida: {i}")
print("Saltar estudiantes sin registro")
for i in range(5):
    if i==2:
        continue
    print(f"Procesando estudiante {i}")

print("Calculo de promedios multiples")
for i in range(3):
    for j in range(2):
        print(f"Promedio cuatrimestre {i} materia {j}")
print("Generador de rangos de calificacion")
rangos=[x*10 for x in range(5)]
print(rangos)