import { Navigate, useNavigate, useParams } from 'react-router';
import { buscaDestinacio } from '../dades/destinacions';
import Boto from '../components/Boto';
import estils from './DetallDestinacio.module.css';

export default function DetallDestinacio() {
  // useParams llegeix el tros variable de la ruta "/destinacions/:id".
  // Sempre arriba com a text, encara que sigui un número.
  const { id } = useParams();
  const navega = useNavigate();

  const destinacio = buscaDestinacio(Number(id));

  // Si l'id no existeix (per exemple /destinacions/99) anem a la pàgina 404.
  if (!destinacio) return <Navigate to="/no-trobada" replace />;

  return (
    <article className={estils.fitxa}>
      <h1>{destinacio.nom}</h1>
      <span className={estils.pais}>{destinacio.pais}</span>
      <p>{destinacio.descripcio}</p>
      <span className={estils.preu}>{destinacio.preu} € / persona</span>

      <div className={estils.accions}>
        <Boto onClick={() => alert('Reserva feta! (exemple)')}>Reserva</Boto>
        {/* navega(-1) fa el mateix que el botó "enrere" del navegador */}
        <Boto variant="secundari" onClick={() => navega(-1)}>
          Torna
        </Boto>
      </div>
    </article>
  );
}
