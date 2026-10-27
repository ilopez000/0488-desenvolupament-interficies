import { useState } from 'react';
// Components de MUI: tots surten del mateix paquet, importats per nom.
import { Alert, Button, Chip, Rating, Stack, Typography } from '@mui/material';
// Icones de MUI: una icona per fitxer, importada per defecte.
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

export function PrimersComponents() {
  const [nota, setNota] = useState<number | null>(3);

  return (
    <Stack spacing={3}>
      {/* 1. Botons: la mateixa peça amb tres «variants» */}
      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
        <Button variant="contained" startIcon={<AddShoppingCartIcon />}>
          Afegeix a la cistella
        </Button>
        <Button variant="outlined">Desa per a més tard</Button>
        <Button variant="text" color="secondary">
          Més informació
        </Button>
        <Button variant="contained" color="error" startIcon={<DeleteIcon />}>
          Esborra
        </Button>
      </Stack>

      {/* 2. Xips: etiquetes petites */}
      <Stack direction="row" spacing={1}>
        <Chip label="Novetat" color="primary" />
        <Chip label="Samarretes" variant="outlined" />
        <Chip icon={<LocalShippingIcon />} label="Enviament gratuït" color="success" />
      </Stack>

      {/* 3. Valoració amb estrelles: un component controlat */}
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <Typography component="legend">La teva valoració:</Typography>
        <Rating value={nota} onChange={(_, nova) => setNota(nova)} />
        <Typography color="text.secondary">{nota ?? 0} de 5</Typography>
      </Stack>

      {/* 4. Missatges: quatre gravetats */}
      <Stack spacing={1}>
        <Alert severity="success">Comanda enviada correctament.</Alert>
        <Alert severity="info">El cupó PRAT10 caduca demà.</Alert>
        <Alert severity="warning">Només queden 2 motxilles.</Alert>
        <Alert severity="error">No s’ha pogut fer el pagament.</Alert>
      </Stack>
    </Stack>
  );
}
