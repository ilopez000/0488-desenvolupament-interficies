import { Link } from 'react-router';
import type { Destinacio } from '../dades/destinacions';
import estils from './TargetaDestinacio.module.css';

// Aquest component rep una destinació i la dibuixa.
// Fixa't que no sap res de la llista: només de la fitxa que li donen.
type Props = { destinacio: Destinacio };

export default function TargetaDestinacio({ destinacio }: Props) {
  return (
    <article className={estils.targeta}>
      <h2 className={estils.titol}>{destinacio.nom}</h2>
      <span className={estils.pais}>{destinacio.pais}</span>
      <p>{destinacio.resum}</p>
      <span className={estils.preu}>{destinacio.preu} € / persona</span>

      {/* La URL es construeix amb l'id: /destinacions/2 */}
      <Link to={`/destinacions/${destinacio.id}`} className={estils.enllac}>
        Veure el viatge →
      </Link>
    </article>
  );
}
