import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
import App from '../App'

function obreCataleg() {
  render(<App />)
}

async function vesAOpinio(usuari: ReturnType<typeof userEvent.setup>) {
  await usuari.click(screen.getByRole('button', { name: 'Opinió' }))
}

describe('Activitat guiada · PratLlibres', () => {
  test('Prova 1 · TODO 1 i 2 · el camp de cerca recorda el que escrius', async () => {
    const usuari = userEvent.setup()
    obreCataleg()
    const cerca = screen.getByLabelText('Cerca')
    await usuari.type(cerca, 'rodoreda')
    expect(cerca).toHaveValue('rodoreda')
  })

  test('Prova 2 · TODO 3 · la cerca filtra per títol i per autor', async () => {
    const usuari = userEvent.setup()
    obreCataleg()
    await usuari.type(screen.getByLabelText('Cerca'), 'pedrolo')
    const targetes = screen.getAllByRole('article')
    expect(targetes).toHaveLength(1)
    expect(targetes[0]).toHaveTextContent('Mecanoscrit del segon origen')

    await usuari.clear(screen.getByLabelText('Cerca'))
    await usuari.type(screen.getByLabelText('Cerca'), 'quadern')
    expect(screen.getAllByRole('article')).toHaveLength(1)
  })


  test('Prova 4 · TODO 5 · el botó afegeix i treu el llibre dels preferits', async () => {
    const usuari = userEvent.setup()
    obreCataleg()
    const solitud = screen.getByRole('article', { name: /Solitud/i })
    const boto = within(solitud).getByRole('button')

    expect(boto).toHaveAttribute('aria-pressed', 'false')
    await usuari.click(boto)
    expect(within(solitud).getByRole('button')).toHaveAttribute('aria-pressed', 'true')
    await usuari.click(within(solitud).getByRole('button'))
    expect(within(solitud).getByRole('button')).toHaveAttribute('aria-pressed', 'false')
  })

  test('Prova 5 · TODO 6 · el globus de la capçalera compta els preferits', async () => {
    const usuari = userEvent.setup()
    obreCataleg()
    expect(screen.queryByTestId('globus-preferits')).not.toBeInTheDocument()

    await usuari.click(within(screen.getByRole('article', { name: /Solitud/i })).getByRole('button'))
    expect(screen.getByTestId('globus-preferits')).toHaveTextContent('1')

    await usuari.click(within(screen.getByRole('article', { name: /Incerta glòria/i })).getByRole('button'))
    expect(screen.getByTestId('globus-preferits')).toHaveTextContent('2')
  })

  test('Prova 6 · TODO 7 · el camp «Títol del llibre» és un camp controlat', async () => {
    const usuari = userEvent.setup()
    obreCataleg()
    await vesAOpinio(usuari)
    const titol = screen.getByLabelText('Títol del llibre')
    await usuari.type(titol, 'Solitud')
    expect(titol).toHaveValue('Solitud')
  })

  test('Prova 7 · TODO 8 · enviar el formulari buit mostra els errors', async () => {
    const usuari = userEvent.setup()
    obreCataleg()
    await vesAOpinio(usuari)
    await usuari.click(screen.getByRole('button', { name: "Envia l'opinió" }))

    expect(screen.getByText(/mínim 3 caràcters/i)).toBeInTheDocument()
    expect(screen.getByText(/almenys 10 caràcters/i)).toBeInTheDocument()
    expect(screen.queryByText(/Gràcies/i)).not.toBeInTheDocument()
  })

  test('Prova 8 · TODO 9 · si no hi ha resultats surt el missatge de llista buida', async () => {
    const usuari = userEvent.setup()
    obreCataleg()
    await usuari.type(screen.getByLabelText('Cerca'), 'zzzz')
    expect(screen.queryAllByRole('article')).toHaveLength(0)
    expect(screen.getByText(/Cap llibre coincideix/i)).toBeInTheDocument()
  })

  test('Prova 9 · TODO 10 · els preferits es desen al navegador', async () => {
    const usuari = userEvent.setup()
    obreCataleg()
    await usuari.click(within(screen.getByRole('article', { name: /Solitud/i })).getByRole('button'))

    const desat = localStorage.getItem('pratllibres-preferits')
    expect(desat).not.toBeNull()
    expect(JSON.parse(desat as string)).toEqual([1])
  })

  test('Prova 10 · TODO 7 i 8 · una opinió vàlida es desa i neteja el formulari', async () => {
    const usuari = userEvent.setup()
    obreCataleg()
    await vesAOpinio(usuari)

    await usuari.type(screen.getByLabelText('Títol del llibre'), 'Solitud')
    await usuari.type(screen.getByLabelText('Comentari'), "M'ha agradat molt el final.")
    await usuari.click(screen.getByRole('button', { name: "Envia l'opinió" }))

    expect(screen.getByText(/Gràcies/i)).toBeInTheDocument()
    expect(screen.getByLabelText('Títol del llibre')).toHaveValue('')
  })
})
