// El hook useSessio(): la manera còmoda de llegir el context
// ------------------------------------------------------------
import { useContext } from 'react'
import { SessioContext, type ValorSessio } from './SessioContext.ts'

/** Retorna { sessio, esAdmin, iniciaSessio, tancaSessio }. */
export function useSessio(): ValorSessio {
  const valor = useContext(SessioContext)
  if (valor === null) {
    throw new Error('useSessio() només es pot fer servir dins de <SessioProvider>')
  }
  return valor
}
