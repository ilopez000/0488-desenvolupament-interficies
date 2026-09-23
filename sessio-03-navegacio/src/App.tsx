// Taula de rutes de l'aplicació: quina URL dibuixa quin component.
import { Routes, Route } from 'react-router';
import Disposicio from './components/Disposicio';
import Inici from './pagines/Inici';
import Cataleg from './pagines/Cataleg';
import Producte from './pagines/Producte';
import Contacte from './pagines/Contacte';
import NoTrobada from './pagines/NoTrobada';

export default function App() {
  return (
    <Routes>
      {/* Ruta pare sense path: només aporta la disposició comuna (capçalera i peu) */}
      <Route element={<Disposicio />}>
        {/* index = la pàgina que es veu quan la URL és exactament "/" */}
        <Route index element={<Inici />} />
        <Route path="cataleg" element={<Cataleg />} />
        {/* ":id" és un tros variable: /producte/1, /producte/2... */}
        <Route path="producte/:id" element={<Producte />} />
        <Route path="contacte" element={<Contacte />} />
        <Route path="no-trobada" element={<NoTrobada />} />
        {/* "*" atrapa qualsevol URL que no hagi coincidit abans */}
        <Route path="*" element={<NoTrobada />} />
      </Route>
    </Routes>
  );
}
