# Sessió 3 · Navegació entre pantalles i creació de pàgines

Projecte **PratShop rutes**: exemple complet de la sessió 3 del mòdul 0488.

## Què hi ha

| Fitxer | Què mostra |
|---|---|
| `src/main.tsx` | `<BrowserRouter>` embolcallant l'aplicació |
| `src/App.tsx` | La taula de rutes: `<Routes>`, `<Route>`, `index`, `:id` i `*` |
| `src/components/Capcalera.tsx` | `<NavLink>` amb estat actiu i l'ús d'`end` |
| `src/components/Disposicio.tsx` | Disposició compartida amb `<Outlet />` |
| `src/pagines/Inici.tsx` | Pàgina simple amb `<Link>` |
| `src/pagines/Cataleg.tsx` | Cercador amb `useSearchParams` |
| `src/pagines/Producte.tsx` | Ruta dinàmica amb `useParams`, `useNavigate` i `<Navigate>` |
| `src/pagines/Contacte.tsx` | Navegació programada després d'enviar un formulari |
| `src/pagines/NoTrobada.tsx` | Pàgina 404 |
| `src/exemples/SenseRouter.tsx` | Com es faria sense router, per veure'n els límits |

## Executar

```bash
npm install
npm run dev
```

## Rutes de l'exemple

| URL | Pàgina |
|---|---|
| `/` | Inici |
| `/cataleg` | Catàleg |
| `/cataleg?cerca=tassa` | Catàleg filtrat |
| `/producte/2` | Fitxa del producte 2 |
| `/contacte` | Formulari de contacte |
| qualsevol altra | 404 |
