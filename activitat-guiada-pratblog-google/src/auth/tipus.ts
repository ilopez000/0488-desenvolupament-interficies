// Tipus de dades de l'autenticació
// ------------------------------------------------------------

/**
 * El contingut («claims») del token d'identitat que ens dona Google.
 * És un JWT: tres trossos en base64url separats per punts. El del mig és
 * aquest objecte. Només hi posem els camps que farem servir.
 */
export type ClaimsGoogle = {
  /** Qui ha emès el token: https://accounts.google.com */
  iss: string
  /** Per a qui és el token: ha de ser EL NOSTRE ID de client */
  aud: string
  /** Identificador únic i estable de l'usuari a Google */
  sub: string
  email: string
  email_verified: boolean
  /** Nom complet */
  name: string
  /** URL de la foto de perfil (pot no venir) */
  picture?: string
  /** Quan s'ha emès (segons des de 1970) */
  iat: number
  /** Quan caduca (segons des de 1970). Normalment 1 hora després d'iat */
  exp: number
}

/** La part de l'usuari que el blog vol guardar i mostrar. */
export type Usuari = {
  id: string
  nom: string
  email: string
  foto?: string
  emailVerificat: boolean
}

/** La sessió oberta: l'usuari, la credencial original i quan caduca (en mil·lisegons). */
export type Sessio = {
  usuari: Usuari
  credencial: string
  caduca: number
}
