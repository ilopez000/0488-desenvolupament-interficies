// El proveïdor de sessió: guarda, recupera i esborra la sessió
// ------------------------------------------------------------
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'

import { ADMINS, CLAU_SESSIO } from '../config.ts'
import { SessioContext, type ValorSessio } from './SessioContext.ts'
import { creaSessio, haCaducat } from './token.ts'
import { esAdministrador } from './permisos.ts'
import type { Sessio } from './tipus.ts'

/**
 * Llegeix la sessió guardada al localStorage. Retorna null si no n'hi ha,
 * si està corrupta o si ja ha caducat.
 */
function llegeixSessioGuardada(): Sessio | null {
  const text = localStorage.getItem(CLAU_SESSIO)
  if (!text) return null
  try {
    const sessio = JSON.parse(text) as Sessio
    if (haCaducat(sessio)) {
      localStorage.removeItem(CLAU_SESSIO)
      return null
    }
    return sessio
  } catch {
    localStorage.removeItem(CLAU_SESSIO)
    return null
  }
}

export function SessioProvider({ children }: { children: ReactNode }) {
  // Comença amb el que hi hagi al localStorage: en recarregar la pàgina,
  // l'usuari continua connectat.
  const [sessio, setSessio] = useState<Sessio | null>(llegeixSessioGuardada)

  // TODO 7 · Iniciar sessió amb la credencial que ens dona el botó de Google:
  //   1) crea la sessió amb creaSessio(credencial)
  //   2) desa-la a l'estat amb setSessio
  //   3) desa-la al localStorage (clau CLAU_SESSIO, en JSON)
  const iniciaSessio = useCallback((credencial: string) => {
    console.warn('Falta fer el TODO 7 (iniciaSessio)', credencial)
  }, [])

  // TODO 8 · Tancar sessió:
  //   1) avisa Google amb googleLogout()
  //   2) esborra la sessió del localStorage
  //   3) posa l'estat a null
  const tancaSessio = useCallback(() => {
    console.warn('Falta fer el TODO 8 (tancaSessio)')
  }, [])

  // Caducitat: tanquem la sessió just quan el token caduca (1 hora).
  useEffect(() => {
    if (!sessio) return
    const temporitzador = setTimeout(tancaSessio, Math.max(0, sessio.caduca - Date.now()))
    return () => clearTimeout(temporitzador)
  }, [sessio, tancaSessio])

  // És administrador? Ho calculem a partir de la sessió (TODO 9).
  const esAdmin = sessio !== null && esAdministrador(sessio.usuari, ADMINS)

  const valor = useMemo<ValorSessio>(
    () => ({ sessio, esAdmin, iniciaSessio, tancaSessio }),
    [sessio, esAdmin, iniciaSessio, tancaSessio],
  )

  return <SessioContext value={valor}>{children}</SessioContext>
}
