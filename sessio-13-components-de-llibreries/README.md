# Sessió 13 · Importar components d'altres llibreries (I)

Sessió de l'AEA2 del MP 0488. Fins ara tots els components eren nostres: avui fem servir components que ha programat
algú altre. Quatre llibreries petites, gratuïtes i amb llicència MIT:

| Pestanya | Llibreria | La idea nova |
|---|---|---|
| 1 · Icones | [lucide-react](https://lucide.dev/guide/packages/lucide-react) | importar **per nom** i configurar amb props |
| 2 · Avisos | [sonner](https://sonner.emilkowal.ski) | un `<Toaster />` posat una vegada + la funció `toast()` |
| 3 · Codi QR | [react-qr-code](https://www.npmjs.com/package/react-qr-code) | importar **per defecte** |
| 4 · Calendari | [react-day-picker](https://daypicker.dev) | importar el **CSS** i l'**idioma** de la llibreria |
| 5 · Comanda completa | les quatre | el codi de partida de les **ampliacions** |

## Posar-lo en marxa

```bash
npm install
npm run dev
```

## Fitxers

- `src/exemples/01-Icones.tsx` … `05-ComandaCompleta.tsx`: un exemple per pestanya.
- `src/dades/productes.ts`: productes de prova de PratShop.
- `src/index.css`: estils (inclou la personalització del calendari amb variables CSS).

React 19 · TypeScript · Vite 8.
