// L'esquelet de totes les pàgines: capçalera, contingut i peu
import { Outlet } from 'react-router'
import { Capcalera } from './Capcalera.tsx'

export function Disposicio() {
  return (
    <>
      <Capcalera />
      <main className="contingut">
        <Outlet />
      </main>
      <footer className="peu">PratBlog · MP 0488 Desenvolupament d’interfícies · Prat FP</footer>
    </>
  )
}
