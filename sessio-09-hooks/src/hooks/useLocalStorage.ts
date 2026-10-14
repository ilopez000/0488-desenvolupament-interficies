import { useEffect, useState } from 'react';

export function useLocalStorage<T>(clau: string, inicial: T) {
  const [valor, setValor] = useState<T>(() => {
    const desat = localStorage.getItem(clau);
    return desat !== null ? (JSON.parse(desat) as T) : inicial;
  });

  useEffect(() => {
    localStorage.setItem(clau, JSON.stringify(valor));
  }, [clau, valor]);

  return [valor, setValor] as const;
}
