import { useEffect, useState } from 'react';

// Dataset «Equipaments de Catalunya» del portal de dades obertes de la Generalitat
const API = 'https://analisi.transparenciacatalunya.cat/resource/8gmd-gz7i.json';

const MUNICIPIS = [
  { codi: '81691', nom: 'El Prat de Llobregat' },
  { codi: '80734', nom: 'Cornellà de Llobregat' },
  { codi: '82009', nom: 'Sant Boi de Llobregat' },
  { codi: '81017', nom: "L'Hospitalet de Llobregat" },
  { codi: '80193', nom: 'Barcelona' },
];

type Equipament = {
  idequipament: string;
  nom: string;
  categoria?: string; // alguns equipaments no en tenen
  via?: string;
};

export function EquipamentsMunicipi() {
  const [codi, setCodi] = useState('81691');
  const [equipaments, setEquipaments] = useState<Equipament[]>([]);
  const [carregant, setCarregant] = useState(true);
  const [error, setError] = useState('');

  // La consulta, escrita amb els paràmetres de l'API Socrata (SoQL)
  const parametres = new URLSearchParams({
    $select: 'idequipament,nom,categoria,via',
    $where: `codi_municipi='${codi}'`,
    $order: 'nom',
    $limit: '10',
  });
  const url = `${API}?${parametres}`;

  useEffect(() => {
    let ignorar = false; // es posa a true si l'usuari canvia de municipi abans que arribi la resposta

    async function carregar() {
      try {
        const resposta = await fetch(url);
        if (!resposta.ok) throw new Error(`El servidor ha respost amb l'error ${resposta.status}`);
        const dades: Equipament[] = await resposta.json();
        if (!ignorar) setEquipaments(dades);
      } catch (err) {
        if (!ignorar) setError(err instanceof Error ? err.message : 'Error desconegut');
      } finally {
        if (!ignorar) setCarregant(false);
      }
    }

    carregar();

    return () => {
      ignorar = true; // neteja: la resposta antiga ja no ens interessa
    };
  }, [url]);

  function canviarMunicipi(nouCodi: string) {
    setCodi(nouCodi);
    setCarregant(true);
    setError('');
  }

  return (
    <div className="targeta">
      <label>
        Municipi
        <select value={codi} onChange={(e) => canviarMunicipi(e.target.value)}>
          {MUNICIPIS.map((m) => (
            <option key={m.codi} value={m.codi}>
              {m.nom}
            </option>
          ))}
        </select>
      </label>

      <p className="nota">
        Petició:{' '}
        <a href={url} target="_blank" rel="noreferrer">
          obre la URL al navegador
        </a>
      </p>

      {carregant && <p>Carregant…</p>}
      {error && <p className="error">{error}</p>}

      {!carregant && !error && (
        <ul className="llista">
          {equipaments.map((e) => (
            <li key={e.idequipament}>
              <strong>{e.nom}</strong>
              <span>{e.categoria ? e.categoria.split('|')[0] : 'Sense categoria'}</span>
              {e.via && <span className="nota">{e.via}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
