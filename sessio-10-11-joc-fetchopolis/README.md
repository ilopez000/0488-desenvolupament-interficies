# Fetchòpolis · L'aventura de les APIs

Videojoc d'aventura (RPG en 2D) per repassar **les sessions 10 i 11** del mòdul **0488 Desenvolupament d'interfícies**: connectar React amb APIs i fer servir APIs amb clau.

La Gran Pantalla de Fetchòpolis s'ha quedat sense dades: s'hi ha colat el **Bucle Infinit**, que fa centenars de peticions per segon, i les APIs només responen `429 Too Many Requests`. L'alumne és el personatge: passeja per la ciutat, parla amb la gent, respon preguntes, supera reptes, recull objectes per obrir noves zones i, al final, s'enfronta al Bucle Infinit.

## Com s'hi juga

1. Descarrega el fitxer [`index.html`](index.html) (botó **Download raw file** de GitHub) i obre'l amb Chrome, Edge o Firefox. No cal instal·lar res.
2. Escriu el teu nom i el grup, tria el color de la dessuadora i prem **Comença l'aventura**.
3. Segueix la **missió** (a dalt a l'esquerra) i la **fletxa groga**.

| Tecla | Acció |
|---|---|
| `←` `↑` `→` `↓` o `W` `A` `S` `D` | Caminar (amb `Maj`, corres) |
| `E`, `Espai` o `Intro` | Parlar, obrir, llegir, continuar |
| `1`–`4` | Triar una resposta |
| `I` | Motxilla (objectes) |
| `C` | Apunts recollits |
| `T` | Consola: peticions reals amb `fetch` |
| `M` | Mapa |
| `Esc` | Tancar la finestra |

En pantalles tàctils surten una creu de direccions i un botó **E**.

La partida es desa sola al navegador: si tanques la pestanya, en tornar-hi pots continuar on eres.

## Què hi ha al joc

| Capítol | Zona | Què es treballa |
|---|---|---|
| 1 | La Cuina del Servidor | Què és una API (el cambrer: la URL és la comanda i el JSON és el plat), vocabulari, codis d'estat, pestanya Network |
| 2 | La Gossera Dog CEO | `fetch`, `async`/`await`, els dos `await`, `onClick`, renderitzat condicional, el `type` de la resposta |
| 3 | El Laboratori PokéAPI | Els quatre estats, `try`/`catch`/`finally`, `resposta.ok` i el 404, el formulari (`preventDefault`, `trim`, `disabled`) |
| 4 | L'Arxiu de Dades Obertes | SoQL (`$select`, `$where`, `$order`, `$limit`, `$q`), `URLSearchParams`, `useEffect` amb `[url]`, la neteja amb `ignorar`, condició de carrera, `StrictMode` |
| 5 | El Taller dels Hooks i el Pont CORS | El hook `useFetch<T>`, errors típics, CORS i `Access-Control-Allow-Origin` |
| 6 | L'Oficina de les Claus | Per què una clau, 401/403/404/429, `.env`, `VITE_`, `.gitignore`, `import.meta.env`, què fer si la clau arriba a GitHub |
| 7 | La Torre del Temps | OpenWeather: la clau a la URL (`appid`), `units=metric`, `weather[0]`, l'ordre dels hooks |
| 8 | El Cinema TMDB | TMDB: el token a la capçalera `Authorization: Bearer`, la targeta de pel·lícula, dues APIs encadenades (*Pla de tarda*) |
| 9 | La Porta del Proxy | La clau del `.env` no és secreta al navegador, el proxy de Vite, què passa a producció |
| Final | El Bucle Infinit | Combat de preguntes: bucles de peticions, dependències, neteja, 429, ordre dels hooks… |

Tipus de repte: preguntes de resposta múltiple, ordenar línies de codi, omplir buits en el codi, relacionar conceptes, classificar, muntar URLs peça a peça, trobar la línia que falla i respostes numèriques.

**Objectes que obren llocs.** Cada zona està tancada amb una tanca o una porta que s'obre amb un objecte que et dona algú: la clau de la Gossera, el passi del Laboratori, el carnet de l'Arxiu, el fitxer `.gitignore` (obre el Cofre dels Secrets), la clau d'OpenWeather (obre la Torre del Temps), el token de TMDB (obre el Cinema)…

**Consola amb peticions reals.** Amb la tecla `T` s'obre una consola que fa `fetch` de debò a les APIs obertes de les sessions (Dog CEO, PokéAPI, Dades obertes de Catalunya, GBIF) i mostra `resposta.status`, `resposta.ok` i el JSON. Algunes missions demanen fer-hi una petició concreta. Si no hi ha connexió, es fa servir una resposta real desada perquè es pugui continuar.

**Apunts.** Pel mapa hi ha 12 pergamins amb els punts clau dels guions de les sessions 10 i 11. Es llegeixen amb la tecla `C`.

## Informe en PDF

En acabar, a la Gran Pantalla es pot descarregar un **informe en PDF** amb el nom, el grup, la data, el temps de joc, la nota sobre 100 (percentatge de reptes encertats **al primer intent**), el resultat de cada capítol i un apartat **Per repassar** amb cada repte fallat, la resposta correcta i l'explicació. Porta un codi de verificació al peu.

## Notes per al docent

- Un sol fitxer HTML, sense dependències locals. Necessita Internet per a les fonts, el generador de PDF (jsPDF des de cdnjs) i les peticions reals de la consola.
- Totes les APIs que es fan servir des de la consola envien `Access-Control-Allow-Origin: *` i no demanen clau. OpenWeather i TMDB es treballen sense claus reals: dins del joc, les claus són objectes.
- Per començar de zero: botó **❔** → **Esborra la partida**.

---

Ignasi López Aylagas · ilopez@pratfp.com · Prat FP · Curs 2026-27
