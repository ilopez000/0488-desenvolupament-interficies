// Disposició (layout) comuna a totes les pàgines: capçalera, contingut i peu.
// L'única part que canvia en navegar és <Outlet />.
import { Outlet } from 'react-router';
import Capcalera from './Capcalera';

export default function Disposicio() {
  return (
    <div className="pagina">
      <Capcalera />
      <main className="contingut">
        {/* Aquí React Router dibuixa la pàgina filla que coincideix amb la URL */}
        <Outlet />
      </main>
      <footer className="peu">PratShop · DAM2 · Prat FP</footer>
    </div>
  );
}
