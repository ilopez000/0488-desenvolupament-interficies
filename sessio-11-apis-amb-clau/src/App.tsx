import { useState, type ComponentType } from 'react';
import { TempsCiutat } from './exemples/01-TempsCiutat';
import { CercadorPellicules } from './exemples/02-CercadorPellicules';
import { PlaDeTarda } from './exemples/03-PlaDeTarda';
import { ClauAmagada } from './exemples/04-ClauAmagada';

type Exemple = {
  titol: string;
  api: string;
  idea: string;
  fitxers: string[];
  Component: ComponentType;
};

const exemples: Exemple[] = [
  {
    titol: '1 · El temps',
    api: 'OpenWeather (clau a la URL)',
    idea: 'La clau viatja com un paràmetre més de la URL (appid).',
    fitxers: ['src/config/claus.ts', 'src/exemples/01-TempsCiutat.tsx'],
    Component: TempsCiutat,
  },
  {
    titol: '2 · Cercador de pel·lícules',
    api: 'TMDB (token a la capçalera)',
    idea: 'El token viatja a la capçalera Authorization, no a la URL.',
    fitxers: ['src/exemples/02-CercadorPellicules.tsx', 'src/components/TargetaPellicula.tsx'],
    Component: CercadorPellicules,
  },
  {
    titol: '3 · Pla de tarda',
    api: 'OpenWeather + TMDB',
    idea: 'Dues APIs encadenades amb el hook useApi: el temps que fa decideix quines pel·lícules es demanen.',
    fitxers: ['src/hooks/useApi.ts', 'src/exemples/03-PlaDeTarda.tsx'],
    Component: PlaDeTarda,
  },
  {
    titol: '4 · La clau amagada',
    api: 'TMDB a través d’un proxy',
    idea: 'El navegador no coneix el token: el servidor de Vite l’hi afegeix abans d’anar a TMDB.',
    fitxers: ['vite.config.ts', 'src/exemples/04-ClauAmagada.tsx'],
    Component: ClauAmagada,
  },
];

export default function App() {
  const [actiu, setActiu] = useState(0);
  const { titol, api, idea, fitxers, Component } = exemples[actiu];

  return (
    <main>
      <h1>Sessió 11 · APIs amb clau</h1>

      <nav className="pestanyes grup" aria-label="Exemples">
        {exemples.map((e, i) => (
          <button key={e.titol} aria-pressed={i === actiu} onClick={() => setActiu(i)}>
            {e.titol}
          </button>
        ))}
      </nav>

      <section>
        <h2>{titol}</h2>
        <p>
          <strong>API:</strong> {api}
        </p>
        <p>{idea}</p>
        <p className="nota">
          Codi: {fitxers.map((f) => <code key={f}>{f}</code>)}
        </p>
        <Component key={titol} />
      </section>

      {/* Les dues APIs demanen que diguem d'on surten les dades */}
      <footer className="nota">
        Dades del temps: <a href="https://openweathermap.org/">OpenWeather</a> · Dades de pel·lícules:{' '}
        <a href="https://www.themoviedb.org/">TMDB</a>. This product uses the TMDB API but is not endorsed or certified
        by TMDB.
      </footer>
    </main>
  );
}
