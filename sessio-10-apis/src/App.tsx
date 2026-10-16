import { useState, type ComponentType } from 'react';
import { GosAleatori } from './exemples/01-GosAleatori';
import { CercadorPokemon } from './exemples/02-CercadorPokemon';
import { EquipamentsMunicipi } from './exemples/03-EquipamentsMunicipi';
import { PokedexAmbUseFetch } from './exemples/04-PokedexAmbUseFetch';

type Exemple = {
  titol: string;
  api: string;
  idea: string;
  fitxers: string[];
  Component: ComponentType;
};

const exemples: Exemple[] = [
  {
    titol: '1 · Un gos a l’atzar',
    api: 'Dog CEO API',
    idea: 'La petició més senzilla: un botó, un fetch i una dada (la URL d’una foto).',
    fitxers: ['src/exemples/01-GosAleatori.tsx'],
    Component: GosAleatori,
  },
  {
    titol: '2 · Cercador de Pokémon',
    api: 'PokéAPI',
    idea: 'Una URL que canvia segons el que escriu l’usuari, i els tres estats: carregant, error i dades.',
    fitxers: ['src/exemples/02-CercadorPokemon.tsx'],
    Component: CercadorPokemon,
  },
  {
    titol: '3 · Equipaments del meu municipi',
    api: 'Dades obertes de la Generalitat (Socrata)',
    idea: 'Dades reals de Catalunya que es carreguen soles amb useEffect i es filtren amb paràmetres a la URL.',
    fitxers: ['src/exemples/03-EquipamentsMunicipi.tsx'],
    Component: EquipamentsMunicipi,
  },
  {
    titol: '4 · Pokédex amb useFetch',
    api: 'PokéAPI + hook propi',
    idea: 'Tota la feina de la petició dins d’un hook propi: el component queda molt més curt.',
    fitxers: ['src/hooks/useFetch.ts', 'src/exemples/04-PokedexAmbUseFetch.tsx'],
    Component: PokedexAmbUseFetch,
  },
];

export default function App() {
  const [actiu, setActiu] = useState(0);
  const { titol, api, idea, fitxers, Component } = exemples[actiu];

  return (
    <main>
      <h1>Sessió 10 · Connectar React amb APIs</h1>

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
    </main>
  );
}
