import { useAmpladaFinestra } from '../hooks/useAmpladaFinestra';

export function MidaDeLaFinestra() {
  const amplada = useAmpladaFinestra();

  let vista = 'escriptori';
  if (amplada < 600) vista = 'mòbil';
  else if (amplada < 1024) vista = 'tauleta';

  return (
    <div className="targeta">
      <p>
        La finestra fa <strong>{amplada} px</strong>: vista de {vista}.
      </p>
      <p className="nota">Canvia la mida de la finestra i mira què passa.</p>
    </div>
  );
}
