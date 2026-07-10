// src/presentation/pages/orders/OrderDetailPage.tsx
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import { Button } from '@/presentation/components/ui/button'
import { Separator } from '@/presentation/components/ui/separator'
import { Skeleton } from '@/presentation/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/presentation/components/ui/table'

import { useOrderStore } from '@/presentation/store/order.store'
import { formatPrice, formatDate } from '@/presentation/utils/formatters'
import type { OrderStatus } from '@/domain/enums/order-status.enum'
import { StatusBadge } from '@/presentation/components/StatusBadge'

// ── Línea de tiempo de estado ─────────────────────────────────────────────────

const STATUS_STEPS: { status: OrderStatus; label: string }[] = [
  { status: 'pending', label: 'Recibido' },
  { status: 'confirmed', label: 'Confirmado' },
  { status: 'shipped', label: 'Enviado' },
  { status: 'delivered', label: 'Entregado' },
]

interface StatusTimelineProps {
  currentStatus: OrderStatus
}

function StatusTimeline({ currentStatus }: StatusTimelineProps) {
  if (currentStatus === 'cancelled') {
    return (
      <div className="flex items-center gap-2 text-sm text-destructive">
        <span className="font-medium">Pedido cancelado</span>
      </div>
    )
  }

  const currentIndex = STATUS_STEPS.findIndex((s) => s.status === currentStatus)

  return (
    <ol className="flex items-center gap-0 overflow-x-auto">
      {STATUS_STEPS.map((step, index) => {
        const isDone = index <= currentIndex
        const isLast = index === STATUS_STEPS.length - 1

        return (
          <li key={step.status} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={[
                  'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold',
                  isDone
                    ? 'bg-primary text-primary-foreground'
                    : 'border-2 border-muted text-muted-foreground',
                ].join(' ')}
              >
                {index + 1}
              </div>
              <span
                className={[
                  'whitespace-nowrap text-xs',
                  isDone ? 'text-primary font-medium' : 'text-muted-foreground',
                ].join(' ')}
              >
                {step.label}
              </span>
            </div>

            {!isLast && (
              <div
                className={[
                  'mx-2 h-0.5 w-12 flex-shrink-0',
                  index < currentIndex ? 'bg-primary' : 'bg-muted',
                ].join(' ')}
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

function OrderDetailSkeleton() {
  return (
    <div className="container max-w-3xl py-8">
      <Skeleton className="mb-6 h-6 w-32" />
      <div className="mb-6 flex items-center justify-between">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-6 w-24" />
      </div>
      <Skeleton className="mb-8 h-12 w-full" />
      <Skeleton className="h-48 w-full rounded-xl" />
    </div>
  )
}

// ── Página principal ─────────────────────────────────────────────────────────

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { currentOrder, isLoading, error, fetchOrderById } = useOrderStore()

  useEffect(() => {
    if (id) fetchOrderById(Number(id))
  }, [id, fetchOrderById])

  if (isLoading) return <OrderDetailSkeleton />

  if (error || !currentOrder) {
    return (
      <div className="container py-16 text-center">
        <p className="text-muted-foreground">{error ?? 'Orden no encontrada.'}</p>
        <Button asChild className="mt-4" variant="outline">
          <Link to="/orders">Ver mis pedidos</Link>
        </Button>
      </div>
    )
  }

  const order = currentOrder

  return (
    <div className="container max-w-3xl py-8">
      <Button asChild variant="ghost" size="sm" className="-ml-2 mb-4 gap-1">
        <Link to="/orders">
          <ArrowLeft className="h-4 w-4" />
          Mis pedidos
        </Link>
      </Button>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-mono text-2xl font-bold">
            Pedido #{String(order.id).padStart(4, '0')}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Realizado el {formatDate(order.created_at)}
            {order.updated_at !== order.created_at && (
              <> · Actualizado el {formatDate(order.updated_at)}</>
            )}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="mb-8 rounded-xl border p-4">
        <StatusTimeline currentStatus={order.status} />
      </div>

      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead className="text-right">Cant.</TableHead>
              <TableHead className="text-right">Precio unit.</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border bg-muted">
                      {item.product.image_url && (
                        <img
                          src={item.product.image_url}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    {item.product.name}
                  </div>
                </TableCell>
                <TableCell className="text-right tabular-nums">{item.quantity}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatPrice(item.unit_price)}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatPrice(item.subtotal)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Separator />

        <div className="space-y-2 p-4">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              Líneas de producto:{' '}
              <span className="font-medium text-foreground">{order.num_items}</span>
            </span>
          </div>
          <div className="flex justify-between text-base font-bold">
            <span>Total del pedido</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}