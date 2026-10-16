import { useEffect, useState } from 'react';

// Hook propi: demana una URL i ens torna les dades, si està carregant i l'error
export function useFetch<T>(url: string) {
  const [dades, setDades] = useState<T | null>(null);
  const [carregant, setCarregant] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignorar = false;

    async function carregar() {
      setCarregant(true);
      setError('');
      try {
        const resposta = await fetch(url);
        if (!resposta.ok) throw new Error(`Error ${resposta.status}`);
        const json: T = await resposta.json();
        if (!ignorar) setDades(json);
      } catch (err) {
        if (!ignorar) setError(err instanceof Error ? err.message : 'Error desconegut');
      } finally {
        if (!ignorar) setCarregant(false);
      }
    }

    carregar();

    return () => {
      ignorar = true;
    };
  }, [url]);

  return { dades, carregant, error };
}
