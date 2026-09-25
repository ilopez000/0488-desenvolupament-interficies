import { Link } from 'react-router';

export default function NoTrobada() {
  return (
    <>
      <h1>404 · Pàgina no trobada</h1>
      <p>L'adreça que has escrit no existeix a PratViatges.</p>
      <Link to="/">Torna a l'inici</Link>
    </>
  );
}
