import { useState } from 'react';

// Forma de la resposta de l'API: només hi posem el que farem servir
type RespostaGos = {
  message: string; // l'adreça (URL) d'una foto de gos
  status: string; // "success" si tot ha anat bé
};

export function GosAleatori() {
  const [foto, setFoto] = useState('');

  async function demanarGos() {
    const resposta = await fetch('https://dog.ceo/api/breeds/image/random');
    const dades: RespostaGos = await resposta.json();
    setFoto(dades.message);
  }

  return (
    <div className="targeta">
      <button onClick={demanarGos}>Vull un gos!</button>
      {foto && <img src={foto} alt="Un gos triat a l'atzar" className="foto" />}
    </div>
  );
}
