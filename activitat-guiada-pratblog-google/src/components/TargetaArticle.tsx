import { Link } from 'react-router'
import type { Article } from '../dades/tipus.ts'

export function formataData(iso: string): string {
  return new Date(iso).toLocaleDateString('ca-ES', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function TargetaArticle({ article }: { article: Article }) {
  return (
    <article className="targeta-article">
      <p className="meta">
        {formataData(article.data)} · {article.autor}
      </p>
      <h2>
        <Link to={`/article/${article.id}`}>{article.titol}</Link>
      </h2>
      <p>{article.resum}</p>
      <Link className="llegeix" to={`/article/${article.id}`}>
        Llegeix l’article →
      </Link>
    </article>
  )
}
