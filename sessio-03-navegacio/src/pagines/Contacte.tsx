// Formulari molt senzill que, en enviar-se, porta l'usuari a una altra pàgina.
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function Contacte() {
  const [nom, setNom] = useState('');
  const navega = useNavigate();

  return (
    <section>
      <h1>Contacte</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();        // evitem que el navegador recarregui la pàgina
          navega('/', { replace: false }); // navegació programada: tornem a l'inici
        }}
      >
        <input className="camp" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="El teu nom" />
        <button className="boto" type="submit">Envia</button>
      </form>
    </section>
  );
}
