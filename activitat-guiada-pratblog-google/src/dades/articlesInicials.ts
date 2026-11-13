import type { Article } from './tipus.ts'

// Articles d'exemple. La primera vegada que s'obre el blog es copien al
// localStorage; a partir d'aquí, el que canviïs a l'administració es manté.
export const articlesInicials: Article[] = [
  {
    id: 'benvinguda',
    titol: 'Benvinguts a PratBlog',
    resum: 'El blog del cicle de DAM: projectes, apunts i curiositats.',
    contingut:
      'Aquest és el primer article de PratBlog. Aquí hi anirem publicant novetats del cicle, projectes de l’alumnat i petits trucs de programació.\n\nLa part d’administració permet crear, editar i esborrar articles. Ara mateix, però, hi pot entrar qualsevol persona… i això ho hem d’arreglar!',
    autor: 'Equip de DAM',
    data: '2026-11-02',
    publicat: true,
  },
  {
    id: 'react-19',
    titol: 'Cinc coses de React 19 que fem servir cada dia',
    resum: 'Components, props, estat, efectes i context: el que no pot faltar.',
    contingut:
      'Un component és una funció que retorna JSX. Les props són les dades que li passem des de fora. L’estat (useState) és la memòria del component. Els efectes (useEffect) serveixen per sincronitzar-nos amb el món exterior, com el localStorage. I el context ens permet compartir dades, com la sessió de l’usuari, sense passar props per tot arreu.',
    autor: 'Equip de DAM',
    data: '2026-11-06',
    publicat: true,
  },
  {
    id: 'oauth',
    titol: 'Què passa quan cliques «Inicia la sessió amb Google»?',
    resum: 'Un resum del viatge de la credencial: del botó al nostre codi.',
    contingut:
      'El botó obre una finestra de Google. Tu hi tries el compte i Google ens retorna una credencial: un JWT signat amb dades com el teu nom, el correu i quan caduca. La nostra web el llegeix, guarda la sessió i decideix què et deixa veure.',
    autor: 'Equip de DAM',
    data: '2026-11-10',
    publicat: true,
  },
  {
    id: 'esborrany',
    titol: 'Esborrany: el projecte intermodular',
    resum: 'Article encara no publicat. Només el veu l’administració.',
    contingut: 'Aquest article és un esborrany i no surt a la part pública.',
    autor: 'Equip de DAM',
    data: '2026-11-12',
    publicat: false,
  },
]
