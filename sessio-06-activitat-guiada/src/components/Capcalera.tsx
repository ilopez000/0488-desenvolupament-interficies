import estils from './Capcalera.module.css'

type Props = {
  preferits: number[]
  pagina: 'cataleg' | 'opinio'
  onCanviarPagina: (pagina: 'cataleg' | 'opinio') => void
}

export default function Capcalera({ preferits, pagina, onCanviarPagina }: Props) {
  return (
    <header className={estils.capcalera}>
      <span className={estils.marca}>PratLlibres</span>

      <nav className="pestanyes">
        <button type="button" aria-current={pagina === 'cataleg'} onClick={() => onCanviarPagina('cataleg')}>
          Catàleg
        </button>
        <button type="button" aria-current={pagina === 'opinio'} onClick={() => onCanviarPagina('opinio')}>
          Opinió
        </button>
      </nav>

      <span className={estils.preferits}>
        Preferits
        {/* ─── TODO 6 ────────────────────────────────────────────────────────
            Mostra el globus vermell NOMÉS si hi ha algun preferit, i que hi
            surti quants n'hi ha. El globus és aquest element:
              <span className={estils.globus} data-testid="globus-preferits">
                ...
              </span>
            ─────────────────────────────────────────────────────────────────── */}
      </span>
    </header>
  )
}
