import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useXat } from '../hooks/useXat';

// Tres personalitats: el MATEIX codi, només canvia el missatge de sistema
const PERSONALITATS = {
  pratbot:
    'Ets en Pratbot, l’assistent de l’alumnat de DAM de PratFP. Respon sempre en català, ' +
    'de manera clara i breu (com a màxim 5 frases). No facis servir Markdown.',
  profe:
    'Ets un professor de React molt pacient. No donis mai la solució completa: ' +
    'fes preguntes i dona pistes perquè l’alumne hi arribi sol. Respon en català i sense Markdown.',
  botiga:
    'Ets l’assistent de la botiga en línia PratShop, que ven auriculars, teclats, ratolins i pantalles. ' +
    'Si et pregunten una altra cosa, digues amablement que només pots ajudar amb la botiga. ' +
    'Respon en català, breu i sense Markdown.',
};
type Personalitat = keyof typeof PERSONALITATS;

// EXEMPLE 1 · Xatbot amb historial i resposta en directe (streaming)
export function Xatbot() {
  const [personalitat, setPersonalitat] = useState<Personalitat>('pratbot');
  const [text, setText] = useState('');
  const { missatges, escrivint, error, envia, atura, esborra } = useXat(PERSONALITATS[personalitat]);
  const llista = useRef<HTMLUListElement>(null);

  // Cada vegada que canvien els missatges, baixem fins a l'últim
  useEffect(() => {
    llista.current?.scrollTo({ top: llista.current.scrollHeight });
  }, [missatges]);

  function enviar(e: FormEvent) {
    e.preventDefault(); // que el formulari no recarregui la pàgina
    if (text.trim() === '' || escrivint) return;
    envia(text.trim());
    setText('');
  }

  function canviaPersonalitat(nova: Personalitat) {
    esborra(); // personalitat nova = conversa nova
    setPersonalitat(nova);
  }

  return (
    <div className="targeta">
      <div className="fila">
        <label>
          Personalitat
          <select value={personalitat} onChange={(e) => canviaPersonalitat(e.target.value as Personalitat)}>
            <option value="pratbot">Pratbot (assistent)</option>
            <option value="profe">Profe de React (només pistes)</option>
            <option value="botiga">Botiga PratShop</option>
          </select>
        </label>
        <button onClick={esborra} disabled={missatges.length === 0}>
          Conversa nova
        </button>
      </div>

      <ul className="xat" ref={llista} aria-live="polite">
        {missatges.length === 0 && <li className="nota">Escriu alguna cosa per començar.</li>}
        {missatges.map((m, i) => (
          <li key={i} className={`bombolla ${m.role}`}>
            {m.content || '…'}
          </li>
        ))}
      </ul>

      {error && <p className="error">{error}</p>}

      <form className="fila" onSubmit={enviar}>
        <input
          className="entrada-xat"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escriu el teu missatge…"
          aria-label="Missatge"
        />
        {escrivint ? (
          <button type="button" onClick={atura}>
            Atura
          </button>
        ) : (
          <button type="submit" disabled={text.trim() === ''}>
            Envia
          </button>
        )}
      </form>
    </div>
  );
}
