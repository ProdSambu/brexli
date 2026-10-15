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

/* ---------- home: indice del corso ---------- */
function statusOf(u) {
  const p = data.units[u.id];
  if (!p) return '<span class="st">da fare</span>';
  return p.best >= 80 ? `<span class="st ok">✓ ${p.best}%</span>` : `<span class="st">${p.best}%</span>`;
}
function home() {
  document.title = 'Fondamenta — grammatica inglese';
  const a1 = UNITS.filter(u => u.level === 'A1');
  const done = a1.filter(u => (data.units[u.id]?.best || 0) >= 80).length;
  const next = a1.find(u => (data.units[u.id]?.best || 0) < 80);
  let n = a1.length;
  app.innerHTML = `
  <section class="intro">
    <h1>L'inglese, dalla struttura in su.</h1>
    <p class="lede">Niente liste di parole da indovinare con le figurine. Qui si impara come si costruisce una frase: i verbi, i tempi, l'ordine delle parole, e gli errori che fa chi parte dall'italiano.</p>
    <div class="method">
      <div><b>Leggi la regola</b>Spiegata in italiano, con il confronto tra le due lingue e gli esempi da ascoltare.</div>
      <div><b>Scrivi tu</b>Completi, traduci, correggi. Niente risposte a crocette e basta: le frasi le costruisci tu.</div>
      <div><b>Ripassa gli errori</b>Ogni sbaglio finisce nel ripasso finché non lo azzecchi due volte di fila.</div>
    </div>
    <p style="margin-top:22px">${next
      ? `<a class="btn" href="#/u/${next.id}">${done ? 'Continua' : 'Comincia'}: unità ${next.n}</a> <span class="small" style="margin-left:12px">${done} di ${a1.length} unità completate</span>`
      : `<span class="small">Hai completato tutto il livello A1. Le unità A2 sono in preparazione.</span>`}</p>
  </section>

  <section class="level">
    <div class="level-head"><span class="lv">A1</span><h2>Le basi</h2></div>
    <p class="level-desc">Il verbo essere, il presente, il passato, il futuro: lo scheletro di ogni frase.</p>
    <ol class="toc">${a1.map(u => `<li><a href="#/u/${u.id}"><span class="n">${u.n}</span><span class="t">${u.title}<span class="s">${u.sub}</span></span>${statusOf(u)}</a></li>`).join('')}</ol>
  </section>

  ${ROADMAP.map(l => `<section class="level">
    <div class="level-head"><span class="lv">${l.lv}</span><h2>${l.name}</h2></div>
    <p class="level-desc">${l.desc}</p>
    <ol class="toc">${l.units.map(t => `<li><span class="soon"><span class="n">${++n}</span><span class="t">${t}</span><span class="st">in preparazione</span></span></li>`).join('')}</ol>
  </section>`).join('')}

  <section class="level">
    <div class="level-head"><h2>Strumenti</h2></div>
    <div class="tools">
      <a class="tool" href="#/verbi"><b>Coniugatore</b><span>Scrivi un verbo e vedi tutti i tempi, in forma affermativa, negativa e interrogativa.</span></a>
      <a class="tool" href="#/irregolari"><b>Verbi irregolari</b><span>I ${VERBS.IRR.length} che servono davvero, con traduzione e allenamento.</span></a>
    </div>
  </section>`;
}

/* ---------- pagina lezione ---------- */
function lesson(u) {
  document.title = `${u.title.replace(/<[^>]+>/g, "")} — Fondamenta`;
  const i = UNITS.indexOf(u), prev = UNITS[i - 1], next = UNITS[i + 1];
  const p = data.units[u.id];
  app.innerHTML = `<article class="lesson">
    <div class="crumbs"><a href="#/">Corso</a> / ${u.level}</div>
    <p class="kicker">Unità ${u.n}, livello ${u.level}</p>
    <h1>${u.title}</h1>
    <p class="lede">${u.intro}</p>
    ${u.theory.map(s => `<h2>${s.h}</h2>${s.b}`).join('')}
    <div class="practice-cta">
      <p>${u.exercises.length} esercizi${p ? ` · miglior risultato ${p.best}%` : ''}. Per considerare l'unità superata serve almeno l'80%.</p>
      <a class="btn" href="#/u/${u.id}/pratica">Esercitati</a>
    </div>
    <div class="pager">
      ${prev ? `<a href="#/u/${prev.id}">← ${prev.n}. ${prev.title}</a>` : '<span></span>'}
      ${next ? `<a href="#/u/${next.id}">${next.n}. ${next.title} →</a>` : '<span></span>'}
    </div>
  </article>`;
}

/* ---------- sessione di esercizi ---------- */
const KIND = { c: 'Scegli la forma corretta', f: 'Completa la frase', t: 'Traduci in inglese', o: 'Metti le parole in ordine', x: "C'è un errore: riscrivi la frase corretta", irr: 'Scrivi il past simple e il participio passato' };

function session({ items, back, onAnswer, onEnd }) {
  let i = 0, right = 0;
  const wrong = [];
  const total = items.length;

  function show() {
    if (i >= total) { document.onkeydown = null; return onEnd({ right, total, wrong }); }
    const it = items[i], ex = it.ex;
    let checked = false;
    app.innerHTML = `<div class="sess">
      <div class="sess-top"><a href="${back}">← esci</a><div class="bar"><span style="width:${i / total * 100}%"></span></div><span class="count">${i + 1} / ${total}</span></div>
      <div class="kind">${KIND[ex.t]}${ex.h ? `<span class="hint">${esc(ex.h)}</span>` : ''}</div>
      <div id="body">${body(ex)}</div>
      <div class="fb" id="fb"></div>
      <div class="actions"><button class="btn" id="go">Controlla</button>${ex.t !== 'c' ? '<button class="link" id="idk">Non lo so</button>' : ''}</div>
    </div>`;
    const go = $('#go'), fb = $('#fb');
    const first = $('#body input'); if (first) first.focus();

    // ordinamento: le parole si spostano con un clic
    const built = [];
    if (ex.t === 'o') {
      const pool = $('.pool'), line = $('.built');
      pool.addEventListener('click', e => {
        const c = e.target.closest('.chip'); if (!c || checked || c.classList.contains('used')) return;
        c.classList.add('used'); built.push(c);
        const b = document.createElement('button'); b.className = 'chip'; b.type = 'button'; b.textContent = c.textContent;
        b.onclick = () => { if (checked) return; built.splice(built.indexOf(c), 1); c.classList.remove('used'); b.remove(); };
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
        sol = ex.q.includes('___') ? ex.q.replace('___', `<b>${esc(ex.a)}</b>`) : `<b>${esc(ex.a)}</b>`;
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
        sol = `${v.b} – <b>${v.p}</b> – <b>${v.pp}</b> ${sayBtn(`${v.b}, ${v.p.split(' / ')[0]}, ${v.pp.split(' / ')[0]}`)}`;
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
        const inp = $('#body input'); if (inp) inp.disabled = true;
      }
      checked = true;
      if (ok) right++; else wrong.push({ it, yours });
      onAnswer && onAnswer(it, ok);
      fb.className = 'fb ' + (ok ? 'ok' : 'no');
      fb.innerHTML = `<div class="verdict">${ok ? 'Giusto.' : giveUp ? 'Ecco la risposta.' : 'Non proprio.'}</div>
        ${note ? `<div class="why">${note}</div>` : ''}
        ${ok && ex.t !== 'irr' && ex.t !== 'c' && acc0differs(ex, yours) ? `<div class="sol">Un'altra soluzione: ${sol}</div>` : ''}
        ${!ok ? `<div class="sol">${!giveUp && yours && ex.t !== 'c' ? `<span class="yours">${esc(yours)}</span><br>` : ''}${sol}</div>` : ''}
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
  if (ex.t === 'c') {
    const opts = shuffle(ex.o);
    return `<p class="prompt">${esc(ex.q).replace('___', '<span style="display:inline-block;border-bottom:2px solid currentColor;width:3em;margin:0 .15em"></span>')}</p>
      <div class="opts">${opts.map(o => `<button class="opt" type="button" data-v="${esc(o)}">${esc(o)}</button>`).join('')}</div>`;
  }
  if (ex.t === 'f') {
    const w = Math.max(5, Math.max(...ex.a.map(a => a.length)) + 2);
    const [a, b] = esc(ex.q).split('___');
    return `<p class="prompt">${a}<input class="blank" style="width:${w}ch" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="risposta">${b}</p>`;
  }
  if (ex.t === 't') return `<p class="prompt it">${esc(ex.it)}</p><input class="line" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Scrivi in inglese…">`;
  if (ex.t === 'x') return `<p class="prompt bad">${esc(ex.q)}</p><input class="line" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="La frase corretta…">`;
  if (ex.t === 'o') {
    // la maiuscola iniziale svelerebbe la prima parola: la togliamo (tranne I, I'm…)
    const words = ex.a[0].replace(/[.,!?]/g, '').split(/\s+/).concat(ex.d || [])
      .map((w, k) => k === 0 && !/^I('|$)/.test(w) ? w[0].toLowerCase() + w.slice(1) : w);
    let mixed = shuffle(words); let tries = 0;
    while (mixed.join(' ') === words.join(' ') && tries++ < 10) mixed = shuffle(words);
    return `<p class="prompt it">${esc(ex.it)}</p><div class="built"></div><div class="pool">${mixed.map(w => `<button class="chip" type="button">${esc(w)}</button>`).join('')}</div>`;
  }
  if (ex.t === 'irr') {
    const v = ex.v;
    return `<p class="prompt">${v.b} ${sayBtn(v.b)}<span class="it" style="display:block;font-size:18px;color:var(--muted);font-style:italic">${esc(v.it)}</span></p>
      <div class="irr-grid"><label for="ip">past simple</label><input id="ip" class="line" autocomplete="off" autocapitalize="off" spellcheck="false">
      <label for="ipp">participio</label><input id="ipp" class="line" autocomplete="off" autocapitalize="off" spellcheck="false"></div>`;
  }
}

function resultScreen({ right, total, wrong }, { title, again, extra = '', reviewNote = '' }) {
  const pct = Math.round(right / total * 100);
  const line = pct === 100 ? 'Tutto giusto.' : pct >= 80 ? 'Ottimo lavoro.' : pct >= 50 ? 'Ci sei quasi: rileggi la teoria sui punti sbagliati.' : 'Conviene rileggere la lezione e riprovare.';
  app.innerHTML = `<section class="result">
    <div class="crumbs">${title}</div>
    <h1>${line}</h1>
    <div class="score">${pct}%<small> · ${right} su ${total}</small></div>
    ${extra}
    ${wrong.length ? `<h2>Da rivedere</h2><ul class="mistakes">${wrong.map(({ it }) => {
      const ex = it.ex;
      const q = ex.t === 'irr' ? ex.v.b : ex.it || ex.q;
      const a = ex.t === 'irr' ? `${ex.v.b} – ${ex.v.p} – ${ex.v.pp}` : ex.t === 'c' ? ex.q.replace('___', ex.a) : accepted(ex)[0];
      return `<li><span class="q">${esc(q)}</span>${esc(a)} ${sayBtn(a)}</li>`;
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

function practiceUnit(u) {
  document.title = `Esercizi: ${u.title.replace(/<[^>]+>/g, "")} — Fondamenta`;
  const items = shuffle(u.exercises.map((ex, k) => ({ ex, u, k })));
  session({
    items, back: `#/u/${u.id}`, onAnswer: trackReview,
    onEnd: res => {
      const pct = Math.round(res.right / res.total * 100);
      const prev = data.units[u.id]?.best || 0;
      data.units[u.id] = { best: Math.max(prev, pct), last: pct, at: Date.now() };
      save();
      const next = UNITS[UNITS.indexOf(u) + 1];
      resultScreen(res, {
        title: `Unità ${u.n} · ${u.title}`, reviewNote: 'Questi esercizi sono stati aggiunti al ripasso.',
        again: `${pct >= 80 && next ? `<a class="btn" href="#/u/${next.id}">Unità ${next.n}: ${next.title}</a>` : `<a class="btn" href="#/u/${u.id}">Rileggi la lezione</a>`}
                <a class="btn ghost" href="#/u/${u.id}/pratica" onclick="location.hash='#/u/${u.id}/pratica';dispatchEvent(new HashChangeEvent('hashchange'));return false">Rifai gli esercizi</a>`,
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
      items, back: '#/ripasso', onAnswer: trackReview,
      onEnd: res => resultScreen(res, { title: 'Ripasso', reviewNote: 'Restano nel ripasso finché non li risolvi due volte di fila.', again: data.review.length ? `<a class="btn" href="#/ripasso">Torna al ripasso</a>` : `<a class="btn" href="#/">Torna al corso</a>` }),
    });
  }
  const byUnit = {};
  list.forEach(r => { (byUnit[r.u] ||= []).push(r); });
  app.innerHTML = `<section>
    <p class="kicker">Ripasso</p>
    <h1>I tuoi errori</h1>
    <p class="lede">Ogni esercizio sbagliato finisce qui. Esce dalla lista quando lo risolvi due volte di fila.</p>
    ${list.length ? `<p><a class="btn" href="#/ripasso/via">Ripassa ${Math.min(15, list.length)} esercizi</a> <span class="small" style="margin-left:12px">${list.length} in tutto</span></p>
      <ol class="toc">${Object.entries(byUnit).map(([id, rs]) => { const u = UNITS.find(x => x.id === id); return `<li><a href="#/u/${id}"><span class="n">${u.n}</span><span class="t">${u.title}</span><span class="st">${rs.length} da ripassare</span></a></li>`; }).join('')}</ol>`
    : `<p class="empty">Nessun errore in sospeso. Fai gli esercizi di un'unità: quello che sbagli comparirà qui.</p>`}
  </section>`;
}
routes.ripasso = reviewPage;

/* ---------- coniugatore ---------- */
function verbsPage(q) {
  document.title = 'Coniugatore — Fondamenta';
  const r = q ? VERBS.find(q) : null;
  app.innerHTML = `<section>
    <p class="kicker">Strumenti</p>
    <h1>Coniugatore</h1>
    <p class="lede">Scrivi un verbo all'infinito (o anche una forma irregolare, come <i>went</i>) e guarda come si comporta in ogni tempo.</p>
    <form class="search" id="vf"><input class="line" id="vq" list="vl" value="${esc(q)}" placeholder="es. go, study, buy…" autocomplete="off" autocapitalize="off" spellcheck="false"><button class="btn">Coniuga</button></form>
    <datalist id="vl">${VERBS.ALL.map(v => `<option value="${v.b}">${esc(v.it)}</option>`).join('')}</datalist>
    <div id="vres">${!q ? quickPicks()
      : !r ? `<p class="empty">“${esc(q)}” non sembra un verbo inglese.</p>`
      : r.modal ? `<p class="note"><b>${esc(r.modal)}</b> è un verbo modale: ha una forma sola per tutte le persone, non prende -s, non usa do e regge il verbo base senza to (<i>she ${esc(r.modal === 'ought' ? 'ought to' : r.modal)} go</i>). Vedi <a href="#/u/a1-08">l'unità 8</a>.</p>`
      : conjugation(r)}</div>
  </section>`;
  $('#vf').onsubmit = e => { e.preventDefault(); const v = $('#vq').value.trim(); if (v) location.hash = '#/verbi/' + encodeURIComponent(v.toLowerCase()); };
  if (!q) $('#vq').focus();
}
function quickPicks() {
  const picks = ['be', 'have', 'do', 'go', 'get', 'make', 'study', 'stop', 'write', 'travel'];
  return `<p class="small" style="margin-top:20px">Prova con: ${picks.map(p => `<a href="#/verbi/${p}">${p}</a>`).join(', ')}</p>`;
}
function conjugation({ v, from, guessed }) {
  const P = VERBS.PERSONS;
  return `
    ${from ? `<p class="note"><i>${esc(from)}</i> è una forma del verbo <b>${v.b}</b>.</p>` : ''}
    ${guessed ? `<p class="note">Questo verbo non è nel nostro elenco: lo coniugo con le regole dei verbi regolari. Controlla che sia scritto bene.</p>` : ''}
    <h2 style="margin-top:28px">to ${v.b} ${sayBtn(v.b)} ${v.it ? `<span style="font-weight:400;font-style:italic;color:var(--muted);font-size:20px">${esc(v.it)}</span>` : ''}</h2>
    <div class="para">
      <span><i>past simple</i>${v.p}</span><span><i>participio</i>${v.pp}</span>
      <span><i>-ing</i>${v.ing}</span><span><i>3ª persona</i>${v.third}</span>
      <span><i>tipo</i>${v.irr ? 'irregolare' : 'regolare'}</span>
    </div>
    ${VERBS.tenses(v).map(t => `<div class="tense">
      <h3>${t.name} <span class="lv">${t.lv}</span></h3>
      <p class="use">${t.use}</p>
      <div class="tw"><table class="tbl conj"><thead><tr><th>affermativa</th><th>negativa</th><th>domanda</th></tr></thead>
      <tbody>${P.map(p => `<tr><td>${t.aff(p)}</td><td>${t.neg(p)}</td><td>${t.q(p)}</td></tr>`).join('')}</tbody></table></div>
    </div>`).join('')}`;
}

/* ---------- verbi irregolari ---------- */
function irregularPage() {
  document.title = 'Verbi irregolari — Fondamenta';
  const known = VERBS.IRR.filter(v => (data.irr[v.b] || 0) >= 2).length;
  app.innerHTML = `<section>
    <p class="kicker">Strumenti</p>
    <h1>Verbi irregolari</h1>
    <p class="lede">Il past simple e il participio passato di questi verbi non seguono la regola del -ed: vanno imparati. Quelli in cima alla frequenza (be, have, do, go, get, make, say, see…) servono da subito.</p>
    <p><a class="btn" href="#/allena-irregolari">Allenati: 10 verbi</a> <span class="small" style="margin-left:12px">${known} di ${VERBS.IRR.length} già indovinati due volte</span></p>
    <input class="line filter" id="flt" placeholder="Cerca (anche in italiano)…" autocomplete="off" spellcheck="false">
    <div class="tw"><table class="tbl irrtbl"><thead><tr><th>base</th><th>past simple</th><th>participio</th><th>significato</th><th></th></tr></thead>
    <tbody>${VERBS.IRR.map(v => `<tr data-v="${v.b}" data-s="${esc((v.b + ' ' + v.p + ' ' + v.pp + ' ' + v.it).toLowerCase())}"><td>${v.b}</td><td>${v.p}</td><td>${v.pp}</td><td>${esc(v.it)}</td><td>${sayBtn(`${v.b}, ${v.p.split(' / ')[0]}, ${v.pp.split(' / ')[0]}`)}</td></tr>`).join('')}</tbody></table></div>
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
    items: weighted, back: '#/irregolari',
    onAnswer: (it, ok) => { const b = it.ex.v.b; data.irr[b] = ok ? (data.irr[b] || 0) + 1 : 0; save(); },
    onEnd: res => resultScreen(res, { title: 'Verbi irregolari', again: `<a class="btn" href="#/allena-irregolari" onclick="dispatchEvent(new HashChangeEvent('hashchange'));">Altri 10</a> <a class="btn ghost" href="#/irregolari">Tabella</a>` }),
  });
}

updateCount();
route();
})();
