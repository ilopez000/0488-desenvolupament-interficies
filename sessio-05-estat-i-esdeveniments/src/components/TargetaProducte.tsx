import type { Producte } from '../tipus';

type Props = {
  producte: Producte;
  onAfegir: (producte: Producte) => void;
};

export default function TargetaProducte({ producte, onAfegir }: Props) {
  // Un booleà calculat, no un estat: surt de les dades del producte.
  const exhaurit = producte.estoc === 0;

  return (
    <article className="targeta" aria-label={producte.nom}>
      <span className="categoria">{producte.categoria}</span>
      <h3>{producte.nom}</h3>
      <p className="preu">{producte.preu.toFixed(2)} €</p>
      <p className="estoc">{exhaurit ? 'Sense estoc' : `${producte.estoc} unitats`}</p>
      {/* Li passem una funció que crida l'altra amb arguments, no la crida directa */}
      <button type="button" disabled={exhaurit} onClick={() => onAfegir(producte)}>
        {exhaurit ? 'Exhaurit' : 'Afegeix al carro'}
      </button>
    </article>
  );
}
