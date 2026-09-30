import { useState } from 'react';

// EXEMPLE 2 · Les tres regles de useState
//   Regla 1 · Els ganxos es criden a dalt de tot del component, mai dins d'un if o d'un bucle.
//   Regla 2 · L'estat no es muta: es crea un valor nou.
//   Regla 3 · El canvi no és immediat: el valor nou arriba al dibuixat següent.

// ---------- Regla 1 ----------
function ReglaGanxosADalt() {
  // BÉ: tots els useState, a dalt i sempre en el mateix ordre.
  const [obert, setObert] = useState(false);
  const [vegades, setVegades] = useState(0);

  // MALAMENT (no ho descomentis, és perquè es vegi):
  // if (obert) {
  //   const [vegades, setVegades] = useState(0);   // un ganxo dins d'un if
  // }
  // React identifica cada useState per l'ORDRE en què es crida. Si un dibuixat en crida dos
  // i el següent només un, ja no sap quin valor és de qui.

  function commuta() {
    setObert(!obert);
    setVegades(vegades + 1);
  }

  return (
    <div className="caixa">
      <h3>Regla 1 · Els ganxos, a dalt de tot</h3>
      <button onClick={commuta}>{obert ? 'Amaga' : 'Mostra'} els detalls</button>
      {/* El que pot ser condicional és el que es PINTA, no el ganxo. */}
      {obert && <p>Enviament gratuït a partir de 50 €.</p>}
      <p className="nota">Has clicat {vegades} vegades.</p>
    </div>
  );
}

// ---------- Regla 2 ----------
function ReglaNoMutar() {
  const [talles, setTalles] = useState<string[]>(['S', 'M']);

  function afegeixMutant() {
    // MALAMENT: push modifica la MATEIXA llista. React compara l'anterior amb la nova,
    // veu que és el mateix objecte i decideix que no ha canviat res: no repinta.
    talles.push('L');
    setTalles(talles);
    console.log('Llista mutada:', talles);
  }

  function afegeixBe() {
    // BÉ: una llista NOVA amb tot el que hi havia més l'element nou.
    setTalles([...talles, 'L']);
  }

  return (
    <div className="caixa">
      <h3>Regla 2 · No mutis l'estat</h3>
      <p className="xifra petita">{talles.join(' · ')}</p>
      <div className="botons">
        <button className="secundari" onClick={afegeixMutant}>Afegeix «L» amb push (malament)</button>
        <button onClick={afegeixBe}>Afegeix «L» amb [...talles, 'L'] (bé)</button>
        <button className="secundari" onClick={() => setTalles(['S', 'M'])}>Reinicia</button>
      </div>
      <p className="nota">
        Amb push la pantalla no canvia, tot i que a la consola la llista creix. Quan després cliquis
        el botó bo, apareixeran de cop totes les «L» que havies amagat.
      </p>
    </div>
  );
}

// ---------- Regla 3 ----------
function ReglaNoImmediat() {
  const [unitats, setUnitats] = useState(0);
  const [missatge, setMissatge] = useState('');

  function sumaTresMalament() {
    // Les tres línies llegeixen el MATEIX «unitats» (el d'aquest dibuixat).
    // Si val 0, les tres diuen «posa-hi 1». Resultat: suma 1, no 3.
    setUnitats(unitats + 1);
    setUnitats(unitats + 1);
    setUnitats(unitats + 1);
    // I aquí encara val el d'abans: el canvi arribarà al dibuixat següent.
    setMissatge(`Just després de setUnitats, «unitats» encara val ${unitats}.`);
  }

  function sumaTresBe() {
    // Forma funcional: «agafa el valor més recent i suma-hi 1». S'encadenen.
    setUnitats((anterior) => anterior + 1);
    setUnitats((anterior) => anterior + 1);
    setUnitats((anterior) => anterior + 1);
    setMissatge('Amb la forma funcional, cada crida parteix del resultat de l\'anterior.');
  }

  return (
    <div className="caixa">
      <h3>Regla 3 · El canvi no és immediat</h3>
      <p className="xifra">{unitats}</p>
      <div className="botons">
        <button className="secundari" onClick={sumaTresMalament}>+3 amb setUnitats(unitats + 1) ×3</button>
        <button onClick={sumaTresBe}>+3 amb setUnitats(anterior =&gt; anterior + 1) ×3</button>
        <button className="secundari" onClick={() => { setUnitats(0); setMissatge(''); }}>Reinicia</button>
      </div>
      {missatge && <p className="nota">{missatge}</p>}
    </div>
  );
}

export default function ReglesUseState() {
  return (
    <>
      <h1>2 · useState i les seves regles</h1>
      <p className="subtitol">Tres regles, i què passa a la pantalla quan no es compleixen.</p>
      <ReglaGanxosADalt />
      <ReglaNoMutar />
      <ReglaNoImmediat />
    </>
  );
}
