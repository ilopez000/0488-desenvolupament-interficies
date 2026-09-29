import { useState } from 'react';

type Formulari = {
  nom: string;
  correu: string;
  missatge: string;
};

// Els valors inicials en una constant: serveixen per començar i per buidar el formulari.
const BUIT: Formulari = { nom: '', correu: '', missatge: '' };

// La validació és una funció a part: es pot provar sola.
function validar(dades: Formulari): Partial<Formulari> {
  const errors: Partial<Formulari> = {};
  if (dades.nom.trim().length < 2) errors.nom = 'Escriu el teu nom (mínim 2 caràcters).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dades.correu)) errors.correu = 'El correu no té un format vàlid.';
  if (dades.missatge.trim().length < 10) errors.missatge = 'El missatge ha de tenir almenys 10 caràcters.';
  return errors;
}

export default function Contacte() {
  // Un sol objecte amb tots els camps, en lloc d'un useState per camp.
  const [dades, setDades] = useState<Formulari>(BUIT);
  const [errors, setErrors] = useState<Partial<Formulari>>({});
  const [enviat, setEnviat] = useState(false);

  // Crea un objecte nou i substitueix només el camp que toca.
  function canvia(camp: keyof Formulari, valor: string) {
    setDades({ ...dades, [camp]: valor });
  }

  function envia(esdeveniment: React.FormEvent<HTMLFormElement>) {
    esdeveniment.preventDefault(); // sense això, el navegador recarrega la pàgina
    const trobats = validar(dades);
    setErrors(trobats);
    if (Object.keys(trobats).length === 0) {
      setEnviat(true);
      setDades(BUIT);
    }
  }

  return (
    <main>
      <h1>Contacte</h1>
      <p className="subtitol">Escriu-nos i et respondrem en menys de 24 hores.</p>

      {enviat && <p className="correcte">Gràcies! Hem rebut el teu missatge.</p>}

      {/* noValidate: els missatges els posem nosaltres, no el navegador */}
      <form className="formulari" onSubmit={envia} noValidate>
        <label htmlFor="nom">Nom</label>
        <input
          id="nom"
          type="text"
          value={dades.nom}
          onChange={(esdeveniment) => canvia('nom', esdeveniment.target.value)}
        />
        {errors.nom && <p className="error">{errors.nom}</p>}

        <label htmlFor="correu">Correu electrònic</label>
        <input
          id="correu"
          type="email"
          value={dades.correu}
          onChange={(esdeveniment) => canvia('correu', esdeveniment.target.value)}
        />
        {errors.correu && <p className="error">{errors.correu}</p>}

        <label htmlFor="missatge">Missatge</label>
        <textarea
          id="missatge"
          rows={4}
          value={dades.missatge}
          onChange={(esdeveniment) => canvia('missatge', esdeveniment.target.value)}
        />
        {errors.missatge && <p className="error">{errors.missatge}</p>}

        <button type="submit">Envia</button>
      </form>
    </main>
  );
}
