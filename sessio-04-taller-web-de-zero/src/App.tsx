import { Route, Routes } from 'react-router';
import Disposicio from './components/Disposicio';
import Inici from './pagines/Inici';
import Destinacions from './pagines/Destinacions';
import DetallDestinacio from './pagines/DetallDestinacio';
import Sobre from './pagines/Sobre';
import Contacte from './pagines/Contacte';
import NoTrobada from './pagines/NoTrobada';

// La taula de rutes: quina adreça dibuixa quin component.
export default function App() {
  return (
    <Routes>
      {/* Ruta pare sense path: només aporta la capçalera i el peu */}
      <Route element={<Disposicio />}>
        <Route index element={<Inici />} />
        <Route path="destinacions" element={<Destinacions />} />
        <Route path="destinacions/:id" element={<DetallDestinacio />} />
        <Route path="sobre" element={<Sobre />} />
        <Route path="contacte" element={<Contacte />} />
        <Route path="no-trobada" element={<NoTrobada />} />
        {/* Comodí: atrapa qualsevol adreça que no hagi coincidit */}
        <Route path="*" element={<NoTrobada />} />
      </Route>
    </Routes>
  );
}
