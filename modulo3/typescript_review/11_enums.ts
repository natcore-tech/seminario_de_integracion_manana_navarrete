// Enum numérico (los valores son 0, 1, 2, … por defecto)
enum Direccion {
  Norte,  // 0
  Sur,    // 1
  Este,   // 2
  Oeste,  // 3
}

const rumbo: Direccion = Direccion.Norte;
console.log(rumbo);           // 0
console.log(Direccion[0]);    // "Norte" (mapeo inverso automático)

// Enum numérico con valor de inicio personalizado
enum CodigoHTTP {
  OK = 200,
  NoEncontrado = 404,
  Error = 500,
}

// Enum de string (recomendado: los valores son legibles en logs y redes)
enum Rol {
  Admin    = "ADMIN",
  Editor   = "EDITOR",
  Lector   = "READER",
}

const miRol: Rol = Rol.Editor;
console.log(miRol); // "EDITOR" 