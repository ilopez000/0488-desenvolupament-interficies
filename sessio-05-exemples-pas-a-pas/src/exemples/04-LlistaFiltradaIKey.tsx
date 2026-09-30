import { useState } from 'react';

// EXEMPLE 4 · Llistes filtrades i la propietat key

type Producte = { id: number; nom: string; categoria: 'Perifèrics' | 'Àudio' | 'Pantalles' };

const PRODUCTES: Producte[] = [
  { id: 1, nom: 'Teclat mecànic', categoria: 'Perifèrics' },
  { id: 2, nom: 'Ratolí sense fil', categoria: 'Perifèrics' },
  { id: 3, nom: 'Auriculars de diadema', categoria: 'Àudio' },
  { id: 4, nom: 'Altaveu Bluetooth', categoria: 'Àudio' },
  { id: 5, nom: 'Monitor 27 polzades', categoria: 'Pantalles' },
];

// ---------- Part A: filtrar ----------
function Cercador() {
  // L'únic estat és el que escriu l'usuari. La llista filtrada NO és estat:
  // es calcula a cada dibuixat a partir del text. Això se'n diu estat derivat.
  const [cerca, setCerca] = useState('');
  const [categoria, setCategoria] = useState('Totes');

  const visibles = PRODUCTES.filter(
    (producte) =>
      producte.nom.toLowerCase().includes(cerca.toLowerCase()) &&
      (categoria === 'Totes' || producte.categoria === categoria),
  );

  return (
    <div className="caixa">
      <h3>A · Filtrar amb filter i pintar amb map</h3>
      <div className="botons">
        <input
          type="search"
          placeholder="Cerca un producte"
          value={cerca}
          onChange={(esdeveniment) => setCerca(esdeveniment.target.value)}
        />
        <select value={categoria} onChange={(esdeveniment) => setCategoria(esdeveniment.target.value)}>
          <option>Totes</option>
          <option>Perifèrics</option>
          <option>Àudio</option>
          <option>Pantalles</option>
        </select>
      </div>
      <p className="nota">
        {visibles.length} de {PRODUCTES.length} productes
      </p>
      {visibles.length === 0 ? (
        <p>No hi ha cap producte que coincideixi.</p>
      ) : (
        <ul>
          {/* key: un identificador únic i estable de cada element (l'id, no la posició). */}
          {visibles.map((producte) => (
            <li key={producte.id}>
              {producte.nom} <span className="etiqueta">{producte.categoria}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ---------- Part B: per què la key ha de ser l'id ----------
// Cada fila té un camp de text NO controlat (el valor el guarda el navegador, no React).
// Així es veu a quina fila «enganxa» React cada camp quan la llista canvia.
function Fila({ producte, onTreure }: { producte: Producte; onTreure: () => void }) {
  return (
    <li className="fila">
      <span>{producte.nom}</span>
      <input type="text" placeholder="Nota per a aquest producte" />
      <button className="secundari" onClick={onTreure}>Treu</button>
    </li>
  );
}

function LlistaAmbKey({ usaIndex }: { usaIndex: boolean }) {
  const [llista, setLlista] = useState(PRODUCTES.slice(0, 3));

  function treu(id: number) {
    setLlista(llista.filter((producte) => producte.id !== id));
  }

  return (
    <div className={usaIndex ? 'caixa malament' : 'caixa be'}>
      <h3>{usaIndex ? 'key={index} (malament)' : 'key={producte.id} (bé)'}</h3>
      <ul className="sense-punts">
        {llista.map((producte, index) => (
          <Fila
            key={usaIndex ? index : producte.id}
            producte={producte}
            onTreure={() => treu(producte.id)}
          />
        ))}
      </ul>
      <button className="secundari" onClick={() => setLlista(PRODUCTES.slice(0, 3))}>Reinicia</button>
    </div>
  );
}

export default function LlistaFiltradaIKey() {
  return (
    <>
      <h1>4 · Llistes filtrades i la propietat key</h1>
      <p className="subtitol">
        La llista que es veu es calcula a partir de l'estat; la key diu a React quin element és quin.
      </p>
      <Cercador />
      <div className="caixa">
        <h3>B · La prova de la key</h3>
        <p>
          A les dues llistes, escriu una nota al <strong>primer</strong> producte i després treu-lo.
          Amb l'índex com a key, la nota es queda a la primera posició i passa a un producte que no
          és el seu. Amb l'id, desapareix amb el producte.
        </p>
        <div className="dues-columnes">
          <LlistaAmbKey usaIndex={true} />
          <LlistaAmbKey usaIndex={false} />
        </div>
      </div>
    </>
  );
}
