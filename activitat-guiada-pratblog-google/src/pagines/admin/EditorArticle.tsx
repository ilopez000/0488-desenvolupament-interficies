// /admin/nou i /admin/edita/:id: el formulari d'un article
import { useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useArticles } from '../../dades/useArticles.ts'
import { useSessio } from '../../auth/useSessio.ts'
import type { DadesArticle } from '../../dades/tipus.ts'
import { NoTrobada } from '../NoTrobada.tsx'

const buit: DadesArticle = { titol: '', resum: '', contingut: '', publicat: false }

export function EditorArticle() {
  const { id } = useParams()
  const { articles, afegeix, actualitza } = useArticles()
  const { sessio } = useSessio()
  const navega = useNavigate()

  const existent = id ? articles.find((a) => a.id === id) : undefined
  const [dades, setDades] = useState<DadesArticle>(existent ?? buit)

  if (id && !existent) return <NoTrobada />

  function canvia<K extends keyof DadesArticle>(camp: K, valor: DadesArticle[K]) {
    setDades((anteriors) => ({ ...anteriors, [camp]: valor }))
  }

  function desa(e: FormEvent) {
    e.preventDefault()
    if (existent) {
      actualitza(existent.id, dades)
    } else {
      // L'autor és qui ha iniciat sessió amb Google
      afegeix(dades, sessio ? sessio.usuari.nom : 'Anònim')
    }
    navega('/admin')
  }

  return (
    <section className="targeta">
      <h1>{existent ? 'Edita l’article' : 'Nou article'}</h1>
      <form className="formulari" onSubmit={desa}>
        <label>
          Títol
          <input required value={dades.titol} onChange={(e) => canvia('titol', e.target.value)} />
        </label>
        <label>
          Resum
          <input required value={dades.resum} onChange={(e) => canvia('resum', e.target.value)} />
        </label>
        <label>
          Contingut
          <textarea
            required
            rows={8}
            value={dades.contingut}
            onChange={(e) => canvia('contingut', e.target.value)}
          />
        </label>
        <label className="casella">
          <input
            type="checkbox"
            checked={dades.publicat}
            onChange={(e) => canvia('publicat', e.target.checked)}
          />
          Publicat (es veu a la portada)
        </label>
        <div className="botons">
          <button type="submit" className="boto">
            Desa
          </button>
          <button type="button" className="boto boto-secundari" onClick={() => navega('/admin')}>
            Cancel·la
          </button>
        </div>
      </form>
    </section>
  )
}
