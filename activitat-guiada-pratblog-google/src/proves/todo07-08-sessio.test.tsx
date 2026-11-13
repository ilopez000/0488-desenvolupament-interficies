import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { googleLogout } from '@react-oauth/google'
import { useSessio } from '../auth/useSessio.ts'
import { renderAmbApp } from './ajudes.tsx'
import { jwtDeProva } from './jwt.ts'

vi.mock('@react-oauth/google', () => import('./mockGoogle.tsx'))

// Un component petit que fa servir la sessió com ho farà el blog
function Provador() {
  const { sessio, iniciaSessio, tancaSessio } = useSessio()
  return (
    <div>
      <p>{sessio ? `Connectat: ${sessio.usuari.nom}` : 'Ningú connectat'}</p>
      <button onClick={() => iniciaSessio(jwtDeProva())}>Entra</button>
      <button onClick={tancaSessio}>Surt</button>
    </div>
  )
}

describe('TODO 7 · iniciaSessio() obre i desa la sessió', () => {
  it('posa la sessió a l’estat (es veu el nom)', async () => {
    renderAmbApp(<Provador />)
    await userEvent.click(screen.getByText('Entra'))
    expect(screen.getByText('Connectat: Anna Admin')).toBeInTheDocument()
  })
  it('desa la sessió al localStorage amb la clau pratblog/sessio', async () => {
    renderAmbApp(<Provador />)
    await userEvent.click(screen.getByText('Entra'))
    const guardada = JSON.parse(localStorage.getItem('pratblog/sessio') ?? 'null')
    expect(guardada?.usuari?.email).toBe('admin@prova.cat')
  })
})

describe('TODO 8 · tancaSessio() ho esborra tot', () => {
  it('buida l’estat, esborra el localStorage i crida googleLogout()', async () => {
    renderAmbApp(<Provador />)
    await userEvent.click(screen.getByText('Entra'))
    await userEvent.click(screen.getByText('Surt'))
    expect(screen.getByText('Ningú connectat')).toBeInTheDocument()
    expect(localStorage.getItem('pratblog/sessio')).toBeNull()
    expect(googleLogout).toHaveBeenCalled()
  })
})
