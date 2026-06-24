// Concepto puro
type Coordenada = [number, number];           // [x, y]
type RGB = [number, number, number];          // [rojo, verde, azul]
type Entrada = [string, number];              // [clave, valor]

const punto: Coordenada = [10.5, -3.2];
const color: RGB = [255, 128, 0];            // naranja
const par: Entrada = ["temperatura", 36.6];

// Desestructuración (la forma más cómoda de usar tuplas)
const [x, y] = punto;
const [rojo, verde, azul] = color;
const [clave, valor] = par;

console.log(`Punto: x=${x}, y=${y}`);         // Punto: x=10.5, y=-3.2
console.log(`Color: rgb(${rojo},${verde},${azul})`); // Color: rgb(255,128,0)

// Tuplas con nombre (TS 4.0+) — mejoran la legibilidad
type Rango = [inicio: number, fin: number];
const horario: Rango = [9, 18];              // de 9:00 a 18:00