class TamanioNota {
  valorBytes: number;

  constructor(bytes: number) {
    this.valorBytes = bytes;
  }

  aKiloBytes(): number {
    return this.valorBytes / 1024;
  }

  aMegaBytes(): number {
    return this.valorBytes / (1024 * 1024);
  }

  describir(): string {
    return (
      `${this.valorBytes} B = ` +
      `${this.aKiloBytes().toFixed(2)} KB = ` +
      `${this.aMegaBytes().toFixed(4)} MB`
    );
  }
}

const notaPesada = new TamanioNota(1048576);
const notaLigera = new TamanioNota(2048);

console.log(notaPesada.describir());     // 1048576 B = 1024.00 KB = 1.0000 MB
console.log(notaLigera.describir()); // 2048 B = 2.00 KB = 0.0020 MB
