def clasificar(imc):
    if imc < 18.5:
        return "Bajo Peso"
    elif imc < 25:
        return "Normal"
    elif imc < 30:
        return "Sobrepeso"
    else: 
        return "Obesidad"

obesidad=0
for i in range(1, 5):
    nombre=input(f"Ingrese el nombre del paciente {i}: ")
    peso=float(input(f"Peso del paciente {nombre}: "))
    altura=float(input(f"Altura del paciente {nombre}: "))
    imc=peso / (altura ** 2)
    clasif=clasificar(imc)
    print(f"{nombre}, IMC={imc:.2f} - {clasif}")

    if clasif == "Obesidad":
        obesidad+=1

print(f"Pacientes con obesidad: {obesidad}")


