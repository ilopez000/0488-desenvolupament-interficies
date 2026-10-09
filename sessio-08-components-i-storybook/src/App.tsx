import { useState } from 'react';
import { Avis, Boto, Insignia, Valoracio } from './ui';

// Una pàgina que FA SERVIR la llibreria, com ho faria PratShop.
// Aquí no hi ha cap estil de botó ni d'avís: tot ve dels components.
export default function App() {
  const [puntuacio, setPuntuacio] = useState(0);
  const [afegint, setAfegint] = useState(false);
  const [missatge, setMissatge] = useState<string | null>(null);

  function afegeixAlCarro() {
    setAfegint(true);
    // Simulem una petició al servidor que tarda un segon
    setTimeout(() => {
      setAfegint(false);
      setMissatge('La dessuadora s\'ha afegit al carro.');
    }, 1000);
  }

  return (
    <main>
      <h1>PratShop UI · aparador</h1>

      {missatge && (
        <Avis tipus="exit" titol="Fet!" onTancar={() => setMissatge(null)}>
          {missatge}
        </Avis>
      )}

      <article className="targeta">
        <div className="fila">
          <Insignia to="exit">Novetat</Insignia>
          <Insignia to="perill">−20 %</Insignia>
        </div>
        <h2>Dessuadora Prat FP</h2>
        <Valoracio valor={4} etiqueta="Valoració mitjana" />
        <p className="preu">31,92 €</p>
        <Boto icona="🛒" carregant={afegint} onClick={afegeixAlCarro} ampleComplet>
          {afegint ? 'Afegint…' : 'Afegeix al carro'}
        </Boto>
      </article>

      <article className="targeta">
        <h2>Què et sembla aquest producte?</h2>
        <Valoracio valor={puntuacio} onCanvi={setPuntuacio} etiqueta="La teva valoració" />
        <div className="fila">
          <Boto variant="secundari" mida="petita" onClick={() => setPuntuacio(0)}>
            Esborra
          </Boto>
          <span>{puntuacio === 0 ? 'Encara no has valorat' : `Has posat ${puntuacio} estrelles`}</span>
        </div>
      </article>
    </main>
  );
}
