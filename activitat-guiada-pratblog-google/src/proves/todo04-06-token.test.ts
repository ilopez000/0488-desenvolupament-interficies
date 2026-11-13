import { describe, expect, it } from 'vitest'
import { claimsAUsuari, creaSessio, descodificaCredencial } from '../auth/token.ts'
import { claimsDeProva, jwtDeProva } from './jwt.ts'

describe('TODO 4 · descodificaCredencial() llegeix el JWT', () => {
  it('retorna els claims que hi ha dins del token', () => {
    const claims = claimsDeProva({ name: 'Pau Prova', email: 'pau@prova.cat' })
    const resultat = descodificaCredencial(jwtDeProva(claims))
    expect(resultat.name).toBe('Pau Prova')
    expect(resultat.email).toBe('pau@prova.cat')
    expect(resultat.exp).toBe(claims.exp)
  })
  it('llança un error si la credencial no és un JWT', () => {
    expect(() => descodificaCredencial('això-no-és-un-token')).toThrow()
  })
})

describe('TODO 5 · claimsAUsuari() passa dels claims de Google al nostre Usuari', () => {
  it('copia cada camp al seu lloc', () => {
    expect(claimsAUsuari(claimsDeProva())).toEqual({
      id: '1234567890',
      nom: 'Anna Admin',
      email: 'admin@prova.cat',
      foto: 'https://exemple.cat/foto.png',
      emailVerificat: true,
    })
  })
})

describe('TODO 6 · creaSessio() construeix la sessió', () => {
  it('guarda l’usuari, la credencial i la caducitat en mil·lisegons', () => {
    const claims = claimsDeProva()
    const credencial = jwtDeProva(claims)
    const sessio = creaSessio(credencial)
    expect(sessio.usuari.email).toBe('admin@prova.cat')
    expect(sessio.credencial).toBe(credencial)
    expect(sessio.caduca).toBe(claims.exp * 1000)
  })
})
