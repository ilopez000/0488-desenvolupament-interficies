import type { Producte } from '../tipus';

// Vuit productes d'exemple. No són estat: no canvien mai durant l'execució.
export const productes: Producte[] = [
  { id: 1, nom: 'Teclat mecànic compacte', categoria: 'perifèrics', preu: 79.9, estoc: 12 },
  { id: 2, nom: 'Ratolí sense fil', categoria: 'perifèrics', preu: 34.5, estoc: 25 },
  { id: 3, nom: 'Monitor 27" IPS', categoria: 'perifèrics', preu: 219, estoc: 4 },
  { id: 4, nom: 'SSD NVMe 1 TB', categoria: 'components', preu: 89, estoc: 30 },
  { id: 5, nom: 'Memòria RAM 16 GB', categoria: 'components', preu: 54.9, estoc: 0 },
  { id: 6, nom: 'Targeta gràfica', categoria: 'components', preu: 329, estoc: 2 },
  { id: 7, nom: 'Auriculars amb micròfon', categoria: 'accessoris', preu: 45, estoc: 18 },
  { id: 8, nom: 'Suport per a portàtil', categoria: 'accessoris', preu: 24.9, estoc: 0 },
];
