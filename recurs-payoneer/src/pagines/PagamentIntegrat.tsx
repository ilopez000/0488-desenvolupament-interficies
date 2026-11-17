// EXEMPLE 2 · Formulari integrat (EMBEDDED): el client paga sense sortir de la nostra web.
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { crearPagament } from '../api'
import FormulariSandbox from '../payoneer/FormulariSandbox'
import FormulariSimulat from '../payoneer/FormulariSimulat'
import type { PagamentCreat } from '../tipus'
import { useCarret } from '../useCarret'
import { useMode } from '../useMode'

export default function PagamentIntegrat() {
  const mode = useMode()
  const { linies } = useCarret()
  const navigate = useNavigate()
  const client = (useLocation().state as { nom?: string; email?: string } | null) ?? {}
  const [pagament, setPagament] = useState<PagamentCreat | null>(null)
  const [error, setError] = useState<string | null>(null)
  const jaDemanat = useRef(false)

  // 1. En entrar a la pàgina, el servidor crea una sessió EMBEDDED (una sola vegada)
  useEffect(() => {
    if (jaDemanat.current || linies.length === 0) return
    jaDemanat.current = true
    crearPagament({
      linies,
      nom: client.nom ?? 'Alumne de DAM',
      email: client.email ?? 'alumne@pratfp.com',
      integracio: 'EMBEDDED',
    })
      .then(setPagament)
      .catch((e: Error) => setError(e.message))
  }, [linies, client.nom, client.email])

  // 3. Quan el formulari diu que s'ha pagat, anem a la pàgina de resultat (que ho comprovarà)
  function enAcabar() {
    if (!pagament) return
    navigate(`/pagament/resultat?longId=${encodeURIComponent(pagament.longId)}&transactionId=${pagament.transactionId}`)
  }

  if (linies.length === 0) {
    return (
      <p>
        El carret és buit. <Link to="/">Torna a la botiga</Link>
      </p>
    )
  }

  return (
    <section className="integrat">
      <h1>Pagament integrat</h1>
      {pagament && <p>Total a pagar: {pagament.total.toFixed(2)} €</p>}
      {error && <p className="error">{error}</p>}
      {!pagament && !error && <p>Preparant el formulari de pagament…</p>}

      {/* 2. El formulari de targeta: el de Payoneer (sandbox) o el del simulador */}
      {pagament && mode === 'sandbox' && (
        <FormulariSandbox longId={pagament.longId} enPagar={enAcabar} enError={setError} />
      )}
      {pagament && mode === 'simulacio' && (
        <FormulariSimulat longId={pagament.longId} enPagar={enAcabar} enError={setError} />
      )}

      <p>
        <Link to="/">← Torna a la botiga</Link>
      </p>
    </section>
  )
}
