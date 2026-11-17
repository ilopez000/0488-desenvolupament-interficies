import { Route, Routes } from 'react-router'
import Capcalera from './components/Capcalera'
import Inici from './pagines/Inici'
import NoTrobada from './pagines/NoTrobada'
import Perfil from './pagines/Perfil'
import Usuaris from './pagines/Usuaris'
import RutaProtegida from './sessio/RutaProtegida'

export default function App() {
  return (
    <>
      <Capcalera />
      <main>
        <Routes>
          <Route path="/" element={<Inici />} />
          <Route
            path="/perfil"
            element={
              <RutaProtegida>
                <Perfil />
              </RutaProtegida>
            }
          />
          <Route
            path="/usuaris"
            element={
              <RutaProtegida>
                <Usuaris />
              </RutaProtegida>
            }
          />
          <Route path="*" element={<NoTrobada />} />
        </Routes>
      </main>
    </>
  )
}
