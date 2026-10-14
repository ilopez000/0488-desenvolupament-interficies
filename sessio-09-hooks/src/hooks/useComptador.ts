import { useState } from 'react';

export function useComptador(inicial = 0) {
  const [valor, setValor] = useState(inicial);

  const sumar = () => setValor((anterior) => anterior + 1);
  const reiniciar = () => setValor(inicial);

  return { valor, sumar, reiniciar };
}
