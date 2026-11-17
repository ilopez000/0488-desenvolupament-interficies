import { GoogleOAuthProvider } from '@react-oauth/google'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import { GOOGLE_CLIENT_ID } from './config'
import { SessioProvider } from './sessio/SessioProvider'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID} locale="ca">
      <BrowserRouter>
        <SessioProvider>
          <App />
        </SessioProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
)
