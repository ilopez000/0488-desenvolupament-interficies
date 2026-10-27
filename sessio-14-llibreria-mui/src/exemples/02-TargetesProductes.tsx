import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Rating,
  Typography,
} from '@mui/material';
import { productesInicials, euros } from '../dades/productes';

export function TargetesProductes() {
  return (
    // Grid container: una graella de 12 columnes
    <Grid container spacing={2}>
      {productesInicials.map((p) => (
        // Cada targeta ocupa 12 columnes al mòbil, 6 a la tauleta i 3 a l'ordinador
        <Grid key={p.id} size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            variant="outlined"
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            {/* sx: CSS escrit com un objecte, amb accés al tema */}
            <Box sx={{ height: 90, bgcolor: 'secondary.main', color: 'white', p: 2 }}>
              <Typography variant="overline">{p.categoria}</Typography>
            </Box>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" component="h3" gutterBottom>
                {p.nom}
              </Typography>
              <Rating value={p.valoracio} readOnly size="small" />
              <Typography variant="h5" color="primary" sx={{ mt: 1, fontWeight: 700 }}>
                {euros(p.preu)}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
              {p.estoc === 0 ? (
                <Chip label="Esgotat" size="small" />
              ) : (
                <Chip label={`${p.estoc} en estoc`} size="small" color="success" />
              )}
              <Button size="small" variant="contained" disabled={p.estoc === 0}>
                Compra
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
