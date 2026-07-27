const idNota: number = 101;
const tituloNota: string = "Reunión de equipo";
const estaFijada: boolean = true;

const idNota2 = 101;       // TypeScript infiere: number
const tituloNota2 = "Reunión de equipo";  // TypeScript infiere: string
const estaFijada2 = true;       // TypeScript infiere: boolean


// 1. Variables declaradas sin valor inicial:
let longitudContenido: number;      // sin inicializar — necesita anotación
longitudContenido = 450;

let estadoNota: number | string = 200;  // acepta número o string
estadoNota = "GUARDADO";  // válido

// 3. Parámetros de funciones (TS no puede inferirlos):
function archivarNota(titulo: string, diasArchivada: number): string {
  return `Nota '${titulo}' — archivada por ${diasArchivada} día(s)`;
}
