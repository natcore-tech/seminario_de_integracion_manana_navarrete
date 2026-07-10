// src/presentation/pages/orders/CheckoutPage.tsx
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AlertCircle, Loader2, ShoppingBag } from 'lucide-react'

import { Button } from '@/presentation/components/ui/button'
import { Separator } from '@/presentation/components/ui/separator'
import { Alert, AlertDescription } from '@/presentation/components/ui/alert'

import { useCartStore } from '@/presentation/store/cart.store'
import { useOrderStore } from '@/presentation/store/order.store'
import { formatPrice } from '@/presentation/utils/formatters'

export default function CheckoutPage() {
  const navigate = useNavigate()

  const items = useCartStore((s) => s.items)
  const subtotal = useCartStore((s) => s.subtotal())
  const itemCount = useCartStore((s) => s.itemCount())
  const isEmpty = useCartStore((s) => s.isEmpty())

  const placeOrder = useOrderStore((s) => s.placeOrder)
  const isLoading = useOrderStore((s) => s.isLoading)
  const error = useOrderStore((s) => s.error)
  const clearError = useOrderStore((s) => s.clearError)

  // Si el carrito está vacío al montar la página, redirige al carrito.
  useEffect(() => {
    if (isEmpty) {
      navigate('/cart', { replace: true })
    }
  }, [isEmpty, navigate])

  // Limpia el error del store al desmontar
  useEffect(() => {
    return () => {
      clearError()
    }
  }, [clearError])

  async function handleConfirm() {
    try {
      // placeOrder ejecuta internamente create → add-item (uno por cada línea) → confirm.
      const newOrder = await placeOrder(items)
      navigate(`/orders/${newOrder.id}`, { replace: true })
    } catch {
      // El error ya está en el store; el componente lo muestra.
    }
  }

  if (isEmpty) return null

  return (
    <div className="container max-w-2xl py-12">
      <h1 className="mb-8 text-2xl font-bold">Confirmar pedido</h1>

      {/* Lista de ítems del carrito */}
      <section className="rounded-xl border">
        <div className="p-4">
          <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
            Resumen del pedido
          </h2>
        </div>
        <Separator />

        <ul className="divide-y">
          {items.map((item) => (
            <li
              key={item.product.id}
              className="flex items-center justify-between gap-4 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border bg-muted">
                  {item.product.image && (
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="text-sm">
                  <p className="font-medium leading-snug">{item.product.name}</p>
                  <p className="text-muted-foreground">
                    {item.quantity} × {formatPrice(item.product.price)}
                  </p>
                </div>
              </div>
              <span className="text-sm font-semibold">
                {formatPrice(item.product.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>

        <Separator />

        <div className="flex justify-between px-4 py-3 text-sm">
          <span className="text-muted-foreground">
            {itemCount} {itemCount === 1 ? 'artículo' : 'artículos'}
          </span>
          <span className="font-bold text-base">{formatPrice(subtotal)}</span>
        </div>
      </section>

      {/* Error de la API (incluye errores de stock insuficiente devueltos por add-item) */}
      {error && (
        <Alert variant="destructive" className="mt-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Acciones */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row-reverse">
        <Button size="lg" className="gap-2 sm:flex-1" onClick={handleConfirm} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Procesando…
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" />
              Confirmar pedido
            </>
          )}
        </Button>

        <Button variant="outline" size="lg" className="sm:flex-1" asChild disabled={isLoading}>
          <Link to="/cart">Volver al carrito</Link>
        </Button>
      </div>
    </div>
  )
}