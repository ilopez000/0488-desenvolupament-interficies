import { useState, type ComponentType } from 'react';
import { Toaster } from 'sonner';
import { Icones } from './exemples/01-Icones';
import { Avisos } from './exemples/02-Avisos';
import { CodiQR } from './exemples/03-CodiQR';
import { Calendari } from './exemples/04-Calendari';
import { ComandaCompleta } from './exemples/05-ComandaCompleta';

type Exemple = {
  titol: string;
  llibreria: string;
  idea: string;
  fitxer: string;
  Component: ComponentType;
};

const exemples: Exemple[] = [
  {
    titol: '1 · Icones',
    llibreria: 'lucide-react',
    idea: 'Cada icona és un component: s’importa pel seu nom i es configura amb props.',
    fitxer: 'src/exemples/01-Icones.tsx',
    Component: Icones,
  },
  {
    titol: '2 · Avisos',
    llibreria: 'sonner',
    idea: 'Un <Toaster /> posat una sola vegada i una funció toast() que el fa sortir.',
    fitxer: 'src/exemples/02-Avisos.tsx',
    Component: Avisos,
  },
  {
    titol: '3 · Codi QR',
    llibreria: 'react-qr-code',
    idea: 'Importació per defecte: un component que converteix un text en un QR.',
    fitxer: 'src/exemples/03-CodiQR.tsx',
    Component: CodiQR,
  },
  {
    titol: '4 · Calendari',
    llibreria: 'react-day-picker',
    idea: 'Un component controlat que necessita el seu CSS i un idioma.',
    fitxer: 'src/exemples/04-Calendari.tsx',
    Component: Calendari,
  },
  {
    titol: '5 · Comanda completa',
    llibreria: 'les quatre juntes',
    idea: 'El codi de partida de les ampliacions.',
    fitxer: 'src/exemples/05-ComandaCompleta.tsx',
    Component: ComandaCompleta,
  },
];

export default function App() {
  const [actiu, setActiu] = useState(0);
  const { titol, llibreria, idea, fitxer, Component } = exemples[actiu];

  return (
    <main>
      <h1>Sessió 13 · Components d’altres llibreries</h1>

      <nav className="pestanyes" aria-label="Exemples">
        {exemples.map((e, i) => (
          <button key={e.titol} aria-pressed={i === actiu} onClick={() => setActiu(i)}>
            {e.titol}
          </button>
        ))}
      </nav>

      <section className="exemple">
        <h2>{titol}</h2>
        <p>
          <strong>Llibreria:</strong> <code>{llibreria}</code>
        </p>
        <p>{idea}</p>
        <p className="nota">
          Codi: <code>{fitxer}</code>
        </p>
        <Component key={titol} />
      </section>

      {/* Un sol Toaster per a tota l'app: és on es pinten els avisos de sonner */}
      <Toaster position="top-right" richColors closeButton />
    </main>
  );
}
