// Dades d'exemple del catàleg. En un projecte real vindrien d'una API;
// aquí són una constant perquè la sessió tracta de navegació, no de dades.

export type Producte = {
  id: number;        // identificador únic: és el que posarem a la URL
  nom: string;
  preu: number;
  descripcio: string;
};

export const productes: Producte[] = [
  { id: 1, nom: 'Samarreta PratFP', preu: 12.5, descripcio: 'Cotó orgànic, serigrafia a una tinta.' },
  { id: 2, nom: 'Sudadera DAM', preu: 29.9, descripcio: 'Amb caputxa i butxaca davantera.' },
  { id: 3, nom: 'Tassa de codi', preu: 8.0, descripcio: 'Ceràmica, apta per a rentaplats.' },
  { id: 4, nom: 'Llibreta de sprints', preu: 5.5, descripcio: 'Quadriculada, 80 fulls.' },
];

// Funció d'ajuda: busca un producte pel seu id.
// Retorna el producte o undefined si no existeix cap amb aquest id.
export function buscaProducte(id: number): Producte | undefined {
  return productes.find((p) => p.id === id);
}
