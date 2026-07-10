// src/presentation/pages/catalog/ProductDetailPage.tsx
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Minus, Plus, ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/presentation/components/ui/button'
import { Badge } from '@/presentation/components/ui/badge'
import { Skeleton } from '@/presentation/components/ui/skeleton'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/presentation/components/ui/breadcrumb'

import { productUseCase } from '@/infrastructure/factories/product.factory'
import { useCartStore } from '@/presentation/store/cart.store'
import { formatPrice } from '@/presentation/utils/formatters'
import type { Product } from '@/domain/entities/product.entity'

// ── Skeleton de carga ────────────────────────────────────────────────────────

function ProductDetailSkeleton() {
  return (
    <div className="container py-8">
      <Skeleton className="mb-6 h-5 w-64" />
      <div className="grid gap-8 md:grid-cols-2">
        <Skeleton className="aspect-square w-full rounded-xl" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <div className="mt-4 flex gap-3">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 flex-1" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Selector de cantidad ─────────────────────────────────────────────────────

interface QuantitySelectorProps {
  value: number
  min?: number
  max: number
  onChange: (value: number) => void
}

function QuantitySelector({ value, min = 1, max, onChange }: QuantitySelectorProps) {
  return (
    <div className="flex items-center rounded-md border">
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-none rounded-l-md"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Reducir cantidad"
      >
        <Minus className="h-4 w-4" />
      </Button>

      <span className="flex h-10 w-12 items-center justify-center text-sm font-medium tabular-nums">
        {value}
      </span>

      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-none rounded-r-md"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Aumentar cantidad"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}

// ── Página principal ─────────────────────────────────────────────────────────

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const addItem = useCartStore((s) => s.addItem)

  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (!id) return

    setIsLoading(true)
    setError(null)

    productUseCase
      .getProduct(Number(id))
      .then((data) => {
        setProduct(data)
        setQuantity(1)
      })
      .catch(() => setError('No se pudo cargar el producto.'))
      .finally(() => setIsLoading(false))
  }, [id])

  if (isLoading) return <ProductDetailSkeleton />

  if (error || !product) {
    return (
      <div className="container py-16 text-center">
        <p className="text-muted-foreground">{error ?? 'Producto no encontrado.'}</p>
        <Link to="/catalog">
          <Button className="mt-4" variant="outline">
            Volver al catálogo
          </Button>
        </Link>
      </div>
    )
  }

  const inStock = product.stock > 0

  function handleAddToCart() {
    if (!product) return
    addItem(product, quantity)
    toast.success('Producto agregado al carrito', {
      description: `${quantity} × ${product.name}`,
      duration: 3000,
    })
  }

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Inicio</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/catalog">Catálogo</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Layout de dos columnas */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Imagen del producto */}
        <div className="overflow-hidden rounded-xl border bg-muted">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="aspect-square w-full object-cover"
            />
          ) : (
            <div className="flex aspect-square w-full items-center justify-center text-muted-foreground">
              <ShoppingCart className="h-24 w-24 opacity-20" />
            </div>
          )}
        </div>

        {/* Información del producto */}
        <div className="flex flex-col gap-5">
          <Badge variant="secondary" className="w-fit">
            {product.category.name}
          </Badge>

          <h1 className="text-3xl font-bold leading-tight">{product.name}</h1>

          <p className="text-4xl font-extrabold tracking-tight text-primary">
            {formatPrice(product.price)}
          </p>

          <div className="flex items-center gap-2 text-sm">
            <span
              className={[
                'inline-block h-2 w-2 rounded-full',
                inStock ? 'bg-green-500' : 'bg-red-500',
              ].join(' ')}
            />
            <span className={inStock ? 'text-green-700' : 'text-red-600'}>
              {inStock ? `${product.stock} unidades disponibles` : 'Agotado'}
            </span>
          </div>

          {product.description && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <QuantitySelector
              value={quantity}
              min={1}
              max={product.stock}
              onChange={setQuantity}
            />

            <Button
              className="flex-1 gap-2"
              size="lg"
              disabled={!inStock}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5" />
              {inStock ? 'Agregar al carrito' : 'Agotado'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}