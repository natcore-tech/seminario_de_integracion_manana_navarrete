// Sistema de cálculo de almacenamiento para una app de notas.
// Demuestra cómo los tipos previenen errores en lógica de negocio real.

type TipoContenido = "texto_plano" | "markdown" | "multimedia";

interface NotaMetadata {
  titulo: string;
  cantidadLineas: number;
  tamañoAdjuntosMB: number;
  tipo: TipoContenido;
}

const PESO_POR_LINEA_KB: Record<TipoContenido, number> = {
  texto_plano:    0.05,   // KB por linea
  markdown:       0.10,
  multimedia:     0.50,
};

const OVERHEAD_METADATA_KB = 5.0;  // 5 KB de base

function calcularAlmacenamiento(nota: NotaMetadata): string {
  const pesoBase = PESO_POR_LINEA_KB[nota.tipo];
  const pesoTexto = pesoBase * nota.cantidadLineas;
  const pesoAdjuntos = nota.tamañoAdjuntosMB * 1024; // MB a KB
  const totalKB = pesoTexto + pesoAdjuntos + OVERHEAD_METADATA_KB;

  return `
 Cálculo de almacenamiento
   Título      : ${nota.titulo}
   Líneas      : ${nota.cantidadLineas}
   Tipo        : ${nota.tipo}
   Peso Texto  : ${pesoTexto.toFixed(2)} KB
   Adjuntos    : ${pesoAdjuntos.toFixed(2)} KB
   ─────────────────────────
   TOTAL       : ${totalKB.toFixed(2)} KB
  `.trim();
}

const nota1: NotaMetadata = {
  titulo: "Resumen del libro",
  cantidadLineas: 120,
  tamañoAdjuntosMB: 0,
  tipo: "markdown",
};

const nota2: NotaMetadata = {
  titulo: "Apuntes con fotos de pizarra",
  cantidadLineas: 40,
  tamañoAdjuntosMB: 3.5,
  tipo: "multimedia",
};

console.log(calcularAlmacenamiento(nota1));
console.log("---");
console.log(calcularAlmacenamiento(nota2));

// TS detecta si usas un tipo inválido:
// const nota3: NotaMetadata = { ..., tipo: "dibujo_vectorial" };
// Type '"dibujo_vectorial"' is not assignable to type 'TipoContenido'.
