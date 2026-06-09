# tuplas.py

# Crear tuplas
vacia      = ()
unitaria   = (42,)          # ← la coma es obligatoria para una tupla de un elemento
coordenada = (3, 4)
rgb        = (255, 128, 0)
persona    = ("Ana", 28, "Madrid")

# Tupla sin paréntesis — el empaquetado implícito
punto  = 10, 20             # también es una tupla
print(type(punto))          # <class 'tuple'>

# Acceso — igual que las listas
print(persona[0])           # Ana
print(persona[-1])          # Madrid
print(persona[1:])          # (28, 'Madrid')

# Las tuplas son INMUTABLES
# persona[0] = "Luis"       # TypeError — no se puede modificar

# Desempaquetado (unpacking)
nombre, edad, ciudad = persona
print(nombre, edad, ciudad)  # Ana 28 Madrid

# Desempaquetado con *
primero, *resto = (1, 2, 3, 4, 5)
print(primero)   # 1
print(resto)     # [2, 3, 4, 5]

*inicio, ultimo = (1, 2, 3, 4, 5)
print(inicio)    # [1, 2, 3, 4]
print(ultimo)    # 5

# Tuplas de retorno de funciones
def dividir(a, b):
    if b == 0:
        return None, "División por cero"
    return a / b, None

resultado, error = dividir(10, 3)
if error:
    print(f"Error: {error}")
else:
    print(f"Resultado: {resultado:.4f}")

# Tuplas como claves de diccionario (las listas NO pueden ser claves)
coordenadas = {(0, 0): "origen", (1, 0): "eje X", (0, 1): "eje Y"}
print(coordenadas[(0, 0)])   # origen

# Cuándo usar tuple vs list
# tuple → datos que no cambian: RGB, coordenadas, registros de BD
# list  → datos que se modifican: colección de usuarios, carrito, etc.