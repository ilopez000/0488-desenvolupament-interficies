import { missatgeErrorIA } from '../utils/missatgeErrorIA';
import { ESFORC_RAONAMENT, MODEL_IA, URL_IA } from './config';
import type { Missatge, RespostaIA, TrosIA } from './tipus';

// ─────────────────────────────────────────────────────────────
// Totes les crides a la IA passen per AQUÍ. Els components no fan
// mai fetch directament: criden preguntarIA o preguntarIAenDirecte.
// ─────────────────────────────────────────────────────────────

// Fa la petició POST al nostre servidor i comprova que hagi anat bé
async function enviar(missatges: Missatge[], extra: object, senyal?: AbortSignal) {
  const resposta = await fetch(URL_IA, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL_IA,
      reasoning_effort: ESFORC_RAONAMENT,
      messages: missatges,
      ...extra, // el que afegeixi cada funció (stream, response_format…)
    }),
    signal: senyal, // permet aturar la petició a mitges
  });

  if (!resposta.ok) {
    const detall = await resposta.text();
    throw new Error(missatgeErrorIA(resposta.status, detall));
  }
  return resposta;
}

type Opcions = {
  esquema?: object; // si hi és, la IA ha de respondre un JSON amb aquesta forma
  temperatura?: number; // 0 = sempre igual · 1 = més creativa
  senyal?: AbortSignal;
};

// 1) RESPOSTA SENCERA: esperem que la IA acabi i rebem tot el text de cop
export async function preguntarIA(missatges: Missatge[], opcions: Opcions = {}): Promise<string> {
  const extra: Record<string, unknown> = { temperature: opcions.temperatura ?? 0.7 };

  if (opcions.esquema) {
    extra.response_format = {
      type: 'json_schema',
      json_schema: { name: 'resposta', strict: true, schema: opcions.esquema },
    };
  }

  const resposta = await enviar(missatges, extra, opcions.senyal);
  const json: RespostaIA = await resposta.json();
  return json.choices[0]?.message.content ?? '';
}

// 2) EN DIRECTE (streaming): la resposta arriba a trossos i cada vegada
//    que n'arriba un cridem onTros amb tot el text que tenim fins ara
export async function preguntarIAenDirecte(
  missatges: Missatge[],
  onTros: (textFinsAra: string) => void,
  senyal?: AbortSignal,
): Promise<string> {
  const resposta = await enviar(missatges, { stream: true }, senyal);
  if (!resposta.body) throw new Error('Aquest navegador no pot llegir la resposta a trossos.');

  const lector = resposta.body.getReader(); // llegeix el cos a mesura que arriba
  const decodificador = new TextDecoder(); // passa de bytes a text
  let pendent = ''; // línia que encara no ha arribat sencera
  let text = ''; // tot el que ha escrit la IA fins ara

  while (true) {
    const { done, value } = await lector.read();
    if (done) break; // el servidor ha tancat la connexió

    pendent += decodificador.decode(value, { stream: true });
    const linies = pendent.split('\n');
    pendent = linies.pop() ?? ''; // l'última pot estar a mitges: la guardem

    for (const linia of linies) {
      if (!linia.startsWith('data:')) continue; // línies buides o de control
      const dada = linia.slice(5).trim();
      if (dada === '[DONE]') return text; // la IA ha acabat

      const tros: TrosIA = JSON.parse(dada);
      if (tros.error) throw new Error(`Error del servei d'IA: ${tros.error.message ?? ''}`);

      text += tros.choices?.[0]?.delta?.content ?? '';
      onTros(text);
    }
  }
  return text;
}
