// Concepto puro
class Animal {
  constructor(public nombre: string) {}

  hablar(): string {
    return `${this.nombre} hace un sonido.`;
  }
}

class Perro extends Animal {
  constructor(nombre: string, public raza: string) {
    super(nombre); // llama al constructor del padre
  }

  // override sobrescribe el método del padre
  override hablar(): string {
    return `${this.nombre} ladra: ¡Guau!`;
  }

  buscar(objeto: string): string {
    return `${this.nombre} busca el ${objeto}.`;
  }
}

const a = new Animal("Criatura");
const d = new Perro("Rex", "Labrador");

console.log(a.hablar());       // Criatura hace un sonido.
console.log(d.hablar());       // Rex ladra: ¡Guau!
console.log(d.buscar("palo")); // Rex busca el palo.
console.log(d.raza);           // Labrador