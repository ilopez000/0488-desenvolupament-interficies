// Tipus compartits de la web

export type Producte = { id: string; nom: string; preu: number; emoji: string }

/** Una línia del carret: només l'id i la quantitat (el preu el posa el servidor). */
export type Linia = { id: string; quantitat: number }

export type Integracio = 'HOSTED' | 'EMBEDDED'

export type Mode = 'simulacio' | 'sandbox'

export type PagamentCreat = {
  transactionId: string
  longId: string
  total: number
  redirectUrl: string | null
}

/** Estat que el servidor ha consultat a Payoneer (la font de la veritat). */
export type EstatPagament = {
  estat: string
  interaccio?: { code: string; reason: string }
  transactionId?: string
  total?: number
}

export type Notificacio = { rebuda: string; parametres: Record<string, string> }
