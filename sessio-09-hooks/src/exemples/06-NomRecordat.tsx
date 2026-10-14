import { useLocalStorage } from '../hooks/useLocalStorage';

export function NomRecordat() {
  const [nom, setNom] = useLocalStorage('sessio9-nom', '');
  const [novetats, setNovetats] = useLocalStorage('sessio9-novetats', false);

  return (
    <div className="targeta">
      <label>
        Com et dius?
        <input value={nom} onChange={(e) => setNom(e.target.value)} />
      </label>
      <label className="fila">
        <input
          type="checkbox"
          checked={novetats}
          onChange={(e) => setNovetats(e.target.checked)}
        />
        Vull rebre les novetats
      </label>
      <p>
        Hola, <strong>{nom || 'desconegut'}</strong>!
        {novetats ? ' Rebràs les novetats.' : ' No rebràs novetats.'}
      </p>
      <p className="nota">Recarrega la pàgina: les dades hi continuen.</p>
    </div>
  );
}
