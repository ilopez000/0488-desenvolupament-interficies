# Sessió 8 · PratShop UI: components de llibreria i Storybook

Primera sessió de l'AEA2 del MP 0488 (RA3). Una llibreria petita amb quatre components pensats per ser reutilitzats
(`Boto`, `Insignia`, `Avis`, `Valoracio`), documentats amb TSDoc i amb les seves històries de Storybook, i una pàgina
d'aparador que els fa servir.

```bash
npm install          # només la primera vegada
npm run dev          # l'aparador a http://localhost:5173
npm run storybook    # Storybook a http://localhost:6006
```

## Què hi ha

| Carpeta / fitxer | Contingut |
|---|---|
| `src/ui/tokens.css` | colors, espais i radis compartits per tots els components |
| `src/ui/Boto/` | botó amb variants, mides, estat de càrrega i totes les props natives d'un `<button>` |
| `src/ui/Insignia/` | etiqueta petita d'estat («Novetat», «−20 %») |
| `src/ui/Avis/` | missatge d'informació, èxit, avís o error, amb botó de tancar opcional |
| `src/ui/Valoracio/` | estrelles de només lectura o editables (component controlat) |
| `src/ui/index.ts` | punt d'entrada de la llibreria |
| `src/App.tsx` | l'aparador: una pàgina que fa servir la llibreria |
| `.storybook/` | configuració de Storybook (addons de documentació i accessibilitat) |

Cada component té tres fitxers a la seva carpeta: el component (`.tsx`), els estils (`.module.css`) i les històries
(`.stories.tsx`).

React 19 · TypeScript 6 · Vite 8 · Storybook 10 (addon-docs i addon-a11y) · clsx.
