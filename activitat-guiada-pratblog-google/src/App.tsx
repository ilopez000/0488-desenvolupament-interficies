// Les rutes del blog
// ------------------------------------------------------------
// Part pública: / (llista d'articles) i /article/:id
// Part privada: tot el que penja de /admin, protegit per <RutaAdmin />
import { Route, Routes } from 'react-router'

import { Disposicio } from './components/Disposicio.tsx'
import { RutaAdmin } from './auth/RutaAdmin.tsx'
import { Inici } from './pagines/Inici.tsx'
import { Article } from './pagines/Article.tsx'
import { Login } from './pagines/Login.tsx'
import { NoTrobada } from './pagines/NoTrobada.tsx'
import { Panell } from './pagines/admin/Panell.tsx'
import { EditorArticle } from './pagines/admin/EditorArticle.tsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Disposicio />}>
        <Route index element={<Inici />} />
        <Route path="article/:id" element={<Article />} />
        <Route path="login" element={<Login />} />

        {/* Ruta «pare» sense path: decideix si es pinten les filles */}
        <Route element={<RutaAdmin />}>
          <Route path="admin" element={<Panell />} />
          <Route path="admin/nou" element={<EditorArticle />} />
          <Route path="admin/edita/:id" element={<EditorArticle />} />
        </Route>

        <Route path="*" element={<NoTrobada />} />
      </Route>
    </Routes>
  )
}
