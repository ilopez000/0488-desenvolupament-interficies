// Els tipus de dades del projecte. Es defineixen un cop i es fan servir a tot arreu.

export type Categoria = 'perifèrics' | 'components' | 'accessoris';

export type Producte = {
  id: number;
  nom: string;
  categoria: Categoria;
  preu: number; // euros
  estoc: number; // unitats disponibles; 0 vol dir exhaurit
};

// Una línia del carro: el producte i quantes unitats se'n volen.
export type LiniaCarro = {
  producte: Producte;
  unitats: number;
};
