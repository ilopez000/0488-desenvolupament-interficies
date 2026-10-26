import { useState, type ComponentType } from 'react';
import { Xatbot } from './exemples/01-Xatbot';
import { GeneradorTests } from './exemples/02-GeneradorTests';
import { MODEL_IA } from './ia/config';

type Exemple = {
  titol: string;
  idea: string;
  fitxers: string[];
  Component: ComponentType;
};

const exemples: Exemple[] = [
  {
    titol: '1 · Xatbot',
    idea: 'Conversa amb historial. La resposta arriba a trossos (streaming), com a ChatGPT.',
    fitxers: ['src/ia/clientIA.ts', 'src/hooks/useXat.ts', 'src/exemples/01-Xatbot.tsx'],
    Component: Xatbot,
  },
  {
    titol: '2 · Generador de tests',
    idea: 'La IA no retorna text sinó DADES en JSON, i amb aquestes dades pintem components.',
    fitxers: ['src/hooks/useIAJson.ts', 'src/exemples/quiz.ts', 'src/exemples/02-GeneradorTests.tsx'],
    Component: GeneradorTests,
  },
];

export default function App() {
  const [actiu, setActiu] = useState(0);
  const { titol, idea, fitxers, Component } = exemples[actiu];

  return (
    <main>
      <h1>IA gratuïta a React</h1>

      <nav className="pestanyes grup" aria-label="Exemples">
        {exemples.map((e, i) => (
          <button key={e.titol} aria-pressed={i === actiu} onClick={() => setActiu(i)}>
            {e.titol}
          </button>
        ))}
      </nav>

      <section>
        <h2>{titol}</h2>
        <p>{idea}</p>
        <p className="nota">
          Codi: {fitxers.map((f) => <code key={f}>{f}</code>)}
        </p>
        <Component key={titol} />
      </section>

      <footer className="nota">
        Model: <code>{MODEL_IA}</code> a través de <a href="https://groq.com/">Groq</a> (pla gratuït). Les respostes
        de la IA poden contenir errors: revisa-les sempre.
      </footer>
    </main>
  );
}
