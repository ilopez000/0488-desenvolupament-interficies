// Substitut de '@react-oauth/google' per a les proves.
// El botó <GoogleLogin> de mentida, en clicar-lo, fa com Google: crida
// onSuccess amb una credencial (un JWT fals de l'admin@prova.cat).
import { vi } from 'vitest'
import type { ReactNode } from 'react'
import { jwtDeProva } from './jwt.ts'

export const googleLogout = vi.fn()

export function GoogleOAuthProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}

type PropsBoto = {
  onSuccess: (resposta: { credential?: string }) => void
  onError?: () => void
}

export function GoogleLogin({ onSuccess }: PropsBoto) {
  return (
    <button type="button" onClick={() => onSuccess({ credential: jwtDeProva() })}>
      Simula el botó de Google
    </button>
  )
}
