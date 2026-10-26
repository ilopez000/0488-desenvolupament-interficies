import type { Missatge } from '../ia/tipus';

// 1) TIPUS: la forma de les dades a TypeScript
export type Pregunta = {
  enunciat: string;
  opcions: string[];
  correcta: number; // posició de l'opció correcta (0, 1, 2 o 3)
  explicacio: string;
};

export type Quiz = {
  titol: string;
  preguntes: Pregunta[];
};

// 2) ESQUEMA: la MATEIXA forma, però escrita en JSON Schema perquè l'entengui la IA.
//    En mode estricte, tots els camps van a «required» i cal additionalProperties: false
export const ESQUEMA_QUIZ = {
  type: 'object',
  properties: {
    titol: { type: 'string' },
    preguntes: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          enunciat: { type: 'string' },
          opcions: { type: 'array', items: { type: 'string' } },
          correcta: { type: 'integer' },
          explicacio: { type: 'string' },
        },
        required: ['enunciat', 'opcions', 'correcta', 'explicacio'],
        additionalProperties: false,
      },
    },
  },
  required: ['titol', 'preguntes'],
  additionalProperties: false,
};

// 3) VALIDACIÓ: no ens refiem mai a cegues del que respon la IA
export function esQuiz(valor: unknown): valor is Quiz {
  if (typeof valor !== 'object' || valor === null) return false;
  const q = valor as Quiz;
  return (
    typeof q.titol === 'string' &&
    Array.isArray(q.preguntes) &&
    q.preguntes.length > 0 &&
    q.preguntes.every(
      (p) =>
        typeof p.enunciat === 'string' &&
        Array.isArray(p.opcions) &&
        p.opcions.length >= 2 &&
        p.opcions.every((o) => typeof o === 'string') &&
        Number.isInteger(p.correcta) &&
        p.correcta >= 0 &&
        p.correcta < p.opcions.length &&
        typeof p.explicacio === 'string',
    )
  );
}

// 4) PROMPT: les instruccions (system) i la petició concreta (user)
export function missatgesQuiz(tema: string, nombre: number, nivell: string): Missatge[] {
  return [
    {
      role: 'system',
      content:
        'Ets un generador de tests per a alumnat de cicles formatius. ' +
        'Respon només amb un JSON que compleixi l’esquema. Escriu-ho tot en català. ' +
        'Cada pregunta té 4 opcions i només una de correcta. ' +
        '«correcta» és la posició de l’opció correcta, comptant des de 0. ' +
        'L’explicació té una o dues frases.',
    },
    {
      role: 'user',
      content: `Tema: ${tema}. Nombre de preguntes: ${nombre}. Nivell: ${nivell}.`,
    },
  ];
}
