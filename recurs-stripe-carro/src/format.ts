/** Màxim d'unitats d'un mateix producte (el servidor ho torna a comprovar) */
export const MAX_UNITATS = 10

/** 1500 cèntims → «15,00 €» */
export const euros = (centims: number) =>
  new Intl.NumberFormat('ca-ES', { style: 'currency', currency: 'EUR' }).format(centims / 100)
