import { useEffect, useState } from 'react';

export function TitolAmbUseEffect() {
  const [missatges, setMissatges] = useState(0);

  useEffect(() => {
    document.title = `(${missatges}) Missatges · PratShop`;
  }, [missatges]);

  return (
    <div className="targeta">
      <p>Tens <strong>{missatges}</strong> missatges nous.</p>
      <p className="nota">Mira el títol de la pestanya del navegador.</p>
      <button onClick={() => setMissatges(missatges + 1)}>
        Arriba un missatge
      </button>
    </div>
  );
}
