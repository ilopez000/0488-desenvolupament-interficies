# 0488 · Desenvolupament d'interfícies — exemples de classe

Exemples del mòdul **0488 Desenvolupament d'interfícies** del cicle **DAM** de [Prat FP](https://pratfp.com), curs 2026-27.

Stack del mòdul: **React 19 + TypeScript** sobre **Vite**, amb **React Router 8**. A partir de l'AEA2, **Storybook** per dissenyar i documentar components.

## Organització

Una carpeta per sessió de classe. Cada carpeta és un projecte independent que es pot obrir i executar tot sol.

| Sessió | Carpeta | Contingut |
|---|---|---|
| 3 | [`sessio-03-navegacio`](sessio-03-navegacio) | Navegació entre pantalles i creació de pàgines amb React Router 8: rutes, enllaços, disposicions amb `Outlet`, rutes dinàmiques, paràmetres de consulta i pàgina 404 |
| 4 | [`sessio-04-taller-web-de-zero`](sessio-04-taller-web-de-zero) | Taller **PratViatges**: una web sencera de zero — components amb props, CSS Modules i tokens, quatre pàgines més la fitxa de detall, i la navegació entre totes |
| 5 | [`sessio-05-estat-i-esdeveniments`](sessio-05-estat-i-esdeveniments) | **PratShop amb estat**: `useState` i les seves regles, esdeveniments, llistes filtrades amb `key`, formulari controlat amb validació, estat aixecat a `App` (el carro) i `useEffect` + `localStorage` |
| 5 | [`sessio-05-exemples-pas-a-pas`](sessio-05-exemples-pas-a-pas) | **Exemples pas a pas de la sessió 5**: set exemples curts i independents, un per apartat del guió — per què cal l'estat, les regles de `useState`, esdeveniments, llista filtrada i `key`, formulari controlat, aixecar l'estat i `useEffect` + `localStorage` |
| 6 | [`sessio-06-activitat-guiada`](sessio-06-activitat-guiada) | **Activitat guiada PratLlibres**: projecte de partida amb 10 `TODO` (cercador, filtre, `key`, preferits, globus, formulari controlat, `useEffect`) i 10 proves Vitest que els comproven amb `npm test` |
| 8 | [`sessio-08-components-i-storybook`](sessio-08-components-i-storybook) | **PratShop UI** (inici de l'AEA2): components de llibreria amb una API ben dissenyada — props tipades i documentades amb TSDoc, valors per defecte, `ComponentProps<'button'>`, composició i esdeveniments — `Boto`, `Insignia`, `Avis` i `Valoracio`, amb les seves històries de **Storybook** (controls, actions, autodocs i addon d'accessibilitat) i una pàgina d'aparador que els fa servir |
| 9 | [`sessio-09-hooks`](sessio-09-hooks) | **Els hooks i com fer-ne de propis**: set exemples molt curts — repàs de `useState`, `useEffect` i `useRef`, i quatre hooks propis (`useComptador`, `useDisclosure`, `useLocalStorage` i `useAmpladaFinestra`) amb les dues regles dels hooks comprovades per oxlint |
| 10 | [`sessio-10-apis`](sessio-10-apis) | **Connectar React amb APIs**: quatre exemples molt curts amb `fetch` — Dog CEO (`fetch` + `await`), PokéAPI (estats de càrrega i d'error, `resposta.ok`), **Dades obertes de Catalunya** amb Socrata (`useEffect`, paràmetres SoQL amb `URLSearchParams` i neteja) i un hook propi `useFetch` |
| 11 | [`sessio-11-apis-amb-clau`](sessio-11-apis-amb-clau) | **APIs amb clau**: OpenWeather (clau a la URL, `appid`) i TMDB (token a la capçalera `Authorization: Bearer`), claus al fitxer `.env` amb `import.meta.env` i `.env.example`, hook `useApi` amb token, dues APIs encadenades (*Pla de tarda*) i proxy de Vite per amagar la clau. Cal crear el `.env` amb les claus pròpies abans de `npm run dev` |
| 10-11 | [`sessio-10-11-joc-fetchopolis`](sessio-10-11-joc-fetchopolis) | **Fetchòpolis**, videojoc de repàs de les sessions 10 i 11 en **català, castellà i anglès**: una aventura en 2D de 14 capítols on parles amb la gent, superes reptes sobre `fetch`, estats, `useEffect`, dades obertes, claus d'API i el proxy, reculls objectes per obrir noves zones i fas peticions reals des d'una consola. Un sol `index.html`: es descarrega i s'obre al navegador. En acabar genera un informe en PDF |

## Com executar un exemple

```bash
cd sessio-04-taller-web-de-zero
npm install
npm run dev
```

Obre l'adreça que surt a la consola (per defecte `http://localhost:5173`).

Els projectes amb Storybook (des de la sessió 8) també tenen:

```bash
npm run storybook   # http://localhost:6006
```

## Requisits

- Node.js 20 o superior
- npm

---

Ignasi López Aylagas · ilopez@pratfp.com
