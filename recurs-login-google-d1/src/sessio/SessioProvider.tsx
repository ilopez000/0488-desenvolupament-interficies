// La sessió compartida per tota l'app (com al recurs del login amb Google),
// però ara, en iniciar la sessió, el Worker REGISTRA o RECUPERA l'usuari de la base de dades.
import { googleLogout } from '@react-oauth/google'
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { entrar } from '../api'
import { CLAU_SESSIO } from '../config'
import type { Sessio, Usuari } from '../tipus'
import { SessioContext, type ValorSessio } from './SessioContext'

/** Quan caduca la credencial (camp exp del JWT, en segons) → mil·lisegons. */
function caducaDe(credencial: string): number {
  const base64 = credencial.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
  return JSON.parse(atob(base64)).exp * 1000
}

function llegeixSessioGuardada(): Sessio | null {
  try {
    const sessio = JSON.parse(localStorage.getItem(CLAU_SESSIO) ?? 'null') as Sessio | null
    return sessio && sessio.caduca > Date.now() ? sessio : null
  } catch {
    return null
  }
}

export function SessioProvider({ children }: { children: ReactNode }) {
  const [sessio, setSessio] = useState<Sessio | null>(llegeixSessioGuardada)
  const [carregant, setCarregant] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Cada canvi de la sessió es copia al localStorage (així sobreviu a una recàrrega)
  useEffect(() => {
    if (sessio) localStorage.setItem(CLAU_SESSIO, JSON.stringify(sessio))
    else localStorage.removeItem(CLAU_SESSIO)
  }, [sessio])

  const iniciaSessio = useCallback(async (credencial: string) => {
    setCarregant(true)
    setError(null)
    try {
      // El Worker verifica la credencial i fa l'INSERT o l'UPDATE a la taula users
      const { usuari, nou } = await entrar(credencial)
      setSessio({ credencial, caduca: caducaDe(credencial), usuari, nou })
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setCarregant(false)
    }
  }, [])

  const tancaSessio = useCallback(() => {
    googleLogout()
    setSessio(null)
  }, [])

  const canviaUsuari = useCallback((usuari: Usuari) => {
    setSessio((actual) => (actual ? { ...actual, usuari } : actual))
  }, [])

  // La credencial de Google dura 1 hora: quan caduca, tanquem la sessió
  useEffect(() => {
    if (!sessio) return
    const temporitzador = setTimeout(tancaSessio, Math.max(0, sessio.caduca - Date.now()))
    return () => clearTimeout(temporitzador)
  }, [sessio, tancaSessio])

  const valor = useMemo<ValorSessio>(
    () => ({ sessio, carregant, error, iniciaSessio, tancaSessio, canviaUsuari }),
    [sessio, carregant, error, iniciaSessio, tancaSessio, canviaUsuari],
  )
  return <SessioContext value={valor}>{children}</SessioContext>
}
