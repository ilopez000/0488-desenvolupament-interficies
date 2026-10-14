import { useState } from 'react';

export function useDisclosure(inicial = false) {
  const [obert, setObert] = useState(inicial);

  const obrir = () => setObert(true);
  const tancar = () => setObert(false);
  const alternar = () => setObert((anterior) => !anterior);

  return { obert, obrir, tancar, alternar };
}
