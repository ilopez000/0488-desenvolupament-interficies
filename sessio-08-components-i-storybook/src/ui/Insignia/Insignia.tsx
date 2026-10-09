import type { ReactNode } from 'react';
import clsx from 'clsx';
import estils from './Insignia.module.css';

/** Props de la insígnia. */
export type InsigniaProps = {
  /** Text de la insígnia. Com més curt, millor. */
  children: ReactNode;
  /** Color de la insígnia segons el que vol dir. */
  to?: 'neutre' | 'exit' | 'avis' | 'perill';
};

/** Etiqueta petita per destacar un estat: «Novetat», «−20 %», «Esgotat»… */
export function Insignia({ children, to = 'neutre' }: InsigniaProps) {
  return <span className={clsx(estils.insignia, estils[to])}>{children}</span>;
}
