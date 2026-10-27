import { useState, type ComponentType } from 'react';
import { AppBar, Box, Container, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { PrimersComponents } from './exemples/01-PrimersComponents';
import { TargetesProductes } from './exemples/02-TargetesProductes';
import { TaulaProductes } from './exemples/03-TaulaProductes';
import { FormulariDialeg } from './exemples/04-FormulariDialeg';
import { TaulerGestio } from './exemples/05-TaulerGestio';

type Exemple = {
  titol: string;
  idea: string;
  fitxer: string;
  Component: ComponentType;
};

const exemples: Exemple[] = [
  {
    titol: '1 · Primers components',
    idea: 'Botons, xips, valoració i avisos: tot ve del mateix paquet i segueix el tema.',
    fitxer: 'src/exemples/01-PrimersComponents.tsx',
    Component: PrimersComponents,
  },
  {
    titol: '2 · Targetes',
    idea: 'Grid per repartir l’espai, Card per a cada producte i sx per retocar l’estil.',
    fitxer: 'src/exemples/02-TargetesProductes.tsx',
    Component: TargetesProductes,
  },
  {
    titol: '3 · Taula',
    idea: 'DataGrid de MUI X: ordenar, filtrar i paginar sense programar-ho.',
    fitxer: 'src/exemples/03-TaulaProductes.tsx',
    Component: TaulaProductes,
  },
  {
    titol: '4 · Formulari',
    idea: 'Un diàleg amb camps de text controlats i el nostre BotoPratShop.',
    fitxer: 'src/components/FormulariProducte.tsx',
    Component: FormulariDialeg,
  },
  {
    titol: '5 · Tauler de gestió',
    idea: 'Tot junt: el codi de partida de les ampliacions.',
    fitxer: 'src/exemples/05-TaulerGestio.tsx',
    Component: TaulerGestio,
  },
];

export default function App() {
  const [actiu, setActiu] = useState(0);
  const { titol, idea, fitxer, Component } = exemples[actiu];

  return (
    <>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <StorefrontIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            PratShop · Sessió 14 · Llibreria MUI
          </Typography>
        </Toolbar>
        <Tabs
          value={actiu}
          onChange={(_, nou: number) => setActiu(nou)}
          variant="scrollable"
          textColor="inherit"
          indicatorColor="primary"
          aria-label="Exemples"
        >
          {exemples.map((e) => (
            <Tab key={e.titol} label={e.titol} />
          ))}
        </Tabs>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" component="h2">
            {titol}
          </Typography>
          <Typography>{idea}</Typography>
          <Typography variant="body2" color="text.secondary">
            Codi: <code>{fitxer}</code>
          </Typography>
        </Box>
        <Component key={titol} />
      </Container>
    </>
  );
}
