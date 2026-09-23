// Catàleg: llista de productes amb un cercador que viu a la URL.
import { Link, useSearchParams } from 'react-router';
import { productes } from '../dades/productes';

export default function Cataleg() {
  // useSearchParams llegeix i escriu la part de la URL que va després de "?".
  // Exemple: /cataleg?cerca=tassa
  const [parametres, setParametres] = useSearchParams();

  // Si encara no hi ha "?cerca=", get() retorna null: el convertim en text buit.
  const cerca = parametres.get('cerca') ?? '';

  // Filtrem en minúscules perquè la cerca no distingeixi majúscules.
  const visibles = productes.filter((p) => p.nom.toLowerCase().includes(cerca.toLowerCase()));

  return (
    <section>
      <h1>Catàleg</h1>

      <input
        className="camp"
        placeholder="Cerca un producte"
        value={cerca}
        // Cada tecla escriu el valor a la URL. Així el resultat de la cerca
        // es pot compartir i el botó "enrere" del navegador hi funciona.
        onChange={(e) => setParametres(e.target.value ? { cerca: e.target.value } : {})}
      />

      <ul className="llista">
        {visibles.map((p) => (
          <li key={p.id}>
            {/* Construïm la URL amb l'id del producte: /producte/2 */}
            <Link to={`/producte/${p.id}`}>{p.nom}</Link> — {p.preu.toFixed(2)} €
          </li>
        ))}
      </ul>

      {visibles.length === 0 && <p>Cap producte coincideix amb «{cerca}».</p>}
    </section>
  );
}
