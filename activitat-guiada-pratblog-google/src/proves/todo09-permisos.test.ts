import { describe, expect, it } from 'vitest'
import { esAdministrador } from '../auth/permisos.ts'
import type { Usuari } from '../auth/tipus.ts'

const anna: Usuari = { id: '1', nom: 'Anna', email: 'Anna@Prova.cat', emailVerificat: true }
const admins = ['anna@prova.cat']

describe('TODO 09 · esAdministrador() decideix qui pot gestionar el blog', () => {
  it('true si el correu (en minúscules) és a la llista i està verificat', () => {
    expect(esAdministrador(anna, admins)).toBe(true)
  })
  it('false si el correu no és a la llista', () => {
    expect(esAdministrador({ ...anna, email: 'pau@prova.cat' }, admins)).toBe(false)
  })
  it('false si Google diu que el correu no està verificat', () => {
    expect(esAdministrador({ ...anna, emailVerificat: false }, admins)).toBe(false)
  })
})
