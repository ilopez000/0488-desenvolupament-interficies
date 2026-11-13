// /admin: llista de tots els articles amb les accions de gestió
import { Link } from 'react-router'
import { useArticles } from '../../dades/useArticles.ts'
import { useSessio } from '../../auth/useSessio.ts'
import { formataData } from '../../components/TargetaArticle.tsx'

export function Panell() {
  const { articles, esborra, restaura } = useArticles()
  const { sessio } = useSessio()

  return (
    <section>
      <div className="cap-panell">
        <div>
          <h1>Administració</h1>
          <p className="salutacio">Hola, {sessio ? sessio.usuari.nom : 'desconegut'} 👋</p>
        </div>
        <Link className="boto" to="/admin/nou">
          + Nou article
        </Link>
      </div>

      <table className="taula">
        <thead>
          <tr>
            <th>Títol</th>
            <th>Autor</th>
            <th>Data</th>
            <th>Estat</th>
            <th aria-label="Accions" />
          </tr>
        </thead>
        <tbody>
          {articles.map((a) => (
            <tr key={a.id}>
              <td>{a.titol}</td>
              <td>{a.autor}</td>
              <td>{formataData(a.data)}</td>
              <td>
                <span className={a.publicat ? 'estat publicat' : 'estat esborrany'}>
                  {a.publicat ? 'Publicat' : 'Esborrany'}
                </span>
              </td>
              <td className="accions">
                <Link to={`/admin/edita/${a.id}`}>Edita</Link>
                <button type="button" className="enllac perill" onClick={() => esborra(a.id)}>
                  Esborra
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button type="button" className="enllac" onClick={restaura}>
        Restaura els articles d’exemple
      </button>
    </section>
  )
}
