import { useEffect, useState } from 'react';

export function useAmpladaFinestra() {
  const [amplada, setAmplada] = useState(window.innerWidth);

  useEffect(() => {
    const actualitzar = () => setAmplada(window.innerWidth);
    window.addEventListener('resize', actualitzar);
    return () => window.removeEventListener('resize', actualitzar);
  }, []);

  return amplada;
}
