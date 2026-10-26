import { useState, type FormEvent } from 'react';
import { Test } from '../components/Test';
import { useIAJson } from '../hooks/useIAJson';
import { ESQUEMA_QUIZ, esQuiz, missatgesQuiz } from './quiz';

// EXEMPLE 2 · La IA retorna DADES (JSON) i nosaltres pintem components.
// Aquest és el patró que més us servirà per al projecte.
export function GeneradorTests() {
  const [tema, setTema] = useState('Hooks de React');
  const [nombre, setNombre] = useState(3);
  const [nivell, setNivell] = useState('mitjà');
  const { dades, carregant, error, demana } = useIAJson(ESQUEMA_QUIZ, esQuiz);

  function genera(e: FormEvent) {
    e.preventDefault();
    if (tema.trim() === '') return;
    demana(missatgesQuiz(tema.trim(), nombre, nivell));
  }

  return (
    <div className="targeta">
      <form className="fila" onSubmit={genera}>
        <label>
          Tema
          <input value={tema} onChange={(e) => setTema(e.target.value)} />
        </label>
        <label>
          Preguntes
          <select value={nombre} onChange={(e) => setNombre(Number(e.target.value))}>
            <option value={3}>3</option>
            <option value={5}>5</option>
          </select>
        </label>
        <label>
          Nivell
          <select value={nivell} onChange={(e) => setNivell(e.target.value)}>
            <option>fàcil</option>
            <option>mitjà</option>
            <option>difícil</option>
          </select>
        </label>
        <button type="submit" disabled={carregant}>
          {carregant ? 'Generant…' : 'Genera el test'}
        </button>
      </form>

      {carregant && <p>La IA està preparant les preguntes…</p>}
      {error && <p className="error">{error}</p>}
      {dades && <Test quiz={dades} />}
    </div>
  );
}
