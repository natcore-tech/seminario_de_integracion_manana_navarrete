// number — enteros y decimales, positivos y negativos
const precio1: number      = 299.99;
const puerto: number      = 8080;
const temperatura: number = -5.3;
const hexColor: number    = 0xff5733;  // también acepta hexadecimal

// string — texto, con comillas simples, dobles o backtick
const email: string    = "soporte@empresa.com";
const protocolo: string = 'HTTPS';
const ruta: string     = `/api/v2/usuarios`;

// boolean — solo true o false
const estaActivo: boolean  = true;
const requiereAuth: boolean = false;
const esAdmin: boolean      = false;

// ── Aritmética con number ─────────────────────────────────────────────────
const subtotal = 1500;
const descuento = 150;
const total1 = subtotal - descuento;  // 1350

// ── Métodos de string ─────────────────────────────────────────────────────
const usuario = "  admin@corp.com  ";
console.log(usuario.trim().toLowerCase()); // "admin@corp.com"
console.log(email.includes("empresa"));    // true
console.log(email.split("@")[1]);          // "empresa.com"
let personas: string= "Pablo;Marmol;25;12-12-2012"
console.log(personas.split(";"))

// ── Lógica con boolean ────────────────────────────────────────────────────
const puedeAcceder: boolean = estaActivo && !requiereAuth;
console.log(puedeAcceder); // true