import { use } from 'react'
import { SessioContext } from './SessioContext'

export function useSessio() {
  const valor = use(SessioContext)
  if (!valor) throw new Error('useSessio ha d’estar dins de <SessioProvider>')
  return valor
}
