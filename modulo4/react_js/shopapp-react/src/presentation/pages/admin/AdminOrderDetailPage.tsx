// src/presentation/pages/admin/AdminOrderDetailPage.tsx
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Package } from 'lucide-react'

import { AdminShell } from '@/presentation/components/AdminShell'
import { StatusSelect } from '@/presentation/components/StatusSelect'
import { orderUseCase } from '@/infrastructure/factories/order.factory'
import { Button } from '@/presentation/components/ui/button'
import { Skeleton } from '@/presentation/components/ui/skeleton'
import { Separator } from '@/presentation/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/presentation/components/ui/table'
import { formatPrice, formatDate } from '@/presentation/utils/formatters'
import type { Order } from '@/domain/entities/order.entity'
import type { OrderStatus } from '@/domain/enums/order-status.enum'

export default function AdminOrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setIsLoading(true)
    setError(null)
    orderUseCase
      .getOrder(Number(id))
      .then(setOrder)
      .catch(() => setError('No se pudo cargar la orden. Inténtalo de nuevo.'))
      .finally(() => setIsLoading(false))
  }, [id])

  // StatusSelect actualiza el estado en AdminStore; aquí sincronizamos el objeto local
  // para que la cabecera de esta página lo refleje sin recargar.
  function handleStatusUpdate(newStatus: OrderStatus) {
    if (order) setOrder({ ...order, status: newStatus })
  }

  return (
    <AdminShell>
      <Button variant="ghost" size="sm" className="mb-6 -ml-2" onClick={() => navigate('/admin/orders')}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a órdenes
      </Button>

      {isLoading && (
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72" />
          <Skeleton className="h-64 w-full" />
        </div>
      )}

      {error && (
        <div className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">{error}</div>
      )}

      {!isLoading && !error && order && (
        <div className="space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-muted-foreground" />
                <h1 className="text-2xl font-semibold tracking-tight">Orden #{order.id}</h1>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Creada el {formatDate(order.created_at)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Estado:</span>
              <StatusSelect
                orderId={order.id}
                currentStatus={order.status}
                onUpdate={handleStatusUpdate}
              />
            </div>
          </div>

          <Separator />

          <section>
            <h2 className="mb-3 text-base font-semibold">Cliente</h2>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-muted-foreground">Usuario</dt>
                <dd className="font-medium">{order.username}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Fecha de orden</dt>
                <dd className="font-medium">{formatDate(order.created_at)}</dd>
              </div>
            </dl>
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 text-base font-semibold">Ítems ({order.num_items})</h2>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead className="w-24 text-center">Cantidad</TableHead>
                    <TableHead className="w-32 text-right">Precio unit.</TableHead>
                    <TableHead className="w-32 text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.product.name}</TableCell>
                      <TableCell className="text-center">{item.quantity}</TableCell>
                      <TableCell className="text-right">{formatPrice(item.unit_price)}</TableCell>
                      <TableCell className="text-right">{formatPrice(item.subtotal)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 flex justify-end">
              <div className="w-64 space-y-1 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Líneas de producto</span>
                  <span>{order.num_items}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-base font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </AdminShell>
  )
}