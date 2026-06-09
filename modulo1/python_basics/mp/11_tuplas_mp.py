vacia = ()
unitaria = (10,)
estudiante = ("Mario", "A001", 8.5)
colegio = "IES Ejemplo"

punto = 5, 7
print(type(punto))

print(estudiante[0])
print(estudiante[-1])
print(estudiante[1:])

nombre_alumno, codigo, nota = estudiante
print(f"Alumno: {nombre_alumno} | Código: {codigo} | Nota: {nota}")

primero, *resto = (9.0, 7.5, 8.0, 6.0)
print(f"Primera nota: {primero}")
print(f"Resto de notas: {resto}")

*inicio, ultimo = (9.0, 7.5, 8.0, 6.0)
print(f"Inicio: {inicio}")
print(f"Última nota: {ultimo}")

def dividir(a, b):
    if b == 0:
        return None, "División por cero"
    return a / b, None

resultado, error = dividir(85, 10)
if error:
    print(f"Error: {error}")
else:
    print(f"Media parcial: {resultado:.2f}")

registro = {("A001", "Matemáticas"): 8.5, ("A002", "Lengua"): 7.0}
print(registro[("A001", "Matemáticas")])

class RegistroNotas:
    def __init__(self, nombre_colegio, datos=None):
        self.colegio = nombre_colegio
        self.datos = datos or {}

    def agregar(self, codigo, asignatura, nota):
        self.datos[(codigo, asignatura)] = nota

    def obtener(self, codigo, asignatura):
        return self.datos.get((codigo, asignatura))

reg = RegistroNotas(colegio, registro)
reg.agregar("A003", "Física", 9.0)
print(reg.obtener("A003", "Física"))