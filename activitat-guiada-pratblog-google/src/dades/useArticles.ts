import { useContext } from 'react'
import { ArticlesContext, type ValorArticles } from './ArticlesContext.ts'

export function useArticles(): ValorArticles {
  const valor = useContext(ArticlesContext)
  if (valor === null) {
    throw new Error('useArticles() només es pot fer servir dins de <ArticlesProvider>')
  }
  return valor
}
