import { useState } from 'react';
// Importació PER NOM: les claus { } diuen quines icones volem de la llibreria.
import { Heart, ShoppingCart, Star, Truck } from 'lucide-react';
import { productes, euros } from '../dades/productes';

/** Pinta 5 estrelles: les primeres «valor» plenes i la resta buides. */
function Estrelles({ valor }: { valor: number }) {
  return (
    <span className="estrelles" aria-label={`${valor} de 5 estrelles`} role="img">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={16}
          color="#f2a900"
          fill={n <= valor ? '#f2a900' : 'none'}
        />
      ))}
    </span>
  );
}

export function Icones() {
  const [favorits, setFavorits] = useState<number[]>([]);

  function canviaFavorit(id: number) {
    setFavorits((actuals) =>
      actuals.includes(id) ? actuals.filter((f) => f !== id) : [...actuals, id],
    );
  }

  return (
    <div className="targeta">
      <header className="capcalera">
        <strong>PratShop</strong>
        <span className="cistella">
          <Heart size={20} fill="white" />
          {favorits.length} favorits
          <ShoppingCart size={26} strokeWidth={2.5} aria-label="Cistella" />
        </span>
      </header>

      <p className="fila nota">
        <Truck size={18} /> Enviament gratuït a partir de 30 €
      </p>

      <ul className="llista">
        {productes.slice(0, 4).map((p) => {
          const esFavorit = favorits.includes(p.id);
          return (
            <li key={p.id} className="producte">
              <span>
                <strong>{p.nom}</strong> · {euros(p.preu)}
              </span>
              <Estrelles valor={p.valoracio} />
              <button
                className="boto-icona"
                aria-label={
                  esFavorit
                    ? `Treu ${p.nom} de favorits`
                    : `Afegeix ${p.nom} a favorits`
                }
                aria-pressed={esFavorit}
                onClick={() => canviaFavorit(p.id)}
              >
                <Heart color="#e1211d" fill={esFavorit ? '#e1211d' : 'none'} />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
