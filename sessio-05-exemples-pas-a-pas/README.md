# Sessió 5 · exemples pas a pas

Set exemples curts, **un per cada apartat del guió de la sessió 5** del MP 0488 (AEA1, AA3). Cada
exemple és un sol fitxer que es pot llegir de dalt a baix i no depèn de cap altre.

El projecte sencer on tot això treballa junt és [`sessio-05-estat-i-esdeveniments`](../sessio-05-estat-i-esdeveniments)
(PratShop amb catàleg, carro i formulari de contacte). Aquí cada idea es veu aïllada.

## Com s'executa

```bash
npm install
npm run dev
```

## Els exemples

| Fitxer (`src/exemples/`) | Apartat del guió | Què s'hi veu |
|---|---|---|
| `01-PerQueEstat.tsx` | Què és l'estat i per què cal | El mateix comptador amb una variable normal (no es mou) i amb `useState` |
| `02-ReglesUseState.tsx` | `useState` i les seves regles | Ganxos a dalt de tot · `push` contra `[...llista, nou]` · sumar 3 amb `setX(x + 1)` tres cops contra la forma funcional |
| `03-Esdeveniments.tsx` | Els esdeveniments | `onClick` amb arguments i sense, `onChange`, `onKeyDown`, `onSubmit` amb `preventDefault`, i un registre que mostra què arriba |
| `04-LlistaFiltradaIKey.tsx` | Llistes filtrades i la `key` | Cercador amb `filter` + `map`, i dues llistes de costat: amb `key={index}` la nota escrita salta de producte; amb `key={producte.id}`, no |
| `05-FormulariControlat.tsx` | Formularis controlats amb validació | Text, número i casella en un sol objecte d'estat, la funció `validar` i l'estat pintat en directe |
| `06-AixecarEstat.tsx` | Aixecar l'estat al pare comú | Dos germans (`LlistaProductes` i `ResumPreferits`) que comparteixen els preferits a través del pare |
| `07-EfecteILocalStorage.tsx` | `useEffect` amb `localStorage` | Llista de desitjos que sobreviu a recarregar, amb un avís a la consola cada cop que s'executa l'efecte |

`src/App.tsx` només pinta el menú per triar l'exemple.

## Per provar a classe

- **Exemple 1 i 2:** tingues la consola oberta (F12). Les versions incorrectes sí que canvien el valor;
  el que no fan és repintar.
- **Exemple 4:** escriu una nota al primer producte de cada llista i treu-lo.
- **Exemple 7:** afegeix dos desitjos i recarrega amb F5.

`npm run lint` dona un avís a `01-PerQueEstat.tsx`: és volgut, assenyala justament la variable normal
que l'exemple fa servir per ensenyar què no funciona.
