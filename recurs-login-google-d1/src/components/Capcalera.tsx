import { NavLink } from 'react-router'
import { useSessio } from '../sessio/useSessio'

export default function Capcalera() {
  const { sessio, tancaSessio } = useSessio()
  const usuari = sessio?.usuari

  return (
    // El color preferit de l'usuari (guardat a la BD) pinta la capçalera
    <header className="capcalera" style={{ borderBottomColor: usuari?.color ?? 'transparent' }}>
      <NavLink to="/" className="marca">
        🔐 PratPerfil
      </NavLink>
      {usuari && (
        <>
          <nav>
            <NavLink to="/perfil">El meu perfil</NavLink>
            <NavLink to="/usuaris">Usuaris</NavLink>
          </nav>
          <span className="qui">
            {usuari.foto && <img src={usuari.foto} alt="" referrerPolicy="no-referrer" />}
            {usuari.alies}
          </span>
          <button onClick={tancaSessio}>Surt</button>
        </>
      )}
    </header>
  )
}
