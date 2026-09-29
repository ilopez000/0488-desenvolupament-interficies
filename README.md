# 0488 · Desenvolupament d'interfícies — exemples de classe

Exemples del mòdul **0488 Desenvolupament d'interfícies** del cicle **DAM** de [Prat FP](https://pratfp.com), curs 2026-27.

Stack del mòdul: **React 19 + TypeScript** sobre **Vite**, amb **React Router 8**.

## Organització

Una carpeta per sessió de classe. Cada carpeta és un projecte independent que es pot obrir i executar tot sol.

| Sessió | Carpeta | Contingut |
|---|---|---|
| 3 | [`sessio-03-navegacio`](sessio-03-navegacio) | Navegació entre pantalles i creació de pàgines amb React Router 8: rutes, enllaços, disposicions amb `Outlet`, rutes dinàmiques, paràmetres de consulta i pàgina 404 |
| 4 | [`sessio-04-taller-web-de-zero`](sessio-04-taller-web-de-zero) | Taller **PratViatges**: una web sencera de zero — components amb props, CSS Modules i tokens, quatre pàgines més la fitxa de detall, i la navegació entre totes |
| 5 | [`sessio-05-estat-i-esdeveniments`](sessio-05-estat-i-esdeveniments) | **PratShop amb estat**: `useState` i les seves regles, esdeveniments, llistes filtrades amb `key`, formulari controlat amb validació, estat aixecat a `App` (el carro) i `useEffect` + `localStorage` |
| 6 | [`sessio-06-activitat-guiada`](sessio-06-activitat-guiada) | **Activitat guiada PratLlibres**: projecte de partida amb 10 `TODO` (cercador, filtre, `key`, preferits, globus, formulari controlat, `useEffect`) i 10 proves Vitest que els comproven amb `npm test` |

## Com executar un exemple

```bash
cd sessio-04-taller-web-de-zero
npm install
npm run dev
```

Obre l'adreça que surt a la consola (per defecte `http://localhost:5173`).

## Requisits

- Node.js 20 o superior
- npm

---

Ignasi López Aylagas · ilopez@pratfp.com
