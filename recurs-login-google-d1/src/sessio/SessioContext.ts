import { createContext } from 'react'
import type { Sessio, Usuari } from '../tipus'

export type ValorSessio = {
  sessio: Sessio | null
  carregant: boolean
  error: string | null
  iniciaSessio: (credencial: string) => Promise<void>
  tancaSessio: () => void
  /** Substitueix la fila de l'usuari guardada a la sessió (després de llegir-la o desar-la). */
  canviaUsuari: (usuari: Usuari) => void
}

export const SessioContext = createContext<ValorSessio | null>(null)
