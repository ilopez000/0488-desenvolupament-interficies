import { useEffect, useState } from 'react';

// EXEMPLE 7 · useEffect amb localStorage
// useEffect serveix per sincronitzar el component amb alguna cosa de FORA de React:
// aquí, l'emmagatzematge del navegador. Recarrega la pàgina (F5) i la llista continua.

const CLAU = 'sessio5-llista-desitjos';

// Lectura inicial. Dins d'un try/catch: el que hi ha desat podria no ser JSON vàlid.
function carrega(): string[] {
  try {
    const desat = localStorage.getItem(CLAU);
    return desat ? (JSON.parse(desat) as string[]) : [];
  } catch {
    return [];
  }
}

export default function EfecteILocalStorage() {
  // Es passa la FUNCIÓ carrega (sense parèntesis): React només la crida al primer dibuixat.
  const [desitjos, setDesitjos] = useState<string[]>(carrega);
  const [text, setText] = useState('');

  // L'efecte s'executa DESPRÉS de dibuixar, i només quan canvia alguna cosa de la llista
  // de dependències. Aquí: cada cop que canvia «desitjos», es desa.
  useEffect(() => {
    localStorage.setItem(CLAU, JSON.stringify(desitjos));
    console.log('useEffect: llista desada →', desitjos); // per veure quan s'executa
  }, [desitjos]);
  //  [desitjos] → quan canvia la llista        (el que volem)
  //  []         → només un cop, en muntar-se
  //  sense res  → a cada dibuixat, també quan escrius al camp de text

  function afegeix(esdeveniment: React.FormEvent<HTMLFormElement>) {
    esdeveniment.preventDefault();
    const net = text.trim();
    if (net === '') return;
    setDesitjos([...desitjos, net]);
    setText('');
  }

  function treu(posicio: number) {
    setDesitjos(desitjos.filter((_, index) => index !== posicio));
  }

  return (
    <>
      <h1>7 · useEffect i localStorage</h1>
      <p className="subtitol">Una llista de desitjos que sobreviu quan recarregues la pàgina.</p>

      <div className="dues-columnes">
        <div className="caixa">
          <h3>Llista de desitjos</h3>
          <form className="botons" onSubmit={afegeix}>
            <input
              type="text"
              placeholder="Què t'agradaria comprar?"
              value={text}
              onChange={(esdeveniment) => setText(esdeveniment.target.value)}
            />
            <button type="submit">Afegeix</button>
          </form>
          {desitjos.length === 0 ? (
            <p className="nota">La llista és buida.</p>
          ) : (
            <ul className="sense-punts">
              {desitjos.map((desig, index) => (
                <li key={`${desig}-${index}`} className="fila">
                  <span>{desig}</span>
                  <button className="secundari" onClick={() => treu(index)}>Treu</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="caixa">
          <h3>Què passa per sota</h3>
          <p>
            Obre la consola (F12): cada cop que l'efecte s'executa hi surt una línia.
          </p>
          <p className="nota">
            Escriu al camp de text: el component es redibuixa a cada tecla, però a la consola no surt
            res, perquè «desitjos» no ha canviat. Afegeix o treu un element i sí que hi surt.
          </p>
          <p className="nota">
            En obrir la pàgina la línia surt dues vegades: és el mode estricte de React, que en
            desenvolupament executa cada efecte dos cops per ajudar a trobar errors.
          </p>
          <p className="nota">
            Per veure-ho desat: F12 → Aplicació → Emmagatzematge local → clau <code>{CLAU}</code>.
          </p>
          <pre>{JSON.stringify(desitjos)}</pre>
        </div>
      </div>
    </>
  );
}
