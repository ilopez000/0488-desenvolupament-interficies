import type { Pellicula } from '../tipus';

// Els cartells es demanen a un altre servidor de TMDB i NO necessiten clau.
// w185 = amplada de 185 píxels (n'hi ha d'altres: w92, w342, w500, original).
const IMATGES = 'https://image.tmdb.org/t/p/w185';

export function TargetaPellicula({ pellicula }: { pellicula: Pellicula }) {
  // De "2021-09-15" només volem l'any. Si no hi ha data, un guió.
  const any = pellicula.release_date ? pellicula.release_date.slice(0, 4) : '—';

  return (
    <li className="peli">
      {pellicula.poster_path ? (
        <img src={IMATGES + pellicula.poster_path} alt={`Cartell de ${pellicula.title}`} />
      ) : (
        <div className="sense-cartell">Sense cartell</div>
      )}
      <strong>{pellicula.title}</strong>
      <span className="nota">
        {any} · ★ {pellicula.vote_average.toFixed(1)}
      </span>
    </li>
  );
}
