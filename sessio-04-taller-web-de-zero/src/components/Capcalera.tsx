import { NavLink } from 'react-router';
import estils from './Capcalera.module.css';

export default function Capcalera() {
  // NavLink crida aquesta funció cada cop que canvia la URL i li passa { isActive }.
  // Nosaltres decidim quines classes posa l'enllaç en cada cas.
  const classes = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${estils.enllac} ${estils.actiu}` : estils.enllac;

  return (
    <header className={estils.barra}>
      <NavLink to="/" className={estils.marca}>
        PratViatges
      </NavLink>

      <nav className={estils.menu}>
        {/* "end" evita que l'enllaç d'inici surti actiu a totes les pàgines */}
        <NavLink to="/" end className={classes}>
          Inici
        </NavLink>
        <NavLink to="/destinacions" className={classes}>
          Destinacions
        </NavLink>
        <NavLink to="/sobre" className={classes}>
          Qui som
        </NavLink>
        <NavLink to="/contacte" className={classes}>
          Contacte
        </NavLink>
      </nav>
    </header>
  );
}
