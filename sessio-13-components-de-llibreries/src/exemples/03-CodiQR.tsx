import { useState } from 'react';
// Importació PER DEFECTE: sense claus. El nom (QRCode) el triem nosaltres.
import QRCode from 'react-qr-code';

export function CodiQR() {
  const [nom, setNom] = useState('Laia');
  const [numero, setNumero] = useState(42);

  // El text que «guarda» el QR. Si canvia, el dibuix es torna a pintar.
  const numero4 = String(numero).padStart(4, '0'); // 42 → «0042»
  const codi = `PRATSHOP-${numero4}-${nom.trim().toUpperCase()}`;

  return (
    <div className="targeta">
      <div className="fila">
        <label>
          Nom del client
          <input value={nom} onChange={(e) => setNom(e.target.value)} />
        </label>
        <label>
          Número de comanda
          <input
            type="number"
            min={1}
            value={numero}
            onChange={(e) => setNumero(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="tiquet">
        <QRCode value={codi} size={160} title={`Codi QR de la comanda ${codi}`} />
        <div>
          <p className="nota">Tiquet de recollida</p>
          <p className="gran">{codi}</p>
          <p className="nota">
            Ensenya aquest codi a la botiga per recollir la comanda.
          </p>
        </div>
      </div>
    </div>
  );
}
