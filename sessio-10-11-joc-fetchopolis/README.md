# Fetchòpolis · L'aventura de les APIs

**Català** · [Castellano](#castellano) · [English](#english)

Videojoc d'aventura (RPG en 2D) per repassar **les sessions 10 i 11** del mòdul **0488 Desenvolupament d'interfícies**: connectar React amb APIs i fer servir APIs amb clau. Es pot jugar en **català, castellà i anglès** (selector a la portada i botó `CA/ES/EN` durant la partida, o tecla `L`).

La Gran Pantalla de Fetchòpolis s'ha quedat sense dades: s'hi ha colat el **Bucle Infinit**, que fa centenars de peticions per segon, i les APIs només responen `429 Too Many Requests`. L'alumne és el personatge: passeja per la ciutat, parla amb la gent, respon preguntes, supera reptes, recull objectes per obrir noves zones i, al final, s'enfronta al Bucle Infinit.

## Com s'hi juga

1. Descarrega el fitxer [`index.html`](index.html) (botó **Download raw file** de GitHub) i obre'l amb Chrome, Edge o Firefox. No cal instal·lar res.
2. Tria l'idioma, escriu el teu nom i el grup, tria el color de la dessuadora i prem **Comença l'aventura**.
3. Segueix la **missió** (a dalt a l'esquerra) i la **fletxa groga**.

| Tecla | Acció |
|---|---|
| `←` `↑` `→` `↓` o `W` `A` `S` `D` | Caminar (amb `Maj`, corres) |
| `E`, `Espai` o `Intro` | Parlar, obrir, llegir, continuar |
| `1`–`4` | Triar una resposta |
| `I` · `C` · `T` · `M` · `L` | Motxilla · Apunts · Consola amb `fetch` real · Mapa · Idioma |
| `Esc` | Tancar la finestra |

En pantalles tàctils surten una creu de direccions i un botó **E**. La partida es desa sola al navegador.

## Els 14 capítols

| Capítol | Zona | Què es treballa |
|---|---|---|
| 1 | La Cuina del Servidor | Què és una API, vocabulari, codis d'estat, pestanya Network |
| 2 | La Gossera Dog CEO | `fetch`, `async`/`await`, els dos `await`, el `type` de la resposta |
| 3 | El Laboratori PokéAPI | Els quatre estats, `try`/`catch`/`finally`, `resposta.ok` i el 404, el formulari |
| 4 | L'Arxiu de Dades Obertes | SoQL, `URLSearchParams`, `useEffect` amb `[url]`, la neteja, condició de carrera, `StrictMode` |
| 5 | El Taller dels Hooks i el Pont CORS | El hook `useFetch<T>`, errors típics, CORS |
| 6 | L'Oficina de les Claus | 401/403/404/429, `.env`, `VITE_`, `.gitignore`, `import.meta.env` |
| 7 | La Torre del Temps | OpenWeather: la clau a la URL (`appid`), `units=metric`, `weather[0]` |
| 8 | El Cinema TMDB | `Authorization: Bearer`, targeta de pel·lícula, dues APIs encadenades |
| 9 | La Porta del Proxy | La clau del `.env` no és secreta al navegador, el proxy de Vite |
| 10 | El Mercat dels Reptes | Reptes de la sessió 10: raça de gos, Pokémon sorpresa, `abilities`, cerca amb `$q`, TanStack Query/SWR |
| 11 | El Delta del Llobregat | iNaturalist (`results`, `photos[0].url`, camps opcionals) i GBIF (`matchType`) |
| 12 | El Registre de les Claus | Aconseguir les claus, plans gratuïts, `vite-env.d.ts`, `claus.ts`, `AvisClau`, `missatgeError` |
| 13 | L'Observatori | Reptes de la sessió 11: °C/°F, geolocalització, previsió de 5 dies, fitxa i pàgines de TMDB |
| 14 | La Platja del Prat | Open-Meteo Marine (`current`, `current_units`) i els cinc passos per a qualsevol API nova |
| Final | El Bucle Infinit | Combat de preguntes amb 3 cors |

Tipus de repte: test, ordenar, omplir buits de codi, relacionar, classificar, muntar URLs peça a peça, trobar la línia que falla i respostes numèriques. Cada zona s'obre amb un objecte que dona algú (claus, passis, el `.gitignore`, la clau d'OpenWeather, el token de TMDB, els prismàtics, les coordenades de la platja…). Amb la consola (tecla `T`) es fan **peticions reals** a Dog CEO, PokéAPI, Dades obertes de Catalunya, iNaturalist, GBIF i Open-Meteo; si no hi ha connexió, s'usen respostes reals desades. Pel mapa hi ha 17 pergamins amb els apunts.

**Informe PDF** al final, en l'idioma de la partida: nota sobre 100 (reptes encertats al primer intent), resultat de cada capítol i apartat «Per repassar» amb cada error, la resposta correcta i l'explicació.

**Notes per al docent.** Un sol fitxer HTML. Necessita Internet per a les fonts, el PDF (jsPDF de cdnjs) i les peticions reals. Les APIs de la consola no demanen clau; OpenWeather i TMDB es treballen sense claus reals (dins del joc, les claus són objectes). Per començar de zero: botó **❔** → **Esborra la partida**.

---

<a id="castellano"></a>
## Castellano

Videojuego de aventuras (RPG 2D) para repasar las **sesiones 10 y 11** del módulo **0488 Desarrollo de interfaces**: conectar React con APIs y usar APIs con clave. Disponible en **catalán, castellano e inglés**.

**Cómo se juega:** descarga [`index.html`](index.html), ábrelo en el navegador, elige **ES** en la portada (o pulsa `L` durante la partida), escribe tu nombre y sigue la misión y la flecha amarilla. Hay **14 capítulos** (de la Cocina del Servidor a la Playa del Prat) y un combate final contra el Bucle Infinito. Una consola (`T`) hace peticiones `fetch` reales a APIs abiertas. Al terminar se descarga un **informe PDF** con la nota (retos acertados a la primera) y lo que hay que repasar.

<a id="english"></a>
## English

Adventure game (2D RPG) to review **sessions 10 and 11** of module **0488 Interface Development**: connecting React to APIs and using APIs with keys. Playable in **Catalan, Spanish and English**.

**How to play:** download [`index.html`](index.html), open it in your browser, choose **EN** on the start screen (or press `L` while playing), type your name and follow the mission and the yellow arrow. There are **14 chapters** (from the Server Kitchen to El Prat Beach) and a final battle against the Infinite Loop. A console (`T`) sends real `fetch` requests to open APIs. At the end you can download a **PDF report** with your score (challenges right on the first try) and what to review.

---

Ignasi López Aylagas · ilopez@pratfp.com · Prat FP · Curs 2026-27
