import { Link } from 'react-router';

export default function NoTrobada() {
  return (
    <main>
      <h1>Pàgina no trobada</h1>
      <p className="subtitol">L'adreça que has escrit no existeix a PratShop.</p>
      <Link to="/">Torna al catàleg</Link>
    </main>
  );
}
