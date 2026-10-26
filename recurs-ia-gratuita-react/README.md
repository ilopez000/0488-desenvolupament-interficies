# IA gratuïta a React · xatbot i generador de tests

Recurs de l'AEA2 del MP 0488. Continua les [sessions 10 i 11](../sessio-11-apis-amb-clau): ara l'API és un **model
d'intel·ligència artificial** amb pla gratuït. Fem servir **[Groq](https://console.groq.com/)** amb el model obert
**`openai/gpt-oss-20b`** (llicència Apache 2.0), a través de l'API compatible amb OpenAI.

La clau **no arriba mai al navegador**: el navegador demana `/api/ia` al nostre servidor i és el servidor qui hi afegeix
la clau (en local, el proxy de Vite; publicat, una funció de Cloudflare Pages).

## Posar-lo en marxa

1. Crea una clau a <https://console.groq.com/keys> (pas a pas al document del recurs).
2. Copia `.env.example` i anomena la còpia `.env`. Enganxa la clau a `IA_CLAU=`.
3. Al terminal:

```bash
npm install          # només la primera vegada
npm run dev          # http://localhost:5173
```

> Si canvies el `.env`, atura el servidor (`Ctrl+C`) i torna a fer `npm run dev`.
> El fitxer `.env` **no es puja mai a GitHub** (és al `.gitignore`).

## Què hi ha

| Exemple | Fitxers | Què aprens |
|---|---|---|
| 1 · Xatbot | `src/ia/clientIA.ts` · `src/hooks/useXat.ts` · `src/exemples/01-Xatbot.tsx` | missatges `system`/`user`/`assistant`, historial, resposta en directe (streaming), aturar una petició |
| 2 · Generador de tests | `src/hooks/useIAJson.ts` · `src/exemples/quiz.ts` · `src/exemples/02-GeneradorTests.tsx` | demanar **JSON amb esquema** (`json_schema`), validar-lo i pintar components amb les dades |
| Servidor | `vite.config.ts` · `functions/api/ia.ts` | amagar la clau: proxy de Vite (local) i funció de Cloudflare Pages (publicat) |

## Canviar de proveïdor

Tot el codi parla el format d'OpenAI. Per fer servir un altre servei només cal canviar `IA_URL`, `IA_CLAU` i
`VITE_IA_MODEL` al `.env` (vegeu el document del recurs).

## Publicar a Cloudflare Pages

Build command `npm run build` · output `dist` · secret `IA_CLAU` a *Settings → Variables and Secrets*. La carpeta
`functions/` es publica sola i respon a `/api/ia`.

React 19 · TypeScript 6 · Vite 8 · oxlint.
