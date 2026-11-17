import type { ReactNode } from 'react'
import { Navigate } from 'react-router'
import { useSessio } from './useSessio'

/** Si no hi ha sessió, cap a l'inici (on hi ha el botó de Google). */
export default function RutaProtegida({ children }: { children: ReactNode }) {
  const { sessio } = useSessio()
  return sessio ? children : <Navigate to="/" replace />
}
