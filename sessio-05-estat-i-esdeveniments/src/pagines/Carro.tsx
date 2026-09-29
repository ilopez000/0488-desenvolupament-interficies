import { Link } from 'react-router';
import type { LiniaCarro } from '../tipus';

type Props = {
  linies: LiniaCarro[];
  onCanviarUnitats: (id: number, unitats: number) => void;
  onBuidar: () => void;
};

export default function Carro({ linies, onCanviarUnitats, onBuidar }: Props) {
  // El total és estat derivat: es calcula, no es guarda.
  const total = linies.reduce((suma, linia) => suma + linia.producte.preu * linia.unitats, 0);

  if (linies.length === 0) {
    return (
      <main>
        <h1>El carro</h1>
        <p className="buit">
          El carro és buit. <Link to="/">Torna al catàleg</Link>
        </p>
      </main>
    );
  }

  return (
    <main>
      <h1>El carro</h1>
      <table className="taula">
        <thead>
          <tr>
            <th>Producte</th>
            <th>Preu</th>
            <th>Unitats</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {linies.map((linia) => (
            <tr key={linia.producte.id}>
              <td>{linia.producte.nom}</td>
              <td>{linia.producte.preu.toFixed(2)} €</td>
              <td>
                <button
                  type="button"
                  aria-label={`Una unitat menys de ${linia.producte.nom}`}
                  onClick={() => onCanviarUnitats(linia.producte.id, linia.unitats - 1)}
                >
                  −
                </button>
                <span className="unitats">{linia.unitats}</span>
                <button
                  type="button"
                  aria-label={`Una unitat més de ${linia.producte.nom}`}
                  onClick={() => onCanviarUnitats(linia.producte.id, linia.unitats + 1)}
                >
                  +
                </button>
              </td>
              <td>{(linia.producte.preu * linia.unitats).toFixed(2)} €</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={3}>Total</th>
            <th>{total.toFixed(2)} €</th>
          </tr>
        </tfoot>
      </table>
      <button type="button" className="secundari" onClick={onBuidar}>
        Buida el carro
      </button>
    </main>
  );
}
