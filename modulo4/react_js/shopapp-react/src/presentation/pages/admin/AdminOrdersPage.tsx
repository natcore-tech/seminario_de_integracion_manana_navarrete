// src/presentation/pages/admin/AdminOrdersPage.tsx
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Eye } from 'lucide-react'

import { AdminShell } from '@/presentation/components/AdminShell'
import { StatusSelect } from '@/presentation/components/StatusSelect'
import { useAdminStore } from '@/presentation/store/admin.store'
import { formatPrice, formatDate } from '@/presentation/utils/formatters'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/presentation/components/ui/table'
import { Badge } from '@/presentation/components/ui/badge'
import { Button } from '@/presentation/components/ui/button'
import { Skeleton } from '@/presentation/components/ui/skeleton'
import { Tabs, TabsList, TabsTrigger } from '@/presentation/components/ui/tabs'
import type { OrderStatus } from '@/domain/enums/order-status.enum'

const STATUS_TABS: { label: string; value: OrderStatus | '' }[] = [
  { label: 'Todas', value: '' },
  { label: 'Pendiente', value: 'pending' },
  { label: 'Confirmado', value: 'confirmed' },
  { label: 'Enviado', value: 'shipped' },
  { label: 'Entregado', value: 'delivered' },
  { label: 'Cancelado', value: 'cancelled' },
]

// StandardPagination de Django usa page_size=10 por defecto; el adapter no lo sobreescribe.
const PAGE_SIZE = 10

export default function AdminOrdersPage() {
  const adminOrders = useAdminStore((s) => s.adminOrders)
  const isLoadingOrders = useAdminStore((s) => s.isLoadingOrders)
  const ordersTotal = useAdminStore((s) => s.ordersTotal)
  const ordersStatusFilter = useAdminStore((s) => s.ordersStatusFilter)
  const ordersPage = useAdminStore((s) => s.ordersPage)
  const fetchAdminOrders = useAdminStore((s) => s.fetchAdminOrders)
  const setOrdersStatusFilter = useAdminStore((s) => s.setOrdersStatusFilter)
  const setOrdersPage = useAdminStore((s) => s.setOrdersPage)

  const totalPages = Math.max(1, Math.ceil(ordersTotal / PAGE_SIZE))

  useEffect(() => {
    fetchAdminOrders()
  }, [ordersStatusFilter, ordersPage, fetchAdminOrders])

  const skeletonRows = Array.from({ length: 6 })

  return (
    <AdminShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Órdenes</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {ordersTotal} {ordersTotal === 1 ? 'orden' : 'órdenes'} en total
          </p>
        </div>

        <Tabs value={ordersStatusFilter} onValueChange={(v) => setOrdersStatusFilter(v as OrderStatus | '')}>
          <TabsList className="h-auto flex-wrap gap-1">
            {STATUS_TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="text-xs">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24"># Orden</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead className="text-center">Ítems</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="w-44">Estado</TableHead>
                <TableHead className="w-12 text-center">Ver</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingOrders &&
                skeletonRows.map((_, i) => (
                  <TableRow key={`skeleton-${i}`}>
                    {Array.from({ length: 7 }).map((__, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}

              {!isLoadingOrders && adminOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                    No se encontraron órdenes con el filtro seleccionado.
                  </TableCell>
                </TableRow>
              )}

              {!isLoadingOrders &&
                adminOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-muted/50">
                    <TableCell className="font-mono text-sm font-medium">#{order.id}</TableCell>
                    <TableCell className="font-medium">{order.username}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(order.created_at)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">{order.num_items}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatPrice(order.total)}
                    </TableCell>
                    <TableCell>
                      <StatusSelect orderId={order.id} currentStatus={order.status} />
                    </TableCell>
                    <TableCell className="text-center">
                      <Link to={`/admin/orders/${order.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Ver detalle orden #{order.id}</span>
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Página {ordersPage} de {totalPages}
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={ordersPage <= 1}
                onClick={() => setOrdersPage(ordersPage - 1)}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={ordersPage >= totalPages}
                onClick={() => setOrdersPage(ordersPage + 1)}
              >
                Siguiente
              </Button>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  )
}