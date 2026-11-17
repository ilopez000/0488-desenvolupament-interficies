/** Una fila de la taula users de la base de dades D1. */
export type Usuari = {
  id: string
  email: string
  nom: string
  foto: string | null
  alies: string
  cicle: string
  bio: string
  color: string
  visites: number
  creat: string
  ultim_acces: string
}

/** Els camps que l'usuari pot canviar. */
export type CanvisUsuari = Pick<Usuari, 'alies' | 'cicle' | 'bio' | 'color'>

/** El que veu tothom a la llista d'usuaris (sense correu ni id). */
export type UsuariPublic = Pick<Usuari, 'alies' | 'foto' | 'cicle' | 'bio' | 'color' | 'visites' | 'creat'>

/** La sessió oberta: la credencial de Google, quan caduca i la fila de l'usuari a la BD. */
export type Sessio = {
  credencial: string
  caduca: number // en mil·lisegons
  usuari: Usuari
  nou: boolean // true si en aquest inici de sessió l'hem registrat
}
