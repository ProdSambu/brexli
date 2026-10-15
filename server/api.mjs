// API degli account di Brexli: registrazione, accesso, progressi salvati.
// È un router Express che si può montare in qualsiasi server Node con Postgres:
//   app.use('/api', brexliApi({ pool, mergeProgress }))
import express from 'express';
import crypto from 'crypto';

const USERS = 'brexli_users';
const SESSIONS = 'brexli_sessions';
const PROGRESS = 'brexli_progress';
const ORIGINS = new Set(['https://prodsambu.github.io', 'http://localhost:5173', 'http://127.0.0.1:5173']);
const SESSION_DAYS = 180;

const scrypt = (pw, salt) => new Promise((res, rej) => crypto.scrypt(pw, salt, 64, { N: 16384, r: 8, p: 1 }, (e, k) => e ? rej(e) : res(k)));
async function hashPassword(pw) {
  const salt = crypto.randomBytes(16);
  return `scrypt$${salt.toString('base64')}$${(await scrypt(pw, salt)).toString('base64')}`;
}
async function checkPassword(pw, stored) {
  const [, salt, hash] = String(stored).split('$');
  if (!salt || !hash) return false;
  const a = await scrypt(pw, Buffer.from(salt, 'base64')), b = Buffer.from(hash, 'base64');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
const sha = t => crypto.createHash('sha256').update(t).digest('hex');
// Stesso costo di calcolo anche per utenti inesistenti: non si capisce chi è registrato dai tempi di risposta
const DUMMY = hashPassword('brexli-dummy-password');

// Limite tentativi per IP (in memoria): 20 accessi o registrazioni ogni 15 minuti
function limiter(max = 20, windowMs = 15 * 60 * 1000) {
  const hits = new Map();
  return (req, res, next) => {
    const ip = req.ip || req.socket.remoteAddress || '?';
    const now = Date.now();
    const h = (hits.get(ip) || []).filter(t => now - t < windowMs);
    if (h.length >= max) return res.status(429).json({ error: 'Troppi tentativi. Riprova tra qualche minuto.' });
    h.push(now); hits.set(ip, h);
    if (hits.size > 5000) for (const [k, v] of hits) if (!v.some(t => now - t < windowMs)) hits.delete(k);
    next();
  };
}

export async function setupTables(pool) {
  await pool.query(`create table if not exists ${USERS} (
    id serial primary key,
    username text not null unique,
    pass_hash text not null,
    created_at timestamptz not null default now()
  )`);
  await pool.query(`create table if not exists ${SESSIONS} (
    token_hash text primary key,
    user_id integer not null references ${USERS}(id) on delete cascade,
    created_at timestamptz not null default now(),
    last_used timestamptz not null default now()
  )`);
  await pool.query(`create table if not exists ${PROGRESS} (
    user_id integer primary key references ${USERS}(id) on delete cascade,
    data jsonb not null,
    updated_at timestamptz not null default now()
  )`);
}

export function brexliApi({ pool, mergeProgress }) {
  const r = express.Router();
  const ready = setupTables(pool);
  r.use(async (req, res, next) => {
    const origin = req.headers.origin;
    if (origin && ORIGINS.has(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Vary', 'Origin');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Max-Age', '86400');
    }
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    res.setHeader('Cache-Control', 'no-store');
    try { await ready; next(); } catch (e) { next(e); }
  });
  r.use(express.json({ limit: '256kb' }));

  const newSession = async userId => {
    const token = crypto.randomBytes(32).toString('base64url');
    await pool.query(`insert into ${SESSIONS} (token_hash, user_id) values ($1, $2)`, [sha(token), userId]);
    return token;
  };
  const auth = async (req, res, next) => {
    const m = /^Bearer (.+)$/.exec(req.headers.authorization || '');
    if (!m) return res.status(401).json({ error: 'Accesso richiesto.' });
    const tokenHash = sha(m[1]);
    const since = new Date(Date.now() - SESSION_DAYS * 864e5);
    const q = await pool.query(
      `select u.id, u.username from ${SESSIONS} s join ${USERS} u on u.id = s.user_id
       where s.token_hash = $1 and s.last_used > $2`, [tokenHash, since]);
    if (!q.rows[0]) return res.status(401).json({ error: 'Sessione scaduta: accedi di nuovo.' });
    await pool.query(`update ${SESSIONS} set last_used = now() where token_hash = $1`, [tokenHash]);
    req.user = q.rows[0]; req.tokenHash = tokenHash;
    next();
  };
  const creds = body => {
    const username = String(body?.username || '').trim().toLowerCase();
    const password = String(body?.password || '');
    if (!/^[a-z0-9._-]{3,24}$/.test(username)) return { error: 'Il nome utente deve avere da 3 a 24 caratteri tra lettere, numeri, punto, trattino e trattino basso.' };
    if (password.length < 8 || password.length > 200) return { error: 'La password deve avere almeno 8 caratteri.' };
    return { username, password };
  };
  const wrap = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
  const limit = limiter();

  r.post('/register', limit, wrap(async (req, res) => {
    const c = creds(req.body);
    if (c.error) return res.status(400).json({ error: c.error });
    const hash = await hashPassword(c.password);
    const taken = () => res.status(409).json({ error: 'Questo nome utente è già preso.' });
    if ((await pool.query(`select 1 from ${USERS} where username = $1`, [c.username])).rows.length) return taken();
    let q;
    try { q = await pool.query(`insert into ${USERS} (username, pass_hash) values ($1, $2) returning id`, [c.username, hash]); }
    catch (e) { if (e.code === '23505' || /duplicate|unique/i.test(e.message)) return taken(); throw e; }
    res.json({ token: await newSession(q.rows[0].id), username: c.username });
  }));

  r.post('/login', limit, wrap(async (req, res) => {
    const username = String(req.body?.username || '').trim().toLowerCase();
    const password = String(req.body?.password || '');
    const q = await pool.query(`select id, pass_hash from ${USERS} where username = $1`, [username]);
    const ok = q.rows[0] ? await checkPassword(password, q.rows[0].pass_hash) : (await checkPassword(password, await DUMMY), false);
    if (!ok) return res.status(401).json({ error: 'Nome utente o password non corretti.' });
    res.json({ token: await newSession(q.rows[0].id), username });
  }));

  r.post('/logout', wrap(auth), wrap(async (req, res) => {
    await pool.query(`delete from ${SESSIONS} where token_hash = $1`, [req.tokenHash]);
    res.json({ ok: true });
  }));

  r.get('/progress', wrap(auth), wrap(async (req, res) => {
    const q = await pool.query(`select data, updated_at from ${PROGRESS} where user_id = $1`, [req.user.id]);
    res.json({ username: req.user.username, data: q.rows[0]?.data || null, updatedAt: q.rows[0]?.updated_at || null });
  }));

  // Il server unisce i progressi ricevuti a quelli salvati: due dispositivi non si sovrascrivono
  r.put('/progress', wrap(auth), wrap(async (req, res) => {
    const incoming = req.body?.data;
    if (!incoming || typeof incoming !== 'object') return res.status(400).json({ error: 'Dati mancanti.' });
    const client = await pool.connect();
    try {
      await client.query('begin');
      const q = await client.query(`select data from ${PROGRESS} where user_id = $1 for update`, [req.user.id]);
      const merged = mergeProgress(q.rows[0]?.data || {}, incoming);
      await client.query(
        `insert into ${PROGRESS} (user_id, data, updated_at) values ($1, $2, now())
         on conflict (user_id) do update set data = excluded.data, updated_at = now()`, [req.user.id, JSON.stringify(merged)]);
      await client.query('commit');
      res.json({ data: merged });
    } catch (e) { await client.query('rollback').catch(() => {}); throw e; }
    finally { client.release(); }
  }));

  r.delete('/account', limit, wrap(auth), wrap(async (req, res) => {
    const q = await pool.query(`select pass_hash from ${USERS} where id = $1`, [req.user.id]);
    if (!await checkPassword(String(req.body?.password || ''), q.rows[0].pass_hash)) return res.status(401).json({ error: 'Password non corretta.' });
    await pool.query(`delete from ${USERS} where id = $1`, [req.user.id]);
    res.json({ ok: true });
  }));

  r.use((err, req, res, next) => {
    console.error('[brexli]', err);
    res.status(500).json({ error: 'Errore del server. Riprova tra poco.' });
  });
  return r;
}
