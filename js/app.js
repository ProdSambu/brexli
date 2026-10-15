(() => {
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const app = $('#app');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };

/* ---------- progressi (solo in questo browser) ---------- */
const KEY = 'fondamenta.v1';
let data = {};
try { data = JSON.parse(localStorage.getItem(KEY)) || {}; } catch { data = {}; }
data.units ||= {}; data.review ||= []; data.irr ||= {};
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch {} updateCount(); };
function updateCount() {
  const n = data.review.filter(r => exerciseOf(r)).length;
  $('#revcount').textContent = n ? n : '';
}

/* ---------- audio (sintesi vocale del browser) ---------- */
const canSpeak = 'speechSynthesis' in window;
if (!canSpeak) document.body.classList.add('nosay');
let voice = null;
function pickVoice() {
  const vs = speechSynthesis.getVoices();
  voice = vs.find(v => v.lang === 'en-GB' && /natural|online|google/i.test(v.name))
    || vs.find(v => v.lang === 'en-GB') || vs.find(v => /^en[-_]/i.test(v.lang)) || null;
}
if (canSpeak) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
let warnedVoice = false;
function say(text) {
  if (!canSpeak) return;
  speechSynthesis.cancel();
  if (!voice) pickVoice();
  // Voci caricate ma nessuna inglese: meglio non leggere l'inglese con una voce italiana
  if (!voice && speechSynthesis.getVoices().length) {
    if (!warnedVoice) toast('Il browser non ha una voce inglese installata. Su Windows: Impostazioni → Ora e lingua → Voce → Aggiungi voci → English (United Kingdom). Oppure apri il sito con Edge o Chrome.');
    warnedVoice = true;
    return;
  }
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-GB'; if (voice) u.voice = voice; u.rate = 0.92;
  speechSynthesis.speak(u);
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
const fillIn = (q, x) => q.replace('___', x.trim()).replace(/ '/g, "'").replace(/\s+([.,!?])/g, '$1');
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
};
function route() {
  if (canSpeak) speechSynthesis.cancel();
  document.onkeydown = null;
  const parts = location.hash.replace(/^#\/?/, '').split('/');
  const [head, ...rest] = parts;
  (routes[head] || home)(...rest);
  const navKey = { '': 'corso', u: 'corso', verbi: 'verbi', irregolari: 'irregolari', 'allena-irregolari': 'irregolari', ripasso: 'ripasso' }[head] || 'corso';
  $$('[data-nav]').forEach(a => a.classList.toggle('on', a.dataset.nav === navKey));
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);

/* ---------- la rete: linee e fermate ---------- */
const plain = s => String(s).replace(/<[^>]+>/g, '');
const best = u => data.units[u.id]?.best || 0;
const isDone = u => best(u) >= 80;
const LV_COLOR = { A1: 'var(--a1)', A2: 'var(--a2)', B1: 'var(--b1)' };
const a1Units = () => UNITS.filter(u => u.level === 'A1');
const nextUnit = () => a1Units().find(u => !isDone(u));

function mapSVG() {
  const a1 = a1Units(), next = nextUnit();
  const st = [];
  a1.forEach((u, k) => st.push({ x: 70 + k * 92, y: 110, name: u.stop, title: `${u.n}. ${plain(u.title)}`, c: 'a1', href: `#/u/${u.id}`, done: isDone(u), now: u === next, up: k % 2 === 1, xch: k === 9 || k === 11 }));
  ROADMAP[0].units.forEach((s, k) => st.push({ x: 990 - k * 92, y: 300, name: s.stop, title: `${s.title}: in costruzione`, c: 'a2', soon: true, up: k % 2 === 0, xch: k === 9, side: k === 9 }));
  ROADMAP[1].units.forEach((s, k) => st.push({ x: 254 + k * 110, y: 490, name: s.stop, title: `${s.title}: in costruzione`, c: 'b1', soon: true, up: k % 2 === 1 }));
  st.push({ x: 898, y: 205, name: 'Irregolari', title: 'Tabella e allenamento dei verbi irregolari', c: 'verbs', href: '#/irregolari', up: false });
  st.push({ x: 1000, y: 205, name: 'Coniugatore', title: 'Tutti i tempi di un verbo', c: 'verbs', href: '#/verbi', up: false });

  const hollow = (d, c) => `<path d="${d}" fill="none" stroke="var(--${c})" stroke-width="11" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="var(--paper)" stroke-width="4.5" stroke-linejoin="round"/>`;
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
  return `<svg class="map" viewBox="0 0 1150 548" role="img" aria-label="Mappa del corso: la linea A1 con 12 fermate, le linee A2 e B1 in costruzione">
    ${hollow('M1082 110 V250 L1032 300 H162', 'a2')}
    ${hollow('M162 300 V440 L212 490 H1024', 'b1')}
    <path d="M898 110 V205 H1000" fill="none" stroke="var(--verbs)" stroke-width="9" stroke-linejoin="round"/>
    <path class="draw" d="M70 110 H1082" fill="none" stroke="var(--a1)" stroke-width="9" stroke-linecap="round"/>
    ${badge(14, 98, 'A1', 'a1')}${badge(1098, 168, 'A2', 'a2')}${badge(110, 360, 'B1', 'b1')}
    ${st.map(station).join('')}
  </svg>`;
}

function vmap() {
  const next = nextUnit();
  const row = (inner, cls = '') => `<li class="${cls}">${inner}</li>`;
  const pin = '<span class="pin"><i></i></span>';
  const a1 = a1Units().map(u => row(`<a href="#/u/${u.id}">${pin}<span class="txt"><b>${u.stop}</b><span>${u.sub}</span></span></a>`, isDone(u) ? 'done' : u === next ? 'now' : '')).join('');
  const soon = l => l.units.map(s => row(`<div class="row">${pin}<span class="txt"><b>${s.stop}</b><span>${s.title}</span></span></div>`)).join('');
  return `<div class="vmap">
    <section class="vline" style="--c:var(--a1)"><h2><span class="tag">A1</span>Le basi <small>in servizio</small></h2><ol>${a1}</ol></section>
    <section class="vline" style="--c:var(--verbs)"><h2>Officina dei verbi</h2><ol>
      ${row(`<a href="#/irregolari">${pin}<span class="txt"><b>Irregolari</b><span>Tabella e allenamento</span></span></a>`)}
      ${row(`<a href="#/verbi">${pin}<span class="txt"><b>Coniugatore</b><span>Tutti i tempi di un verbo</span></span></a>`)}
    </ol></section>
    ${ROADMAP.map(l => `<section class="vline soon" style="--c:${LV_COLOR[l.lv]}"><h2><span class="tag">${l.lv}</span>${l.name} <small>in costruzione</small></h2><ol>${soon(l)}</ol></section>`).join('')}
  </div>`;
}

/* ---------- home ---------- */
function home() {
  document.title = 'Fondamenta — grammatica inglese, una fermata alla volta';
  const a1 = a1Units(), next = nextUnit();
  const done = a1.filter(isDone).length;
  const started = Object.keys(data.units).length > 0;
  app.innerHTML = `
  <section class="hero">
    <div>
      <h1>Una fermata<br>alla volta.</h1>
      <p class="lede">Grammatica inglese per chi parla italiano, dal verbo essere alle frasi complesse. Ogni fermata è una regola: la leggi, la metti alla prova, passi alla successiva.</p>
    </div>
    ${next ? `<div class="next-train">
      <div class="k">${started ? 'Prossima fermata' : 'Prima fermata'}</div>
      <div class="s"><i></i>${next.stop}</div>
      <a class="btn" href="#/u/${next.id}">${started ? 'Riprendi il viaggio' : 'Parti da qui'}</a>
    </div>` : `<div class="next-train"><div class="k">Linea A1</div><div class="s"><i></i>Tutte le ${a1.length} fermate superate</div><a class="btn" href="#/ripasso">Vai al ripasso</a></div>`}
  </section>
  <div class="map-wrap">${mapSVG()}</div>
  <div class="legend">
    <span><i style="--c:var(--a1)"></i>Linea A1, in servizio: ${done} di ${a1.length} fermate superate</span>
    <span><i class="hollow" style="--c:var(--a2)"></i>Linee A2 e B1, in costruzione</span>
    <span><i style="--c:var(--verbs)"></i>Officina dei verbi</span>
    <span><i class="dot"></i>Interscambio</span>
  </div>
  ${vmap()}`;
}

/* ---------- lezione ---------- */
function strip(u) {
  const a1 = a1Units(), k = a1.indexOf(u), prev = a1[k - 1], next = a1[k + 1];
  return `<nav class="strip" aria-label="Fermate della linea A1">
    <div class="strip-line">${a1.map(x => `<a href="#/u/${x.id}" title="${x.n}. ${esc(plain(x.title))}" class="${x === u ? 'cur' : isDone(x) ? 'done' : ''}"${x === u ? ' aria-current="page"' : ''}></a>`).join('')}</div>
    <div class="strip-ends">${prev ? `<a href="#/u/${prev.id}">‹ ${prev.stop}</a>` : '<span>Capolinea</span>'}${next ? `<a href="#/u/${next.id}">${next.stop} ›</a>` : '<span>Capolinea</span>'}</div>
  </nav>`;
}
function lesson(u) {
  document.title = `${plain(u.title)} — Fondamenta`;
  const p = data.units[u.id];
  const a1 = a1Units();
  app.innerHTML = `<article class="lesson narrow" style="--line:${LV_COLOR[u.level]}">
    ${strip(u)}
    <header class="sign"><span class="num">${u.n}</span><div><h1>${u.title}</h1><div class="meta">Linea ${u.level}, fermata ${u.n} di ${a1.length}${p ? `. Miglior risultato: ${p.best}%` : ''}</div></div></header>
    <p class="lede">${u.intro}</p>
    ${u.theory.map(s => s.h === 'Errori tipici'
      ? `<section class="gap"><h2>Mind the gap</h2><p class="sub">Gli errori tipici di chi parte dall'italiano</p><div class="edge"></div>${s.b}</section>`
      : `<h2>${s.h}</h2>${s.b}`).join('')}
    <div class="depart">
      <div><b>${u.exercises.length} esercizi</b><p>Completi, traduci, correggi. Con almeno l'80% la fermata è superata.</p></div>
      <a class="btn" href="#/u/${u.id}/pratica">Fai gli esercizi</a>
    </div>
  </article>`;
}

/* ---------- sessione di esercizi ---------- */
const KIND = { c: 'Scegli la forma corretta', f: 'Completa la frase', t: 'Traduci in inglese', o: 'Metti le parole in ordine', x: "C'è un errore: riscrivi la frase corretta", irr: 'Scrivi il past simple e il participio passato' };
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
    return `<p class="prompt">${esc(ex.q).replace(/___(S*)/, '<span class="nowrap"><span class="gapline"></span>$1</span>')}</p>
      <div class="opts">${opts.map((o, k) => `<button class="opt" type="button" data-v="${esc(o)}"><kbd>${k + 1}</kbd>${esc(o)}</button>`).join('')}</div>`;
  }
  if (ex.t === 'f') {
    const w = Math.max(5, Math.max(...ex.a.map(a => a.length)) + 2);
    const [a, b] = esc(ex.q).split('___');
    const [, tail, rest] = b.match(/^(S*)([sS]*)$/);
    return `<p class="prompt">${a}<span class="nowrap"><input class="blank" style="width:${w}ch" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="risposta">${tail}</span>${rest}</p>`;
  }
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
      const q = ex.t === 'irr' ? ex.v.it : ex.it || ex.q;
      const a = ex.t === 'irr' ? `${ex.v.b} – ${ex.v.p} – ${ex.v.pp}` : ex.t === 'c' ? ex.q.replace('___', ex.a) : accepted(ex)[0];
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
  save();
}
const replay = hash => `onclick="location.hash='${hash}';dispatchEvent(new HashChangeEvent('hashchange'));return false"`;

function practiceUnit(u) {
  document.title = `Esercizi: ${plain(u.title)} — Fondamenta`;
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
  document.title = 'Ripasso — Fondamenta';
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
      <ul class="review-list">${Object.entries(byUnit).map(([id, rs]) => { const u = UNITS.find(x => x.id === id); return `<li><a href="#/u/${id}"><span class="n">${u.n}</span><b>${u.stop}</b><span>${rs.length} da ripassare</span></a></li>`; }).join('')}</ul>`
    : `<p class="empty">Nessun errore in sospeso. Quando sbagli un esercizio, lo ritrovi qui.</p><a class="btn" href="#/">Torna alla mappa</a>`}
  </section>`;
}
routes.ripasso = reviewPage;

/* ---------- officina dei verbi: coniugatore ---------- */
function verbsPage(q) {
  document.title = 'Coniugatore — Fondamenta';
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
  document.title = 'Verbi irregolari — Fondamenta';
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
  document.title = 'Allenamento irregolari — Fondamenta';
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
route();
})();
