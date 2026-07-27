// Concepto puro
abstract class Figura {
  abstract area(): number;       // sin implementación — las subclases DEBEN implementarlo
  abstract perimetro(): number;

  // Los métodos concretos SÍ tienen implementación
  describir(): string {
    return (
      `Área: ${this.area().toFixed(2)} | ` +
      `Perímetro: ${this.perimetro().toFixed(2)}`
    );
  }
}

class Circulo2 extends Figura {
  constructor(private radio: number) {
    super();
  }

  override area(): number {
    return Math.PI * this.radio ** 2;
  }

  override perimetro(): number {
    return 2 * Math.PI * this.radio;
  }
}

class Rectangulo2 extends Figura {
  constructor(private ancho: number, private alto: number) {
    super();
  }

  override area(): number {
    return this.ancho * this.alto;
  }

  override perimetro(): number {
    return 2 * (this.ancho + this.alto);
  }
}

// const f = new Figura(); // Error: Cannot create an instance of an abstract class.

const circulo = new Circulo2(5);
const rect = new Rectangulo2(4, 6);

console.log(circulo.describir()); // Área: 78.54 | Perímetro: 31.42
console.log(rect.describir());    // Área: 24.00 | Perímetro: 20.00