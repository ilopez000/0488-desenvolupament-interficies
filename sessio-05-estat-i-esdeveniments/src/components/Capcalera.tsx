import { NavLink } from 'react-router';

type Props = {
  unitatsAlCarro: number;
};

// La capçalera no sap res del carro: només rep un número i el mostra.
export default function Capcalera({ unitatsAlCarro }: Props) {
  const classes = ({ isActive }: { isActive: boolean }) => (isActive ? 'enllac actiu' : 'enllac');

  return (
    <header className="capcalera">
      <NavLink to="/" className="marca">
        PratShop
      </NavLink>

      <nav className="menu">
        <NavLink to="/" end className={classes}>
          Catàleg
        </NavLink>
        <NavLink to="/contacte" className={classes}>
          Contacte
        </NavLink>
        <NavLink to="/carro" className={classes}>
          Carro
          {/* Renderitzat condicional: el globus només surt si hi ha alguna unitat */}
          {unitatsAlCarro > 0 && <span className="globus">{unitatsAlCarro}</span>}
        </NavLink>
      </nav>
    </header>
  );
}
