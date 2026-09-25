import estils from './Peu.module.css';

export default function Peu() {
  // new Date().getFullYear() dona l'any actual: així el peu no caduca mai.
  return (
    <footer className={estils.peu}>
      PratViatges · Projecte d'aula del CFGS DAM · {new Date().getFullYear()}
    </footer>
  );
}
