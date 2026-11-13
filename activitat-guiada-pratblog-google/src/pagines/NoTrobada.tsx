import { Link } from 'react-router'

export function NoTrobada() {
  return (
    <section className="targeta centrada">
      <h1>404</h1>
      <p>Aquesta pàgina no existeix.</p>
      <Link to="/">Torna a la portada</Link>
    </section>
  )
}
