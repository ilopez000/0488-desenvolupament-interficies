// SERVIDOR · Recurs 0488 · Pagaments amb Payoneer Checkout
// Arrenca amb: npm run servidor (o tot junt amb npm run dev / arrenca.bat)

import { randomUUID } from 'node:crypto'
import express from 'express'
import { PRODUCTES, calcularComanda } from './cataleg.mjs'
import { crearPeticioList } from './peticio.mjs'
import * as payoneer from './payoneer.mjs'
import * as simulador from './simulador.mjs'
import {
  actualitzarEstat,
  afegirNotificacio,
  buscarComanda,
  desarComanda,
  llistarComandes,
  llistarNotificacions,
} from './comandes.mjs'

// PAS 2 · Triem amb qui parlem segons el .env: el Payoneer de proves o el simulador
const MODE = process.env.PAYONEER_MODE === 'sandbox' ? 'sandbox' : 'simulacio'
const pasarela = MODE === 'sandbox' ? payoneer : simulador
const PORT = Number(process.env.PORT ?? 3001)

const app = express()
app.use(express.json())

/** On ens ha d'avisar Payoneer quan canviï l'estat d'un pagament. */
function urlNotificacions() {
  if (MODE === 'simulacio') return `http://localhost:${PORT}/api/payoneer/notificacions`
  const publica = process.env.URL_PUBLICA_NOTIFICACIONS
  return publica ? `${publica.replace(/\/$/, '')}/api/payoneer/notificacions` : undefined
}

// La web pregunta en quin mode som per saber quin formulari ha de mostrar
app.get('/api/config', (_req, res) => res.json({ mode: MODE }))

// El catàleg (amb els preus del servidor)
app.get('/api/productes', (_req, res) => res.json(PRODUCTES))

// PAS 7 · Crear un pagament: comanda → petició LIST → sessió de Payoneer
app.post('/api/pagaments', async (req, res) => {
  try {
    const { linies, email, nom, integracio } = req.body
    if (!email || !nom) return res.status(400).json({ error: 'Calen el nom i el correu.' })

    const { productes, total } = calcularComanda(linies)
    const transactionId = `pm-${randomUUID().slice(0, 8)}`
    const peticio = crearPeticioList({
      transactionId,
      integracio: integracio === 'EMBEDDED' ? 'EMBEDDED' : 'HOSTED',
      productes,
      total,
      email,
      nom,
      urlNotificacions: urlNotificacions(),
    })

    const sessio = await pasarela.crearSessio(peticio)
    const longId = sessio.identification.longId
    desarComanda({ transactionId, longId, total, productes, email })

    res.json({ transactionId, longId, total, redirectUrl: sessio.redirect?.url ?? null })
  } catch (error) {
    console.error('[pagaments]', error.message, error.dades ?? '')
    res.status(error.status === 401 ? 502 : 400).json({ error: error.message })
  }
})

// PAS 9 · Consultar l'estat REAL d'un pagament (no ens refiem de la URL de retorn)
app.get('/api/pagaments/:longId', async (req, res) => {
  try {
    const sessio = await pasarela.consultarSessio(req.params.longId)
    const comanda = buscarComanda({ longId: req.params.longId })
    actualitzarEstat(comanda, sessio.status?.code)
    res.json({
      estat: sessio.status?.code,
      interaccio: sessio.interaction,
      transactionId: sessio.identification?.transactionId,
      total: comanda?.total ?? sessio.payment?.amount,
    })
  } catch (error) {
    res.status(error.status ?? 500).json({ error: error.message })
  }
})

// PAS 10 · Notificacions: Payoneer ens avisa (servidor a servidor) de cada canvi d'estat.
// Accepta GET i POST, amb els paràmetres a la URL o al cos.
app.all('/api/payoneer/notificacions', express.urlencoded({ extended: false }), (req, res) => {
  const parametres = { ...req.query, ...(typeof req.body === 'object' ? req.body : {}) }
  afegirNotificacio(parametres)
  const comanda = buscarComanda({ transactionId: parametres.transactionId, longId: parametres.longId })
  actualitzarEstat(comanda, parametres.statusCode)
  console.log('[notificació]', parametres.transactionId, parametres.statusCode, parametres.interactionCode)
  res.sendStatus(200) // Responem ràpid amb un 200: si no, Payoneer ho tornarà a provar
})

// Per al tauler de la web: què ha arribat i com estan les comandes
app.get('/api/notificacions', (_req, res) => res.json(llistarNotificacions()))
app.get('/api/comandes', (_req, res) => res.json(llistarComandes()))

// Rutes del simulador (només en mode simulacio)
if (MODE === 'simulacio') app.use('/simulador', simulador.rutes)

app.listen(PORT, () => {
  console.log(`Servidor a http://localhost:${PORT} · mode ${MODE.toUpperCase()}`)
  if (MODE === 'sandbox' && !process.env.PAYONEER_API_TOKEN) {
    console.warn('ATENCIÓ: mode sandbox sense PAYONEER_API_TOKEN al .env')
  }
})
