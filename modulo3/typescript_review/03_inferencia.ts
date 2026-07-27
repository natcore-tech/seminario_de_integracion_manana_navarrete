// ── Anotación explícita ───────────────────────────────────────────────────
// Tú le dices a TS cuál es el tipo.
const puerto: number = 8080;
const host: string = "localhost";
const activo: boolean = true;

// ── Inferencia de tipo ────────────────────────────────────────────────────
// TS lo deduce del valor inicial — el tipo es el mismo, pero sin escribirlo.
const puerto2 = 8080;       // TypeScript infiere: number
const host2 = "localhost";  // TypeScript infiere: string
const activo2 = true;       // TypeScript infiere: boolean

// Ambas formas producen el mismo nivel de seguridad de tipos.
// Si intentas reasignar con el tipo incorrecto, TS da error en ambos casos:
// puerto2 = "9000";  // Error: Type 'string' is not assignable to type 'number'.

// ── Cuándo anotar explícitamente ─────────────────────────────────────────
// 1. Variables declaradas sin valor inicial:
let latencia: number;      // sin inicializar — necesita anotación
latencia = 45;

// 2. Cuando quieres un tipo más amplio que el valor inicial:
let codigo: number | string = 200;  // acepta número o string
codigo = "OK";  // válido

// 3. Parámetros de funciones (TS no puede inferirlos):
function ping(host: string, intentos: number): string {
  return `Ping a ${host} — ${intentos} intento(s)`;
}