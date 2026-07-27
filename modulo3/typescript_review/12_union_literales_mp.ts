type CategoriaNota = "personal" | "trabajo" | "estudio" | "ideas";

interface Apunte {
  id: number;
  titulo: string;
  categoria: CategoriaNota;
  revisado: boolean;
}

function formatearApunte(t: Apunte): string {
  const iconos: Record<CategoriaNota, string> = {
    personal:    "🏠",
    trabajo:   "💼",
    estudio:    "📚",
    ideas: "💡",
  };
  const estado = t.revisado ? "✅" : "⏳";
  return `${estado} ${iconos[t.categoria]} [#${t.id}] ${t.titulo}`;
}

const apuntes: Apunte[] = [
  { id: 1, titulo: "Lista supermercado",  categoria: "personal",    revisado: true  },
  { id: 2, titulo: "Reporte Q3",         categoria: "trabajo", revisado: false },
  { id: 3, titulo: "Tesis cap 1",  categoria: "estudio",   revisado: false },
];

for (const t of apuntes) {
  console.log(formatearApunte(t));
}
