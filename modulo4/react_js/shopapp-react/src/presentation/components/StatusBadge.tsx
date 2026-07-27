// src/presentation/components/StatusBadge.tsx
import { Badge } from '@/presentation/components/ui/badge'
import type { OrderStatus } from '@/domain/enums/order-status.enum'

interface StatusConfig {
  label: string
  className: string
}

const STATUS_MAP: Record<OrderStatus, StatusConfig> = {
  pending: {
    label: 'Pendiente',
    className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200',
  },
  confirmed: {
    label: 'Confirmado',
    className: 'bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200',
  },
  shipped: {
    label: 'Enviado',
    className: 'bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200',
  },
  delivered: {
    label: 'Entregado',
    className: 'bg-green-100 text-green-800 hover:bg-green-100 border-green-200',
  },
  cancelled: {
    label: 'Cancelado',
    className: 'bg-red-100 text-red-800 hover:bg-red-100 border-red-200',
  },
}

interface StatusBadgeProps {
  status: OrderStatus
  className?: string
}

/** Badge reutilizable que traduce un `OrderStatus` a etiqueta y color. */
export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const config = STATUS_MAP[status]

  return (
    <Badge
      variant="outline"
      className={[config.className, className].filter(Boolean).join(' ')}
    >
      {config.label}
    </Badge>
  )
}