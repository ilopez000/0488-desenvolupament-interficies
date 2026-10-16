import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';

type Pokemon = {
  id: number;
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
};

export function PokedexAmbUseFetch() {
  const [id, setId] = useState(1);
  const { dades, carregant, error } = useFetch<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);

  return (
    <div className="targeta">
      <div className="fila">
        <button onClick={() => setId(id - 1)} disabled={id === 1}>
          ← Anterior
        </button>
        <span>Número {id}</span>
        <button onClick={() => setId(id + 1)}>Següent →</button>
      </div>

      {carregant && <p>Carregant…</p>}
      {error && <p className="error">{error}</p>}

      {dades && !carregant && (
        <div className="fitxa">
          <img src={dades.sprites.front_default} alt={dades.name} />
          <div>
            <h3>{dades.name}</h3>
            <p>Tipus: {dades.types.map((t) => t.type.name).join(', ')}</p>
          </div>
        </div>
      )}
    </div>
  );
}
