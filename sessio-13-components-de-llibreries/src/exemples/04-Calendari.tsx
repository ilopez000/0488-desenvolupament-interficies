import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
// L'idioma ve d'un altre «punt d'entrada» de la mateixa llibreria.
import { ca } from 'react-day-picker/locale';
// Els estils de la llibreria: sense aquesta línia el calendari surt desmuntat.
import 'react-day-picker/style.css';

export function Calendari() {
  // undefined = encara no s'ha triat cap dia.
  const [dia, setDia] = useState<Date | undefined>(undefined);
  // Com volem escriure la data: «dimecres, 28 d’octubre»
  const opcions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  };

  return (
    <div className="targeta">
      <p>Tria quin dia passaràs a recollir la comanda per la botiga del Prat.</p>

      <DayPicker mode="single" selected={dia} onSelect={setDia} locale={ca} />

      <p className="resum">
        {dia
          ? `Recollida: ${dia.toLocaleDateString('ca-ES', opcions)}`
          : 'Encara no has triat cap dia.'}
      </p>
    </div>
  );
}
