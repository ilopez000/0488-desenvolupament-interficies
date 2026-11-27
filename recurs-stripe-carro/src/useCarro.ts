import { useCallback, useEffect, useState } from 'react'
import { MAX_UNITATS } from './format'
import type { LiniaCarro } from './tipus'
import { forat } from './forat'

/** Nom amb què desem el carro al localStorage del navegador */
export const CLAU_CARRO = 'botiga-dam2-carro'

/**
 * El carro de la compra: una llista de { id, quantitat }.
 * Es desa al localStorage, així sobreviu a una recàrrega i al viatge d'anada i tornada a Stripe.
 */
export function useCarro() {
  // ✏️ FORAT 13 · Estat inicial: el carro desat al localStorage (convertit de JSON) o, si no n'hi ha, una llista buida
  const [linies, setLinies] = useState<LiniaCarro[]>(() => forat(13))

  // Cada vegada que canvia el carro, el tornem a desar
  useEffect(() => {
    // ✏️ FORAT 14 · Desa el carro al localStorage, convertit a text JSON
    forat(14)
  }, [linies])

  function afegir(id: string) {
    setLinies((actuals) => {
      const jaHiEs = actuals.some((l) => l.id === id)
      if (jaHiEs) {
        // ✏️ FORAT 15 · Llista NOVA on la línia d'aquest producte té una unitat més (sense passar de MAX_UNITATS)
        return forat(15)
      }
      // ✏️ FORAT 16 · Llista NOVA amb totes les línies d'abans i una de nova per a aquest producte amb 1 unitat
      return forat(16)
    })
  }

  function treure(id: string) {
    setLinies((actuals) =>
      actuals
        .map((l) => (l.id === id ? { ...l, quantitat: l.quantitat - 1 } : l))
        // ✏️ FORAT 17 · Queda't només amb les línies que encara tenen alguna unitat
        .filter(forat(17)),
    )
  }

  function eliminar(id: string) {
    // ✏️ FORAT 18 · Treu del carro la línia d'aquest producte, tingui les unitats que tingui
    setLinies((actuals) => forat(18))
  }

  // useCallback: sempre és la mateixa funció, i per això es pot posar a les dependències d'un useEffect
  const buidar = useCallback(() => setLinies([]), [])

  // ✏️ FORAT 19 · Nombre total d'unitats del carro (la suma de totes les quantitats)
  const unitats = forat(19)

  return { linies, unitats, afegir, treure, eliminar, buidar }
}
