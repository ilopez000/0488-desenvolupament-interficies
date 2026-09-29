import { useState } from 'react'
import TargetaLlibre from '../components/TargetaLlibre'
import { llibres } from '../dades/llibres'
import estils from './Cataleg.module.css'

type Props = {
  preferits: number[]
  onAlternarPreferit: (id: number) => void
}

export default function Cataleg({ preferits, onAlternarPreferit }: Props) {
  // ─── TODO 1 ──────────────────────────────────────────────────────────────
  // Declara l'estat del cercador: un text que comença buit.
  // Esborra aquestes dues línies i posa-hi el useState corresponent.
  const text = ''
  const setText = (_nou: string) => {}
  // ─────────────────────────────────────────────────────────────────────────

  const visibles = llibres.filter((llibre) => {
    const cerca = text.trim().toLowerCase()
    // ─── TODO 3 ────────────────────────────────────────────────────────────
    // Retorna cert només si el títol O l'autor contenen el text cercat.
    // Recorda passar-los a minúscules amb .toLowerCase() abans de comparar.
    return true
    // ───────────────────────────────────────────────────────────────────────
  })

  return (
    <main>
      <h1>Catàleg</h1>
      <p className="subtitol">
        {visibles.length} de {llibres.length} llibres
      </p>

      <input
        type="text"
        placeholder="Cerca per títol o autor…"
        aria-label="Cerca"
        value={text}
        // ─── TODO 2 ──────────────────────────────────────────────────────────
        // Quan l'usuari escriu, guarda el valor del camp a l'estat.
        onChange={() => {}}
        // ─────────────────────────────────────────────────────────────────────
      />

      {/* ─── TODO 9 ──────────────────────────────────────────────────────────
          Si no hi ha cap llibre visible, mostra aquest paràgraf:
            <p className="buit">Cap llibre coincideix amb «{text}».</p>
          Ara mateix no es mostra res (null).
          ──────────────────────────────────────────────────────────────────── */}
      {visibles.length === 0 ? null : (
        <div className={estils.graella}>
          {visibles.map((llibre) => (
            // ─── TODO 4 ──────────────────────────────────────────────────────
            // Falta la propietat especial que React demana per a cada element
            // d'una llista. Afegeix-la a <TargetaLlibre> amb l'id del llibre.
            // ─────────────────────────────────────────────────────────────────
            <TargetaLlibre
              llibre={llibre}
              esPreferit={preferits.includes(llibre.id)}
              onAlternarPreferit={onAlternarPreferit}
            />
          ))}
        </div>
      )}
    </main>
  )
}
