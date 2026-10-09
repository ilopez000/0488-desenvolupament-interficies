import type { ReactNode } from 'react';
import clsx from 'clsx';
import estils from './Avis.module.css';

type TipusAvis = 'info' | 'exit' | 'avis' | 'error';

/** Props de l'avís. */
export type AvisProps = {
  /** Tipus de missatge. Canvia el color, la icona i com l'anuncia el lector de pantalla. */
  tipus?: TipusAvis;
  /** Títol opcional, en negreta. */
  titol?: string;
  /** Contingut de l'avís. */
  children: ReactNode;
  /** Si es passa, apareix el botó de tancar i es crida quan es clica. */
  onTancar?: () => void;
};

const icones: Record<TipusAvis, string> = {
  info: 'i',
  exit: '✓',
  avis: '!',
  error: '✕',
};

/** Missatge destacat per informar l'usuari del resultat d'una acció. */
export function Avis({ tipus = 'info', titol, children, onTancar }: AvisProps) {
  const urgent = tipus === 'error' || tipus === 'avis';

  return (
    <div role={urgent ? 'alert' : 'status'} className={clsx(estils.caixa, estils[tipus])}>
      <span className={estils.icona} aria-hidden="true">
        {icones[tipus]}
      </span>
      <div className={estils.cos}>
        {titol && <p className={estils.titol}>{titol}</p>}
        {children}
      </div>
      {onTancar && (
        <button type="button" className={estils.tancar} onClick={onTancar} aria-label="Tanca l'avís">
          ×
        </button>
      )}
    </div>
  );
}
