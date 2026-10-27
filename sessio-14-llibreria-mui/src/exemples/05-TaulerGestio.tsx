import { useState } from 'react';
import { Box, Paper, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { BotoPratShop } from '../ui';
import { FormulariProducte, type ProducteNou } from '../components/FormulariProducte';
import { productesInicials, euros, type Producte } from '../dades/productes';

const columnes: GridColDef<Producte>[] = [
  { field: 'nom', headerName: 'Producte', flex: 1, minWidth: 200 },
  { field: 'categoria', headerName: 'Categoria', width: 130 },
  {
    field: 'preu',
    headerName: 'Preu',
    type: 'number',
    width: 110,
    valueFormatter: (valor: number) => euros(valor),
  },
  { field: 'estoc', headerName: 'Estoc', type: 'number', width: 100 },
];

export function TaulerGestio() {
  const [productes, setProductes] = useState<Producte[]>(productesInicials);
  const [formulariObert, setFormulariObert] = useState(false);

  const esgotats = productes.filter((p) => p.estoc === 0).length;

  function afegeix(nou: ProducteNou) {
    // id nou = el més gran que hi hagi + 1
    const id = Math.max(0, ...productes.map((p) => p.id)) + 1;
    setProductes((actuals) => [...actuals, { ...nou, id }]);
  }

  return (
    <Stack spacing={2}>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' } }}
        >
          <Box>
            <Typography variant="h6" component="h3">
              Productes de la botiga
            </Typography>
            <Typography color="text.secondary">
              {productes.length} productes · {esgotats} esgotats
            </Typography>
          </Box>
          <BotoPratShop icona={<AddIcon />} onClick={() => setFormulariObert(true)}>
            Nou producte
          </BotoPratShop>
        </Stack>
      </Paper>

      <Box sx={{ height: 480, bgcolor: 'background.paper' }}>
        <DataGrid
          rows={productes}
          columns={columnes}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          pageSizeOptions={[5, 10, 25]}
          showToolbar
          label="Productes"
        />
      </Box>

      <FormulariProducte
        obert={formulariObert}
        onTanca={() => setFormulariObert(false)}
        onDesa={afegeix}
      />
    </Stack>
  );
}
