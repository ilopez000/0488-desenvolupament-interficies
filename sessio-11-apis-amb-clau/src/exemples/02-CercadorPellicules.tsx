import { useState } from 'react';
import { AvisClau } from '../components/AvisClau';
import { TargetaPellicula } from '../components/TargetaPellicula';
import { TOKEN_TMDB } from '../config/claus';
import type { LlistaPellicules, Pellicula } from '../tipus';
import { missatgeError } from '../utils/missatgeError';

// EXEMPLE 2 · TMDB: el token viatja a la CAPÇALERA Authorization
export function CercadorPellicules() {
  const [text, setText] = useState('Dune');
  // null = encara no hem cercat · [] = hem cercat i no hi ha resultats
  const [pellicules, setPellicules] = useState<Pellicula[] | null>(null);
  const [carregant, setCarregant] = useState(false);
  const [error, setError] = useState('');

  if (!TOKEN_TMDB) {
    return <AvisClau variable="VITE_TMDB_TOKEN" web="https://www.themoviedb.org/settings/api" />;
  }

  async function cercar() {
    setCarregant(true);
    setError('');
    setPellicules(null);

    try {
      // A la URL només hi ha el que busquem: cap clau!
      const parametres = new URLSearchParams({
        query: text.trim(), // text que busquem
        language: 'es-ES', // títols en castellà (en català n'hi ha pocs)
        include_adult: 'false', // sense contingut per a adults
      });
      const url = `https://api.themoviedb.org/3/search/movie?${parametres}`;

      // fetch té un segon paràmetre opcional: les opcions de la petició.
      // Hi posem les capçaleres (headers). El token va a Authorization.
      const resposta = await fetch(url, {
        headers: {
          Authorization: `Bearer ${TOKEN_TMDB}`, // «Bearer» + UN espai + token
          accept: 'application/json', // volem la resposta en JSON
        },
      });

      if (!resposta.ok) throw new Error(missatgeError(resposta.status));

      const dades: LlistaPellicules = await resposta.json();
      setPellicules(dades.results.slice(0, 6)); // amb les 6 primeres n'hi ha prou
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
        <input value={text} onChange={(e) => setText(e.target.value)} aria-label="Títol de la pel·lícula" />
        <button type="submit" disabled={carregant || text.trim() === ''}>
          Cerca
        </button>
      </form>

      {carregant && <p>Carregant…</p>}
      {error && <p className="error">{error}</p>}
      {pellicules?.length === 0 && <p>No s’ha trobat cap pel·lícula.</p>}

      {pellicules && pellicules.length > 0 && (
        <ul className="cartellera">
          {pellicules.map((p) => (
            <TargetaPellicula key={p.id} pellicula={p} />
          ))}
        </ul>
      )}
    </div>
  );
}
