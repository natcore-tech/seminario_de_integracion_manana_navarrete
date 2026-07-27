// const — valor que NO cambia (preferida por defecto)
const PI: number = 3.14159;
const NOMBRE_APP: string = "InventarioApp";
const DEBUG_MODE: boolean = false;

// let — valor que SÍ puede cambiar
let contador: number = 0;
let estadoConexion: string = "desconectado";
let usuarioActivo: boolean = false;

contador++;                         // 1
estadoConexion = "conectado";       // ok
usuarioActivo = true;               // ok

// PI = 3;  // ← Error: Cannot assign to 'PI' because it is a constant.