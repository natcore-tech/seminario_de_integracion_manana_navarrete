type CoordenadaNota = [number, number];         
type ColorTema = [number, number, number];         
type Metadato = [string, number];           

const posNota: CoordenadaNota = [10.5, -3.2];
const colorEtiqueta: ColorTema = [255, 128, 0];            
const propNota: Metadato = ["visitas", 36.6];

const [xNota, yNota] = posNota;
const [rojoT, verdeT, azulT] = colorEtiqueta;
const [claveM, valorM] = propNota;

console.log(`Punto: x=${xNota}, y=${yNota}`);         
console.log(`Color: rgb(${rojoT},${verdeT},${azulT})`); 

type RangoLineas = [inicio: number, fin: number];
const lineasResaltadas: RangoLineas = [9, 18];             
