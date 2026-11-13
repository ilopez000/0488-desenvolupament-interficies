// Qui és administrador del blog?
// ------------------------------------------------------------
import type { Usuari } from './tipus.ts'

/**
 * TODO 9 · Retorna true només si:
 *   - Google diu que el correu de l'usuari està verificat, I
 *   - el correu (en minúscules) és a la llista d'administradors.
 */
export function esAdministrador(usuari: Usuari, admins: string[]): boolean {
  return false // ← TODO 9
}
