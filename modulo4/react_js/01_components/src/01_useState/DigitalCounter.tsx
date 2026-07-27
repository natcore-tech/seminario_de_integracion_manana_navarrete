// src/components/DigitalCounter.tsx

import { useState } from 'react'

interface DigitalCounter {
  initialValue?: number
  step?: number
  label?: string
}

export default function DigitalCounter({
  initialValue = 0,
  step = 1,
  label = 'Contador',
}: DigitalCounter) {
  const [count, setCount] = useState(initialValue)

  function increment() {
    setCount(count + step)
  }

  function decrement() {
    setCount(count - step)
  }

  function reset() {
    setCount(initialValue)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: 14, color: '#666' }}>{label}</span>
      <button onClick={decrement} style={btnStyle}>−</button>
      <span style={{ fontSize: 20, fontWeight: 600, minWidth: 40, textAlign: 'center' }}>
        {count}
      </span>
      <button onClick={increment} style={btnStyle}>+</button>
      <button onClick={reset} style={{ ...btnStyle, fontSize: 12, color: '#999' }}>
        Reset
      </button>
    </div>
  )
}

const btnStyle = {
  width: 32,
  height: 32,
  borderRadius: 6,
  border: '1px solid #ddd',
  background: '#f5f5f5',
  cursor: 'pointer',
  fontSize: 16,
}