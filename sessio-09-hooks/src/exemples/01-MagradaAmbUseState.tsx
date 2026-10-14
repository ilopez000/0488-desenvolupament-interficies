import { useState } from 'react';

export function MagradaAmbUseState() {
  const [vots, setVots] = useState(0);

  return (
    <div className="targeta">
      <p>Aquest producte té <strong>{vots}</strong> m'agrada.</p>
      <div className="fila">
        <button onClick={() => setVots(vots + 1)}>M'agrada</button>
        <button onClick={() => setVots(0)}>Torna a zero</button>
      </div>
    </div>
  );
}
