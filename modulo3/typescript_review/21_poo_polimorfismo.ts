// Concepto puro
class Forma {
  nombre(): string { return "Forma"; }
  area(): number { return 0; }
}

class Circulo3 extends Forma {
  constructor(private r: number) { super(); }
  override nombre(): string { return "Círculo"; }
  override area(): number { return Math.PI * this.r ** 2; }
}

class Triangulo extends Forma {
  constructor(private base: number, private altura: number) { super(); }
  override nombre(): string { return "Triángulo"; }
  override area(): number { return (this.base * this.altura) / 2; }
}

class Cuadrado extends Forma {
  constructor(private lado: number) { super(); }
  override nombre(): string { return "Cuadrado"; }
  override area(): number { return this.lado ** 2; }
}

// Array de tipo base — el polimorfismo en acción
const formas: Forma[] = [
  new Circulo3(3),
  new Triangulo(6, 4),
  new Cuadrado(5),
];

for (const f of formas) {
  // TypeScript llama la versión correcta de area() en cada iteración
  console.log(`${f.nombre()}: área = ${f.area().toFixed(2)}`);
}
// Círculo: área = 28.27
// Triángulo: área = 12.00
// Cuadrado: área = 25.00