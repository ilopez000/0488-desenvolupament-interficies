import { Route, Routes } from 'react-router'
import Capcalera from './components/Capcalera'
import Botiga from './pagines/Botiga'
import Cancellat from './pagines/Cancellat'
import NoTrobada from './pagines/NoTrobada'
import Notificacions from './pagines/Notificacions'
import PagamentIntegrat from './pagines/PagamentIntegrat'
import Resultat from './pagines/Resultat'

export default function App() {
  return (
    <>
      <Capcalera />
      <main>
        <Routes>
          <Route path="/" element={<Botiga />} />
          <Route path="/pagament/integrat" element={<PagamentIntegrat />} />
          {/* returnUrl i cancelUrl de la petició LIST */}
          <Route path="/pagament/resultat" element={<Resultat />} />
          <Route path="/pagament/cancellat" element={<Cancellat />} />
          <Route path="/notificacions" element={<Notificacions />} />
          <Route path="*" element={<NoTrobada />} />
        </Routes>
      </main>
    </>
  )
}
