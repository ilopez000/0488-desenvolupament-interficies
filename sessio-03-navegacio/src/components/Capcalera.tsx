// Capçalera amb el menú de navegació.
// Fem servir NavLink (i no Link) perquè NavLink sap quina ruta està activa.
import { NavLink } from 'react-router';

export default function Capcalera() {
  // NavLink passa a className una funció amb { isActive }.
  // Retornem el nom de classe CSS que toca en cada cas.
  const classe = ({ isActive }: { isActive: boolean }) => (isActive ? 'enllac actiu' : 'enllac');

  return (
    <header className="capcalera">
      <span className="marca">PratShop</span>
      <nav>
        {/* "end" evita que "/" surti com a actiu a totes les pàgines:
            sense "end", la ruta "/" es considera activa per a "/cataleg" també. */}
        <NavLink to="/" end className={classe}>Inici</NavLink>
        <NavLink to="/cataleg" className={classe}>Catàleg</NavLink>
        <NavLink to="/contacte" className={classe}>Contacte</NavLink>
      </nav>
    </header>
  );
}
