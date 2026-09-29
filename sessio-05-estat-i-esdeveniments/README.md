# PratShop · sessió 5 · Estat, esdeveniments i formularis controlats

Projecte d'exemple del guió de la **sessió 5** del MP 0488 (AEA1, AA3). Fins ara PratShop era
estàtic; aquí li donem vida amb `useState`, els esdeveniments, les llistes filtrades, un formulari
controlat, l'estat aixecat al pare comú i `useEffect` amb `localStorage`.

## Com s'executa

```bash
npm install
npm run dev
```

## On és cada cosa del guió

| Apartat del guió | Fitxer |
|---|---|
| 2 · `useState`, les tres regles | `src/pagines/Cataleg.tsx` (cercador) i `src/App.tsx` (carro) |
| 3 · Esdeveniments (`onClick`, `onChange`, `onSubmit`) | `src/components/TargetaProducte.tsx`, `src/pagines/Cataleg.tsx`, `src/pagines/Contacte.tsx` |
| 4 · Llistes filtrades i la `key` | `src/pagines/Cataleg.tsx` |
| 5 · Formulari controlat i validació | `src/pagines/Contacte.tsx` |
| 6 · Aixecar l'estat al pare comú | `src/App.tsx` (estat) → `Capcalera`, `Cataleg`, `Carro` (propietats) |
| 7 · `useEffect` i `localStorage` | `src/App.tsx` (`CLAU`, `carregaCarro`, `useEffect`) |

Estructura:

```
sessio-05-estat-i-esdeveniments/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── main.tsx              punt d'entrada i <BrowserRouter>
    ├── App.tsx               l'estat del carro i les rutes
    ├── estils.css            variables de color i estils generals
    ├── tipus.ts              Producte i LiniaCarro
    ├── dades/productes.ts    vuit productes d'exemple
    ├── components/
    │   ├── Capcalera.tsx     menú i globus del carro
    │   └── TargetaProducte.tsx
    └── pagines/
        ├── Cataleg.tsx       cercador, filtre i llista
        ├── Carro.tsx         taula, unitats i total
        ├── Contacte.tsx      formulari controlat
        └── NoTrobada.tsx
```

Dos detalls per mirar al codi: el botó dels productes sense estoc es desactiva amb
`disabled={exhaurit}` (un booleà calculat, no un estat), i el recompte «3 de 8 productes» surt de
`visibles.length` i `productes.length`, també calculats.
