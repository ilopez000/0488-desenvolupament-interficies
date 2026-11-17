// cancelUrl · El client ha tornat sense pagar. El carret es conserva perquè ho pugui tornar a provar.
import { Link, useSearchParams } from 'react-router'

export default function Cancellat() {
  const [parametres] = useSearchParams()
  return (
    <section>
      <h1>Pagament cancel·lat</h1>
      <p>No s'ha cobrat res. El carret continua tal com el tenies.</p>
      {parametres.get('transactionId') && (
        <p className="nota">Comanda: {parametres.get('transactionId')}</p>
      )}
      <Link className="boto principal" to="/">
        Torna a la botiga
      </Link>
    </section>
  )
}
