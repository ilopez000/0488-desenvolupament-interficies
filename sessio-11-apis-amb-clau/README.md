# Sessió 11 · APIs amb clau

Sessió de l'AEA2 del MP 0488. Continua la [sessió 10](../sessio-10-apis): ara les APIs demanen una **clau** (API key o
token). Fem servir dues APIs amb pla gratuït:

- **[OpenWeather](https://openweathermap.org/api)** (el temps): la clau va **dins la URL** (`appid=…`).
- **[TMDB](https://developer.themoviedb.org/)** (pel·lícules): el token va a la **capçalera** `Authorization: Bearer …`.

## Posar-lo en marxa

1. Aconsegueix les dues claus (pas a pas al guió de la sessió, apartat 3).
2. Copia `.env.example` i anomena la còpia `.env`. Enganxa-hi les claus.
3. Al terminal:

```bash
npm install          # només la primera vegada
npm run dev          # http://localhost:5173
```

> Si canvies el `.env`, atura el servidor (`Ctrl+C`) i torna a fer `npm run dev`.
> El fitxer `.env` **no es puja mai a GitHub** (és al `.gitignore`). El que es puja és `.env.example`, sense claus.

## Què hi ha

| Exemple | API | Fitxers | Què aprens |
|---|---|---|---|
| 1 · El temps | OpenWeather | `src/config/claus.ts` · `src/exemples/01-TempsCiutat.tsx` | llegir la clau del `.env` amb `import.meta.env`; clau a la URL; error 401 |
| 2 · Cercador de pel·lícules | TMDB | `src/exemples/02-CercadorPellicules.tsx` · `src/components/TargetaPellicula.tsx` | segon paràmetre de `fetch`; capçalera `Authorization: Bearer` |
| 3 · Pla de tarda | OpenWeather + TMDB | `src/hooks/useApi.ts` · `src/exemples/03-PlaDeTarda.tsx` | hook amb token; dues peticions encadenades (la 2a depèn de la 1a) |
| 4 · La clau amagada | TMDB via proxy | `vite.config.ts` · `src/exemples/04-ClauAmagada.tsx` | per què el `.env` NO amaga la clau al navegador; proxy del servidor |

## Atribució

Dades del temps: OpenWeather. Dades de pel·lícules: TMDB.
*This product uses the TMDB API but is not endorsed or certified by TMDB.*

React 19 · TypeScript 6 · Vite 8 · oxlint.
