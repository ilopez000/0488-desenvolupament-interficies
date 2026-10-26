import { useState } from 'react';
import type { Quiz } from '../exemples/quiz';
import { TargetaPregunta } from './TargetaPregunta';

// Pinta el test sencer i porta el compte dels encerts
export function Test({ quiz }: { quiz: Quiz }) {
  // Una posició per pregunta: quina opció s'ha triat (null = cap)
  const [triades, setTriades] = useState<(number | null)[]>(() => quiz.preguntes.map(() => null));

  function tria(pregunta: number, opcio: number) {
    setTriades((ara) => ara.map((t, i) => (i === pregunta ? opcio : t)));
  }

  const contestades = triades.filter((t) => t !== null).length;
  const encerts = quiz.preguntes.filter((p, i) => triades[i] === p.correcta).length;

  return (
    <div className="test">
      <h3>{quiz.titol}</h3>
      <ol className="llista-preguntes">
        {quiz.preguntes.map((p, i) => (
          <TargetaPregunta key={i} numero={i + 1} pregunta={p} triada={triades[i]} onTria={(o) => tria(i, o)} />
        ))}
      </ol>
      <p className="gran" aria-live="polite">
        Encerts: {encerts} de {quiz.preguntes.length}
        {contestades === quiz.preguntes.length && ' · Test acabat!'}
      </p>
    </div>
  );
}
