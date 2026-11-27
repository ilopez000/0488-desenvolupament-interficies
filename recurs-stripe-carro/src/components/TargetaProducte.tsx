import { euros, MAX_UNITATS } from '../format'
import type { Producte } from '../tipus'
import { forat } from '../forat'

type Props = {
  producte: Producte
  unitatsAlCarro: number
  onAfegir: (id: string) => void
}

/** La fitxa d'un producte del catàleg amb el botó d'afegir al carro */
export function TargetaProducte({ producte, unitatsAlCarro, onAfegir }: Props) {
  const ple = unitatsAlCarro >= MAX_UNITATS

  let textBoto = 'Afegir al carro'
  if (ple) textBoto = "Màxim d'unitats"
  else if (unitatsAlCarro > 0) textBoto = `Afegir (${unitatsAlCarro} al carro)`

  return (
    <article className="producte">
      <span className="emoji" aria-hidden="true">
        {producte.emoji}
      </span>
      <h3>{producte.nom}</h3>
      <p className="descripcio">{producte.descripcio}</p>
      <p className="preu">{euros(producte.preu)}</p>
      <button
        // ✏️ FORAT 21 · En clicar, afegeix aquest producte al carro (fes servir la prop onAfegir amb l'id)
        onClick={forat(21)}
        disabled={ple}
      >
        {textBoto}
      </button>
    </article>
  )
}
