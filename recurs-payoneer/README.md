# Recurs 0488 · Pagaments amb Payoneer Checkout

Exemple pràctic del recurs **«Connectar una web amb Payoneer»** del mòdul 0488 Desenvolupament d'interfícies (DAM2, Prat FP).

**PratMerch** és una botiga de marxandatge inventada feta amb **React 19 + TypeScript + Vite** i un **servidor Node (Express)** que parla amb l'API de **Payoneer Checkout**. Té dos exemples de pagament:

| Exemple | Integració | Què passa |
|---|---|---|
| 1 | `HOSTED` · pàgina allotjada | La web demana una sessió al servidor i envia el client a la pàgina de pagament de Payoneer. En acabar, Payoneer el torna a `/pagament/resultat` (o a `/pagament/cancellat`). |
| 2 | `EMBEDDED` · formulari integrat | El formulari de targeta de Payoneer (`@payoneer/checkout-web`) es munta dins de la nostra pàgina. El client no surt de la web. |

A més, la pàgina **Notificacions** mostra els avisos que Payoneer envia al servidor cada vegada que canvia l'estat d'un pagament.

## Arrencar-lo

**A Windows:** doble clic a `arrenca.bat`. Crea el `.env`, instal·la els paquets la primera vegada, engega el servidor i la web i obre el navegador.

**A mà (qualsevol sistema):**

```bash
cp .env.example .env
npm install
npm run dev        # servidor a :3001 i web a :5173
```

Obre `http://localhost:5173`.

## Dos modes (fitxer `.env`)

| `PAYONEER_MODE` | Per a què | Què cal |
|---|---|---|
| `simulacio` (per defecte) | Classe i proves. El servidor **imita** Payoneer: pàgina de pagament, formulari, estats i notificacions. No cobra res. | Res |
| `sandbox` | Parlar de debò amb l'entorn de proves de Payoneer (`api.sandbox.oscato.com`). | Compte de comerciant de Payoneer Checkout: `PAYONEER_MERCHANT_CODE`, `PAYONEER_API_TOKEN` i `PAYONEER_DIVISION` |

Targetes del **simulador**: `4111 1111 1111 1111` → s'accepta · `4000 0000 0000 0002` → es rebutja. En mode sandbox, fes servir les targetes de prova que indica la documentació de Payoneer.

## Estructura

```
servidor/
  servidor.mjs   rutes /api/... (crear pagament, consultar estat, notificacions)
  cataleg.mjs    productes i preus (el preu el posa SEMPRE el servidor)
  peticio.mjs    construeix la petició LIST per a Payoneer
  payoneer.mjs   client de l'API real (autenticació bàsica, POST /lists, GET /lists/{longId})
  simulador.mjs  imitació de Payoneer per al mode simulacio
  comandes.mjs   comandes i notificacions en memòria
src/
  api.ts                   la web només parla amb /api (mai amb Payoneer directament)
  pagines/Botiga.tsx       Exemple 1 (HOSTED)
  pagines/PagamentIntegrat.tsx + payoneer/FormulariSandbox.tsx   Exemple 2 (EMBEDDED)
  pagines/Resultat.tsx     returnUrl: compara el que diu la URL amb el que confirma el servidor
  pagines/Cancellat.tsx    cancelUrl
  pagines/Notificacions.tsx
```

## Regles d'or

1. El **token de l'API** només és al servidor (`.env`), mai al codi de React ni a GitHub.
2. L'**import** el calcula el servidor a partir del seu catàleg.
3. La **URL de retorn no demostra res**: l'estat bo és el que el servidor consulta a Payoneer (o rep per notificació).
4. Les dades de la **targeta** no passen mai per la nostra web: les escriu el client a la pàgina o als camps de Payoneer.

---

Ignasi López Aylagas · ilopez@pratfp.com
