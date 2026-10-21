import { useEffect, useState } from 'react';
import { missatgeError } from '../utils/missatgeError';

// Hook propi: és el useFetch de la sessió 10 amb dues novetats.
//  1) Si li passem un token, l'envia a la capçalera Authorization.
//  2) Si la url és null, no fa cap petició (encara no sabem què demanar).
export function useApi<T>(url: string | null, token?: string) {
  const [dades, setDades] = useState<T | null>(null);
  const [carregant, setCarregant] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (url === null) return; // res a demanar (de moment)

    let ignorar = false; // es posarà a true si la url canvia abans d'acabar

    async function carregar(adreca: string) {
      setCarregant(true);
      setError('');
      setDades(null);
      try {
        // Només afegim Authorization si ens han donat un token
        const capcaleres: HeadersInit = token
          ? { Authorization: `Bearer ${token}` }
          : {};
        const resposta = await fetch(adreca, { headers: capcaleres });

        if (!resposta.ok) throw new Error(missatgeError(resposta.status));

        const json: T = await resposta.json();
        if (!ignorar) setDades(json);
      } catch (err) {
        if (!ignorar) setError(err instanceof Error ? err.message : 'Error desconegut');
      } finally {
        if (!ignorar) setCarregant(false);
      }
    }

    carregar(url);

    return () => {
      ignorar = true; // neteja: la resposta antiga ja no ens interessa
    };
  }, [url, token]); // són textos: React els compara pel valor i no hi ha bucle

  return { dades, carregant, error };
}
