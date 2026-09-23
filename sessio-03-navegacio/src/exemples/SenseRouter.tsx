// EXEMPLE 0 · Com es faria SENSE React Router, per veure'n els límits.
// Funciona, però la URL no canvia mai: no es pot compartir cap enllaç,
// el botó "enrere" no torna a la pantalla anterior i si es recarrega
// sempre es torna a l'inici.
import { useState } from 'react';

export default function SenseRouter() {
  const [pantalla, setPantalla] = useState<'inici' | 'cataleg'>('inici');

  return (
    <div>
      <button onClick={() => setPantalla('inici')}>Inici</button>
      <button onClick={() => setPantalla('cataleg')}>Catàleg</button>

      {pantalla === 'inici' && <h1>Inici</h1>}
      {pantalla === 'cataleg' && <h1>Catàleg</h1>}
    </div>
  );
}
