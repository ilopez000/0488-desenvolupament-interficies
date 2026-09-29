import { render } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import App from '../App'

// Aquesta prova va en un fitxer a part perquè React només avisa una vegada
// per cada tipus de component: si la llista ja s'ha dibuixat en una altra
// prova, l'avís no es repetiria.
test('Prova 3 · TODO 4 · cada element de la llista té la seva clau', () => {
  const errors = vi.spyOn(console, 'error').mockImplementation(() => {})
  render(<App />)
  const avisos = errors.mock.calls.map((crida) => crida.map(String).join(' '))
  errors.mockRestore()
  const teAvisDeClau = avisos.some((avis) => avis.includes('unique "key"') || avis.includes('unique key'))
  expect(teAvisDeClau, 'Falta la propietat key a la llista de llibres').toBe(false)
})
