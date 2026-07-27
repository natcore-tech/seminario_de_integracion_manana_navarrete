// Concepto puro
class CuentaBancaria {
  readonly id: string;           // no cambia tras la creación
  public titular: string;        // visible desde fuera
  private saldo: number;         // solo accesible dentro de la clase
  protected moneda: string;      // accesible también en subclases

  constructor(id: string, titular: string, saldoInicial: number) {
    this.id = id;
    this.titular = titular;
    this.saldo = saldoInicial;
    this.moneda = "MXN";
  }

  // Método público que expone el saldo de forma controlada
  obtenerSaldo(): number {
    return this.saldo;
  }

  depositar(monto: number): void {
    if (monto <= 0) throw new Error("Monto inválido");
    this.saldo += monto;
  }
}

const cuenta = new CuentaBancaria("CC-001", "Ana García", 1000);
console.log(cuenta.titular);         // Ana García
console.log(cuenta.id);              // CC-001
console.log(cuenta.obtenerSaldo());  // 1000
cuenta.depositar(500);
console.log(cuenta.obtenerSaldo());  // 1500

// cuenta.saldo = 9999;  // Error: 'saldo' is private
// cuenta.id = "otro";   // Error: 'id' is readonly