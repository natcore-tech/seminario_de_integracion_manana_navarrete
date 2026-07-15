// src/presentation/components/admin/ProductForm.tsx
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'

import { Input } from '@/presentation/components/ui/input'
import { Label } from '@/presentation/components/ui/label'
import { Textarea } from '@/presentation/components/ui/textarea'
import { Switch } from '@/presentation/components/ui/switch'
import { Button } from '@/presentation/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/presentation/components/ui/select'
import type { Category } from '@/domain/entities/category.entity'

// ─── Schema de validación ───────────────────────────────────────────────────

const productSchema = z.object({
  name: z.string().min(2, 'Mínimo 2 caracteres').max(200, 'Máximo 200 caracteres'),
  description: z.string().max(1000, 'Máximo 1000 caracteres').optional().or(z.literal('')),
  price: z.coerce.number({ message: 'Ingresa un precio válido' }).positive('El precio debe ser mayor a 0'),
  stock: z.coerce
    .number({ message: 'Ingresa un stock válido' })
    .int('El stock debe ser un número entero')
    .min(0, 'El stock no puede ser negativo'),
  category_id: z.coerce.number({ message: 'Selecciona una categoría' }).positive('Selecciona una categoría'),
  is_active: z.boolean(),
})

export type ProductFormValues = z.infer<typeof productSchema>

// ─── Props ──────────────────────────────────────────────────────────────────

interface ProductFormProps {
  defaultValues?: Partial<ProductFormValues>
  onSubmit: (data: ProductFormValues) => Promise<void>
  isLoading?: boolean
  categories: Category[]
}

// ─── Componente ─────────────────────────────────────────────────────────────

export function ProductForm({ defaultValues, onSubmit, isLoading = false, categories }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema as never),
    defaultValues: {
      name: defaultValues?.name ?? '',
      description: defaultValues?.description ?? '',
      price: defaultValues?.price ?? 0,
      stock: defaultValues?.stock ?? 0,
      category_id: defaultValues?.category_id ?? 0,
      is_active: defaultValues?.is_active ?? true,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          placeholder='Ej. Laptop Gaming 15"'
          disabled={isLoading}
          aria-invalid={!!errors.name}
          {...register('name')}
        />
        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
      </div>

      <div className="space-y-1">
        <Label htmlFor="description">
          Descripción <span className="text-xs text-muted-foreground">(opcional)</span>
        </Label>
        <Textarea
          id="description"
          placeholder="Describe el producto..."
          rows={3}
          disabled={isLoading}
          aria-invalid={!!errors.description}
          {...register('description')}
        />
        {errors.description && (
          <p className="text-xs text-destructive">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="price">Precio ($)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            disabled={isLoading}
            aria-invalid={!!errors.price}
            {...register('price')}
          />
          {errors.price && <p className="text-xs text-destructive">{errors.price.message}</p>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            type="number"
            min="0"
            step="1"
            placeholder="0"
            disabled={isLoading}
            aria-invalid={!!errors.stock}
            {...register('stock')}
          />
          {errors.stock && <p className="text-xs text-destructive">{errors.stock.message}</p>}
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="category_id">Categoría</Label>
        <Controller
          control={control}
          name="category_id"
          render={({ field }) => (
            <Select
              onValueChange={(value) => field.onChange(Number(value))}
              value={field.value ? String(field.value) : undefined}
              disabled={isLoading}
            >
              <SelectTrigger id="category_id" aria-invalid={!!errors.category_id}>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={String(cat.id)}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.category_id && (
          <p className="text-xs text-destructive">{errors.category_id.message}</p>
        )}
      </div>

      <Controller
        control={control}
        name="is_active"
        render={({ field }) => (
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <Label htmlFor="is_active">Producto activo</Label>
              <p className="text-xs text-muted-foreground">
                Los productos inactivos no son visibles para los clientes.
              </p>
            </div>
            <Switch
              id="is_active"
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={isLoading}
            />
          </div>
        )}
      />

      <div className="flex justify-end pt-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? 'Guardando…' : 'Guardar'}
        </Button>
      </div>
    </form>
  )
}