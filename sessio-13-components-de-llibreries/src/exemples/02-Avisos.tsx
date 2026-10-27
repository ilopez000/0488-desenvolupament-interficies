// De sonner només importem la FUNCIÓ toast. El component <Toaster />
// ja és a App.tsx: es posa UNA sola vegada a tota l'aplicació.
import { toast } from 'sonner';
import { productes, euros } from '../dades/productes';

export function Avisos() {
  function afegeix(nom: string, preu: number) {
    // toast.success → avís verd amb una icona de «fet».
    toast.success(`${nom} s'ha afegit a la cistella`, {
      description: `Preu: ${euros(preu)}`,
    });
  }

  return (
    <div className="targeta">
      <p>
        Cada botó crida una funció de la llibreria. L’avís apareix a la cantonada i
        desapareix sol.
      </p>

      <div className="fila">
        {productes.slice(0, 3).map((p) => (
          <button key={p.id} onClick={() => afegeix(p.nom, p.preu)}>
            Afegeix «{p.nom}»
          </button>
        ))}
      </div>

      <div className="fila">
        <button onClick={() => toast('Tens 3 productes a la cistella')}>
          Avís normal
        </button>
        <button onClick={() => toast.info('El cupó PRAT10 caduca demà')}>
          Informació
        </button>
        <button onClick={() => toast.warning('Només queden 2 motxilles')}>
          Advertència
        </button>
        <button onClick={() => toast.error('No s’ha pogut fer el pagament')}>
          Error
        </button>
      </div>
    </div>
  );
}
