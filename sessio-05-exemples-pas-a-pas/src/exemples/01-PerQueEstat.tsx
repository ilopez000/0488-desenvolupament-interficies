import { useState } from 'react';

// EXEMPLE 1 · Per què una variable normal no serveix
// Dos comptadors d'unitats idèntics a la vista. El primer fa servir una variable normal;
// el segon, useState. Obre la consola (F12) mentre cliques el primer.

function ComptadorAmbVariable() {
  let unitats = 0; // cada cop que React crida la funció, torna a valer 0

  function afegeix() {
    unitats = unitats + 1; // l'oxlint ja avisa d'aquesta línia amb «npm run lint»: és l'error que volem ensenyar
    // La variable SÍ que canvia (mira la consola), però React no se n'assabenta:
    // ningú li ha dit que torni a dibuixar el component.
    console.log('Variable normal, unitats =', unitats);
  }

  return (
    <div className="caixa malament">
      <h3>Amb una variable normal</h3>
      <p className="xifra">{unitats}</p>
      <button onClick={afegeix}>Afegeix una unitat</button>
      <p className="nota">No es mou de 0. A la consola sí que puja.</p>
    </div>
  );
}

function ComptadorAmbEstat() {
  // useState retorna dues coses: el valor actual i la funció per canviar-lo.
  const [unitats, setUnitats] = useState(0);

  function afegeix() {
    // setUnitats fa dues feines: desa el valor nou i demana a React que redibuixi.
    setUnitats(unitats + 1);
  }

  return (
    <div className="caixa be">
      <h3>Amb useState</h3>
      <p className="xifra">{unitats}</p>
      <button onClick={afegeix}>Afegeix una unitat</button>
      <p className="nota">React recorda el valor entre dibuixats i repinta.</p>
    </div>
  );
}

export default function PerQueEstat() {
  return (
    <>
      <h1>1 · Per què cal l'estat</h1>
      <p className="subtitol">
        L'estat és la memòria d'un component: una dada que pot canviar i que, quan canvia, ha de fer
        redibuixar la pantalla.
      </p>
      <div className="dues-columnes">
        <ComptadorAmbVariable />
        <ComptadorAmbEstat />
      </div>
    </>
  );
}
