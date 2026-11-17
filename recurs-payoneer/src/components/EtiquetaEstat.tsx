// Tradueix els codis d'estat de Payoneer (status.code) a text i color
const ESTATS: Record<string, { text: string; tipus: 'ok' | 'espera' | 'error' }> = {
  listed: { text: 'Pendent de pagar', tipus: 'espera' },
  pending: { text: 'En procés', tipus: 'espera' },
  preauthorized: { text: 'Preautoritzat', tipus: 'espera' },
  charged: { text: 'Pagat', tipus: 'ok' },
  paid_out: { text: 'Pagat i liquidat', tipus: 'ok' },
  declined: { text: 'Rebutjat', tipus: 'error' },
  failed: { text: 'Error', tipus: 'error' },
  aborted: { text: 'Cancel·lat pel client', tipus: 'error' },
  canceled: { text: 'Anul·lat', tipus: 'error' },
  expired: { text: 'Caducat', tipus: 'error' },
}

export default function EtiquetaEstat({ codi }: { codi: string | undefined }) {
  const estat = ESTATS[codi ?? ''] ?? { text: codi ?? 'desconegut', tipus: 'espera' as const }
  return <span className={`etiqueta etiqueta-${estat.tipus}`}>{estat.text}</span>
}
