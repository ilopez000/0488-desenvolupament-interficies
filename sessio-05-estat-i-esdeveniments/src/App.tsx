import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import Capcalera from './components/Capcalera';
import Cataleg from './pagines/Cataleg';
import Carro from './pagines/Carro';
import Contacte from './pagines/Contacte';
import NoTrobada from './pagines/NoTrobada';
import type { LiniaCarro, Producte } from './tipus';

// Clau amb què es desa el carro al navegador.
const CLAU = 'pratshop-carro';

// Lectura inicial: es fa un sol cop, dins d'un try/catch per si el text desat és corrupte.
function carregaCarro(): LiniaCarro[] {
  try {
    const desat = localStorage.getItem(CLAU);
    return desat ? (JSON.parse(desat) as LiniaCarro[]) : [];
  } catch {
    return [];
  }
}

// L'estat del carro viu aquí, al pare comú de la capçalera, el catàleg i la pàgina del carro.
// Les dades baixen com a propietats; les accions baixen com a funcions.
export default function App() {
  const [carro, setCarro] = useState<LiniaCarro[]>(carregaCarro);

  // Estat derivat: es calcula a cada dibuixat, no es guarda a part.
  const unitats = carro.reduce((suma, linia) => suma + linia.unitats, 0);

  // Cada cop que canvia el carro, es desa al navegador.
  useEffect(() => {
    localStorage.setItem(CLAU, JSON.stringify(carro));
  }, [carro]);

  function afegeix(producte: Producte) {
    setCarro((anterior) => {
      const jaHiEs = anterior.find((linia) => linia.producte.id === producte.id);
      if (jaHiEs) {
        return anterior.map((linia) =>
          linia.producte.id === producte.id ? { ...linia, unitats: linia.unitats + 1 } : linia,
        );
      }
      return [...anterior, { producte, unitats: 1 }];
    });
  }

  function canviaUnitats(id: number, unitats: number) {
    setCarro((anterior) =>
      unitats <= 0
        ? anterior.filter((linia) => linia.producte.id !== id) // a zero, la línia desapareix
        : anterior.map((linia) => (linia.producte.id === id ? { ...linia, unitats } : linia)),
    );
  }

  function buida() {
    setCarro([]);
  }

  return (
    <>
      <Capcalera unitatsAlCarro={unitats} />
      <Routes>
        <Route path="/" element={<Cataleg onAfegir={afegeix} />} />
        <Route
          path="/carro"
          element={<Carro linies={carro} onCanviarUnitats={canviaUnitats} onBuidar={buida} />}
        />
        <Route path="/contacte" element={<Contacte />} />
        <Route path="*" element={<NoTrobada />} />
      </Routes>
    </>
  );
}
