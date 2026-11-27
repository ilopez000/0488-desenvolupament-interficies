import express from 'express'
import Stripe from 'stripe'
import { forat } from './forat.mjs'

const CLAU = process.env.STRIPE_SECRET_KEY ?? ''
const URL_WEB = process.env.URL_WEB ?? 'http://localhost:5173'

// Sense una clau de PROVES no arrenquem (així mai cobrarem de debò per error)
if (!CLAU.startsWith('sk_test_')) {
  console.error('Falta la clau secreta de proves (sk_test_...) al fitxer .env')
  process.exit(1)
}

const stripe = new Stripe(CLAU)

// El catàleg és del SERVIDOR: d'aquí surten els noms i, sobretot, els preus (en cèntims)
const CATALEG = [
  { id: 'samarreta', nom: 'Samarreta DAM2', descripcio: 'Cotó orgànic amb el logo del cicle', preu: 1500, emoji: '👕' },
  { id: 'dessuadora', nom: 'Dessuadora Prat FP', descripcio: 'Amb caputxa i butxaca davantera', preu: 3200, emoji: '🧥' },
  { id: 'tassa', nom: 'Tassa «A la meva màquina funciona»', descripcio: 'Ceràmica, 350 ml', preu: 900, emoji: '☕' },
  { id: 'gorra', nom: 'Gorra DAM2', descripcio: 'Talla única, ajustable', preu: 1200, emoji: '🧢' },
  { id: 'adhesius', nom: "Paquet d'adhesius", descripcio: 'React, TypeScript, Vite i Node', preu: 400, emoji: '🏷️' },
  { id: 'motxilla', nom: 'Motxilla per al portàtil', descripcio: 'Fins a 15,6 polzades', preu: 2800, emoji: '🎒' },
]
const MAX_UNITATS = 10

const app = express()

// ✏️ FORAT 01 · Fes que Express entengui el JSON que arriba al cos de les peticions (req.body)
app.use(forat(1))

// 1. El catàleg: la web el demana en arrencar
app.get('/api/productes', (_req, res) => {
  // ✏️ FORAT 02 · Respon amb tot el catàleg en format JSON
  forat(2)
})

// 2. Rebre el carro, comprovar-lo i crear la sessió de pagament de Stripe
app.post('/api/pagar', async (req, res) => {
  const { linies } = req.body ?? {}

  // ✏️ FORAT 03 · Comprova que «linies» és una llista (array) i que no és buida
  if (forat(3)) {
    return res.status(400).json({ error: 'El carro és buit' })
  }

  const line_items = []
  for (const linia of linies) {
    // ✏️ FORAT 04 · Busca al CATALEG el producte que té l'id d'aquesta línia
    const producte = forat(4)
    if (!producte) {
      return res.status(400).json({ error: `Producte desconegut: ${linia.id}` })
    }

    // ✏️ FORAT 05 · La quantitat ha de ser un nombre enter entre 1 i MAX_UNITATS
    const quantitatValida = forat(5)
    if (!quantitatValida) {
      return res.status(400).json({ error: `Quantitat no vàlida per a ${producte.nom}` })
    }

    line_items.push({
      // ✏️ FORAT 06 · Quantes unitats d'aquest producte vol el client
      quantity: forat(6),
      price_data: {
        currency: 'eur',
        // ✏️ FORAT 07 · Preu unitari en cèntims, tret del catàleg del servidor (mai del que enviï la web)
        unit_amount: forat(7),
        product_data: { name: producte.nom },
      },
    })
  }

  const sessio = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items,
    // ✏️ FORAT 08 · Adreça de tornada si es paga: la web amb l'id de la sessió, que Stripe hi escriurà
    success_url: forat(8),
    cancel_url: `${URL_WEB}/?cancelat=1`,
  })
  res.json({ url: sessio.url })
})

// 3. Preguntar a Stripe com ha acabat una sessió i què s'hi ha cobrat
app.get('/api/sessio/:id', async (req, res) => {
  // ✏️ FORAT 09 · Demana a Stripe la sessió de pagament que té aquest id
  const sessio = forat(9)
  // ✏️ FORAT 10 · Demana a Stripe els articles (line items) que s'han cobrat en aquesta sessió
  const articles = forat(10)

  res.json({
    // ✏️ FORAT 11 · Només és «pagat» si Stripe diu que l'estat del pagament és 'paid'
    pagat: forat(11),
    import: sessio.amount_total,
    correu: sessio.customer_details?.email ?? null,
    // ✏️ FORAT 12 · Converteix cada article de Stripe en un objecte { nom, quantitat, import }
    linies: forat(12),
  })
})

// Si alguna ruta falla (també les async), la web rep el motiu en JSON
app.use((error, _req, res, _next) => {
  console.error(error.message)
  res.status(error.statusCode ?? 500).json({ error: error.message })
})

app.listen(3001, () => console.log('Servidor escoltant a http://localhost:3001'))
