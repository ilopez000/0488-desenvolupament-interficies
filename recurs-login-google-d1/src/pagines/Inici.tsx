import { GoogleLogin } from '@react-oauth/google'
import { Link } from 'react-router'
import { useSessio } from '../sessio/useSessio'

export default function Inici() {
  const { sessio, carregant, error, iniciaSessio } = useSessio()

  if (sessio) {
    const { usuari, nou } = sessio
    return (
      <section className="targeta benvinguda">
        {nou ? (
          <>
            <h1>Benvingut/da, {usuari.alies}! 🎉</h1>
            <p>
              És el primer cop que entres: t'acabem de <b>registrar</b> a la taula <code>users</code>.
            </p>
          </>
        ) : (
          <>
            <h1>Hola de nou, {usuari.alies}!</h1>
            <p>
              Ja estaves registrat/da. Aquesta és la teva visita número <b>{usuari.visites}</b>.
            </p>
          </>
        )}
        <Link className="boto" to="/perfil">
          Consulta i canvia les teves dades →
        </Link>
      </section>
    )
  }

  return (
    <section className="targeta">
      <h1>Entra amb el teu compte de Google</h1>
      <p>
        La primera vegada et registrarem a la base de dades <b>Cloudflare D1</b>. Les vegades següents hi recuperarem
        les teves dades.
      </p>
      <div className="google">
        <GoogleLogin
          onSuccess={(resposta) => resposta.credential && iniciaSessio(resposta.credential)}
          onError={() => console.error('Google no ha pogut iniciar la sessió')}
          text="continue_with"
          shape="pill"
        />
      </div>
      {carregant && <p>Connectant amb la base de dades…</p>}
      {error && <p className="error">{error}</p>}
    </section>
  )
}
