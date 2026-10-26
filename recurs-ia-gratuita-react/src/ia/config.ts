// ─────────────────────────────────────────────────────────────
// Configuració de la IA. Tot el que pot canviar és AQUÍ.
// ─────────────────────────────────────────────────────────────

// On fem les peticions: al NOSTRE servidor (no directament a Groq).
// En local respon el proxy de Vite; publicat, la funció de Cloudflare.
export const URL_IA = '/api/ia';

// Quin model fem servir. Es pot canviar al .env sense tocar el codi.
export const MODEL_IA = import.meta.env.VITE_IA_MODEL || 'openai/gpt-oss-20b';

// Els models gpt-oss «pensen» abans de respondre. Amb 'low' pensen poc:
// responen més de pressa i gasten menys del límit gratuït.
export const ESFORC_RAONAMENT = 'low';
