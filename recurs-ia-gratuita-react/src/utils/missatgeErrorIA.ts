// Converteix el codi d'estat HTTP en una frase que l'usuari entengui.
// «detall» és el cos de la resposta d'error. Si és JSON i porta
// error.message (com fan Groq i OpenAI), l'afegim al final.
export function missatgeErrorIA(status: number, detall = ''): string {
  let motiu = '';
  try {
    motiu = JSON.parse(detall)?.error?.message ?? '';
  } catch {
    // no era JSON: ens quedem sense motiu
  }

  let frase: string;
  switch (status) {
    case 400:
      frase = 'Error 400: la petició no és correcta (model o paràmetre no vàlid).';
      break;
    case 401:
      frase = 'Error 401: falta la clau o no és vàlida. Has posat IA_CLAU al .env i has reiniciat npm run dev?';
      break;
    case 404:
      frase = 'Error 404: no es troba el servei o el model. Revisa IA_URL i VITE_IA_MODEL.';
      break;
    case 413:
      frase = 'Error 413: el text és massa llarg per al límit gratuït.';
      break;
    case 429:
      frase = 'Error 429: has arribat al límit gratuït. Espera una mica i torna-ho a provar.';
      break;
    default:
      frase = `Error ${status}: el servei d'IA no ha pogut respondre. Torna-ho a provar.`;
  }
  return motiu ? `${frase} (${motiu})` : frase;
}
