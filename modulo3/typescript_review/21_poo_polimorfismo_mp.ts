// Concepto puro
class ElementoApp {
  tipo(): string { return "Elemento"; }
  peso(): number { return 0; }
}

class NotaMarkdown extends ElementoApp {
  constructor(private lineas: number) { super(); }
  override tipo(): string { return "Nota Markdown"; }
  override peso(): number { return 10 * this.lineas; }
}

class NotaAudio extends ElementoApp {
  constructor(private duracionMin: number, private bitrate: number) { super(); }
  override tipo(): string { return "Audio"; }
  override peso(): number { return (this.duracionMin * this.bitrate) / 2; }
}

class NotaDibujo extends ElementoApp {
  constructor(private trazos: number) { super(); }
  override tipo(): string { return "Dibujo"; }
  override peso(): number { return this.trazos * 5; }
}

// Array de tipo base — el polimorfismo en acción
const elementos: ElementoApp[] = [
  new NotaMarkdown(3),
  new NotaAudio(6, 4),
  new NotaDibujo(5),
];

for (const e of elementos) {
  // TypeScript llama la versión correcta de peso() en cada iteración
  console.log(`${e.tipo()}: peso = ${e.peso().toFixed(2)} KB`);
}
// Nota Markdown: peso = 30.00 KB
// Audio: peso = 12.00 KB
// Dibujo: peso = 25.00 KB
