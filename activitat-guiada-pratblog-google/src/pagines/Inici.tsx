// Portada: la llista d'articles publicats
import { useArticles } from '../dades/useArticles.ts'
import { TargetaArticle } from '../components/TargetaArticle.tsx'

export function Inici() {
  const { articles } = useArticles()
  const publicats = articles.filter((a) => a.publicat)

  return (
    <section>
      <div className="portada">
        <h1>PratBlog</h1>
        <p>El blog del cicle de Desenvolupament d’Aplicacions Multiplataforma.</p>
      </div>

      {publicats.length === 0 ? (
        <p className="buit">Encara no hi ha cap article publicat.</p>
      ) : (
        <div className="graella">
          {publicats.map((article) => (
            <TargetaArticle key={article.id} article={article} />
          ))}
        </div>
      )}
    </section>
  )
}
