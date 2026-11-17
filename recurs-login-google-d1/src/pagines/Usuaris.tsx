// Consultar la taula users: GET /api/usuaris (només camps públics)
import { useEffect, useState } from 'react'
import { llistarUsuaris } from '../api'
import Avatar from '../components/Avatar'
import { useSessio } from '../sessio/useSessio'
import type { UsuariPublic } from '../tipus'

export default function Usuaris() {
  const { sessio } = useSessio()
  const credencial = sessio!.credencial
  const [usuaris, setUsuaris] = useState<UsuariPublic[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    llistarUsuaris(credencial)
      .then(setUsuaris)
      .catch((e: Error) => setError(e.message))
  }, [credencial])

  return (
    <section>
      <h1>Usuaris registrats</h1>
      {error && <p className="error">{error}</p>}
      {!usuaris && !error && <p>Carregant…</p>}
      {usuaris && <p className="nota">{usuaris.length} usuari(s) a la taula users.</p>}
      <ul className="usuaris">
        {usuaris?.map((u) => (
          <li key={`${u.alies}-${u.creat}`} className="targeta" style={{ borderTopColor: u.color }}>
            <Avatar foto={u.foto} nom={u.alies} color={u.color} mida={48} />
            <strong>{u.alies}</strong>
            <span className="etiqueta">{u.cicle}</span>
            {u.bio && <p>{u.bio}</p>}
            <small>
              {u.visites} visita(es) · des de {u.creat.slice(0, 10)}
            </small>
          </li>
        ))}
      </ul>
    </section>
  )
}
