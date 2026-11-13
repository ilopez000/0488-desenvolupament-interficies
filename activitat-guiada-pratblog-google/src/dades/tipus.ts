// Un article del blog
export type Article = {
  id: string
  titol: string
  resum: string
  contingut: string
  autor: string
  /** Data de publicació en format ISO (2026-11-13) */
  data: string
  /** Només els publicats surten a la part pública */
  publicat: boolean
}

/** Les dades que s'omplen al formulari de l'editor */
export type DadesArticle = Pick<Article, 'titol' | 'resum' | 'contingut' | 'publicat'>
