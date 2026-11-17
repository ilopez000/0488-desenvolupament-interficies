-- Migració 0001: la taula users
-- Cada fila és una persona que ha entrat amb Google. Es crea la primera vegada (registre)
-- i a cada inici de sessió se n'actualitzen les dades de Google, les visites i l'últim accés.
CREATE TABLE IF NOT EXISTS users (
  id          TEXT    PRIMARY KEY,                       -- el «sub» de Google (no canvia mai)
  email       TEXT    NOT NULL,
  nom         TEXT    NOT NULL,
  foto        TEXT,
  -- Dades que l'usuari pot consultar i canviar des de la web
  alies       TEXT    NOT NULL DEFAULT '',
  cicle       TEXT    NOT NULL DEFAULT 'DAM',
  bio         TEXT    NOT NULL DEFAULT '',
  color       TEXT    NOT NULL DEFAULT '#e1211d',
  -- Dades que posa el servidor
  visites     INTEGER NOT NULL DEFAULT 0,
  creat       TEXT    NOT NULL DEFAULT (datetime('now')),
  ultim_acces TEXT    NOT NULL DEFAULT (datetime('now'))
);
