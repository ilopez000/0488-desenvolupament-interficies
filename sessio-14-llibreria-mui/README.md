# Sessió 14 · Importar components d'altres llibreries (II): MUI

Sessió de l'AEA2 del MP 0488. Instal·lem una llibreria **completa** de components, [MUI](https://mui.com/material-ui/),
la personalitzem amb un tema i n'embolcallem els components dins dels nostres (`src/ui/`).

| Pestanya | Què hi veuràs |
|---|---|
| 1 · Primers components | `Button`, `Chip`, `Rating`, `Alert`, `Stack` |
| 2 · Targetes | `Grid`, `Card` i la prop `sx` |
| 3 · Taula | `DataGrid` de [MUI X](https://mui.com/x/react-data-grid/) (versió gratuïta) |
| 4 · Formulari | `Dialog` + `TextField` i el nostre `BotoPratShop` |
| 5 · Tauler de gestió | tot junt: el codi de partida de les **ampliacions** |

## Posar-lo en marxa

```bash
npm install
npm run dev
```

## Fitxers clau

- `src/tema.ts`: el tema de PratShop (colors, lletra, formes).
- `src/main.tsx`: `ThemeProvider` + `CssBaseline`.
- `src/ui/BotoPratShop.tsx`: el nostre botó, que per dins fa servir el de MUI (patró embolcall).
- `src/components/FormulariProducte.tsx`: el formulari del diàleg.

Paquets: `@mui/material`, `@mui/icons-material`, `@mui/x-data-grid`, `@emotion/react`, `@emotion/styled`.
React 19 · TypeScript · Vite 8.
