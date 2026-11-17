-- Dades d'exemple per a la classe (NOMÉS per a la D1 local): npm run db:exemple
-- Són usuaris inventats: no poden entrar perquè el seu id no és el «sub» de cap compte de Google real.
INSERT OR IGNORE INTO users (id, email, nom, foto, alies, cicle, bio, color, visites, creat, ultim_acces) VALUES
  ('exemple-1', 'marta@exemple.cat', 'Marta Vidal',  NULL, 'Marta',   'DAM',  'M''agrada React i el disseny d''interfícies.', '#e1211d', 12, '2026-09-16 16:02:00', '2026-11-16 18:40:00'),
  ('exemple-2', 'pau@exemple.cat',   'Pau Serra',    NULL, 'PauDev',  'DAW',  'Frontend i accessibilitat.',                 '#2a9d8f',  5, '2026-09-23 17:15:00', '2026-11-12 16:05:00'),
  ('exemple-3', 'laia@exemple.cat',  'Laia Font',    NULL, 'Laia_DB', 'DAM',  'SQL, SQLite i Cloudflare D1.',               '#264653',  8, '2026-10-02 15:30:00', '2026-11-17 15:20:00'),
  ('exemple-4', 'nil@exemple.cat',   'Nil Prats',    NULL, 'Nil',     'ASIX', '',                                           '#f4a261',  2, '2026-11-05 16:45:00', '2026-11-10 16:50:00');
