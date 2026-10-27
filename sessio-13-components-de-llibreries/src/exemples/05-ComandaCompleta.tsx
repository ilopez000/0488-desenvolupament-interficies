import { useState } from 'react';
import { CalendarDays, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import QRCode from 'react-qr-code';
import { DayPicker } from 'react-day-picker';
import { ca } from 'react-day-picker/locale';
import 'react-day-picker/style.css';
import { productes, euros, type Producte } from '../dades/productes';

/** Una línia de la cistella: quin producte i quantes unitats. */
type Linia = { producte: Producte; quantitat: number };

export function ComandaCompleta() {
  const [cistella, setCistella] = useState<Linia[]>([]);
  const [dia, setDia] = useState<Date | undefined>(undefined);
  const [codi, setCodi] = useState<string | null>(null); // null = comanda no confirmada

  const total = cistella.reduce((suma, l) => suma + l.producte.preu * l.quantitat, 0);

  function afegeix(p: Producte) {
    setCistella((actual) => {
      const existeix = actual.find((l) => l.producte.id === p.id);
      if (existeix) {
        return actual.map((l) =>
          l.producte.id === p.id ? { ...l, quantitat: l.quantitat + 1 } : l,
        );
      }
      return [...actual, { producte: p, quantitat: 1 }];
    });
    setCodi(null); // si la cistella canvia, cal tornar a confirmar
    toast.success(`${p.nom} afegit a la cistella`);
  }

  function treu(id: number) {
    setCistella((actual) => actual.filter((l) => l.producte.id !== id));
    setCodi(null);
  }

  function confirma() {
    const numero = Math.floor(Math.random() * 9000) + 1000; // número de 4 xifres
    setCodi(`PRATSHOP-${numero}`);
    toast.success('Comanda confirmada', { description: 'Ensenya el QR a la botiga.' });
  }

  return (
    <div className="comanda">
      {/* 1. Catàleg */}
      <section className="targeta">
        <h3>Catàleg</h3>
        <ul className="llista">
          {productes.map((p) => (
            <li key={p.id} className="producte">
              <span>
                <strong>{p.nom}</strong> · {euros(p.preu)}
              </span>
              <button onClick={() => afegeix(p)}>
                <Plus size={16} /> Afegeix
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* 2. Cistella */}
      <section className="targeta">
        <h3 className="fila">
          <ShoppingCart size={20} /> Cistella
        </h3>
        {cistella.length === 0 ? (
          <p className="nota">La cistella és buida.</p>
        ) : (
          <ul className="llista">
            {cistella.map((l) => (
              <li key={l.producte.id} className="producte">
                <span>
                  {l.quantitat} × {l.producte.nom}
                </span>
                <button
                  className="boto-icona"
                  aria-label={`Treu ${l.producte.nom}`}
                  onClick={() => treu(l.producte.id)}
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className="gran">Total: {euros(total)}</p>
      </section>

      {/* 3. Dia de recollida */}
      <section className="targeta">
        <h3 className="fila">
          <CalendarDays size={20} /> Dia de recollida
        </h3>
        <DayPicker mode="single" selected={dia} onSelect={setDia} locale={ca} />
        <button
          className="principal"
          disabled={cistella.length === 0 || !dia}
          onClick={confirma}
        >
          Confirma la comanda
        </button>
      </section>

      {/* 4. Tiquet (només quan la comanda està confirmada) */}
      {codi && dia && (
        <section className="targeta tiquet">
          <QRCode value={codi} size={140} title={`Codi QR de la comanda ${codi}`} />
          <div>
            <p className="gran">{codi}</p>
            <p>Recollida: {dia.toLocaleDateString('ca-ES')}</p>
            <p>Import: {euros(total)}</p>
          </div>
        </section>
      )}
    </div>
  );
}
