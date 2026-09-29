import { useState } from 'react';
import TargetaProducte from '../components/TargetaProducte';
import { productes } from '../dades/productes';
import type { Categoria, Producte } from '../tipus';

type Props = {
  onAfegir: (producte: Producte) => void;
};

export default function Cataleg({ onAfegir }: Props) {
  // Dos estats: el text del cercador i la categoria triada.
  const [text, setText] = useState('');
  const [categoria, setCategoria] = useState<Categoria | 'totes'>('totes');

  // La llista visible NO és estat: es calcula a cada dibuixat a partir de les dades i del filtre.
  const cerca = text.trim().toLowerCase();
  const visibles = productes.filter((producte) => {
    const perNom = producte.nom.toLowerCase().includes(cerca);
    const perCategoria = categoria === 'totes' || producte.categoria === categoria;
    return perNom && perCategoria;
  });

  return (
    <main>
      <h1>Catàleg</h1>
      <p className="subtitol">
        {visibles.length} de {productes.length} productes
      </p>

      <div className="filtres">
        <input
          type="text"
          placeholder="Cerca un producte…"
          aria-label="Cerca"
          value={text}
          onChange={(esdeveniment) => setText(esdeveniment.target.value)}
        />
        <select
          aria-label="Categoria"
          value={categoria}
          onChange={(esdeveniment) => setCategoria(esdeveniment.target.value as Categoria | 'totes')}
        >
          <option value="totes">Totes les categories</option>
          <option value="perifèrics">Perifèrics</option>
          <option value="components">Components</option>
          <option value="accessoris">Accessoris</option>
        </select>
      </div>

      {visibles.length === 0 ? (
        <p className="buit">Cap producte coincideix amb «{text}».</p>
      ) : (
        <div className="graella">
          {visibles.map((producte) => (
            // La key és l'id de la dada, mai l'índex del bucle.
            <TargetaProducte key={producte.id} producte={producte} onAfegir={onAfegir} />
          ))}
        </div>
      )}
    </main>
  );
}
