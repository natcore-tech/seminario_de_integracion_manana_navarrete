print("Ciclo for")
frutas=["manzana","banana","pera","sandia",]
for fruta in frutas:
    print(fruta)
print("Recorrer palabras")
for letra in "frutas":
    print(letra)

print("Recorrer rango")
for i in range(1,10,2):
    print(i)

print("Enumerar lista")
for i in enumerate(frutas):
    print(i)

print("Dos listas a la vez")
nombres=["Maria","Jose","Luis",]
edades=[18,24]
for nombre,edad in zip(nombres,edades):
    print(nombre,edad)

print("Control del Ciclo")
print("Break")
for i in range(5):
    if i==6:
        break
    print(i)
print("Continue")
for i in range(5):
    if i==2:
        continue
    print(i)

print("For anidado")
for i in range(3):
    for j in range(2):
        print(i,j)
print("Lista comprehension forma corta")
cuadrados=[x**2 for x in range(5)]
print(cuadrados)