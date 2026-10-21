// Converteix el codi d'estat HTTP en una frase que l'usuari entengui.
// Amb les APIs amb clau, els que més veurem són el 401 i el 429.
export function missatgeError(status: number): string {
  switch (status) {
    case 401:
      return 'Error 401: la clau no és vàlida o encara no està activada.';
    case 403:
      return 'Error 403: la clau és correcta, però no té permís per fer això.';
    case 404:
      return 'Error 404: no s’ha trobat el que busques.';
    case 429:
      return 'Error 429: massa peticions en poc temps. Espera una mica.';
    default:
      return `Error ${status}: el servidor no ha pogut respondre.`;
  }
}
