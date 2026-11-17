// PAS 4 · El catàleg és al SERVIDOR.
// El navegador només ens diu QUÈ vol comprar (id i quantitat), mai el PREU:
// si el preu vingués del navegador, qualsevol el podria canviar amb les eines de desenvolupador.

export const PRODUCTES = [
  { id: 'samarreta', nom: 'Samarreta PratMerch', preu: 15.0, emoji: '👕' },
  { id: 'tassa', nom: 'Tassa «Hola, món!»', preu: 8.5, emoji: '☕' },
  { id: 'dessuadora', nom: 'Dessuadora amb caputxa', preu: 29.9, emoji: '🧥' },
  { id: 'adhesius', nom: "Pack d'adhesius", preu: 3.0, emoji: '🏷️' },
]

/** Arrodoneix a dos decimals (els imports de diners sempre en tenen dos). */
const arrodonir = (n) => Math.round(n * 100) / 100

/**
 * Converteix les línies que envia la web en els productes i el total de la comanda.
 * Llança un error si alguna línia no és vàlida.
 * @param {{ id: string, quantitat: number }[]} linies
 */
export function calcularComanda(linies) {
  if (!Array.isArray(linies) || linies.length === 0) {
    throw new Error('El carret és buit.')
  }

  const productes = linies.map(({ id, quantitat }) => {
    const producte = PRODUCTES.find((p) => p.id === id)
    if (!producte) throw new Error(`Producte desconegut: ${id}`)
    if (!Number.isInteger(quantitat) || quantitat < 1 || quantitat > 10) {
      throw new Error(`Quantitat no vàlida per a ${producte.nom}`)
    }
    return {
      code: producte.id,
      name: producte.nom,
      quantity: quantitat,
      amount: arrodonir(producte.preu * quantitat),
    }
  })

  const total = arrodonir(productes.reduce((suma, p) => suma + p.amount, 0))
  return { productes, total }
}
