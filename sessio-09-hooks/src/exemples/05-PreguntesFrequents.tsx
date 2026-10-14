import { useDisclosure } from '../hooks/useDisclosure';

type PreguntaProps = { pregunta: string; resposta: string };

function Pregunta({ pregunta, resposta }: PreguntaProps) {
  const { obert, alternar } = useDisclosure();

  return (
    <div className="pregunta">
      <button onClick={alternar} aria-expanded={obert}>
        {obert ? '▾' : '▸'} {pregunta}
      </button>
      {obert && <p>{resposta}</p>}
    </div>
  );
}

const preguntes = [
  { pregunta: 'Quant triga l’enviament?', resposta: 'De 24 a 48 hores.' },
  { pregunta: 'Puc tornar un producte?', resposta: 'Sí, tens 30 dies.' },
  { pregunta: 'Com puc pagar?', resposta: 'Amb targeta o amb Bizum.' },
];

export function PreguntesFrequents() {
  return (
    <div className="targeta">
      <h2>Preguntes freqüents</h2>
      {preguntes.map((p) => (
        <Pregunta
          key={p.pregunta}
          pregunta={p.pregunta}
          resposta={p.resposta}
        />
      ))}
    </div>
  );
}
