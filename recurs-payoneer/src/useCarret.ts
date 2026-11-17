// Carret de la compra guardat a sessionStorage: així el comparteixen totes les pàgines
// i sobreviu quan el client marxa a la pàgina de Payoneer i en torna.
import { useCallback, useEffect, useState } from 'react'
import type { Linia } from './tipus'

const CLAU = 'pratmerch-carret'

function llegir(): Linia[] {
  try {
    return JSON.parse(sessionStorage.getItem(CLAU) ?? '[]') as Linia[]
  } catch {
    return []
  }
}

export function useCarret() {
  const [linies, setLinies] = useState<Linia[]>(llegir)

  useEffect(() => {
    sessionStorage.setItem(CLAU, JSON.stringify(linies))
  }, [linies])

  function canviar(id: string, diferencia: number) {
    setLinies((actuals) => {
      const actual = actuals.find((l) => l.id === id)?.quantitat ?? 0
      const nova = Math.min(10, Math.max(0, actual + diferencia))
      const altres = actuals.filter((l) => l.id !== id)
      return nova === 0 ? altres : [...altres, { id, quantitat: nova }]
    })
  }

  const quantitat = (id: string) => linies.find((l) => l.id === id)?.quantitat ?? 0
  const buidar = useCallback(() => setLinies([]), []) // estable: es pot posar a les dependències

  return { linies, canviar, quantitat, buidar }
}
