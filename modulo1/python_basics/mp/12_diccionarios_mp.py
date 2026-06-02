notas = {}
alumno = {"nombre": "Ana", "curso": "1A", "nota": 8.5}
config = dict(materia="Matemáticas", trimestre=1, estado=True)

print(alumno["nombre"])
print(alumno.get("promedio"))
print(alumno.get("promedio", "Sin nota"))

alumno["promedio"] = 9.2
alumno["nota"] = 9.0
del alumno["curso"]
valor = alumno.pop("promedio")
print(alumno)

print("nombre" in alumno)
print("curso" in alumno)

print(alumno.keys())
print(alumno.values())
print(alumno.items())

for clave, valor in alumno.items():
    print(f"{clave}: {valor}")

alumno.update({"grupo": "B", "observacion": "Buen desempeño"})
print(alumno)

extra = {"estado": "Aprobado", "asistencia": 95}
completo = alumno | extra
print(completo)

registro = {
    "materia": "Matemáticas",
    "alumnos": {
        1: {"nombre": "Ana", "nota": 9.0},
        2: {"nombre": "Luis", "nota": 7.5},
    },
    "periodos": ["Primer trimestre", "Segundo trimestre"]
}

print(registro["alumnos"][1]["nombre"])
registro["alumnos"][3] = {"nombre": "Marta", "nota": 8.7}

alumno.setdefault("promedio_final", 9.0)
alumno.setdefault("nombre", "Otro")