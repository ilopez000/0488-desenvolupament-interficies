// Configuració: llegim els valors del fitxer .env
// ------------------------------------------------------------
// Vite només exposa al navegador les variables que comencen per VITE_.
// Les llegim en un sol lloc perquè la resta del codi no hagi de saber
// d'on surten.

/**
 * TODO 1 · ID de client OAuth creat a Google Cloud.
 * Llegeix la variable VITE_GOOGLE_CLIENT_ID del .env. Si no hi és,
 * ha de quedar una cadena buida ('').
 */
export const GOOGLE_CLIENT_ID: string = '' // ← TODO 1

/**
 * TODO 2 · Converteix el text de VITE_ADMINS en una llista de correus.
 * Exemple: ' Anna@Gmail.com , ,pau@gmail.com' → ['anna@gmail.com', 'pau@gmail.com']
 * - separa per comes
 * - treu els espais del principi i del final de cada correu
 * - passa'ls a minúscules
 * - descarta els buits
 * Si el text és undefined, retorna una llista buida.
 */
export function llegeixAdmins(text: string | undefined): string[] {
  return [] // ← TODO 2
}

/** Correus que poden entrar a l'administració del blog. */
export const ADMINS: string[] = llegeixAdmins(import.meta.env.VITE_ADMINS)

/** Claus amb què guardem les dades al localStorage. */
export const CLAU_SESSIO = 'pratblog/sessio'
export const CLAU_ARTICLES = 'pratblog/articles'

// Avís primerenc: si falta l'ID, el botó de Google no es pintarà i l'error
// que dona Google és molt poc clar. Millor dir-ho nosaltres a la consola.
if (!GOOGLE_CLIENT_ID && import.meta.env.MODE !== 'test') {
  console.warn(
    'PratBlog · Falta VITE_GOOGLE_CLIENT_ID (TODO 1 o fitxer .env). Sense l’ID, el botó de Google no funcionarà.',
  )
}
