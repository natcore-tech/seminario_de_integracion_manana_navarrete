print('Sistema de registro de notas')
print('Operaciones básicas')

def saludar():
    print('Bienvenido al sistema de notas')

saludar()


print('Registrar estudiante')
def saludarConNombre(nombre):
    print(f'Estudiante: {nombre} registrado')

saludarConNombre('Danna')
saludarConNombre('Maria')

print('Calcular total de dos notas')
def sumar(a, b):
    return a + b

print(sumar(5,6))

print('Presentar información del estudiante')
def presentar(nombre, edad,ciudad):
    print(f'Nombre: {nombre}, Edad: {edad}, Ciudad: {ciudad}')
presentar('Danna', 20, 'Quito')
presentar(ciudad='Guayaquil', nombre='Juan', edad=22)

print('Notificaciones del sistema')
def saludo_Con_Parametros_Por_Defecto(nombre, saludo="Nota",puntuacion="N/A"):
    print(f'{saludo} para {nombre}: {puntuacion}')
saludo_Con_Parametros_Por_Defecto('Danna' , "Nota final", "9.5")
saludo_Con_Parametros_Por_Defecto("Juan", puntuacion="8.0")
saludo_Con_Parametros_Por_Defecto("Carlos", "Nota parcial")



print('Sumar varias notas')
def sumar_todos(*args):
    print(f"notas recibidas: {args}")
    return sum(args)

print(sumar_todos(8,9,10))
print(sumar_todos(7,8,9,10,9,8,7))
print(sumar_todos(10,9,9))


print('Listado de cursos y alumnos')
def mostrar_info(titulo,*datos):
    print(f"{titulo}: {datos}")
    print(titulo)
    for dato in datos:
        print(f"  - {dato}")
    
mostrar_info("Curso: Matemáticas","Danna", "Juan", "Carlos")

print('Crear perfil de estudiante')
def crear_perfil(**kwargs):
    print(f"perfil: {kwargs}")
    for clave,valor in kwargs.items():
        print(f" {clave}: {valor}")
    
crear_perfil(nombre="Danna", apellido="Gonzalez", edad=20, ciudad="Quito", promedio=9.2)


print("Configurar sistema de notas")
def configurar(host, *puertos, debug=False, **opciones):
    print(f"Host: {host}")
    print(f"Puertos: {puertos}")
    print(f"Modo debug: {debug}")
    print(f"Opciones: {opciones}")

configurar("localhost", 80, 443, 8080, debug=True, timeout=30, modo="produccion")

print("Calcular mínimo y máximo de notas")
def minmax(numeros):
    return min(numeros), max(numeros)

minimo, maximo = minmax([6,8,7,5,9,10])
print(f"Nota máxima: {maximo}, nota mínima: {minimo}")
_, maximo = minmax([7,8,8,9,10])
print(f"Solo máximo {maximo}")


print("Analizar conjunto de notas")
def analizar(numeros):
    total = sum(numeros)
    n=len(numeros)

    return {
        "total": total,
        "media": total/n if n >0 else 0,
        "minimo": min(numeros) if numeros else None,
        "maximo": max(numeros) if numeros else None,
        "count": n
    }
datos = [8,9,7,10,6,9]
stats = analizar(datos)
print(f"Total: {stats['total']}")
print(f"Media: {stats['media']:.2f}")
print(f"Rango: {stats['maximo'] - stats['minimo']}")


print("Funciones auxiliares")
def double(x):
    return x * 2
double_lambda = lambda x: x * 2 
print(double(5))
print(double_lambda(6))
suma =lambda a,b: a+b
print(suma(9,1))
