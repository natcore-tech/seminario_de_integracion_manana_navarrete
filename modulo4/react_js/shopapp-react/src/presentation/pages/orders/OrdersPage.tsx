// src/presentation/pages/orders/OrdersPage.tsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Package } from 'lucide-react'

import { Card, CardContent, CardHeader } from '@/presentation/components/ui/card'
import { Skeleton } from '@/presentation/components/ui/skeleton'
import { Button } from '@/presentation/components/ui/button'

import { useOrderStore } from '@/presentation/store/order.store'
import { formatPrice, formatDate } from '@/presentation/utils/formatters'
import { StatusBadge } from '@/presentation/components/StatusBadge'

// `StandardPagination` de Django usa page_size=10 por defecto; el adapter no lo sobreescribe.
const PAGE_SIZE = 10

// ── Skeletons ────────────────────────────────────────────────────────────────

function OrderCardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-20" />
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-between pt-0">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-16" />
      </CardContent>
    </Card>
  )
}

// ── Estado vacío ─────────────────────────────────────────────────────────────

function EmptyOrders() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <Package className="h-10 w-10 text-muted-foreground" />
      </div>
      <div>
        <h2 className="text-xl font-semibold">Sin pedidos todavía</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Cuando realices tu primer pedido aparecerá aquí.
        </p>
      </div>
      <button
        className="text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground"
        onClick={() => navigate('/catalog')}
      >
        Ver catálogo
      </button>
    </div>
  )
}

// ── Página principal ─────────────────────────────────────────────────────────

export default function OrdersPage() {
  const navigate = useNavigate()
  const orders = useOrderStore((s) => s.orders)
  const ordersTotal = useOrderStore((s) => s.ordersTotal)
  const currentPage = useOrderStore((s) => s.currentPage)
  const isLoading = useOrderStore((s) => s.isLoading)
  const fetchOrders = useOrderStore((s) => s.fetchOrders)
  const setPage = useOrderStore((s) => s.setPage)

  const totalPages = Math.max(1, Math.ceil(ordersTotal / PAGE_SIZE))

  useEffect(() => {
    fetchOrders(currentPage)
  }, [currentPage, fetchOrders])

  if (isLoading) {
    return (
      <div className="container py-8">
        <h1 className="mb-6 text-2xl font-bold">Mis pedidos</h1>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <OrderCardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  if (orders.length === 0) return <EmptyOrders />

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-2xl font-bold">
        Mis pedidos{' '}
        <span className="text-base font-normal text-muted-foreground">({ordersTotal})</span>
      </h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card
            key={order.id}
            className="cursor-pointer transition-colors hover:bg-muted/50"
            onClick={() => navigate(`/orders/${order.id}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigate(`/orders/${order.id}`)
              }
            }}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-semibold">
                  #{String(order.id).padStart(4, '0')}
                </span>
                <StatusBadge status={order.status} />
              </div>
            </CardHeader>

            <CardContent className="flex items-center justify-between pt-0 text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <span>{formatDate(order.created_at)}</span>
                <span>
                  {order.num_items} {order.num_items === 1 ? 'artículo' : 'artículos'}
                </span>
              </div>
              <span className="font-semibold text-foreground">{formatPrice(order.total)}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}