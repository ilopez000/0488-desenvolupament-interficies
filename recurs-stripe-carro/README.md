# Recurs 0488 · Botiga amb carro de la compra i Stripe — activitat dels 25 forats

Activitat del mòdul **0488 Desenvolupament d'interfícies** (DAM2, Prat FP), continuació del recurs [`recurs-stripe`](../recurs-stripe).

La botiga d'un sol producte creix: ara té un **catàleg de sis productes**, un **carro de la compra** (afegir, treure, eliminar, buidar, total) que es desa al `localStorage`, i paga **tot el carro d'un cop** amb **Stripe Checkout**. Tot funciona a la **sandbox** de Stripe: no es cobra res de debò.

El codi té **25 forats**. Cada forat és una crida `forat(xx)` amb un comentari a sobre:

```ts
// ✏️ FORAT 19 · Nombre total d'unitats del carro (la suma de totes les quantitats)
const unitats = forat(19)
```

Has de **substituir `forat(xx)` pel codi que demana el comentari** (al forat 23, `...forat(23)` se substitueix per dues propietats). El document del recurs explica què va a cada forat.

## On són els forats

| Fitxer | Forats | Què s'hi fa |
|---|---|---|
| `servidor.mjs` | 01-12 | Catàleg, validació del carro, sessió de Checkout amb diverses línies i consulta del resultat |
| `src/useCarro.ts` | 13-19 | Hook propi del carro: estat amb `localStorage`, afegir, treure, eliminar i comptar unitats |
| `src/App.tsx` | 20, 23, 24 | Demanar el catàleg, enviar el carro al servidor i anar a Stripe |
| `src/components/TargetaProducte.tsx` | 21 | Botó «Afegir al carro» |
| `src/components/Carro.tsx` | 22 | Total del carro |
| `src/components/PantallaResultat.tsx` | 25 | Buidar el carro quan el pagament està confirmat |

## Com saps quin forat falta?

- **A la web:** surt un avís groc a baix a l'esquerra: «✏️ Falta completar el FORAT 13».
- **Al servidor:** la consola diu «✏️ FORAT 01 per completar (servidor.mjs)» i la web mostra l'error.

Omple el forat, desa, i la web (o el servidor) es torna a carregar sola. Quan no surti cap avís i puguis pagar el carro amb la targeta 4242, has acabat. Els fitxers `forat.mjs` i `src/forat.ts` són l'ajuda que fa sortir els avisos: **no els toquis**.

## Què cal

- Node.js 20 o superior.
- La clau secreta de la **sandbox** de Stripe (`sk_test_...`), la mateixa del recurs anterior (*Developers > API keys*).

## Arrencar-lo

**A Windows:** doble clic a `arrenca.bat`. La primera vegada crea el `.env` i l'obre perquè hi enganxis la clau; la segona instal·la els paquets, engega el servidor i la web i obre el navegador.

**A mà (qualsevol sistema):**

```bash
cp .env.example .env      # i posa-hi STRIPE_SECRET_KEY=sk_test_...
npm install
npm run dev               # servidor a :3001 i web a :5173
```

Obre `http://localhost:5173`. Al principi el servidor s'aturarà al **FORAT 01**: és normal.

## Targetes de prova

| Targeta | Resultat |
|---|---|
| `4242 4242 4242 4242` | Pagament acceptat |
| `4000 0025 0000 3155` | Demana autenticació (3D Secure) |
| `4000 0000 0000 9995` | Pagament rebutjat |

Data de caducitat: qualsevol data futura. CVC: tres xifres qualssevol.

## Regles d'or (les mateixes del recurs anterior, i una de nova)

1. La **clau secreta** només és al servidor (`.env`), mai a React ni a GitHub.
2. Els **preus** els posa el servidor: la web només envia **quin producte i quantes unitats**.
3. Que la URL porti `session_id` **no demostra res**: qui diu si s'ha pagat és Stripe, i ho preguntem des del servidor.
4. El **carro** viu al navegador (`localStorage`), per això sobreviu a una recàrrega i al viatge a Stripe.
