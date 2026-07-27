// const — valor que NO cambia (preferida por defecto)
const MAX_NOTAS: number = 1000;
const NOMBRE_APP: string = "GestorNotasApp";
const DEBUG_MODE: boolean = false;

// let — valor que SÍ puede cambiar
let cantidadNotas: number = 0;
let estadoSincronizacion: string = "desconectado";
let usuarioActivo: boolean = false;

cantidadNotas++;                         // 1
estadoSincronizacion = "sincronizado";       // ok
usuarioActivo = true;               // ok

// MAX_NOTAS = 500;  // ← Error: Cannot assign to 'MAX_NOTAS' because it is a constant.
