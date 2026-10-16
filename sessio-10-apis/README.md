# Sessió 10 · Connectar React amb APIs

Sessió de l'AEA2 del MP 0488. Quatre exemples molt curts per aprendre a demanar dades a una API des d'un component de
React amb `fetch`: dues APIs molt senzilles (Dog CEO i PokéAPI) i les **dades obertes de la Generalitat** (Socrata).
Cap API necessita clau ni registre.

```bash
npm install          # només la primera vegada
npm run dev          # http://localhost:5173
```

A dalt de la pàgina hi ha una pestanya per exemple. Cada pestanya diu quins fitxers has d'obrir per veure'n el codi.
Cal connexió a Internet: les dades són reals.

## Què hi ha

| Exemple | API | Fitxers | Què aprens |
|---|---|---|---|
| 1 · Un gos a l'atzar | [Dog CEO](https://dog.ceo/dog-api/) | `src/exemples/01-GosAleatori.tsx` | `fetch` + `await` + guardar la resposta a l'estat |
| 2 · Cercador de Pokémon | [PokéAPI](https://pokeapi.co/) | `src/exemples/02-CercadorPokemon.tsx` | URL que depèn de l'usuari; estats de càrrega i d'error; `resposta.ok` |
| 3 · Equipaments del meu municipi | [Dades obertes de Catalunya](https://analisi.transparenciacatalunya.cat/d/8gmd-gz7i) | `src/exemples/03-EquipamentsMunicipi.tsx` | carregar amb `useEffect`; paràmetres SoQL amb `URLSearchParams`; neteja amb `ignorar` |
| 4 · Pokédex amb useFetch | PokéAPI | `src/hooks/useFetch.ts` · `src/exemples/04-PokedexAmbUseFetch.tsx` | tota la lògica de la petició dins d'un hook propi |

## Els tres estats d'una petició

Tot component que demana dades ha de saber pintar tres situacions: **carregant**, **error** i **dades**.
I recorda: `fetch` no falla amb un 404, cal comprovar `resposta.ok`.

React 19 · TypeScript 6 · Vite 8 · oxlint.
