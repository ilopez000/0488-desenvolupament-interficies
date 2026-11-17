// returnUrl · Payoneer hi torna el client amb paràmetres a la URL (?longId=…&statusCode=…).
// REGLA D'OR: la URL la pot escriure qualsevol, així que NO ens en refiem.
// Preguntem al nostre servidor, que ho consulta a Payoneer.
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { consultarPagament } from '../api'
import EtiquetaEstat from '../components/EtiquetaEstat'
import type { EstatPagament } from '../tipus'
import { useCarret } from '../useCarret'

export default function Resultat() {
  const [parametres] = useSearchParams()
  const longId = parametres.get('longId')
  const [confirmat, setConfirmat] = useState<EstatPagament | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { buidar } = useCarret()

  useEffect(() => {
    if (!longId) return
    consultarPagament(longId)
      .then((estat) => {
        setConfirmat(estat)
        if (estat.estat === 'charged') buidar() // només buidem el carret si està pagat DE DEBÒ
      })
      .catch((e: Error) => setError(e.message))
  }, [longId, buidar])

  if (!longId) {
    return (
      <p>
        Falta el paràmetre <code>longId</code> a l'adreça. <Link to="/">Torna a la botiga</Link>
      </p>
    )
  }

  return (
    <section className="resultat">
      <h1>{confirmat?.estat === 'charged' ? '✅ Gràcies per la compra!' : 'Resultat del pagament'}</h1>

      <div className="dues-columnes">
        <div className="panell">
          <h2>El que diu l'adreça</h2>
          <p className="nota">Informatiu: ho podria haver canviat qualsevol.</p>
          <dl>
            {[...parametres.entries()].map(([clau, valor]) => (
              <div key={clau}>
                <dt>{clau}</dt>
                <dd>{valor}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="panell confirmat">
          <h2>El que confirma el servidor</h2>
          <p className="nota">Consultat a Payoneer amb GET /lists/{'{longId}'}.</p>
          {error && <p className="error">{error}</p>}
          {!confirmat && !error && <p>Comprovant…</p>}
          {confirmat && (
            <dl>
              <div>
                <dt>Estat</dt>
                <dd>
                  <EtiquetaEstat codi={confirmat.estat} />
                </dd>
              </div>
              <div>
                <dt>Comanda</dt>
                <dd>{confirmat.transactionId}</dd>
              </div>
              <div>
                <dt>Import</dt>
                <dd>{confirmat.total?.toFixed(2)} €</dd>
              </div>
            </dl>
          )}
        </div>
      </div>

      <p>
        <Link to="/">← Torna a la botiga</Link> · <Link to="/notificacions">Mira les notificacions</Link>
      </p>
    </section>
  )
}
