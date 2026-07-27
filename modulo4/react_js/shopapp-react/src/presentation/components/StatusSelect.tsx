// src/presentation/components/admin/StatusSelect.tsx
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/presentation/components/ui/select'
import { useAdminStore } from '@/presentation/store/admin.store'
import { ApiException } from '@/domain/exceptions/api.exception'
import type { OrderStatus } from '@/domain/enums/order-status.enum'

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: 'text-yellow-600',
  confirmed: 'text-blue-600',
  shipped: 'text-purple-600',
  delivered: 'text-green-600',
  cancelled: 'text-red-600',
}

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pendiente',
  confirmed: 'Confirmado',
  shipped: 'Enviado',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
}

const ALL_STATUSES: OrderStatus[] = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']

interface StatusSelectProps {
  orderId: number
  currentStatus: OrderStatus
  /** Callback opcional para que el padre sincronice su propio estado local (ej. detalle). */
  onUpdate?: (newStatus: OrderStatus) => void
}

export function StatusSelect({ orderId, currentStatus, onUpdate }: StatusSelectProps) {
  const updateOrderStatus = useAdminStore((s) => s.updateOrderStatus)
  const [updating, setUpdating] = useState(false)

  async function handleChange(newStatus: string) {
    if (newStatus === currentStatus) return
    setUpdating(true)
    try {
      await updateOrderStatus(orderId, newStatus as OrderStatus)
      onUpdate?.(newStatus as OrderStatus)
    } catch (err) {
      const message = err instanceof ApiException ? err.detail : 'No se pudo actualizar el estado.'
      toast.error('Error', { description: message })
    } finally {
      setUpdating(false)
    }
  }

  if (updating) {
    return (
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Actualizando…</span>
      </div>
    )
  }

  return (
    <Select value={currentStatus} onValueChange={handleChange}>
      <SelectTrigger className="h-8 w-36 text-sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {ALL_STATUSES.map((status) => (
          <SelectItem key={status} value={status}>
            <span className={STATUS_COLORS[status]}>{STATUS_LABELS[status]}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}