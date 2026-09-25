import { Outlet } from 'react-router';
import Capcalera from './Capcalera';
import Peu from './Peu';

// La disposició és el marc que comparteixen totes les pàgines.
// L'única part que canvia en navegar és l'<Outlet />.
export default function Disposicio() {
  return (
    <>
      <Capcalera />
      <main className="contenidor">
        <Outlet />
      </main>
      <Peu />
    </>
  );
}
