import Button from '@mui/material/Button';
import type { ReactNode } from 'react';

// L'API del NOSTRE botó: poques props i amb noms nostres.
// L'aplicació no sap que a dins hi ha un botó de MUI.
type PropsBoto = {
  variant?: 'principal' | 'secundari';
  icona?: ReactNode;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
};

export function BotoPratShop({
  variant = 'principal',
  icona,
  children,
  ...resta
}: PropsBoto) {
  // Traduïm la nostra variant a les props de MUI
  const esPrincipal = variant === 'principal';

  return (
    <Button
      variant={esPrincipal ? 'contained' : 'outlined'}
      color={esPrincipal ? 'primary' : 'secondary'}
      startIcon={icona}
      {...resta}
    >
      {children}
    </Button>
  );
}
