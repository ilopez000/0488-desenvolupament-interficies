import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { tema } from './tema';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Tot el que hi ha a dins fa servir el tema de PratShop */}
    <ThemeProvider theme={tema}>
      {/* CssBaseline: «reset» de CSS de MUI (marges, fons, lletra...) */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
