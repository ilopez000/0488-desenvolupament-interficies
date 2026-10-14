import { useState, type ComponentType } from 'react';
import { MagradaAmbUseState } from './exemples/01-MagradaAmbUseState';
import { TitolAmbUseEffect } from './exemples/02-TitolAmbUseEffect';
import { FocusAmbUseRef } from './exemples/03-FocusAmbUseRef';
import { DosBotonsMagrada } from './exemples/04-DosBotonsMagrada';
import { PreguntesFrequents } from './exemples/05-PreguntesFrequents';
import { NomRecordat } from './exemples/06-NomRecordat';
import { MidaDeLaFinestra } from './exemples/07-MidaDeLaFinestra';

type Exemple = {
  titol: string;
  grup: 'Hooks de React' | 'Hooks propis';
  idea: string;
  fitxers: string[];
  Component: ComponentType;
};

const exemples: Exemple[] = [
  {
    titol: '1 · useState',
    grup: 'Hooks de React',
    idea: 'useState fa que el component recordi un valor entre una pintada i la següent.',
    fitxers: ['src/exemples/01-MagradaAmbUseState.tsx'],
    Component: MagradaAmbUseState,
  },
  {
    titol: '2 · useEffect',
    grup: 'Hooks de React',
    idea: "useEffect fa una feina fora de React (aquí, canviar el títol de la pestanya) després de pintar.",
    fitxers: ['src/exemples/02-TitolAmbUseEffect.tsx'],
    Component: TitolAmbUseEffect,
  },
  {
    titol: '3 · useRef',
    grup: 'Hooks de React',
    idea: "useRef guarda una referència a un element de la pàgina per poder-hi fer coses, com posar-hi el focus.",
    fitxers: ['src/exemples/03-FocusAmbUseRef.tsx'],
    Component: FocusAmbUseRef,
  },
  {
    titol: '4 · useComptador',
    grup: 'Hooks propis',
    idea: "El primer hook propi. Cada component que el crida té el seu propi comptador: no el comparteixen.",
    fitxers: ['src/hooks/useComptador.ts', 'src/exemples/04-DosBotonsMagrada.tsx'],
    Component: DosBotonsMagrada,
  },
  {
    titol: '5 · useDisclosure',
    grup: 'Hooks propis',
    idea: 'Obrir, tancar i alternar qualsevol cosa: un desplegable, un menú, una finestra modal…',
    fitxers: ['src/hooks/useDisclosure.ts', 'src/exemples/05-PreguntesFrequents.tsx'],
    Component: PreguntesFrequents,
  },
  {
    titol: '6 · useLocalStorage',
    grup: 'Hooks propis',
    idea: 'Com useState, però el valor es desa al navegador i sobreviu quan recarregues la pàgina.',
    fitxers: ['src/hooks/useLocalStorage.ts', 'src/exemples/06-NomRecordat.tsx'],
    Component: NomRecordat,
  },
  {
    titol: '7 · useAmpladaFinestra',
    grup: 'Hooks propis',
    idea: "Un hook que escolta un esdeveniment del navegador i deixa d'escoltar-lo quan ja no cal (la neteja).",
    fitxers: ['src/hooks/useAmpladaFinestra.ts', 'src/exemples/07-MidaDeLaFinestra.tsx'],
    Component: MidaDeLaFinestra,
  },
];

export default function App() {
  const [actiu, setActiu] = useState(0);
  const { titol, idea, fitxers, Component } = exemples[actiu];

  return (
    <main>
      <h1>Sessió 9 · Els hooks i com fer-ne de propis</h1>

      <nav className="pestanyes" aria-label="Exemples">
        {(['Hooks de React', 'Hooks propis'] as const).map((grup) => (
          <div key={grup} className="grup">
            <span className="grup-nom">{grup}</span>
            {exemples.map((e, i) =>
              e.grup === grup ? (
                <button key={e.titol} aria-pressed={i === actiu} onClick={() => setActiu(i)}>
                  {e.titol}
                </button>
              ) : null,
            )}
          </div>
        ))}
      </nav>

      <section>
        <h2>{titol}</h2>
        <p>{idea}</p>
        <p className="nota">
          Codi: {fitxers.map((f) => <code key={f}>{f}</code>)}
        </p>
        <Component />
      </section>
    </main>
  );
}
