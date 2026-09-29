import { useState } from 'react'
import estils from './Opinio.module.css'

type Formulari = {
  titol: string
  comentari: string
}

const BUIT: Formulari = { titol: '', comentari: '' }

export default function Opinio() {
  const [dades, setDades] = useState<Formulari>(BUIT)
  const [errors, setErrors] = useState<Partial<Formulari>>({})
  const [enviat, setEnviat] = useState(false)

  function canvia(camp: keyof Formulari, valor: string) {
    setDades({ ...dades, [camp]: valor })
  }

  function envia(esdeveniment: React.FormEvent<HTMLFormElement>) {
    // ─── TODO 8 ────────────────────────────────────────────────────────────
    // (a) Evita que el navegador recarregui la pàgina en enviar el formulari.

    const trobats: Partial<Formulari> = {}
    if (dades.titol.trim().length < 3) trobats.titol = 'Escriu el títol del llibre (mínim 3 caràcters).'
    if (dades.comentari.trim().length < 10) trobats.comentari = 'El comentari ha de tenir almenys 10 caràcters.'

    // (b) Desa els errors trobats a l'estat «errors».
    // (c) Si no hi ha cap error, marca «enviat» com a cert i buida el formulari
    //     amb setDades(BUIT).
    // ───────────────────────────────────────────────────────────────────────
  }

  return (
    <main>
      <h1>Deixa la teva opinió</h1>
      <p className="subtitol">Explica'ns què t'ha semblat un llibre del catàleg.</p>

      {enviat && <p className="correcte">Gràcies! Hem desat la teva opinió.</p>}

      <form className={estils.formulari} onSubmit={envia} noValidate>
        <label htmlFor="titol">Títol del llibre</label>
        {/* ─── TODO 7 ────────────────────────────────────────────────────────
            Fes que aquest camp sigui controlat: quan s'escrigui, ha de cridar
            canvia('titol', ...) amb el valor del camp. Mira com ho fa el camp
            «Comentari» de més avall.
            ─────────────────────────────────────────────────────────────────── */}
        <input
          id="titol"
          type="text"
          value={dades.titol}
          onChange={() => {}}
        />
        {errors.titol && <p className="error">{errors.titol}</p>}

        <label htmlFor="comentari">Comentari</label>
        <textarea
          id="comentari"
          rows={4}
          value={dades.comentari}
          onChange={(esdeveniment) => canvia('comentari', esdeveniment.target.value)}
        />
        {errors.comentari && <p className="error">{errors.comentari}</p>}

        <button type="submit" className={estils.boto}>
          Envia l'opinió
        </button>
      </form>
    </main>
  )
}
