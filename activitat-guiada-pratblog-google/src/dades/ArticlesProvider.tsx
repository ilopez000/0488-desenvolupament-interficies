// Els articles del blog, guardats al localStorage
// ------------------------------------------------------------
// Aquest fitxer ja està fet: no l'has de tocar.
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { CLAU_ARTICLES } from '../config.ts'
import { ArticlesContext, type ValorArticles } from './ArticlesContext.ts'
import { articlesInicials } from './articlesInicials.ts'
import type { Article, DadesArticle } from './tipus.ts'

function llegeixArticles(): Article[] {
  try {
    const text = localStorage.getItem(CLAU_ARTICLES)
    return text ? (JSON.parse(text) as Article[]) : articlesInicials
  } catch {
    return articlesInicials
  }
}

/** Crea un identificador a partir del títol: «Hola món!» → «hola-mon» */
function creaId(titol: string): string {
  const base = titol
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return `${base || 'article'}-${Date.now().toString(36)}`
}

export function ArticlesProvider({ children }: { children: ReactNode }) {
  const [articles, setArticles] = useState<Article[]>(llegeixArticles)

  // Cada vegada que canvien els articles, els desem
  useEffect(() => {
    localStorage.setItem(CLAU_ARTICLES, JSON.stringify(articles))
  }, [articles])

  const afegeix = useCallback((dades: DadesArticle, autor: string) => {
    const nou: Article = {
      ...dades,
      id: creaId(dades.titol),
      autor,
      data: new Date().toISOString().slice(0, 10),
    }
    setArticles((anteriors) => [nou, ...anteriors])
    return nou
  }, [])

  const actualitza = useCallback((id: string, dades: DadesArticle) => {
    setArticles((anteriors) => anteriors.map((a) => (a.id === id ? { ...a, ...dades } : a)))
  }, [])

  const esborra = useCallback((id: string) => {
    setArticles((anteriors) => anteriors.filter((a) => a.id !== id))
  }, [])

  const restaura = useCallback(() => setArticles(articlesInicials), [])

  const valor = useMemo<ValorArticles>(
    () => ({ articles, afegeix, actualitza, esborra, restaura }),
    [articles, afegeix, actualitza, esborra, restaura],
  )

  return <ArticlesContext value={valor}>{children}</ArticlesContext>
}
