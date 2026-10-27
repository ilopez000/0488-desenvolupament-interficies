import { useState } from 'react';
import { List, ListItem, ListItemText, Paper, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { BotoPratShop } from '../ui';
import { FormulariProducte, type ProducteNou } from '../components/FormulariProducte';
import { euros } from '../dades/productes';

export function FormulariDialeg() {
  const [obert, setObert] = useState(false); // el diàleg es veu o no
  const [desats, setDesats] = useState<ProducteNou[]>([]);

  return (
    <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
      <BotoPratShop icona={<AddIcon />} onClick={() => setObert(true)}>
        Nou producte
      </BotoPratShop>

      <Paper variant="outlined" sx={{ width: '100%' }}>
        {desats.length === 0 ? (
          <Typography sx={{ p: 2 }} color="text.secondary">
            Encara no has desat cap producte.
          </Typography>
        ) : (
          <List dense>
            {desats.map((p, i) => (
              <ListItem key={i} divider>
                <ListItemText
                  primary={p.nom}
                  secondary={`${p.categoria} · ${euros(p.preu)} · ${p.estoc} u.`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      <FormulariProducte
        obert={obert}
        onTanca={() => setObert(false)}
        onDesa={(p) => setDesats((actuals) => [...actuals, p])}
      />
    </Stack>
  );
}
