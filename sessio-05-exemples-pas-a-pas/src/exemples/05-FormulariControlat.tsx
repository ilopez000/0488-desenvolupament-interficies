import { useState } from 'react';

// EXEMPLE 5 · Formulari controlat amb validació
// «Controlat» vol dir que el valor de cada camp viu a l'estat de React:
//   value={...}     → el camp mostra el que diu l'estat
//   onChange={...}  → cada tecla actualitza l'estat
// Si hi ha value però no onChange, el camp queda bloquejat.

type Dades = { nom: string; correu: string; unitats: string; accepta: boolean };
type Errors = Partial<Record<keyof Dades, string>>;

const BUIT: Dades = { nom: '', correu: '', unitats: '1', accepta: false };

// La validació és una funció pura: rep dades i torna errors. No toca l'estat.
function validar(dades: Dades): Errors {
  const errors: Errors = {};
  if (dades.nom.trim().length < 2) errors.nom = 'Escriu el teu nom (mínim 2 caràcters).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dades.correu)) errors.correu = 'El correu no té un format vàlid.';
  const unitats = Number(dades.unitats);
  if (!Number.isInteger(unitats) || unitats < 1 || unitats > 10) errors.unitats = 'Entre 1 i 10 unitats.';
  if (!dades.accepta) errors.accepta = 'Has d\'acceptar les condicions.';
  return errors;
}

export default function FormulariControlat() {
  const [dades, setDades] = useState<Dades>(BUIT);
  const [errors, setErrors] = useState<Errors>({});
  const [enviat, setEnviat] = useState<Dades | null>(null);

  // Un sol manegador per a tots els camps: copia l'objecte i canvia només el camp que toca.
  function canvia<Camp extends keyof Dades>(camp: Camp, valor: Dades[Camp]) {
    setDades({ ...dades, [camp]: valor });
  }

  function envia(esdeveniment: React.FormEvent<HTMLFormElement>) {
    esdeveniment.preventDefault();
    const trobats = validar(dades);
    setErrors(trobats);
    if (Object.keys(trobats).length === 0) {
      setEnviat(dades);
      setDades(BUIT); // com que és controlat, buidar l'estat buida els camps
    } else {
      setEnviat(null);
    }
  }

  return (
    <>
      <h1>5 · Formulari controlat amb validació</h1>
      <p className="subtitol">Reserva d'un producte: quatre camps, un sol objecte d'estat.</p>

      <div className="dues-columnes">
        {/* noValidate: els missatges d'error els posem nosaltres, no el navegador. */}
        <form className="caixa formulari" onSubmit={envia} noValidate>
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

          <label htmlFor="unitats">Unitats</label>
          <input
            id="unitats"
            type="number"
            min={1}
            max={10}
            value={dades.unitats}
            onChange={(esdeveniment) => canvia('unitats', esdeveniment.target.value)}
          />
          {errors.unitats && <p className="error">{errors.unitats}</p>}

          {/* Una casella es controla amb checked, no amb value. */}
          <label className="casella">
            <input
              type="checkbox"
              checked={dades.accepta}
              onChange={(esdeveniment) => canvia('accepta', esdeveniment.target.checked)}
            />
            Accepto les condicions de la reserva
          </label>
          {errors.accepta && <p className="error">{errors.accepta}</p>}

          <button type="submit">Reserva</button>
        </form>

        <div className="caixa">
          <h3>L'estat, en directe</h3>
          {/* Escriu al formulari i mira com canvia l'objecte a cada tecla. */}
          <pre>{JSON.stringify(dades, null, 2)}</pre>
          {enviat && (
            <p className="correcte">
              Reserva feta: {enviat.unitats} unitat(s) a nom de {enviat.nom}.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
