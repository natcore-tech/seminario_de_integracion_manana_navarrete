let contenidoCualquiera: any = "texto plano";
contenidoCualquiera = 42;       
contenidoCualquiera = true;     

contenidoCualquiera.aplicarFormato(); 

let datoImportado: unknown = "nota desde api";
datoImportado = 42;               

if (typeof datoImportado === "string") {
  console.log(datoImportado.toUpperCase());
}

function fallarAlGuardar(msg: string): never {
  throw new Error(msg); 
}

function verificarEstadoRaro(valor: never): never {
  throw new Error(`Estado de nota no manejado: ${String(valor)}`);
}
