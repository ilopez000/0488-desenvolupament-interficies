// PAS 5 · La petició LIST: la «fitxa» de la compra que enviem a Payoneer.
// Payoneer en torna una sessió de pagament (longId) i, si és HOSTED, l'adreça de la seva pàgina.

/**
 * @param {object} dades
 * @param {string} dades.transactionId  identificador NOSTRE de la comanda (únic)
 * @param {'HOSTED'|'EMBEDDED'} dades.integracio
 * @param {{ code: string, name: string, quantity: number, amount: number }[]} dades.productes
 * @param {number} dades.total
 * @param {string} dades.email
 * @param {string} dades.nom
 * @param {string} [dades.urlNotificacions]
 */
export function crearPeticioList({ transactionId, integracio, productes, total, email, nom, urlNotificacions }) {
  const urlWeb = process.env.URL_WEB ?? 'http://localhost:5173'
  const [firstName, ...resta] = nom.trim().split(/\s+/)

  const peticio = {
    transactionId,
    integration: integracio,
    operationType: 'CHARGE',
    country: 'ES',
    customer: {
      number: email,
      email,
      addresses: {
        billing: {
          street: 'Carrer de mostra, 1',
          city: 'El Prat de Llobregat',
          zip: '08820',
          country: 'ES',
          name: { firstName, lastName: resta.join(' ') || '-' },
        },
      },
    },
    payment: {
      amount: total,
      currency: 'EUR',
      reference: `PratMerch ${transactionId}`,
    },
    products: productes,
    style: { language: 'ca_ES', hostedVersion: 'v6' },
    callback: {
      returnUrl: `${urlWeb}/pagament/resultat`,
      cancelUrl: `${urlWeb}/pagament/cancellat`,
      ...(urlNotificacions ? { notificationUrl: urlNotificacions } : {}),
    },
  }

  // La «division» és el codi de la botiga dins del compte de comerciant.
  if (process.env.PAYONEER_DIVISION) peticio.division = process.env.PAYONEER_DIVISION

  return peticio
}
