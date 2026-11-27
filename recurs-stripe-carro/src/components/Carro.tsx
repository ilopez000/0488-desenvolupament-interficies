import { euros, MAX_UNITATS } from '../format'
import type { LiniaCarro, Producte } from '../tipus'
import { forat } from '../forat'

type Props = {
  linies: LiniaCarro[]
  productes: Producte[]
  esperant: boolean
  onAfegir: (id: string) => void
  onTreure: (id: string) => void
  onEliminar: (id: string) => void
  onBuidar: () => void
  onPagar: () => void
}

/** El carro: línies amb − / + / ✕, el total i el botó de pagar */
export function Carro({ linies, productes, esperant, onAfegir, onTreure, onEliminar, onBuidar, onPagar }: Props) {
  const producteDe = (id: string) => productes.find((p) => p.id === id)

  // ✏️ FORAT 22 · Total en cèntims: la suma de preu × quantitat de cada línia (fes servir producteDe)
  const total = forat(22)

  if (linies.length === 0) {
    return (
      <aside className="carro">
        <h2>El teu carro</h2>
        <p className="buit">Encara no hi has posat res.</p>
      </aside>
    )
  }

  return (
    <aside className="carro">
      <h2>El teu carro</h2>
      <ul>
        {linies.map((linia) => {
          const producte = producteDe(linia.id)
          if (!producte) return null
          return (
            <li key={linia.id}>
              <span className="nom">
                {producte.emoji} {producte.nom}
              </span>
              <span className="quantitat">
                <button className="petit" onClick={() => onTreure(linia.id)} aria-label={`Una unitat menys de ${producte.nom}`}>
                  −
                </button>
                <span>{linia.quantitat}</span>
                <button
                  className="petit"
                  onClick={() => onAfegir(linia.id)}
                  disabled={linia.quantitat >= MAX_UNITATS}
                  aria-label={`Una unitat més de ${producte.nom}`}
                >
                  +
                </button>
              </span>
              <span className="subtotal">{euros(producte.preu * linia.quantitat)}</span>
              <button className="eliminar" onClick={() => onEliminar(linia.id)} aria-label={`Treure ${producte.nom} del carro`}>
                ✕
              </button>
            </li>
          )
        })}
      </ul>

      <p className="total">
        Total <strong>{euros(total)}</strong>
      </p>
      <button onClick={onPagar} disabled={esperant}>
        {esperant ? 'Un moment…' : 'Pagar amb Stripe'}
      </button>
      <button className="secundari" onClick={onBuidar} disabled={esperant}>
        Buidar el carro
      </button>
    </aside>
  )
}
