const maxCaracteres: number = 42;
const pesoKiloBytes: number = 3.14;
const nivelAnidacion: number = -100;
const colorFondoHex: number = 0xff;  
const banderaBinaria: number = 0b1010;     
const permisosOctal: number = 0o17;         
const limiteNube: number = 1_000_000;  

console.log(colorFondoHex); 
console.log(banderaBinaria);     
console.log(limiteNube);      

console.log(Number.MAX_SAFE_INTEGER); 
console.log(Number.isFinite(1 / 0)); 
console.log(Number.isNaN(0 / 0));   

const tituloSimple: string = "Nota de reunión";
const tituloDoble: string = 'También funciona';
const tituloTemplate: string = `Nota: ${"Borrador"}`;

const autorNota   : string = "Ana";
const cantPalabras: number = 28;

const infoNota: string = `Creador, ${autorNota}. Tiene ${cantPalabras} palabras.`;
const longitudInfo: string = `Es una nota ${cantPalabras >= 100 ? "larga" : "corta"}.`;

const contenido: string = `
  Introducción
  Desarrollo
  Conclusión
`.trim();

console.log("  reunión  ".trim());         // "reunión"
console.log("borrador".toUpperCase());      // "BORRADOR"
console.log("2024-06-15".split("-"));   // ["2024", "06", "15"]
console.log("texto: importante".includes("texto")); // true
console.log("archivo.md".endsWith(".md"));     // true

// Concepto puro
const estaFijada: boolean = true;
const enviadaPapelera: boolean = false;

// Se infiere sin anotación explícita
const esLarga = 25 >= 18;    // boolean inferido → true
const tieneEtiquetas = 0 > 0;    // boolean inferido → false

// Valores "falsy" en TypeScript/JavaScript (importantes para narrowing)
// false, 0, "", null, undefined, NaN → todos se comportan como false en un if
if (!tieneEtiquetas) {
  console.log("Sin etiquetas disponibles");
}

// Concepto puro
let sinCarpeta: undefined = undefined;
let sinAutor: null = null;

// En la práctica: propiedades opcionales o resultados de búsqueda
function buscarNota(id: number): string | null {
  if (id === 1) return "Reunión";
  return null; // encontrado = null cuando no existe
}

const nota2 = buscarNota(5);

// Operador de coalescencia nula ?? (devuelve el lado derecho si el izquierdo es null/undefined)
const nombreDirectorio  = nota2 ?? "General";
console.log(nombreDirectorio); // "General"

// Encadenamiento opcional ?. (no lanza error si algo es null/undefined)
const letras = nota2?.length;
console.log(letras); // undefined (no lanza error)
