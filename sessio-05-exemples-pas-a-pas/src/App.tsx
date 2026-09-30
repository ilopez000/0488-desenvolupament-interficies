import { useState } from 'react';
import PerQueEstat from './exemples/01-PerQueEstat';
import ReglesUseState from './exemples/02-ReglesUseState';
import Esdeveniments from './exemples/03-Esdeveniments';
import LlistaFiltrada from './exemples/04-LlistaFiltradaIKey';
import FormulariControlat from './exemples/05-FormulariControlat';
import AixecarEstat from './exemples/06-AixecarEstat';
import EfecteILocalStorage from './exemples/07-EfecteILocalStorage';

// Cada exemple és un component independent. Aquesta llista només serveix per pintar el menú.
const EXEMPLES = [
  { titol: '1 · Per què cal l\'estat', component: PerQueEstat },
  { titol: '2 · Regles de useState', component: ReglesUseState },
  { titol: '3 · Esdeveniments', component: Esdeveniments },
  { titol: '4 · Llista filtrada i key', component: LlistaFiltrada },
  { titol: '5 · Formulari controlat', component: FormulariControlat },
  { titol: '6 · Aixecar l\'estat', component: AixecarEstat },
  { titol: '7 · useEffect i localStorage', component: EfecteILocalStorage },
];

// El menú mateix ja és un exemple d'estat: «quin exemple es veu» és una dada que canvia
// i que ha de fer redibuixar la pantalla.
export default function App() {
  const [actiu, setActiu] = useState(0);
  const Exemple = EXEMPLES[actiu].component;

  return (
    <>
      <header className="capcalera">
        <span className="marca">PratShop · sessió 5 · exemples pas a pas</span>
      </header>
      <nav className="menu" aria-label="Exemples">
        {EXEMPLES.map((exemple, index) => (
          <button
            key={exemple.titol}
            className={index === actiu ? 'pestanya activa' : 'pestanya'}
            onClick={() => setActiu(index)}
          >
            {exemple.titol}
          </button>
        ))}
      </nav>
      <main>
        <Exemple />
      </main>
    </>
  );
}
