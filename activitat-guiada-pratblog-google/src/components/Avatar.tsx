// La foto de perfil de Google o, si no n'hi ha, la inicial del nom
import type { Usuari } from '../auth/tipus.ts'

export function Avatar({ usuari }: { usuari: Usuari }) {
  if (usuari.foto) {
    // referrerPolicy="no-referrer": sense això, Google de vegades no deixa
    // carregar la foto des de localhost
    return <img className="avatar" src={usuari.foto} alt="" referrerPolicy="no-referrer" />
  }
  return (
    <span className="avatar avatar-inicial" aria-hidden="true">
      {usuari.nom.charAt(0).toUpperCase()}
    </span>
  )
}
