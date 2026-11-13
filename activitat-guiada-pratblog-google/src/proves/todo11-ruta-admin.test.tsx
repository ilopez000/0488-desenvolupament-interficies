import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { Route, Routes } from 'react-router'
import { RutaAdmin } from '../auth/RutaAdmin.tsx'
import { guardaSessio, renderAmbApp } from './ajudes.tsx'

vi.mock('@react-oauth/google', () => import('./mockGoogle.tsx'))

function Rutes() {
  return (
    <Routes>
      <Route path="/login" element={<p>PÀGINA DE LOGIN</p>} />
      <Route element={<RutaAdmin />}>
        <Route path="/admin" element={<p>PANELL D’ADMINISTRACIÓ</p>} />
      </Route>
    </Routes>
  )
}

describe('TODO 11 · RutaAdmin protegeix /admin (necessita el 2 i el 9 fets)', () => {
  it('sense sessió, envia a /login', () => {
    renderAmbApp(<Rutes />, '/admin')
    expect(screen.getByText('PÀGINA DE LOGIN')).toBeInTheDocument()
    expect(screen.queryByText('PANELL D’ADMINISTRACIÓ')).not.toBeInTheDocument()
  })
  it('amb sessió d’algú que no és admin, mostra «No tens permís»', () => {
    guardaSessio('intrus@prova.cat', 'Ian Intrús')
    renderAmbApp(<Rutes />, '/admin')
    expect(screen.getByText(/No tens permís/)).toBeInTheDocument()
    expect(screen.queryByText('PANELL D’ADMINISTRACIÓ')).not.toBeInTheDocument()
  })
  it('amb sessió d’un administrador, deixa veure el panell', () => {
    guardaSessio('admin@prova.cat')
    renderAmbApp(<Rutes />, '/admin')
    expect(screen.getByText('PANELL D’ADMINISTRACIÓ')).toBeInTheDocument()
  })
})
