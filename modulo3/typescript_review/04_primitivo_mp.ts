// number — enteros y decimales, positivos y negativos
const cantidadPalabras: number = 299;
const idUsuario: number       = 8080;
const calificacionNota: number = 4.5;
const colorEtiqueta: number    = 0xff5733;  // también acepta hexadecimal

// string — texto, con comillas simples, dobles o backtick
const autor: string    = "autor@notas.com";
const categoria: string = 'PERSONAL';
const rutaAPI: string  = `/api/v2/notas`;

// boolean — solo true o false
const estaArchivada: boolean  = true;
const esPublica: boolean      = false;
const esFavorita: boolean     = false;

// ── Aritmética con number ─────────────────────────────────────────────────
const limiteCaracteres = 1500;
const caracteresUsados = 150;
const caracteresRestantes = limiteCaracteres - caracteresUsados;  // 1350

// ── Métodos de string ─────────────────────────────────────────────────────
const tag = "  importante  ";
console.log(tag.trim().toLowerCase()); // "importante"
console.log(autor.includes("notas"));    // true
console.log(autor.split("@")[1]);          // "notas.com"
let etiquetasString: string = "Urgente;Casa;2024;Pendiente";
console.log(etiquetasString.split(";"));

// ── Lógica con boolean ────────────────────────────────────────────────────
const puedeEditar: boolean = !estaArchivada && esFavorita;
console.log(puedeEditar); // false
