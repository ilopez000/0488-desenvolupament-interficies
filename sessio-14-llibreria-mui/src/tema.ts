import { createTheme } from '@mui/material/styles';

// El TEMA és el lloc on diem a MUI els colors, la lletra i les formes
// de PratShop. Tots els components de MUI el llegeixen.
export const tema = createTheme({
  palette: {
    primary: { main: '#E1211D' }, // vermell PratShop
    secondary: { main: '#1F2A30' }, // gris fosc
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: 'system-ui, "Segoe UI", Roboto, sans-serif',
    button: { textTransform: 'none', fontWeight: 700 }, // botons sense MAJÚSCULES
  },
});
