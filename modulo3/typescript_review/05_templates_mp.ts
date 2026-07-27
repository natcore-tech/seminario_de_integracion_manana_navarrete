// Concepto puro — template literals (backtick ``)
const tituloPrincipal: string = "Ideas Proyecto";
const carpetaDestino: string  = "Trabajo";
const numVersiones: number    = 5;

// Interpola cualquier expresión con ${ }
const notificacion: string = `Nota guardada: ${tituloPrincipal}. Carpeta: ${carpetaDestino}. Versiones: ${numVersiones}.`;
console.log(notificacion);
// Nota guardada: Ideas Proyecto. Carpeta: Trabajo. Versiones: 5.

// Expresiones dentro de ${ }
const palabrasActuales: number = 1200;
const maxPalabras: number      = 2000;
const progreso: string  = `Progreso de escritura: ${((palabrasActuales / maxPalabras) * 100).toFixed(0)}%`;
console.log(progreso);
// Progreso de escritura: 60%

// Multi-línea — sin concatenación ni \n
const resumenNota: string = `
=== Resumen de la Nota ===
Título   : Tareas de la semana
Estado   : Activa
Longitud : 500 caracteres
`;
console.log(resumenNota);
