import express from 'express'
import Stripe from 'stripe'

const CLAU = process.env.STRIPE_SECRET_KEY ?? ''
const URL_WEB = process.env.URL_WEB ?? 'http://localhost:5173'

// Sense una clau de PROVES no arrenquem (així mai cobrarem de debò per error)
if (!CLAU.startsWith('sk_test_')) {
  console.error('Falta la clau secreta de proves (sk_test_...) al fitxer .env')
  process.exit(1)
}

const stripe = new Stripe(CLAU)

// El preu el decideix SEMPRE el servidor (en cèntims: 1500 = 15,00 €)
const PRODUCTE = { nom: 'Samarreta DAM2', preu: 1500 }

const app = express()

// 1. Crear la sessió de pagament i retornar l'adreça de la pàgina de Stripe
app.post('/api/pagar', async (_req, res) => {
  try {
    const sessio = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'eur',
            unit_amount: PRODUCTE.preu,
            product_data: { name: PRODUCTE.nom },
          },
        },
      ],
      success_url: `${URL_WEB}/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${URL_WEB}/?cancelat=1`,
    })
    res.json({ url: sessio.url })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// 2. Preguntar a Stripe com ha acabat una sessió
app.get('/api/sessio/:id', async (req, res) => {
  try {
    const sessio = await stripe.checkout.sessions.retrieve(req.params.id)
    res.json({
      pagat: sessio.payment_status === 'paid',
      import: sessio.amount_total,
      correu: sessio.customer_details?.email ?? null,
    })
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
})

app.listen(3001, () => console.log('Servidor escoltant a http://localhost:3001'))
