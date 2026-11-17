// El formulari de targeta OFICIAL de Payoneer (Checkout Web SDK) muntat dins d'un <div>.
// Les dades de la targeta les escriu el client dins dels camps de Payoneer: la nostra web no les veu mai.
import { useEffect, useRef } from 'react'

type Props = { longId: string; enPagar: () => void; enError: (missatge: string) => void }

export default function FormulariSandbox({ longId, enPagar, enError }: Props) {
  const contenidor = useRef<HTMLDivElement>(null)
  // Guardem les funcions en una ref perquè el formulari no es torni a muntar a cada render
  const avisos = useRef({ enPagar, enError })
  useEffect(() => {
    avisos.current = { enPagar, enError }
  })

  useEffect(() => {
    let cancellat = false
    const element = contenidor.current

    async function muntar() {
      // Import dinàmic: el paquet només es descarrega quan de debò fem servir Payoneer
      const { CheckoutWeb } = await import('@payoneer/checkout-web')
      const checkout = await CheckoutWeb({
        env: 'test', // 'test' = sandbox · 'live' = pagaments reals
        longId,
        onPaymentSuccess: async () => {
          avisos.current.enPagar()
          return false // ja naveguem nosaltres a la pàgina de resultat
        },
        onPaymentFailure: async (_checkout, _component, dades) => {
          avisos.current.enError(`Pagament no completat: ${dades?.resultInfo ?? 'error desconegut'}`)
          return false
        },
      })
      if (cancellat || !element) return
      const targetes = checkout.dropIn('cards') // undefined si la sessió no ofereix pagament amb targeta
      if (!targetes) throw new Error('Aquesta sessió no té el pagament amb targeta activat')
      targetes.mount(element)
    }

    muntar().catch((e: Error) => avisos.current.enError(`No s'ha pogut carregar Payoneer: ${e.message}`))
    return () => {
      cancellat = true
      element?.replaceChildren() // neteja en sortir de la pàgina
    }
  }, [longId])

  return <div ref={contenidor} className="formulari-payoneer" />
}
