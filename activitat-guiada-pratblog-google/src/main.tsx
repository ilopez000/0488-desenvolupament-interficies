// Punt d'entrada de l'aplicació
// ------------------------------------------------------------
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import App from './App.tsx'
import { GOOGLE_CLIENT_ID } from './config.ts'
import { ArticlesProvider } from './dades/ArticlesProvider.tsx'
import { SessioProvider } from './auth/SessioProvider.tsx'
import './index.css'

// TODO 3 · Embolcalla TOTA l'aplicació amb <GoogleOAuthProvider>,
// passant-li l'ID de client (GOOGLE_CLIENT_ID) i locale="ca".
// No t'oblidis de l'import de '@react-oauth/google' a dalt de tot.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ArticlesProvider>
        <SessioProvider>
          <App />
        </SessioProvider>
      </ArticlesProvider>
    </BrowserRouter>
  </StrictMode>,
)
