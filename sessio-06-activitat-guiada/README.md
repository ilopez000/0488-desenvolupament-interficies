# PratLlibres · activitat guiada (MP 0488, sessió 6)

Petita aplicació de catàleg de llibres feta amb **React 19 + TypeScript + Vite**.
L'aplicació ja està muntada i arrenca: el que falta són **10 trossos de codi** marcats
amb `TODO 1` … `TODO 10`. Cadascun és d'una a tres línies.

## Com es treballa

```bash
npm install     # només la primera vegada
npm run dev     # obre l'aplicació a http://localhost:5173
npm test        # comprova els 10 TODO
```

Deixa `npm run dev` obert en una terminal i ves fent els TODO en ordre.
Quan n'acabis un, executa `npm test` en una altra terminal: cada prova et diu quin TODO comprova.

## Els 10 TODO

| # | Fitxer | Què has de fer | Prova que ho comprova |
|---|---|---|---|
| 1 | `src/pagines/Cataleg.tsx` | Declarar l'estat del cercador amb `useState` | Prova 1 |
| 2 | `src/pagines/Cataleg.tsx` | Enllaçar l'`onChange` del camp de cerca | Prova 1 |
| 3 | `src/pagines/Cataleg.tsx` | Escriure la condició del `filter` (títol o autor) | Prova 2 |
| 4 | `src/pagines/Cataleg.tsx` | Posar la `key` a cada element de la llista | Prova 3 |
| 5 | `src/App.tsx` | Afegir o treure un id de preferits sense mutar la llista | Prova 4 |
| 6 | `src/components/Capcalera.tsx` | Mostrar el globus amb el nombre de preferits | Prova 5 |
| 7 | `src/pagines/Opinio.tsx` | Fer del camp «Títol del llibre» un camp controlat | Prova 6 |
| 8 | `src/pagines/Opinio.tsx` | `preventDefault()`, desar els errors i marcar l'enviament | Proves 7 i 10 |
| 9 | `src/pagines/Cataleg.tsx` | Mostrar el missatge de llista buida | Prova 8 |
| 10 | `src/App.tsx` | Desar els preferits amb `useEffect` i `localStorage` | Prova 9 |

## Què has de lliurar

La carpeta del projecte **sense `node_modules`**, amb els 10 TODO resolts i les 10 proves en verd.
