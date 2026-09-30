import { useState } from 'react';

// EXEMPLE 6 · Aixecar l'estat al pare comú
// Dos components germans necessiten la mateixa dada: la llista de productes la canvia
// i el resum la mostra. Un germà no pot passar res a l'altre directament.
// Solució: l'estat puja al pare de tots dos.
//   · les DADES baixen com a propietats
//   · les ACCIONS baixen com a funcions

type Producte = { id: number; nom: string; preu: number };

const PRODUCTES: Producte[] = [
  { id: 1, nom: 'Teclat mecànic', preu: 59.9 },
  { id: 2, nom: 'Ratolí sense fil', preu: 24.5 },
  { id: 3, nom: 'Auriculars de diadema', preu: 39 },
];

// Germà 1: no té estat propi. Rep què ha de pintar i a qui avisar.
function LlistaProductes({
  preferits,
  onCommutar,
}: {
  preferits: number[];
  onCommutar: (id: number) => void;
}) {
  return (
    <div className="caixa">
      <h3>LlistaProductes</h3>
      <ul className="sense-punts">
        {PRODUCTES.map((producte) => {
          const marcat = preferits.includes(producte.id);
          return (
            <li key={producte.id} className="fila">
              <span>{producte.nom}</span>
              <button className={marcat ? '' : 'secundari'} onClick={() => onCommutar(producte.id)}>
                {marcat ? '★ Preferit' : '☆ Marca com a preferit'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// Germà 2: tampoc té estat. Només mostra el que rep.
function ResumPreferits({ preferits, onBuidar }: { preferits: number[]; onBuidar: () => void }) {
  const triats = PRODUCTES.filter((producte) => preferits.includes(producte.id));
  const total = triats.reduce((suma, producte) => suma + producte.preu, 0);

  return (
    <div className="caixa">
      <h3>
        ResumPreferits <span className="globus">{preferits.length}</span>
      </h3>
      {triats.length === 0 ? (
        <p className="nota">Encara no has marcat cap preferit.</p>
      ) : (
        <>
          <ul>
            {triats.map((producte) => (
              <li key={producte.id}>{producte.nom}</li>
            ))}
          </ul>
          <p>Valor total: {total.toFixed(2)} €</p>
          <button className="secundari" onClick={onBuidar}>Buida els preferits</button>
        </>
      )}
    </div>
  );
}

// El pare comú: aquí viu l'estat i aquí es defineix com canvia.
export default function AixecarEstat() {
  const [preferits, setPreferits] = useState<number[]>([]);

  function commuta(id: number) {
    setPreferits((anterior) =>
      anterior.includes(id) ? anterior.filter((altre) => altre !== id) : [...anterior, id],
    );
  }

  return (
    <>
      <h1>6 · Aixecar l'estat al pare comú</h1>
      <p className="subtitol">
        Una sola font de veritat: la llista de preferits viu al pare i els dos fills la comparteixen.
      </p>
      <div className="dues-columnes">
        <LlistaProductes preferits={preferits} onCommutar={commuta} />
        <ResumPreferits preferits={preferits} onBuidar={() => setPreferits([])} />
      </div>
      <p className="nota">
        A PratShop és el mateix patró: el carro viu a <code>App</code>, el catàleg hi afegeix productes
        i la capçalera en mostra el recompte.
      </p>
    </>
  );
}
