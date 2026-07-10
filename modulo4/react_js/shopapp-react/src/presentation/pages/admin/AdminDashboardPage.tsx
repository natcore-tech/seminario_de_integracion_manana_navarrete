// src/presentation/pages/admin/AdminDashboardPage.tsx
import { useEffect } from 'react'
import { Package, Tag, ShoppingCart, Users, Clock, AlertTriangle } from 'lucide-react'

import { AdminShell } from '@/presentation/components/AdminShell'
import { KpiCard } from '@/presentation/components/KpiCard'
import { useAdminStore } from '@/presentation/store/admin.store'
import { Skeleton } from '@/presentation/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/presentation/components/ui/card'

function KpiCardSkeleton() {
  return (
    <Card className="border-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </CardHeader>
      <CardContent>
        <Skeleton className="mb-1 h-8 w-16" />
        <Skeleton className="h-3 w-32" />
      </CardContent>
    </Card>
  )
}

export default function AdminDashboardPage() {
  const { stats, isLoadingStats, statsError, fetchStats } = useAdminStore()

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  return (
    <AdminShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Resumen general del estado de la tienda.
          </p>
        </div>

        {statsError && !isLoadingStats && (
          <div className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3">
            <p className="text-sm font-medium text-destructive">{statsError}</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {isLoadingStats ? (
            Array.from({ length: 6 }).map((_, i) => <KpiCardSkeleton key={i} />)
          ) : (
            <>
              <KpiCard
                title="Total Productos"
                value={stats?.total_products ?? 0}
                icon={Package}
                description="Productos activos en el catálogo"
              />
              <KpiCard
                title="Categorías"
                value={stats?.total_categories ?? 0}
                icon={Tag}
                description="Categorías de productos registradas"
              />
              <KpiCard
                title="Total Órdenes"
                value={stats?.total_orders ?? 0}
                icon={ShoppingCart}
                description="Pedidos realizados hasta la fecha"
              />
              <KpiCard
                title="Total Usuarios"
                value={stats?.total_users ?? 0}
                icon={Users}
                description="Cuentas registradas en la plataforma"
              />
              <KpiCard
                title="Órdenes Pendientes"
                value={stats?.pending_orders ?? 0}
                icon={Clock}
                description="Pedidos sin confirmar ni procesar"
                variant="warning"
              />
              <KpiCard
                title="Sin Stock"
                value={stats?.out_of_stock_products ?? 0}
                icon={AlertTriangle}
                description="Productos activos con stock igual a cero"
                variant="danger"
              />
            </>
          )}
        </div>
      </div>
    </AdminShell>
  )
}