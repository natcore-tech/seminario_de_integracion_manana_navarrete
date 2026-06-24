type PrioridadTicket = "baja" | "media" | "alta" | "critica";

interface Ticket {
  id: number;
  titulo: string;
  prioridad: PrioridadTicket;
  resuelto: boolean;
}

function etiquetarTicket(t: Ticket): string {
  const prefijos: Record<PrioridadTicket, string> = {
    baja:    "⚪",
    media:   "🟡",
    alta:    "🟠",
    critica: "🔴",
  };
  const estado = t.resuelto ? "✅" : "⏳";
  return `${estado} ${prefijos[t.prioridad]} [#${t.id}] ${t.titulo}`;
}

const tickets: Ticket[] = [
  { id: 1, titulo: "Botón no funciona",  prioridad: "baja",    resuelto: true  },
  { id: 2, titulo: "Pago falla",         prioridad: "critica", resuelto: false },
  { id: 3, titulo: "Lentitud en carga",  prioridad: "media",   resuelto: false },
];

for (const t of tickets) {
  console.log(etiquetarTicket(t));
}
// ✅ ⚪ [#1] Botón no funciona
// ⏳ 🔴 [#2] Pago falla
// ⏳ 🟡 [#3] Lentitud en carga