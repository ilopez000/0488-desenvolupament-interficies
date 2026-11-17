// PAS 6 · Client de l'API de Payoneer Checkout (mode «sandbox»).
// Tot passa al servidor: el token de l'API no ha d'arribar MAI al navegador.

const TIPUS = 'application/vnd.optile.payment.enterprise-v1-extensible+json'

function configuracio() {
  const api = process.env.PAYONEER_API_URL ?? 'https://api.sandbox.oscato.com/api'
  const merchant = process.env.PAYONEER_MERCHANT_CODE
  const token = process.env.PAYONEER_API_TOKEN
  if (!merchant || !token) {
    throw new Error('Falten PAYONEER_MERCHANT_CODE o PAYONEER_API_TOKEN al fitxer .env')
  }
  // Autenticació bàsica: «codi de comerciant:token» codificat en Base64
  const credencials = Buffer.from(`${merchant}:${token}`).toString('base64')
  return {
    api,
    capcaleres: { Authorization: `Basic ${credencials}`, 'Content-Type': TIPUS, Accept: TIPUS },
  }
}

async function cridar(ruta, opcions = {}) {
  const { api, capcaleres } = configuracio()
  const resposta = await fetch(`${api}${ruta}`, { ...opcions, headers: capcaleres })
  const dades = await resposta.json().catch(() => ({}))
  if (!resposta.ok) {
    const missatge =
      resposta.status === 401
        ? 'Payoneer ha rebutjat les credencials (401): revisa el codi de comerciant i el token del .env'
        : (dades.resultInfo ?? `Payoneer ha respost ${resposta.status}`)
    const error = new Error(missatge)
    error.status = resposta.status
    error.dades = dades
    throw error
  }
  return dades
}

/** Crea la sessió de pagament (operació LIST). */
export function crearSessio(peticio) {
  return cridar('/lists', { method: 'POST', body: JSON.stringify(peticio) })
}

/** Consulta l'estat actual de la sessió: és la font de la veritat. */
export function consultarSessio(longId) {
  return cridar(`/lists/${encodeURIComponent(longId)}`, { method: 'GET' })
}
