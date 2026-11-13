// Llegir el token d'identitat (JWT) que ens dona Google
// ------------------------------------------------------------
import type { ClaimsGoogle, Sessio, Usuari } from './tipus.ts'

/**
 * TODO 4 · Descodifica la credencial (un JWT) i retorna els claims.
 * Fes servir jwtDecode<ClaimsGoogle>() de la llibreria 'jwt-decode'.
 * ATENCIÓ: descodificar NO és verificar (no es comprova la firma).
 */
export function descodificaCredencial(credencial: string): ClaimsGoogle {
  throw new Error('Falta fer el TODO 4 (descodificaCredencial)')
}

/**
 * TODO 5 · Converteix els claims de Google al nostre tipus Usuari.
 *   id ← sub · nom ← name · email ← email · foto ← picture · emailVerificat ← email_verified
 */
export function claimsAUsuari(claims: ClaimsGoogle): Usuari {
  throw new Error('Falta fer el TODO 5 (claimsAUsuari)')
}

/**
 * TODO 6 · Crea una Sessio a partir de la credencial.
 * Compte: exp ve en SEGONS i Date.now() va en MIL·LISEGONS.
 */
export function creaSessio(credencial: string): Sessio {
  const claims = descodificaCredencial(credencial)
  throw new Error('Falta fer el TODO 6 (creaSessio)')
}

/** Una sessió ha caducat quan l'hora actual ja ha passat l'instant «caduca». */
export function haCaducat(sessio: Sessio): boolean {
  return Date.now() >= sessio.caduca
}
