import type { ReactNode } from 'react';
import estils from './Boto.module.css';

// Les props són els paràmetres del component.
// "children" és el contingut que escrivim entre <Boto> i </Boto>.
type Props = {
  children: ReactNode;
  variant?: 'primari' | 'secundari';   // el ? vol dir que es pot ometre
  onClick?: () => void;
};

export default function Boto({ children, variant = 'primari', onClick }: Props) {
  const classes =
    variant === 'secundari' ? `${estils.boto} ${estils.secundari}` : estils.boto;

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
