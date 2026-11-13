// Ruta protegida de l'administració
// ------------------------------------------------------------
import { Navigate, Outlet, useLocation } from 'react-router'
import { useSessio } from './useSessio.ts'
import { NoAutoritzat } from '../pagines/NoAutoritzat.tsx'

/**
 * Es fa servir com a ruta «pare» sense path (vegeu App.tsx). Les rutes
 * filles (/admin, /admin/nou...) només es pinten a través de <Outlet />.
 *
 * TODO 11 · Ara mateix QUALSEVOL pot entrar a l'administració. Fes que:
 *   - si no hi ha sessió → <Navigate> a /login (replace) recordant
 *     d'on venia: state={{ desDe: ubicacio.pathname }}
 *   - si hi ha sessió però no és administrador → <NoAutoritzat />
 *   - si és administrador → <Outlet />
 */
export function RutaAdmin() {
  const { sessio, esAdmin } = useSessio()
  const ubicacio = useLocation()

  return <Outlet />
}
