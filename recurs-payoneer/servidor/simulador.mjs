// SIMULADOR DE PAYONEER (mode «simulacio»)
// ─────────────────────────────────────────
// Imita, de manera molt simplificada, el que fa Payoneer Checkout perquè el projecte
// funcioni a classe sense cap compte de comerciant. NO és Payoneer i no cobra res.
//   · crearSessio / consultarSessio  → mateixa forma de resposta que l'API real
//   · GET  /simulador/pagina          → la «pàgina de pagament allotjada» (HOSTED)
//   · POST /simulador/api/cobrar      → el cobrament del formulari integrat (EMBEDDED)
// Targetes de prova DEL SIMULADOR: 4111 1111 1111 1111 → s'accepta · 4000 0000 0000 0002 → es rebutja

import { randomUUID } from 'node:crypto'
import express from 'express'

const sessions = new Map() // longId → { peticio, estat, motiu, shortId }

const urlWeb = () => process.env.URL_WEB ?? 'http://localhost:5173'

/** Resposta amb la mateixa forma (simplificada) que la de Payoneer. */
function respostaList(longId) {
  const s = sessions.get(longId)
  return {
    links: { self: `${urlWeb()}/simulador/lists/${longId}` },
    timestamp: new Date().toISOString(),
    operation: 'LIST',
    resultCode: '00000.11.000',
    resultInfo: 'SIMULADOR: sessió de pagament creada',
    status: { code: s.estat, reason: s.estat },
    interaction: s.interaccio,
    identification: { longId, shortId: s.shortId, transactionId: s.peticio.transactionId },
    integrationType: s.peticio.integration,
    payment: s.peticio.payment,
    ...(s.peticio.integration === 'HOSTED'
      ? { redirect: { url: `${urlWeb()}/simulador/pagina?listId=${longId}`, method: 'GET' } }
      : {}),
  }
}

export async function crearSessio(peticio) {
  const longId = `sim-${randomUUID()}`
  sessions.set(longId, {
    peticio,
    shortId: Math.random().toString(36).slice(2, 10).toUpperCase(),
    estat: 'listed',
    interaccio: { code: 'PROCEED', reason: 'OK' },
  })
  return respostaList(longId)
}

export async function consultarSessio(longId) {
  if (!sessions.has(longId)) {
    const error = new Error('SIMULADOR: aquesta sessió no existeix')
    error.status = 404
    throw error
  }
  return respostaList(longId)
}

/** Canvia l'estat de la sessió i «avisa» el nostre servidor com faria Payoneer. */
async function resoldre(longId, estat, interaccio) {
  const s = sessions.get(longId)
  s.estat = estat
  s.interaccio = interaccio
  const parametres = {
    transactionId: s.peticio.transactionId,
    longId,
    shortId: s.shortId,
    statusCode: estat,
    interactionCode: interaccio.code,
    interactionReason: interaccio.reason,
    amount: String(s.peticio.payment.amount),
    currency: s.peticio.payment.currency,
    reference: s.peticio.payment.reference,
  }
  const urlNotificacio = s.peticio.callback.notificationUrl
  if (urlNotificacio) {
    await fetch(`${urlNotificacio}?${new URLSearchParams(parametres)}`).catch(() => {})
  }
  return parametres
}

function decidir(numeroTargeta) {
  const numero = String(numeroTargeta ?? '').replace(/\D/g, '')
  if (numero === '4111111111111111') return ['charged', { code: 'PROCEED', reason: 'OK' }]
  return ['declined', { code: 'TRY_OTHER_ACCOUNT', reason: 'DECLINED' }]
}

export const rutes = express.Router()

// Pàgina de pagament allotjada (imitació). La web hi envia el client amb window.location.
rutes.get('/pagina', (req, res) => {
  const s = sessions.get(req.query.listId)
  if (!s) return res.status(404).send('SIMULADOR: sessió desconeguda')
  const { amount, currency } = s.peticio.payment
  const files = s.peticio.products
    .map((p) => `<tr><td>${p.quantity} × ${p.name}</td><td>${p.amount.toFixed(2)} €</td></tr>`)
    .join('')
  res.send(`<!doctype html><html lang="ca"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Simulador de Payoneer</title>
<style>
 body{font-family:system-ui,sans-serif;background:#eef1f6;margin:0;display:grid;place-items:center;min-height:100vh}
 .targeta{background:#fff;border-radius:14px;box-shadow:0 8px 30px #0002;padding:28px;width:min(420px,92vw)}
 .avis{background:#fff4d6;border:1px solid #f0c04a;border-radius:8px;padding:8px 10px;font-size:13px}
 h1{font-size:20px;margin:14px 0 4px} table{width:100%;font-size:14px;margin:10px 0} td:last-child{text-align:right}
 label{display:block;font-size:13px;margin-top:10px} input{width:100%;box-sizing:border-box;padding:9px;border:1px solid #bbb;border-radius:6px;font-size:15px}
 .fila{display:flex;gap:10px} button{margin-top:16px;width:100%;padding:11px;border:0;border-radius:8px;font-size:15px;cursor:pointer}
 .pagar{background:#ff4800;color:#fff} .cancel{background:#e4e6eb}
</style></head><body><form class="targeta" method="post" action="/simulador/pagina">
<div class="avis">⚠️ <b>SIMULADOR</b> · Aquesta pàgina imita la de Payoneer. No és Payoneer i no cobra res.</div>
<h1>Pagament segur</h1><table>${files}<tr><td><b>Total</b></td><td><b>${amount.toFixed(2)} ${currency}</b></td></tr></table>
<input type="hidden" name="listId" value="${req.query.listId}">
<label>Número de targeta<input name="targeta" value="4111 1111 1111 1111" inputmode="numeric"></label>
<div class="fila"><label>Caducitat<input value="12/30"></label><label>CVC<input value="123"></label></div>
<button class="pagar" name="accio" value="pagar">Paga ${amount.toFixed(2)} €</button>
<button class="cancel" name="accio" value="cancellar" formnovalidate>Cancel·la i torna a la botiga</button>
</form></body></html>`)
})

// En prémer un botó de la pàgina allotjada: cobrem (o no) i tornem a la web amb paràmetres a la URL
rutes.post('/pagina', express.urlencoded({ extended: false }), async (req, res) => {
  const { listId, targeta, accio } = req.body
  const s = sessions.get(listId)
  if (!s) return res.status(404).send('SIMULADOR: sessió desconeguda')

  if (accio === 'cancellar') {
    const parametres = await resoldre(listId, 'aborted', { code: 'ABORT', reason: 'CUSTOMER_ABORT' })
    return res.redirect(303, `${s.peticio.callback.cancelUrl}?${new URLSearchParams(parametres)}`)
  }
  const [estat, interaccio] = decidir(targeta)
  if (estat === 'declined') {
    // Com a la pàgina real, si la targeta es rebutja el client es queda a la pàgina i pot tornar-ho a provar
    await resoldre(listId, estat, interaccio)
    return res.redirect(303, `/simulador/pagina?listId=${listId}`)
  }
  const parametres = await resoldre(listId, estat, interaccio)
  res.redirect(303, `${s.peticio.callback.returnUrl}?${new URLSearchParams(parametres)}`)
})

// Cobrament del formulari integrat (EMBEDDED) del simulador
rutes.post('/api/cobrar', express.json(), async (req, res) => {
  const { longId, targeta } = req.body
  if (!sessions.has(longId)) return res.status(404).json({ error: 'Sessió desconeguda' })
  const [estat, interaccio] = decidir(targeta)
  res.json(await resoldre(longId, estat, interaccio))
})
