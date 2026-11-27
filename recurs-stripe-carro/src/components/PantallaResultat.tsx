import { useEffect, useState } from 'react'
import { euros } from '../format'
import type { Resultat } from '../tipus'
import { forat } from '../forat'

type Props = {
  idSessio: string
  onPagat: () => void
}

/** Pantalla de tornada de Stripe: pregunta al NOSTRE servidor què s'ha pagat de debò */
export function PantallaResultat({ idSessio, onPagat }: Props) {
  const [resultat, setResultat] = useState<Resultat | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/sessio/${idSessio}`)
      .then((resposta) => resposta.json())
      .then((dades) => {
        if (dades.error) return setError(dades.error)
        setResultat(dades)
        // ✏️ FORAT 25 · Si Stripe confirma que s'ha pagat, buida el carro (crida onPagat)
        forat(25)
      })
      .catch(() => setError('No puc parlar amb el servidor'))
  }, [idSessio, onPagat])

  return (
    <>
      <h1>Resultat del pagament</h1>
      {error && <p className="error">{error}</p>}
      {!error && !resultat && <p>Comprovant el pagament…</p>}

      {resultat?.pagat && (
        <article className="rebut">
          <p className="ok">Pagament confirmat</p>
          <ul>
            {resultat.linies.map((linia) => (
              <li key={linia.nom}>
                <span>
                  {linia.quantitat} × {linia.nom}
                </span>
                <span>{euros(linia.import)}</span>
              </li>
            ))}
          </ul>
          <p className="total">
            Total pagat <strong>{euros(resultat.import)}</strong>
          </p>
          {resultat.correu && <p className="pista">Rebut enviat a {resultat.correu}</p>}
        </article>
      )}
      {resultat && !resultat.pagat && <p className="error">El pagament no s'ha completat.</p>}

      <a href="/">Tornar a la botiga</a>
    </>
  )
}
