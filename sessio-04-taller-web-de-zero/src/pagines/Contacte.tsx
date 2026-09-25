import { useState } from 'react';
import Boto from '../components/Boto';
import estils from './Contacte.module.css';

export default function Contacte() {
  const [nom, setNom] = useState('');
  const [missatge, setMissatge] = useState('');
  const [enviat, setEnviat] = useState(false);

  // Si ja s'ha enviat, ensenyem la confirmació en comptes del formulari.
  if (enviat) {
    return (
      <>
        <h1>Contacte</h1>
        <p className={estils.avis}>
          Gràcies, {nom}. Hem rebut el teu missatge i et respondrem aviat.
        </p>
      </>
    );
  }

  return (
    <>
      <h1>Contacte</h1>

      <form
        className={estils.formulari}
        onSubmit={(e) => {
          e.preventDefault();   // sense això el navegador recarregaria la pàgina
          setEnviat(true);
        }}
      >
        <label className={estils.camp}>
          El teu nom
          <input value={nom} onChange={(e) => setNom(e.target.value)} required />
        </label>

        <label className={estils.camp}>
          Missatge
          <textarea
            rows={4}
            value={missatge}
            onChange={(e) => setMissatge(e.target.value)}
            required
          />
        </label>

        <Boto>Envia</Boto>
      </form>
    </>
  );
}
