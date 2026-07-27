// Concepto puro
abstract class ContenidoNota {
  abstract leerContenido(): string;       // sin implementación — las subclases DEBEN implementarlo
  abstract tamañoBytes(): number;

  // Los métodos concretos SÍ tienen implementación
  describir(): string {
    return (
      `Contenido: ${this.leerContenido()} | ` +
      `Tamaño: ${this.tamañoBytes().toFixed(2)} B`
    );
  }
}

class NotaTextoPlano extends ContenidoNota {
  constructor(private texto: string) {
    super();
  }

  override leerContenido(): string {
    return this.texto;
  }

  override tamañoBytes(): number {
    return this.texto.length * 2; // aprox 2 bytes por char
  }
}

class NotaAdjunto extends ContenidoNota {
  constructor(private nombreArchivo: string, private size: number) {
    super();
  }

  override leerContenido(): string {
    return `[Archivo: ${this.nombreArchivo}]`;
  }

  override tamañoBytes(): number {
    return this.size;
  }
}

// const c = new ContenidoNota(); // Error: Cannot create an instance of an abstract class.

const txt = new NotaTextoPlano("Hola");
const img = new NotaAdjunto("foto.png", 4000);

console.log(txt.describir()); // Contenido: Hola | Tamaño: 8.00 B
console.log(img.describir());    // Contenido: [Archivo: foto.png] | Tamaño: 4000.00 B
