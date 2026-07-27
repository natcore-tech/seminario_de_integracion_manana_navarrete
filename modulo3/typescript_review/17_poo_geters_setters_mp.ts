// Concepto puro
class Recordatorio {
  private _diasRestantes: number;

  constructor(dias: number) {
    this._diasRestantes = dias;
  }

  get diasRestantes(): number {
    return this._diasRestantes;
  }

  set diasRestantes(valor: number) {
    if (valor <= 0) throw new Error("Los días deben ser positivos");
    this._diasRestantes = valor;
  }

  get urgencia(): number {
    return 100 / this._diasRestantes; // Mayor puntaje a menos días
  }
}

const rec = new Recordatorio(5);
console.log(rec.diasRestantes);          
console.log(rec.urgencia.toFixed(2)); 

rec.diasRestantes = 10;                  
console.log(rec.urgencia.toFixed(2)); 