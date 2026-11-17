import { NavLink } from 'react-router'
import { useMode } from '../useMode'

export default function Capcalera() {
  const mode = useMode()
  return (
    <header className="capcalera">
      <NavLink to="/" className="marca">
        🛍️ PratMerch
      </NavLink>
      <nav>
        <NavLink to="/">Botiga</NavLink>
        <NavLink to="/notificacions">Notificacions</NavLink>
      </nav>
      {mode && (
        <span className={`mode mode-${mode}`} title="Es canvia amb PAYONEER_MODE al fitxer .env">
          {mode === 'simulacio' ? 'Mode simulació' : 'Payoneer sandbox'}
        </span>
      )}
    </header>
  )
}
