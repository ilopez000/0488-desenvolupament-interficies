import { useState } from 'react';
import { AvisClau } from '../components/AvisClau';
import { TargetaPellicula } from '../components/TargetaPellicula';
import { CLAU_OPENWEATHER, TOKEN_TMDB } from '../config/claus';
import { useApi } from '../hooks/useApi';
import type { LlistaPellicules, Temps } from '../tipus';

// Quin gènere de TMDB proposem segons el temps (weather[0].main).
// Els números són els identificadors de gènere que fa servir TMDB.
type Proposta = { genere: number; nom: string; frase: string };

const PROPOSTA_PER_TEMPS: Record<string, Proposta> = {
  Rain: { genere: 16, nom: 'Animació', frase: 'Plou: manta, sofà i una d’animació.' },
  Drizzle: { genere: 16, nom: 'Animació', frase: 'Plovisqueja: manta, sofà i una d’animació.' },
  Thunderstorm: { genere: 53, nom: 'Suspens', frase: 'Hi ha tempesta: el dia perfecte per al suspens.' },
  Snow: { genere: 10751, nom: 'Família', frase: 'Neva: pel·lícula en família.' },
  Clouds: { genere: 9648, nom: 'Misteri', frase: 'Està ennuvolat: un misteri per resoldre.' },
  Clear: { genere: 12, nom: 'Aventura', frase: 'Fa sol: surt a fora… i al vespre, una d’aventures.' },
};
const PER_DEFECTE: Proposta = { genere: 35, nom: 'Comèdia', frase: 'Dubtes? Una comèdia no falla mai.' };

// EXEMPLE 3 · Dues APIs encadenades: la resposta de la 1a decideix la 2a
export function PlaDeTarda() {
  const [ciutat, setCiutat] = useState('Barcelona'); // el que s'escriu a l'input
  const [consulta, setConsulta] = useState('Barcelona'); // la ciutat demanada de debò

  // ── PETICIÓ 1 · OpenWeather (clau a la URL) ──
  const urlTemps = CLAU_OPENWEATHER
    ? `https://api.openweathermap.org/data/2.5/weather?${new URLSearchParams({
        q: consulta,
        appid: CLAU_OPENWEATHER, // ← la clau, com un paràmetre més
        units: 'metric',
        lang: 'ca',
      })}`
    : null; // sense clau, no demanem res
  const temps = useApi<Temps>(urlTemps);

  // Amb el temps decidim la proposta. Sense temps, encara no n'hi ha.
  const proposta = temps.dades
    ? (PROPOSTA_PER_TEMPS[temps.dades.weather[0].main] ?? PER_DEFECTE)
    : null;

  // ── PETICIÓ 2 · TMDB (token a la capçalera) ──
  // Depèn de la 1: mentre no hi hagi proposta, la url és null i no es fa.
  const urlPelis =
    proposta && TOKEN_TMDB
      ? `https://api.themoviedb.org/3/discover/movie?${new URLSearchParams({
          with_genres: String(proposta.genere), // el gènere triat pel temps
          sort_by: 'popularity.desc', // les més populars primer
          language: 'es-ES',
          include_adult: 'false',
        })}`
      : null;
  const pelis = useApi<LlistaPellicules>(urlPelis, TOKEN_TMDB); // ← el token

  // Els avisos van DESPRÉS dels hooks (els hooks no poden anar dins d'un if)
  if (!CLAU_OPENWEATHER) {
    return <AvisClau variable="VITE_OWM_KEY" web="https://home.openweathermap.org/api_keys" />;
  }
  if (!TOKEN_TMDB) {
    return <AvisClau variable="VITE_TMDB_TOKEN" web="https://www.themoviedb.org/settings/api" />;
  }

  return (
    <div className="targeta">
      <form
        className="fila"
        onSubmit={(e) => {
          e.preventDefault();
          setConsulta(ciutat.trim()); // canviar la consulta = canviar la url = nova petició
        }}
      >
        <input value={ciutat} onChange={(e) => setCiutat(e.target.value)} aria-label="Ciutat" />
        <button type="submit" disabled={temps.carregant}>
          Què faig aquesta tarda?
        </button>
      </form>

      {/* Estats de la PETICIÓ 1 */}
      {temps.carregant && <p>Mirant el temps…</p>}
      {temps.error && <p className="error">{temps.error}</p>}

      {temps.dades && proposta && (
        <div className="resum-temps">
          <p>
            A <strong>{temps.dades.name}</strong>: {Math.round(temps.dades.main.temp)} °C,{' '}
            {temps.dades.weather[0].description}.
          </p>
          <p className="gran">{proposta.frase}</p>
          <p className="nota">Gènere proposat: {proposta.nom}</p>
        </div>
      )}

      {/* Estats de la PETICIÓ 2 */}
      {pelis.carregant && <p>Buscant pel·lícules…</p>}
      {pelis.error && <p className="error">{pelis.error}</p>}

      {proposta && pelis.dades && (
        <ul className="cartellera">
          {pelis.dades.results.slice(0, 4).map((p) => (
            <TargetaPellicula key={p.id} pellicula={p} />
          ))}
        </ul>
      )}
    </div>
  );
}
