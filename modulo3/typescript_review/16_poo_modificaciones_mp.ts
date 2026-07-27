class CuadernoNotas {
  readonly id: string;           
  public nombre: string;        
  private cantNotas: number;         
  protected colorEtiqueta: string;      

  constructor(id: string, nombre: string, notasIniciales: number) {
    this.id = id;
    this.nombre = nombre;
    this.cantNotas = notasIniciales;
    this.colorEtiqueta = "AZUL";
  }

  obtenerCantNotas(): number {
    return this.cantNotas;
  }

  agregarNota(cantidad: number): void {
    if (cantidad <= 0) throw new Error("Cantidad inválida");
    this.cantNotas += cantidad;
  }
}

const cuaderno = new CuadernoNotas("CUA-001", "Diario Personal", 10);
console.log(cuaderno.nombre);         
console.log(cuaderno.id);              
console.log(cuaderno.obtenerCantNotas());  
cuaderno.agregarNota(5);
console.log(cuaderno.obtenerCantNotas());  
