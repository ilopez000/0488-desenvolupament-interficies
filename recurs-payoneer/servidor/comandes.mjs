// Magatzem de comandes i notificacions EN MEMÒRIA (s'esborra en aturar el servidor).
// En un projecte real seria una base de dades (Firestore, D1, MariaDB…).

const comandes = new Map() // transactionId → comanda
const notificacions = [] // les més noves al principi

export function desarComanda(comanda) {
  comandes.set(comanda.transactionId, { ...comanda, estat: 'listed', creada: new Date().toISOString() })
}

export function buscarComanda({ transactionId, longId }) {
  if (transactionId && comandes.has(transactionId)) return comandes.get(transactionId)
  return [...comandes.values()].find((c) => c.longId === longId)
}

export function actualitzarEstat(comanda, estat) {
  if (comanda) comanda.estat = estat
}

export function afegirNotificacio(parametres) {
  notificacions.unshift({ rebuda: new Date().toISOString(), parametres })
  if (notificacions.length > 50) notificacions.pop()
}

export const llistarNotificacions = () => notificacions
export const llistarComandes = () => [...comandes.values()].reverse()
