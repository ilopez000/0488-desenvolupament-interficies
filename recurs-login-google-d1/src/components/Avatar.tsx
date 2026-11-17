import { useState } from 'react'

type Props = { foto: string | null; nom: string; color: string; mida?: number }

/** La foto de Google o, si no n'hi ha (o no carrega), la inicial sobre el color preferit. */
export default function Avatar({ foto, nom, color, mida = 40 }: Props) {
  const [falla, setFalla] = useState(false)
  const estil = { width: mida, height: mida, borderRadius: '50%', flexShrink: 0 }

  if (foto && !falla) {
    // referrerPolicy: sense això, Google de vegades no serveix la imatge des de localhost
    return <img src={foto} alt="" style={estil} referrerPolicy="no-referrer" onError={() => setFalla(true)} />
  }
  return (
    <span
      aria-hidden="true"
      style={{ ...estil, background: color, color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: mida * 0.45 }}
    >
      {nom.charAt(0).toUpperCase()}
    </span>
  )
}
