// Dades de prova de PratShop per al tauler de gestió (no venen de cap API).

export type Categoria = 'Samarretes' | 'Tasses' | 'Adhesius' | 'Motxilles';

export const categories: Categoria[] = [
  'Samarretes',
  'Tasses',
  'Adhesius',
  'Motxilles',
];

export type Producte = {
  id: number;
  nom: string;
  categoria: Categoria;
  preu: number; // en euros
  estoc: number; // unitats al magatzem
  valoracio: number; // d'1 a 5
};

// prettier-ignore
export const productesInicials: Producte[] = [
  { id: 1, nom: 'Samarreta PratShop',      categoria: 'Samarretes', preu: 14.9, estoc: 32, valoracio: 5 },
  { id: 2, nom: 'Tassa «Hola, món»',       categoria: 'Tasses',     preu: 8.5,  estoc: 4,  valoracio: 4 },
  { id: 3, nom: 'Paquet d’adhesius React', categoria: 'Adhesius',   preu: 3.2,  estoc: 120, valoracio: 4 },
  { id: 4, nom: 'Motxilla DAM',            categoria: 'Motxilles',  preu: 29.9, estoc: 0,  valoracio: 3 },
  { id: 5, nom: 'Samarreta «npm install»', categoria: 'Samarretes', preu: 15.5, estoc: 9,  valoracio: 4 },
  { id: 6, nom: 'Tassa TypeScript',        categoria: 'Tasses',     preu: 9.0,  estoc: 15, valoracio: 5 },
  { id: 7, nom: 'Adhesiu «It works!»',     categoria: 'Adhesius',   preu: 1.5,  estoc: 0,  valoracio: 2 },
  { id: 8, nom: 'Motxilla Vite',           categoria: 'Motxilles',  preu: 34.0, estoc: 6,  valoracio: 5 },
];

/** Formata un número com a preu en euros: 14.9 → «14,90 €». */
export function euros(preu: number): string {
  return preu.toLocaleString('ca-ES', { style: 'currency', currency: 'EUR' });
}
