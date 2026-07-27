// src/components/DocumentTitle.tsx

import { useEffect } from 'react'

export default function DocumentTitle() {
  useEffect(() => {
    document.title = 'Mi App con React 19'

    // Limpieza: restaurar el título al desmontar
    return () => {
      document.title = 'React App'
    }
  }, [])

  return (
    <p style={{ fontSize: 14, color: '#6b7280' }}>
      El título de la pestaña cambió al montar este componente.
    </p>
  )
}