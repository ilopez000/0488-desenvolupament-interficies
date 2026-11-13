import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Route, Routes } from 'react-router'
import { Login } from '../pagines/Login.tsx'
import { renderAmbApp } from './ajudes.tsx'

vi.mock('@react-oauth/google', () => import('./mockGoogle.tsx'))

describe('TODO 10 · La pàgina /login té el botó de Google (necessita del 4 al 7 fets)', () => {
  it('mostra el botó <GoogleLogin />', () => {
    renderAmbApp(<Login />, '/login')
    expect(screen.getByText('Simula el botó de Google')).toBeInTheDocument()
  })
  it('en fer login, obre la sessió i porta a /admin', async () => {
    renderAmbApp(
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<p>PANELL D’ADMINISTRACIÓ</p>} />
      </Routes>,
      '/login',
    )
    await userEvent.click(screen.getByText('Simula el botó de Google'))
    expect(screen.getByText('PANELL D’ADMINISTRACIÓ')).toBeInTheDocument()
    expect(localStorage.getItem('pratblog/sessio')).not.toBeNull()
  })
})
