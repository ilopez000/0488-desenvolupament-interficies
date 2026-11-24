import { useEffect, useState } from 'react'

type Resultat = { pagat: boolean; import: number; correu: string | null }

// Què ens diu la URL quan Stripe ens torna el client
const parametres = new URLSearchParams(window.location.search)
const idSessio = parametres.get('session_id')
const cancelat = parametres.has('cancelat')

const euros = (centims: number) =>
  new Intl.NumberFormat('ca-ES', { style: 'currency', currency: 'EUR' })
    .format(centims / 100)

export default function App() {
  const [resultat, setResultat] = useState<Resultat | null>(null)
  const [error, setError] = useState('')
  const [esperant, setEsperant] = useState(false)

  // Si tornem de Stripe, preguntem al NOSTRE servidor si s'ha pagat de debò
  useEffect(() => {
    if (!idSessio) return
    fetch(`/api/sessio/${idSessio}`)
      .then((resposta) => resposta.json())
      .then((dades) => (dades.error ? setError(dades.error) : setResultat(dades)))
      .catch(() => setError('No puc parlar amb el servidor'))
  }, [])

  async function pagar() {
    setEsperant(true)
    setError('')
    try {
      const resposta = await fetch('/api/pagar', { method: 'POST' })
      const dades = await resposta.json()
      if (dades.url) {
        window.location.href = dades.url // anem a la pàgina de pagament de Stripe
        return
      }
      setError(dades.error)
    } catch {
      setError('No puc parlar amb el servidor. Està engegat?')
    }
    setEsperant(false)
  }

  // Pantalla de resultat (hi arribem des de success_url)
  if (idSessio) {
    return (
      <main>
        <h1>Resultat del pagament</h1>
        {error && <p className="error">{error}</p>}
        {!error && !resultat && <p>Comprovant el pagament…</p>}
        {resultat?.pagat && (
          <p className="ok">
            Pagament confirmat: {euros(resultat.import)}
            {resultat.correu && <> · rebut a {resultat.correu}</>}
          </p>
        )}
        {resultat && !resultat.pagat && <p className="error">El pagament no s'ha completat.</p>}
        <a href="/">Tornar a la botiga</a>
      </main>
    )
  }

  // Pantalla de la botiga
  return (
    <main>
      <h1>Botiga DAM2</h1>
      {cancelat && <p className="avis">Has cancel·lat el pagament. No s'ha cobrat res.</p>}
      <article>
        <h2>Samarreta DAM2</h2>
        <p className="preu">15,00 €</p>
        <button onClick={pagar} disabled={esperant}>
          {esperant ? 'Un moment…' : 'Pagar amb Stripe'}
        </button>
      </article>
      {error && <p className="error">{error}</p>}
      <p className="pista">Targeta de proves: 4242 4242 4242 4242 · data futura · qualsevol CVC</p>
    </main>
  )
}
