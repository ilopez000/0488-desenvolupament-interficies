// ─────────────────────────────────────────────────────────────
// FUNCIÓ DE CLOUDFLARE PAGES · respon a POST /api/ia quan la web
// ja està publicada. Fa la mateixa feina que el proxy de Vite:
// rep la petició del navegador, hi afegeix la clau i la passa a Groq.
// La clau és un «secret» de Cloudflare: no surt mai del servidor.
// ─────────────────────────────────────────────────────────────

type Entorn = {
  IA_CLAU?: string; // secret (Settings → Variables and Secrets)
  IA_URL?: string; // opcional: per defecte, Groq
  IA_MODEL?: string; // opcional: si hi és, mana el servidor i no el navegador
};

// Límit de text de cada resposta: així ningú no pot gastar-te el pla gratuït de cop
const MAX_TOKENS = 2048;

export async function onRequestPost({ request, env }: { request: Request; env: Entorn }) {
  if (!env.IA_CLAU) {
    return Response.json({ error: { message: 'Falta el secret IA_CLAU al servidor' } }, { status: 500 });
  }

  const cos = (await request.json()) as Record<string, unknown>;
  cos.model = env.IA_MODEL || cos.model;
  cos.max_completion_tokens = Math.min(Number(cos.max_completion_tokens) || MAX_TOKENS, MAX_TOKENS);

  const servei = env.IA_URL || 'https://api.groq.com/openai/v1';
  const resposta = await fetch(`${servei}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.IA_CLAU}`, // la clau s'hi posa AQUÍ
    },
    body: JSON.stringify(cos),
  });

  // Tornem al navegador la resposta tal com arriba (també si és en streaming)
  return new Response(resposta.body, {
    status: resposta.status,
    headers: { 'Content-Type': resposta.headers.get('Content-Type') ?? 'application/json' },
  });
}
