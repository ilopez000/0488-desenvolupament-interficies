import { useState } from 'react';
import { preguntarIA } from '../ia/clientIA';
import type { Missatge } from '../ia/tipus';

// Hook propi per demanar DADES a la IA (no text lliure).
//  - esquema: la forma del JSON que volem (JSON Schema)
//  - esValid: funció que comprova que el JSON rebut té aquesta forma
// Retorna les dades ja tipades (T), llestes per pintar components.
export function useIAJson<T>(esquema: object, esValid: (valor: unknown) => valor is T) {
  const [dades, setDades] = useState<T | null>(null);
  const [carregant, setCarregant] = useState(false);
  const [error, setError] = useState('');

  async function demana(missatges: Missatge[]) {
    setCarregant(true);
    setError('');
    setDades(null);
    try {
      const text = await preguntarIA(missatges, { esquema, temperatura: 0.8 });
      const valor: unknown = JSON.parse(text); // de text a objecte
      if (!esValid(valor)) throw new Error('La IA ha respost amb una forma inesperada. Torna-ho a provar.');
      setDades(valor); // aquí TypeScript ja sap que valor és de tipus T
    } catch (err) {
      if (err instanceof SyntaxError) setError('La IA no ha retornat un JSON vàlid. Torna-ho a provar.');
      else setError(err instanceof Error ? err.message : 'Error desconegut');
    } finally {
      setCarregant(false);
    }
  }

  return { dades, carregant, error, demana };
}
