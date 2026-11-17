// PAS 2 · Les crides a la nostra API (el Worker). Totes porten la credencial de Google:
//   Authorization: Bearer <credencial>
// El Worker la verifica i així sap QUI fa la petició sense que la web li ho digui.
import type { CanvisUsuari, Usuari, UsuariPublic } from './tipus'

export class ErrorApi extends Error {
  status: number
  constructor(missatge: string, status: number) {
    super(missatge)
    this.status = status
  }
}

async function cridaApi<T>(credencial: string, ruta: string, opcions: RequestInit = {}): Promise<T> {
  const resposta = await fetch(ruta, {
    ...opcions,
    headers: {
      Authorization: `Bearer ${credencial}`,
      ...(opcions.body ? { 'Content-Type': 'application/json' } : {}),
    },
  })
  if (resposta.status === 204) return undefined as T
  const dades = await resposta.json()
  if (!resposta.ok) throw new ErrorApi(dades.error ?? `Error ${resposta.status}`, resposta.status)
  return dades as T
}

/** Registre (la primera vegada) o inici de sessió. */
export const entrar = (credencial: string) =>
  cridaApi<{ usuari: Usuari; nou: boolean }>(credencial, '/api/login', { method: 'POST' })

/** Consulta les meves dades a la base de dades. */
export const llegirJo = (credencial: string) => cridaApi<Usuari>(credencial, '/api/jo')

/** Desa els canvis a la base de dades i torna la fila actualitzada. */
export const desarJo = (credencial: string, canvis: CanvisUsuari) =>
  cridaApi<Usuari>(credencial, '/api/jo', { method: 'PUT', body: JSON.stringify(canvis) })

/** Esborra la meva fila de la taula users. */
export const esborrarJo = (credencial: string) => cridaApi<void>(credencial, '/api/jo', { method: 'DELETE' })

export const llistarUsuaris = (credencial: string) => cridaApi<UsuariPublic[]>(credencial, '/api/usuaris')
