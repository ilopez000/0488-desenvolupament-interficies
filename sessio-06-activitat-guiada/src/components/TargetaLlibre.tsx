import type { Llibre } from '../tipus'
import estils from './TargetaLlibre.module.css'

type Props = {
  llibre: Llibre
  esPreferit: boolean
  onAlternarPreferit: (id: number) => void
}

export default function TargetaLlibre({ llibre, esPreferit, onAlternarPreferit }: Props) {
  return (
    <article className={estils.targeta} aria-label={llibre.titol}>
      <span className={estils.genere}>{llibre.genere}</span>
      <h3 className={estils.titol}>{llibre.titol}</h3>
      <p className={estils.autor}>
        {llibre.autor} · {llibre.any}
      </p>
      <button
        type="button"
        className={esPreferit ? estils.botoActiu : estils.boto}
        aria-pressed={esPreferit}
        onClick={() => onAlternarPreferit(llibre.id)}
      >
        {esPreferit ? '★ Preferit' : '☆ Afegeix a preferits'}
      </button>
    </article>
  )
}
