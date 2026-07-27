// src/presentation/pages/cart/CartPage.tsx
import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'

import { Button } from '@/presentation/components/ui/button'
import { Separator } from '@/presentation/components/ui/separator'

import { useCartStore } from '@/presentation/store/cart.store'
import { formatPrice } from '@/presentation/utils/formatters'
import type { CartItem } from '@/domain/entities/cart-item.entity'

// ── Fila de un ítem ──────────────────────────────────────────────────────────

interface CartItemRowProps {
  item: CartItem
  onUpdateQuantity: (productId: number, quantity: number) => void
  onRemove: (productId: number) => void
}

function CartItemRow({ item, onUpdateQuantity, onRemove }: CartItemRowProps) {
  const { product, quantity } = item
  const lineTotal = product.price * quantity

  return (
    <>
      <div className="flex gap-4 py-4">
        {/* Miniatura */}
        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border bg-muted">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ShoppingCart className="h-8 w-8 text-muted-foreground/40" />
            </div>
          )}
        </div>

        {/* Detalles */}
        <div className="flex flex-1 flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <div>
              <Link to={`/products/${product.id}`} className="font-medium hover:underline">
                {product.name}
              </Link>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {formatPrice(product.price)} / ud.
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => onRemove(product.id)}
              aria-label={`Eliminar ${product.name}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Controles de cantidad y total de línea */}
          <div className="flex items-center justify-between">
            <div className="flex items-center rounded-md border">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-none rounded-l-md"
                onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                disabled={quantity <= 1}
                aria-label="Reducir cantidad"
              >
                <Minus className="h-3 w-3" />
              </Button>

              <span className="flex h-8 w-10 items-center justify-center text-sm font-medium tabular-nums">
                {quantity}
              </span>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-none rounded-r-md"
                onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                disabled={quantity >= product.stock}
                aria-label="Aumentar cantidad"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            <span className="font-semibold">{formatPrice(lineTotal)}</span>
          </div>
        </div>
      </div>

      <Separator />
    </>
  )
}

// ── Estado vacío ─────────────────────────────────────────────────────────────

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <ShoppingCart className="h-10 w-10 text-muted-foreground" />
      </div>
      <div>
        <h2 className="text-xl font-semibold">Tu carrito está vacío</h2>
        <p className="mt-1 text-sm text-muted-foreground">Agrega productos para verlos aquí.</p>
      </div>
      <Link to="/catalog">
        <Button>Ver catálogo</Button>
      </Link>
    </div>
  )
}

// ── Página principal ─────────────────────────────────────────────────────────

export default function CartPage() {
  const navigate = useNavigate()

  const items = useCartStore((s) => s.items)
  const itemCount = useCartStore((s) => s.itemCount())
  const subtotal = useCartStore((s) => s.subtotal())
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const isEmpty = useCartStore((s) => s.isEmpty())

  if (isEmpty) return <EmptyCart />

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-2xl font-bold">
        Carrito{' '}
        <span className="text-muted-foreground font-normal text-base">
          ({itemCount} {itemCount === 1 ? 'producto' : 'productos'})
        </span>
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Lista de ítems */}
        <div className="lg:col-span-2">
          {items.map((item) => (
            <CartItemRow
              key={item.product.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}

          <div className="pt-4">
            <Link
              to="/catalog"
              className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
            >
              ← Continuar comprando
            </Link>
          </div>
        </div>

        {/* Resumen — sticky en desktop */}
        <aside className="h-fit rounded-xl border p-6 lg:sticky lg:top-24">
          <h2 className="mb-4 text-lg font-semibold">Resumen del pedido</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>
                Subtotal ({itemCount} {itemCount === 1 ? 'artículo' : 'artículos'})
              </span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-base font-bold">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
          </div>

          <Button className="mt-6 w-full" size="lg" onClick={() => navigate('/orders/new')}>
            Proceder al pago
          </Button>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            Los impuestos y gastos de envío se calculan en el siguiente paso.
          </p>
        </aside>
      </div>
    </div>
  )
}