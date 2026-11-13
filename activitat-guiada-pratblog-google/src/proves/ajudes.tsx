// Ajudes per a les proves: sessions guardades i un render amb tot muntat.
// Les proves NO es connecten mai a Google.
import type { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { SessioProvider } from '../auth/SessioProvider.tsx'
import { ArticlesProvider } from '../dades/ArticlesProvider.tsx'
import type { Sessio } from '../auth/tipus.ts'

/** Deixa una sessió guardada al localStorage, com si ja haguéssim fet login */
export function guardaSessio(email: string, nom = 'Anna Admin', verificat = true) {
  const sessio: Sessio = {
    usuari: { id: '1', nom, email, emailVerificat: verificat },
    credencial: 'x.y.z',
    caduca: Date.now() + 3600_000,
  }
  localStorage.setItem('pratblog/sessio', JSON.stringify(sessio))
}

/** Renderitza un tros d'app amb el router (a la ruta indicada) i els providers */
export function renderAmbApp(element: ReactNode, ruta = '/') {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <ArticlesProvider>
        <SessioProvider>{element}</SessioProvider>
      </ArticlesProvider>
    </MemoryRouter>,
  )
}
