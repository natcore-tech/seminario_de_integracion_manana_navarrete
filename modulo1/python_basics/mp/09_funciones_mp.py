print('Funciones de python')
print('Funcion basica')

def saludar():
    print('Hola desde la UTE')

saludar()


print('Funcion con parametros')
def saludarConNombre(nombre):
    print(f'Hola: {nombre} que tal?')

saludarConNombre('Danna')
saludarConNombre('Maria')

print('Funcion que devyelve valor con return')
def sumar(a, b):
    return a + b

print(sumar(5,6))

print('Funcion con valor por posicion')
def presentar(nombre, edad,ciudad):
    print(f'{nombre},{edad}, {ciudad}')
presentar('Danna', 26, 'Quito')  #por posicion
presentar(ciudad= 'guayaquil',nombre='Juan', edad=40) #por nombre

print('Funcion con valor por defecto')
def saludo_Con_Parametros_Por_Defecto(nombre, saludo="Hola",puntuacion="f"):
    print(f'{saludo}, {nombre} {puntuacion}')
saludo_Con_Parametros_Por_Defecto('Danna' , "Buenos dias", "...")  #por posicion
saludo_Con_Parametros_Por_Defecto("Juan", puntuacion="...")
saludo_Con_Parametros_Por_Defecto("Carlos", "Buenas tardes")



print('Funcion parametros posicionales')
def sumar_todos(*args):
    print(f"argumentos recibidos: {args}")
    return sum(args)

print(sumar_todos(1,2,3))
print(sumar_todos(1,2,3,4,5,6,7))
print(sumar_todos(10,20,22))


print('Funcion parametros combinados con posicional')
def mostrar_info(titulo,*datos):
    print(f"argumentos recibidos: {titulo}, {datos}")
    print(titulo)
    for dato in datos:
        print(f"  - {dato}")
    
mostrar_info("frutas","naranja", "piña", "melon", "manzana")

print('Funcion parametros con clave valor variables')
def crear_perfil(**kwargs):
    print(f"argumentos recibidos: {kwargs}")
    for clave,valor in kwargs.items():
        print(f" {clave}: {valor}")
    
crear_perfil(nombre="Danna", apellido="Gonzalez",edad=20 ,ciudad="Quito")


print("Funcion parametros comnbinacion de todos los tipos")
def configurar(host, *puertos, debug=False, **opciones):
    print(f"Host: {host}")
    print(f"Puerto: {puertos}")
    print(f"Debug: {debug}")
    print(f"opciones: {opciones}")

configurar("localhost", 80, 443,8080, debug=True, timeout=30, ssl=True)

print("Devolver multiples valores")
def minmax(numeros):
    return min(numeros), max(numeros)

minimo, maximo = minmax([3,5,7,2,8,9])
print(f"El valor máximo es: {maximo}, el valor mínimo es: {minimo}")
_, maximo = minmax([12,13,16,24,100])
print(f"Solo maximo {maximo}")


print("Devolver un diccionario en el caso de muchos valores")
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
datos = [12,88,44,55,23,45]
stats = analizar(datos)
print(f"Total: {stats['total']}")
print(f"Media: {stats['media']:.2f}")
print(f"Rango: {stats['minimo'] - stats['maximo']}")


print("Funciones Lambdas")
def double(x):
    return x * 2
double_lambda = lambda x: x * 2 
print(double(2))
print(double_lambda(2))
suma =lambda a,b: a+b
print(suma(5,4))
