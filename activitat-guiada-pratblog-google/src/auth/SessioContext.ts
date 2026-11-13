// El context de sessió: què comparteix tota l'app
// ------------------------------------------------------------
import { createContext } from 'react'
import type { Sessio } from './tipus.ts'

/** El que qualsevol component podrà demanar amb useSessio(). */
export type ValorSessio = {
  /** La sessió oberta, o null si ningú ha iniciat sessió */
  sessio: Sessio | null
  /** true si l'usuari connectat pot entrar a l'administració */
  esAdmin: boolean
  /** Inicia la sessió a partir de la credencial que retorna el botó de Google */
  iniciaSessio: (credencial: string) => void
  /** Tanca la sessió i esborra el que hi havia guardat */
  tancaSessio: () => void
}

// Valor per defecte null: si algú fa servir useSessio() fora del
// SessioProvider, ho detectem i avisem (vegeu useSessio.ts).
export const SessioContext = createContext<ValorSessio | null>(null)
