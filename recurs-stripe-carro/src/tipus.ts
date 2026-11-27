/** Un producte del catàleg, tal com el dona el servidor (preu en cèntims) */
export type Producte = {
  id: string
  nom: string
  descripcio: string
  preu: number
  emoji: string
}

/** Una línia del carro: només QUIN producte i QUANTES unitats (el preu no hi és) */
export type LiniaCarro = {
  id: string
  quantitat: number
}

/** Un article cobrat, tal com el retorna Stripe a través del nostre servidor */
export type LiniaCobrada = {
  nom: string
  quantitat: number
  import: number
}

/** La resposta de GET /api/sessio/:id */
export type Resultat = {
  pagat: boolean
  import: number
  correu: string | null
  linies: LiniaCobrada[]
}
