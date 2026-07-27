// Enum numérico (los valores son 0, 1, 2, … por defecto)
enum EstadoNota {
  Borrador,  // 0
  Publicada,    // 1
  Archivada,   // 2
  Papelera,  // 3
}

const estadoActual: EstadoNota = EstadoNota.Borrador;
console.log(estadoActual);           // 0
console.log(EstadoNota[0]);    // "Borrador" (mapeo inverso automático)

enum CodigoSync {
  Exito = 200,
  NoSincronizada = 404,
  Conflicto = 500,
}

// Enum de string 
enum PermisoNota {
  Propietario    = "PROPIETARIO",
  Editor   = "EDITOR",
  Lector   = "READER",
}

const miPermiso: PermisoNota = PermisoNota.Editor;
console.log(miPermiso); // "EDITOR" 
