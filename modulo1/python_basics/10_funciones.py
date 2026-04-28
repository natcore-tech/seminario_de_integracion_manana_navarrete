print("funciones en python")
print("funcion básica")
def saludar():
    print("Hola desde la UTE")

saludar()
print("funcion con parametro")
def saludarConNombre(nombre):
    print(f"Hola: {nombre}, Que tal?")

saludarConNombre("John")
saludarConNombre("Maria")


print("funcion que devuelve valor con return")
def sumar(a, b):
    return a+b

print(sumar(5,6)) 

print("funcion parametros por posición y por nombre" )
def presentar(nombre, edad, ciudad):
    print(f"{nombre}, {edad}, {ciudad}")

presentar("Pedro",60, "Quito") # Por posición 
presentar(ciudad="Guayaquil",nombre="Juan", edad=40) # Por nombre


print("funcion parametros por defecto" )
def saludo_con_parametros_por_defecto(nombre, saludo="Hola", puntuacion="!"):
    print(f"{saludo} {nombre} {puntuacion}")

saludo_con_parametros_por_defecto("Pedro","Buenos Días", "...")
saludo_con_parametros_por_defecto("Juan", puntuacion="...")
saludo_con_parametros_por_defecto("Carlos", "Buenas tardes")

print("funcion parametros posicionales" )
def sumar_todos(*args):
    print(f"Argumentos recibidos {args} ")
    return sum(args)

print(sumar_todos(1,2,3))
print(sumar_todos(1,2,3,4,5,6,7))
print(sumar_todos(10,20,22))


print("funcion parametros combinados con posicional" )
def mostrar_info(titulo, *datos):
    print(f"Argumentos recibidos {titulo} {datos} ")
    print(titulo)
    for dato in datos:
        print(f" - {dato}")

mostrar_info("Frutas","naranja","piña", "melon", "manzana")


print("funcion parametros combinados con posicional" )
def mostrar_info(titulo, *datos):
    print(f"Argumentos recibidos {titulo} {datos} ")
    print(titulo)
    for dato in datos:
        print(f" - {dato}")

mostrar_info("Frutas","naranja","piña", "melon", "manzana")


print("funcion parametros clave valor variables" )
def crear_perfil(**kwargs):
    print(f"Argumentos recibidos {kwargs} ")    
    for clave, valor in kwargs.items():
        print(f"{clave}: {valor}")

crear_perfil(nombre="Ana",apellido="Paris",edad=26, ciudad="Quito")


print("funcion parametros combinacion de todos los tipos" )
def configurar(host, *puertos, debug=False, **opciones):
    print(f"Host: {host} ")
    print(f"Puertos: {puertos} ")
    print(f"Debug: {debug} ")
    print(f"Opciones: {opciones} ")
    

configurar("localhost", 80,443,8080, debug=True, timeout=30, ssl=True)

print("Devolver multiples valores" )
def minmax(numeros):
    return min(numeros), max(numeros)
minimo, maximo = minmax([3,5,7,2,8,9])
print(f"Minimo {minimo}, Maximo {maximo}")
_, maximo = minmax([12,13,16,24,100])
print(f"Solo maximo {maximo}")


print("Devolver diccionario en el caso de muchos valores" )
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
print(f"Total:  {stats['total']}")
print(f"Media:  {stats['media']:.2f}")
print(f"Rango:  {stats['minimo']}-{stats['maximo']}")

print("funciones Lambdas")
def doble(x):
    return x*2
doble_lambda=lambda x: x*2
print(doble(2))
print(doble_lambda(2))
suma=lambda a,b: a+b
print(suma(5,4))