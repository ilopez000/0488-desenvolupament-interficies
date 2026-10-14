# Sessió 9 · Els hooks i com fer-ne de propis

Segona sessió de l'AEA2 del MP 0488 (RA3). Set exemples molt curts: els tres primers repassen els hooks de React que
més farem servir (`useState`, `useEffect`, `useRef`) i els quatre últims són **hooks propis**, funcions nostres que
comencen per `use` i que guarden una lògica per reutilitzar-la a qualsevol component.

```bash
npm install          # només la primera vegada
npm run dev          # http://localhost:5173
```

A dalt de la pàgina hi ha una pestanya per exemple. Cada pestanya diu quins fitxers has d'obrir per veure'n el codi.

## Què hi ha

| Exemple | Fitxers | Què aprens |
|---|---|---|
| 1 · useState | `src/exemples/01-MagradaAmbUseState.tsx` | el component recorda un valor entre pintades |
| 2 · useEffect | `src/exemples/02-TitolAmbUseEffect.tsx` | fer una feina fora de React (el títol de la pestanya) quan canvia un valor |
| 3 · useRef | `src/exemples/03-FocusAmbUseRef.tsx` | agafar un element de la pàgina i posar-hi el focus |
| 4 · useComptador | `src/hooks/useComptador.ts` · `src/exemples/04-DosBotonsMagrada.tsx` | el primer hook propi; cada component té el seu propi estat |
| 5 · useDisclosure | `src/hooks/useDisclosure.ts` · `src/exemples/05-PreguntesFrequents.tsx` | obrir, tancar i alternar qualsevol cosa |
| 6 · useLocalStorage | `src/hooks/useLocalStorage.ts` · `src/exemples/06-NomRecordat.tsx` | un `useState` que sobreviu quan recarregues la pàgina |
| 7 · useAmpladaFinestra | `src/hooks/useAmpladaFinestra.ts` · `src/exemples/07-MidaDeLaFinestra.tsx` | escoltar un esdeveniment del navegador i fer neteja |

## Les dues regles dels hooks

1. Crida'ls sempre **a dalt de tot** del component, mai dins d'un `if`, d'un bucle o d'una funció interna.
2. Crida'ls només des d'un **component** o des d'un **altre hook**.

`npm run lint` (oxlint) avisa si en trenques alguna.

React 19 · TypeScript 6 · Vite 8 · oxlint.
