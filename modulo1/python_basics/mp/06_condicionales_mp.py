print("Registro de notas")
nota=input("Incluye la nota final del estudiante: ")
if (int(nota)>=60):
    print("Nota aprobatoria")

print("Validacion de asistencia")
asistencia=input("Incluye el porcentaje de asistencia: ")
if (int(asistencia)>=80):
    print("Asistencia suficiente")
else:
    print("Asistencia insuficiente")

print("Registro de notas con validaciones anidadas")
tiene_matricula=True
nota_final=85
materia="matematicas"
if (tiene_matricula):
    if (nota_final>=70):
        if materia=="matematicas":
            print("La nota fue registrada correctamente")
        else:
            print("Materia registrada")
    else:
        print("Nota insuficiente para registrar")
else:
    print("No tiene matricula")