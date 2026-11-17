import { useEffect, useState } from 'react'
import { llegirMode } from './api'
import type { Mode } from './tipus'

/** Pregunta al servidor si treballem amb el simulador o amb el sandbox de Payoneer. */
export function useMode() {
  const [mode, setMode] = useState<Mode | null>(null)
  useEffect(() => {
    llegirMode()
      .then((dades) => setMode(dades.mode))
      .catch(() => setMode(null))
  }, [])
  return mode
}
