import { Link } from 'react-router';
import { destinacions } from '../dades/destinacions';
import TargetaDestinacio from '../components/TargetaDestinacio';
import estils from './Inici.module.css';

export default function Inici() {
  // slice(0, 2) agafa només les dues primeres destinacions: són les "destacades".
  const destacades = destinacions.slice(0, 2);

  return (
    <>
      <section className={estils.hero}>
        <h1>Viatges curts, ciutats que enamoren</h1>
        <p className={estils.reclam}>
          Quatre escapades triades per l'equip de PratViatges, amb tot organitzat
          i sense sorpreses al preu.
        </p>
        <Link to="/destinacions">Mira totes les destinacions</Link>
      </section>

      <h2 style={{ marginTop: 'var(--espai-5)' }}>Aquest mes destaquem</h2>

      <div className={estils.graella}>
        {destacades.map((d) => (
          <TargetaDestinacio key={d.id} destinacio={d} />
        ))}
      </div>
    </>
  );
}
