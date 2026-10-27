// Dades de prova de PratShop (no venen de cap API: són fixes).

export type Categoria = 'samarretes' | 'tasses' | 'adhesius' | 'motxilles';

export type Producte = {
  id: number;
  nom: string;
  preu: number; // en euros
  categoria: Categoria;
  valoracio: number; // d'1 a 5 estrelles
};

// prettier-ignore
export const productes: Producte[] = [
  { id: 1, nom: 'Samarreta PratShop',      preu: 14.9, categoria: 'samarretes', valoracio: 5 },
  { id: 2, nom: 'Tassa «Hola, món»',       preu: 8.5,  categoria: 'tasses',     valoracio: 4 },
  { id: 3, nom: 'Paquet d’adhesius React', preu: 3.2,  categoria: 'adhesius',   valoracio: 4 },
  { id: 4, nom: 'Motxilla DAM',            preu: 29.9, categoria: 'motxilles',  valoracio: 3 },
  { id: 5, nom: 'Samarreta «npm install»', preu: 15.5, categoria: 'samarretes', valoracio: 4 },
  { id: 6, nom: 'Tassa TypeScript',        preu: 9.0,  categoria: 'tasses',     valoracio: 5 },
];

/** Formata un número com a preu en euros: 14.9 → «14,90 €». */
export function euros(preu: number): string {
  return preu.toLocaleString('ca-ES', { style: 'currency', currency: 'EUR' });
}
