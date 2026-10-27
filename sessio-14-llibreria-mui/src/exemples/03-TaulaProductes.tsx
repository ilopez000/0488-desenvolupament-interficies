import { Box, Rating } from '@mui/material';
// La taula no és a @mui/material: és a un paquet a part, MUI X.
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { productesInicials, euros, type Producte } from '../dades/productes';

// Les columnes: quin camp del producte mostren i com.
const columnes: GridColDef<Producte>[] = [
  { field: 'id', headerName: 'Id', width: 70 },
  { field: 'nom', headerName: 'Producte', flex: 1, minWidth: 200 },
  { field: 'categoria', headerName: 'Categoria', width: 130 },
  {
    field: 'preu',
    headerName: 'Preu',
    type: 'number',
    width: 110,
    valueFormatter: (valor: number) => euros(valor), // 14.9 → «14,90 €»
  },
  { field: 'estoc', headerName: 'Estoc', type: 'number', width: 90 },
  {
    field: 'valoracio',
    headerName: 'Valoració',
    width: 150,
    // renderCell: dins la cel·la hi posem un altre component
    renderCell: (params) => <Rating value={params.value} readOnly size="small" />,
  },
];

export function TaulaProductes() {
  return (
    <Box sx={{ height: 460, bgcolor: 'background.paper' }}>
      <DataGrid
        rows={productesInicials}
        columns={columnes}
        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        showToolbar
        label="Productes de PratShop"
      />
    </Box>
  );
}
