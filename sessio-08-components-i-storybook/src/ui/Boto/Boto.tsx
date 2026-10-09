import type { ComponentProps, ReactNode } from 'react';
import clsx from 'clsx';
import estils from './Boto.module.css';

/** Props del botó de PratShop UI. */
export type BotoProps = ComponentProps<'button'> & {
  /** Aspecte del botó. */
  variant?: 'primari' | 'secundari' | 'perill';
  /** Mida del botó. */
  mida?: 'petita' | 'normal' | 'gran';
  /** Mentre val `true`, el botó mostra un indicador i no es pot clicar. */
  carregant?: boolean;
  /** Icona opcional que es mostra abans del text. */
  icona?: ReactNode;
  /** Si val `true`, el botó ocupa tot l'ample del contenidor. */
  ampleComplet?: boolean;
};

/**
 * Botó de PratShop UI. Accepta totes les props d'un `<button>` normal
 * (`onClick`, `disabled`, `type`, `aria-*`…) i hi afegeix variants i mides.
 */
export function Boto({
  variant = 'primari',
  mida = 'normal',
  carregant = false,
  icona,
  ampleComplet = false,
  type = 'button',
  disabled,
  className,
  children,
  ...resta
}: BotoProps) {
  return (
    <button
      type={type}
      disabled={disabled || carregant}
      aria-busy={carregant || undefined}
      className={clsx(
        estils.boto,
        estils[variant],
        estils[mida],
        ampleComplet && estils.ampleComplet,
        className,
      )}
      {...resta}
    >
      {carregant && <span className={estils.indicador} aria-hidden="true" />}
      {!carregant && icona && <span aria-hidden="true">{icona}</span>}
      {children}
    </button>
  );
}
