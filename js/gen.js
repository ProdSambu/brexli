// Regole e generatori della linea A2 (nel registro SKILLS, come quelli dell'A1).
// GEN resta come scorciatoia: GEN.make(unità) = un esercizio nuovo da una regola a caso di quell'unità.
(() => {
  const { pick, shuffle, cap, uniq, V, SUBJ, is3, enSubj, subjDesc, BE, WAS, ACT, kindOf, has } = LEX;
  const { add, F, b, words, lastWord, spellingHint } = SKILLS;
  const coin = (p = 0.5) => Math.random() < p;
  const haveOf = s => is3(s) ? 'has' : 'have';

  /* ---------- A2-01 / A2-02: present perfect ---------- */
  function dPP(s, v, x) {
    const ws = words(x), h = haveOf(s), w = ws[ws.length - 1] || '', k = kindOf(w, v);
    const auxOk = !ws.some(y => y === 'have' || y === 'has' || y === "'ve" || y === "'s") || ws.includes(h) || /'ve|'s/.test(x) && !ws.includes(h === 'has' ? 'have' : 'has');
    if (auxOk && v.pp.split(' / ').includes(w)) return null; // run → have run: participio uguale alla base
    if (ws.includes('have') && is3(s)) return `Il soggetto è ${subjDesc(s)}: terza persona, quindi ${b('has')}, non have.`;
    if (ws.includes('has') && !is3(s)) return `Il soggetto è ${subjDesc(s)}: ${b('have')}. Has è solo per he, she, it.`;
    if (has(k, 'past') && !has(k, 'pp')) return `Dopo have / has serve il participio passato (terza colonna): ${b(v.pp1)}, non ${w}, che è il past simple.`;
    if (has(k, 'base') || has(k, 'third')) return `Present perfect: ${h} + participio passato, ${b(v.pp1)}.`;
    if (has(k, 'regularized')) return `${b(v.b)} è irregolare: il participio è ${b(v.pp1)}.`;
    return spellingHint(w, v.pp1);
  }
  add('a2-01', 'perfect', ['Come si forma', 'Le esperienze: quando non importa', 'Ever e never'], 'Present perfect: have / has + participio',
    "Present perfect = have / has + participio (la terza colonna: seen, eaten, been), come \"ho visto\". Si usa per le esperienze della vita quando non dici quando: Have you ever been to London? I've never seen it. Never va tra have e il participio.",
    () => {
      const s = pick(SUBJ), a = pick(ACT), v = a.v, h = haveOf(s), sh = h === 'has' ? "'s" : "'ve", m = pick(['f', 'q', 'never', 'x']);
      const why = `Present perfect: ${h} + participio, ${b(v.pp1)}.`;
      if (m === 'f') return F.fill(`${enSubj(s, 1)} ___ ${a.rest} before.`, [`${h} ${v.pp1}`, `${sh} ${v.pp1}`, ...v.pp.split(' / ').slice(1).map(p => `${h} ${p}`)], `${v.b}, present perfect`, { why, diag: x => dPP(s, v, x) });
      if (m === 'q') return F.fill(`___ ${s.en} ever ${v.pp1} ${a.rest}?`, [cap(h)], null, { why: `Domanda: ${cap(h)} + soggetto + participio.`, diag: x => /^(do|does|did)$/i.test(x.trim()) ? `Con il present perfect la domanda si fa con ${b(cap(h))}, non con do.` : dPP(s, v, x) });
      if (m === 'never') return F.fill(`${enSubj(s, 1)} ___ ${a.rest}.`, [`${h} never ${v.pp1}`, `${sh} never ${v.pp1}`], `never / ${v.b}`, { why: 'Never va tra have / has e il participio.', diag: x => /n't|\bnot\b/.test(x) ? `${b('never')} è già negativo: ${h} never ${v.pp1}, senza not.` : dPP(s, v, x) });
      if (v.p1 !== v.pp1) return F.fix(`${enSubj(s, 1)} ${h} ${v.p1} ${a.rest} before.`, [`${enSubj(s, 1)} ${h} ${v.pp1} ${a.rest} before.`], { why: `Dopo have / has serve il participio: ${v.pp1}, non ${v.p1}.` });
      return F.fix(`${enSubj(s, 1)} ${h === 'has' ? 'have' : 'has'} ${v.pp1} ${a.rest} before.`, [`${enSubj(s, 1)} ${h} ${v.pp1} ${a.rest} before.`], { why: 'Has solo con he, she, it; have con gli altri.' });
    });

  add('a2-02', 'just-yet', 'Just, already, yet', 'Just, already, yet',
    "Just (appena) e already (già) stanno in mezzo, tra have e il participio: I've just finished, she's already left. Yet (ancora / già) va in fondo, solo con not e nelle domande: I haven't eaten yet, Have you finished yet?",
    () => {
      const s = pick(SUBJ), a = pick(ACT), v = a.v, h = haveOf(s), m = pick(['yet', 'just', 'already', 'fix']);
      if (m === 'yet') return F.choice(`${enSubj(s, 1)} ${h}n't ${v.pp1} ${a.rest} ___.`, ['yet', 'already', 'just'], 'yet', { why: 'Nelle negative "non ancora" è not … yet, con yet in fondo.' });
      if (m === 'just') return F.choice(`${enSubj(s, 1)} ${h} ___ ${v.pp1} ${a.rest}. Five minutes ago!`, ['just', 'yet', 'ever'], 'just', { why: 'Appena successo: just, tra have e il participio.' });
      if (m === 'already') return F.choice(`${enSubj(s, 1)} ${h} ___ ${v.pp1} ${a.rest}, earlier than expected.`, ['already', 'yet', 'ever'], 'already', { why: 'Già, prima del previsto: already, tra have e il participio.' });
      return F.fix(`${enSubj(s, 1)} ${h}n't yet ${v.pp1} ${a.rest}.`, [`${enSubj(s, 1)} ${h}n't ${v.pp1} ${a.rest} yet.`], { why: 'Yet va in fondo alla frase.' });
    });

  /* ---------- A2-03: for / since / ago ---------- */
  const FOR = ['two years', 'ten minutes', 'a long time', 'three weeks', 'an hour', 'six months', 'ages'];
  const SINCE = ['2019', 'Monday', 'Christmas', 'last summer', "nine o'clock", 'I was a child', 'January'];
  const STATES = [["I've lived here", 'I moved here'], ["We've known each other", 'We met'], ["She's worked in this shop", 'She started in this shop'], ["They've been married", 'They got married'], ["I've had this car", 'I bought this car']];
  add('a2-03', 'for-since', ['For o since?', 'For, since e ago', 'Una situazione che dura fino a oggi'], 'For, since e ago',
    "\"Da\" + tempo, per una cosa che dura ancora → present perfect: I've lived here for three years (vivo qui da tre anni). For + quanto tempo (for two years), since + da quando (since 2019). Ago (fa) va col past simple: I moved here two years ago.",
    () => {
      const [pp, ps] = pick(STATES), m = pick(['for', 'since', 'ago']);
      if (m === 'for') { const d = pick(FOR); return F.choice(`${pp} ___ ${d}.`, ['for', 'since', 'ago'], 'for', { why: `«${d}» è una durata: ${b('for')}.` }); }
      if (m === 'since') { const d = pick(SINCE); return F.choice(`${pp} ___ ${d}.`, ['for', 'since', 'ago'], 'since', { why: `«${d}» è il punto di partenza: ${b('since')}.` }); }
      return F.choice(`${ps} ${pick(FOR.filter(x => x !== 'ages' && x !== 'a long time'))} ___.`, ['for', 'since', 'ago'], 'ago', { why: 'Ago (fa) va dopo la durata, con il past simple.' });
    });

  /* ---------- A2-04: present perfect o past simple ---------- */
  const DONE_T = ['yesterday', 'last week', 'in 2018', 'two days ago', 'last summer'];
  const OPEN_T = ['three times this year', 'before', 'many times', 'this week', 'so far this month'];
  add('a2-04', 'perf-or-past', ['La domanda da farsi', 'Today, this week, this year'], 'Present perfect o past simple?',
    "Chiediti: il tempo è finito? Sì (yesterday, last week, in 2018, two days ago, When…?) → past simple. No, oppure non dici quando (today, this week, ever, never, before) → present perfect.",
    () => {
      const s = pick(SUBJ), a = pick(ACT), h = haveOf(s), done = coin(), t = done ? pick(DONE_T) : pick(OPEN_T);
      const ps = a.v.p1, pp = `${h} ${a.v.pp1}`;
      return F.choice(`${enSubj(s, 1)} ___ ${a.rest} ${t}.`, [ps, pp], done ? ps : pp, { why: done ? `«${t}» è un momento finito: past simple, ${b(ps)}.` : `«${t}» è un periodo non finito o non precisato: present perfect, ${b(pp)}.` });
    });

  /* ---------- A2-05: past continuous ---------- */
  const INTERRUPT = ['when the phone rang', 'when I arrived', 'when the lights went out', 'when it started to rain'];
  add('a2-05', 'past-cont', ['Come si forma', 'Azione in corso e azione che la interrompe'], 'Past continuous: was / were + -ing',
    "Was / were + -ing = \"stavo facendo\": un'azione lunga, in corso nel passato. Spesso arriva un'azione breve al past simple a interromperla: I was having a shower when the phone rang. While va con l'azione lunga, when con quella breve.",
    () => {
      const s = pick(SUBJ), a = pick(ACT), v = a.v, w = WAS[s.p], m = pick(['f', 'neg', 'c']);
      const why = `Azione in corso interrotta: ${s.en} ${b(w + ' ' + v.ing)} (l'azione breve al past simple).`;
      const diag = x => {
        const m2 = /\b(was|were)(n't)?\b/i.exec(x);
        if (!m2) return `Manca was / were: ${s.en} ${b(w)} ${v.ing}.`;
        if (m2[1].toLowerCase() !== w) return `Il soggetto è ${subjDesc(s)}: ${b(w)}.`;
        return null;
      };
      if (m === 'f') return F.fill(`${enSubj(s, 1)} ___ ${a.rest} ${pick(INTERRUPT)}.`, [`${w} ${v.ing}`], v.b, { why, diag });
      if (m === 'neg') return F.fill(`${enSubj(s, 1)} ___ ${a.rest} ${pick(INTERRUPT)}.`, [`${w}n't ${v.ing}`, `${w} not ${v.ing}`], `not / ${v.b}`, { why, diag });
      return F.choice(`${enSubj(s, 1)} ${w} ${v.ing} ${a.rest} ___ the phone rang.`, ['when', 'while'], 'when', { why: "L'azione breve che interrompe: when + past simple." });
    });

  /* ---------- A2-06: quantità ---------- */
  const COUNT = ['friends', 'books', 'brothers', 'languages', 'people', 'questions', 'chairs', 'eggs'];
  const UNCOUNT = ['money', 'time', 'sugar', 'water', 'information', 'homework', 'bread', 'milk', 'advice'];
  add('a2-06', 'much-many', ['Much, many, a lot of', 'A few, a little, few, little', 'Numerabili e non numerabili'], 'Much, many, a few, a little',
    "Many con le cose che si contano (many friends), much con quelle che non si contano (much time), soprattutto con not e nelle domande. A lot of va bene sempre. A few + cose da contare, a little + cose che non si contano. Information, advice, news, furniture non si contano.",
    () => {
      const c = coin(), n = c ? pick(COUNT) : pick(UNCOUNT), m = pick(['how', 'neg', 'few']);
      const why = c ? `${b(n)} si conta: many.` : `${b(n)} non si conta: much.`;
      if (m === 'how') return F.choice(`How ___ ${n} do you need?`, ['much', 'many'], c ? 'many' : 'much', { why });
      if (m === 'neg') return F.choice(`We don't have ___ ${n}.`, ['much', 'many'], c ? 'many' : 'much', { why });
      const food = c ? pick(['eggs', 'biscuits', 'apples', 'olives', 'strawberries']) : pick(['sugar', 'water', 'milk', 'bread', 'cheese']);
      return F.choice(`Can I have ___ ${food}, please?`, ['a few', 'a little'], c ? 'a few' : 'a little', { why: c ? 'Con le cose che si contano: a few.' : 'Con quelle che non si contano: a little.' });
    });

  /* ---------- A2-07: must / have to / should ---------- */
  const MUST = [
    ['You ___ smoke in the hospital.', "mustn't", "È un divieto: mustn't."], ['You ___ touch that wire. It\'s dangerous!', "mustn't", "È un divieto: mustn't."],
    ["It's Sunday, so you ___ get up early.", "don't have to", "Non è necessario: don't have to."], ['The museum is free: you ___ pay.', "don't have to", "Non è necessario: don't have to."],
    ['You look tired. You ___ go to bed.', 'should', 'Un consiglio: should.'], ["You ___ eat so much sugar. It's bad for you.", "shouldn't", "Un consiglio negativo: shouldn't."],
    ['Yesterday I ___ work until ten.', 'had to', 'Obbligo al passato: had to.'], ['Nurses ___ wear a uniform at work.', 'have to', 'Obbligo esterno: have to.'],
    ['My sister ___ wear a uniform at school.', 'has to', 'Obbligo esterno, terza persona: has to.'], ['Passengers ___ show their tickets.', 'must', 'Regola scritta: must.']];
  add('a2-07', 'must', ['Must e have to', "Mustn't o don't have to? La trappola", 'Should: il consiglio'], "Must, have to, mustn't, should",
    "Must e have to = devo (must se lo decido io, have to se me lo impongono). Attenzione: mustn't = è vietato; don't have to = non serve. Should = dovresti, un consiglio. Al passato: had to.",
    () => { const [q, a, why] = pick(MUST); return F.choice(q, [a, ...shuffle(["mustn't", "don't have to", 'should', 'had to', 'has to', 'must'].filter(x => x !== a)).slice(0, 2)], a, { why }); });

  /* ---------- A2-08: something / anything ---------- */
  const SOME = [["I didn't see ___.", ['anybody', 'somebody', 'nobody'], 'anybody', 'Negativa con not: any-.'], ['___ called you this morning.', ['Somebody', 'Anybody', 'Nothing'], 'Somebody', 'Frase affermativa: some-.'],
    ["There's ___ in the fridge. Let's go shopping.", ['nothing', 'anything', 'something'], 'nothing', 'No- con il verbo affermativo: già negativo.'], ['Is there ___ here?', ['anybody', 'somebody', 'everybody'], 'anybody', 'Nelle domande: any-.'],
    ['Would you like ___ to drink?', ['something', 'anything', 'nothing'], 'something', 'Nelle offerte: some-.'], ["I can't find my keys ___.", ['anywhere', 'somewhere', 'nowhere'], 'anywhere', 'Negativa con not: any-.'],
    ["___ knows the answer. It's too difficult.", ['Nobody', 'Anybody', 'Somebody'], 'Nobody', "Nessuno, all'inizio: nobody."], ['Everybody ___ ready.', ['is', 'are'], 'is', 'Everybody è singolare.'],
    ["I've looked ___ but I can't find it.", ['everywhere', 'anywhere', 'nowhere'], 'everywhere', 'Dappertutto: everywhere.']];
  add('a2-08', 'some-any', ['Quando si usa quale', 'Una negazione sola'], 'Something, anything, nothing…',
    "Some- nelle frasi normali e quando offri; any- con not e nelle domande; no- da solo è già negativo. Un solo \"no\" per frase: I didn't see anybody oppure I saw nobody, mai I didn't see nobody. Everybody vuole il verbo al singolare (everybody is).",
    () => { const [q, o, a, why] = pick(SOME); return F.choice(q, o, a, { why }); });

  /* ---------- A2-09: primo condizionale ---------- */
  const IF_THEN = ['be tired', 'be happy', 'need a break', 'feel better', 'have less free time'];
  add('a2-09', 'if-present', ['La struttura', 'Unless = if not'], 'If + presente, will',
    "Per dire cosa succederà se succede qualcosa: if + presente, poi will + verbo. Dopo if non si mette mai will, anche se parli del futuro: If it rains, we'll stay at home (se pioverà, resteremo a casa).",
    () => {
      const s = pick(SUBJ), a = pick(ACT), pres = is3(s) ? a.v.third : a.v.b, then = pick(IF_THEN), pr = s.pr;
      const why = `Dopo if si usa il presente: ${b(pres)}${is3(s) ? ' (con la -s, perché il soggetto è ' + s.en + ')' : ''}.`;
      if (coin(0.65)) return F.fill(`If ${s.en} ___ ${a.rest}, ${pr} will ${then}.`, [pres], a.v.b, { why, diag: x => /\bwill\b|'ll/i.test(x) ? `In italiano dopo "se" si può mettere il futuro, in inglese no: dopo if il presente, ${b(pres)}.` : SKILLS.dPresent(s, a.v, x, '') } );
      return F.fix(`If ${s.en} will ${a.v.b} ${a.rest}, ${pr} will ${then}.`, [`If ${s.en} ${pres} ${a.rest}, ${pr} will ${then}.`, `If ${s.en} ${pres} ${a.rest}, ${pr}'ll ${then}.`], { why: 'Dopo if niente will: il presente.' });
    });

  /* ---------- A2-10: -ing o to ---------- */
  const ING_V = ['enjoy', 'finish', 'avoid', 'imagine', 'miss', 'keep'];
  const TO_V = ['want', 'need', 'hope', 'plan', 'would like'];
  const PREPS = ["I'm good at", "She's interested in", "We're tired of", 'Thank you for'];
  add('a2-10', 'ing-to', ['Verbi seguiti da -ing', 'Verbi seguiti da to + verbo', 'Dopo una preposizione: sempre -ing'], 'Verbo + -ing o verbo + to',
    "Alcuni verbi vogliono il secondo verbo in -ing (enjoy, finish, avoid, mind, miss, keep: cose già in corso), altri to + verbo (want, need, decide, hope, plan, would like: cose ancora da fare). Dopo at, in, of, for, without… sempre -ing.",
    () => {
      const a = pick(ACT), m = pick(['ing', 'to', 'prep']);
      if (m === 'prep') return F.fill(`${pick(PREPS)} ___ ${a.rest}.`, [a.v.ing], a.v.b, { why: 'Dopo una preposizione il verbo va in -ing.', diag: x => /^to\b/i.test(x.trim()) || lastWord(x) === a.v.b ? `Dopo una preposizione ci vuole la forma in -ing: ${b(a.v.ing)}.` : null });
      const s = pick(SUBJ), firstB = m === 'ing' ? pick(ING_V) : pick(TO_V);
      const first = firstB === 'would like' ? { b: 'would like', third: 'would like' } : V(firstB);
      const f1 = is3(s) ? first.third : first.b;
      if (m === 'ing') return F.fill(`${enSubj(s, 1)} ${f1} ___ ${a.rest}.`, [a.v.ing], a.v.b, { why: `${b(first.b)} vuole il verbo in -ing.`, diag: x => /^to\b/i.test(x.trim()) ? `${b(first.b)} non vuole to: vuole la forma in -ing, ${b(a.v.ing)}.` : null });
      return F.fill(`${enSubj(s, 1)} ${f1} ___ ${a.rest}.`, [`to ${a.v.b}`], a.v.b, { why: `${b(first.b)} vuole to + verbo.`, diag: x => /ing$/.test(lastWord(x)) && lastWord(x) !== a.v.b ? `${b(first.b)} vuole to + verbo base: ${b('to ' + a.v.b)}.` : !/^to\b/i.test(x.trim()) ? `Manca to: ${first.b} to ${a.v.b}.` : null });
    });

  // Compatibilità: GEN[unità] esiste se l'unità ha regole; GEN.make dà un esercizio da una regola a caso
  const GEN = {};
  for (const sk of SKILLS.all) (GEN[sk.unit] ||= {})[sk.id.split(':')[1]] = true;
  GEN.make = (unitId, name) => {
    const list = SKILLS.unitSkills(unitId); if (!list.length) return null;
    const sk = name && SKILLS.by[`${unitId}:${name}`] ? SKILLS.by[`${unitId}:${name}`] : pick(list);
    const ex = SKILLS.make(sk.id);
    if (ex) ex.gen = sk.id.split(':')[1];
    return ex;
  };
  window.GEN = GEN;
})();
