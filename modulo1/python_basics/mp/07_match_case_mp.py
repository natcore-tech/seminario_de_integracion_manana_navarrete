print("Registro de notas")
accion=input("Accion registro registrar/consultar/eliminar: ")
match accion:
    case "registrar":
        print("Iniciando registro de nota")
    case "consultar":
        print("Consultando notas del estudiante")
    case "eliminar":
        print("Eliminando registro de nota")
    case _:
        print(f"Accion '{accion}' no reconocida")

print("Evaluacion de nota")
nota=7
match nota:
    case n if n<0:
        print(f"Nota {n} invalida")
    case 0:
        print("Nota 0: sin entrega")
    case n if n < 5:
        print(f"Nota {n}: Suspenso")
    case n if n < 7:
        print(f"Nota {n}: Aprobado")
    case n:
        print(f"Nota {n}: Sobresaliente")