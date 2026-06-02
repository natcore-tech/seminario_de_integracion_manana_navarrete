print("Match case")
comando=input("Comando proceso iniciar/parar/reiniciar: ")
match comando:
    case "inciar":
        print("Sistema iniciando")
    case "parar":
        print("Sistema detenido")
    case "reiniciar":
        print("Sistema reiniciando")
    case _:
        print(f"Comando '{comando}' no encontrado")

print("Match condiciones")
numero=7
match numero:
    case n if n<0:
        print(f"{n} es negativo")
    case 0:
        print("Es cero")
    case n if n % 2 == 0:
        print(f"{n} es par")
    case n:
        print(f"{n} es positivo e impar")