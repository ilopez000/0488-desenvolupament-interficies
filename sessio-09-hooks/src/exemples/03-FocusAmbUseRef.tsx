import { useRef } from 'react';

export function FocusAmbUseRef() {
  const cercadorRef = useRef<HTMLInputElement>(null);

  function anarAlCercador() {
    cercadorRef.current?.focus();
  }

  return (
    <div className="targeta">
      <label>
        Cerca un producte
        <input ref={cercadorRef} type="search" />
      </label>
      <button onClick={anarAlCercador}>Vés al cercador</button>
    </div>
  );
}
