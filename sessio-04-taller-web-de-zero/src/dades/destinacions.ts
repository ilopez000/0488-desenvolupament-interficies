// Dades de mostra. En un projecte real vindrien d'una API o d'una base de dades;
// aquí són una constant perquè el taller tracta de components i navegació.

export type Destinacio = {
  id: number;
  nom: string;
  pais: string;
  preu: number;      // euros per persona
  resum: string;
  descripcio: string;
};

export const destinacions: Destinacio[] = [
  {
    id: 1,
    nom: 'Lisboa',
    pais: 'Portugal',
    preu: 189,
    resum: 'Tramvies grocs, miradors i pastissos de Belém.',
    descripcio:
      'Tres dies per Alfama i Belém, amb vistes des del mirador de Santa Llúcia i una tarda a Sintra.',
  },
  {
    id: 2,
    nom: 'Praga',
    pais: 'Txèquia',
    preu: 245,
    resum: 'El pont de Carles a primera hora, quan encara no hi ha ningú.',
    descripcio:
      'Quatre dies al barri antic, el castell i el barri jueu, amb una excursió a Kutná Hora.',
  },
  {
    id: 3,
    nom: 'Nàpols',
    pais: 'Itàlia',
    preu: 210,
    resum: 'Pizza, Pompeia i el Vesuvi al fons.',
    descripcio:
      'Tres dies entre el centre històric i la costa, amb visita a Pompeia i pujada al Vesuvi.',
  },
  {
    id: 4,
    nom: 'Edimburg',
    pais: 'Escòcia',
    preu: 275,
    resum: 'Carrerons, castell i molta boira.',
    descripcio:
      'Quatre dies per la Royal Mile i el castell, amb una excursió d’un dia a les Highlands.',
  },
];

// Busca una destinació pel seu identificador.
export function buscaDestinacio(id: number): Destinacio | undefined {
  return destinacions.find((d) => d.id === id);
}
