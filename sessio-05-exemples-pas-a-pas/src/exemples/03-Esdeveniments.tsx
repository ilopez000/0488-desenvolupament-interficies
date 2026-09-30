import { useState } from 'react';

// EXEMPLE 3 · Esdeveniments
// A React els esdeveniments s'escriuen en camelCase (onClick, onChange, onSubmit, onKeyDown)
// i reben una FUNCIÓ, no el resultat de cridar-la.

export default function Esdeveniments() {
  const [registre, setRegistre] = useState<string[]>([]);
  const [text, setText] = useState('');

  // Afegeix una línia al principi del registre (llista nova, sense mutar).
  function anota(linia: string) {
    setRegistre((anterior) => [linia, ...anterior].slice(0, 8));
  }

  // 1) Un manegador sense arguments.
  function saluda() {
    anota('onClick → s\'ha clicat «Saluda»');
  }

  // 2) Un manegador que necessita un argument propi: cal una funció fletxa al JSX.
  function afegeixAlCarro(producte: string) {
    anota(`onClick → afegit al carro: ${producte}`);
  }

  // 3) L'objecte d'esdeveniment: React el passa sempre com a primer argument.
  //    «target» és l'element que l'ha provocat; «target.value», el que hi ha escrit.
  function canviaText(esdeveniment: React.ChangeEvent<HTMLInputElement>) {
    setText(esdeveniment.target.value);
    anota(`onChange → value = «${esdeveniment.target.value}»`);
  }

  // 4) Esdeveniments de teclat: «key» diu quina tecla s'ha premut.
  function tecla(esdeveniment: React.KeyboardEvent<HTMLInputElement>) {
    if (esdeveniment.key === 'Enter') {
      anota(`onKeyDown → Enter: cercaríem «${text}»`);
    }
  }

  // 5) preventDefault: atura el que el navegador faria pel seu compte.
  function envia(esdeveniment: React.FormEvent<HTMLFormElement>) {
    esdeveniment.preventDefault(); // sense això, la pàgina es recarregaria
    anota('onSubmit → formulari enviat sense recarregar la pàgina');
  }

  return (
    <>
      <h1>3 · Esdeveniments</h1>
      <p className="subtitol">Prova cada control i mira què s'anota al registre de la dreta.</p>

      <div className="dues-columnes">
        <div className="caixa">
          <h3>onClick</h3>
          <div className="botons">
            {/* BÉ: es passa la funció.   MALAMENT: onClick={saluda()} la cridaria en dibuixar. */}
            <button onClick={saluda}>Saluda</button>
            {/* Amb arguments: una fletxa que la crida quan toqui. */}
            <button onClick={() => afegeixAlCarro('Teclat mecànic')}>Afegeix el teclat</button>
            <button onClick={() => afegeixAlCarro('Ratolí sense fil')}>Afegeix el ratolí</button>
          </div>

          <h3>onChange i onKeyDown</h3>
          <input
            type="text"
            placeholder="Escriu i prem Enter"
            value={text}
            onChange={canviaText}
            onKeyDown={tecla}
          />

          <h3>onSubmit</h3>
          <form onSubmit={envia}>
            <button type="submit">Envia el formulari</button>
          </form>
        </div>

        <div className="caixa">
          <h3>Registre d'esdeveniments</h3>
          {registre.length === 0 ? (
            <p className="nota">Encara no ha passat res.</p>
          ) : (
            <ol className="registre">
              {/* Aquí l'índex serveix de key perquè la llista només es mostra, no s'edita.
                  A l'exemple 4 es veu quan NO serveix. */}
              {registre.map((linia, index) => (
                <li key={index}>{linia}</li>
              ))}
            </ol>
          )}
          <button className="secundari" onClick={() => setRegistre([])}>Esborra el registre</button>
        </div>
      </div>
    </>
  );
}
