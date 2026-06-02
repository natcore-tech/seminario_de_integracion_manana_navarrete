print("Sistema de Registro de Notas")
print("Inicializar Registro")
vacia = []
print(f"Registro vacío: {vacia}")
numeros = [85, 92, 78, 88, 95, 81, 87]
print(f"Notas registradas: {numeros}")
estudiantes = ["Juan", "Pedro", "Carlos","Maria", "Petra","Juana"]
print(f"Estudiantes: {estudiantes}")
mixta = [1, "Matemáticas", "Aprobado", True, None, 8.5]
print(f"Registro mixto: {mixta}")
anidada = [1, [85,90,[75,88,92]],79,86]
print(f"Registro anidado: {anidada}")

print("Acceso a los registros de estudiantes")
print(f"Primer estudiante: {estudiantes[0]}")
print(f"Último estudiante: {estudiantes[-1]}")
print(f"Estudiantes del índice 1 al 3: {estudiantes[1:3]}")
print(f"Estudiantes en orden inverso: {estudiantes[::-1]}")

print("Operaciones CRUD del sistema de notas")
calificaciones =['8.5', '9.0', '7.5','6.8']
calificaciones.append('8.2')
print(f"Después de agregar nota: {calificaciones}")
calificaciones.insert(1,'9.5')
print(f"Después de insertar nota: {calificaciones}")
calificaciones.extend(['7.8','8.9'])
print(f"Actualizar calificación: {calificaciones}")
calificaciones[0]="8.7"
print(f"Calificación modificada: {calificaciones}")
calificaciones.remove('6.8')
print(f"Después de eliminar nota: {calificaciones}")
eliminado = calificaciones.pop()
print(f"Registro restante: {calificaciones}")
eliminado = calificaciones.pop(0)
print(f"Después de eliminar primera nota: {calificaciones}")
del calificaciones[0]
print(f"Registro final: {calificaciones}")

print("Búsqueda de valores en el registro")
print(f"¿Existe 7.8 en registros?: {'7.8' in calificaciones}")
print(f"Posición de 7.8: {calificaciones.index('7.8')}")
print(f"Cantidad de 7.8: {calificaciones.count('7.8')}")

print("Ordenar notas")
notas_desordenadas=[7.5,8.2,9.0,7.0,8.8,6.5,7.3,8.2]
print(f"Notas sin ordenar: {notas_desordenadas}")
notas_desordenadas.sort()
print(f"Notas ordenadas ascendente: {notas_desordenadas}")
notas_desordenadas.sort(reverse=True)
print(f"Notas ordenadas descendente: {notas_desordenadas}")
ordenada = sorted(notas_desordenadas)
print(f"Notas originales: {notas_desordenadas}")
print(f"Notas ordenadas nuevo: {ordenada}")

