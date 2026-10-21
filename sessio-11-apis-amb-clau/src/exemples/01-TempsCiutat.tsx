import { useState } from 'react';
import { AvisClau } from '../components/AvisClau';
import { CLAU_OPENWEATHER } from '../config/claus';
import type { Temps } from '../tipus';
import { missatgeError } from '../utils/missatgeError';

// EXEMPLE 1 · OpenWeather: la clau viatja DINS LA URL
export function TempsCiutat() {
  const [ciutat, setCiutat] = useState('Barcelona'); // el que escriu l'usuari
  const [temps, setTemps] = useState<Temps | null>(null); // la resposta de l'API
  const [carregant, setCarregant] = useState(false);
  const [error, setError] = useState('');

  // Sense clau no té sentit demanar res: ho expliquem i prou.
  // (Va DESPRÉS dels useState: els hooks s'han de cridar sempre.)
  if (!CLAU_OPENWEATHER) {
    return <AvisClau variable="VITE_OWM_KEY" web="https://home.openweathermap.org/api_keys" />;
  }

  async function consultar() {
    setCarregant(true);
    setError('');
    setTemps(null);

    try {
      // Muntem els paràmetres de la URL. La clau és un paràmetre més: appid
      const parametres = new URLSearchParams({
        q: ciutat.trim(), // ciutat que ha escrit l'usuari
        appid: CLAU_OPENWEATHER, // ← LA CLAU
        units: 'metric', // graus Celsius (si no, ve en kelvin)
        lang: 'ca', // descripcions en català
      });
      const url = `https://api.openweathermap.org/data/2.5/weather?${parametres}`;

      const resposta = await fetch(url);

      // 401 = clau dolenta o no activada · 404 = ciutat que no existeix
      if (!resposta.ok) throw new Error(missatgeError(resposta.status));

      const dades: Temps = await resposta.json();
      setTemps(dades);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconegut');
    } finally {
      setCarregant(false);
    }
  }

  // Les dades que fem servir més d'un cop
  const cel = temps?.weather[0]; // primer (i normalment únic) estat del cel

  return (
    <div className="targeta">
      <form
        className="fila"
        onSubmit={(e) => {
          e.preventDefault(); // que el formulari no recarregui la pàgina
          consultar();
        }}
      >
        <input value={ciutat} onChange={(e) => setCiutat(e.target.value)} aria-label="Ciutat" />
        <button type="submit" disabled={carregant}>
          Consulta el temps
        </button>
      </form>

      {carregant && <p>Carregant…</p>}
      {error && <p className="error">{error}</p>}

      {temps && cel && (
        <div className="fitxa">
          <img
            className="icona-temps"
            src={`https://openweathermap.org/img/wn/${cel.icon}@2x.png`}
            alt={cel.description}
          />
          <div>
            <h3>
              {temps.name} ({temps.sys.country})
            </h3>
            <p className="gran">{Math.round(temps.main.temp)} °C</p>
            <p>
              {cel.description} · sensació de {Math.round(temps.main.feels_like)} °C
            </p>
            <p>
              Humitat: {temps.main.humidity} % · Vent: {Math.round(temps.wind.speed * 3.6)} km/h
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
