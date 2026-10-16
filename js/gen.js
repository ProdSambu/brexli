// Generatori di esercizi: frasi nuove a ogni sessione, sulla stessa regola.
// Ogni generatore restituisce un esercizio nel formato delle unità ({ t, q, a, h, o, why }).
// Le forme dei verbi vengono dal motore di verbs.js, quindi le soluzioni sono calcolate, non scritte a mano.
(() => {
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const cap = s => s[0].toUpperCase() + s.slice(1);
  const V = b => VERBS.find(b).v;
  const uniq = a => [...new Set(a)];

  /* ---------- soggetti ---------- */
  // p: persona (1s, 2s, 3s, 1p, 2p, 3p); pr: pronome che lo riprende
  const SUBJ = [
    { en: 'I', p: '1s', pr: 'I' }, { en: 'you', p: '2s', pr: 'you' }, { en: 'he', p: '3s', pr: 'he' }, { en: 'she', p: '3s', pr: 'she' },
    { en: 'we', p: '1p', pr: 'we' }, { en: 'they', p: '3p', pr: 'they' },
    { en: 'my brother', p: '3s', pr: 'he' }, { en: 'my sister', p: '3s', pr: 'she' }, { en: 'Anna', p: '3s', pr: 'she' }, { en: 'Luca', p: '3s', pr: 'he' },
    { en: 'Mr Rossi', p: '3s', pr: 'he' }, { en: 'our teacher', p: '3s', pr: 'she' }, { en: 'my parents', p: '3p', pr: 'they' },
    { en: 'my friends', p: '3p', pr: 'they' }, { en: 'Sara and Tom', p: '3p', pr: 'they' }, { en: 'the children', p: '3p', pr: 'they' },
  ];
  const SING3 = SUBJ.filter(s => s.p === '3s'), NOT3 = SUBJ.filter(s => s.p !== '3s');
  const third = s => s.p === '3s';
  const beOf = s => s.en === 'I' ? 'am' : third(s) ? 'is' : 'are';
  const wasOf = s => s.en === 'I' || third(s) ? 'was' : 'were';
  const haveOf = s => third(s) ? 'has' : 'have';
  const doOf = s => third(s) ? 'does' : 'do';
  const subjAt = (s, start) => start ? cap(s.en) : s.en; // "I" resta maiuscolo comunque

  /* ---------- azioni: verbo + complemento neutro rispetto al tempo ---------- */
  const ACT = [
    ['work', 'in a bank'], ['live', 'in London'], ['play', 'the guitar'], ['study', 'medicine'], ['teach', 'English'],
    ['speak', 'three languages'], ['drive', 'to work'], ['cook', 'dinner'], ['read', 'the newspaper'], ['write', 'emails'],
    ['go', 'to the gym'], ['drink', 'coffee'], ['eat', 'fish'], ['wash', 'the car'], ['carry', 'a heavy bag'],
    ['fix', 'old bikes'], ['buy', 'fresh bread'], ['make', 'pizza'], ['take', 'the bus'], ['swim', 'in the sea'],
    ['run', 'in the park'], ['catch', 'the train'], ['watch', 'films'], ['listen', 'to the radio'], ['wait', 'for the bus'],
    ['plan', 'a trip'], ['clean', 'the kitchen'], ['sing', 'in a choir'], ['wear', 'a uniform'], ['try', 'new recipes'],
    ['visit', 'the museum'], ['sell', 'old books'], ['meet', 'friends'], ['send', 'messages'], ['do', 'the shopping'],
  ].map(([b, rest]) => ({ v: V(b), rest }));
  const ACT_IRR = ACT.filter(a => a.v.irr), ACT_REG = ACT.filter(a => !a.v.irr);

  const T_PRES = ['every day', 'on Mondays', 'at the weekend', 'twice a week', 'every morning'];
  const T_NOW = ['now', 'at the moment', 'right now'];
  const T_PAST = ['yesterday', 'last week', 'two days ago', 'last night', 'in 2019', 'last summer'];

  // regole riassunte, mostrate nella correzione
  const WHY = {
    third: 'Con he, she, it (e i soggetti singolari) il present simple prende la -s.',
    noThird: 'Con I, you, we, they (e i soggetti plurali) niente -s.',
    doBase: 'Dopo do / does / did il verbo resta alla forma base.',
    cont: 'Present continuous: am / is / are + verbo in -ing.',
    past: 'Past simple: -ed per i regolari, la seconda colonna per gli irregolari.',
    didBase: "Con did / didn't il verbo resta alla forma base.",
    pp: 'Present perfect: have / has + participio passato.',
  };

  /* ---------- A1-01: be al presente ---------- */
  const BE_COMP = ['tired', 'hungry', 'at home', 'from Italy', 'ready', 'late', 'in the kitchen', 'very happy', 'at work', 'cold'];
  const gBe = () => {
    const s = pick(SUBJ), c = pick(BE_COMP), be = beOf(s), mode = pick(['aff', 'neg', 'q', 'c']);
    if (mode === 'aff') return { t: 'f', q: `${subjAt(s, 1)} ___ ${c}.`, h: 'be', a: [be] };
    if (mode === 'neg') return { t: 'f', q: `${subjAt(s, 1)} ___ ${c}.`, h: 'be, negativa', a: be === 'am' ? ["'m not", 'am not'] : [`${be}n't`, `${be} not`] };
    if (mode === 'q') return { t: 'f', q: `___ ${s.en} ${c}?`, a: [cap(be)], why: 'Nelle domande be va prima del soggetto.' };
    return { t: 'c', q: `${subjAt(s, 1)} ___ ${c}.`, o: ['am', 'is', 'are'], a: be, why: 'I am, he / she / it is, we / you / they are.' };
  };

  /* ---------- A1-02: a / an, plurali ---------- */
  const A_AN = [['a', 'book'], ['a', 'university'], ['a', 'European city'], ['a', 'uniform'], ['a', 'one-way ticket'], ['a', 'house'], ['a', 'useful idea'],
    ['an', 'hour'], ['an', 'apple'], ['an', 'honest man'], ['an', 'umbrella'], ['an', 'old house'], ['an', 'egg'], ['an', 'interesting film'], ['an', 'email'], ['an', 'orange']];
  const PLURAL = [['child', 'children'], ['person', 'people'], ['man', 'men'], ['woman', 'women'], ['foot', 'feet'], ['tooth', 'teeth'], ['mouse', 'mice'],
    ['city', 'cities'], ['baby', 'babies'], ['day', 'days'], ['box', 'boxes'], ['bus', 'buses'], ['watch', 'watches'], ['knife', 'knives'], ['wife', 'wives'],
    ['potato', 'potatoes'], ['tomato', 'tomatoes'], ['photo', 'photos'], ['key', 'keys'], ['toy', 'toys'], ['glass', 'glasses'], ['dish', 'dishes'],
    ['life', 'lives'], ['leaf', 'leaves'], ['sheep', 'sheep'], ['fish', 'fish'], ['party', 'parties'], ['boy', 'boys']];
  const NUM = ['two', 'three', 'four', 'five'];
  const gArticle = () => { const [a, n] = pick(A_AN); return { t: 'c', q: `It's ___ ${n}.`, o: ['a', 'an'], a, why: 'Conta il suono: an davanti a un suono vocalico (an hour), a davanti a un suono consonantico (a university).' }; };
  const gPlural = () => { const [s, p] = pick(PLURAL); return { t: 'f', q: `one ${s}, ${pick(NUM)} ___`, a: [p], why: `Il plurale di ${s} è ${p}.` }; };

  /* ---------- A1-03: possessivi, genitivo, have got ---------- */
  const PEOPLE = [['Marco', 'his'], ['Paul', 'his'], ['Luca', 'his'], ['Giulia', 'her'], ['Emma', 'her'], ['Anna', 'her'], ['The children', 'their'], ['My parents', 'their']];
  const REL = ['wife', 'husband', 'brother', 'sister', 'mother', 'father', 'dog', 'car', 'house'];
  const gPossAdj = () => { const [who, p] = pick(PEOPLE), r = pick(REL); return { t: 'c', q: `${who} ${who.startsWith('The') || who.startsWith('My') ? 'love' : 'loves'} ___ ${r}.`, o: ['his', 'her', 'their', 'its'], a: p, why: 'Il possessivo dipende da chi possiede: his (lui), her (lei), their (loro).' }; };
  const PRON = [['me', 'mine'], ['you', 'yours'], ['him', 'his'], ['her', 'hers'], ['us', 'ours'], ['them', 'theirs']];
  const gPossPron = () => { const [o, p] = pick(PRON), n = pick(['bag', 'phone', 'umbrella', 'car', 'jacket']); return { t: 'f', q: `This ${n} belongs to ${o}. It's ___.`, a: [p], why: 'I pronomi possessivi: mine, yours, his, hers, ours, theirs (senza articolo).' }; };
  const OWNERS = [['father', 'di mio padre'], ['mother', 'di mia madre'], ['brother', 'di mio fratello'], ['sister', 'di mia sorella'], ['parents', 'dei miei genitori'], ['friends', 'dei miei amici'], ['children', 'dei miei figli'], ['boss', 'del mio capo']];
  const THINGS = [['car', 'la macchina'], ['house', 'la casa'], ['room', 'la camera'], ['dog', 'il cane'], ['phone', 'il telefono'], ['office', "l'ufficio"]];
  const gGenitive = () => {
    const [o, oit] = pick(OWNERS), [th, thit] = pick(THINGS);
    const g = /s$/.test(o) && o !== 'boss' ? `${o}'` : `${o}'s`;
    return { t: 'f', q: `It's my ___ ${th}.`, h: `${thit} ${oit}`, a: [g], why: /'$/.test(g) ? "Plurale in -s: si aggiunge solo l'apostrofo." : "Genitivo sassone: possessore + 's, poi la cosa." };
  };
  const GOT = ['two sisters', 'a dog', 'a new car', 'blue eyes', 'a cold', 'three children', 'a big garden'];
  const gHaveGot = () => {
    const s = pick(SUBJ), x = pick(GOT), mode = pick(['aff', 'neg', 'q']);
    if (mode === 'aff') return { t: 'f', q: `${subjAt(s, 1)} ___ ${x}.`, h: 'have got', a: third(s) ? ['has got', "'s got"] : ['have got', "'ve got"] };
    if (mode === 'neg') return { t: 'f', q: `${subjAt(s, 1)} ___ ${x}.`, h: 'have got, negativa', a: third(s) ? ["hasn't got", 'has not got'] : ["haven't got", 'have not got'] };
    return { t: 'f', q: `___ ${s.en} got ${x}?`, a: [cap(haveOf(s))], why: 'Domanda con have got: Have / Has + soggetto + got.' };
  };

  /* ---------- A1-04 / A1-05: present simple ---------- */
  const gPresAff = () => {
    const s = pick(Math.random() < 0.65 ? SING3 : NOT3), a = pick(ACT), time = pick(T_PRES), form = third(s) ? a.v.third : a.v.b;
    const mode = pick(['f', 'f', 'c', 'x']);
    if (mode === 'f') return { t: 'f', q: `${subjAt(s, 1)} ___ ${a.rest} ${time}.`, h: a.v.b, a: [form], why: third(s) ? WHY.third : WHY.noThird };
    if (mode === 'c') return { t: 'c', q: `${subjAt(s, 1)} ___ ${a.rest} ${time}.`, o: shuffle(uniq([a.v.b, a.v.third, a.v.ing])), a: form, why: third(s) ? WHY.third : WHY.noThird };
    const wrong = third(s) ? a.v.b : a.v.third;
    return { t: 'x', q: `${subjAt(s, 1)} ${wrong} ${a.rest} ${time}.`, a: [`${subjAt(s, 1)} ${form} ${a.rest} ${time}.`], why: third(s) ? WHY.third : WHY.noThird };
  };
  const gPresNegQ = () => {
    const s = pick(SUBJ), a = pick(ACT), d = doOf(s), mode = pick(['neg', 'q', 'c', 'x']);
    if (mode === 'neg') return { t: 'f', q: `${subjAt(s, 1)} ___ ${a.rest}.`, h: `not / ${a.v.b}`, a: [`${d}n't ${a.v.b}`, `${d} not ${a.v.b}`], why: WHY.doBase };
    if (mode === 'q') return { t: 'f', q: `___ ${s.en} ${a.v.b} ${a.rest}?`, a: [cap(d)], why: third(s) ? 'Con he, she, it la domanda usa does.' : 'Con I, you, we, they la domanda usa do.' };
    if (mode === 'c') { const ss = pick(SING3); return { t: 'c', q: `${subjAt(ss, 1)} doesn't ___ ${a.rest}.`, o: shuffle(uniq([a.v.b, a.v.third, a.v.ing])), a: a.v.b, why: WHY.doBase }; }
    const ss = pick(SING3);
    return { t: 'x', q: `${subjAt(ss, 1)} doesn't ${a.v.third} ${a.rest}.`, a: [`${subjAt(ss, 1)} doesn't ${a.v.b} ${a.rest}.`], why: WHY.doBase };
  };

  /* ---------- A1-06: there is / are, some / any ---------- */
  const THERE = [['a cat', 'is'], ['two chairs', 'are'], ['some milk', 'is'], ['some apples', 'are'], ['a lot of people', 'are'], ['a problem', 'is'],
    ['three bedrooms', 'are'], ['a bank', 'is'], ['some water', 'is'], ['many cars', 'are'], ['an old church', 'is'], ['five students', 'are']];
  const PLACES = ['in the garden', 'in the kitchen', 'in this street', 'near here', 'in the classroom', 'in the house'];
  const gThere = () => {
    const [n, v] = pick(THERE), mode = pick(['c', 'some', 'any']);
    if (mode === 'c') return { t: 'c', q: `There ___ ${n} ${pick(PLACES)}.`, o: ['is', 'are'], a: v, why: 'There is con il singolare e i non numerabili, there are con il plurale.' };
    const pl = pick(['eggs', 'shops', 'biscuits', 'questions', 'chairs', 'apples']);
    if (mode === 'some') return { t: 'c', q: `There are ___ ${pl} on the table.`, o: ['some', 'any'], a: 'some', why: 'Nelle frasi affermative si usa some.' };
    return pick([{ t: 'c', q: `There aren't ___ ${pl}.`, o: ['some', 'any'], a: 'any', why: 'Nelle frasi negative si usa any.' }, { t: 'c', q: `Are there ___ ${pl}?`, o: ['some', 'any'], a: 'any', why: 'Nelle domande si usa any.' }]);
  };

  /* ---------- A1-07: present continuous ---------- */
  const gCont = () => {
    const s = pick(SUBJ), a = pick(ACT), be = beOf(s), mode = pick(['f', 'f', 'c', 'neg']);
    const full = `${be} ${a.v.ing}`, short = be === 'am' ? `'m ${a.v.ing}` : be === 'is' ? `'s ${a.v.ing}` : `'re ${a.v.ing}`;
    if (mode === 'f') return { t: 'f', q: `${subjAt(s, 1)} ___ ${a.rest} ${pick(T_NOW)}.`, h: a.v.b, a: [full, short], why: WHY.cont };
    if (mode === 'neg') return { t: 'f', q: `${subjAt(s, 1)} ___ ${a.rest} ${pick(T_NOW)}.`, h: `not / ${a.v.b}`, a: be === 'am' ? [`'m not ${a.v.ing}`, `am not ${a.v.ing}`] : [`${be}n't ${a.v.ing}`, `${be} not ${a.v.ing}`], why: WHY.cont };
    // simple o continuous, decide l'espressione di tempo
    const now = Math.random() < 0.5, simple = third(s) ? a.v.third : a.v.b;
    return { t: 'c', q: `${subjAt(s, 1)} ___ ${a.rest} ${now ? pick(T_NOW) : pick(T_PRES)}.`, o: shuffle([simple, full]), a: now ? full : simple, why: now ? 'Azione in corso adesso: present continuous.' : 'Abitudine: present simple.' };
  };

  /* ---------- A1-08: can ---------- */
  const gCan = () => {
    const s = pick(SUBJ), a = pick(ACT), mode = pick(['f', 'neg', 'x1', 'x2', 'q']);
    if (mode === 'f') return { t: 'f', q: `${subjAt(s, 1)} ___ ${a.v.b} ${a.rest}.`, h: 'can', a: ['can'], why: 'Can è uguale per tutte le persone.' };
    if (mode === 'neg') return { t: 'f', q: `${subjAt(s, 1)} ___ ${a.v.b} ${a.rest}.`, h: 'can, negativa', a: ["can't", 'cannot'] };
    if (mode === 'q') return { t: 'f', q: `___ ${s.en} ${a.v.b} ${a.rest}?`, a: ['Can'], why: 'Can fa le domande da solo, senza do.' };
    const ss = pick(SING3);
    if (mode === 'x1') return { t: 'x', q: `${subjAt(ss, 1)} cans ${a.v.b} ${a.rest}.`, a: [`${subjAt(ss, 1)} can ${a.v.b} ${a.rest}.`], why: 'I modali non prendono la -s.' };
    return { t: 'x', q: `${subjAt(ss, 1)} can to ${a.v.b} ${a.rest}.`, a: [`${subjAt(ss, 1)} can ${a.v.b} ${a.rest}.`], why: 'Dopo can niente to.' };
  };

  /* ---------- A1-09: was / were ---------- */
  const WAS_COMP = ['at home', 'very tired', 'at the cinema', 'ill', 'late for work', 'in Rome', 'at school', 'happy'];
  const gWas = () => {
    const s = pick(SUBJ), c = pick(WAS_COMP), w = wasOf(s), t = pick(T_PAST), mode = pick(['c', 'f', 'neg']);
    if (mode === 'c') return { t: 'c', q: `${subjAt(s, 1)} ___ ${c} ${t}.`, o: ['was', 'were'], a: w, why: 'I / he / she / it was, we / you / they were.' };
    if (mode === 'f') return { t: 'f', q: `___ ${s.en} ${c} ${t}?`, a: [cap(w)] };
    return { t: 'f', q: `${subjAt(s, 1)} ___ ${c} ${t}.`, h: 'be, negativa', a: [`${w}n't`, `${w} not`] };
  };

  /* ---------- A1-10: past simple ---------- */
  const gPast = () => {
    const s = pick(SUBJ), a = Math.random() < 0.6 ? pick(ACT_IRR) : pick(ACT_REG), t = pick(T_PAST), mode = pick(['f', 'f', 'neg', 'q', 'x']);
    if (mode === 'f') return { t: 'f', q: `${subjAt(s, 1)} ___ ${a.rest} ${t}.`, h: a.v.b, a: a.v.p.split(' / '), why: a.v.irr ? `${a.v.b} è irregolare: ${a.v.p1}.` : WHY.past };
    if (mode === 'neg') return { t: 'f', q: `${subjAt(s, 1)} ___ ${a.rest} ${t}.`, h: `not / ${a.v.b}`, a: [`didn't ${a.v.b}`, `did not ${a.v.b}`], why: WHY.didBase };
    if (mode === 'q') return { t: 'c', q: `Did ${s.en} ___ ${a.rest} ${t}?`, o: shuffle(uniq([a.v.b, a.v.p1, a.v.third])), a: a.v.b, why: WHY.didBase };
    // per "correggi l'errore" servono verbi il cui passato si vede (read → read non va bene)
    const ax = a.v.p1 !== a.v.b ? a : pick(ACT.filter(x => x.v.p1 !== x.v.b));
    const wrong = ax.v.irr && Math.random() < 0.5 && VERBS.ed(ax.v.b) !== ax.v.p1 ? VERBS.ed(ax.v.b) : null;
    if (wrong) return { t: 'x', q: `${subjAt(s, 1)} ${wrong} ${ax.rest} ${t}.`, a: [`${subjAt(s, 1)} ${ax.v.p1} ${ax.rest} ${t}.`], why: `${ax.v.b} è irregolare: ${ax.v.p1}.` };
    return { t: 'x', q: `${subjAt(s, 1)} didn't ${ax.v.p1} ${ax.rest} ${t}.`, a: [`${subjAt(s, 1)} didn't ${ax.v.b} ${ax.rest} ${t}.`], why: WHY.didBase };
  };

  /* ---------- A1-11: futuro ---------- */
  const gFuture = () => {
    const s = pick(SUBJ), a = pick(ACT), mode = pick(['will', 'when', 'going']);
    if (mode === 'will') return { t: 'f', q: `I think ${s.en === 'I' ? 'I' : s.en} ___ ${a.rest} tomorrow.`, h: `${a.v.b}, futuro`, a: [`will ${a.v.b}`, `'ll ${a.v.b}`], why: 'Previsione o opinione: will + verbo base.' };
    if (mode === 'when') {
      const ss = pick(SUBJ), get = third(ss) ? 'gets' : 'get';
      return { t: 'c', q: `${subjAt(s, 1)} will be happy when ${ss.en} ___ home.`, o: shuffle([get, 'will get']), a: get, why: 'Dopo when, if, as soon as si usa il presente, non will.' };
    }
    const be = beOf(s);
    return { t: 'f', q: `${subjAt(s, 1)} ___ ${a.rest} next week. It's already decided.`, h: `${a.v.b}, be going to`, a: [`${be} going to ${a.v.b}`, `${be === 'am' ? "'m" : be === 'is' ? "'s" : "'re"} going to ${a.v.b}`], why: 'Intenzione già decisa: be going to + verbo base.' };
  };

  /* ---------- A1-12: comparativi e superlativi ---------- */
  const ADJ = [['cheap', 'restaurant'], ['fast', 'car'], ['tall', 'building'], ['old', 'church'], ['small', 'room'], ['big', 'city'], ['hot', 'kitchen'],
    ['nice', 'café'], ['happy', 'person'], ['easy', 'exercise'], ['busy', 'street'], ['long', 'river'], ['expensive', 'hotel'], ['beautiful', 'beach'],
    ['interesting', 'book'], ['comfortable', 'chair'], ['dangerous', 'road'], ['difficult', 'exam'], ['popular', 'song'], ['good', 'pizza'], ['bad', 'café']];
  const IRR_ADJ = { good: ['better', 'best'], bad: ['worse', 'worst'] };
  function compare(adj) {
    if (IRR_ADJ[adj]) return IRR_ADJ[adj];
    const syll = (adj.replace(/e$/, '').match(/[aeiouy]+/g) || []).length; // la e muta finale non fa sillaba (nice)
    if (syll >= 2 && !/y$/.test(adj)) return [`more ${adj}`, `most ${adj}`];
    let base = adj;
    if (/[^aeiou]y$/.test(adj)) base = adj.slice(0, -1) + 'i';
    else if (/^[^aeiou]*[aeiou][^aeiouwxy]$/.test(adj)) base = adj + adj.slice(-1);
    return /e$/.test(base) ? [`${base}r`, `${base}st`] : [`${base}er`, `${base}est`];
  }
  const gCompare = () => {
    const [adj, n] = pick(ADJ), [cmp, sup] = compare(adj), mode = pick(['cmp', 'sup', 'c']);
    if (mode === 'cmp') return { t: 'f', q: `This ${n} is ___ than that one.`, h: adj, a: [cmp], why: /^more/.test(cmp) ? 'Aggettivo lungo: more + aggettivo.' : 'Aggettivo corto: -er (con le regole di scrittura).' };
    if (mode === 'sup') return { t: 'f', q: `It's the ___ ${n} in town.`, h: adj, a: [sup], why: /^most/.test(sup) ? 'Aggettivo lungo: the most + aggettivo.' : 'Aggettivo corto: the -est.' };
    return { t: 'c', q: `My ${n} is ${cmp} ___ yours.`, o: ['than', 'of', 'that'], a: 'than', why: 'Il secondo termine di paragone vuole than.' };
  };

  /* ---------- A2-01 / A2-02: present perfect ---------- */
  const gPerfect = () => {
    const s = pick(SUBJ), a = pick(ACT), h = haveOf(s), mode = pick(['f', 'q', 'never', 'x']);
    const short = h === 'has' ? "'s" : "'ve";
    if (mode === 'f') return { t: 'f', q: `${subjAt(s, 1)} ___ ${a.rest} before.`, h: `${a.v.b}, present perfect`, a: [`${h} ${a.v.pp1}`, `${short} ${a.v.pp1}`, ...a.v.pp.split(' / ').slice(1).map(p => `${h} ${p}`)], why: WHY.pp };
    if (mode === 'q') return { t: 'f', q: `___ ${s.en} ever ${a.v.pp1} ${a.rest}?`, a: [cap(h)], why: 'Domanda al present perfect: Have / Has + soggetto + participio.' };
    if (mode === 'never') return { t: 'f', q: `${subjAt(s, 1)} ___ ${a.rest}.`, h: `never / ${a.v.b}`, a: [`${h} never ${a.v.pp1}`, `${short} never ${a.v.pp1}`], why: 'Never va tra have / has e il participio.' };
    const wrongForm = a.v.p1 !== a.v.pp1 ? a.v.p1 : null;
    if (wrongForm) return { t: 'x', q: `${subjAt(s, 1)} ${h} ${wrongForm} ${a.rest} before.`, a: [`${subjAt(s, 1)} ${h} ${a.v.pp1} ${a.rest} before.`], why: `Dopo have / has serve il participio: ${a.v.pp1}, non ${a.v.p1}.` };
    return { t: 'x', q: `${subjAt(s, 1)} ${h === 'has' ? 'have' : 'has'} ${a.v.pp1} ${a.rest} before.`, a: [`${subjAt(s, 1)} ${h} ${a.v.pp1} ${a.rest} before.`], why: 'has solo con he, she, it; have con gli altri.' };
  };
  const gJustYet = () => {
    const s = pick(SUBJ), a = pick(ACT), h = haveOf(s), mode = pick(['just', 'yet', 'already']);
    if (mode === 'yet') return { t: 'c', q: `${subjAt(s, 1)} ${h}n't ${a.v.pp1} ${a.rest} ___.`, o: shuffle(['yet', 'already', 'just']), a: 'yet', why: 'Nelle negative "non ancora" è not … yet, con yet in fondo.' };
    if (mode === 'just') return { t: 'c', q: `${subjAt(s, 1)} ${h} ___ ${a.v.pp1} ${a.rest}. Five minutes ago!`, o: shuffle(['just', 'yet', 'ever']), a: 'just', why: 'Appena successo: just, tra have e il participio.' };
    return { t: 'c', q: `${subjAt(s, 1)} ${h} ___ ${a.v.pp1} ${a.rest}, earlier than expected.`, o: shuffle(['already', 'yet', 'ever']), a: 'already', why: 'Già, prima del previsto: already, tra have e il participio.' };
  };

  /* ---------- A2-03: for / since / ago ---------- */
  const FOR = ['two years', 'ten minutes', 'a long time', 'three weeks', 'an hour', 'six months', 'ages'];
  const SINCE = ['2019', 'Monday', 'Christmas', 'last summer', "nine o'clock", 'I was a child', 'January'];
  const STATES = [["I've lived here", 'I moved here'], ["We've known each other", 'We met'], ["She's worked in this shop", 'She started in this shop'], ["They've been married", 'They got married'], ["I've had this car", 'I bought this car']];
  const gForSince = () => {
    const [pp, ps] = pick(STATES), mode = pick(['for', 'since', 'ago']);
    if (mode === 'for') return { t: 'c', q: `${pp} ___ ${pick(FOR)}.`, o: shuffle(['for', 'since', 'ago']), a: 'for', why: 'for + una durata.' };
    if (mode === 'since') return { t: 'c', q: `${pp} ___ ${pick(SINCE)}.`, o: shuffle(['for', 'since', 'ago']), a: 'since', why: 'since + il punto di partenza.' };
    return { t: 'c', q: `${ps} ${pick(FOR.filter(x => x !== 'ages' && x !== 'a long time'))} ___.`, o: shuffle(['for', 'since', 'ago']), a: 'ago', why: 'ago (fa) va dopo la durata, con il past simple.' };
  };

  /* ---------- A2-04: present perfect o past simple ---------- */
  const DONE_T = ['yesterday', 'last week', 'in 2018', 'two days ago', 'last summer'];
  const OPEN_T = ['three times this year', 'before', 'many times', 'this week', 'so far this month'];
  const gPerfOrPast = () => {
    const s = pick(SUBJ), a = pick(ACT), h = haveOf(s), done = Math.random() < 0.5;
    const ps = a.v.p1, pp = `${h} ${a.v.pp1}`;
    return { t: 'c', q: `${subjAt(s, 1)} ___ ${a.rest} ${done ? pick(DONE_T) : pick(OPEN_T)}.`, o: shuffle([ps, pp]), a: done ? ps : pp, why: done ? 'Tempo finito e preciso: past simple.' : 'Periodo non finito o non precisato: present perfect.' };
  };

  /* ---------- A2-05: past continuous ---------- */
  const INTERRUPT = ['when the phone rang', 'when I arrived', 'when the lights went out', 'when it started to rain'];
  const gPastCont = () => {
    const s = pick(SUBJ), a = pick(ACT), w = wasOf(s), mode = pick(['f', 'neg', 'c']);
    if (mode === 'f') return { t: 'f', q: `${subjAt(s, 1)} ___ ${a.rest} ${pick(INTERRUPT)}.`, h: a.v.b, a: [`${w} ${a.v.ing}`], why: "Azione in corso interrotta: was / were + -ing (l'altra al past simple)." };
    if (mode === 'neg') return { t: 'f', q: `${subjAt(s, 1)} ___ ${a.rest} ${pick(INTERRUPT)}.`, h: `not / ${a.v.b}`, a: [`${w}n't ${a.v.ing}`, `${w} not ${a.v.ing}`] };
    return { t: 'c', q: `${subjAt(s, 1)} ${w} ${a.v.ing} ${a.rest} ___ the phone rang.`, o: shuffle(['when', 'while']), a: 'when', why: "L'azione breve che interrompe: when + past simple." };
  };

  /* ---------- A2-06: much / many / a few / a little ---------- */
  const COUNT = ['friends', 'books', 'brothers', 'languages', 'people', 'questions', 'chairs', 'eggs'];
  const UNCOUNT = ['money', 'time', 'sugar', 'water', 'information', 'homework', 'bread', 'milk', 'advice'];
  const gMuch = () => {
    const c = Math.random() < 0.5, n = c ? pick(COUNT) : pick(UNCOUNT), mode = pick(['how', 'neg', 'few']);
    if (mode === 'how') return { t: 'c', q: `How ___ ${n} do you need?`, o: ['much', 'many'], a: c ? 'many' : 'much', why: c ? 'Numerabile plurale: many.' : 'Non numerabile: much.' };
    if (mode === 'neg') return { t: 'c', q: `We don't have ___ ${n}.`, o: ['much', 'many'], a: c ? 'many' : 'much', why: c ? 'Numerabile plurale: many.' : 'Non numerabile: much.' };
    const food = c ? pick(['eggs', 'biscuits', 'apples', 'olives', 'strawberries']) : pick(['sugar', 'water', 'milk', 'bread', 'cheese']);
    return { t: 'c', q: `Can I have ___ ${food}, please?`, o: ['a few', 'a little'], a: c ? 'a few' : 'a little', why: c ? 'Con le cose che si contano: a few.' : 'Con quelle che non si contano: a little.' };
  };

  /* ---------- A2-07: must / have to / should ---------- */
  const MUST = [
    ['You ___ smoke in the hospital.', "mustn't", 'È un divieto: mustn\'t.'],
    ['You ___ touch that wire. It\'s dangerous!', "mustn't", 'È un divieto: mustn\'t.'],
    ["It's Sunday, so you ___ get up early.", "don't have to", 'Non è necessario: don\'t have to.'],
    ["The museum is free: you ___ pay.", "don't have to", 'Non è necessario: don\'t have to.'],
    ['You look tired. You ___ go to bed.', 'should', 'Un consiglio: should.'],
    ['You ___ eat so much sugar. It\'s bad for you.', "shouldn't", 'Un consiglio negativo: shouldn\'t.'],
    ['Yesterday I ___ work until ten.', 'had to', 'Obbligo al passato: had to.'],
    ['Nurses ___ wear a uniform at work.', 'have to', 'Obbligo esterno: have to.'],
    ['My sister ___ wear a uniform at school.', 'has to', 'Obbligo esterno, terza persona: has to.'],
    ['Passengers ___ show their tickets.', 'must', 'Regola scritta: must.'],
  ];
  const gMust = () => {
    const [q, a, why] = pick(MUST);
    const others = shuffle(["mustn't", "don't have to", 'should', 'had to', 'has to', 'must'].filter(x => x !== a)).slice(0, 2);
    return { t: 'c', q, o: shuffle([a, ...others]), a, why };
  };

  /* ---------- A2-08: something / anything / nothing ---------- */
  const SOME = [
    ["I didn't see ___.", ['anybody', 'somebody', 'nobody'], 'anybody', 'Negativa con not: any-.'],
    ['___ called you this morning.', ['Somebody', 'Anybody', 'Nothing'], 'Somebody', 'Frase affermativa: some-.'],
    ["There's ___ in the fridge. Let's go shopping.", ['nothing', 'anything', 'something'], 'nothing', 'No- con il verbo affermativo: già negativo.'],
    ['Is there ___ here?', ['anybody', 'somebody', 'everybody'], 'anybody', 'Nelle domande: any-.'],
    ['Would you like ___ to drink?', ['something', 'anything', 'nothing'], 'something', 'Nelle offerte: some-.'],
    ["I can't find my keys ___.", ['anywhere', 'somewhere', 'nowhere'], 'anywhere', 'Negativa con not: any-.'],
    ['___ knows the answer. It\'s too difficult.', ['Nobody', 'Anybody', 'Somebody'], 'Nobody', 'Nessuno, all\'inizio: nobody.'],
    ['Everybody ___ ready.', ['is', 'are'], 'is', 'Everybody è singolare.'],
    ["I've looked ___ but I can't find it.", ['everywhere', 'anywhere', 'nowhere'], 'everywhere', 'Dappertutto: everywhere.'],
  ];
  const gSome = () => { const [q, o, a, why] = pick(SOME); return { t: 'c', q, o: shuffle(o), a, why }; };

  /* ---------- A2-09: primo condizionale ---------- */
  const IF_THEN = ['be tired', 'be happy', 'need a break', 'feel better', 'have less free time'];
  const gIf = () => {
    const s = pick(SUBJ), a = pick(ACT), pres = third(s) ? a.v.third : a.v.b, then = pick(IF_THEN), mode = pick(['f', 'f', 'x']);
    const pr = s.pr === 'I' ? 'I' : s.pr;
    if (mode === 'f') return { t: 'f', q: `If ${s.en} ___ ${a.rest}, ${pr} will ${then}.`, h: a.v.b, a: [pres], why: 'Dopo if si usa il presente, anche se si parla del futuro.' };
    return { t: 'x', q: `If ${s.en} will ${a.v.b} ${a.rest}, ${pr} will ${then}.`, a: [`If ${s.en} ${pres} ${a.rest}, ${pr} will ${then}.`, `If ${s.en} ${pres} ${a.rest}, ${pr}'ll ${then}.`], why: 'Dopo if niente will: il presente.' };
  };

  /* ---------- A2-10: verbo + -ing o to ---------- */
  const ING_V = ['enjoy', 'finish', 'avoid', 'imagine', 'miss', 'keep'];
  const TO_V = ['want', 'need', 'hope', 'plan', 'would like'];
  const PREPS = [["I'm good at", 'Sono bravo a'], ["She's interested in", 'Le interessa'], ["We're tired of", 'Siamo stanchi di'], ['Thank you for', 'Grazie di']];
  const gIngTo = () => {
    const a = pick(ACT), mode = pick(['ing', 'to', 'prep']);
    if (mode === 'prep') { const [p] = pick(PREPS); return { t: 'f', q: `${p} ___ ${a.rest}.`, h: a.v.b, a: [a.v.ing], why: 'Dopo una preposizione il verbo va in -ing.' }; }
    const s = pick(SUBJ), firstB = mode === 'ing' ? pick(ING_V) : pick(TO_V);
    const first = firstB === 'would like' ? { b: 'would like', third: 'would like' } : V(firstB);
    const f1 = third(s) ? first.third : first.b;
    if (mode === 'ing') return { t: 'f', q: `${subjAt(s, 1)} ${f1} ___ ${a.rest}.`, h: a.v.b, a: [a.v.ing], why: `${first.b} vuole il verbo in -ing.` };
    return { t: 'f', q: `${subjAt(s, 1)} ${f1} ___ ${a.rest}.`, h: a.v.b, a: [`to ${a.v.b}`], why: `${first.b} vuole to + verbo.` };
  };

  // Generatori di ogni unità (nome: funzione)
  window.GEN = {
    'a1-01': { be: gBe },
    'a1-02': { article: gArticle, plural: gPlural },
    'a1-03': { possAdj: gPossAdj, possPron: gPossPron, genitive: gGenitive, haveGot: gHaveGot },
    'a1-04': { presAff: gPresAff },
    'a1-05': { presNegQ: gPresNegQ },
    'a1-06': { there: gThere },
    'a1-07': { cont: gCont },
    'a1-08': { can: gCan },
    'a1-09': { was: gWas },
    'a1-10': { past: gPast },
    'a1-11': { future: gFuture },
    'a1-12': { compare: gCompare },
    'a2-01': { perfect: gPerfect },
    'a2-02': { justYet: gJustYet, perfect: gPerfect },
    'a2-03': { forSince: gForSince },
    'a2-04': { perfOrPast: gPerfOrPast },
    'a2-05': { pastCont: gPastCont },
    'a2-06': { much: gMuch },
    'a2-07': { must: gMust },
    'a2-08': { some: gSome },
    'a2-09': { ifThen: gIf },
    'a2-10': { ingTo: gIngTo },
  };
  // Un esercizio nuovo per l'unità (o per un generatore preciso), marcato con il suo nome
  window.GEN.make = (unitId, name) => {
    const g = window.GEN[unitId]; if (!g) return null;
    const names = Object.keys(g);
    const n = name && g[name] ? name : pick(names);
    const ex = g[n]();
    ex.gen = n;
    return ex;
  };
})();
