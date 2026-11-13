// Un article sencer: /article/:id
import { Link, useParams } from 'react-router'
import { useArticles } from '../dades/useArticles.ts'
import { formataData } from '../components/TargetaArticle.tsx'
import { NoTrobada } from './NoTrobada.tsx'

export function Article() {
  const { id } = useParams()
  const { articles } = useArticles()
  const article = articles.find((a) => a.id === id && a.publicat)

  if (!article) return <NoTrobada />

  return (
    <article className="article-sencer">
      <Link to="/">← Tots els articles</Link>
      <h1>{article.titol}</h1>
      <p className="meta">
        {formataData(article.data)} · {article.autor}
      </p>
      {article.contingut.split('\n\n').map((paragraf, i) => (
        <p key={i}>{paragraf}</p>
      ))}
    </article>
  )
}
