import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Capcalera } from '../components/Capcalera.tsx'
import { guardaSessio, renderAmbApp } from './ajudes.tsx'

vi.mock('@react-oauth/google', () => import('./mockGoogle.tsx'))

describe('TODO 12 · La capçalera mostra qui hi ha connectat', () => {
  it('sense sessió, hi ha l’enllaç «Inicia la sessió»', () => {
    renderAmbApp(<Capcalera />)
    expect(screen.getByText('Inicia la sessió')).toBeInTheDocument()
  })
  it('amb sessió d’admin, es veu el nom, l’etiqueta Admin i el botó Surt', () => {
    guardaSessio('admin@prova.cat', 'Anna Admin')
    renderAmbApp(<Capcalera />)
    expect(screen.getByText('Anna Admin')).toBeInTheDocument()
    expect(screen.getByText('Admin')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Surt' })).toBeInTheDocument()
    expect(screen.queryByText('Inicia la sessió')).not.toBeInTheDocument()
  })
  it('amb sessió de qui no és admin, no surt l’etiqueta Admin', () => {
    guardaSessio('intrus@prova.cat', 'Ian Intrús')
    renderAmbApp(<Capcalera />)
    expect(screen.getByText('Ian Intrús')).toBeInTheDocument()
    expect(screen.queryByText('Admin')).not.toBeInTheDocument()
  })
  it('el botó Surt tanca la sessió (necessita el TODO 8)', async () => {
    guardaSessio('admin@prova.cat', 'Anna Admin')
    renderAmbApp(<Capcalera />)
    await userEvent.click(screen.getByRole('button', { name: 'Surt' }))
    expect(screen.getByText('Inicia la sessió')).toBeInTheDocument()
  })
})
