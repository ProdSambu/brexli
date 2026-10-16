// Spiega una risposta sbagliata: confronta parola per parola con la soluzione più vicina,
// evidenzia cosa cambia e prova a dire perché, con regole sugli errori tipici di chi parla italiano.
(() => {
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const q = w => `<b>${esc(w)}</b>`;

  /* ---------- parole: forma "canonica" per il confronto, forma originale per mostrarle ---------- */
  const S_IS = /^(he|she|it|that|what|there|where|who|here|how|this)'s$/;
  const PARTICIPLE = /^(got|been|done|gone|had|seen|made|taken|\w+ed|\w+en|\w+ought|\w+aught)$/;
  function expandWord(w, next) {
    if (w === "can't" || w === 'cannot') return ['can', 'not'];
    if (w === "won't") return ['will', 'not'];
    if (w === "shan't") return ['shall', 'not'];
    let m;
    if ((m = /^(\w+)n't$/.exec(w))) return [m[1], 'not'];
    if (w === "i'm") return ['i', 'am'];
    if (w === "let's") return ['let', 'us'];
    if ((m = /^(\w+)'re$/.exec(w))) return [m[1], 'are'];
    if ((m = /^(\w+)'ve$/.exec(w))) return [m[1], 'have'];
    if ((m = /^(\w+)'ll$/.exec(w))) return [m[1], 'will'];
    if ((m = /^(\w+)'d$/.exec(w))) return [m[1], 'would'];
    if (S_IS.test(w)) return [w.slice(0, -2), PARTICIPLE.test(next) ? 'has' : 'is'];
    return w.split('-').filter(Boolean);
  }
  const clean = t => t.toLowerCase().replace(/[’‘`´]/g, "'").replace(/^[^a-z0-9']+|[^a-z0-9']+$/g, '').replace(/^'+|'+$/g, m => m);
  function tokens(text) {
    const disp = String(text).replace(/[’‘`´]/g, "'").trim().split(/\s+/).filter(Boolean);
    const toks = [];
    disp.forEach((t, i) => {
      const w = clean(t); if (!w) return;
      const next = disp[i + 1] ? clean(disp[i + 1]) : '';
      for (const c of expandWord(w, next)) toks.push({ c, d: i });
    });
    return { disp, toks };
  }

  /* ---------- confronto: sottosequenza comune più lunga, poi blocchi di differenze ---------- */
  function diff(a, b) {
    const n = a.length, m = b.length;
    const L = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--)
      L[i][j] = a[i].c === b[j].c ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
    const ops = []; let i = 0, j = 0, U = [], T = [];
    const flush = () => {
      const k = Math.min(U.length, T.length);
      for (let x = 0; x < k; x++) ops.push({ op: 'sub', u: U[x], t: T[x] });
      for (let x = k; x < U.length; x++) ops.push({ op: 'del', u: U[x] });
      for (let x = k; x < T.length; x++) ops.push({ op: 'ins', t: T[x] });
      U = []; T = [];
    };
    while (i < n || j < m) {
      if (i < n && j < m && a[i].c === b[j].c) { flush(); ops.push({ op: 'eq', u: i, t: j }); i++; j++; }
      else if (j < m && (i >= n || L[i][j + 1] >= L[i + 1][j])) { T.push(j); j++; }
      else { U.push(i); i++; }
    }
    flush();
    return ops;
  }
  const cost = ops => ops.filter(o => o.op !== 'eq').length;

  /* ---------- forme dei verbi ---------- */
  let FORMS = null;
  function forms() {
    if (FORMS) return FORMS;
    FORMS = new Map();
    const add = (w, base, kind) => { if (!FORMS.has(w)) FORMS.set(w, []); FORMS.get(w).push({ base, kind }); };
    for (const v of VERBS.ALL) {
      add(v.b, v.b, 'base'); add(v.third, v.b, 'third'); add(v.ing, v.b, 'ing');
      v.p.split(' / ').forEach(f => add(f, v.b, 'past'));
      v.pp.split(' / ').forEach(f => add(f, v.b, 'pp'));
      if (v.irr) add(VERBS.ed(v.b), v.b, 'regularized');
    }
    for (const [w, k] of [['am', 'be-present'], ['is', 'be-present'], ['are', 'be-present'], ['was', 'be-past'], ['were', 'be-past']]) add(w, 'be', k);
    return FORMS;
  }
  const formOf = (w, base) => (forms().get(w) || []).filter(f => !base || f.base === base);
  const sameVerb = (u, t) => { for (const a of forms().get(u) || []) for (const b of forms().get(t) || []) if (a.base === b.base) return a.base; return null; };
  const is = (w, base, kind) => formOf(w, base).some(f => f.kind === kind);
  const lev = (a, b) => {
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...new Array(b.length).fill(0)]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[a.length][b.length];
  };

  const MODALS = new Set(['can', 'could', 'must', 'should', 'will', 'would', 'may', 'might', 'shall']);
  const DO = new Set(['do', 'does', 'did']);
  const PREPS = new Set(['in', 'on', 'at', 'for', 'since', 'from', 'to', 'of', 'ago', 'by', 'with', 'about', 'during', 'than', 'as', 'like']);
  const SUBJ = new Set(['i', 'you', 'he', 'she', 'it', 'we', 'they', 'there']);
  const FREQ = new Set(['always', 'usually', 'often', 'sometimes', 'rarely', 'never', 'ever', 'just', 'already', 'still', 'also']);
  const NEG_WORDS = new Set(['never', 'nothing', 'nobody', 'no', 'none', 'nowhere', 'neither']);
  const PAST_TIME = new Set(['yesterday', 'ago', 'last']);

  /* ---------- le regole ---------- */
  function reasonsFor(ops, U, T) {
    const out = [], covered = new Set();
    const say = (key, text, ...cover) => { if (!out.some(r => r.key === key)) out.push({ key, text }); cover.forEach(o => covered.add(o)); };
    const uw = i => U.toks[i]?.c, tw = j => T.toks[j]?.c;
    const prevT = o => { // la parola della soluzione prima di questa posizione
      const j = o.t != null ? o.t : ops.slice(0, ops.indexOf(o)).reverse().find(x => x.t != null)?.t + 1;
      return j > 0 ? tw(j - 1) : '';
    };
    const tWords = T.toks.map(t => t.c), uWords = U.toks.map(t => t.c);

    for (const o of ops) {
      if (o.op === 'sub') {
        const u = uw(o.u), t = tw(o.t), pt = prevT(o), ppt = o.t > 1 ? tw(o.t - 2) : '';
        const base = sameVerb(u, t);
        // l'ausiliare può essere qualche parola prima: "does she work", "can't you see", "didn't go"
        const auxWord = tWords.slice(Math.max(0, o.t - 3), o.t).reverse().find(w => DO.has(w) || MODALS.has(w));
        const negated = auxWord && tWords.slice(Math.max(0, o.t - 3), o.t).includes('not');
        const afterAux = !!auxWord || pt === 'to';
        const haveBefore = tWords.slice(Math.max(0, o.t - 3), o.t).some(w => ['have', 'has', 'had'].includes(w));
        if ((u === 'have' && t === 'has') || (u === 'do' && t === 'does')) {
          say('has', `Con he, she, it si usa ${q(t)}, non ${q(u)}.`, o);
        } else if ((u === 'has' && t === 'have') || (u === 'does' && t === 'do')) {
          say('have', `${q(u)} è solo per he, she, it: qui serve ${q(t)}.`, o);
        } else if (u === 'will' && uWords.slice(0, o.u).some(w => ['if', 'when', 'unless'].includes(w))) {
          say('if-will', `Dopo ${q('if')}, ${q('when')}, ${q('as soon as')} si usa il presente, non will: ${q(t)}.`, ...ops.filter(x => x.op !== 'eq'));
        } else if (DO.has(u) && MODALS.has(t)) {
          say('modal-no-do', `${q(t)} è un modale: non usa do, fa le domande e le negazioni da solo (${q(t)} you…?).`, ...ops.filter(x => x.op !== 'eq'));
        } else if (formOf(t).some(x => x.kind === 'pp') && formOf(u).some(x => x.kind === 'past') && haveBefore && !formOf(u).some(x => x.kind === 'pp')) {
          say('pp', `Dopo have / has serve il participio passato (la terza colonna): ${q(t)}, non ${q(u)}, che è il past simple.`, o);
        } else if (base && is(t, base, 'base') && afterAux && !is(u, base, 'base')) {
          const aux = !auxWord ? '' : negated ? (auxWord === 'can' ? "can't" : auxWord === 'will' ? "won't" : `${auxWord}n't`) : auxWord;
          if (pt === 'to' && !auxWord) say('to-base', `Dopo ${q('to')} si usa la forma base del verbo: ${q(t)}, non ${q(u)}.`, o);
          else if (auxWord === 'did' && (is(u, base, 'past') || is(u, base, 'regularized'))) say('did-base', `Con ${q(aux)} il verbo torna alla forma base: il passato lo indica già did. Quindi ${q(t)}, non ${q(u)}.`, o);
          else if (auxWord === 'does' && is(u, base, 'third')) say('does-base', `La -s della terza persona va già su ${q(aux)}: il verbo resta alla forma base, ${q(t)}, non ${q(u)}.`, o);
          else say('aux-base:' + aux, `Dopo ${q(aux)} il verbo va alla forma base: ${q(t)}, non ${q(u)}.`, o);
        } else if (base && is(t, base, 'third') && is(u, base, 'base')) {
          say('third-s', `Con he, she, it (e con soggetti singolari come my brother, everybody) il present simple vuole la -s: ${q(t)}.`, o);
        } else if (base && is(u, base, 'third') && is(t, base, 'base')) {
          say('no-s', `Qui il soggetto non è he / she / it, quindi niente -s: ${q(t)}.`, o);
        } else if (base === 'be' && (is(u, 'be', 'be-present') && is(t, 'be', 'be-present'))) {
          say('be-agree', `Il verbo be concorda con il soggetto: I ${q('am')}, he / she / it ${q('is')}, we / you / they ${q('are')}.`, o);
        } else if (base === 'be' && is(u, 'be', 'be-past') && is(t, 'be', 'be-past')) {
          say('be-past', `Al passato: I / he / she / it ${q('was')}, we / you / they ${q('were')}.`, o);
        } else if (base === 'be' && is(t, 'be', 'be-past') && is(u, 'be', 'be-present')) {
          say('be-tense', `Si parla del passato: serve ${q(t)}, non ${q(u)}.`, o);
        } else if (base && is(t, base, 'pp') && (is(u, base, 'past') || is(u, base, 'base')) && ['have', 'has', 'had', 'been'].includes(pt)) {
          say('pp', `Dopo ${q(pt)} serve il participio passato (la terza colonna): ${q(t)}, non ${q(u)}.`, o);
        } else if (base && is(t, base, 'past') && is(u, base, 'pp') && !is(t, base, 'pp')) {
          say('past-not-pp', `${q(u)} è il participio e da solo, senza have, non basta: il past simple è ${q(t)}.`, o);
        } else if (base && is(u, base, 'regularized')) {
          say('irregular:' + base, `${q(base)} è irregolare: ${q(t)}, non ${q(u)}. Lo trovi nella tabella dei verbi irregolari.`, o);
        } else if (base && is(t, base, 'ing') && !is(u, base, 'ing')) {
          say('ing', `Qui serve la forma in -ing: ${q(t)}.`, o);
        } else if (base && is(t, base, 'past') && is(u, base, 'base')) {
          say('need-past', `Si parla del passato: serve ${q(t)}.`, o);
        } else if ((u === 'a' && t === 'an') || (u === 'an' && t === 'a')) {
          say('a-an', `${q('a')} o ${q('an')} dipende dal suono della parola dopo: an davanti a un suono vocalico (an hour), a davanti a un suono consonantico (a university).`, o);
        } else if ((u === 'for' && t === 'since') || (u === 'since' && t === 'for')) {
          say('for-since', `${q('for')} + una durata (for two years), ${q('since')} + il punto di partenza (since 2019).`, o);
        } else if ((u === 'some' && t === 'any') || (u === 'any' && t === 'some')) {
          say('some-any', `${q('some')} nelle frasi affermative e nelle offerte, ${q('any')} nelle negative e nelle domande.`, o);
        } else if ((u === 'much' && t === 'many') || (u === 'many' && t === 'much')) {
          say('much-many', `${q('many')} con le cose che si contano (many people), ${q('much')} con quelle che non si contano (much time).`, o);
        } else if (/^(a few|a little|few|little)$/.test(u) || (u === 'few' && t === 'little') || (u === 'little' && t === 'few')) {
          say('few-little', `${q('few')} con le cose che si contano, ${q('little')} con quelle che non si contano.`, o);
        } else if (PREPS.has(u) && PREPS.has(t)) {
          say('prep:' + u + t, `La preposizione giusta è ${q(t)}, non ${q(u)}.` + ((['in', 'on', 'at'].includes(u) && ['in', 'on', 'at'].includes(t)) ? ' In breve: in per città e spazi chiusi, on per superfici e piani, at per un punto preciso e in espressioni come at home, at work.' : ''), o);
        } else if (!lexicon().has(u) && lev(u, t) <= 3 && t.length > 3) {
          // parola che non esiste: ortografia, con la regola quando è una di quelle insegnate
          say('spell:' + t, spellingNote(u, t), o);
        }
      }
      if (o.op === 'del') {
        const u = uw(o.u), pu = o.u > 0 ? uw(o.u - 1) : '';
        if (u === 'to' && MODALS.has(pu)) say('modal-to', `Dopo ${q(pu)} (e gli altri modali: can, must, should, will…) niente ${q('to')}.`, o);
        else if (u === 'will' && uWords.slice(0, o.u).some(w => ['if', 'when', 'unless'].includes(w))) say('if-will', `Dopo ${q('if')}, ${q('when')}, ${q('as soon as')} si usa il presente, non will.`, o);
        else if (u === 'the') say('no-the', `Qui non va ${q('the')}: in inglese l'articolo non si mette quando si parla in generale (life, music, dogs) né in espressioni fisse come at home, at work.`, o);
        else if (u === 'do' || u === 'does' || u === 'did') {
          if (tWords.some(w => ['am', 'is', 'are', 'was', 'were'].includes(w))) say('be-no-do', `Il verbo ${q('be')} non usa do / does / did: fa le domande e le negazioni da solo.`, o);
          else if (tWords.some(w => MODALS.has(w))) say('modal-no-do', `I modali (can, must, should…) non usano do: fanno le domande e le negazioni da soli.`, o);
        }
        else if ((u === 'have' || u === 'has') && tWords.some(w => PAST_TIME.has(w))) say('pp-finished', `Con un momento finito del passato (yesterday, last week, …ago) non si usa il present perfect: basta il past simple.`, o);
      }
      if (o.op === 'ins') {
        const t = tw(o.t);
        const before = o.t > 0 ? tw(o.t - 1) : '';
        const TO_VERBS = ['want', 'wants', 'wanted', 'need', 'needs', 'needed', 'decide', 'decided', 'hope', 'hoped', 'plan', 'planned', 'promise', 'promised', 'agree', 'agreed', 'refuse', 'refused', 'learn', 'learned', 'learnt', 'manage', 'managed', 'offer', 'offered', 'like', 'would', 'seem', 'forget', 'forgot', 'try', 'tried'];
        if (t === 'to' && TO_VERBS.includes(before)) say('to-verb', `${q(before)} vuole ${q('to')} + verbo: ${q(`${before} to …`)}.`, o);
        else if ((t === 'a' || t === 'an')) say('need-a', `Manca l'articolo ${q(t)}: in inglese ci vuole davanti a un nome singolare che si conta, anche con le professioni (she's a doctor).`, o);
        else if (o.t === 0 && SUBJ.has(t)) say('subject', `In inglese il soggetto va sempre espresso: qui ${q(t)}.`, o);
        else if ((t === 'do' || t === 'does' || t === 'did') && !uWords.includes(t)) say('need-do', `Per le domande e le negazioni con i verbi normali serve l'ausiliare ${q(t)}.`, o);
        else if ((t === 'have' || t === 'has') && !uWords.includes(t) && tWords.some(w => ['for', 'since', 'ever', 'never', 'just', 'already', 'yet'].includes(w))) say('need-pp', `Qui serve il present perfect (${q(t)} + participio): la situazione arriva fino a oggi o non si dice quando è successa.`, o);
        else if (t === 'for' && tWords.includes('wait') || t === 'for' && tWords.includes('waiting')) say('wait-for', `${q('wait')} vuole sempre ${q('for')}: wait for the bus, wait for you.`, o);
      }
    }

    // regole sulla frase intera
    const has = (arr, set) => arr.some(w => set.has ? set.has(w) : set.includes(w));
    if (has(uWords, ['have', 'has']) && has(tWords, ['am', 'is', 'are']) && !has(tWords, ['have', 'has']))
      say('age-be', `Età, fame, sete, freddo, ragione… in inglese si dicono con ${q('be')}, non con have: I'm 20, I'm hungry, you're right.`, ...ops.filter(o => o.op !== 'eq'));
    if (uWords.includes('not') && has(uWords, NEG_WORDS) && !(tWords.includes('not') && has(tWords, NEG_WORDS)))
      say('double-neg', `In inglese la negazione si mette una volta sola: o not + any- (I didn't see anybody), o never / nothing / nobody con il verbo affermativo.`, ...ops.filter(o => o.op !== 'eq'));
    if (uWords.includes('must') && uWords.includes('not') && tWords.includes('have') && tWords.includes('to'))
      say('mustnt', `${q("mustn't")} è un divieto; ${q("don't have to")} vuol dire che non è necessario.`, ...ops.filter(o => o.op !== 'eq'));
    if (tWords.includes('must') && tWords.includes('not') && uWords.includes('have') && uWords.includes('to'))
      say('mustnt', `${q("don't have to")} vuol dire "non è necessario"; per un divieto serve ${q("mustn't")}.`, ...ops.filter(o => o.op !== 'eq'));
    const sorted = a => [...a].sort().join(' ');
    if (uWords.length === tWords.length && sorted(uWords) === sorted(tWords) && uWords.join(' ') !== tWords.join(' ')) {
      const moved = uWords.find((w, k) => w !== tWords[k] && FREQ.has(w));
      if (moved === 'yet') say('order', `Le parole sono giuste ma l'ordine no: ${q('yet')} va in fondo alla frase.`, ...ops);
      else if (moved === 'just' || moved === 'already') say('order', `Le parole sono giuste ma l'ordine no: ${q(moved)} va tra have e il participio (I've ${moved} finished).`, ...ops);
      else if (moved) say('order', `Le parole sono giuste ma l'ordine no: ${q(moved)} va prima del verbo principale (e dopo be).`, ...ops);
      else if (has(tWords.slice(0, 2), ['am', 'is', 'are', 'was', 'were', 'do', 'does', 'did', 'have', 'has', 'can', 'will']) && /\?$/.test(T.disp[T.disp.length - 1] || '')) say('order', `Le parole sono giuste ma l'ordine no: nelle domande il verbo (o l'ausiliare) va prima del soggetto.`, ...ops);
      else say('order', `Le parole sono giuste ma l'ordine no.`, ...ops);
    }

    // quel che resta senza spiegazione: almeno diciamo cosa cambiare
    const rest = ops.filter(o => o.op !== 'eq' && !covered.has(o));
    const subs = rest.filter(o => o.op === 'sub').map(o => `${q(tw(o.t))} al posto di ${q(uw(o.u))}`);
    const ins = rest.filter(o => o.op === 'ins').map(o => q(tw(o.t)));
    const del = rest.filter(o => o.op === 'del').map(o => q(uw(o.u)));
    if (subs.length) out.push({ key: 'subs', text: `Serviva ${subs.slice(0, 3).join(', ')}.` });
    if (ins.length) out.push({ key: 'ins', text: `Manca ${ins.slice(0, 3).join(', ')}.` });
    if (del.length) out.push({ key: 'del', text: `${del.slice(0, 3).join(', ')} ${del.length > 1 ? 'sono' : 'è'} di troppo.` });
    return out.slice(0, 4).map(r => r.text);
  }

  function spellingNote(u, t) {
    if (/eing$/.test(u) && /[^e]ing$/.test(t)) return `Davanti a -ing la e muta cade: ${q(t)}, non ${q(u)}.`;
    if (/[^aeiou]ys$/.test(u) && /ies$/.test(t)) return `Consonante + y alla terza persona diventa -ies: ${q(t)}.`;
    if (/[^aeiou]yed$/.test(u) && /ied$/.test(t)) return `Consonante + y al passato diventa -ied: ${q(t)}.`;
    if (/([bcdfgklmnprstvz])\1(ing|ed)$/.test(t) && !/([bcdfgklmnprstvz])\1(ing|ed)$/.test(u)) return `Qui la consonante finale si raddoppia: ${q(t)}.`;
    if (/(ch|sh|s|x|o)es$/.test(t) && /(ch|sh|s|x|o)s$/.test(u)) return `Dopo -ch, -sh, -s, -x, -o la terza persona prende -es: ${q(t)}.`;
    return `Errore di ortografia: si scrive ${q(t)}.`;
  }

  /* ---------- evidenziazione ---------- */
  function render(side, ops, which) {
    const bad = new Set();
    for (const o of ops) {
      if (which === 'u' && (o.op === 'sub' || o.op === 'del')) bad.add(side.toks[o.u].d);
      if (which === 't' && (o.op === 'sub' || o.op === 'ins')) bad.add(side.toks[o.t].d);
    }
    return side.disp.map((w, i) => bad.has(i) ? `<mark class="${which === 'u' ? 'mw' : 'mr'}">${esc(w)}</mark>` : esc(w)).join(' ');
  }

  // Punto d'ingresso: risposta dell'utente e soluzioni accettate (frasi complete)
  function analyze(user, accepted) {
    const U = tokens(user);
    if (!U.toks.length) return null;
    let best = null;
    for (const a of accepted) {
      const T = tokens(a), ops = diff(U.toks, T.toks), c = cost(ops);
      if (!best || c < best.c) best = { T, ops, c, a };
    }
    if (!best || best.c === 0) return null;
    // troppo diversa: niente evidenziazione parola per parola, solo la soluzione
    const tooFar = best.c > Math.max(4, best.T.toks.length * 0.7);
    return {
      target: best.a,
      userHTML: tooFar ? esc(user) : render(U, best.ops, 'u'),
      targetHTML: tooFar ? esc(best.a) : render(best.T, best.ops, 't'),
      reasons: tooFar ? [] : reasonsFor(best.ops, U, best.T),
    };
  }

  // Verbi irregolari: past simple e participio scritti nei due campi
  function irregular(v, p, pp) {
    const out = [];
    const check = (val, forms, other, label, otherLabel) => {
      const w = String(val || '').trim().toLowerCase();
      const ok = forms.split(' / ');
      if (!w || ok.includes(w)) return;
      if (w === VERBS.ed(v.b)) out.push(`${q(v.b)} è irregolare: il ${label} non è ${q(w)} ma ${q(ok[0])}.`);
      else if (other.split(' / ').includes(w)) out.push(`${q(w)} è il ${otherLabel}; il ${label} è ${q(ok[0])}.`);
      else if (w === v.b) out.push(`${q(w)} è la forma base; il ${label} è ${q(ok[0])}.`);
      else out.push(`Il ${label} di ${q(v.b)} è ${q(forms)}, non ${q(w)}.`);
    };
    check(p, v.p, v.pp, 'past simple', 'participio');
    check(pp, v.pp, v.p, 'participio', 'past simple');
    return out;
  }

  /* ---------- errori di battitura: accettati, ma segnalati ---------- */
  // Distanza di Damerau-Levenshtein ristretta: due lettere invertite contano come un solo errore
  function osa(a, b) {
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...new Array(b.length).fill(0)]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) {
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
    return d[a.length][b.length];
  }
  // Le parole che esistono: se hai scritto una parola vera ma diversa, non è una svista ma un errore
  const FUNCTION_WORDS = 'a an the this that these those is are am was were be been being do does did done has have had his her he she him its it their there they them then than we us our ours who whose whom which what where when why how your yours you me my mine of off on in at to too two for from since some any much many few little no not now know new knew one won hour by buy bye will well would can could shall should may might must if or and but so as like than up down out over under into onto with without about after before again ago yet just still already ever never always often here hear'.split(' ');
  let LEX = null;
  function lexicon() {
    if (LEX) return LEX;
    LEX = new Set(FUNCTION_WORDS);
    for (const w of forms().keys()) LEX.add(w);
    const addText = t => { for (const x of tokens(t).toks) LEX.add(x.c); };
    for (const u of window.UNITS || []) {
      for (const s of u.theory) for (const m of s.b.matchAll(/data-say="([^"]*)"/g)) addText(m[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&'));
      for (const ex of u.exercises) { [ex.t === 'x' ? '' : ex.q, ...(Array.isArray(ex.a) ? ex.a : [ex.a]), ...(ex.t === 'c' ? [] : ex.o || [])].filter(Boolean).forEach(addText); }
    }
    return LEX;
  }
  // È una svista di battitura (e non un errore di grammatica)?
  function isTypo(u, t, ex) {
    if (u === t) return true;
    if (t.length < 3 || /^\d+$/.test(t)) return false;       // parole cortissime e numeri: ogni lettera conta
    if (lexicon().has(u)) return false;                       // parola vera ma sbagliata: errore vero
    if (ex && ex.t === 'x' && tokens(ex.q).toks.some(x => x.c === u)) return false; // ha ricopiato l'errore da correggere
    if (!/^Errore di ortografia/.test(spellingNote(u, t))) return false; // studys, haveing, stoped: regole insegnate
    if (u + 's' === t || u + 'es' === t || u === t + 's') return false; // singolare / plurale, -s della terza persona
    const max = t.length >= 8 ? 2 : 1;
    return osa(u, t) <= max;
  }
  // Restituisce la soluzione e le sviste, se la risposta è giusta a meno di battitura
  function typo(user, accepted, ex) {
    if (ex && ex.strict) return null; // qui conta la forma esatta (es. "Yes, I am", non "Yes, I'm")
    const U = tokens(user);
    if (!U.toks.length) return null;
    const joined = toks => toks.map(x => x.c).join('');
    for (const a of accepted) {
      const T = tokens(a);
      // solo spazi mancanti o di troppo: "Iam tired", "every day" / "everyday"
      if (joined(U.toks) === joined(T.toks)) {
        return { fixed: a, typos: [], spaces: true };
      }
    }
    let best = null;
    for (const a of accepted) {
      const T = tokens(a), ops = diff(U.toks, T.toks);
      if (ops.some(o => o.op === 'ins' || o.op === 'del')) continue;
      const subs = ops.filter(o => o.op === 'sub');
      if (!subs.length || subs.length > Math.max(1, Math.floor(T.toks.length / 4))) continue;
      if (!subs.every(o => isTypo(U.toks[o.u].c, T.toks[o.t].c, ex))) continue;
      if (!best || subs.length < best.subs.length) best = { a, T, ops, subs };
    }
    if (!best) return null;
    return {
      fixed: best.a,
      typos: best.subs.map(o => [U.toks[o.u].c, best.T.toks[o.t].c]),
      userHTML: render(U, best.ops, 'u'),
    };
  }
  // Per i campi dei verbi irregolari: "brougth" per "brought"
  function typoWord(u, forms) {
    u = String(u || '').trim().toLowerCase();
    const ok = forms.split(' / ');
    if (!u || ok.includes(u)) return null;
    const t = ok.find(f => isTypo(u, f, null));
    return t || null;
  }

  window.EXPLAIN = { analyze, irregular, typo, typoWord, tokens, diff, spelling: spellingNote, lexicon: () => lexicon() };
})();
