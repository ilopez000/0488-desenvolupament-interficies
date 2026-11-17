// Tauler per veure què ens ha anat dient Payoneer (o el simulador) servidor a servidor.
import { useEffect, useState } from 'react'
import { llegirNotificacions } from '../api'
import EtiquetaEstat from '../components/EtiquetaEstat'
import type { Notificacio } from '../tipus'

export default function Notificacions() {
  const [notificacions, setNotificacions] = useState<Notificacio[]>([])

  useEffect(() => {
    const carregar = () => llegirNotificacions().then(setNotificacions).catch(() => {})
    carregar()
    const rellotge = setInterval(carregar, 3000) // es refresca cada 3 segons
    return () => clearInterval(rellotge)
  }, [])

  return (
    <section>
      <h1>Notificacions rebudes</h1>
      <p className="nota">
        Les envia Payoneer a <code>/api/payoneer/notificacions</code> cada vegada que canvia l'estat d'un pagament.
      </p>
      {notificacions.length === 0 ? (
        <p>Encara no n'ha arribat cap.</p>
      ) : (
        <table className="taula">
          <thead>
            <tr>
              <th>Hora</th>
              <th>Comanda</th>
              <th>Estat</th>
              <th>interactionCode</th>
              <th>Import</th>
            </tr>
          </thead>
          <tbody>
            {notificacions.map((n, i) => (
              <tr key={`${n.rebuda}-${i}`}>
                <td>{new Date(n.rebuda).toLocaleTimeString('ca-ES')}</td>
                <td>{n.parametres.transactionId}</td>
                <td>
                  <EtiquetaEstat codi={n.parametres.statusCode} />
                </td>
                <td>{n.parametres.interactionCode}</td>
                <td>
                  {n.parametres.amount} {n.parametres.currency}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}
