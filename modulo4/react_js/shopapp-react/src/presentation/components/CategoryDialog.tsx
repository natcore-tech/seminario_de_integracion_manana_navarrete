// src/presentation/components/admin/CategoryDialog.tsx
import { useState } from 'react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/presentation/components/ui/dialog'
import { useAdminStore } from '@/presentation/store/admin.store'
import { ApiException } from '@/domain/exceptions/api.exception'
import type { Category } from '@/domain/entities/category.entity'
import { CategoryForm, type CategoryFormValues } from './CategoryForm'

interface CategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category?: Category
}

export function CategoryDialog({ open, onOpenChange, category }: CategoryDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const createCategory = useAdminStore((s) => s.createCategory)
  const updateCategory = useAdminStore((s) => s.updateCategory)

  const isEditing = Boolean(category)
  const title = isEditing ? 'Editar categoría' : 'Nueva categoría'

  async function handleSubmit(data: CategoryFormValues) {
    setIsLoading(true)
    try {
      if (isEditing && category) {
        await updateCategory(category.id, data)
        toast.success('Categoría actualizada', {
          description: `"${data.name}" fue actualizada correctamente.`,
        })
      } else {
        await createCategory({ ...data, slug: data.name })
        toast.success('Categoría creada', {
          description: `"${data.name}" fue creada correctamente.`,
        })
      }
      onOpenChange(false)
    } catch (err) {
      const message =
        err instanceof ApiException
          ? err.detail
          : isEditing
            ? 'No se pudo actualizar la categoría.'
            : 'No se pudo crear la categoría.'
      toast.error('Error', { description: message })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <CategoryForm
          key={category?.id ?? 'new'}
          defaultValues={
            category
              ? { name: category.name, description: category.description, is_active: category.is_active }
              : undefined
          }
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  )
}