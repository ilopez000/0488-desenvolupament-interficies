// PAS 1 · Configuració: l'ID de client de Google surt del fitxer .env
export const GOOGLE_CLIENT_ID: string = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? ''

/** Clau amb què guardem la sessió al localStorage. */
export const CLAU_SESSIO = 'recurs-login-google-d1/sessio'

export const CICLES = ['DAM', 'DAW', 'ASIX', 'SMX', 'Altres'] as const

if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID.startsWith('123456789012')) {
  console.error('Falta el teu VITE_GOOGLE_CLIENT_ID al fitxer .env (i torna a arrencar).')
}
