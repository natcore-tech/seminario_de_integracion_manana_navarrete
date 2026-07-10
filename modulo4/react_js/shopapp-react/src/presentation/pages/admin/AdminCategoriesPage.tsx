// src/presentation/pages/admin/AdminCategoriesPage.tsx
import { useEffect, useState } from 'react'
import { Pencil, Trash2, Plus, FolderOpen } from 'lucide-react'
import { toast } from 'sonner'

import { AdminShell } from '@/presentation/components/AdminShell'
import { Button } from '@/presentation/components/ui/button'
import { Badge } from '@/presentation/components/ui/badge'
import { Switch } from '@/presentation/components/ui/switch'
import { Skeleton } from '@/presentation/components/ui/skeleton'
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
import type { Category } from '@/domain/entities/category.entity'
import { CategoryDialog } from '@/presentation/components/CategoryDialog'
import { DeleteConfirmDialog } from '@/presentation/components/DeleteConfirmDialog'

export default function AdminCategoriesPage() {
  const categories = useAdminStore((s) => s.categories)
  const isLoadingCategories = useAdminStore((s) => s.isLoadingCategories)
  const categoriesError = useAdminStore((s) => s.categoriesError)
  const fetchCategories = useAdminStore((s) => s.fetchCategories)
  const updateCategory = useAdminStore((s) => s.updateCategory)
  const deleteCategory = useAdminStore((s) => s.deleteCategory)

  const [createOpen, setCreateOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Category | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  async function handleToggleActive(category: Category) {
    try {
      await updateCategory(category.id, { is_active: !category.is_active })
    } catch (err) {
      const message = err instanceof ApiException ? err.detail : 'No se pudo actualizar el estado.'
      toast.error('Error', { description: message })
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return
    setIsDeleting(true)
    try {
      await deleteCategory(deleteTarget.id)
      toast.success('Categoría eliminada', {
        description: `"${deleteTarget.name}" fue eliminada correctamente.`,
      })
      setDeleteTarget(null)
    } catch (err) {
      const message = err instanceof ApiException ? err.detail : 'No se pudo eliminar la categoría.'
      toast.error('Error', { description: message })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AdminShell>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Categorías</h1>
          <p className="mt-1 text-sm text-muted-foreground">Gestiona las categorías del catálogo.</p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva categoría
        </Button>
      </div>

      {categoriesError && (
        <div className="mb-4 rounded-md border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {categoriesError}
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="text-center">Productos</TableHead>
              <TableHead className="text-center">Activa</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingCategories &&
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={`skeleton-${i}`}>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-48" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="mx-auto h-4 w-8" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="mx-auto h-5 w-9" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="ml-auto h-8 w-20" />
                  </TableCell>
                </TableRow>
              ))}

            {!isLoadingCategories && categories.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-12 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <FolderOpen className="h-10 w-10" />
                    <p className="text-sm font-medium">No hay categorías registradas</p>
                    <Button variant="outline" size="sm" onClick={() => setCreateOpen(true)}>
                      <Plus className="mr-2 h-3 w-3" />
                      Crear primera categoría
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {!isLoadingCategories &&
              categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="max-w-xs truncate text-muted-foreground">
                    {category.description || <span className="text-xs italic">Sin descripción</span>}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary">{category.total_products}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Switch
                      checked={category.is_active}
                      onCheckedChange={() => handleToggleActive(category)}
                      aria-label={`${category.is_active ? 'Desactivar' : 'Activar'} ${category.name}`}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setEditTarget(category)}
                        title="Editar categoría"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => setDeleteTarget(category)}
                        title="Eliminar categoría"
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

      <CategoryDialog open={createOpen} onOpenChange={setCreateOpen} />

      <CategoryDialog
        open={Boolean(editTarget)}
        onOpenChange={(open) => {
          if (!open) setEditTarget(null)
        }}
        category={editTarget ?? undefined}
      />

      <DeleteConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null)
        }}
        title="¿Eliminar categoría?"
        description={
          deleteTarget
            ? `Esta acción no se puede deshacer. La categoría "${deleteTarget.name}" será eliminada permanentemente. Solo es posible si no tiene productos asociados.`
            : ''
        }
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </AdminShell>
  )
}