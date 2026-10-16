// Le regole ("skill") del corso: ognuna ha un nome, la spiegazione, la sezione di teoria a cui appartiene
// e un generatore di esercizi sempre nuovi. Gli esercizi generati sanno quale regola mettono alla prova
// e, con diag(), riconoscono l'errore di chi risponde e lo spiegano con le parole della frase.
(() => {
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const b = w => `<b>${esc(w)}</b>`;
  const { pick, shuffle, uniq, cap, kindOf, has, BE } = LEX;

  const all = [], by = {};
  function add(unit, id, sec, name, rule, gen) {
    const s = { id: `${unit}:${id}`, unit, sec, name, rule, gen };
    all.push(s); by[s.id] = s;
    return s;
  }
  function make(id) {
    const s = by[id]; if (!s) return null;
    for (let tries = 0; tries < 20; tries++) {
      const ex = s.gen();
      if (!ex) continue;
      ex.skill = id;
      return ex;
    }
    return null;
  }
  const unitSkills = uid => all.filter(s => s.unit === uid);
  const forSection = (uid, heading) => all.filter(s => s.unit === uid && (Array.isArray(s.sec) ? s.sec.includes(heading) : s.sec === heading));

  /* ---------- formati ---------- */
  const F = {
    fill: (q, a, h, x = {}) => ({ t: 'f', q, a: [].concat(a), ...(h ? { h } : {}), ...x }),
    choice: (q, o, a, x = {}) => ({ t: 'c', q, o: shuffle(uniq(o)), a, ...x }),
    fix: (q, a, x = {}) => ({ t: 'x', q, a: [].concat(a), ...x }),
    tr: (it, a, x = {}) => ({ t: 't', it, a: uniq([].concat(a)), ...x }),
    ord: (it, a, x = {}) => ({ t: 'o', it, a: uniq([].concat(a)), ...x }),
  };

  /* ---------- diagnosi riutilizzabili ---------- */
  const lastWord = s => String(s || '').trim().toLowerCase().replace(/[.?!,]+$/, '').split(/\s+/).pop() || '';
  const words = s => String(s || '').toLowerCase().replace(/[’]/g, "'").replace(/[.?!,]/g, ' ').split(/\s+/).filter(Boolean);
  function spellingHint(user, want) {
    const u = String(user || '').trim().toLowerCase();
    if (!u || u === want) return null;
    // solo se le due parole si somigliano davvero (stessa iniziale, lunghezza vicina)
    if (u[0] !== want[0] || Math.abs(u.length - want.length) > 3) return null;
    const note = EXPLAIN.spelling(u, want);
    return /^Errore di ortografia/.test(note) ? null : note;
  }
  // Present simple: che forma doveva avere il verbo con questo soggetto, e cosa ha scritto chi risponde
  function dPresent(s, v, input, timeEn) {
    const w = lastWord(input), k = kindOf(w, v);
    const want = LEX.is3(s) ? v.third : v.b;
    if (w === want) return null;
    const abit = timeEn ? `«${timeEn}» indica un'abitudine` : 'si parla di un\'abitudine o di un fatto';
    if (LEX.is3(s) && has(k, 'base')) return `Il soggetto è ${LEX.subjDesc(s)}: terza persona singolare. Al present simple con he, she, it il verbo prende la -s: ${b(v.b)} → ${b(v.third)}. La forma ${b(v.b)}, senza -s, va solo con I, you, we, they.`;
    if (!LEX.is3(s) && has(k, 'third')) return `Il soggetto è ${LEX.subjDesc(s)}${s.p >= 3 ? ', plurale' : ''}: niente -s. La -s del present simple va solo con he, she, it. Qui: ${b(v.b)}.`;
    if (has(k, 'ing')) return `${b(v.ing)} da solo non è un tempo verbale: servirebbe anche be (${s.en} ${BE[s.p]} ${v.ing}) e vorrebbe dire "sta facendo adesso". Qui ${abit}: present simple, ${b(want)}.`;
    if (has(k, 'past') || has(k, 'regularized')) return `${b(w)} è il passato, ma qui ${abit} del presente: present simple, ${b(want)}.`;
    const sp = spellingHint(w, want);
    if (sp) return sp;
    return null;
  }
  // Dopo do / does / did / can / to il verbo resta alla forma base
  function dBaseAfter(aux, v, input) {
    const w = lastWord(input), k = kindOf(w, v);
    if (w === v.b) return null;
    if (has(k, 'third')) return `Dopo ${b(aux)} il verbo resta alla forma base: ${b(v.b)}, non ${b(w)}. La -s ${/does/.test(aux) ? 'ce l\'ha già does' : 'non serve'}: si mette una volta sola.`;
    if (has(k, 'past') || has(k, 'regularized')) return `Dopo ${b(aux)} il verbo resta alla forma base: ${b(v.b)}, non ${b(w)}. ${/did/.test(aux) ? 'Il passato lo indica già did.' : ''}`;
    if (has(k, 'ing')) return `Dopo ${b(aux)} serve la forma base ${b(v.b)}, non la forma in -ing.`;
    return null;
  }
  const yourDiag = (fn) => fn; // segnaposto leggibile: le funzioni diag sono definite accanto ai generatori

  // numeri in lettere per le età (accettiamo "22" e "twenty-two")
  const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const numWords = n => n < 20 ? ONES[n] : TENS[Math.floor(n / 10)] + (n % 10 ? '-' + ONES[n % 10] : '');

  window.SKILLS = { all, by, add, make, unitSkills, forSection, F, b, esc, words, lastWord, spellingHint, dPresent, dBaseAfter, numWords, yourDiag };
})();
