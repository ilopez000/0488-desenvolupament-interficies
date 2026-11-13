// Es mostra quan algú ha iniciat sessió però NO és administrador
import { useSessio } from '../auth/useSessio.ts'

export function NoAutoritzat() {
  const { sessio } = useSessio()
  return (
    <section className="targeta centrada">
      <h1>⛔ No tens permís</h1>
      <p>
        Has entrat com a <strong>{sessio?.usuari.email}</strong>, però aquest compte no és
        administrador del blog.
      </p>
      <p className="ajuda">
        Els administradors són els correus de <code>VITE_ADMINS</code> al fitxer <code>.env</code>.
      </p>
    </section>
  )
}
