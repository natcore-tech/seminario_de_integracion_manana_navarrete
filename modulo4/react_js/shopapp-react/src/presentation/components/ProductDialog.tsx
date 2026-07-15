// src/presentation/components/admin/ProductDialog.tsx
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
import type { Product } from '@/domain/entities/product.entity'
import { ProductForm, type ProductFormValues } from './ProductForm'

interface ProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product?: Product
  categories: Category[]
}

export function ProductDialog({ open, onOpenChange, product, categories }: ProductDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const createProduct = useAdminStore((s) => s.createProduct)
  const updateProduct = useAdminStore((s) => s.updateProduct)

  const isEditing = Boolean(product)
  const title = isEditing ? 'Editar producto' : 'Nuevo producto'
  const activeCategories = categories.filter((c) => c.is_active)

  async function handleSubmit(data: ProductFormValues) {
    setIsLoading(true)
    try {
      if (isEditing && product) {
        await updateProduct(product.id, data)
        toast.success('Producto actualizado', {
          description: `"${data.name}" fue actualizado correctamente.`,
        })
      } else {
        await createProduct(data)
        toast.success('Producto creado', {
          description: `"${data.name}" fue creado correctamente.`,
        })
      }
      onOpenChange(false)
    } catch (err) {
      const message =
        err instanceof ApiException
          ? err.detail
          : isEditing
            ? 'No se pudo actualizar el producto.'
            : 'No se pudo crear el producto.'
      toast.error('Error', { description: message })
    } finally {
      setIsLoading(false)
    }
  }

  const defaultValues: Partial<ProductFormValues> | undefined = product
    ? {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category_id: product.category.id,
        is_active: product.is_active,
      }
    : undefined

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ProductForm
          key={product?.id ?? 'new'}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          categories={activeCategories}
        />
      </DialogContent>
    </Dialog>
  )
}