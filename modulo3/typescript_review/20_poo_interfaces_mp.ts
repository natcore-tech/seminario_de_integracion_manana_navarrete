// Concepto puro
interface Exportable {
  exportar(): string;
}

interface Sincronizable {
  estaSincronizada(): boolean;
}

class Libreta implements Exportable, Sincronizable {
  constructor(
    public id: string,
    public notas: string[],
    public guardadoNube: boolean
  ) {}

  exportar(): string {
    return JSON.stringify({ id: this.id, notas: this.notas, backup: this.guardadoNube });
  }

  estaSincronizada(): boolean {
    return this.notas.length > 0 && this.guardadoNube;
  }
}

const miLibreta = new Libreta("L-001", ["Nota 1", "Nota 2"], true);
console.log(miLibreta.estaSincronizada());    
console.log(miLibreta.exportar());
