import { useState, type FormEvent } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import { BotoPratShop } from '../ui';
import { categories, type Categoria, type Producte } from '../dades/productes';

/** Un producte nou encara no té id: l'hi posarà qui el desi. */
export type ProducteNou = Omit<Producte, 'id'>;

type Props = {
  obert: boolean;
  onTanca: () => void;
  onDesa: (producte: ProducteNou) => void;
};

export function FormulariProducte({ obert, onTanca, onDesa }: Props) {
  // Els camps del formulari es guarden com a text, tal com els escriu l'usuari
  const [nom, setNom] = useState('');
  const [categoria, setCategoria] = useState<Categoria>('Samarretes');
  const [preu, setPreu] = useState('');
  const [estoc, setEstoc] = useState('');

  function buida() {
    setNom('');
    setCategoria('Samarretes');
    setPreu('');
    setEstoc('');
  }

  function envia(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // que la pàgina no es recarregui
    onDesa({ nom, categoria, preu: Number(preu), estoc: Number(estoc), valoracio: 0 });
    buida();
    onTanca();
  }

  return (
    <Dialog open={obert} onClose={onTanca} fullWidth maxWidth="xs">
      <form onSubmit={envia}>
        <DialogTitle>Nou producte</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label="Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              autoFocus
            />
            <TextField
              select
              label="Categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value as Categoria)}
            >
              {categories.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Preu (€)"
              type="number"
              value={preu}
              onChange={(e) => setPreu(e.target.value)}
              slotProps={{ htmlInput: { min: 0, step: 0.01 } }}
            />
            <TextField
              label="Estoc"
              type="number"
              value={estoc}
              onChange={(e) => setEstoc(e.target.value)}
              slotProps={{ htmlInput: { min: 0, step: 1 } }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <BotoPratShop variant="secundari" onClick={onTanca}>
            Cancel·la
          </BotoPratShop>
          <BotoPratShop type="submit">Desa</BotoPratShop>
        </DialogActions>
      </form>
    </Dialog>
  );
}
