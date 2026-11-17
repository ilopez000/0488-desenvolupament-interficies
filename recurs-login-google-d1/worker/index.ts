// API · Recurs 0488 · Login amb Google + Cloudflare D1
// ------------------------------------------------------------
// Totes les rutes comencen per /api/ i totes demanen haver iniciat la sessió amb Google.
// La resta d'adreces (/, /perfil, /usuaris...) les serveix Cloudflare amb els fitxers de React.
//
//   POST   /api/login     registre (1a vegada) o inici de sessió → fila de l'usuari
//   GET    /api/jo        consultar les meves dades
//   PUT    /api/jo        canviar les meves dades (alies, cicle, bio, color)
//   DELETE /api/jo        donar-me de baixa (esborrar la meva fila)
//   GET    /api/usuaris   llista pública dels usuaris registrats (sense correus)
import { usuariDeLaPeticio } from './google.ts'

/** Una fila de la taula users. */
type Usuari = {
  id: string
  email: string
  nom: string
  foto: string | null
  alies: string
  cicle: string
  bio: string
  color: string
  visites: number
  creat: string
  ultim_acces: string
}

const CICLES = ['DAM', 'DAW', 'ASIX', 'SMX', 'Altres']

const error = (missatge: string, status: number) => Response.json({ error: missatge }, { status })

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url)
    const metode = request.method

    // PAS 3 · Qui és? Si el token no és bo, 401 i no anem més enllà
    let jo
    try {
      jo = await usuariDeLaPeticio(request, env)
    } catch (e) {
      return error(`No autoritzat: ${(e as Error).message}`, 401)
    }

    // PAS 4 · Registre o inici de sessió (UPSERT: INSERT si no hi és, UPDATE si ja hi és)
    if (url.pathname === '/api/login' && metode === 'POST') {
      const usuari = await env.DB.prepare(
        `INSERT INTO users (id, email, nom, foto, alies, visites)
         VALUES (?1, ?2, ?3, ?4, ?5, 1)
         ON CONFLICT (id) DO UPDATE SET
           email = excluded.email,
           nom = excluded.nom,
           foto = excluded.foto,
           visites = users.visites + 1,
           ultim_acces = datetime('now')
         RETURNING *`,
      )
        .bind(jo.id, jo.email, jo.nom, jo.foto, jo.nom.split(' ')[0])
        .first<Usuari>()
      // Si és la primera visita, l'acabem de registrar
      return Response.json({ usuari, nou: usuari?.visites === 1 })
    }

    // PAS 5 · Consultar les meves dades
    if (url.pathname === '/api/jo' && metode === 'GET') {
      const usuari = await env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(jo.id).first<Usuari>()
      return usuari ? Response.json(usuari) : error('No estàs registrat', 404)
    }

    // PAS 6 · Canviar les meves dades (només els camps que l'usuari pot tocar)
    if (url.pathname === '/api/jo' && metode === 'PUT') {
      const dades = await request.json<Partial<Usuari>>().catch(() => ({}) as Partial<Usuari>)
      const alies = String(dades.alies ?? '').trim()
      const cicle = String(dades.cicle ?? '')
      const bio = String(dades.bio ?? '').trim()
      const color = String(dades.color ?? '')

      if (alies.length < 2 || alies.length > 20) return error("L'àlies ha de tenir entre 2 i 20 caràcters", 400)
      if (!CICLES.includes(cicle)) return error('Cicle no vàlid', 400)
      if (bio.length > 200) return error('La bio pot tenir com a màxim 200 caràcters', 400)
      if (!/^#[0-9a-f]{6}$/i.test(color)) return error('Color no vàlid', 400)

      const usuari = await env.DB.prepare(
        'UPDATE users SET alies = ?, cicle = ?, bio = ?, color = ? WHERE id = ? RETURNING *',
      )
        .bind(alies, cicle, bio, color, jo.id) // l'id surt del TOKEN, mai del cos de la petició
        .first<Usuari>()
      return usuari ? Response.json(usuari) : error('No estàs registrat', 404)
    }

    // PAS 7 · Donar-se de baixa
    if (url.pathname === '/api/jo' && metode === 'DELETE') {
      await env.DB.prepare('DELETE FROM users WHERE id = ?').bind(jo.id).run()
      return new Response(null, { status: 204 })
    }

    // PAS 8 · Llista dels usuaris registrats (només camps públics: sense correu ni id)
    if (url.pathname === '/api/usuaris' && metode === 'GET') {
      const { results } = await env.DB.prepare(
        'SELECT alies, foto, cicle, bio, color, visites, creat FROM users ORDER BY creat',
      ).all()
      return Response.json(results)
    }

    return error('Ruta no trobada', 404)
  },
} satisfies ExportedHandler<Env>
