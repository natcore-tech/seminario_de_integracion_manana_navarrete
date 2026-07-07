import { useState } from 'react'

export default function SafeCounter() {
  const [count, setCount] = useState(0)

  function increment() {
    // ❌ Puede fallar si React agrupa renders
    setCount(count + 1)

    // ✅ Siempre correcto — prev es garantizado el valor actual
    setCount((prev) => prev + 1)
  }

  // Ejemplo donde la diferencia importa: incrementar 3 veces seguidas
  function incrementThree() {
    // ❌ Las tres líneas leen el mismo valor de count — resultado: +1
    /*setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)*/

    // ✅ Cada llamada recibe el prev actualizado — resultado: +3
    setCount((prev) => prev + 1)
    setCount((prev) => prev + 1)
    setCount((prev) => prev + 1)
  }

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={incrementThree}>+3</button>
    </div>
  )
}