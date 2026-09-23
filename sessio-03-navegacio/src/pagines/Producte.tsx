// Fitxa d'un producte. La URL porta l'id: /producte/3
import { useNavigate, useParams, Navigate } from 'react-router';
import { buscaProducte } from '../dades/productes';

export default function Producte() {
  // useParams retorna els trossos variables de la ruta declarada com "/producte/:id".
  // Sempre arriben com a text, encara que siguin números.
  const { id } = useParams();

  // useNavigate serveix per navegar des de codi (un botó, després d'un formulari...).
  const navega = useNavigate();

  const producte = buscaProducte(Number(id));

  // Si l'id no existeix, redirigim a la pàgina de no trobada.
  // "replace" evita que la fitxa inexistent quedi a l'historial.
  if (!producte) return <Navigate to="/no-trobada" replace />;

  return (
    <section>
      <h1>{producte.nom}</h1>
      <p>{producte.descripcio}</p>
      <p className="preu">{producte.preu.toFixed(2)} €</p>

      {/* navega(-1) fa el mateix que el botó "enrere" del navegador */}
      <button className="boto" onClick={() => navega(-1)}>Torna</button>
    </section>
  );
}
