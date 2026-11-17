// Imitació del formulari integrat per al mode simulació. Mateixa interfície que FormulariSandbox.
// ⚠️ A la vida real MAI no fem un formulari propi amb el número de targeta: ho fa el component de Payoneer.
import { useState, type FormEvent } from 'react'

type Props = { longId: string; enPagar: () => void; enError: (missatge: string) => void }

export default function FormulariSimulat({ longId, enPagar, enError }: Props) {
  const [targeta, setTargeta] = useState('4111 1111 1111 1111')
  const [pagant, setPagant] = useState(false)

  async function pagar(e: FormEvent) {
    e.preventDefault()
    setPagant(true)
    const resposta = await fetch('/simulador/api/cobrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ longId, targeta }),
    })
    const resultat = await resposta.json()
    setPagant(false)
    if (resultat.statusCode === 'charged') enPagar()
    else enError(`Targeta rebutjada (${resultat.interactionReason}). Prova amb 4111 1111 1111 1111.`)
  }

  return (
    <form className="formulari-simulat" onSubmit={pagar}>
      <p className="avis">⚠️ SIMULADOR · Amb credencials de sandbox aquí hi apareix el formulari de Payoneer.</p>
      <label>
        Número de targeta
        <input value={targeta} onChange={(e) => setTargeta(e.target.value)} inputMode="numeric" />
      </label>
      <div className="fila">
        <label>
          Caducitat
          <input defaultValue="12/30" />
        </label>
        <label>
          CVC
          <input defaultValue="123" />
        </label>
      </div>
      <button className="principal" disabled={pagant}>
        {pagant ? 'Pagant…' : 'Paga'}
      </button>
    </form>
  )
}
