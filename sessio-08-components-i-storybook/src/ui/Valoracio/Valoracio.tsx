import clsx from 'clsx';
import estils from './Valoracio.module.css';

/** Props de la valoració amb estrelles. */
export type ValoracioProps = {
  /** Puntuació actual, de 0 a `maxim`. */
  valor: number;
  /** Nombre d'estrelles. */
  maxim?: number;
  /**
   * Es crida amb la nova puntuació quan l'usuari clica una estrella.
   * Si no es passa, la valoració és només de lectura.
   */
  onCanvi?: (nouValor: number) => void;
  /** Nom que llegeix el lector de pantalla. */
  etiqueta?: string;
};

/** Valoració d'1 a `maxim` estrelles, de lectura o editable. */
export function Valoracio({ valor, maxim = 5, onCanvi, etiqueta = 'Valoració' }: ValoracioProps) {
  const estrelles = Array.from({ length: maxim }, (_, i) => i + 1);

  // Sense onCanvi: només es mostra. Tot el grup és una sola imatge per al lector de pantalla.
  if (!onCanvi) {
    return (
      <span className={estils.valoracio} role="img" aria-label={`${etiqueta}: ${valor} de ${maxim}`}>
        {estrelles.map((n) => (
          <span key={n} className={clsx(estils.estrella, n <= valor && estils.plena)} aria-hidden="true">
            ★
          </span>
        ))}
      </span>
    );
  }

  // Amb onCanvi: cada estrella és un botó que avisa el pare.
  return (
    <div className={estils.valoracio} role="group" aria-label={etiqueta}>
      {estrelles.map((n) => (
        <button
          key={n}
          type="button"
          className={clsx(estils.estrella, estils.clicable, n <= valor && estils.plena)}
          aria-label={`${n} de ${maxim}`}
          aria-pressed={n === valor}
          onClick={() => onCanvi(n)}
        >
          ★
        </button>
      ))}
    </div>
  );
}
