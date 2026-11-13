import { createContext } from 'react'
import type { Article, DadesArticle } from './tipus.ts'

export type ValorArticles = {
  articles: Article[]
  afegeix: (dades: DadesArticle, autor: string) => Article
  actualitza: (id: string, dades: DadesArticle) => void
  esborra: (id: string) => void
  restaura: () => void
}

export const ArticlesContext = createContext<ValorArticles | null>(null)
