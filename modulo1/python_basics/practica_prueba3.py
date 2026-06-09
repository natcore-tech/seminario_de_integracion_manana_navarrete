cancelados=0
demorados=0
abordando=0
en_vuelo=0

for i in range(1, 6):
    codigo=input(f"Ingrese codigo del vuelo numero {i}: ")
    estado=int(input(f"Estado del vuelo {codigo} (1-5): "))

    match estado:
        case 1:
            print("En puerta")
        case 2:
            print("Abordando")
            abordando+=1
        case 3:
            print("Demorado")
            demorados+=1
        case 4:
            print("Cancelado")    
            cancelados+=1
        case 5:
            print("En vuelo")
            en_vuelo+=1
        case _:
            print("Estado desconocido")        

print(f"Vuelos cancelados: {cancelados}")
print(f"Vuelos demorados: {demorados}")
print(f"Total de vuelos operativos: {abordando + en_vuelo}")