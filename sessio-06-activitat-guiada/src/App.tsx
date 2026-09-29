import { useEffect, useState } from 'react'
import Capcalera from './components/Capcalera'
import Cataleg from './pagines/Cataleg'
import Opinio from './pagines/Opinio'

const CLAU = 'pratllibres-preferits'

function carregaPreferits(): number[] {
  try {
    const desat = localStorage.getItem(CLAU)
    return desat ? (JSON.parse(desat) as number[]) : []
  } catch {
    return []
  }
}

export default function App() {
  const [pagina, setPagina] = useState<'cataleg' | 'opinio'>('cataleg')
  const [preferits, setPreferits] = useState<number[]>(carregaPreferits)

  // ─── TODO 10 ─────────────────────────────────────────────────────────────
  // Cada cop que canviï la llista de preferits, desa-la al navegador amb:
  //   localStorage.setItem(CLAU, JSON.stringify(preferits))
  // Fes-ho dins d'un useEffect amb la llista de dependències correcta.
  // ─────────────────────────────────────────────────────────────────────────

  function alternaPreferit(id: number) {
    // ─── TODO 5 ────────────────────────────────────────────────────────────
    // Si l'id ja hi és, treu-lo de la llista; si no hi és, afegeix-l'hi.
    // Important: mai modifiquis la llista anterior. Crea'n una de nova amb
    // .filter(...) o amb [...anteriors, id] i passa-la a setPreferits.
    setPreferits(preferits)
    // ───────────────────────────────────────────────────────────────────────
  }

  return (
    <>
      <Capcalera preferits={preferits} pagina={pagina} onCanviarPagina={setPagina} />
      {pagina === 'cataleg' ? (
        <Cataleg preferits={preferits} onAlternarPreferit={alternaPreferit} />
      ) : (
        <Opinio />
      )}
    </>
  )
}
