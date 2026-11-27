/**
 * Ajuda per a l'activitat dels forats. NO l'has de tocar.
 *
 * Cada forat del codi és una crida forat(número). Mentre no la substitueixis pel codi bo,
 * en executar-se mostra un avís groc a la pantalla i atura aquella part del programa.
 * Quan hagis omplert tots els forats, ja no es farà servir enlloc.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function forat(numero: number): any {
  const text = `✏️ Falta completar el FORAT ${String(numero).padStart(2, '0')}`
  mostraAvis(text)
  throw new Error(text)
}

const pendents = new Set<string>()

function mostraAvis(text: string) {
  pendents.add(text)
  let caixa = document.getElementById('avis-forats')
  if (!caixa) {
    caixa = document.createElement('div')
    caixa.id = 'avis-forats'
    caixa.style.cssText =
      'position:fixed;left:16px;bottom:16px;z-index:9999;max-width:420px;padding:12px 16px;' +
      'background:#fff4c2;border:2px solid #d4a300;border-radius:10px;font:600 15px system-ui;' +
      'color:#3d2f00;box-shadow:0 4px 14px rgb(0 0 0 / 15%)'
    document.body.append(caixa)
  }
  caixa.innerText = [...pendents].sort().join('\n')
}
