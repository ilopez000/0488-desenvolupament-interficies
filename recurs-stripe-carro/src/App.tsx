import { useEffect, useState } from 'react'
import { Carro } from './components/Carro'
import { PantallaResultat } from './components/PantallaResultat'
import { TargetaProducte } from './components/TargetaProducte'
import type { Producte } from './tipus'
import { useCarro } from './useCarro'
import { forat } from './forat'

// Què ens diu la URL quan Stripe ens torna el client
const parametres = new URLSearchParams(window.location.search)
const idSessio = parametres.get('session_id')
const cancelat = parametres.has('cancelat')

export default function App() {
  const carro = useCarro()
  const [productes, setProductes] = useState<Producte[]>([])
  const [error, setError] = useState('')
  const [esperant, setEsperant] = useState(false)

  // En arrencar, demanem el catàleg (noms i preus) al NOSTRE servidor
  useEffect(() => {
    // ✏️ FORAT 20 · Fes la petició GET a /api/productes i converteix la resposta a JSON
    forat(20)
      .then((dades: Producte[] | { error: string }) => ('error' in dades ? setError(dades.error) : setProductes(dades)))
      .catch(() => setError('No puc parlar amb el servidor. Està engegat?'))
  }, [])

  async function pagar() {
    setEsperant(true)
    setError('')
    try {
      const resposta = await fetch('/api/pagar', {
        method: 'POST',
        // ✏️ FORAT 23 · Digues al servidor que li envies JSON i envia-li les línies del carro com a { linies: [...] }
        ...forat(23)
      })
      const dades = await resposta.json()
      if (dades.url) {
        // ✏️ FORAT 24 · Envia el navegador a la pàgina de pagament de Stripe (és a dades.url)
        forat(24)
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
      <main className="estreta">
        <PantallaResultat idSessio={idSessio} onPagat={carro.buidar} />
      </main>
    )
  }

  const unitatsDe = (id: string) => carro.linies.find((l) => l.id === id)?.quantitat ?? 0

  // Pantalla de la botiga
  return (
    <main>
      <header className="capcalera">
        <h1>Botiga DAM2</h1>
        <span className="insignia" aria-label={`${carro.unitats} articles al carro`}>
          🛒 {carro.unitats}
        </span>
      </header>

      {cancelat && (
        <p className="avis">Has cancel·lat el pagament. No s'ha cobrat res i el carro continua aquí.</p>
      )}
      {error && <p className="error">{error}</p>}

      <div className="disposicio">
        <section className="cataleg" aria-label="Catàleg">
          {productes.map((producte) => (
            <TargetaProducte
              key={producte.id}
              producte={producte}
              unitatsAlCarro={unitatsDe(producte.id)}
              onAfegir={carro.afegir}
            />
          ))}
        </section>

        <Carro
          linies={carro.linies}
          productes={productes}
          esperant={esperant}
          onAfegir={carro.afegir}
          onTreure={carro.treure}
          onEliminar={carro.eliminar}
          onBuidar={carro.buidar}
          onPagar={pagar}
        />
      </div>

      <p className="pista">Targeta de proves: 4242 4242 4242 4242 · data futura · qualsevol CVC</p>
    </main>
  )
}
