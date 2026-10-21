import { TargetaPellicula } from '../components/TargetaPellicula';
import { useApi } from '../hooks/useApi';
import type { LlistaPellicules } from '../tipus';

// EXEMPLE 4 · La clau amagada darrere d'un proxy
// Aquest component NO coneix cap clau. Demana /tmdb/... al NOSTRE servidor
// (el de Vite, a localhost) i és el servidor qui hi afegeix el token
// abans de passar la petició a TMDB. Mira-ho a vite.config.ts.
export function ClauAmagada() {
  // Fixa't: cap token com a segon paràmetre. La URL comença per /tmdb
  const { dades, carregant, error } = useApi<LlistaPellicules>(
    '/tmdb/3/movie/popular?language=es-ES&region=ES',
  );

  return (
    <div className="targeta">
      <p className="nota">
        Obre DevTools → Network: la petició va a <code>localhost</code> i no porta cap capçalera
        <code>Authorization</code>. El navegador no veu mai el token.
      </p>

      {carregant && <p>Carregant…</p>}
      {error && (
        <p className="error">
          {error} Has posat <code>TMDB_TOKEN</code> (sense VITE_) al .env i has reiniciat <code>npm run dev</code>?
        </p>
      )}

      {dades && (
        <ul className="cartellera">
          {dades.results.slice(0, 6).map((p) => (
            <TargetaPellicula key={p.id} pellicula={p} />
          ))}
        </ul>
      )}
    </div>
  );
}
