// src/presentation/pages/admin/AdminProductsPage.tsx
import { useEffect, useState, useRef } from 'react'
import {
  Pencil,
  Trash2,
  Plus,
  Package,
  Search,
  ChevronLeft,
  ChevronRight,
  PackageX,
} from 'lucide-react'
import { toast } from 'sonner'

import { AdminShell } from '@/presentation/components/AdminShell'
import { Button } from '@/presentation/components/ui/button'
import { Input } from '@/presentation/components/ui/input'
import { Badge } from '@/presentation/components/ui/badge'
import { Skeleton } from '@/presentation/components/ui/skeleton'
import { Switch } from '@/presentation/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/presentation/components/ui/table'
import { useAdminStore } from '@/presentation/store/admin.store'
import { ApiException } from '@/domain/exceptions/api.exception'
import type { Product } from '@/domain/entities/product.entity'
import { ProductDialog } from '@/presentation/components/ProductDialog'
import { RestockDialog } from '@/presentation/components/RestockDialog'
import { DeleteConfirmDialog } from '@/presentation/components/DeleteConfirmDialog'
import { formatPrice } from '@/presentation/utils/formatters'

const PAGE_SIZE = 12 // mismo page_size fijo del adapter de productos (módulo 4)
const DEBOUNCE_MS = 300 // mismo debounce usado en la búsqueda pública (módulo 5)

export default function AdminProductsPage() {
  const products = useAdminStore((s) => s.products)
  const isLoadingProducts = useAdminStore((s) => s.isLoadingProducts)
  const productsError = useAdminStore((s) => s.productsError)
  const productsTotal = useAdminStore((s) => s.productsTotal)
  const fetchProducts = useAdminStore((s) => s.fetchProducts)
  const updateProduct = useAdminStore((s) => s.updateProduct)
  const deleteProduct = useAdminStore((s) => s.deleteProduct)
  const categories = useAdminStore((s) => s.categories)
  const fetchCategories = useAdminStore((s) => s.fetchCategories)

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [createOpen, setCreateOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Product | null>(null)
  const [restockTarget, setRestockTarget] = useState<Product | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [togglingId, setTogglingId] = useState<number | null>(null)

  const totalPages = Math.max(1, Math.ceil(productsTotal / PAGE_SIZE))

  // Categorías para el formulario (ya se cargan en el módulo 10 si aún no existen)
  useEffect(() => {
    if (categories.length === 0) fetchCategories()
  }, [categories.length, fetchCategories])

  // Debounce del buscador
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, DEBOUNCE_MS)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [search])

  useEffect(() => {
    fetchProducts(page, debouncedSearch)
  }, [fetchProducts, page, debouncedSearch])

  async function handleToggleActive(product: Product) {
    setTogglingId(product.id)
    try {
      await updateProduct(product.id, { is_active: !product.is_active })
    } catch (err) {
      const message = err instanceof ApiException ? err.detail : 'No se pudo cambiar el estado.'
      toast.error('Error', { description: message })
    } finally {
      setTogglingId(null)
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return
    setIsDeleting(true)
    try {
      await deleteProduct(deleteTarget.id)
      toast.success('Producto eliminado', {
        description: `"${deleteTarget.name}" fue eliminado correctamente.`,
      })
      setDeleteTarget(null)
    } catch (err) {
      const message = err instanceof ApiException ? err.detail : 'No se pudo eliminar el producto.'
      toast.error('Error', { description: message })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AdminShell>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Productos</h1>
          <p className="mt-1 text-sm text-muted-foreground">Gestiona el catálogo completo de productos.</p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo producto
        </Button>
      </div>

      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {productsError && (
        <div className="mb-4 rounded-md border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {productsError}
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Imagen</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead className="text-right">Precio</TableHead>
              <TableHead className="text-center">Stock</TableHead>
              <TableHead className="text-center">Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingProducts &&
              Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <TableRow key={`skeleton-${i}`}>
                  <TableCell>
                    <Skeleton className="h-10 w-10 rounded" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-40" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="ml-auto h-4 w-16" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="mx-auto h-4 w-10" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="mx-auto h-5 w-9 rounded-full" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="ml-auto h-8 w-28" />
                  </TableCell>
                </TableRow>
              ))}

            {!isLoadingProducts && products.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="py-12 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <PackageX className="h-10 w-10" />
                    <p className="text-sm font-medium">
                      {debouncedSearch ? `Sin resultados para "${debouncedSearch}"` : 'No hay productos registrados'}
                    </p>
                    {!debouncedSearch && (
                      <Button variant="outline" size="sm" onClick={() => setCreateOpen(true)}>
                        <Plus className="mr-2 h-3 w-3" />
                        Crear primer producto
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}

            {!isLoadingProducts &&
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-10 w-10 rounded border object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded border bg-muted">
                        <Package className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </TableCell>

                  <TableCell className="max-w-[200px] truncate font-medium">{product.name}</TableCell>

                  <TableCell className="text-sm text-muted-foreground">{product.category.name}</TableCell>

                  <TableCell className="text-right font-mono text-sm">{formatPrice(product.price)}</TableCell>

                  <TableCell className="text-center">
                    <span className={product.stock === 0 ? 'font-semibold text-destructive' : 'text-foreground'}>
                      {product.stock}
                    </span>
                  </TableCell>

                  <TableCell className="text-center">
                    <Switch
                      checked={product.is_active}
                      onCheckedChange={() => handleToggleActive(product)}
                      disabled={togglingId === product.id}
                      aria-label={`${product.is_active ? 'Desactivar' : 'Activar'} ${product.name}`}
                    />
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setEditTarget(product)}
                        title="Editar producto"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setRestockTarget(product)}
                        title="Reabastecer stock"
                      >
                        <Package className="h-4 w-4" />
                        <span className="sr-only">Reabastecer</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => setDeleteTarget(product)}
                        title="Eliminar producto"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Eliminar</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {!isLoadingProducts && totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Mostrando{' '}
            <span className="font-medium">
              {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, productsTotal)}
            </span>{' '}
            de <span className="font-medium">{productsTotal}</span> productos
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Página anterior</span>
            </Button>
            <span className="text-sm">
              {page} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Página siguiente</span>
            </Button>
          </div>
        </div>
      )}

      <ProductDialog open={createOpen} onOpenChange={setCreateOpen} categories={categories} />

      <ProductDialog
        open={Boolean(editTarget)}
        onOpenChange={(open) => {
          if (!open) setEditTarget(null)
        }}
        product={editTarget ?? undefined}
        categories={categories}
      />

      {restockTarget && (
        <RestockDialog
          open={Boolean(restockTarget)}
          onOpenChange={(open) => {
            if (!open) setRestockTarget(null)
          }}
          product={restockTarget}
        />
      )}

      <DeleteConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null)
        }}
        title="¿Eliminar producto?"
        description={
          deleteTarget
            ? `Esta acción no se puede deshacer. El producto "${deleteTarget.name}" será eliminado permanentemente del catálogo.`
            : ''
        }
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </AdminShell>
  )
}