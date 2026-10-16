import { useState } from 'react';

// Només els camps que pintarem (la resposta real en té centenars)
type Pokemon = {
  id: number;
  name: string;
  height: number; // en decímetres
  weight: number; // en hectograms
  sprites: { front_default: string };
  types: { type: { name: string } }[];
};

export function CercadorPokemon() {
  const [nom, setNom] = useState('pikachu');
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [carregant, setCarregant] = useState(false);
  const [error, setError] = useState('');

  async function cercar() {
    setCarregant(true);
    setError('');
    setPokemon(null);

    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${nom.trim().toLowerCase()}`;
      const resposta = await fetch(url);

      if (!resposta.ok) {
        throw new Error(`No hi ha cap Pokémon que es digui «${nom}» (error ${resposta.status})`);
      }

      const dades: Pokemon = await resposta.json();
      setPokemon(dades);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconegut');
    } finally {
      setCarregant(false);
    }
  }

  return (
    <div className="targeta">
      <form
        className="fila"
        onSubmit={(e) => {
          e.preventDefault();
          cercar();
        }}
      >
        <input value={nom} onChange={(e) => setNom(e.target.value)} aria-label="Nom del Pokémon" />
        <button type="submit" disabled={carregant}>
          Cerca
        </button>
      </form>

      {carregant && <p>Carregant…</p>}
      {error && <p className="error">{error}</p>}

      {pokemon && (
        <div className="fitxa">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <div>
            <h3>
              #{pokemon.id} · {pokemon.name}
            </h3>
            <p>Tipus: {pokemon.types.map((t) => t.type.name).join(', ')}</p>
            <p>
              Alçada: {pokemon.height / 10} m · Pes: {pokemon.weight / 10} kg
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
