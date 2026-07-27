// Concepto puro
class NotaBorrador {
  titulo: string;
  palabras: number;
  esFavorita: boolean;

  constructor(titulo: string, palabras: number, esFavorita: boolean) {
    this.titulo = titulo;
    this.palabras = palabras;
    this.esFavorita = esFavorita;
  }

  describir(): string {
    const estado = this.esFavorita ? "favorita" : "normal";
    return `${this.titulo} — ${this.palabras} palabras (${estado})`;
  }
}

const notaIdeas = new NotaBorrador("Ideas Proyecto", 120, true);
const notaCompras = new NotaBorrador("Lista Compra", 45, false);

console.log(notaIdeas.describir()); // Ideas Proyecto — 120 palabras (favorita)
console.log(notaCompras.describir()); // Lista Compra — 45 palabras (normal)
