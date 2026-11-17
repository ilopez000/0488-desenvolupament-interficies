// Consultar (GET /api/jo) i actualitzar (PUT /api/jo) les dades de la taula users
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { ErrorApi, desarJo, esborrarJo, llegirJo } from '../api'
import { CICLES } from '../config'
import { useSessio } from '../sessio/useSessio'
import type { CanvisUsuari } from '../tipus'

export default function Perfil() {
  const { sessio, canviaUsuari, tancaSessio } = useSessio()
  const navigate = useNavigate()
  const usuari = sessio!.usuari // RutaProtegida ja garanteix que hi ha sessió
  const credencial = sessio!.credencial

  // El formulari comença amb el que hi ha a la base de dades
  const [form, setForm] = useState<CanvisUsuari>({
    alies: usuari.alies,
    cicle: usuari.cicle,
    bio: usuari.bio,
    color: usuari.color,
  })
  const [missatge, setMissatge] = useState<{ text: string; tipus: 'ok' | 'error' } | null>(null)
  const [confirmaBaixa, setConfirmaBaixa] = useState(false)

  function canvia<K extends keyof CanvisUsuari>(camp: K, valor: CanvisUsuari[K]) {
    setForm((actual) => ({ ...actual, [camp]: valor }))
  }

  function gestionaError(e: unknown) {
    if (e instanceof ErrorApi && e.status === 401) return tancaSessio() // credencial caducada
    setMissatge({ text: (e as Error).message, tipus: 'error' })
  }

  async function desar(e: FormEvent) {
    e.preventDefault()
    try {
      const actualitzat = await desarJo(credencial, form) // UPDATE users ... RETURNING *
      canviaUsuari(actualitzat)
      setMissatge({ text: 'Desat a la base de dades ✔', tipus: 'ok' })
    } catch (e) {
      gestionaError(e)
    }
  }

  async function tornaALlegir() {
    try {
      const deLaBD = await llegirJo(credencial) // SELECT * FROM users WHERE id = ?
      canviaUsuari(deLaBD)
      setForm({ alies: deLaBD.alies, cicle: deLaBD.cicle, bio: deLaBD.bio, color: deLaBD.color })
      setMissatge({ text: 'Dades llegides de la base de dades', tipus: 'ok' })
    } catch (e) {
      gestionaError(e)
    }
  }

  async function donarDeBaixa() {
    try {
      await esborrarJo(credencial) // DELETE FROM users WHERE id = ?
      tancaSessio()
      navigate('/')
    } catch (e) {
      gestionaError(e)
    }
  }

  return (
    <div className="perfil">
      <section className="targeta">
        <h2>Dades de Google</h2>
        <p className="nota">Les posa el servidor a cada inici de sessió. No es poden editar.</p>
        <div className="google-dades">
          {usuari.foto && <img src={usuari.foto} alt="" referrerPolicy="no-referrer" />}
          <div>
            <strong>{usuari.nom}</strong>
            <div>{usuari.email}</div>
          </div>
        </div>
        <dl>
          <dt>id (sub)</dt>
          <dd>{usuari.id}</dd>
          <dt>Visites</dt>
          <dd>{usuari.visites}</dd>
          <dt>Registrat</dt>
          <dd>{usuari.creat}</dd>
          <dt>Últim accés</dt>
          <dd>{usuari.ultim_acces}</dd>
        </dl>
      </section>

      <form className="targeta" onSubmit={desar}>
        <h2>Les meves dades</h2>
        <p className="nota">
          Són a la taula <code>users</code> de Cloudflare D1.
        </p>
        <label>
          Àlies
          <input value={form.alies} onChange={(e) => canvia('alies', e.target.value)} maxLength={20} />
        </label>
        <label>
          Cicle
          <select value={form.cicle} onChange={(e) => canvia('cicle', e.target.value)}>
            {CICLES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          Bio ({form.bio.length}/200)
          <textarea value={form.bio} onChange={(e) => canvia('bio', e.target.value)} maxLength={200} rows={3} />
        </label>
        <label className="fila-color">
          Color preferit
          <input type="color" value={form.color} onChange={(e) => canvia('color', e.target.value)} />
        </label>

        <div className="botons">
          <button className="principal">Desa els canvis</button>
          <button type="button" onClick={tornaALlegir}>
            Torna a llegir de la BD
          </button>
        </div>
        {missatge && <p className={missatge.tipus}>{missatge.text}</p>}

        <hr />
        {confirmaBaixa ? (
          <p>
            S'esborrarà la teva fila de la taula. Segur?{' '}
            <button type="button" className="perill" onClick={donarDeBaixa}>
              Sí, dona'm de baixa
            </button>{' '}
            <button type="button" onClick={() => setConfirmaBaixa(false)}>
              No
            </button>
          </p>
        ) : (
          <button type="button" className="enllac" onClick={() => setConfirmaBaixa(true)}>
            Dona'm de baixa
          </button>
        )}
      </form>
    </div>
  )
}
