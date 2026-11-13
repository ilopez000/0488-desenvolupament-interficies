import { describe, expect, it } from 'vitest'
import { ADMINS, GOOGLE_CLIENT_ID, llegeixAdmins } from '../config.ts'
import codiMain from '../main.tsx?raw'

describe('TODO 01 · config.ts llegeix l’ID de client del .env', () => {
  it('GOOGLE_CLIENT_ID val el que hi ha a VITE_GOOGLE_CLIENT_ID', () => {
    expect(GOOGLE_CLIENT_ID).toBe('id-de-prova.apps.googleusercontent.com')
  })
})

describe('TODO 02 · llegeixAdmins() converteix el text en una llista de correus', () => {
  it('separa per comes, treu espais, passa a minúscules i descarta els buits', () => {
    expect(llegeixAdmins(' Anna@Gmail.com , ,pau@gmail.com')).toEqual(['anna@gmail.com', 'pau@gmail.com'])
  })
  it('retorna una llista buida si no hi ha text', () => {
    expect(llegeixAdmins(undefined)).toEqual([])
    expect(llegeixAdmins('')).toEqual([])
  })
  it('ADMINS es construeix a partir de VITE_ADMINS', () => {
    expect(ADMINS).toEqual(['admin@prova.cat', 'segona@prova.cat'])
  })
})

describe('TODO 03 · main.tsx embolcalla l’app amb GoogleOAuthProvider', () => {
  it('importa GoogleOAuthProvider de @react-oauth/google', () => {
    expect(codiMain).toMatch(/import\s*\{[^}]*GoogleOAuthProvider[^}]*\}\s*from\s*['"]@react-oauth\/google['"]/)
  })
  it('obre i tanca <GoogleOAuthProvider> amb clientId={GOOGLE_CLIENT_ID}', () => {
    expect(codiMain).toMatch(/<GoogleOAuthProvider[^>]*clientId=\{\s*GOOGLE_CLIENT_ID\s*\}/)
    expect(codiMain).toContain('</GoogleOAuthProvider>')
  })
  it('GoogleOAuthProvider queda per fora del BrowserRouter (envolta tota l’app)', () => {
    const provider = codiMain.indexOf('<GoogleOAuthProvider')
    expect(provider).toBeGreaterThan(-1)
    expect(provider).toBeLessThan(codiMain.indexOf('<BrowserRouter'))
  })
})
