// Concepto puro — dos sintaxis equivalentes
const idsNotas: number[] = [1, 2, 3, 4, 5];
const etiquetas: Array<string> = ["urgente", "trabajo", "personal"];   // forma genérica
console.log(idsNotas)
console.log(etiquetas)

const tamanosKb = [10, 20, 30]; 
console.log(tamanosKb)

const dobleTamanos: number[] = idsNotas.map((n) => n * 2);       
const idsPares: number[] = idsNotas.filter((n) => n % 2 === 0); 
const totalIds: number = idsNotas.reduce((acc, n) => acc + n, 0); 
console.log(dobleTamanos)
console.log(idsPares)
console.log(totalIds)

idsNotas.push(6);      
idsNotas.unshift(0);   
const ultimoId = idsNotas.pop();  
const primerId = idsNotas.shift();
console.log(ultimoId)
console.log(primerId)

// Búsqueda
const existeUrgente: boolean = idsNotas.includes(3);       // true
const indiceNota: number = idsNotas.indexOf(3);         // posición o -1
const idMayor: number | undefined = idsNotas.find((n) => n > 4); // 5
console.log(existeUrgente)
console.log(indiceNota)
console.log(idMayor)
