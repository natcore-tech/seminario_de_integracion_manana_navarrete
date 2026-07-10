// src/presentation/components/CategoryFilter.tsx
import { useCatalogStore } from '@/presentation/store/catalog.store'
import { Button } from '@/presentation/components/ui/button'
import { cn } from '@/presentation/utils/cn'

export function CategoryFilter() {
  const categories = useCatalogStore((s) => s.categories)
  const filters = useCatalogStore((s) => s.filters)
  const setFilters = useCatalogStore((s) => s.setFilters)

  const handleSelect = (categoryId: number | null) => {
    setFilters({ categoryId })
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
      <Button
        variant={filters.categoryId === null ? 'default' : 'outline'}
        size="sm"
        className={cn('shrink-0', filters.categoryId === null && 'pointer-events-none')}
        onClick={() => handleSelect(null)}
      >
        Todos
      </Button>

      {categories.map((cat) => (
        <Button
          key={cat.id}
          variant={filters.categoryId === cat.id ? 'default' : 'outline'}
          size="sm"
          className={cn(
            'shrink-0',
            filters.categoryId === cat.id && 'pointer-events-none',
          )}
          onClick={() => handleSelect(cat.id)}
        >
          {cat.name}
        </Button>
      ))}
    </div>
  )
}