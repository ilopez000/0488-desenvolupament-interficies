// Tokens falsos per a les proves (sense React, perquè es puguin fer servir dins de vi.mock)
import type { ClaimsGoogle } from '../auth/tipus.ts'

function base64url(text: string): string {
  return btoa(unescape(encodeURIComponent(text))).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_')
}

/** Uns claims d'exemple, com els que enviaria Google */
export function claimsDeProva(canvis: Partial<ClaimsGoogle> = {}): ClaimsGoogle {
  const ara = Math.floor(Date.now() / 1000)
  return {
    iss: 'https://accounts.google.com',
    aud: 'id-de-prova.apps.googleusercontent.com',
    sub: '1234567890',
    email: 'admin@prova.cat',
    email_verified: true,
    name: 'Anna Admin',
    picture: 'https://exemple.cat/foto.png',
    iat: ara,
    exp: ara + 3600,
    ...canvis,
  }
}

/** Fabrica un JWT (sense firma de debò) amb aquests claims */
export function jwtDeProva(claims: ClaimsGoogle = claimsDeProva()): string {
  return `${base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))}.${base64url(JSON.stringify(claims))}.firma-falsa`
}
