print("Condicionales if anidados")
aos=input("Cuantos años tiene en la empresa: ")
cal=input("Desempeño: ")
sal=input("Salario: ")

if (int(aos)>=1):
    if (int(cal)>=8):
        if int(sal)<1000:
            print("Obtuviste bono de 1000")
        elif int(sal)>=1000:
            print("Obtuviste bono de 100")
    else:
        print("No hay bono")
else:
    print("No cumple años de antiguedad")