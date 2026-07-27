// src/presentation/components/ImageUploader.tsx
import { useRef, useState } from 'react'
import { Upload, ImageIcon, X, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/presentation/components/ui/button'
import { cn } from '@/presentation/utils/cn'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

interface ImageUploaderProps {
  /** URL de la imagen actual almacenada en el backend. null si no existe. */
  currentImageUrl?: string | null
  /** Callback que sube el archivo. Debe llamar al caso de uso correspondiente. */
  onUpload: (file: File) => Promise<void>
  /** Tamaño máximo en MB. Por defecto 2 MB — igual al límite real del backend. */
  maxSizeMB?: number
  /** Clases CSS adicionales para el contenedor externo. */
  className?: string
  /** Aplica estilo circular (para avatares). */
  circular?: boolean
}

export function ImageUploader({
  currentImageUrl,
  onUpload,
  maxSizeMB = 2,
  className,
  circular = false,
}: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl ?? null)
  const [pendingFile, setPendingFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const maxSizeBytes = maxSizeMB * 1024 * 1024

  function handleClickArea() {
    inputRef.current?.click()
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error('Formato no permitido', {
        description: 'Solo se aceptan imágenes JPEG, PNG o WebP.',
      })
      event.target.value = ''
      return
    }

    if (file.size > maxSizeBytes) {
      toast.error('Archivo demasiado grande', {
        description: `El archivo supera el límite de ${maxSizeMB} MB.`,
      })
      event.target.value = ''
      return
    }

    // Revoca el blob anterior antes de crear uno nuevo, para no filtrar memoria.
    if (previewUrl?.startsWith('blob:')) URL.revokeObjectURL(previewUrl)

    setPreviewUrl(URL.createObjectURL(file))
    setPendingFile(file)
  }

  async function handleUpload() {
    if (!pendingFile) return
    setIsUploading(true)
    try {
      await onUpload(pendingFile)
      setPendingFile(null)
      toast.success('Imagen actualizada', { description: 'La imagen se subió correctamente.' })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al subir la imagen.'
      toast.error('Error', { description: message })
    } finally {
      setIsUploading(false)
    }
  }

  function handleCancel() {
    if (previewUrl?.startsWith('blob:')) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(currentImageUrl ?? null)
    setPendingFile(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      <button
        type="button"
        onClick={handleClickArea}
        className={cn(
          'relative overflow-hidden border-2 border-dashed border-muted-foreground/30 bg-muted',
          'cursor-pointer transition-colors hover:border-primary/50',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          circular ? 'h-28 w-28 rounded-full' : 'aspect-square w-full max-w-xs rounded-lg',
        )}
        aria-label="Seleccionar imagen"
      >
        {previewUrl ? (
          <>
            <img src={previewUrl} alt="Vista previa" className="h-full w-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
              <Upload className="h-6 w-6 text-white" />
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 p-4">
            <ImageIcon className="h-10 w-10 text-muted-foreground" />
            <span className="text-center text-xs text-muted-foreground">Haz clic para seleccionar</span>
          </div>
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(',')}
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
      />

      {pendingFile ? (
        <div className="flex w-full max-w-xs gap-2">
          <Button type="button" onClick={handleUpload} disabled={isUploading} size="sm" className="flex-1">
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subiendo…
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Subir imagen
              </>
            )}
          </Button>
          <Button type="button" onClick={handleCancel} disabled={isUploading} variant="outline" size="sm">
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">Máximo {maxSizeMB} MB · JPG, PNG, WebP</p>
      )}
    </div>
  )
}