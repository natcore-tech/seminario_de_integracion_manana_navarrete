// Concepto puro
type Nota = {
  id: number;
  titulo: string;
  cantCaracteres: number;
  fijada: boolean;
  versiones: number;
};

const baulNotas: Nota[] = [
  { id: 1, titulo: "Ideas",  cantCaracteres: 999,  fijada: true, versiones:10 },
  { id: 2, titulo: "Lista Compra",   cantCaracteres: 25,   fijada: true, versiones:10 },
  { id: 3, titulo: "Diario", cantCaracteres: 350,  fijada: false, versiones:10 },
  { id: 4, titulo: "Recetas", cantCaracteres: 350,  fijada: false, versiones:10 },
  { id: 5, titulo: "Proyectos", cantCaracteres: 350,  fijada: false, versiones:10 },
];

const notasFijadas: Nota[] = baulNotas.filter((p) => p.fijada);
const titulos: string[] = baulNotas.map((p) => p.titulo);
const notaMasCorta: Nota | undefined = baulNotas.reduce((min, p) =>
  p.cantCaracteres < min.cantCaracteres ? p : min
);

console.log(titulos);                   
console.log(notaMasCorta?.titulo);      
console.log(baulNotas[3]);    
console.log(baulNotas)
