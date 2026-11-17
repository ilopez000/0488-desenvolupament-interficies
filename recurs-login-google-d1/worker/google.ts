// PAS 3 · Verificar el token d'identitat de Google AL SERVIDOR
// ------------------------------------------------------------
// El navegador ens envia la credencial (un JWT) a la capçalera Authorization.
// Abans de tocar la base de dades comprovem que és autèntica:
//   · la firma és de Google (claus públiques de Google, JWKS)
//   · l'ha emesa accounts.google.com (iss)
//   · és per a la NOSTRA aplicació (aud = el nostre ID de client)
//   · no ha caducat (exp)
import { createRemoteJWKSet, jwtVerify } from 'jose'

// Les claus públiques de Google. jose les descarrega i les guarda en memòria.
const CLAUS_GOOGLE = createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'))

/** Les dades de l'usuari que ens interessen del token. */
export type UsuariGoogle = {
  id: string // el «sub»: identificador estable de l'usuari a Google
  email: string
  nom: string
  foto: string | null
}

/** Llegeix «Authorization: Bearer <token>», el verifica i torna l'usuari. Si no és vàlid, llança un error. */
export async function usuariDeLaPeticio(request: Request, env: Env): Promise<UsuariGoogle> {
  const capcalera = request.headers.get('Authorization') ?? ''
  const token = capcalera.startsWith('Bearer ') ? capcalera.slice(7) : ''
  if (!token) throw new Error('Falta el token')

  const { payload } = await jwtVerify(token, CLAUS_GOOGLE, {
    issuer: ['https://accounts.google.com', 'accounts.google.com'],
    audience: env.GOOGLE_CLIENT_ID,
  })

  if (payload.email_verified !== true) throw new Error('El correu no està verificat')

  return {
    id: String(payload.sub),
    email: String(payload.email),
    nom: String(payload.name ?? payload.email),
    foto: typeof payload.picture === 'string' ? payload.picture : null,
  }
}
