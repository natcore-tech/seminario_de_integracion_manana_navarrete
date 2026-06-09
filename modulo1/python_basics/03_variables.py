# Enteros, Cadena de caracteres, booleano, None
nombre=("Ana Garcia") #string
edad=28               #int
altura=1.65           #float
activo=True           #bool
nulo=None             #NoneType

print(type(nombre))
print(type(edad))
print(type(altura))
print(type(activo))
print(type(nulo))

#Asignar valor varias variables en una linea
a, b, c = 1, 2, 3
print(a)
print(b)
print(c)

#Asignar el mismo valor a varias variables
a = b = c = 0
print(a)
print(b)
print(c)

#Intercambiar valores
x,y = 10,20
print(x,y)
x,y = y,x
print(x,y)

#Convenciones de nombres
nombre_completo="Rafael Urdaneta"   #snake_case
nombreCompleto="Rafael Urdaneta"    #no usar camelCase
MAX_REINTENTOS=3                    #Mayusculas sostenidas para constantes
_variable_interna="privada"         #para uso interno

# Manejo de Enteros
puqueno = 42
negativo = -17
grande=1_000_000_000_000
enorme= 2 ** 100

print(puqueno)
print(negativo)
print(grande)
print(enorme)

# Bases Numericas
binario=0b1010
octal=0o17
hexadecimal=0xFF
print(binario, octal, hexadecimal)

print(bin(255))
print(oct(255))
print(hex(255))

