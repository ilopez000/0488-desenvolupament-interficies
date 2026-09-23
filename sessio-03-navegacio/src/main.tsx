import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// BrowserRouter és qui escolta la URL del navegador.
// Ha d'embolcallar tota l'aplicació, per això va aquí i no dins d'App.
import { BrowserRouter } from 'react-router';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
