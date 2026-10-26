import { useRef, useState } from 'react';
import { preguntarIAenDirecte } from '../ia/clientIA';
import type { Missatge } from '../ia/tipus';

// Quants missatges de la conversa enviem com a molt. Cada petició
// porta l'historial sencer i el pla gratuït té un límit de text per minut.
const MAX_HISTORIAL = 10;

// Hook propi del xatbot: guarda la conversa i parla amb la IA.
// «instruccions» és el missatge de sistema (la personalitat del bot).
export function useXat(instruccions: string) {
  const [missatges, setMissatges] = useState<Missatge[]>([]);
  const [escrivint, setEscrivint] = useState(false);
  const [error, setError] = useState('');
  const controlador = useRef<AbortController | null>(null);

  async function envia(text: string) {
    const historial: Missatge[] = [...missatges, { role: 'user', content: text }];
    // Afegim la pregunta i una bombolla buida que s'anirà omplint
    setMissatges([...historial, { role: 'assistant', content: '' }]);
    setEscrivint(true);
    setError('');
    controlador.current = new AbortController();

    try {
      await preguntarIAenDirecte(
        [{ role: 'system', content: instruccions }, ...historial.slice(-MAX_HISTORIAL)],
        (textFinsAra) => setMissatges([...historial, { role: 'assistant', content: textFinsAra }]),
        controlador.current.signal,
      );
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        // L'usuari ha premut «Atura»: deixem el que ja s'havia escrit
        setMissatges((ara) => ara.filter((m) => m.content !== ''));
      } else {
        setError(err instanceof Error ? err.message : 'Error desconegut');
        setMissatges(historial); // treiem la bombolla buida
      }
    } finally {
      setEscrivint(false);
      controlador.current = null;
    }
  }

  function atura() {
    controlador.current?.abort();
  }

  function esborra() {
    atura();
    setMissatges([]);
    setError('');
  }

  return { missatges, escrivint, error, envia, atura, esborra };
}
