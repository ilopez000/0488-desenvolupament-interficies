/**
 * Ajuda per a l'activitat dels forats. NO l'has de tocar.
 *
 * Cada forat del servidor és una crida forat(número). Mentre no la substitueixis pel codi bo,
 * escriu un avís a la consola i llança un error amb el número del forat (la web també el mostra).
 */
export function forat(numero) {
  const text = `FORAT ${String(numero).padStart(2, '0')} per completar (servidor.mjs)`
  console.error(`✏️  ${text}`)
  throw new Error(text)
}
