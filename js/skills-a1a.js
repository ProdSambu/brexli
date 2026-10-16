// Regole e generatori della linea A1, fermate 1-6.
(() => {
  const { pick, shuffle, cap, uniq, V, SUBJ, SUBJ_TR, is3, enSubj, subjDesc, BE, beShort, IT, ACT, ACT_TR, T_PRES, itSentence, itPres, enVariants, kindOf, has } = LEX;
  const { add, F, b, words, lastWord, dPresent, dBaseAfter, numWords, spellingHint } = SKILLS;
  const coin = (p = 0.5) => Math.random() < p;
  const contr = (s, be) => s.en === 'I' ? "I'm" : `${s.en}${beShort[be]}`;

  /* =================== A1-01: to be =================== */
  // complementi con le forme italiane per genere
  const BE_C = [
    ['tired', { m: 'stanco', f: 'stanca', mp: 'stanchi' }], ['ready', { m: 'pronto', f: 'pronta', mp: 'pronti' }],
    ['late', 'in ritardo'], ['at home', 'a casa'], ['in the kitchen', 'in cucina'], ['at work', 'al lavoro'],
    ['Italian', { m: 'italiano', f: 'italiana', mp: 'italiani' }], ['happy', { m: 'felice', f: 'felice', mp: 'felici' }],
    ['very busy', { m: 'molto impegnato', f: 'molto impegnata', mp: 'molto impegnati' }], ['in London', 'a Londra'],
    ['at school', 'a scuola'], ['ill', { m: 'malato', f: 'malata', mp: 'malati' }],
  ];
  const itC = (c, s) => typeof c[1] === 'string' ? c[1] : c[1][s.g];
  const beWhy = s => `Il soggetto è ${subjDesc(s)}: con ${s.pr} il verbo be è ${b(BE[s.p])}. Ricorda: I ${b('am')}, he / she / it ${b('is')}, we / you / they ${b('are')}.`;
  function dBe(s, input) {
    const w = lastWord(input);
    if (w === 'be') return `${b('be')} è l'infinito: va coniugato secondo il soggetto. ${beWhy(s)}`;
    if (['am', 'is', 'are', "'m", "'s", "'re"].includes(w) && w.replace("'m", 'am').replace("'s", 'is').replace("'re", 'are') !== BE[s.p]) return beWhy(s);
    if (['have', 'has'].includes(w)) return `Qui serve il verbo essere (be), non avere: ${beWhy(s)}`;
    return null;
  }
  add('a1-01', 'be-form', 'Forma affermativa', 'Le forme di be: am, is, are',
    'Il verbo be cambia con il soggetto: I am (I\'m), he / she / it is (\'s), we / you / they are (\'re). Un soggetto come my brother vale he; my parents vale they.',
    () => {
      const s = pick(SUBJ), c = pick(BE_C), be = BE[s.p];
      const m = pick(['fill', 'fill', 'choice', 'tr', 'tr', 'fix']);
      if (m === 'fill') return F.fill(`${enSubj(s, 1)} ___ ${c[0]}.`, [be, beShort[be]], 'be', { why: beWhy(s), diag: x => dBe(s, x) });
      if (m === 'choice') return F.choice(`${enSubj(s, 1)} ___ ${c[0]}.`, ['am', 'is', 'are'], be, { why: beWhy(s), diag: x => dBe(s, x) });
      if (m === 'fix') {
        const wrong = pick(['am', 'is', 'are'].filter(x => x !== be));
        return F.fix(`${enSubj(s, 1)} ${wrong} ${c[0]}.`, `${enSubj(s, 1)} ${be} ${c[0]}.`, { why: beWhy(s) });
      }
      const ss = pick(SUBJ_TR);
      return F.tr(itSentence(ss, IT.essere[ss.p], itC(c, ss)), [`${enSubj(ss, 1)} ${BE[ss.p]} ${c[0]}.`], { why: beWhy(ss) });
    });

  add('a1-01', 'be-neg-q', ['Forma negativa', 'Domande e risposte brevi'], 'Be: negativa, domande e risposte brevi',
    'Negativa: be + not (I\'m not, she isn\'t, they aren\'t). Domanda: be va prima del soggetto (Are you tired? Is she at home?). Be non usa mai do. Risposte brevi: Yes, I am / No, I\'m not (mai "Yes, I\'m").',
    () => {
      const s = pick(SUBJ), c = pick(BE_C), be = BE[s.p];
      const neg = be === 'am' ? ["'m not", 'am not'] : [`${be}n't`, `${be} not`];
      const m = pick(['neg', 'q', 'trneg', 'trq', 'fix', 'short']);
      if (m === 'neg') return F.fill(`${enSubj(s, 1)} ___ ${c[0]}.`, neg, 'be, negativa', { why: 'La negativa di be: be + not. Con I solo I\'m not (amn\'t non esiste).' });
      if (m === 'q') return F.fill(`___ ${s.en} ${c[0]}?`, [cap(be)], null, { why: `Nella domanda il verbo va prima del soggetto: ${cap(be)} ${s.en} ${c[0]}?`, diag: x => /^(do|does)$/i.test(x.trim()) ? `Be non usa do / does: fa la domanda da solo, mettendosi prima del soggetto. ${beWhy(s)}` : dBe(s, x) });
      const ss = pick(SUBJ_TR), bb = BE[ss.p];
      if (m === 'trneg') return F.tr(itSentence(ss, IT.essere[ss.p], itC(c, ss), '', { neg: true }), [`${enSubj(ss, 1)} ${bb} not ${c[0]}.`], { why: 'Negativa: be + not.' });
      if (m === 'trq') return F.tr(itSentence(ss, IT.essere[ss.p], itC(c, ss), '', { q: true }), [`${cap(bb)} ${ss.en} ${c[0]}?`], { why: 'In italiano la domanda si riconosce dal tono; in inglese il verbo be passa davanti al soggetto.' });
      if (m === 'fix') {
        if (coin()) return F.fix(`${cap(LEX.is3(s) ? 'does' : 'do')} ${s.en} ${be === 'am' ? 'are' : be} ${c[0]}?`.replace(/^Do I are/, 'Do I am'), `${cap(be)} ${s.en} ${c[0]}?`, { why: 'Be non usa do / does: nella domanda si mette solo prima del soggetto.' });
        return F.fix(`${enSubj(s, 1)} not ${be} ${c[0]}.`, `${enSubj(s, 1)} ${be} not ${c[0]}.`, { why: 'Not va dopo be: I am not, she is not, they are not.' });
      }
      const pos = coin();
      return F.choice(`"${cap(be)} ${s.en === 'I' ? 'you' : s.en} ${c[0]}?" "${pos ? 'Yes' : 'No'}, ___."`.replace(/^"Am you/, '"Are you'),
        pos ? ['I am', "I'm", 'I are'] : ["I'm not", "I amn't", 'I not am'], pos ? 'I am' : "I'm not",
        { why: pos ? 'Nelle risposte brevi affermative non si usa la forma contratta: Yes, I am.' : 'Negativa con I: I\'m not.' });
    });

  // età, fame, freddo… con be
  const AVERE = [['fame', 'hungry'], ['sete', 'thirsty'], ['freddo', 'cold'], ['caldo', 'hot'], ['sonno', 'sleepy', ['tired']], ['paura', 'afraid', ['scared']],
    ['ragione', 'right'], ['torto', 'wrong'], ['fretta', 'in a hurry']];
  add('a1-01', 'be-not-have', "Quando l'italiano dice avere", 'Età, fame, freddo: be, non have',
    'Dove l\'italiano usa avere (ho 20 anni, ho fame, ho freddo, hai ragione) l\'inglese usa be: I\'m 20, I\'m hungry, I\'m cold, you\'re right. L\'età è be + numero (+ years old, mai solo years).',
    () => {
      const s = pick(SUBJ_TR), be = BE[s.p], m = pick(['tr', 'tr', 'tr', 'fix', 'choice']);
      const dHave = x => /\b(have|has|had)\b/i.test(x) ? `In italiano si dice "avere fame / avere ${'20'} anni", ma in inglese queste cose si dicono con ${b('be')}: ${s.en} ${be} …, non ${s.en} ${LEX.is3(s) ? 'has' : 'have'} ….` : null;
      if (coin(0.4)) {
        const n = 12 + Math.floor(Math.random() * 60), it = `${n} anni`;
        const acc = [`${enSubj(s, 1)} ${be} ${n}.`, `${enSubj(s, 1)} ${be} ${n} years old.`, `${enSubj(s, 1)} ${be} ${numWords(n)}.`, `${enSubj(s, 1)} ${be} ${numWords(n)} years old.`];
        if (m === 'fix') return F.fix(`${enSubj(s, 1)} ${LEX.is3(s) ? 'has' : 'have'} ${n} years.`, acc, { why: "L'età si dice con be: I'm 20 (oppure I'm 20 years old)." });
        return F.tr(itSentence(s, IT.avere[s.p], it), acc, { why: "L'età si dice con be: I'm 20, I'm 20 years old. Mai have.", diag: dHave });
      }
      const [itw, en, alt] = pick(AVERE), neg = coin(0.3);
      const accs = [en, ...(alt || [])].map(e => `${enSubj(s, 1)} ${be}${neg ? ' not' : ''} ${e}.`);
      if (m === 'fix') return F.fix(`${enSubj(s, 1)} ${LEX.is3(s) ? 'has' : 'have'} ${en === 'in a hurry' ? 'hurry' : en}.`.replace(/ have (right|wrong|cold|hot)/, ' have $1'), accs.map(a => a.replace(' not', '')), { why: `"Avere ${itw}" in inglese è be ${en}.` });
      if (m === 'choice') return F.choice(`${enSubj(s, 1)} ___ ${en}.`, uniq([be, LEX.is3(s) ? 'has' : 'have', 'is', 'are']).slice(0, 3).concat(uniq([be])).filter((x, i, a) => a.indexOf(x) === i), be, { why: `"Avere ${itw}" in inglese si dice con be: ${be} ${en}.`, diag: dHave });
      return F.tr(itSentence(s, IT.avere[s.p], itw, '', { neg }), accs, { why: `"Avere ${itw}" in inglese si dice con be: ${be} ${en}.`, diag: dHave });
    });

  const IT_EXPR = [['Fa freddo', 'cold'], ['Fa caldo', 'hot'], ['È tardi', 'late'], ['È presto', 'early'], ['È importante', 'important'],
    ['È lontano', 'far'], ['È facile', 'easy'], ['È difficile', 'difficult', ['hard']], ['È mezzanotte', 'midnight'], ['Sono le otto', "eight o'clock", ['eight']], ['È mezzogiorno', 'midday', ['noon', '12']]];
  const DAY = [['oggi', 'today'], ['', ''], ['', ''], ['qui', 'here'], ['stasera', 'tonight']];
  add('a1-01', 'subject-it', 'I pronomi soggetto', 'Il soggetto non si omette: it',
    'In inglese il soggetto va sempre espresso, anche dove l\'italiano non lo mette. Per tempo, ore, distanze e giudizi il soggetto è it: It\'s cold, It\'s late, It\'s easy.',
    () => {
      const [it, en, alt] = pick(IT_EXPR);
      // "oggi / qui / stasera" solo dove suona naturale (fa freddo oggi, sì; è lontano oggi, no)
      const [dIt, dEn] = ['cold', 'hot'].includes(en) ? pick(DAY) : en === 'late' ? pick([['', ''], ['', ''], ['stasera', 'tonight']]) : ['', ''];
      const ends = [en, ...(alt || [])];
      const acc = ends.flatMap(e => dEn ? [`It's ${e} ${dEn}.`, `${cap(dEn)} it's ${e}.`] : [`It's ${e}.`]);
      const diag = x => !/\bit\b|it's/i.test(x) ? `Manca il soggetto. In italiano "${it.toLowerCase()}" non ha soggetto, ma in inglese ci vuole sempre: per tempo, ore e giudizi si usa ${b('it')} (It's ${en}).` : null;
      if (coin(0.35)) return F.fix(`Is ${en}${dEn ? ' ' + dEn : ''}.`, acc, { why: 'Il soggetto non si omette: per il tempo, le ore e i giudizi si usa it.' });
      return F.tr(`${it}${dIt ? ' ' + dIt : ''}.`, acc, { why: 'Il soggetto non si omette: per il tempo, le ore e i giudizi il soggetto è it.', diag });
    });

  /* =================== A1-02: articoli, plurali, this / that =================== */
  const A_AN = [['a', 'book'], ['a', 'university'], ['a', 'European city', 'eu'], ['a', 'uniform', 'u'], ['a', 'one-way ticket', 'one'], ['a', 'house'], ['a', 'useful idea', 'u'],
    ['a', 'horse'], ['a', 'small apple'], ['a', 'big egg'], ['a', 'year'], ['a', 'unit', 'u'],
    ['an', 'hour', 'h'], ['an', 'apple'], ['an', 'honest man', 'h'], ['an', 'umbrella'], ['an', 'old house'], ['an', 'egg'], ['an', 'interesting film'], ['an', 'email'],
    ['an', 'orange'], ['an', 'idea'], ['an', 'easy exercise'], ['an', 'ugly dog'], ['an', 'island'], ['an', 'expensive car']];
  const JOBS = [['a', 'doctor', 'medico'], ['an', 'engineer', 'ingegnere'], ['a', 'teacher', 'insegnante'], ['an', 'architect', 'architetto'], ['a', 'nurse', 'infermiere'],
    ['an', 'actor', 'attore'], ['a', 'lawyer', 'avvocato'], ['an', 'artist', 'artista'], ['a', 'waiter', 'cameriere'], ['an', 'electrician', 'elettricista'], ['a', 'pilot', 'pilota'], ['an', 'accountant', 'commercialista']];
  const anWhy = (art, noun, tag) => tag === 'h' ? `${b(noun.split(' ')[0])} si pronuncia senza h: il suono iniziale è vocalico, quindi ${b('an')}.`
    : tag === 'u' || tag === 'eu' ? `${b(noun.split(' ')[0])} comincia con il suono /ju/, che è consonantico: quindi ${b('a')}, anche se la lettera è una vocale.`
    : tag === 'one' ? `${b('one')} si pronuncia /wʌn/, con un suono consonantico: quindi ${b('a')}.`
    : art === 'an' ? `${b(noun.split(' ')[0])} comincia con un suono vocalico: ${b('an')}.` : `${b(noun.split(' ')[0])} comincia con un suono consonantico: ${b('a')}.`;
  add('a1-02', 'a-an', 'A o an: conta il suono', 'A o an',
    'L\'articolo è a davanti a un suono consonantico, an davanti a un suono vocalico. Conta il suono, non la lettera: an hour (h muta), a university (/ju/). Con le professioni l\'articolo serve sempre: she\'s a doctor.',
    () => {
      if (coin(0.35)) {
        const [art, job, it] = pick(JOBS), s = pick(SUBJ_TR.filter(x => is3(x)));
        const diag = x => !/\b(a|an)\b/i.test(x) ? `In italiano "è ${it}" non ha articolo, ma in inglese con le professioni serve sempre: ${s.en} is ${b(art)} ${job}.` : null;
        return coin() ? F.tr(itSentence(s, 'è', it), [`${enSubj(s, 1)} is ${art} ${job}.`], { why: 'Con le professioni in inglese serve sempre a / an.', diag })
          : F.fix(`${enSubj(s, 1)} is ${job}.`, [`${enSubj(s, 1)} is ${art} ${job}.`], { why: 'Con le professioni in inglese serve sempre a / an.' });
      }
      const [art, noun, tag] = pick(A_AN);
      return F.choice(`It's ___ ${noun}.`, ['a', 'an'], art, { why: anWhy(art, noun, tag) });
    });

  const LOVE = [['love', 'amo ami ama amiamo amate amano'], ['hate', 'odio odi odia odiamo odiate odiano'], ['like', null]];
  const GENERAL = [['music', 'la musica'], ['dogs', 'i cani'], ['cats', 'i gatti'], ['coffee', 'il caffè'], ['tea', 'il tè'], ['books', 'i libri'], ['films', 'i film', ['movies']],
    ['chocolate', 'il cioccolato'], ['history', 'la storia'], ['art', "l'arte"], ['football', 'il calcio', ['soccer']], ['jazz', 'il jazz'], ['vegetables', 'le verdure'], ['pizza', 'la pizza'], ['sport', 'lo sport', ['sports']]];
  const GENERIC_FIX = [['The life is short.', 'Life is short.'], ['The money is not everything.', "Money isn't everything."], ['The dogs are loyal animals.', 'Dogs are loyal animals.'],
    ['The time is money.', 'Time is money.'], ['I like the music.', 'I like music.'], ['The English is easy.', 'English is easy.'], ['My friends are at the home.', 'My friends are at home.'],
    ['She plays the football.', 'She plays football.'], ['We have the lunch at one.', 'We have lunch at one.']];
  add('a1-02', 'no-article', 'The, e quando non si mette', 'The: quando non si mette',
    'Quando parli di qualcosa in generale l\'inglese non mette l\'articolo: I love music, Dogs are loyal, Life is short. Niente articolo anche con lingue, sport, pasti e in at home, at work. The si usa per una cosa specifica: the music in this film.',
    () => {
      const m = pick(['tr', 'tr', 'fix', 'choice']);
      if (m === 'fix') { const [w, r] = pick(GENERIC_FIX); return F.fix(w, [r], { why: 'Si parla in generale (o è un\'espressione fissa): niente the.' }); }
      const [n, nit, nalt] = pick(GENERAL);
      if (m === 'choice') {
        const spec = coin(0.35);
        return spec ? F.choice(`___ ${n} in this shop ${/s$/.test(n) && n !== 'jazz' ? 'are' : 'is'} very good.`, ['The', '— (nessun articolo)'], 'The', { why: `Qui si parla di una cosa specifica (${n} in this shop): serve the.` })
          : F.choice(`I really love ___ ${n}.`, ['the', '— (nessun articolo)'], '— (nessun articolo)', { why: `Si parla di ${n} in generale: in inglese niente articolo.` });
      }
      const [vb, itForms] = pick(LOVE.filter(l => l[1])), s = pick(SUBJ_TR), v = V(vb);
      const form = is3(s) ? v.third : v.b;
      const accs = [n, ...(nalt || [])].map(x => `${enSubj(s, 1)} ${form} ${x}.`);
      return F.tr(itSentence(s, itForms.split(' ')[s.p], nit), accs, { why: `Si parla di ${n} in generale: in italiano c'è l'articolo (${nit}), in inglese no.`,
        diag: x => new RegExp(`\\bthe ${n}\\b`, 'i').test(x) ? `In italiano si dice "${nit}", ma in inglese, quando si parla in generale, l'articolo non si mette: ${form} ${b(n)}, non ${form} the ${n}.` : null });
    });

  const PLURAL = [['child', 'children', 'irr'], ['person', 'people', 'irr'], ['man', 'men', 'irr'], ['woman', 'women', 'irr'], ['foot', 'feet', 'irr'], ['tooth', 'teeth', 'irr'], ['mouse', 'mice', 'irr'],
    ['city', 'cities', 'y'], ['baby', 'babies', 'y'], ['party', 'parties', 'y'], ['country', 'countries', 'y'], ['day', 'days', 'vy'], ['boy', 'boys', 'vy'], ['key', 'keys', 'vy'],
    ['box', 'boxes', 'es'], ['bus', 'buses', 'es'], ['watch', 'watches', 'es'], ['dish', 'dishes', 'es'], ['glass', 'glasses', 'es'], ['church', 'churches', 'es'], ['potato', 'potatoes', 'es'], ['tomato', 'tomatoes', 'es'],
    ['photo', 'photos', 's'], ['piano', 'pianos', 's'], ['knife', 'knives', 'f'], ['wife', 'wives', 'f'], ['leaf', 'leaves', 'f'], ['life', 'lives', 'f'], ['shelf', 'shelves', 'f'], ['half', 'halves', 'f'],
    ['sheep', 'sheep', 'same'], ['fish', 'fish', 'same'], ['book', 'books', 's'], ['car', 'cars', 's'], ['roof', 'roofs', 's'], ['chef', 'chefs', 's']];
  const PL_WHY = {
    irr: (s, p) => `${b(s)} ha un plurale irregolare: ${b(p)}. Va imparato a memoria.`,
    y: (s, p) => `Consonante + y: la y diventa -ies (${s} → ${b(p)}).`,
    vy: (s, p) => `Vocale + y: si aggiunge solo -s (${s} → ${b(p)}).`,
    es: (s, p) => `Dopo -s, -ss, -sh, -ch, -x e molti -o si aggiunge -es (${s} → ${b(p)}).`,
    s: (s, p) => `Plurale regolare: + s (${s} → ${b(p)}).`,
    f: (s, p) => `Molti nomi in -f / -fe fanno -ves (${s} → ${b(p)}).`,
    same: (s, p) => `${b(s)} al plurale non cambia: one ${s}, two ${p}.`,
  };
  add('a1-02', 'plurals', 'I plurali', 'I plurali',
    'Plurale: di solito + s. Dopo -s, -sh, -ch, -x e molti -o: + es. Consonante + y: -ies (city → cities). Molti -f / -fe: -ves (knife → knives). Irregolari da imparare: men, women, children, people, feet, teeth, mice. Uguali: sheep, fish.',
    () => {
      const [s, p, tag] = pick(PLURAL), n = pick(['two', 'three', 'four', 'five', 'six']);
      const why = PL_WHY[tag](s, p);
      const diag = x => { const w = lastWord(x); if (w === p) return null; if (w === s + 's' && tag !== 's') return `${b(w)} non esiste. ${why}`; if (w === s && tag !== 'same') return `Serve il plurale (${n} …): ${why}`; return null; };
      return coin(0.6) ? F.fill(`one ${s}, ${n} ___`, [p], null, { why, diag }) : F.fill(`There are ${n} ___ in the picture.`, [p], s, { why, diag });
    });

  const DEM_N = ['book', 'car', 'house', 'bag', 'phone', 'chair', 'jacket', 'picture'];
  const DEM_P = ['books', 'shoes', 'keys', 'glasses', 'chairs', 'flowers', 'photos', 'boxes'];
  add('a1-02', 'this-that', 'This, that, these, those', 'This, that, these, those',
    'This (questo) e these (questi) per le cose vicine; that (quello) e those (quelli) per le cose lontane. This e that col singolare, these e those col plurale.',
    () => {
      const plural = coin(), near = coin(), n = pick(plural ? DEM_P : DEM_N);
      const a = plural ? (near ? 'These' : 'Those') : (near ? 'This' : 'That');
      const where = near ? 'here' : 'over there', be = plural ? 'are' : 'is', pred = pick(['mine', 'new', 'very old', 'expensive', 'on sale']);
      const why = `${plural ? 'Plurale' : 'Singolare'} e ${near ? 'vicino (here)' : 'lontano (over there)'}: ${b(a)}.`;
      if (coin(0.3)) {
        const wrong = plural ? (near ? 'This' : 'That') : (near ? 'These' : 'Those');
        return F.fix(`${wrong} ${n} ${where} ${be} ${pred}.`, [`${a} ${n} ${where} ${be} ${pred}.`], { why });
      }
      return F.choice(`___ ${n} ${where} ${be} ${pred}.`, ['This', 'That', 'These', 'Those'], a, { why });
    });

  /* =================== A1-03: possesso =================== */
  const OWNERS = [['Marco', 'm'], ['Paul', 'm'], ['Luca', 'm'], ['my brother', 'm', 'mio fratello'], ['Giulia', 'f'], ['Emma', 'f'], ['Anna', 'f'], ['my sister', 'f', 'mia sorella'], ['the children', 'p', 'i bambini'], ['my parents', 'p', 'i miei genitori']];
  const THINGS3 = [['wife', 'sua moglie', 'la loro moglie'], ['husband', 'suo marito', null], ['brother', 'suo fratello', 'il loro fratello'], ['sister', 'sua sorella', 'la loro sorella'],
    ['mother', 'sua madre', 'la loro madre'], ['dog', 'il suo cane', 'il loro cane'], ['car', 'la sua macchina', 'la loro macchina'], ['house', 'la sua casa', 'la loro casa'], ['friends', 'i suoi amici', 'i loro amici']];
  add('a1-03', 'his-her', 'Aggettivi possessivi', 'His, her, their: conta chi possiede',
    'In italiano suo / sua si accorda con la cosa posseduta; in inglese conta chi possiede: his se è un uomo, her se è una donna, their se sono più persone. Marco and his wife, Giulia and her brother. Niente articolo: my car, non the my car.',
    () => {
      const [o, g, oit] = pick(OWNERS), poss = g === 'm' ? 'his' : g === 'f' ? 'her' : 'their';
      let th = pick(THINGS3); if (g === 'p') th = pick(THINGS3.filter(t => t[2] && !['wife', 'husband', 'brother', 'sister'].includes(t[0])));
      if (g !== 'p' && th[0] === 'wife' && g === 'f') th = THINGS3[1];
      if (g !== 'p' && th[0] === 'husband' && g === 'm') th = THINGS3[0];
      const verb = g === 'p' ? 'love' : 'loves', itVerb = g === 'p' ? 'amano' : 'ama';
      const why = `Il possessore è ${b(o)}${g === 'm' ? ', un uomo' : g === 'f' ? ', una donna' : ', più persone'}: quindi ${b(poss)}, qualunque sia la cosa (${th[0]}).`;
      const diag = x => { const w = words(x).find(y => ['his', 'her', 'their', 'its'].includes(y)); return w && w !== poss ? `${why} In italiano "${g === 'p' ? th[2] : th[1]}" si accorda con ${th[0]}, in inglese no.` : null; };
      if (coin(0.5)) return F.choice(`${cap(o)} ${verb} ___ ${th[0]}.`, ['his', 'her', 'their', 'its'], poss, { why, diag });
      return F.tr(`${cap(oit || o)} ${itVerb} ${g === 'p' ? th[2] : th[1]}.`, [`${cap(o)} ${verb} ${poss} ${th[0]}.`], { why, diag });
    });

  const PRONS = [['me', 'mine', 'mio', 'mia', 'miei', 'mie'], ['you', 'yours', 'tuo', 'tua', 'tuoi', 'tue'], ['him', 'his', 'di lui'], ['her', 'hers', 'di lei'], ['us', 'ours', 'nostro', 'nostra', 'nostri', 'nostre'], ['them', 'theirs', 'loro']];
  const PNOUN = [['book', 'Questo libro', 'm'], ['bag', 'Questa borsa', 'f'], ['phone', 'Questo telefono', 'm'], ['umbrella', 'Questo ombrello', 'm'], ['car', 'Questa macchina', 'f'], ['keys', 'Queste chiavi', 'fp'], ['shoes', 'Queste scarpe', 'fp'], ['books', 'Questi libri', 'mp']];
  add('a1-03', 'poss-pronouns', 'Pronomi possessivi', 'Mine, yours, his, hers…',
    'Quando il possessivo sostituisce la cosa si usano i pronomi: mine, yours, his, hers, ours, theirs. Senza articolo: This book is mine (non the mine).',
    () => {
      const [obj, pron, ...itf] = pick(PRONS), [n, nit, g] = pick(PNOUN), pl = /p$/.test(g), be = pl ? 'are' : 'is';
      const itPron = itf.length === 1 ? itf[0] : itf[{ m: 0, f: 1, mp: 2, fp: 3 }[g]];
      const why = `Il pronome possessivo è ${b(pron)} (quello di ${obj}), sempre senza articolo.`;
      const diag = x => /\bthe\b/i.test(x) ? `Il pronome possessivo non vuole l'articolo: ${b(pron)}, non the ${pron}.` : /\b(my|your|our|their)\b/i.test(lastWord(x)) ? `${b(lastWord(x))} va sempre davanti a un nome (my book); da solo serve il pronome: ${b(pron)}.` : null;
      if (coin(0.4)) return F.fill(`This ${n.replace(/s$/, '')} belongs to ${obj}. It's ___.`.replace('This keys', 'This key').replace('This shoe', 'This shoe'), [pron], null, { why, diag });
      const en = `${pl ? 'These' : 'This'} ${n} ${be} ${pron}.`;
      return F.tr(`${nit} ${pl ? 'sono' : 'è'} ${itPron}.`, [en], { why, diag });
    });

  const GOWN = [['father', 'di mio padre'], ['mother', 'di mia madre'], ['brother', 'di mio fratello'], ['sister', 'di mia sorella'], ['parents', 'dei miei genitori'], ['friends', 'dei miei amici'], ['children', 'dei miei figli', ['kids']], ['boss', 'del mio capo']];
  const GTHING = [['car', 'La macchina', 'is red', 'è rossa'], ['house', 'La casa', 'is big', 'è grande'], ['room', 'La camera', 'is small', 'è piccola'], ['dog', 'Il cane', 'is old', 'è vecchio'], ['phone', 'Il telefono', 'is new', 'è nuovo'], ['office', "L'ufficio", 'is in Milan', 'è a Milano']];
  const gen = o => /s$/.test(o) && o !== 'boss' ? `${o}'` : `${o}'s`;
  add('a1-03', 'genitive', "Il genitivo sassone: 's", "Il genitivo sassone ('s)",
    "Per dire di chi è una cosa, l'inglese mette il possessore prima, con 's: my father's car (la macchina di mio padre). Se il possessore è un plurale in -s basta l'apostrofo: my parents' house. Plurali irregolari: the children's toys.",
    () => {
      const [o, oit] = pick(GOWN), [th, thit, pred, predIt] = pick(GTHING), g = gen(o);
      const why = /'$/.test(g) ? `${b(o)} è un plurale in -s: basta l'apostrofo, ${b(g)} ${th}.` : `Possessore + 's, poi la cosa: ${b(`my ${g} ${th}`)}.`;
      const diag = x => /\bof\b/i.test(x) ? `In italiano si dice "${thit.toLowerCase()} ${oit}", ma in inglese con le persone si usa il genitivo sassone: my ${g} ${th}, non the ${th} of my ${o}.` : null;
      const m = pick(['fill', 'fix', 'tr']);
      if (m === 'fill') return F.fill(`It's my ___ ${th}.`, [g], `${thit.toLowerCase()} ${oit}`, { why, diag: x => lastWord(x) === o + 's' && /'$/.test(g) ? `${why}` : diag(x) });
      if (m === 'fix') return F.fix(`The ${th} of my ${o} ${pred}.`, [`My ${g} ${th} ${pred}.`], { why: "Con le persone si usa il genitivo sassone: my father's car, non the car of my father." });
      return F.tr(`${thit} ${oit} ${predIt}.`, [`My ${g} ${th} ${pred}.`], { why, diag });
    });

  const GOT = [['two sisters', 'due sorelle'], ['a dog', 'un cane'], ['a new car', 'una macchina nuova'], ['blue eyes', 'gli occhi azzurri'], ['a cold', 'il raffreddore'], ['three children', 'tre figli', ['three kids']], ['a big garden', 'un giardino grande'], ['a brother', 'un fratello']];
  add('a1-03', 'have-got', 'Have got', 'Have got',
    'Have got significa avere (possesso, famiglia, aspetto, malanni): I\'ve got, she\'s got (\'s = has), I haven\'t got, Have you got…? Al posto di have got si può usare have da solo con do: I have, Do you have…?',
    () => {
      const s = pick(SUBJ), [x, xit, xalt] = pick(GOT), h = is3(s) ? 'has' : 'have', m = pick(['fill', 'neg', 'q', 'tr', 'tr', 'fix']);
      const why = `Con ${s.pr} si usa ${b(h + ' got')}${is3(s) ? ' (he, she, it vogliono has)' : ''}.`;
      const diag = x2 => /\bhave\b/i.test(x2) && is3(s) ? `Il soggetto è ${subjDesc(s)}: terza persona, quindi ${b('has')} got, non have got.` : /\bhas\b/i.test(x2) && !is3(s) ? `Il soggetto è ${subjDesc(s)}: ${b('have')} got. Has è solo per he, she, it.` : null;
      if (m === 'fill') return F.fill(`${enSubj(s, 1)} ___ ${x}.`, is3(s) ? ['has got', "'s got"] : ['have got', "'ve got"], 'have got', { why, diag });
      if (m === 'neg') return F.fill(`${enSubj(s, 1)} ___ ${x}.`, is3(s) ? ["hasn't got", 'has not got'] : ["haven't got", 'have not got'], 'have got, negativa', { why: `Negativa: ${h}n't got.`, diag });
      if (m === 'q') return F.fill(`___ ${s.en} got ${x}?`, [cap(h)], null, { why: `Domanda con have got: ${cap(h)} + soggetto + got.`, diag: x2 => /^(do|does)$/i.test(x2.trim()) ? `Con have got la domanda si fa con ${b(cap(h))}: ${cap(h)} ${s.en} got …? (Do / Does va con have da solo: Do you have…?)` : diag(x2) });
      if (m === 'fix') return F.fix(`${enSubj(s, 1)} ${is3(s) ? 'have' : 'has'} got ${x}.`, [`${enSubj(s, 1)} ${h} got ${x}.`], { why });
      const ss = pick(SUBJ_TR), hh = is3(ss) ? 'has' : 'have', d = is3(ss) ? 'does' : 'do';
      const objs = [x, ...(xalt || [])];
      const acc = objs.flatMap(o => [`${enSubj(ss, 1)} ${hh} got ${o}.`, `${enSubj(ss, 1)} ${hh} ${o}.`]);
      return F.tr(itSentence(ss, IT.avere[ss.p], xit), acc, { why: `"Avere" qui è ${hh} got (oppure ${hh} da solo).`, diag: x2 => /\b(am|is|are)\b/i.test(x2) ? `Qui avere indica possesso: ${b(hh + ' got')} (o ${hh}), non be.` : null });
    });

  /* =================== A1-04: present simple affermativo =================== */
  const presWhy = (s, v) => is3(s) ? `${LEX.subjDesc(s)} è terza persona singolare: al present simple il verbo prende la -s, ${b(v.third)}.` : `${LEX.subjDesc(s)} non è he / she / it: niente -s, ${b(v.b)}.`;
  add('a1-04', 'third-s', ['Come si forma', 'Quando si usa'], 'Present simple: la -s di he, she, it',
    'Il present simple si usa per abitudini e fatti (every day, on Mondays). Si forma con il verbo base per tutte le persone, ma con he, she, it (e soggetti singolari come my brother, Anna) il verbo prende la -s: she works, they work.',
    () => {
      const s = pick(coin(0.6) ? SUBJ.filter(is3) : SUBJ.filter(x => !is3(x))), a = pick(ACT), t = pick(T_PRES), v = a.v;
      const form = is3(s) ? v.third : v.b, m = pick(['fill', 'fill', 'choice', 'fix', 'tr', 'tr', 'ord']);
      const why = presWhy(s, v), diag = x => dPresent(s, v, x, t[0]);
      if (m === 'fill') return F.fill(`${enSubj(s, 1)} ___ ${a.rest} ${t[0]}.`, [form], v.b, { why, diag });
      if (m === 'choice') return F.choice(`${enSubj(s, 1)} ___ ${a.rest} ${t[0]}.`, [v.b, v.third, v.ing], form, { why, diag });
      if (m === 'fix') return F.fix(`${enSubj(s, 1)} ${is3(s) ? v.b : v.third} ${a.rest} ${t[0]}.`, [`${enSubj(s, 1)} ${form} ${a.rest} ${t[0]}.`], { why });
      const aa = pick(ACT_TR), ss = pick(SUBJ_TR), f2 = is3(ss) ? aa.v.third : aa.v.b;
      const acc = enVariants(ss, f2, aa, t, { altVerb: vb => is3(ss) ? vb.third : vb.b });
      const tr = F.tr(itSentence(ss, itPres(aa, ss), aa.itRest, t[1]), acc, { why: presWhy(ss, aa.v), diag: x => dPresent(ss, aa.v, words(x).find(w => kindOf(w, aa.v)[0] !== 'other') || x, t[0]) });
      if (m === 'ord') return { ...tr, t: 'o', a: [acc[0], ...acc.slice(1)] , d: [is3(ss) ? aa.v.b : aa.v.third] };
      return tr;
    });

  const SPELL = ['watch', 'wash', 'fix', 'go', 'do', 'study', 'try', 'carry', 'teach', 'catch', 'have', 'kiss', 'finish', 'push', 'worry', 'fly', 'buy', 'play', 'stay', 'miss'];
  const SPELL_REST = { have: 'breakfast at seven', kiss: 'the children goodnight', finish: 'work at six', push: 'the door', worry: 'about everything', fly: 'to Paris', buy: 'fresh bread', play: 'the guitar', stay: 'at home', miss: 'the bus' };
  const spellWhy = v => v.b === 'have' ? `${b('have')} alla terza persona diventa ${b('has')}.`
    : /ies$/.test(v.third) ? `Consonante + y: la y diventa -ies (${v.b} → ${b(v.third)}).`
    : /es$/.test(v.third) ? `Dopo -s, -sh, -ch, -x, -o la terza persona prende -es (${v.b} → ${b(v.third)}).`
    : `Vocale + y: si aggiunge solo -s (${v.b} → ${b(v.third)}).`;
  const badThird = v => v.b === 'have' ? 'haves' : /ies$/.test(v.third) ? v.b + 's' : /es$/.test(v.third) ? v.b + 's' : v.b.replace(/y$/, 'ies');
  add('a1-04', 'spelling-s', 'Regole di scrittura della -s', 'Come si scrive la -s: -es, -ies, has',
    'Terza persona del present simple: dopo -s, -sh, -ch, -x, -o si aggiunge -es (watches, goes); consonante + y diventa -ies (studies), ma vocale + y vuole solo -s (plays). Have diventa has.',
    () => {
      const vb = pick(SPELL), v = V(vb), a = ACT.find(x => x.v.b === vb), rest = a ? a.rest : SPELL_REST[vb], s = pick(SUBJ.filter(is3)), t = pick(T_PRES);
      const why = spellWhy(v), diag = x => { const w = lastWord(x); return w === v.b ? presWhy(s, v) : spellingHint(w, v.third) || (w !== v.third ? why : null); };
      if (coin(0.35)) return F.fix(`${enSubj(s, 1)} ${badThird(v)} ${rest} ${t[0]}.`, [`${enSubj(s, 1)} ${v.third} ${rest} ${t[0]}.`], { why });
      return F.fill(`${enSubj(s, 1)} ___ ${rest} ${t[0]}.`, [v.third], vb, { why, diag });
    });

  add('a1-04', 'time-position', 'Le espressioni di tempo', 'Dove va l\'espressione di tempo',
    'Le espressioni di tempo (every day, on Mondays, twice a week) vanno in fondo alla frase o all\'inizio, mai tra il verbo e il complemento: I go to the gym every day, non I go every day to the gym.',
    () => {
      const s = pick(SUBJ_TR), a = pick(ACT_TR), t = pick(T_PRES), f = is3(s) ? a.v.third : a.v.b;
      const acc = enVariants(s, f, a, t, { altVerb: vb => is3(s) ? vb.third : vb.b });
      const why = `L'espressione di tempo (${t[0]}) va in fondo o all'inizio, non in mezzo tra ${f} e ${a.rest}.`;
      if (coin(0.45)) return F.fix(`${enSubj(s, 1)} ${f} ${t[0]} ${a.rest}.`, acc, { why });
      return { ...F.tr(itSentence(s, itPres(a, s), a.itRest, t[1]), acc, { why }), t: 'o' };
    });

  /* =================== A1-05: do / does =================== */
  const negWhy = s => is3(s) ? `Con ${s.pr} la negativa è ${b("doesn't")} + verbo base (la -s va su does, non sul verbo).` : `Con ${s.pr} la negativa è ${b("don't")} + verbo base.`;
  function dNeg(s, v, x) {
    const ws = words(x), d = is3(s) ? 'does' : 'do';
    if (ws.includes('not') && !ws.some(w => ['do', 'does', "don't", "doesn't", 'did'].includes(w)) && !/n't/.test(x)) return `In inglese non basta mettere not davanti al verbo (come "non" in italiano): serve l'ausiliare. ${negWhy(s)}`;
    if (/\bdon'?t\b|\bdo not\b/i.test(x) && is3(s)) return `Il soggetto è ${subjDesc(s)}: terza persona, quindi ${b("doesn't")}, non don't.`;
    if (/\bdoesn'?t\b|\bdoes not\b/i.test(x) && !is3(s)) return `Il soggetto è ${subjDesc(s)}: ${b("don't")}. Doesn't è solo per he, she, it.`;
    return dBaseAfter(`${d}n't`, v, x);
  }
  add('a1-05', 'neg-do', "La negativa: don't e doesn't", "Negativa: don't / doesn't + verbo base",
    'Per la negativa del present simple serve l\'ausiliare: don\'t (do not) con I, you, we, they; doesn\'t (does not) con he, she, it. Dopo don\'t / doesn\'t il verbo torna alla forma base: she doesn\'t work (mai doesn\'t works).',
    () => {
      const s = pick(SUBJ), a = pick(ACT), v = a.v, d = is3(s) ? 'does' : 'do', m = pick(['fill', 'choice', 'fix', 'tr', 'tr']);
      if (m === 'fill') return F.fill(`${enSubj(s, 1)} ___ ${a.rest}.`, [`${d}n't ${v.b}`, `${d} not ${v.b}`], `not / ${v.b}`, { why: negWhy(s), diag: x => dNeg(s, v, x) });
      if (m === 'choice') { const ss = pick(SUBJ.filter(is3)); return F.choice(`${enSubj(ss, 1)} doesn't ___ ${a.rest}.`, [v.b, v.third, v.ing], v.b, { why: "Dopo doesn't il verbo resta alla forma base: la -s c'è già in does.", diag: x => dBaseAfter("doesn't", v, x) }); }
      if (m === 'fix') {
        const ss = pick(SUBJ.filter(is3)), k = pick(['s', 'dont', 'not']);
        if (k === 's') return F.fix(`${enSubj(ss, 1)} doesn't ${v.third} ${a.rest}.`, [`${enSubj(ss, 1)} doesn't ${v.b} ${a.rest}.`], { why: "Dopo doesn't il verbo resta alla forma base." });
        if (k === 'dont') return F.fix(`${enSubj(ss, 1)} don't ${v.b} ${a.rest}.`, [`${enSubj(ss, 1)} doesn't ${v.b} ${a.rest}.`], { why: "Con he, she, it la negativa è doesn't." });
        return F.fix(`${enSubj(s, 1)} not ${v.b} ${a.rest}.`, [`${enSubj(s, 1)} ${d}n't ${v.b} ${a.rest}.`], { why: 'Serve l\'ausiliare: ' + negWhy(s) });
      }
      const aa = pick(ACT_TR), ss = pick(SUBJ_TR), dd = is3(ss) ? 'does' : 'do';
      const acc = enVariants(ss, `${dd}n't ${aa.v.b}`, aa, null, { altVerb: vb => `${dd}n't ${vb.b}` });
      return F.tr(itSentence(ss, itPres(aa, ss), aa.itRest, '', { neg: true }), acc, { why: negWhy(ss), diag: x => dNeg(ss, aa.v, x.split(/\s+/).slice(0, 4).join(' ')) });
    });

  const WH = [['work', 'Dove', 'Where', 'lavora lavori lavora lavoriamo lavorate lavorano'], ['live', 'Dove', 'Where', 'abito abiti abita abitiamo abitate abitano'],
    ['study', 'Cosa', 'What', 'studio studi studia studiamo studiate studiano'], ['eat', 'Cosa', 'What', 'mangio mangi mangia mangiamo mangiate mangiano'],
    ['drink', 'Cosa', 'What', 'bevo bevi beve beviamo bevete bevono'], ['get up', 'A che ora', 'What time', 'mi alzo ti alzi si alza ci alziamo vi alzate si alzano']];
  function dQuestion(s, v, x) {
    // il primo do / does della frase è l'ausiliare; un "do" che viene dopo è il verbo (do the shopping)
    const ws = words(x), d = is3(s) ? 'does' : 'do', i = ws.findIndex(w => w === 'do' || w === 'does');
    if (i < 0) return `Nelle domande con i verbi normali serve l'ausiliare ${b(cap(d))} prima del soggetto: in italiano basta l'intonazione, in inglese no.`;
    if (ws[i] === 'do' && is3(s)) return `Il soggetto è ${subjDesc(s)}: la domanda vuole ${b('Does')}, non Do.`;
    if (ws[i] === 'does' && !is3(s)) return `Il soggetto è ${subjDesc(s)}: la domanda vuole ${b('Do')}. Does è solo per he, she, it.`;
    if (v && v.third !== v.b && ws.slice(i + 1).includes(v.third)) return `Dopo ${b('does')} il verbo resta alla forma base: ${b(v.b)}, non ${v.third}.`;
    return null;
  }
  add('a1-05', 'question-do', 'Le domande: do e does', 'Domande: Do / Does + soggetto + verbo base',
    'Le domande al present simple: (parola interrogativa) + Do / Does + soggetto + verbo base. Does con he, she, it; Do con gli altri. Where does she work? Do you speak French? Risposte brevi: Yes, I do / No, she doesn\'t.',
    () => {
      const s = pick(SUBJ), a = pick(ACT), v = a.v, d = is3(s) ? 'does' : 'do', m = pick(['fill', 'choice', 'fix', 'tr', 'tr', 'trwh']);
      if (m === 'fill') return F.fill(`___ ${s.en} ${v.b} ${a.rest}?`, [cap(d)], null, { why: is3(s) ? 'Con he, she, it la domanda usa Does.' : 'Con I, you, we, they la domanda usa Do.', diag: x => /^(is|are|am)$/i.test(x.trim()) ? `${b(v.b)} è un verbo normale, non be: la domanda si fa con ${b(cap(d))}.` : dQuestion(s, v, x) });
      if (m === 'choice') return F.choice(`___ ${s.en} ${v.b} ${a.rest}?`, ['Do', 'Does', cap(BE[s.p])], cap(d), { why: `${v.b} è un verbo normale: ${cap(d)} + soggetto + verbo base.`, diag: x => dQuestion(s, v, `${x} ${s.en} ${v.b}`) });
      if (m === 'fix') {
        const ss = pick(SUBJ.filter(is3));
        return coin() ? F.fix(`Does ${ss.en} ${v.third} ${a.rest}?`, [`Does ${ss.en} ${v.b} ${a.rest}?`], { why: 'Dopo does il verbo resta alla forma base.' })
          : F.fix(`${cap(ss.en)} ${v.third} ${a.rest}?`, [`Does ${ss.en} ${v.b} ${a.rest}?`], { why: 'In inglese la domanda non si fa solo con il tono: serve Does + soggetto + verbo base.' });
      }
      if (m === 'trwh') {
        const [vb, itWh, enWh, itForms] = pick(WH), ss = pick(SUBJ_TR.filter(x => x.p !== 0)), dd = is3(ss) ? 'does' : 'do';
        const itV = itForms.split(' ')[ss.p], it = ss.it ? `${itWh} ${itV} ${ss.it}?` : `${itWh} ${itV}?`;
        return F.tr(cap(it), [`${enWh} ${dd} ${ss.en} ${vb}?`], { why: `Domanda: ${enWh} + ${dd} + soggetto + verbo base.`, diag: x => dQuestion(ss, V(vb.split(' ')[0]), x) });
      }
      const aa = pick(ACT_TR), ss = pick(SUBJ_TR), dd = is3(ss) ? 'does' : 'do';
      const acc = uniq([aa.rest, ...aa.alt].map(r => `${cap(dd)} ${ss.en} ${aa.v.b} ${r}?`).concat(aa.trAlt.map(([vb, r]) => `${cap(dd)} ${ss.en} ${vb} ${r}?`)));
      return F.tr(itSentence(ss, itPres(aa, ss), aa.itRest, '', { q: true }), acc, { why: `Domanda: ${cap(dd)} + soggetto + verbo base.`, diag: x => dQuestion(ss, aa.v, x) });
    });

  const ADV = [['always', 'sempre'], ['usually', 'di solito'], ['often', 'spesso'], ['sometimes', 'a volte'], ['never', 'mai']];
  const BEADJ = [['tired', { m: 'stanco', f: 'stanca', mp: 'stanchi' }], ['late', 'in ritardo'], ['happy', { m: 'felice', f: 'felice', mp: 'felici' }], ['busy', { m: 'impegnato', f: 'impegnata', mp: 'impegnati' }]];
  add('a1-05', 'freq-adverbs', 'Avverbi di frequenza', 'Always, usually, never…: dove vanno',
    'Gli avverbi di frequenza (always, usually, often, sometimes, never) vanno prima del verbo principale ma dopo be: She often drinks coffee; She is always late. Never è già negativo: I never eat meat (non I don\'t never).',
    () => {
      const [en, it] = pick(ADV), s = pick(SUBJ_TR);
      if (coin(0.3)) {
        const [adj, itAdj] = pick(BEADJ), be = BE[s.p], ia = typeof itAdj === 'string' ? itAdj : itAdj[s.g];
        const right = `${enSubj(s, 1)} ${be} ${en} ${adj}.`;
        const itS = en === 'never' ? itSentence(s, `${IT.essere[s.p]} mai`, ia, '', { neg: true }) : en === 'usually' ? cap(`di solito ${s.it ? s.it + ' ' : ''}${IT.essere[s.p]} ${ia}.`) : itSentence(s, `${IT.essere[s.p]} ${it}`, ia);
        const why = `Con be l'avverbio va dopo il verbo: ${s.en} ${be} ${b(en)} ${adj}.`;
        return coin() ? F.fix(`${enSubj(s, 1)} ${en} ${be} ${adj}.`, [right], { why }) : F.tr(itS, [right], { why });
      }
      const a = pick(ACT_TR), f = is3(s) ? a.v.third : a.v.b;
      const right = [a.rest, ...a.alt].map(r => `${enSubj(s, 1)} ${en} ${f} ${r}.`);
      if (en === 'sometimes') right.push(...[a.rest, ...a.alt].map(r => `Sometimes ${s.en} ${f} ${r}.`), ...[a.rest, ...a.alt].map(r => `${enSubj(s, 1)} ${f} ${r} sometimes.`));
      if (en === 'usually') right.push(...[a.rest, ...a.alt].map(r => `Usually ${s.en} ${f} ${r}.`));
      const itV = itPres(a, s);
      const itS = en === 'never' ? itSentence(s, `${itV} mai`, a.itRest, '', { neg: true })
        : en === 'usually' || en === 'sometimes' ? cap(`${it} ${s.it ? s.it + ' ' : ''}${itV} ${a.itRest}.`)
        : itSentence(s, `${itV} ${it}`, a.itRest);
      const why = `L'avverbio di frequenza va prima del verbo principale: ${s.en} ${b(en)} ${f}.${en === 'never' ? " E never è già negativo: niente don't." : ''}`;
      const diag = x => en === 'never' && /n't|\bnot\b/i.test(x) ? `${b('never')} è già negativo: in inglese una sola negazione, quindi ${s.en} never ${f} …, senza don't.` : null;
      const m = pick(['tr', 'ord', 'fix']);
      if (m === 'fix') return F.fix(`${enSubj(s, 1)} ${f} ${en} ${a.rest}.`, right, { why });
      return { ...F.tr(itS, right, { why, diag }), ...(m === 'ord' ? { t: 'o' } : {}) };
    });

  add('a1-05', 'be-no-do', 'Due eccezioni importanti', 'Be non usa do; domande sul soggetto',
    'Due eccezioni: il verbo be non usa mai do (Are you tired?, non Do you are tired?). E quando la domanda è sul soggetto (Who…?) non serve do: Who lives here? (chi abita qui?).',
    () => {
      const m = pick(['be', 'be', 'who']);
      if (m === 'who') {
        const a = pick(ACT), v = a.v;
        return F.choice(`Who ___ ${a.rest}?`, [v.third, `does ${v.b}`, `do ${v.b}`], v.third, { why: `La domanda è sul soggetto (chi?): niente do, il verbo prende la -s come con he: Who ${v.third} ${a.rest}?` });
      }
      const s = pick(SUBJ), c = pick(BE_C), be = BE[s.p];
      if (coin()) return F.fix(`${cap(is3(s) ? 'does' : 'do')} ${s.en} ${be} ${c[0]}?`, [`${cap(be)} ${s.en} ${c[0]}?`], { why: 'Be non usa do / does: nella domanda si mette prima del soggetto.' });
      return F.choice(`___ ${s.en} ${c[0]}?`, ['Do', 'Does', cap(be)], cap(be), { why: `${c[0]} si unisce a be, non a un verbo normale: la domanda è ${cap(be)} ${s.en} ${c[0]}?`, diag: x => /^do/i.test(x) ? `Be non usa do / does: la domanda si fa mettendo ${b(cap(be))} prima del soggetto.` : null });
    });

  /* =================== A1-06: there is / are, some / any, preposizioni =================== */
  const THERE = [
    ['a cat', 'un gatto', 1, ['in the garden', 'in giardino'], ['in the kitchen', 'in cucina']],
    ['two chairs', 'due sedie', 0, ['in the kitchen', 'in cucina'], ['in the garden', 'in giardino']],
    ['a bank', 'una banca', 1, ['near here', 'qui vicino'], ['in this street', 'in questa strada']],
    ['two supermarkets', 'due supermercati', 0, ['near here', 'qui vicino'], ['in my town', 'nella mia città']],
    ['a park', 'un parco', 1, ['in my town', 'nella mia città'], ['near here', 'qui vicino']],
    ['three bedrooms', 'tre camere da letto', 0, ['in the house', 'in casa']],
    ['a lot of people', 'tanta gente', 0, ['in the square', 'in piazza'], ['in the park', 'nel parco']],
    ['an old church', "una vecchia chiesa", 1, ['in my town', 'nella mia città']],
    ['some milk', 'del latte', 1, ['in the fridge', 'nel frigo']],
    ['some apples', 'delle mele', 0, ['in the fridge', 'nel frigo'], ['on the table', 'sul tavolo']],
    ['a problem', 'un problema', 1, ['with the car', 'con la macchina']],
    ['five students', 'cinque studenti', 0, ['in the classroom', 'in classe']],
  ];
  add('a1-06', 'there-is-are', ['There is / there are', 'There is o it is?'], 'There is / there are',
    '"C\'è" è there is (singolare e non numerabili: there\'s a bank, there\'s some milk); "ci sono" è there are (plurale: there are two chairs). Domande: Is there…? Are there…? Il verbo avere non c\'entra: There\'s a park in my town (non My town has / In my town has).',
    () => {
      const [n, nit, sing, ...places] = pick(THERE), [pl, plit] = pick(places), be = sing ? 'is' : 'are';
      const why = `${n} è ${sing ? 'singolare (o non numerabile)' : 'plurale'}: there ${b(be)}.`;
      const m = pick(['choice', 'fill', 'tr', 'tr', 'trq', 'fix']);
      const acc = sing ? [`There's ${n} ${pl}.`, `There is ${n} ${pl}.`, `${cap(pl)} there's ${n}.`, `${cap(pl)} there is ${n}.`] : [`There are ${n} ${pl}.`, `${cap(pl)} there are ${n}.`];
      const diag = x => /\b(has|have)\b/i.test(x) ? `"C'è / ci sono" in inglese è there is / there are: il verbo avere qui non c'entra.` : /\bit is\b|\bit's\b/i.test(x) ? `${b('It is')} parla di una cosa già nota; per dire che qualcosa esiste ("c'è") si usa ${b('there is')}.` : /\bthere is\b|there's/i.test(x) && !sing ? `${n} è plurale: there ${b('are')}.` : /\bthere are\b/i.test(x) && sing ? `${n} è singolare: there ${b('is')}.` : null;
      if (m === 'choice') return F.choice(`There ___ ${n} ${pl}.`, ['is', 'are'], be, { why });
      if (m === 'fill') return F.fill(`There ___ ${n} ${pl}.`, sing ? ['is'] : ['are'], 'be', { why });
      if (m === 'fix') return sing ? F.fix(`It has ${n} ${pl}.`, acc, { why: '"C\'è" si dice there is, non con have.' }) : F.fix(`There is ${n} ${pl}.`, acc, { why });
      if (m === 'trq') return F.tr(cap(`${sing ? "c'è" : 'ci sono'} ${nit} ${plit}?`), [`${sing ? 'Is' : 'Are'} there ${n.replace(/^some /, 'any ')} ${pl}?`, `${sing ? 'Is' : 'Are'} there ${n} ${pl}?`], { why: `Domanda: ${sing ? 'Is' : 'Are'} there…?`, diag });
      return F.tr(cap(`${plit} ${sing ? "c'è" : 'ci sono'} ${nit}.`), acc, { why, diag });
    });

  const SOME_N = [['eggs', 'uova', 0], ['apples', 'mele', 0], ['biscuits', 'biscotti', 0], ['chairs', 'sedie', 0], ['questions', 'domande', 0], ['milk', 'latte', 1], ['sugar', 'zucchero', 1], ['bread', 'pane', 1], ['water', 'acqua', 1], ['cheese', 'formaggio', 1]];
  const itPart = (it, m, f) => m ? (/^[aeiou]/.test(it) ? `dell'${it}` : `del ${it}`) : f ? `delle ${it}` : `degli ${it}`;
  add('a1-06', 'some-any', 'Some e any', 'Some e any',
    'Some (dei, un po\' di) nelle frasi affermative e nelle offerte; any nelle frasi negative e nelle domande. There are some eggs / There aren\'t any eggs / Are there any eggs? No = not any: There are no eggs.',
    () => {
      const [n, nit, unc] = pick(SOME_N), be = unc ? 'is' : 'are', fem = ['uova', 'mele', 'sedie', 'domande'].includes(nit);
      const m = pick(['aff', 'neg', 'q', 'trneg', 'trq', 'fix']);
      const whyA = 'Frase affermativa: some.', whyN = 'Frase negativa: any (oppure no con il verbo affermativo).', whyQ = 'Domanda: any.';
      const diag = x => /\bsome\b/i.test(x) && /n't|\bnot\b|\?/.test(x) ? `Nelle negative e nelle domande non si usa some ma ${b('any')}.` : null;
      if (m === 'aff') return F.choice(`There ${be} ___ ${n} in the kitchen.`, ['some', 'any'], 'some', { why: whyA });
      if (m === 'neg') return F.choice(`There ${be}n't ___ ${n} in the kitchen.`, ['some', 'any'], 'any', { why: whyN });
      if (m === 'q') return F.choice(`${cap(be)} there ___ ${n} in the kitchen?`, ['some', 'any'], 'any', { why: whyQ });
      if (m === 'fix') return F.fix(`There ${be}n't some ${n}.`, [`There ${be}n't any ${n}.`, `There ${be} no ${n}.`], { why: whyN });
      const art = unc ? itPart(nit, true) : nit;
      if (m === 'trq') return F.tr(cap(`${unc ? "c'è" : 'ci sono'} ${unc ? art : (fem ? 'delle ' : 'dei ') + nit}?`).replace('dei uova', 'delle uova'), [`${cap(be)} there any ${n}?`], { why: whyQ, diag });
      return F.tr(cap(`non ${unc ? "c'è" : 'ci sono'} ${unc ? nit : nit}.`), [`There ${be}n't any ${n}.`, `There ${be} no ${n}.`], { why: whyN, diag });
    });

  const PREP = [['The keys are ___ the table.', 'on', 'Le chiavi sono sul tavolo.', 'On = sopra, a contatto con una superficie.'], ['The cat is ___ the bed.', 'under', 'Il gatto è sotto il letto.', 'Under = sotto.'],
    ['She is ___ work now.', 'at', 'Adesso è al lavoro.', 'At work, at home, at school: espressioni fisse con at.'], ['I live ___ Rome.', 'in', 'Abito a Roma.', 'Con le città e i paesi: in.'],
    ['We are ___ home.', 'at', 'Siamo a casa.', 'At home: espressione fissa, senza the.'], ['The milk is ___ the fridge.', 'in', 'Il latte è nel frigo.', 'In = dentro.'],
    ['The bank is ___ the post office and the bar.', 'between', 'La banca è tra la posta e il bar.', 'Between = tra due cose.'], ['The pharmacy is ___ the bank.', 'next to', 'La farmacia è accanto alla banca.', 'Next to = accanto a (sempre con to).'],
    ['The bus stop is ___ the school.', 'in front of', 'La fermata è davanti alla scuola.', 'In front of = davanti a.'], ['Meet me ___ the station.', 'at', 'Ci vediamo alla stazione.', 'At + un punto preciso: at the station.'],
    ['My flat is ___ the second floor.', 'on', 'Il mio appartamento è al secondo piano.', 'I piani: on the second floor.'], ['The picture is ___ the wall.', 'on', 'Il quadro è sulla parete.', 'On = su una superficie, anche verticale.'],
    ['They live ___ Italy.', 'in', 'Vivono in Italia.', 'Con i paesi: in.'], ['The car is ___ the house.', 'behind', 'La macchina è dietro la casa.', 'Behind = dietro.']];
  add('a1-06', 'prepositions', 'Preposizioni di luogo', 'Preposizioni di luogo: in, on, at…',
    'In = dentro e con città e paesi (in the box, in Rome). On = sopra, su una superficie e i piani (on the table, on the second floor). At = un punto preciso ed espressioni fisse (at the station, at home, at work). Next to vuole sempre to.',
    () => {
      const [q, a, it, why] = pick(PREP);
      if (coin(0.4)) return F.tr(it, [q.replace('___', a)].concat(a === 'next to' ? [] : []), { why });
      const opts = uniq([a, ...LEX.shuffle(['in', 'on', 'at', 'under', 'next to', 'between', 'behind', 'in front of']).filter(x => x !== a).slice(0, 2)]);
      return F.choice(q, opts, a, { why });
    });
})();
