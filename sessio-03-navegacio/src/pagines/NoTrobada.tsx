// Pàgina 404: es mostra quan cap ruta coincideix amb la URL.
import { Link } from 'react-router';

export default function NoTrobada() {
  return (
    <section>
      <h1>404 · Pàgina no trobada</h1>
      <p>L'adreça que has escrit no existeix a PratShop.</p>
      <Link to="/" className="boto">Torna a l'inici</Link>
    </section>
  );
}
