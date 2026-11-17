import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { crearPagament, llegirProductes } from '../api'
import ResumCarret from '../components/ResumCarret'
import type { Producte } from '../tipus'
import { useCarret } from '../useCarret'

export default function Botiga() {
  const [productes, setProductes] = useState<Producte[]>([])
  const [nom, setNom] = useState('Alumne de DAM')
  const [email, setEmail] = useState('alumne@pratfp.com')
  const [enviant, setEnviant] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { linies, canviar, quantitat } = useCarret()

  useEffect(() => {
    llegirProductes()
      .then(setProductes)
      .catch(() => setError('No es pot parlar amb el servidor. Està engegat?'))
  }, [])

  // EXEMPLE 1 · Pàgina allotjada (HOSTED): demanem la sessió al servidor i hi enviem el client
  async function pagarAPaginaPayoneer() {
    setEnviant(true)
    setError(null)
    try {
      const pagament = await crearPagament({ linies, nom, email, integracio: 'HOSTED' })
      if (!pagament.redirectUrl) throw new Error('Payoneer no ha tornat cap adreça de pagament')
      window.location.assign(pagament.redirectUrl)
    } catch (e) {
      setError((e as Error).message)
      setEnviant(false)
    }
  }

  const carretBuit = linies.length === 0
  const dadesOk = nom.trim() !== '' && email.includes('@')

  return (
    <div className="botiga">
      <section>
        <h1>Botiga</h1>
        <ul className="productes">
          {productes.map((p) => (
            <li key={p.id} className="producte">
              <span className="emoji">{p.emoji}</span>
              <strong>{p.nom}</strong>
              <span>{p.preu.toFixed(2)} €</span>
              <div className="quantitat">
                <button onClick={() => canviar(p.id, -1)} aria-label={`Treu ${p.nom}`}>
                  −
                </button>
                <span>{quantitat(p.id)}</span>
                <button onClick={() => canviar(p.id, +1)} aria-label={`Afegeix ${p.nom}`}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <aside className="caixa">
        <h2>El teu carret</h2>
        <ResumCarret linies={linies} productes={productes} />

        <label>
          Nom
          <input value={nom} onChange={(e) => setNom(e.target.value)} />
        </label>
        <label>
          Correu
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <button className="principal" disabled={carretBuit || !dadesOk || enviant} onClick={pagarAPaginaPayoneer}>
          {enviant ? 'Connectant amb Payoneer…' : 'Exemple 1 · Paga a la pàgina de Payoneer'}
        </button>
        <Link
          className={`boto secundari ${carretBuit || !dadesOk ? 'desactivat' : ''}`}
          to="/pagament/integrat"
          state={{ nom, email }}
        >
          Exemple 2 · Paga sense sortir de la web
        </Link>

        {error && <p className="error">{error}</p>}
      </aside>
    </div>
  )
}
