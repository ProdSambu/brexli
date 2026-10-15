(() => {
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const app = $('#app');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };

/* ---------- progressi: salvati in questo browser e, con un account, sul server ---------- */
// le chiavi conservano il vecchio nome del progetto, così chi aveva già dei progressi non li perde
const KEY = 'fondamenta.v1';
let data = {};
try { data = JSON.parse(localStorage.getItem(KEY)) || {}; } catch { data = {}; }
data = PROGRESS.cleanProgress(data);
const saveLocal = () => { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch {} updateCount(); };
const save = () => { saveLocal(); schedulePush(); };
function updateCount() {
  const n = data.review.filter(r => exerciseOf(r)).length;
  $('#revcount').textContent = n ? n : '';
}

// Indirizzo dell'API degli account (un solo punto da cambiare se il server si sposta)
const API = /^(localhost|127\.0\.0\.1)$/.test(location.hostname)
  ? 'http://localhost:3100/api'
  : 'https://brexli-api.onrender.com/api';
const AUTH_KEY = 'fondamenta.auth';
let auth = null;
try { auth = JSON.parse(localStorage.getItem(AUTH_KEY)); } catch { auth = null; }
let sync = { state: 'idle', at: 0, msg: '' };

async function api(path, { method = 'GET', body } = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 75000); // il server gratuito può metterci un minuto a svegliarsi
  const slow = setTimeout(() => setSync('waking'), 4000);
  try {
    const res = await fetch(API + path, {
      method, signal: ctrl.signal,
      headers: { 'Content-Type': 'application/json', ...(auth?.token ? { Authorization: 'Bearer ' + auth.token } : {}) },
      body: body ? JSON.stringify(body) : undefined,
    });
    const j = await res.json().catch(() => ({}));
    if (!res.ok) { const e = new Error(j.error || `Errore ${res.status}`); e.status = res.status; throw e; }
    return j;
  } catch (e) {
    if (!e.status) e.message = 'Server non raggiungibile. Controlla la connessione e riprova.';
    throw e;
  } finally { clearTimeout(timer); clearTimeout(slow); }
}
function setAuth(a) {
  auth = a;
  try { a ? localStorage.setItem(AUTH_KEY, JSON.stringify(a)) : localStorage.removeItem(AUTH_KEY); } catch {}
  updateNav();
}
function setSync(state, msg = '') {
  sync = { state, msg, at: state === 'ok' ? Date.now() : sync.at };
  const el = $('#syncstate'); if (el) el.innerHTML = syncText();
}
function syncText() {
  if (sync.state === 'syncing') return 'Sincronizzazione in corso…';
  if (sync.state === 'waking') return 'Il server si sta svegliando: può volerci fino a un minuto.';
  if (sync.state === 'ok') return `Progressi salvati online alle ${new Date(sync.at).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}.`;
  if (sync.state === 'error' || sync.state === 'offline') return `Non sincronizzato: ${esc(sync.msg)} I progressi restano salvati qui e verranno inviati alla prossima occasione.`;
  return 'I progressi si salvano online a ogni esercizio.';
}
function applyRemote(remote) {
  data = PROGRESS.mergeProgress(data, remote || {});
  saveLocal();
}
let pushTimer = null, pushing = null;
function schedulePush() {
  if (!auth) return;
  clearTimeout(pushTimer);
  pushTimer = setTimeout(pushProgress, 1200);
}
async function pushProgress() {
  if (!auth) return;
  if (pushing) return pushing.then(pushProgress);
  setSync('syncing');
  pushing = api('/progress', { method: 'PUT', body: { data } })
    .then(r => { applyRemote(r.data); setSync('ok'); })
    .catch(e => {
      if (e.status === 401) { setAuth(null); toast('Sessione scaduta: accedi di nuovo per salvare i progressi online.'); }
      setSync(e.status ? 'error' : 'offline', e.message);
    })
    .finally(() => { pushing = null; });
  return pushing;
}
// All'apertura (e quando torni sulla scheda) prende i progressi degli altri dispositivi
async function pullProgress({ rerender = true } = {}) {
  if (!auth) return;
  setSync('syncing');
  try {
    const r = await api('/progress');
    const before = JSON.stringify(data);
    applyRemote(r.data);
    setSync('ok');
    // se qui c'era qualcosa che il server non aveva, lo manda
    if (JSON.stringify(PROGRESS.mergeProgress(r.data || {}, data)) !== JSON.stringify(PROGRESS.cleanProgress(r.data))) schedulePush();
    // ridisegna la pagina solo se è cambiato qualcosa e non c'è una sessione di esercizi aperta
    if (rerender && before !== JSON.stringify(data) && !/pratica|allena|ripasso\/via/.test(location.hash)) route();
  } catch (e) {
    if (e.status === 401) { setAuth(null); toast('Sessione scaduta: accedi di nuovo per salvare i progressi online.'); }
    setSync(e.status ? 'error' : 'offline', e.message);
  }
}
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && auth && Date.now() - sync.at > 60000) pullProgress();
});
function updateNav() {
  const a = $('#acct'); if (!a) return;
  a.textContent = auth ? auth.username : 'Accedi';
  a.title = auth ? 'Il tuo account' : 'Accedi o crea un account';
}

function accountPage() {
  document.title = 'Account — Brexli';
  if (!auth) return loginView();
  const done = UNITS.filter(u => (data.units[u.id]?.best || 0) >= 80).length;
  app.innerHTML = `<section class="narrow account">
    <div class="page-head">
      <h1>Ciao, ${esc(auth.username)}</h1>
      <p class="lede">Hai superato ${done} fermate su ${UNITS.length}. I progressi sono legati al tuo account: accedi con lo stesso nome utente da un altro dispositivo e li ritrovi.</p>
    </div>
    <div class="note" id="syncstate" role="status">${syncText()}</div>
    <div class="actions"><button class="btn" id="syncnow">Sincronizza ora</button><button class="btn ghost" id="logout">Esci</button></div>
    <details class="danger">
      <summary>Elimina l'account</summary>
      <p>L'account e i progressi salvati online vengono cancellati per sempre. Per conferma scrivi la password.</p>
      <form id="delform" class="authform">
        <label>Password<input class="line" type="password" name="password" autocomplete="current-password" required></label>
        <p class="formerr" role="alert"></p>
        <button class="btn danger-btn">Elimina definitivamente</button>
      </form>
    </details>
  </section>`;
  $('#syncnow').onclick = () => pullProgress({ rerender: false });
  $('#logout').onclick = async () => {
    $('#logout').disabled = true;
    await pushProgress();
    await api('/logout', { method: 'POST' }).catch(() => {});
    setAuth(null);
    // su un computer condiviso i progressi non devono restare: sono comunque salvati nell'account
    data = PROGRESS.cleanProgress({}); saveLocal();
    toast('Sei uscito. I tuoi progressi restano salvati nell\'account.');
    location.hash = '#/';
  };
  $('#delform').onsubmit = async e => {
    e.preventDefault();
    const f = e.target, err = f.querySelector('.formerr');
    err.textContent = ''; f.querySelector('button').disabled = true;
    try {
      await api('/account', { method: 'DELETE', body: { password: f.password.value } });
      setAuth(null); data = PROGRESS.cleanProgress({}); saveLocal();
      toast('Account eliminato.');
      location.hash = '#/';
    } catch (ex) { err.textContent = ex.message; f.querySelector('button').disabled = false; }
  };
}

function loginView(mode = 'login') {
  // il servizio gratuito dorme quando nessuno lo usa: lo svegliamo mentre si compila il modulo
  fetch(API + '/health').catch(() => {});
  const reg = mode === 'register';
  const local = Object.keys(data.units).length;
  app.innerHTML = `<section class="narrow account">
    <div class="page-head">
      <h1>${reg ? 'Crea un account' : 'Accedi'}</h1>
      <p class="lede">Con un account i progressi si salvano online e li ritrovi su ogni dispositivo. Bastano un nome utente e una password, niente email.</p>
    </div>
    <div class="tabs" role="tablist">
      <button role="tab" aria-selected="${!reg}" id="tab-login">Accedi</button>
      <button role="tab" aria-selected="${reg}" id="tab-reg">Crea un account</button>
    </div>
    <form class="authform" id="authform" novalidate>
      <label>Nome utente<input class="line" name="username" autocomplete="username" autocapitalize="off" spellcheck="false" required minlength="3" maxlength="24"></label>
      <label>Password<input class="line" type="password" name="password" autocomplete="${reg ? 'new-password' : 'current-password'}" required minlength="8"></label>
      ${reg ? '<label>Ripeti la password<input class="line" type="password" name="password2" autocomplete="new-password" required minlength="8"></label>' : ''}
      ${reg ? '<p class="small">Il nome utente può avere da 3 a 24 caratteri tra lettere, numeri, punto e trattini. La password almeno 8 caratteri. <b>Non c\'è modo di recuperare una password dimenticata</b>: scegline una che ricordi.</p>' : ''}
      ${local ? `<p class="small">I progressi che hai già fatto in questo browser (${local} ${local === 1 ? 'fermata' : 'fermate'}) verranno aggiunti al tuo account.</p>` : ''}
      <p class="formerr" role="alert"></p>
      <div class="actions"><button class="btn">${reg ? 'Crea l\'account' : 'Accedi'}</button><span class="small" id="authwait"></span></div>
    </form>
  </section>`;
  $('#tab-login').onclick = () => loginView('login');
  $('#tab-reg').onclick = () => loginView('register');
  const f = $('#authform');
  f.username.focus();
  f.onsubmit = async e => {
    e.preventDefault();
    const err = f.querySelector('.formerr'), btn = f.querySelector('.btn');
    err.textContent = '';
    const username = f.username.value.trim(), password = f.password.value;
    if (reg && password !== f.password2.value) { err.textContent = 'Le due password non coincidono.'; return; }
    btn.disabled = true;
    const wait = setTimeout(() => { $('#authwait').textContent = 'Il server si sta svegliando: può volerci fino a un minuto.'; }, 4000);
    try {
      const r = await api(reg ? '/register' : '/login', { method: 'POST', body: { username, password } });
      setAuth({ token: r.token, username: r.username });
      await pullProgress({ rerender: false });
      await pushProgress();
      toast(reg ? `Account creato. Benvenuto, ${r.username}!` : `Bentornato, ${r.username}!`);
      location.hash = '#/';
    } catch (ex) { err.textContent = ex.message; btn.disabled = false; }
    finally { clearTimeout(wait); $('#authwait') && ($('#authwait').textContent = ''); }
  };
}

/* ---------- audio: MP3 registrati (voce Cori, Piper) con la voce del browser come ripiego ---------- */
const canSpeak = 'speechSynthesis' in window;
const AUDIO_KEYS = window.AUDIO_KEYS || new Set();
let voice = null;
function pickVoice() {
  if (!canSpeak) return;
  const vs = speechSynthesis.getVoices();
  voice = vs.find(v => v.lang === 'en-GB' && /natural|online|google/i.test(v.name))
    || vs.find(v => v.lang === 'en-GB') || vs.find(v => /^en[-_]/i.test(v.lang)) || null;
}
if (canSpeak) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
let warnedVoice = false, player = null;
const hasAudio = text => AUDIO_KEYS.has(SPEECH.speechKey(text));
// Restituisce una promessa che si risolve quando la frase è finita (serve al dettato)
function say(text, rate = 1) {
  if (player) { player.pause(); player = null; }
  if (canSpeak) speechSynthesis.cancel();
  if (hasAudio(text)) {
    player = new Audio(`audio/${SPEECH.speechKey(text)}.mp3`);
    player.playbackRate = rate; player.preservesPitch = true;
    return new Promise(res => { player.onended = player.onerror = res; player.play().catch(res); });
  }
  if (!canSpeak) return Promise.resolve();
  if (!voice) pickVoice();
  // Voci caricate ma nessuna inglese: meglio non leggere l'inglese con una voce italiana
  if (!voice && speechSynthesis.getVoices().length) {
    if (!warnedVoice) toast('Il browser non ha una voce inglese installata. Su Windows: Impostazioni → Ora e lingua → Voce → Aggiungi voci → English (United Kingdom). Oppure apri il sito con Edge o Chrome.');
    warnedVoice = true;
    return Promise.resolve();
  }
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-GB'; if (voice) u.voice = voice; u.rate = 0.92 * rate;
  return new Promise(res => { u.onend = u.onerror = res; speechSynthesis.speak(u); });
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-say]');
  if (b) { e.preventDefault(); e.stopPropagation(); say(b.dataset.say); }
});
function toast(msg) {
  let t = $('#toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
  t.textContent = msg; t.className = 'show';
  clearTimeout(toast.timer); toast.timer = setTimeout(() => { t.className = ''; }, 9000);
  t.onclick = () => { t.className = ''; };
}
const sayBtn = t =>`<button class="say" type="button" data-say="${esc(t)}" title="Ascolta">${SPK}</button>`;

/* ---------- controllo delle risposte ---------- */
function norm(s) {
  return String(s).toLowerCase()
    .replace(/[’‘`´]/g, "'").replace(/[“”"]/g, '')
    .replace(/-/g, ' ').replace(/[.,!?;:()]/g, ' ')
    .replace(/\s+/g, ' ').trim();
}
function variants(s) {
  s = norm(s)
    .replace(/\bcan't\b/g, 'cannot').replace(/\bcan not\b/g, 'cannot')
    .replace(/\bwon't\b/g, 'will not').replace(/\bshan't\b/g, 'shall not')
    .replace(/\b(\w+)n't\b/g, '$1 not')
    .replace(/\bi'm\b/g, 'i am').replace(/\blet's\b/g, 'let us')
    .replace(/\b(\w+)'re\b/g, '$1 are').replace(/\b(\w+)'ve\b/g, '$1 have')
    .replace(/\b(\w+)'ll\b/g, '$1 will').replace(/\b(\w+)'d\b/g, '$1 would');
  // 's = is, oppure has solo se segue un participio (she's got, it's been, he's finished)
  const S = /\b(he|she|it|that|what|there|where|who|here|how|this)'s\b/g;
  const HAS = /\b(he|she|it|that|what|there|where|who|here|how|this)'s (?=(got|been|done|gone|had|seen|made|taken|\w+ed|\w+en|\w+ought|\w+aught)\b)/g;
  const out = [s.replace(S, '$1 is')];
  if (HAS.test(s)) out.push(s.replace(HAS, '$1 has ').replace(S, '$1 is'));
  return out;
}
const fillIn = SPEECH.fillIn;
// strict: nessuna equivalenza tra forme contratte e piene (serve quando l'errore è proprio la contrazione)
function matches(user, answers, strict = false) {
  if (strict) { const u = norm(user); return answers.some(a => norm(a) === u); }
  const u = new Set(variants(user));
  return answers.some(a => variants(a).some(v => u.has(v)));
}
// Apostrofi dimenticati (dont, isnt, im): la risposta vale, ma lo segnaliamo
const APOS = [
  [/\b(do|does|did|is|are|was|were|have|has|had|could|would|should|must|need)nt\b/gi, "$1n't"],
  [/\bcant\b/gi, "can't"], [/\bwont\b/gi, "won't"], [/\bim\b/gi, "I'm"], [/\bive\b/gi, "I've"],
  [/\b(you|they)re\b/gi, "$1're"], [/\b(that|what|there|he|she)s\b/gi, "$1's"],
];
function fixApos(s) {
  const words = [];
  const out = APOS.reduce((t, [re, to]) => t.replace(re, (...m) => {
    const w = to.replace(/\$1/, m[1] || ''); words.push(w); return w;
  }), s);
  return { out, words };
}
function grade(ex, user) {
  const acc = accepted(ex);
  if (matches(user, acc, ex.strict)) return { ok: true };
  if (!ex.strict) {
    const { out, words } = fixApos(user);
    if (words.length && matches(out, acc)) return { ok: true, fixed: out, note: `Attenzione all'apostrofo: si scrive <b>${esc([...new Set(words)].join(', '))}</b>.` };
  }
  return { ok: false };
}
// Restituisce le frasi accettate complete per un esercizio
const accepted = ex => ex.t === 'f' ? ex.a.map(x => fillIn(ex.q, x)) : ex.a;

/* ---------- router ---------- */
const routes = {
  '': home,
  u: (id, sub) => { const u = UNITS.find(x => x.id === id); if (!u) return home(); sub === 'pratica' ? practiceUnit(u) : lesson(u); },
  verbi: v => { let q = ''; try { q = v ? decodeURIComponent(v) : ''; } catch { q = v; } verbsPage(q); },
  irregolari: irregularPage,
  'allena-irregolari': irregularDrill,
  ripasso: reviewPage,
  account: () => accountPage(),
};
function route() {
  if (player) { player.pause(); player = null; }
  if (canSpeak) speechSynthesis.cancel();
  document.onkeydown = null;
  const parts = location.hash.replace(/^#\/?/, '').split('/');
  const [head, ...rest] = parts;
  (routes[head] || home)(...rest);
  const navKey = { '': 'corso', u: 'corso', verbi: 'verbi', irregolari: 'irregolari', 'allena-irregolari': 'irregolari', ripasso: 'ripasso', account: 'account' }[head] || 'corso';
  $$('[data-nav]').forEach(a => a.classList.toggle('on', a.dataset.nav === navKey));
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);

/* ---------- la rete: linee e fermate ---------- */
const plain = s => String(s).replace(/<[^>]+>/g, '');
const best = u => data.units[u.id]?.best || 0;
const isDone = u => best(u) >= 80;
const LV_COLOR = { A1: 'var(--a1)', A2: 'var(--a2)', B1: 'var(--b1)' };
const LINES = [
  { lv: 'A1', name: 'Le basi', c: 'a1' },
  { lv: 'A2', name: 'Raccontare e confrontare', c: 'a2' },
  { lv: 'B1', name: 'Frasi complesse', c: 'b1' },
];
const lineUnits = lv => UNITS.filter(u => u.level === lv);
// fermate ancora in costruzione: quelle del ROADMAP per le linee che non hanno ancora unità
const soonUnits = lv => lineUnits(lv).length ? [] : (ROADMAP.find(l => l.lv === lv)?.units || []);
const inService = lv => lineUnits(lv).length > 0;
const nextUnit = () => UNITS.find(u => !isDone(u));

function mapSVG() {
  const next = nextUnit();
  const st = [];
  // A1 in alto verso destra, A2 al centro verso sinistra, B1 in basso verso destra
  const geo = {
    A1: k => ({ x: 70 + k * 92, y: 110, up: k % 2 === 1, xch: k === 9 || k === 11 }),
    A2: k => ({ x: 990 - k * 92, y: 300, up: k % 2 === 0, xch: k === 9, side: k === 9 }),
    B1: k => ({ x: 254 + k * 110, y: 490, up: k % 2 === 1 }),
  };
  for (const l of LINES) {
    lineUnits(l.lv).forEach((u, k) => st.push({ ...geo[l.lv](k), name: u.stop, title: `${l.lv}, fermata ${u.n}: ${plain(u.title)}`, c: l.c, href: `#/u/${u.id}`, done: isDone(u), now: u === next }));
    soonUnits(l.lv).forEach((s, k) => st.push({ ...geo[l.lv](k), name: s.stop, title: `${s.title}: in costruzione`, c: l.c, soon: true }));
  }
  st.push({ x: 898, y: 205, name: 'Irregolari', title: 'Tabella e allenamento dei verbi irregolari', c: 'verbs', href: '#/irregolari', up: false });
  st.push({ x: 1000, y: 205, name: 'Coniugatore', title: 'Tutti i tempi di un verbo', c: 'verbs', href: '#/verbi', up: false });

  const track = (d, c, lv, cls = '') => inService(lv)
    ? `<path${cls ? ` class="${cls}"` : ''} d="${d}" fill="none" stroke="var(--${c})" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/>`
    : `<path d="${d}" fill="none" stroke="var(--${c})" stroke-width="11" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="var(--paper)" stroke-width="4.5" stroke-linejoin="round"/>`;
  const badge = (x, y, t, c) => `<g class="badge"><rect x="${x}" y="${y}" width="38" height="24" rx="4" fill="var(--${c})"/><text x="${x + 19}" y="${y + 17}" text-anchor="middle">${t}</text></g>`;
  const station = s => {
    const ly = s.up ? s.y - 22 : s.y + 33;
    let mark;
    if (s.soon) mark = `<circle cx="${s.x}" cy="${s.y}" r="6" fill="var(--paper)" stroke="var(--${s.c})" stroke-width="3"/>`;
    else if (s.xch) mark = `<circle class="dot" cx="${s.x}" cy="${s.y}" r="11" fill="var(--paper)" stroke="var(--ink)" stroke-width="4.5"/>${s.done ? `<circle cx="${s.x}" cy="${s.y}" r="4.5" fill="var(--${s.c})"/>` : ''}`;
    else mark = `<circle class="dot" cx="${s.x}" cy="${s.y}" r="10" fill="${s.done ? `var(--${s.c})` : 'var(--paper)'}" stroke="var(--${s.c})" stroke-width="5"/>${s.done ? `<circle cx="${s.x}" cy="${s.y}" r="3" fill="var(--paper)"/>` : ''}`;
    const here = s.now ? `<circle cx="${s.x}" cy="${s.y}" r="18" fill="none" stroke="var(--ink)" stroke-width="3"/><g class="here"><rect x="${s.x - 32}" y="${s.up ? s.y + 24 : s.y - 46}" width="64" height="22" rx="11"/><text x="${s.x}" y="${s.up ? s.y + 39 : s.y - 31}" text-anchor="middle">Sei qui</text></g>` : '';
    const label = s.side
      ? `<text class="lbl${s.soon ? ' soon' : ''}" x="${s.x - 18}" y="${s.y + 5}" text-anchor="end">${esc(s.name)}</text>`
      : `<text class="lbl${s.soon ? ' soon' : ''}" x="${s.x}" y="${ly}" text-anchor="middle">${esc(s.name)}</text>`;
    if (s.soon) return `<g class="soonstn"><title>${esc(s.title)}</title>${mark}${label}</g>`;
    return `<a class="stn" href="${s.href}" aria-label="${esc(s.title)}"><title>${esc(s.title)}</title>${here}${mark}${label}</a>`;
  };
  const desc = LINES.map(l => `linea ${l.lv} ${inService(l.lv) ? `con ${lineUnits(l.lv).length} fermate` : 'in costruzione'}`).join(', ');
  return `<svg class="map" viewBox="0 0 1150 548" role="img" aria-label="Mappa del corso: ${desc}">
    ${track('M162 300 V440 L212 490 H1024', 'b1', 'B1')}
    ${track('M1082 110 V250 L1032 300 H162', 'a2', 'A2')}
    <path d="M898 110 V205 H1000" fill="none" stroke="var(--verbs)" stroke-width="9" stroke-linejoin="round"/>
    ${track('M70 110 H1082', 'a1', 'A1', 'draw')}
    ${badge(14, 98, 'A1', 'a1')}${badge(1098, 168, 'A2', 'a2')}${badge(110, 360, 'B1', 'b1')}
    ${st.map(station).join('')}
  </svg>`;
}

function vmap() {
  const next = nextUnit();
  const row = (inner, cls = '') => `<li class="${cls}">${inner}</li>`;
  const pin = '<span class="pin"><i></i></span>';
  const line = l => inService(l.lv)
    ? `<section class="vline" style="--c:${LV_COLOR[l.lv]}"><h2><span class="tag">${l.lv}</span>${l.name} <small>in servizio</small></h2><ol>${lineUnits(l.lv).map(u => row(`<a href="#/u/${u.id}">${pin}<span class="txt"><b>${u.stop}</b><span>${u.sub}</span></span></a>`, isDone(u) ? 'done' : u === next ? 'now' : '')).join('')}</ol></section>`
    : `<section class="vline soon" style="--c:${LV_COLOR[l.lv]}"><h2><span class="tag">${l.lv}</span>${l.name} <small>in costruzione</small></h2><ol>${soonUnits(l.lv).map(s => row(`<div class="row">${pin}<span class="txt"><b>${s.stop}</b><span>${s.title}</span></span></div>`)).join('')}</ol></section>`;
  return `<div class="vmap">
    ${line(LINES[0])}
    <section class="vline" style="--c:var(--verbs)"><h2>Officina dei verbi</h2><ol>
      ${row(`<a href="#/irregolari">${pin}<span class="txt"><b>Irregolari</b><span>Tabella e allenamento</span></span></a>`)}
      ${row(`<a href="#/verbi">${pin}<span class="txt"><b>Coniugatore</b><span>Tutti i tempi di un verbo</span></span></a>`)}
    </ol></section>
    ${LINES.slice(1).map(line).join('')}
  </div>`;
}

/* ---------- home ---------- */
function home() {
  document.title = 'Brexli — grammatica inglese, una fermata alla volta';
  const next = nextUnit();
  const started = Object.keys(data.units).length > 0;
  const live = LINES.filter(l => inService(l.lv)), building = LINES.filter(l => !inService(l.lv));
  app.innerHTML = `
  <section class="hero">
    <div>
      <h1>Una fermata<br>alla volta.</h1>
      <p class="lede">Grammatica inglese per chi parla italiano, dal verbo essere alle frasi complesse. Ogni fermata è una regola: la leggi, la metti alla prova, passi alla successiva.</p>
    </div>
    ${next ? `<div class="next-train" style="--line:${LV_COLOR[next.level]}">
      <div class="k">${started ? `Prossima fermata, linea ${next.level}` : 'Prima fermata'}</div>
      <div class="s"><i></i>${next.stop}</div>
      <a class="btn" href="#/u/${next.id}">${started ? 'Riprendi il viaggio' : 'Parti da qui'}</a>
    </div>` : `<div class="next-train"><div class="k">Tutte le linee in servizio</div><div class="s"><i></i>${UNITS.length} fermate superate</div><a class="btn" href="#/ripasso">Vai al ripasso</a></div>`}
  </section>
  <div class="map-wrap">${mapSVG()}</div>
  <div class="legend">
    ${live.map(l => `<span><i style="--c:${LV_COLOR[l.lv]}"></i>Linea ${l.lv}: ${lineUnits(l.lv).filter(isDone).length} di ${lineUnits(l.lv).length} fermate superate</span>`).join('')}
    ${building.length ? `<span><i class="hollow" style="--c:${LV_COLOR[building[0].lv]}"></i>Linea ${building.map(l => l.lv).join(' e ')}, in costruzione</span>` : ''}
    <span><i style="--c:var(--verbs)"></i>Officina dei verbi</span>
    <span><i class="dot"></i>Interscambio</span>
  </div>
  ${vmap()}`;
}

/* ---------- lezione ---------- */
function strip(u) {
  const line = lineUnits(u.level), all = UNITS.indexOf(u), prev = UNITS[all - 1], next = UNITS[all + 1];
  const end = (x, dir) => !x ? '<span>Capolinea</span>'
    : x.level !== u.level ? `<a href="#/u/${x.id}">${dir < 0 ? '‹ ' : ''}Cambio: linea ${x.level}${dir > 0 ? ' ›' : ''}</a>`
    : `<a href="#/u/${x.id}">${dir < 0 ? '‹ ' : ''}${x.stop}${dir > 0 ? ' ›' : ''}</a>`;
  return `<nav class="strip" aria-label="Fermate della linea ${u.level}">
    <div class="strip-line">${line.map(x => `<a href="#/u/${x.id}" title="${x.n}. ${esc(plain(x.title))}" class="${x === u ? 'cur' : isDone(x) ? 'done' : ''}"${x === u ? ' aria-current="page"' : ''}></a>`).join('')}</div>
    <div class="strip-ends">${end(prev, -1)}${end(next, 1)}</div>
  </nav>`;
}
function lesson(u) {
  document.title = `${plain(u.title)} — Brexli`;
  const p = data.units[u.id];
  const line = lineUnits(u.level);
  app.innerHTML = `<article class="lesson narrow" style="--line:${LV_COLOR[u.level]}">
    ${strip(u)}
    <header class="sign"><span class="num">${u.n}</span><div><h1>${u.title}</h1><div class="meta">Linea ${u.level}, fermata ${u.n} di ${line.length}${p ? `. Miglior risultato: ${p.best}%` : ''}</div></div></header>
    <p class="lede">${u.intro}</p>
    ${u.theory.map(s => s.h === 'Errori tipici'
      ? `<section class="gap"><h2>Mind the gap</h2><p class="sub">Gli errori tipici di chi parte dall'italiano</p><div class="edge"></div>${s.b}</section>`
      : `<h2>${s.h}</h2>${s.b}`).join('')}
    <div class="depart">
      <div><b>${u.exercises.length} esercizi</b><p>Completi, traduci, correggi e scrivi sotto dettatura. Con almeno l'80% la fermata è superata.</p></div>
      <a class="btn" href="#/u/${u.id}/pratica">Fai gli esercizi</a>
    </div>
  </article>`;
}

/* ---------- sessione di esercizi ---------- */
const KIND = { c: 'Scegli la forma corretta', f: 'Completa la frase', t: 'Traduci in inglese', o: 'Metti le parole in ordine', x: "C'è un errore: riscrivi la frase corretta", irr: 'Scrivi il past simple e il participio passato', d: 'Dettato: ascolta e scrivi la frase' };
const trackHTML = (n, marks, cur = -1) => `<div class="track" aria-hidden="true">${Array.from({ length: n }, (_, k) => `<i class="${k in marks ? (marks[k] ? 'ok' : 'no') : k === cur ? 'cur' : ''}"></i>`).join('')}</div>`;

function session({ items, back, line, onAnswer, onEnd }) {
  let i = 0, right = 0;
  const wrong = [], marks = {};
  const total = items.length;

  function show() {
    if (i >= total) { document.onkeydown = null; return onEnd({ right, total, wrong, marks }); }
    const it = items[i], ex = it.ex;
    let checked = false;
    app.innerHTML = `<div class="sess" style="--line:${line}">
      <div class="sess-top"><a href="${back}">Esci</a>${trackHTML(total, marks, i)}<span class="count">${i + 1} di ${total}</span></div>
      <div class="kind">${KIND[ex.t]}${ex.h ? `<span class="hint">${esc(ex.h)}</span>` : ''}</div>
      <div id="body">${body(ex)}</div>
      <div class="fb" id="fb" aria-live="polite"></div>
      <div class="actions"><button class="btn" id="go">Controlla</button>${ex.t !== 'c' ? '<button class="link" id="idk">Non lo so</button>' : ''}</div>
    </div>`;
    const go = $('#go'), fb = $('#fb');
    const first = $('#body input'); if (first) first.focus();

    // ordinamento: le parole si spostano con un clic
    if (ex.t === 'o') {
      const pool = $('.pool'), line = $('.built');
      pool.addEventListener('click', e => {
        const c = e.target.closest('.chip'); if (!c || checked || c.classList.contains('used')) return;
        c.classList.add('used');
        const b = document.createElement('button'); b.className = 'chip'; b.type = 'button'; b.textContent = c.textContent;
        b.onclick = () => { if (checked) return; c.classList.remove('used'); b.remove(); };
        line.appendChild(b);
      });
    }
    if (ex.t === 'd') {
      const play = slow => say(ex.a[0], slow ? 0.75 : 1);
      $('#dplay').onclick = () => play(false);
      $('#dslow').onclick = () => play(true);
      setTimeout(() => { if (!checked && $('#dplay')) play(false); }, 300);
    }
    if (ex.t === 'c') {
      $$('.opt').forEach(b => b.onclick = () => { if (!checked) check(b.dataset.v); });
      go.style.display = 'none';
    }

    function userAnswer() {
      if (ex.t === 'f') return fillIn(ex.q, $('#body input').value);
      if (ex.t === 'o') return $$('.built .chip').map(b => b.textContent).join(' ');
      if (ex.t === 'irr') return [$('#ip').value, $('#ipp').value];
      return $('#body input').value;
    }
    function check(choice, giveUp = false) {
      if (checked) return;
      let ok, sol, yours, note = '';
      if (ex.t === 'c') {
        if (!giveUp && choice == null) return;
        ok = !giveUp && choice === ex.a;
        $$('.opt').forEach(b => { b.disabled = true; if (b.dataset.v === ex.a) b.classList.add('ok'); else if (b.dataset.v === choice) b.classList.add('no'); });
        sol = ex.q.includes('___') ? esc(ex.q).replace('___', `<b>${esc(ex.a)}</b>`) : `<b>${esc(ex.a)}</b>`;
        yours = choice;
      } else if (ex.t === 'irr') {
        const [p, pp] = giveUp ? ['', ''] : userAnswer();
        if (!giveUp && !norm(p) && !norm(pp)) { $('#ip').focus(); return; }
        const v = ex.v;
        // accetta una o più forme valide: "was", "was/were", "burnt or burned"
        const valid = (input, forms) => {
          const parts = norm(input).split(/\s*(?:\/|\bor\b|\s)\s*/).filter(Boolean);
          const ok = forms.split(' / ').map(norm);
          return parts.length > 0 && parts.every(x => ok.includes(x));
        };
        ok = valid(p, v.p) && valid(pp, v.pp);
        sol = `<span>${v.b} – <b>${v.p}</b> – <b>${v.pp}</b></span> ${sayBtn(`${v.b}, ${v.p1}, ${v.pp1}`)}`;
        $('#ip').disabled = $('#ipp').disabled = true;
      } else {
        const u = giveUp ? '' : userAnswer();
        const inp0 = $('#body input');
        const empty = ex.t === 'o' ? !$$('.built .chip').length : !norm(inp0 ? inp0.value : '');
        if (!giveUp && empty) { if (inp0) inp0.focus(); return; }
        const acc = accepted(ex);
        const g = giveUp ? { ok: false } : grade(ex, u);
        ok = g.ok; note = g.note || '';
        sol = `<b>${esc(acc[0])}</b> ${sayBtn(acc[0])}`;
        yours = g.fixed || u;
        if (inp0) inp0.disabled = true;
      }
      checked = true;
      marks[i] = ok;
      if (ok) right++; else wrong.push({ it, yours });
      onAnswer && onAnswer(it, ok);
      $('.track').outerHTML = trackHTML(total, marks, i);
      fb.className = 'fb ' + (ok ? 'ok' : 'no');
      fb.innerHTML = `<div class="verdict">${ok ? 'Giusto' : giveUp ? 'Ecco la risposta' : 'Non proprio'}</div>
        ${note ? `<div class="why">${note}</div>` : ''}
        ${ok && ex.t !== 'irr' && ex.t !== 'c' && acc0differs(ex, yours) ? `<div class="sol">Un'altra soluzione: ${sol}</div>` : ''}
        ${!ok ? `<div class="sol">${!giveUp && yours && ex.t !== 'c' ? `<span class="yours">${esc(yours)}</span>` : ''}${sol}</div>` : ''}
        ${ex.why ? `<div class="why">${ex.why}</div>` : ''}`;
      go.style.display = '';
      go.textContent = i + 1 < total ? 'Avanti' : 'Vedi il risultato';
      go.onclick = () => { i++; show(); };
      $('#idk') && $('#idk').remove();
      go.focus();
    }
    go.onclick = () => check();
    $('#idk') && ($('#idk').onclick = () => check(null, true));
    document.onkeydown = e => {
      // scelta multipla: tasti 1-4
      if (ex.t === 'c' && !checked && /^[1-9]$/.test(e.key)) { const b = $$('.opt')[e.key - 1]; if (b) b.click(); return; }
      if (e.key !== 'Enter') return;
      // su pulsanti e link Invio fa già il suo lavoro
      if (e.target.closest && e.target.closest('button, a') && !e.target.closest('.chip')) return;
      e.preventDefault();
      if (e.target.id === 'ip' && !checked) return $('#ipp').focus();
      if (go.style.display !== 'none') go.click();
    };
  }
  show();
}
const acc0differs = (ex, yours) => yours && !matches(yours, [accepted(ex)[0]]);

function body(ex) {
  const field = ph => `<input class="line" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${ph}">`;
  if (ex.t === 'c') {
    const opts = shuffle(ex.o);
    return `<p class="prompt">${esc(ex.q).replace(/___(\S*)/,'<span class="nowrap"><span class="gapline"></span>$1</span>')}</p>
      <div class="opts">${opts.map((o, k) => `<button class="opt" type="button" data-v="${esc(o)}"><kbd>${k + 1}</kbd>${esc(o)}</button>`).join('')}</div>`;
  }
  if (ex.t === 'f') {
    const w = Math.max(5, Math.max(...ex.a.map(a => a.length)) + 2);
    const [a, b] = esc(ex.q).split('___');
    const [, tail, rest] = b.match(/^(\S*)([\s\S]*)$/);
    return `<p class="prompt">${a}<span class="nowrap"><input class="blank" style="width:${w}ch" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="risposta">${tail}</span>${rest}</p>`;
  }
  if (ex.t === 'd') return `<div class="dict"><button class="play" type="button" id="dplay">${SPK}Ascolta</button><button class="play slow" type="button" id="dslow">Più lento</button></div>${field('Scrivi quello che senti')}`;
  if (ex.t === 't') return `<p class="prompt">${esc(ex.it)}</p>${field('Scrivi in inglese')}`;
  if (ex.t === 'x') return `<p class="prompt bad">${esc(ex.q)}</p>${field('La frase corretta')}`;
  if (ex.t === 'o') {
    // la maiuscola iniziale svelerebbe la prima parola: la togliamo (tranne I, I'm…)
    const words = ex.a[0].replace(/[.,!?]/g, '').split(/\s+/).concat(ex.d || [])
      .map((w, k) => k === 0 && !/^I('|$)/.test(w) ? w[0].toLowerCase() + w.slice(1) : w);
    let mixed = shuffle(words); let tries = 0;
    while (mixed.join(' ') === words.join(' ') && tries++ < 10) mixed = shuffle(words);
    return `<p class="prompt">${esc(ex.it)}</p><div class="built"></div><div class="pool">${mixed.map(w => `<button class="chip" type="button">${esc(w)}</button>`).join('')}</div>`;
  }
  if (ex.t === 'irr') {
    const v = ex.v;
    return `<p class="prompt">${v.b} ${sayBtn(v.b)}<span class="sub">${esc(v.it)}</span></p>
      <div class="irr-grid"><label for="ip">past simple</label><input id="ip" class="line" autocomplete="off" autocapitalize="off" spellcheck="false">
      <label for="ipp">participio</label><input id="ipp" class="line" autocomplete="off" autocapitalize="off" spellcheck="false"></div>`;
  }
}

/* ---------- capolinea ---------- */
function resultScreen({ right, total, wrong, marks }, { num, title, line, passText, again, reviewNote = '' }) {
  const pct = Math.round(right / total * 100);
  const head = pct === 100 ? 'Tutto giusto' : pct >= 80 ? (passText || 'Ottimo lavoro') : pct >= 50 ? 'Ci sei quasi' : 'Da rifare';
  const advice = pct === 100 ? '' : pct >= 80 ? 'Ripassa gli errori qui sotto e prosegui.' : pct >= 50 ? 'Guarda gli errori qui sotto, poi riprova.' : 'Conviene ripassare con calma e poi riprovare.';
  app.innerHTML = `<section class="result${line === 'var(--verbs)' ? ' verbs' : ''}" style="--line:${line}">
    <header class="sign"><span class="num">${num}</span><div><h1>${head}</h1><div class="meta">${title}</div></div></header>
    <div class="score"><b>${pct}%</b><span>${right} risposte giuste su ${total}</span></div>
    ${trackHTML(total, marks)}
    ${advice ? `<p style="margin-top:18px">${advice}</p>` : ''}
    ${wrong.length ? `<h2>Da rivedere</h2><ul class="mistakes">${wrong.map(({ it }) => {
      const ex = it.ex;
      const q = ex.t === 'irr' ? ex.v.it : ex.t === 'd' ? 'Dettato' : ex.it || ex.q;
      const a = ex.t === 'irr' ? `${ex.v.b}, ${ex.v.p1}, ${ex.v.pp1}` : SPEECH.sayTexts(ex)[0] || accepted(ex)[0];
      return `<li><span class="q">${esc(q)}</span>${sayBtn(a)}<span>${esc(a)}</span></li>`;
    }).join('')}</ul>${reviewNote ? `<p class="small">${reviewNote}</p>` : ''}` : ''}
    <div class="actions">${again}</div>
  </section>`;
}

/* ---------- ripasso degli errori ---------- */
const exerciseOf = r => UNITS.find(u => u.id === r.u)?.exercises[r.k];
function trackReview(it, ok) {
  if (it.u == null) return;
  const idx = data.review.findIndex(r => r.u === it.u.id && r.k === it.k);
  if (!ok) {
    if (idx < 0) data.review.push({ u: it.u.id, k: it.k, s: 0 }); else data.review[idx].s = 0;
  } else if (idx >= 0) {
    data.review[idx].s++;
    if (data.review[idx].s >= 2) data.review.splice(idx, 1);
  }
  data.reviewAt = Date.now();
  save();
}
const replay = hash => `onclick="location.hash='${hash}';dispatchEvent(new HashChangeEvent('hashchange'));return false"`;

function practiceUnit(u) {
  document.title = `Esercizi: ${plain(u.title)} — Brexli`;
  const items = shuffle(u.exercises.map((ex, k) => ({ ex, u, k })));
  session({
    items, back: `#/u/${u.id}`, line: LV_COLOR[u.level], onAnswer: trackReview,
    onEnd: res => {
      const pct = Math.round(res.right / res.total * 100);
      data.units[u.id] = { best: Math.max(best(u), pct), last: pct, at: Date.now() };
      save();
      const next = UNITS[UNITS.indexOf(u) + 1];
      resultScreen(res, {
        num: u.n, line: LV_COLOR[u.level], title: `Fermata ${u.n}: ${plain(u.title)}`, passText: 'Fermata superata',
        reviewNote: 'Questi esercizi sono finiti nel ripasso.',
        again: `${pct >= 80 && next ? `<a class="btn" href="#/u/${next.id}">Prossima fermata: ${next.stop}</a>` : `<a class="btn" href="#/u/${u.id}">Rileggi la lezione</a>`}
                <a class="btn ghost" href="#/u/${u.id}/pratica" ${replay(`#/u/${u.id}/pratica`)}>Rifai gli esercizi</a>`,
      });
    },
  });
}

function reviewPage(start) {
  document.title = 'Ripasso — Brexli';
  const list = data.review.filter(exerciseOf);
  if (start === 'via' && list.length) {
    const items = shuffle(list).slice(0, 15).map(r => ({ ex: exerciseOf(r), u: UNITS.find(u => u.id === r.u), k: r.k }));
    return session({
      items, back: '#/ripasso', line: 'var(--ink)', onAnswer: trackReview,
      onEnd: res => resultScreen(res, { num: '↺', line: 'var(--ink)', title: 'Ripasso degli errori', reviewNote: 'Restano nel ripasso finché non li risolvi due volte di fila.',
        again: data.review.length ? `<a class="btn" href="#/ripasso">Torna al ripasso</a>` : `<a class="btn" href="#/">Torna alla mappa</a>` }),
    });
  }
  const byUnit = {};
  list.forEach(r => { (byUnit[r.u] ||= []).push(r); });
  app.innerHTML = `<section class="narrow">
    <div class="page-head">
      <h1>Ripasso</h1>
      <p class="lede">Ogni esercizio sbagliato finisce qui, e ci resta finché non lo risolvi due volte di fila.</p>
    </div>
    ${list.length ? `<p style="margin-top:22px"><a class="btn" href="#/ripasso/via">Ripassa ${Math.min(15, list.length)} esercizi</a></p>
      <ul class="review-list">${Object.entries(byUnit).map(([id, rs]) => { const u = UNITS.find(x => x.id === id); return `<li><a href="#/u/${id}"><span class="n" style="background:${LV_COLOR[u.level]}">${u.n}</span><b>${u.stop} <small style="font-weight:400;color:var(--muted)">linea ${u.level}</small></b><span>${rs.length} da ripassare</span></a></li>`; }).join('')}</ul>`
    : `<p class="empty">Nessun errore in sospeso. Quando sbagli un esercizio, lo ritrovi qui.</p><a class="btn" href="#/">Torna alla mappa</a>`}
  </section>`;
}
routes.ripasso = reviewPage;

/* ---------- officina dei verbi: coniugatore ---------- */
function verbsPage(q) {
  document.title = 'Coniugatore — Brexli';
  const r = q ? VERBS.find(q) : null;
  app.innerHTML = `<section class="narrow verbs">
    <div class="page-head">
      <h1>Coniugatore</h1>
      <p class="lede">Scrivi un verbo e guarda come si comporta in ogni tempo: affermativa, negativa e domanda. Funziona anche con le forme irregolari, come <b>went</b>.</p>
    </div>
    <form class="search" id="vf"><input class="line" id="vq" list="vl" value="${esc(q)}" placeholder="go, study, buy…" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Verbo da coniugare"><button class="btn">Coniuga</button></form>
    <datalist id="vl">${VERBS.ALL.map(v => `<option value="${v.b}">${esc(v.it)}</option>`).join('')}</datalist>
    <div id="vres">${!q ? quickPicks()
      : !r ? `<p class="empty">“${esc(q)}” non sembra un verbo inglese.</p>`
      : r.modal ? `<p class="note"><b>${esc(r.modal)}</b> è un verbo modale: ha una forma sola per tutte le persone, non prende -s, non usa do e regge il verbo base senza to (she ${esc(r.modal === 'ought' ? 'ought to' : r.modal)} go). Vedi <a href="#/u/a1-08">la fermata 8</a>.</p>`
      : conjugation(r)}</div>
  </section>`;
  $('#vf').onsubmit = e => { e.preventDefault(); const v = $('#vq').value.trim(); if (v) location.hash = '#/verbi/' + encodeURIComponent(v.toLowerCase()); };
  if (!q) $('#vq').focus();
}
function quickPicks() {
  const picks = ['be', 'have', 'do', 'go', 'get', 'make', 'study', 'stop', 'write', 'travel'];
  return `<div class="picks">${picks.map(p => `<a href="#/verbi/${p}">${p}</a>`).join('')}</div>`;
}
function conjugation({ v, from, guessed }) {
  const P = VERBS.PERSONS;
  return `
    ${from ? `<p class="note"><b>${esc(from)}</b> è una forma del verbo <b>${v.b}</b>.</p>` : ''}
    ${guessed ? `<p class="note">Questo verbo non è nel nostro elenco: lo coniugo con le regole dei verbi regolari. Controlla che sia scritto bene.</p>` : ''}
    <div class="vhead"><h2>to ${v.b}</h2>${sayBtn(v.b)}${v.it ? `<span class="it">${esc(v.it)}</span>` : ''}</div>
    <div class="para">
      <div><small>past simple</small><b>${v.p}</b></div><div><small>participio</small><b>${v.pp}</b></div>
      <div><small>forma in -ing</small><b>${v.ing}</b></div><div><small>he, she, it</small><b>${v.third}</b></div>
      <div><small>tipo</small><b>${v.irr ? 'irregolare' : 'regolare'}</b></div>
    </div>
    ${VERBS.tenses(v).map(t => `<div class="tense">
      <h3>${t.name} <span class="lvtag" style="--c:${LV_COLOR[t.lv]}">${t.lv}</span></h3>
      <p class="use">${t.use}</p>
      <div class="tw"><table class="tbl conj" style="--line:${LV_COLOR[t.lv]}"><thead><tr><th>affermativa</th><th>negativa</th><th>domanda</th></tr></thead>
      <tbody>${P.map(p => `<tr><td>${t.aff(p)}</td><td>${t.neg(p)}</td><td>${t.q(p)}</td></tr>`).join('')}</tbody></table></div>
    </div>`).join('')}`;
}

/* ---------- officina dei verbi: irregolari ---------- */
function irregularPage() {
  document.title = 'Verbi irregolari — Brexli';
  const known = VERBS.IRR.filter(v => (data.irr[v.b] || 0) >= 2).length;
  app.innerHTML = `<section class="narrow verbs">
    <div class="page-head">
      <h1>Verbi irregolari</h1>
      <p class="lede">Il past simple e il participio di questi ${VERBS.IRR.length} verbi non seguono la regola del -ed: vanno imparati. Quelli più usati (be, have, do, go, get, make, say, see) servono da subito.</p>
    </div>
    <p style="margin-top:22px"><a class="btn" href="#/allena-irregolari">Allenati con 10 verbi</a></p>
    <p class="small">${known ? `Ne hai già indovinati ${known} due volte di fila.` : 'I verbi che sbagli ti vengono riproposti più spesso.'}</p>
    <input class="line filter" id="flt" placeholder="Cerca, anche in italiano" autocomplete="off" spellcheck="false" aria-label="Cerca un verbo">
    <div class="tw"><table class="tbl irrtbl"><thead><tr><th>base</th><th>past simple</th><th>participio</th><th>significato</th><th></th></tr></thead>
    <tbody>${VERBS.IRR.map(v => `<tr data-v="${v.b}" data-s="${esc((v.b + ' ' + v.p + ' ' + v.pp + ' ' + v.it).toLowerCase())}"><td>${v.b}</td><td>${v.p}</td><td>${v.pp}</td><td>${esc(v.it)}</td><td>${sayBtn(`${v.b}, ${v.p1}, ${v.pp1}`)}</td></tr>`).join('')}</tbody></table></div>
  </section>`;
  $('#flt').oninput = e => { const q = e.target.value.toLowerCase().trim(); $$('.irrtbl tbody tr').forEach(tr => tr.style.display = tr.dataset.s.includes(q) ? '' : 'none'); };
  $('.irrtbl tbody').onclick = e => { if (e.target.closest('.say')) return; const tr = e.target.closest('tr'); if (tr) location.hash = '#/verbi/' + tr.dataset.v; };
}
function irregularDrill() {
  document.title = 'Allenamento irregolari — Brexli';
  // i verbi meno sicuri escono più spesso
  const weighted = VERBS.IRR.map(v => ({ v, w: Math.random() * (3 - Math.min(2, data.irr[v.b] || 0)) }))
    .sort((a, b) => b.w - a.w).slice(0, 10).map(x => ({ ex: { t: 'irr', v: x.v } }));
  session({
    items: weighted, back: '#/irregolari', line: 'var(--verbs)',
    onAnswer: (it, ok) => { const b = it.ex.v.b; data.irr[b] = ok ? (data.irr[b] || 0) + 1 : 0; save(); },
    onEnd: res => resultScreen(res, { num: '10', line: 'var(--verbs)', title: 'Allenamento sui verbi irregolari',
      again: `<a class="btn" href="#/allena-irregolari" ${replay('#/allena-irregolari')}>Altri 10 verbi</a> <a class="btn ghost" href="#/irregolari">Torna alla tabella</a>` }),
  });
}

updateCount();
updateNav();
route();
if (auth) pullProgress();
})();
