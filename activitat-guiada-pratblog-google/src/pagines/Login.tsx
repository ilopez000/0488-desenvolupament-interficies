// Pàgina /login: el botó de Google connectat a la sessió
// ------------------------------------------------------------
import { useState } from 'react'
import { Navigate, useLocation } from 'react-router'
import { useSessio } from '../auth/useSessio.ts'

export function Login() {
  const { sessio, iniciaSessio } = useSessio()
  const ubicacio = useLocation()
  const [error, setError] = useState<string | null>(null)

  // RutaAdmin ens envia aquí amb state.desDe = la pàgina que es volia veure.
  // Si s'ha arribat directament a /login, després anirem a /admin.
  const desDe = (ubicacio.state as { desDe?: string } | null)?.desDe ?? '/admin'

  // Quan ja hi ha sessió, no cal fer login: tornem on es volia anar.
  // (Això és el que ens «redirigeix» just després del TODO 10.)
  if (sessio) return <Navigate to={desDe} replace />

  return (
    <section className="targeta centrada">
      <h1>Accés a l’administració</h1>
      <p>Entra amb el teu compte de Google. Només els administradors podran gestionar els articles.</p>

      {/*
        TODO 10 · Posa aquí el botó <GoogleLogin />:
          - onSuccess: rep una resposta; crida iniciaSessio(resposta.credential ?? '')
            dins d'un try/catch i, si falla, desa un missatge a setError
          - onError: desa un missatge d'error a setError
        Props visuals recomanades: text="signin_with" shape="pill" size="large"
      */}
      <p className="pendent">Aquí hi anirà el botó «Inicia la sessió amb Google» (TODO 10).</p>

      {error && <p className="error">{error}</p>}
    </section>
  )
}
