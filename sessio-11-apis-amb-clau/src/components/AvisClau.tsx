// Si falta una clau, no fem cap petició (fallaria segur amb un 401):
// expliquem a l'usuari què ha d'afegir al fitxer .env.
type Props = {
  variable: string; // nom de la variable que falta, p. ex. "VITE_OWM_KEY"
  web: string; // pàgina on es pot aconseguir la clau
};

export function AvisClau({ variable, web }: Props) {
  return (
    <div className="avis">
      <p>
        <strong>Falta una clau.</strong> Afegeix la línia <code>{variable}=la_teva_clau</code> al fitxer
        <code>.env</code> (a l’arrel del projecte, al costat del <code>package.json</code>).
      </p>
      <p>
        On s’aconsegueix:{' '}
        <a href={web} target="_blank" rel="noreferrer">
          {web}
        </a>
      </p>
      <p>
        Després atura el servidor (<code>Ctrl+C</code>) i torna a fer <code>npm run dev</code>.
      </p>
    </div>
  );
}
