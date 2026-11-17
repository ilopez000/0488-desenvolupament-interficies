import type { Linia, Producte } from '../tipus'

type Props = { linies: Linia[]; productes: Producte[] }

/** Resum del carret. El total és només orientatiu: el de debò el calcula el servidor. */
export default function ResumCarret({ linies, productes }: Props) {
  const files = linies.flatMap((linia) => {
    const producte = productes.find((p) => p.id === linia.id)
    return producte ? [{ ...linia, producte, import: producte.preu * linia.quantitat }] : []
  })
  const total = files.reduce((suma, f) => suma + f.import, 0)

  if (files.length === 0) return <p className="buit">El carret és buit.</p>

  return (
    <table className="resum">
      <tbody>
        {files.map((f) => (
          <tr key={f.id}>
            <td>
              {f.quantitat} × {f.producte.nom}
            </td>
            <td>{f.import.toFixed(2)} €</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td>{total.toFixed(2)} €</td>
        </tr>
      </tfoot>
    </table>
  )
}
