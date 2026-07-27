// src/components/FetchUser.tsx

import { useState, useEffect } from 'react'

interface Users {
  id:       number
  name:     string
  email:    string
  username: string
  company:  Company
}
interface Company {
  name:     string
  catchPhrase:    string
  bs: string
}

export default function FetchUsers() {
  const [users,   setUsers]   = useState<Users[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchUsers() {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users`)
        if (!res.ok) throw new Error(`Error HTTP ${res.status}`)

        const data: Users[] = await res.json()

        if (!cancelled) setUsers(data)
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Error desconocido')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchUsers()

    return () => { cancelled = true }
  }, [])

  return (
    <div style={{ maxWidth: 360 }}>
      {loading && (
        <p style={{ color: '#6b7280', fontSize: 14 }}>Cargando...</p>
      )}
      {error && (
        <p style={{ color: '#991b1b', fontSize: 14 }}>Error: {error}</p>
      )}
      {users && !loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {users.map((user) => (
            <div key={user.id} style={{ padding: 14, border: '1px solid #e5e7eb', borderRadius: 8 }}>
              <p style={{ margin: '0 0 4px', fontWeight: 600 }}>{user.name}</p>
              <p style={{ margin: '0 0 4px', fontSize: 13, color: '#6b7280' }}>
                @{user.username}
              </p>
              <p style={{ margin: 0, fontSize: 13, color: '#6b7280' }}>
                {user.email}
              </p>
              <p style={{ margin: 0, fontSize: 13, color: '#6b7280' }}>
                Compañía: {user.company.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}