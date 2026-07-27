// Concepto puro
class ElementoLista {
  constructor(public titulo: string) {}

  mostrar(): string {
    return `${this.titulo} es un elemento base.`;
  }
}

class TareaPendiente extends ElementoLista {
  constructor(titulo: string, public fechaLimite: string) {
    super(titulo); // llama al constructor del padre
  }

  // override sobrescribe el método del padre
  override mostrar(): string {
    return `${this.titulo} vence el: ¡${this.fechaLimite}!`;
  }

  completar(usuario: string): string {
    return `${usuario} ha completado: ${this.titulo}.`;
  }
}

const el = new ElementoLista("Item genérico");
const tar = new TareaPendiente("Pagar luz", "Mañana");

console.log(el.mostrar());       // Item genérico es un elemento base.
console.log(tar.mostrar());       // Pagar luz vence el: ¡Mañana!
console.log(tar.completar("Ana")); // Ana ha completado: Pagar luz.
console.log(tar.fechaLimite);           // Mañana
