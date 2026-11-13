// Capçalera: menú + qui hi ha connectat + botó de sortir
// ------------------------------------------------------------
import { startTransition } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { useSessio } from '../auth/useSessio.ts'
import { Avatar } from './Avatar.tsx'

export function Capcalera() {
  const { sessio, esAdmin, tancaSessio } = useSessio()
  const navega = useNavigate()

  // Tancar sessió i tornar a la portada en un sol repintat. Si no, si
  // érem a /admin, RutaAdmin veuria la sessió buida abans del canvi de
  // ruta i ens enviaria a /login en comptes de /.
  function surt() {
    startTransition(() => {
      tancaSessio()
      navega('/')
    })
  }

  return (
    <header className="capcalera">
      <NavLink to="/" className="logo">
        📝 PratBlog
      </NavLink>

      <nav className="menu">
        <NavLink to="/" end>
          Articles
        </NavLink>
        <NavLink to="/admin">Administració</NavLink>
      </nav>

      {/*
        TODO 12 · Si hi ha sessió, mostra:
          <Avatar usuari={sessio.usuari} />, el nom de l'usuari,
          una etiqueta «Admin» si esAdmin és true, i un botó «Surt»
          que cridi la funció surt().
        Si no n'hi ha, mostra l'enllaç «Inicia la sessió» que ja hi ha.
      */}
      <div className="usuari">
        <NavLink to="/login" className="boto">
          Inicia la sessió
        </NavLink>
      </div>
    </header>
  )
}
