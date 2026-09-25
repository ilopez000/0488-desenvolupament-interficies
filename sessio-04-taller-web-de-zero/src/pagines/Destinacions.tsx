import { useState } from 'react';
import { destinacions } from '../dades/destinacions';
import TargetaDestinacio from '../components/TargetaDestinacio';
import estils from './Destinacions.module.css';

export default function Destinacions() {
  // useState guarda el text del cercador. Cada tecla el torna a dibuixar.
  const [cerca, setCerca] = useState('');

  // Filtrem en minúscules perquè no distingeixi majúscules ni accents de més.
  const visibles = destinacions.filter((d) =>
    (d.nom + ' ' + d.pais).toLowerCase().includes(cerca.toLowerCase()),
  );

  return (
    <>
      <h1>Destinacions</h1>

      <input
        className={estils.cercador}
        placeholder="Cerca per ciutat o país"
        value={cerca}
        onChange={(e) => setCerca(e.target.value)}
      />

      <div className={estils.graella}>
        {visibles.map((d) => (
          <TargetaDestinacio key={d.id} destinacio={d} />
        ))}
      </div>

      {visibles.length === 0 && (
        <p className={estils.buit}>Cap destinació coincideix amb «{cerca}».</p>
      )}
    </>
  );
}
