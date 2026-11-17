// PAS 8 · La web NOMÉS parla amb el nostre servidor (/api/...), mai directament amb Payoneer.
import type { EstatPagament, Integracio, Linia, Mode, Notificacio, PagamentCreat, Producte } from './tipus'

async function demanar<T>(url: string, opcions?: RequestInit): Promise<T> {
  const resposta = await fetch(url, opcions)
  const dades = await resposta.json()
  if (!resposta.ok) throw new Error(dades.error ?? `Error ${resposta.status}`)
  return dades as T
}

export const llegirMode = () => demanar<{ mode: Mode }>('/api/config')

export const llegirProductes = () => demanar<Producte[]>('/api/productes')

export function crearPagament(dades: { linies: Linia[]; nom: string; email: string; integracio: Integracio }) {
  return demanar<PagamentCreat>('/api/pagaments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dades),
  })
}

export const consultarPagament = (longId: string) =>
  demanar<EstatPagament>(`/api/pagaments/${encodeURIComponent(longId)}`)

export const llegirNotificacions = () => demanar<Notificacio[]>('/api/notificacions')
