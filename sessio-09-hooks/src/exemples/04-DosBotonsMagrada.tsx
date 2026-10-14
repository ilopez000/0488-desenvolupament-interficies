import { useComptador } from '../hooks/useComptador';

function BotoMagrada({ producte }: { producte: string }) {
  const { valor, sumar, reiniciar } = useComptador();

  return (
    <div className="targeta">
      <p>
        {producte}: <strong>{valor}</strong> m'agrada
      </p>
      <div className="fila">
        <button onClick={sumar}>M'agrada</button>
        <button onClick={reiniciar}>Torna a zero</button>
      </div>
    </div>
  );
}

export function DosBotonsMagrada() {
  return (
    <>
      <BotoMagrada producte="Samarreta PratFP" />
      <BotoMagrada producte="Gorra PratFP" />
    </>
  );
}
