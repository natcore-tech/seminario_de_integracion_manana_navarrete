def calcular(m3):
    if m3 <= 10:
        return m3 * 0.30
    elif m3 <=30:
        return (10 * 0.30) + (m3 - 10) * 0.50
    else:
        return (10 * 0.30) + (20 * 0.50) + (m3 - 30) * 0.80
    
total_recaudado=0.0
excesivos=0
total_consumo=0.0
clientes=0

while True:
    consumo=float(input("Ingrese el consumo en metros cubicos (0 para detener)"))
    if consumo==0:
        break
    total_consumo+=consumo
    clientes+=1
    factura=calcular(consumo)
    total_recaudado+=factura
    if consumo > 30:
        excesivos+=1
    print(f"Factura: ${factura:.2f}")

print(f"Total recaudado: ${total_recaudado:.2f}")
print(f"Clientes con consumo excesivo: {excesivos}")
if clientes>0:
    print(f"Consumo promedio por cliente: {total_consumo/clientes:.2f}")
    if total_consumo/clientes >25:
        print("Alerta Hidrica: Consumo elevado")