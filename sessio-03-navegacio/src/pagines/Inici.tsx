// Pàgina d'inici. Una pàgina no és res especial: és un component normal
// que hem decidit associar a una URL dins de <Routes>.
import { Link } from 'react-router';

export default function Inici() {
  return (
    <section>
      <h1>Benvingut a PratShop</h1>
      <p>Una botiga d'exemple per aprendre a navegar entre pàgines amb React Router.</p>
      {/* Link genera un <a>, però no recarrega la pàgina: canvia la URL i React redibuixa */}
      <Link to="/cataleg" className="boto">Vés al catàleg</Link>
    </section>
  );
}
