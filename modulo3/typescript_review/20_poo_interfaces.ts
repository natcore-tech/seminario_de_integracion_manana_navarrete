// Concepto puro
interface Serializable {
  serializar(): string;
}

interface Validable {
  esValido(): boolean;
}

class Pedido implements Serializable, Validable {
  constructor(
    public id: string,
    public productos: string[],
    public total: number
  ) {}

  serializar(): string {
    return JSON.stringify({ id: this.id, productos: this.productos, total: this.total });
  }

  esValido(): boolean {
    return this.productos.length > 0 && this.total > 0;
  }
}

const pedido = new Pedido("P-001", ["Mouse", "Teclado"], 150);
console.log(pedido.esValido());    // true
console.log(pedido.serializar());
// {"id":"P-001","productos":["Mouse","Teclado"],"total":150}