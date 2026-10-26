import type { Pregunta } from '../exemples/quiz';

type Props = {
  numero: number;
  pregunta: Pregunta;
  triada: number | null; // l'opció que ha triat l'alumne (null = encara cap)
  onTria: (opcio: number) => void;
};

// Pinta UNA pregunta. No sap res de la IA: només rep dades per props.
export function TargetaPregunta({ numero, pregunta, triada, onTria }: Props) {
  const contestada = triada !== null;

  return (
    <li className="targeta">
      <p>
        <strong>{numero}.</strong> {pregunta.enunciat}
      </p>

      <div className="opcions">
        {pregunta.opcions.map((opcio, i) => {
          // Un cop contestada, pintem de verd la correcta i de vermell l'errada
          let classe = '';
          if (contestada && i === pregunta.correcta) classe = 'encert';
          else if (contestada && i === triada) classe = 'errada';

          return (
            <button key={i} className={classe} disabled={contestada} onClick={() => onTria(i)}>
              {opcio}
            </button>
          );
        })}
      </div>

      {contestada && (
        <p className="nota">
          {triada === pregunta.correcta ? '✔ Correcte. ' : '✘ No és aquesta. '}
          {pregunta.explicacio}
        </p>
      )}
    </li>
  );
}
