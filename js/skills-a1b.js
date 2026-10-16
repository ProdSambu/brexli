// Regole e generatori della linea A1, fermate 7-12.
(() => {
  const { pick, shuffle, cap, uniq, V, SUBJ, SUBJ_TR, is3, enSubj, subjDesc, BE, WAS, beShort, IT, agree, ACT, ACT_TR, T_PRES, T_NOW, T_PAST, itSentence, itPres, itPast, itCont, itFut, enVariants, kindOf, has, glS, glA, glT, gloss } = LEX;
  const { add, F, b, words, lastWord, dPresent, dBaseAfter, spellingHint } = SKILLS;
  const coin = (p = 0.5) => Math.random() < p;
  // domande "Aux + soggetto + verbo + complemento?" con tutte le varianti accettate
  const qVariants = (aux, s, verbOf, a, time) => {
    const rests = [a.rest, ...a.alt], out = [];
    const t = time ? [time[0], ...(time[2] || [])] : [''];
    for (const r of rests) for (const tt of t) out.push(`${cap(aux)} ${s.en} ${verbOf(a.v)} ${r}${tt ? ' ' + tt : ''}?`);
    for (const [vb, r] of a.trAlt) for (const tt of t) out.push(`${cap(aux)} ${s.en} ${verbOf(V(vb))} ${r}${tt ? ' ' + tt : ''}?`);
    return uniq(out);
  };

  /* =================== A1-07: present continuous =================== */
  const contForms = (s, v) => { const be = BE[s.p]; return [`${be} ${v.ing}`, `${beShort[be]} ${v.ing}`]; };
  // azioni che hanno senso "in corso adesso" o come progetto futuro (non: speak three languages now)
  const NOWABLE = ACT.filter(a => !['speak', 'live', 'teach', 'study'].includes(a.v.b));
  const NOWABLE_TR = NOWABLE.filter(a => a.itRest);
  function dCont(s, v, x) {
    const ws = words(x), be = BE[s.p], w = ws[ws.length - 1] || '';
    const k = kindOf(w, v);
    if (!/\b(am|is|are)(n't)?\b|'(m|s|re)\b/i.test(x) && has(k, 'ing')) return `Manca be: il present continuous è am / is / are + -ing. Qui: ${s.en} ${b(be)} ${v.ing}.`;
    if (has(k, 'base') || has(k, 'third')) return `Si parla di un'azione in corso adesso: serve il present continuous, ${b(be + ' ' + v.ing)}, non ${w}.`;
    const beUsed = ws.find(y => ['am', 'is', 'are'].includes(y));
    if (beUsed && beUsed !== be) return `Il soggetto è ${subjDesc(s)}: con ${s.pr} si usa ${b(be)} (I am, he / she / it is, we / you / they are).`;
    if (w && w !== v.ing && /ing$/.test(w)) return spellingHint(w, v.ing);
    return null;
  }
  add('a1-07', 'cont-form', ['Come si forma', 'Quando si usa'], 'Present continuous: am / is / are + -ing',
    "Per quello che succede adesso: am / is / are + verbo in -ing, come il nostro \"sto + -ando\": I'm reading, she's working, they aren't listening. Domanda: Are you working?",
    () => {
      const s = pick(SUBJ), a = pick(NOWABLE), v = a.v, t = pick(T_NOW), be = BE[s.p], m = pick(['fill', 'neg', 'fix', 'tr', 'tr', 'ord']);
      const why = `Azione in corso (${t[0]}): ${s.en} ${b(be + ' ' + v.ing)}.`;
      if (m === 'fill') return F.fill(`${enSubj(s, 1)} ___ ${a.rest} ${t[0]}.`, contForms(s, v), v.b, { why, diag: x => dCont(s, v, x) });
      if (m === 'neg') return F.fill(`${enSubj(s, 1)} ___ ${a.rest} ${t[0]}.`, be === 'am' ? [`'m not ${v.ing}`, `am not ${v.ing}`] : [`${be}n't ${v.ing}`, `${be} not ${v.ing}`, `${beShort[be]} not ${v.ing}`], `not / ${v.b}`, { why, diag: x => dCont(s, v, x) });
      if (m === 'fix') return coin() ? F.fix(`${enSubj(s, 1)} ${v.ing} ${a.rest} ${t[0]}.`, [`${enSubj(s, 1)} ${be} ${v.ing} ${a.rest} ${t[0]}.`], { why: `Manca be: am / is / are + -ing.` })
        : F.fix(`${enSubj(s, 1)} ${be} ${is3(s) ? v.third : v.b} ${a.rest} ${t[0]}.`, [`${enSubj(s, 1)} ${be} ${v.ing} ${a.rest} ${t[0]}.`], { why: 'Dopo be serve la forma in -ing.' });
      const ss = pick(SUBJ_TR), aa = pick(NOWABLE_TR), bb = BE[ss.p];
      const acc = enVariants(ss, `${bb} ${aa.v.ing}`, aa, t, { altVerb: vb => `${bb} ${vb.ing}` });
      const ex = F.tr(itSentence(ss, itCont(aa, ss), aa.itRest, t[1]), acc, { gl: gloss(glS(ss), glA(aa), glT(t)), why: `"Sto / stai / sta + gerundio" è il present continuous: ${bb} + ${aa.v.ing}.`, diag: x => dCont(ss, aa.v, words(x).slice(0, 4).join(' ')) });
      return m === 'ord' ? { ...ex, t: 'o', d: [is3(ss) ? aa.v.third : aa.v.b] } : ex;
    });

  const ING = [['write', 'emails'], ['make', 'a cake'], ['take', 'photos'], ['have', 'breakfast'], ['come', 'home'], ['dance', 'in the kitchen'], ['swim', 'in the pool'], ['run', 'in the park'],
    ['sit', 'in the garden'], ['stop', 'the car'], ['plan', 'a trip'], ['begin', 'a new job'], ['lie', 'on the beach'], ['get', 'ready'], ['put', 'the shopping away'], ['shop', 'in town'], ['drive', 'to work'], ['ride', 'a bike']];
  const ingWhy = v => /ying$/.test(v.ing) && /ie$/.test(v.b) ? `I verbi in -ie cambiano in -ying: ${v.b} → ${b(v.ing)}.`
    : /([bcdfgklmnprstvz])\1ing$/.test(v.ing) ? `Consonante-vocale-consonante con l'accento in fondo: si raddoppia l'ultima consonante, ${v.b} → ${b(v.ing)}.`
    : /e$/.test(v.b) && !/ee$/.test(v.b) ? `La e muta finale cade davanti a -ing: ${v.b} → ${b(v.ing)}.` : `Si aggiunge -ing: ${v.b} → ${b(v.ing)}.`;
  const badIng = v => /ie$/.test(v.b) ? v.b + 'ing' : /([bcdfgklmnprstvz])\1ing$/.test(v.ing) ? v.b + 'ing' : /e$/.test(v.b) ? v.b + 'ing' : v.b + v.b.slice(-1) + 'ing';
  add('a1-07', 'ing-spelling', "Regole di scrittura dell'-ing", "Come si scrive l'-ing",
    "Di solito + ing. La e finale che non si pronuncia cade (write → writing); -ie diventa -ying (lie → lying); se la parola finisce con consonante-vocale-consonante, l'ultima consonante raddoppia (swim → swimming, stop → stopping).",
    () => {
      const [vb, rest] = pick(ING), v = V(vb), s = pick(SUBJ), be = BE[s.p];
      const why = ingWhy(v), diag = x => { const w = lastWord(x); return w !== v.ing ? (spellingHint(w, v.ing) || (/ing$/.test(w) ? why : null)) : null; };
      if (coin(0.4)) return F.fix(`${enSubj(s, 1)} ${be} ${badIng(v)} ${rest} now.`, [`${enSubj(s, 1)} ${be} ${v.ing} ${rest} now.`], { why });
      return F.fill(`${enSubj(s, 1)} ${be} ___ ${rest} now.`, [v.ing], vb, { why, diag });
    });

  const STATE = [['know', 'the answer'], ['like', 'this song'], ['want', 'a coffee'], ['need', 'help'], ['understand', 'the question'], ['love', 'this film'], ['believe', 'you'], ['remember', 'her name']];
  add('a1-07', 'simple-vs-cont', 'Simple o continuous?', 'Present simple o continuous?',
    "Di solito → present simple (every day, usually). Adesso o in questo periodo → present continuous (now, at the moment, this week). I verbi che non si vedono fare (know, like, want, need, understand, love) restano al simple: I know, non I'm knowing.",
    () => {
      const s = pick(SUBJ);
      if (coin(0.35)) {
        const [vb, rest] = pick(STATE), v = V(vb), simple = is3(s) ? v.third : v.b, cont = `${BE[s.p]} ${v.ing}`;
        const why = `${b(vb)} è un verbo di stato (gusti, pensieri, bisogni): resta al present simple anche se si parla di adesso.`;
        return coin() ? F.choice(`${enSubj(s, 1)} ___ ${rest} now.`, [simple, cont], simple, { why }) : F.fix(`${enSubj(s, 1)} ${cont} ${rest} now.`, [`${enSubj(s, 1)} ${simple} ${rest} now.`], { why });
      }
      const a = pick(NOWABLE), v = a.v, now = coin(), t = now ? pick(T_NOW) : pick(T_PRES);
      const simple = is3(s) ? v.third : v.b, cont = `${BE[s.p]} ${v.ing}`;
      const why = now ? `«${t[0]}»: azione in corso adesso, present continuous (${cont}).` : `«${t[0]}»: abitudine, present simple (${simple}).`;
      return F.choice(`${enSubj(s, 1)} ___ ${a.rest} ${t[0]}.`, [simple, cont], now ? cont : simple, { why });
    });

  /* =================== A1-08: can e imperativo =================== */
  const CAN_SAPERE = ['play', 'speak', 'swim', 'cook', 'sing', 'dance', 'fix', 'make'];
  function dCan(s, v, x) {
    const ws = words(x);
    if (ws.includes('cans')) return `${b('can')} è uguale per tutte le persone: niente -s, nemmeno con he, she, it.`;
    if (/\bcan to\b/i.test(x)) return `Dopo ${b('can')} il verbo va senza to: can ${v.b}.`;
    // do / don't prima di can (Do you can…? I don't can…) è l'errore; "can do the shopping" no
    const iCan = ws.findIndex(w => w === 'can' || w === "can't" || w === 'cannot');
    const iDo = ws.findIndex(w => ['do', 'does', "don't", "doesn't"].includes(w));
    if (iDo >= 0 && (iCan < 0 || iDo < iCan)) return `${b('can')} non usa do: fa le domande (Can you…?) e le negazioni (can't) da solo.`;
    const after = ws[ws.indexOf('can') + 1] || ws[ws.indexOf("can't") + 1];
    if (after && after === v.third) return `Dopo can il verbo resta alla forma base: ${b(v.b)}, non ${v.third}.`;
    return null;
  }
  add('a1-08', 'can-form', ['Come funziona can', 'I significati di can'], 'Can: uguale per tutti, senza to, senza do',
    "Can (so, posso, riesco) è uguale per tutti: she can, non she cans. Dopo c'è il verbo senza to (can swim) e non usa mai do: Can you swim? / I can't swim. Con see e hear: I can't see anything (non vedo niente).",
    () => {
      const s = pick(SUBJ), a = pick(ACT), v = a.v, m = pick(['fill', 'neg', 'q', 'fix', 'tr', 'tr']);
      const why = `${b('can')} + verbo base, uguale per tutte le persone: ${s.en} can ${v.b}.`;
      if (m === 'fill') return F.fill(`${enSubj(s, 1)} ___ ${v.b} ${a.rest}.`, ['can'], 'can', { why, diag: x => dCan(s, v, x) });
      if (m === 'neg') return F.fill(`${enSubj(s, 1)} ___ ${v.b} ${a.rest}.`, ["can't", 'cannot'], 'can, negativa', { why: `Negativa: can't (cannot) + verbo base, senza don't.`, diag: x => dCan(s, v, x) });
      if (m === 'q') return F.fill(`___ ${s.en} ${v.b} ${a.rest}?`, ['Can'], null, { why: 'Can fa la domanda da solo: Can + soggetto + verbo base.', diag: x => /^(do|does)$/i.test(x.trim()) ? `${b('can')} non usa do: Can ${s.en} ${v.b} …?` : null });
      if (m === 'fix') {
        const ss = pick(SUBJ.filter(is3)), k = pick(['s', 'to', 'do']);
        if (k === 's') return F.fix(`${enSubj(ss, 1)} cans ${v.b} ${a.rest}.`, [`${enSubj(ss, 1)} can ${v.b} ${a.rest}.`], { why: 'I modali non prendono la -s.' });
        if (k === 'to') return F.fix(`${enSubj(ss, 1)} can to ${v.b} ${a.rest}.`, [`${enSubj(ss, 1)} can ${v.b} ${a.rest}.`], { why: 'Dopo can niente to.' });
        return F.fix(`Does ${ss.en} can ${v.b} ${a.rest}?`, [`Can ${ss.en} ${v.b} ${a.rest}?`], { why: 'Can non usa do: Can + soggetto + verbo base.' });
      }
      const ss = pick(SUBJ_TR), aa = pick(ACT_TR), neg = coin(0.35), q = !neg && coin(0.4);
      // "so suonare la chitarra" (capacità) ma "posso visitare il museo" (possibilità): in inglese sempre can
      const itV = `${(CAN_SAPERE.includes(aa.v.b) ? IT.sapere : IT.potere)[ss.p]} ${aa.itInf}`;
      const acc = q ? qVariants('can', ss, vb => vb.b, aa) : enVariants(ss, `${neg ? "can't" : 'can'} ${aa.v.b}`, aa, null, { altVerb: vb => `${neg ? "can't" : 'can'} ${vb.b}` });
      return F.tr(itSentence(ss, itV, aa.itRest, '', { neg, q }), acc, { gl: gloss(glS(ss), glA(aa)), why: `"Sapere / potere + infinito" si dice can + verbo base, senza to e senza do.`, diag: x => dCan(ss, aa.v, x) });
    });

  // [frase, traduzioni, parole utili: i verbi all'infinito, mai don't / let's]
  const IMP = [['Chiudi la porta, per favore.', ['Close the door, please.', 'Please close the door.', 'Shut the door, please.', 'Please shut the door.'], [['chiudere', 'close'], ['porta', 'door'], ['per favore', 'please']]],
    ['Apri la finestra.', ['Open the window.'], [['aprire', 'open'], ['finestra', 'window']]],
    ['Siediti, per favore.', ['Sit down, please.', 'Please sit down.', 'Please, sit down.'], [['sedersi', 'sit down'], ['per favore', 'please']]],
    ['Non toccarlo!', ["Don't touch it!"], [['toccare', 'touch'], ['lo', 'it']]],
    ['Non fare tardi!', ["Don't be late!"], [['fare tardi', 'be late']]],
    ['Andiamo al cinema!', ["Let's go to the cinema!", "Let's go to the movies!"], [['andare', 'go']]],
    ['Aspettami qui.', ['Wait for me here.', 'Wait here for me.'], [['aspettare', 'wait for'], ['qui', 'here']]],
    ['Non preoccuparti.', ["Don't worry."], [['preoccuparsi', 'worry']]],
    ['Ascolta questa canzone!', ['Listen to this song!'], [['ascoltare', 'listen to'], ['canzone', 'song']]],
    ['Non aprire la porta!', ["Don't open the door!"], [['aprire', 'open'], ['porta', 'door']]],
    ['Mangiamo una pizza!', ["Let's have a pizza!", "Let's eat a pizza!"], [['mangiare', 'eat']]],
    ['Chiamami domani.', ['Call me tomorrow.', 'Phone me tomorrow.'], [['chiamare', 'call'], ['domani', 'tomorrow']]],
    ['Non parlare così forte!', ["Don't speak so loudly!", "Don't talk so loudly!", "Don't speak so loud!", "Don't talk so loud!"], [['parlare', 'speak'], ['così forte', 'so loudly']]],
    ['Sii gentile.', ['Be nice.', 'Be kind.'], [['gentile', 'nice']]]];
  const IMP_FIX = [['Not touch it!', ["Don't touch it!"]], ['No open the door!', ["Don't open the door!"]], ["Don't to worry.", ["Don't worry."]], ['Let us to go!', ["Let's go!", 'Let us go!']], ["Don't are late!", ["Don't be late!"]], ['You close the door!', ['Close the door!']]];
  add('a1-08', 'imperative', "L'imperativo", "L'imperativo",
    "Per dire a qualcuno di fare una cosa usi il verbo da solo, senza you: Open the window. Per dire di non farla: Don't + verbo (Don't touch it, anche Don't be late). Per \"facciamo!\": Let's + verbo (Let's go!).",
    () => {
      if (coin(0.35)) { const [w, r] = pick(IMP_FIX); return F.fix(w, r, { why: "Imperativo: verbo base senza soggetto; negativo con don't + verbo base; proposta con let's + verbo base." }); }
      const [it, acc, impGl] = pick(IMP);
      return F.tr(it, acc, { gl: gloss(impGl || []), why: "Imperativo: verbo base, senza soggetto. Negativo: don't + verbo base. Proposta: let's + verbo base.",
        diag: x => /^not\b|^no\b/i.test(x.trim()) ? `Il negativo dell'imperativo è ${b("Don't")} + verbo base, non not.` : /^you\b/i.test(x.trim()) ? "L'imperativo non ha soggetto: niente you." : null });
    });

  /* =================== A1-09: was / were =================== */
  const WAS_C = [['at home', 'a casa'], ['at school', 'a scuola'], ['ill', { m: 'malato', f: 'malata', mp: 'malati' }], ['late', 'in ritardo'], ['at the cinema', 'al cinema'],
    ['in Rome', 'a Roma'], ['tired', { m: 'stanco', f: 'stanca', mp: 'stanchi' }], ['happy', { m: 'felice', f: 'felice', mp: 'felici' }], ['at work', 'al lavoro'], ['very busy', { m: 'molto impegnato', f: 'molto impegnata', mp: 'molto impegnati' }]];
  const IMPERF = ['ero', 'eri', 'era', 'eravamo', 'eravate', 'erano'];
  const itC = (c, s) => typeof c[1] === 'string' ? c[1] : c[1][s.g];
  const wasWhy = s => `Il soggetto è ${subjDesc(s)}: ${b(WAS[s.p])}. I / he / she / it ${b('was')}, we / you / they ${b('were')}.`;
  add('a1-09', 'was-were', ['Le forme', 'Un passato, tre tempi italiani', 'There was, there were'], 'Was e were',
    "Be al passato: was con I, he, she, it (una persona o una cosa sola); were con you, we, they. Negativa: wasn't, weren't. Domanda: Was she…? Were you…? Vale per ero, sono stato e fui. C'era = there was, c'erano = there were.",
    () => {
      const s = pick(SUBJ), c = pick(WAS_C), w = WAS[s.p], t = pick(T_PAST), m = pick(['choice', 'fill', 'neg', 'fix', 'tr', 'tr']);
      const dW = (subj, ww) => x => { const y = words(x).find(z => ['was', 'were', 'is', 'are', 'am'].includes(z)); return y && y !== ww ? (['is', 'are', 'am'].includes(y) ? `${t[0]} è passato: serve ${b(ww)}, non ${y}.` : wasWhy(subj)) : null; };
      const diag = dW(s, w);
      if (m === 'choice') return F.choice(`${enSubj(s, 1)} ___ ${c[0]} ${t[0]}.`, ['was', 'were'], w, { why: wasWhy(s) });
      if (m === 'fill') return F.fill(`${enSubj(s, 1)} ___ ${c[0]} ${t[0]}.`, [w], 'be', { why: wasWhy(s), diag });
      if (m === 'neg') return F.fill(`${enSubj(s, 1)} ___ ${c[0]} ${t[0]}.`, [`${w}n't`, `${w} not`], 'be, negativa', { why: wasWhy(s), diag });
      if (m === 'fix') return F.fix(`${enSubj(s, 1)} ${w === 'was' ? 'were' : 'was'} ${c[0]} ${t[0]}.`, [`${enSubj(s, 1)} ${w} ${c[0]} ${t[0]}.`], { why: wasWhy(s) });
      const ss = pick(SUBJ_TR), ww = WAS[ss.p], q = coin(0.3);
      const acc = q ? [`${cap(ww)} ${ss.en} ${c[0]} ${t[0]}?`, ...(t[2] || []).map(x => `${cap(ww)} ${ss.en} ${c[0]} ${x}?`)] : [`${enSubj(ss, 1)} ${ww} ${c[0]} ${t[0]}.`, `${cap(t[0])} ${ss.en} ${ww} ${c[0]}.`, ...(t[2] || []).map(x => `${enSubj(ss, 1)} ${ww} ${c[0]} ${x}.`)];
      return F.tr(itSentence(ss, IMPERF[ss.p], itC(c, ss), t[1], { q }), acc, { gl: gloss(glS(ss), [[itC(c, ss), c[0]]], glT(t)), why: `"Ero / eri / era…" = ${ww}. ${wasWhy(ss)}`, diag: dW(ss, ww) });
    });

  const CITIES = [['Napoli', 'Naples'], ['Roma', 'Rome'], ['Milano', 'Milan'], ['Torino', 'Turin'], ['Firenze', 'Florence'], ['Venezia', 'Venice'], ['Londra', 'London'], ['Parigi', 'Paris'], ['Bari', 'Bari'], ['Palermo', 'Palermo']];
  add('a1-09', 'born', 'Nascere: be born', 'Nascere: be born',
    "Nascere = be born, ed è sempre al passato perché sei nato una volta sola: I was born in 1998 (sono nato), Where were you born? (dove sei nato?). Mai I am born.",
    () => {
      const s = pick(SUBJ_TR), w = WAS[s.p], when = coin() ? (() => { const [it, en] = pick(CITIES); return [`a ${it}`, `in ${en}`]; })() : (() => { const y = 1950 + Math.floor(Math.random() * 66); return [`nel ${y}`, `in ${y}`]; })();
      const itV = `${IT.essere[s.p]} ${agree('nat', s.g)}`;
      const why = `Nascere = be born, al passato: ${s.en} ${b(w + ' born')}.`;
      const diag = x => /\b(am|is|are)\s+born\b/i.test(x) || /\b(i'm|she's|he's|it's|we're|they're|you're)\s+born\b/i.test(x) ? `In italiano "sono nato" sembra un presente, ma in inglese la nascita è sempre al passato: ${b(w + ' born')}.` : /\bborned\b|\bborn\b/i.test(x) && !/\b(was|were)\b/i.test(x) ? `"Nascere" si dice be born: ${b(w + ' born')}.` : null;
      if (coin(0.3)) return F.fix(`${enSubj(s, 1)} ${BE[s.p]} born ${when[1]}.`, [`${enSubj(s, 1)} ${w} born ${when[1]}.`], { why });
      if (coin(0.25)) { const ss = pick(SUBJ_TR.filter(x => x.p !== 0)); return F.tr(cap(`dove ${IT.essere[ss.p]} ${agree('nat', ss.g)}${ss.it ? ' ' + ss.it : ''}?`), [`Where ${WAS[ss.p]} ${ss.en} born?`], { gl: gloss(glS(ss), [['dove', 'where']]), why: `Domanda: Where ${WAS[ss.p]} ${ss.en} born?`, diag }); }
      return F.tr(itSentence(s, itV, when[0]), [`${enSubj(s, 1)} ${w} born ${when[1]}.`], { why, diag, gl: gloss(glS(s), /^a /.test(when[0]) ? [[when[0].slice(2), when[1].slice(3)]] : []) });
    });

  const AGO = [['two days', 'due giorni'], ['three weeks', 'tre settimane'], ['five years', 'cinque anni'], ['a month', 'un mese']];
  add('a1-09', 'past-time', 'Espressioni di tempo passato', 'Ago, last, yesterday',
    "Ieri = yesterday; ieri sera = last night; la settimana / l'anno scorso = last week / last year; due giorni fa = two days ago. Ago è come il nostro \"fa\": va dopo il tempo (three years ago), mai before three years.",
    () => {
      const [en, it] = pick(AGO), s = pick(SUBJ_TR), w = WAS[s.p], c = pick(WAS_C.filter(x => typeof x[1] === 'string'));
      const right = [`${enSubj(s, 1)} ${w} ${c[0]} ${en} ago.`, `${cap(en)} ago ${s.en} ${w} ${c[0]}.`];
      const why = `"${it} fa" = ${b(en + ' ago')}: ago va dopo la durata.`;
      const m = pick(['choice', 'fix', 'tr', 'last']);
      if (m === 'last') return F.choice(`${enSubj(s, 1)} ${w} ${c[0]} ___ night.`, ['last', 'yesterday', 'ago'], 'last', { why: 'Ieri sera = last night (non yesterday night).' });
      if (m === 'choice') return F.choice(`${enSubj(s, 1)} ${w} ${c[0]} ${en} ___.`, ['ago', 'before', 'last'], 'ago', { why });
      if (m === 'fix') return F.fix(`${enSubj(s, 1)} ${w} ${c[0]} before ${en}.`, right, { why });
      return F.tr(cap(`${en === 'an hour' ? "un'ora" : it} fa ${s.it ? s.it + ' ' : ''}${IMPERF[s.p]} ${c[1]}.`), right, { gl: gloss(glS(s), [[it, en], [c[1], c[0]]]), why, diag: x => /\bbefore\b/i.test(x) ? `"Fa" nel senso di tempo passato non è before: si dice ${b(en + ' ago')}, con ago dopo la durata.` : null });
    });

  /* =================== A1-10: past simple =================== */
  const REG = ['stop', 'plan', 'study', 'try', 'carry', 'travel', 'arrive', 'visit', 'live', 'dance', 'listen', 'wait', 'clean', 'play', 'watch', 'cook', 'work', 'wash', 'fix', 'worry', 'cry', 'shop', 'enjoy', 'start', 'want', 'need'];
  const REG_REST = { travel: 'to Spain', arrive: 'late', worry: 'about the exam', cry: 'at the end of the film', shop: 'in town', enjoy: 'the party', start: 'a new course', want: 'a new phone', need: 'help', stop: 'at a petrol station' };
  const edWhy = v => /ied$/.test(v.p1) ? `Consonante + y: la y diventa -ied (${v.b} → ${b(v.p1)}).` : /([bcdfgklmnprstvz])\1ed$/.test(v.p1) ? `Si raddoppia la consonante finale: ${v.b} → ${b(v.p1)}.` : /e$/.test(v.b) ? `Il verbo finisce in -e: si aggiunge solo -d (${v.b} → ${b(v.p1)}).` : `Verbo regolare: + -ed (${v.b} → ${b(v.p1)}).`;
  function dPast(v, x, timeEn) {
    const w = lastWord(x), k = kindOf(w, v);
    if (v.p.split(' / ').includes(w)) return null;
    if (has(k, 'regularized')) return `${b(v.b)} è irregolare: il passato è ${b(v.p1)}, non ${w}. Lo trovi nella tabella dei verbi irregolari.`;
    if (has(k, 'pp') && !has(k, 'past')) return `${b(w)} è il participio passato (terza colonna): si usa dopo have. Il past simple è ${b(v.p1)} (seconda colonna).`;
    if (has(k, 'base') || has(k, 'third')) return `«${timeEn}» indica un momento finito del passato: serve il past simple, ${b(v.p1)}, non ${w}.`;
    if (has(k, 'ing')) return `Non è un'azione in corso: con «${timeEn}» basta il past simple, ${b(v.p1)}.`;
    return spellingHint(w, v.p1);
  }
  add('a1-10', 'past-regular', ['Verbi regolari: -ed', 'Quando si usa'], 'Past simple regolare: -ed',
    "Per le cose finite in un momento preciso (yesterday, last week, in 2019) si usa il past simple. Ai verbi regolari si aggiunge -ed, uguale per tutti: worked, played. Attenzione a lived (-e + d), studied (y → ied), stopped (la consonante raddoppia).",
    () => {
      const vb = pick(REG), v = V(vb), a = ACT.find(x => x.v.b === vb), rest = a ? a.rest : REG_REST[vb], s = pick(SUBJ), t = pick(T_PAST);
      const why = edWhy(v);
      if (coin(0.3)) { const bad = /ied$/.test(v.p1) ? v.b + 'ed' : /([bcdfgklmnprstvz])\1ed$/.test(v.p1) ? v.b + 'ed' : /e$/.test(v.b) ? v.b + 'ed' : v.b + 'd'; return F.fix(`${enSubj(s, 1)} ${bad} ${rest} ${t[0]}.`, [`${enSubj(s, 1)} ${v.p1} ${rest} ${t[0]}.`, `${cap(t[0])} ${s.en} ${v.p1} ${rest}.`], { why }); }
      if (coin(0.35) && a && a.itRest) {
        const ss = pick(SUBJ_TR);
        return F.tr(itSentence(ss, itPast(a, ss), a.itRest, t[1]), enVariants(ss, v.p1, a, t, { altVerb: x => x.p1 }), { gl: gloss(glS(ss), glA(a), glT(t)), why: `"${itPast(a, ss)}" con un momento finito (${t[1]}) è past simple: ${v.p1}.`, diag: x => dPast(v, words(x).find(y => kindOf(y, v)[0] !== 'other') || x, t[0]) });
      }
      return F.fill(`${enSubj(s, 1)} ___ ${rest} ${t[0]}.`, [v.p1], vb, { why, diag: x => dPast(v, x, t[0]) });
    });

  const IRR_ACT = ACT.filter(a => a.v.irr && a.v.p1 !== a.v.b);
  add('a1-10', 'past-irregular', 'Verbi irregolari', 'Past simple irregolare',
    "Molti verbi comuni al passato cambiano del tutto e vanno imparati: go → went, buy → bought, eat → ate, see → saw, take → took, make → made. Il past simple è la seconda colonna; la terza (gone, eaten…) si usa solo dopo have.",
    () => {
      const a = pick(IRR_ACT), v = a.v, s = pick(SUBJ), t = pick(T_PAST);
      const why = `${b(v.b)} è irregolare: past simple ${b(v.p1)} (participio ${v.pp1}).`;
      const m = pick(['fill', 'fill', 'fix', 'tr', 'tr']);
      if (m === 'fix') { const bad = coin() && VERBS.ed(v.b) !== v.p1 ? VERBS.ed(v.b) : (v.pp1 !== v.p1 ? v.pp1 : VERBS.ed(v.b)); return F.fix(`${enSubj(s, 1)} ${bad} ${a.rest} ${t[0]}.`, [`${enSubj(s, 1)} ${v.p1} ${a.rest} ${t[0]}.`, `${cap(t[0])} ${s.en} ${v.p1} ${a.rest}.`], { why }); }
      if (m === 'tr' && a.itRest) {
        const ss = pick(SUBJ_TR);
        return F.tr(itSentence(ss, itPast(a, ss), a.itRest, t[1]), enVariants(ss, v.p1, a, t, { altVerb: x => x.p1 }), { gl: gloss(glS(ss), glA(a), glT(t)), why: `Il passato prossimo italiano con un momento finito (${t[1]}) è past simple: ${b(v.p1)}.`, diag: x => {
          const ws = words(x); if (ws.includes('have') || ws.includes('has')) return `Il passato prossimo italiano ("${itPast(a, ss)}") non si traduce con have: con un momento finito (${t[1]}) si usa il past simple, ${b(v.p1)}.`;
          return dPast(v, ws.find(y => kindOf(y, v)[0] !== 'other') || x, t[0]); } });
      }
      return F.fill(`${enSubj(s, 1)} ___ ${a.rest} ${t[0]}.`, v.p.split(' / '), v.b, { why, diag: x => dPast(v, x, t[0]) });
    });

  add('a1-10', 'did', 'Negativa e domande: did', "Did / didn't + verbo base",
    "Per dire \"non\" e per le domande al passato si usa did, uguale per tutti: I didn't go, Did you see…? Il passato lo porta già did, quindi il verbo resta com'è: mai didn't went o Did you saw.",
    () => {
      const s = pick(SUBJ), a = pick(ACT), v = a.v, t = pick(T_PAST), m = pick(['neg', 'q', 'choice', 'fix', 'tr', 'tr']);
      const why = `Con did / didn't il verbo resta alla forma base: ${b(v.b)}.`;
      if (m === 'neg') return F.fill(`${enSubj(s, 1)} ___ ${a.rest} ${t[0]}.`, [`didn't ${v.b}`, `did not ${v.b}`], `not / ${v.b}`, { why, diag: x => /n't|\bnot\b/.test(x) ? dBaseAfter("didn't", v, x) : `Per la negativa al passato serve ${b("didn't")} + verbo base.` });
      if (m === 'q') return F.fill(`___ ${s.en} ${v.b} ${a.rest} ${t[0]}?`, ['Did'], null, { why: 'Domanda al passato: Did + soggetto + verbo base.', diag: x => /^(do|does)$/i.test(x.trim()) ? `${t[0]} è passato: la domanda vuole ${b('Did')}.` : /^(was|were)$/i.test(x.trim()) ? `${b(v.b)} è un verbo normale, non be: la domanda si fa con ${b('Did')}.` : null });
      if (m === 'choice') return F.choice(`Did ${s.en} ___ ${a.rest} ${t[0]}?`, [v.b, v.p1, v.third], v.b, { why, diag: x => dBaseAfter('did', v, x) });
      if (m === 'fix') return coin() ? F.fix(`${enSubj(s, 1)} didn't ${v.p1 !== v.b ? v.p1 : v.third} ${a.rest} ${t[0]}.`, [`${enSubj(s, 1)} didn't ${v.b} ${a.rest} ${t[0]}.`], { why })
        : F.fix(`Did ${s.en} ${v.p1 !== v.b ? v.p1 : v.third} ${a.rest} ${t[0]}?`, [`Did ${s.en} ${v.b} ${a.rest} ${t[0]}?`], { why });
      const aa = pick(ACT_TR), ss = pick(SUBJ_TR), q = coin();
      const acc = q ? qVariants('did', ss, x => x.b, aa, t) : enVariants(ss, `didn't ${aa.v.b}`, aa, t, { altVerb: x => `didn't ${x.b}` });
      return F.tr(itSentence(ss, itPast(aa, ss), aa.itRest, t[1], { neg: !q, q }), acc, { gl: gloss(glS(ss), glA(aa), glT(t)), why: q ? 'Domanda al passato: Did + soggetto + verbo base.' : "Negativa al passato: didn't + verbo base.", diag: x => {
        const ws = words(x); if (!ws.includes('did') && !/didn't/.test(x)) return `Per ${q ? 'la domanda' : 'la negativa'} al past simple serve ${b(q ? 'Did' : "didn't")} + verbo base.`;
        const i = ws.findIndex(y => y === 'did' || y === "didn't"); const after = ws.slice(i + 1).find(y => kindOf(y, aa.v)[0] !== 'other');
        return after && after !== aa.v.b ? dBaseAfter(q ? 'did' : "didn't", aa.v, after) : null; } });
    });

  /* =================== A1-11: futuro =================== */
  const T_FUT = [['tomorrow', 'domani'], ['next week', 'la settimana prossima'], ['next year', "l'anno prossimo"], ['tonight', 'stasera']];
  add('a1-11', 'will', 'Will', 'Will + verbo base',
    "Will + verbo, uguale per tutti (I'll, she'll; \"non\" = won't). Si usa quando decidi in quel momento (I'll get it), quando prometti, offri aiuto o dici cosa pensi che succederà (I think it will rain). Mai will to.",
    () => {
      const s = pick(SUBJ), a = pick(ACT), v = a.v, t = pick(T_FUT), m = pick(['fill', 'fix', 'tr', 'tr']);
      const why = `Will + verbo base, senza to: ${s.en} will ${b(v.b)}.`;
      const diag = x => /\bwill to\b/i.test(x) ? `Dopo will niente to: will ${v.b}.` : /\bwill\s+\w+s\b/i.test(x) && words(x).includes(v.third) ? `Dopo will il verbo resta alla forma base: ${b(v.b)}.` : null;
      if (m === 'fill') return F.fill(`I think ${s.en === 'I' ? 'I' : s.en} ___ ${a.rest} ${t[0]}.`, [`will ${v.b}`, `'ll ${v.b}`], `${v.b}, futuro`, { why, diag });
      if (m === 'fix') return coin() ? F.fix(`${enSubj(s, 1)} will to ${v.b} ${a.rest} ${t[0]}.`, [`${enSubj(s, 1)} will ${v.b} ${a.rest} ${t[0]}.`], { why: 'Dopo will niente to.' })
        : F.fix(`${enSubj(s, 1)} will ${v.third} ${a.rest} ${t[0]}.`, [`${enSubj(s, 1)} will ${v.b} ${a.rest} ${t[0]}.`], { why: 'Dopo will il verbo resta alla forma base, senza -s.' });
      const aa = pick(ACT_TR), ss = pick(SUBJ_TR), neg = coin(0.3);
      const acc = enVariants(ss, `${neg ? "won't" : 'will'} ${aa.v.b}`, aa, t, { altVerb: x => `${neg ? "won't" : 'will'} ${x.b}` });
      return F.tr(itSentence(ss, itFut(aa, ss), aa.itRest, t[1], { neg }), acc, { gl: gloss(glS(ss), glA(aa), glT(t)), why: `Il futuro italiano (${itFut(aa, ss)}) si rende con ${neg ? "won't" : 'will'} + verbo base.`, diag });
    });

  add('a1-11', 'going-to', 'Be going to', 'Be going to',
    "Am / is / are going to + verbo = \"ho intenzione di\" (I'm going to buy a car: l'ho già deciso) oppure \"sta per\", quando lo vedi arrivare (Look at those clouds! It's going to rain).",
    () => {
      const s = pick(SUBJ), a = pick(NOWABLE), v = a.v, be = BE[s.p], t = pick(T_FUT.slice(0, 2).concat([T_FUT[3]])), m = pick(['fill', 'tr', 'tr', 'choice']);
      const why = `Intenzione già decisa: ${s.en} ${b(be + ' going to ' + v.b)}.`;
      const diag = x => !words(x).some(w => ['am', 'is', 'are'].includes(w)) && !/'(m|s|re)\b/.test(x) && /going to/i.test(x) ? `Manca be: ${s.en} ${b(be)} going to ${v.b}.` : /going to \w+s\b/i.test(x) && words(x).includes(v.third) ? `Dopo going to il verbo resta alla forma base: ${b(v.b)}.` : null;
      if (m === 'fill') return F.fill(`${enSubj(s, 1)} ___ ${a.rest} ${t[0]}. It's already decided.`, [`${be} going to ${v.b}`, `${beShort[be]} going to ${v.b}`], `${v.b}, be going to`, { why, diag });
      if (m === 'choice') {
        const ev = pick([['Look at those clouds! It ___ rain.', 'is going to', 'Previsione basata su ciò che si vede: going to.'], ['The phone is ringing! — OK, ___ answer it.', "I'll", 'Decisione presa sul momento: will.'],
          ["We've decided: we ___ sell the house.", 'are going to', 'Decisione già presa: going to.'], ["I'm hungry. — I ___ make you a sandwich.", "'ll", 'Offerta spontanea: will.'], ['Be careful! You ___ fall!', 'are going to', 'Previsione su ciò che si vede: going to.']]);
        const opts = ev[1] === "I'll" ? ["I'll", "I'm going to"] : ev[1] === "'ll" ? ["'ll", "'m going to"] : [ev[1], 'will'];
        return F.choice(ev[0], opts, ev[1], { why: ev[2] });
      }
      const aa = pick(NOWABLE_TR), ss = pick(SUBJ_TR), bb = BE[ss.p];
      const acc = enVariants(ss, `${bb} going to ${aa.v.b}`, aa, t, { altVerb: x => `${bb} going to ${x.b}` });
      return F.tr(itSentence(ss, `${IT.avere[ss.p]} intenzione di ${aa.itInf}`, aa.itRest, t[1]), acc, { gl: gloss(glS(ss), glA(aa), glT(t)), why: `"Avere intenzione di" = be going to + verbo base.`, diag });
    });

  // [frase, verbo, traduzione, traduzioni accettate, parole utili]
  const WHEN = [["I'll call you when I ___ home.", 'get', "Ti chiamo quando arrivo a casa.", ["I'll call you when I get home.", "I will call you when I get home."], [['chiamare', 'call'], ['arrivare a casa', 'get home']]],
    ['We will stay at home if it ___.', 'rains', 'Se piove restiamo a casa.', ["If it rains, we'll stay at home.", "If it rains, we will stay at home.", "We'll stay at home if it rains.", 'We will stay at home if it rains.'], [['piovere', 'rain'], ['restare a casa', 'stay at home']]],
    ["I'll tell her as soon as I ___ her.", 'see', 'Glielo dirò appena la vedrò.', ["I'll tell her as soon as I see her.", 'I will tell her as soon as I see her.'], [['dirlo a lei', 'tell her'], ['appena', 'as soon as'], ['vedere', 'see']]],
    ['She will be happy when she ___ the news.', 'hears', 'Sarà contenta quando sentirà la notizia.', ["She'll be happy when she hears the news.", 'She will be happy when she hears the news.'], [['contento', 'happy'], ['sentire', 'hear'], ['la notizia', 'the news']]],
    ["Call me when you ___ at the station.", 'arrive', 'Chiamami quando arrivi in stazione.', ['Call me when you arrive at the station.', 'Call me when you get to the station.'], [['chiamare', 'call'], ['arrivare in stazione', 'arrive at the station']]],
    ["We'll start dinner when Dad ___ home.", 'comes', 'Cominceremo a cenare quando papà tornerà a casa.', ["We'll start dinner when Dad comes home.", 'We will start dinner when Dad comes home.', "We'll start dinner when Dad gets home.", 'We will start dinner when Dad gets home.'], [['cominciare a cenare', 'start dinner'], ['papà', 'Dad'], ['tornare a casa', 'come home']]]];
  add('a1-11', 'when-present', 'Dopo when, if, as soon as: presente', 'Dopo when / if: presente, non will',
    "Quando parli del futuro, dopo when, if, as soon as (appena), before, after, until si mette il presente, non will: I'll call you when I arrive (ti chiamerò quando arriverò). Un solo will per frase.",
    () => {
      const [q, a, it, acc, whenGl] = pick(WHEN), why = `Dopo when / if / as soon as si usa il presente: ${b(a)}, anche se si parla del futuro.`;
      const diag = x => /\b(when|if|as soon as)\b[^,]*\bwill\b|\b(when|if|as soon as) \w+ 'll/i.test(x) ? `In italiano dopo "quando / se" si mette il futuro, ma in inglese dopo when / if si usa il presente: ${b(a)}.` : null;
      const m = pick(['choice', 'fix', 'tr']);
      if (m === 'choice') return F.choice(q, [a, `will ${a.replace(/s$/, '').replace(/ie$/, 'y')}`.replace('will hear', 'will hear').replace('will come', 'will come'), a.replace(/s$/, '') === a ? `will ${a}` : `will ${a.replace(/s$/, '')}`], a, { why });
      if (m === 'fix') return F.fix(q.replace('___', `will ${a.replace(/s$/, '')}`), acc, { why });
      return F.tr(it, acc, { why, diag, gl: gloss(whenGl || []) });
    });

  const FUT_CHOICE = [["I ___ my dentist at 4 tomorrow. It's in my diary.", 'am seeing', ['will see', 'see'], 'Appuntamento fissato: present continuous.'],
    ['The train ___ at 7.15 tomorrow morning.', 'leaves', ['is leaving', 'will leave'], 'Orario ufficiale: present simple.'],
    ['I think Italy ___ the match.', 'will win', ['is winning', 'wins'], 'Opinione sul futuro: will.'],
    ["We're flying to Dublin on Friday. We ___ the tickets yesterday.", 'bought', ['buy', 'will buy'], 'Azione già fatta (yesterday): past simple.'],
    ['What ___ you doing tonight?', 'are', ['will', 'do'], 'Programmi per stasera: present continuous (What are you doing tonight?).'],
    ["Don't worry, I ___ tell anyone.", "won't", ["don't", "am not going"], 'Promessa: will / won\'t.']];
  add('a1-11', 'future-choice', ['Riassunto', 'Present continuous per il futuro'], 'Will, going to o present continuous?',
    "Will = decido adesso, prometto, prevedo. Going to = l'ho già deciso, o lo vedo arrivare. Present continuous = è un appuntamento già preso (I'm meeting Anna at six). Present simple = orari ufficiali (The train leaves at 7).",
    () => { const [q, a, others, why] = pick(FUT_CHOICE); return F.choice(q, [a, ...others], a, { why }); });

  /* =================== A1-12: comparativi e superlativi =================== */
  const CMP = [
    ['The train', 'il treno', 'the bus', "dell'autobus", 'fast', 'faster', 'veloce', 'è più'],
    ['My brother', 'mio fratello', 'me', 'di me', 'tall', 'taller', 'alto', 'è più'],
    ['This hotel', 'questo albergo', 'that one', 'di quello', 'expensive', 'more expensive', 'caro', 'è più'],
    ['English', "l'inglese", 'Italian', "dell'italiano", 'easy', 'easier', 'facile', 'è più'],
    ['July', 'luglio', 'May', 'di maggio', 'hot', 'hotter', 'caldo', 'è più'],
    ['This book', 'questo libro', 'the film', 'del film', 'interesting', 'more interesting', 'interessante', 'è più'],
    ['My car', 'la mia macchina', 'yours', 'della tua', 'big', 'bigger', 'grande', 'è più'],
    ['Today', 'oggi', 'yesterday', 'di ieri', 'cold', 'colder', 'freddo', 'è più'],
    ['Anna', 'Anna', 'her sister', 'di sua sorella', 'happy', 'happier', 'felice', 'è più'],
    ['This exercise', 'questo esercizio', 'the last one', "dell'ultimo", 'difficult', 'more difficult', 'difficile', 'è più'],
    ['The sea', 'il mare', 'the lake', 'del lago', 'beautiful', 'more beautiful', 'bello', 'è più'],
    ['Your English', 'il tuo inglese', 'mine', 'del mio', 'good', 'better', 'migliore', 'è'],
    ['This pizza', 'questa pizza', 'that one', 'di quella', 'bad', 'worse', 'peggiore', 'è'],
    ['My flat', 'il mio appartamento', 'yours', 'del tuo', 'small', 'smaller', 'piccolo', 'è più'],
    ['Rome', 'Roma', 'Milan', 'di Milano', 'old', 'older', 'antica', 'è più'],
  ];
  const cmpWhy = (adj, cmp) => /^more /.test(cmp) ? `${b(adj)} è un aggettivo lungo: more + aggettivo, ${b(cmp)}.`
    : ['good', 'bad'].includes(adj) ? `${b(adj)} è irregolare: ${b(cmp)}.`
    : /ier$/.test(cmp) ? `Consonante + y: -ier (${adj} → ${b(cmp)}).` : /([bdgmnpt])\1er$/.test(cmp) ? `Si raddoppia la consonante: ${adj} → ${b(cmp)}.` : `Aggettivo corto: + -er (${adj} → ${b(cmp)}).`;
  function dCmp(adj, cmp, x) {
    const ws = words(x);
    if (ws.includes('more') && !/^more /.test(cmp)) return `${b(adj)} è corto: si dice ${b(cmp)}, senza more. O -er o more, mai tutti e due.`;
    if (!ws.includes('more') && /^more /.test(cmp) && ws.some(w => w === adj + 'er' || w === adj + 'r')) return `${b(adj)} è lungo: ${b(cmp)}, non ${adj}er.`;
    if (ws.includes('of') && !ws.includes('than')) return `Il secondo termine di paragone ("di") si dice ${b('than')}, non of.`;
    if (['gooder', 'more good', 'badder', 'more bad'].some(y => x.toLowerCase().includes(y))) return `${b(adj)} è irregolare: ${b(cmp)}.`;
    return null;
  }
  add('a1-12', 'comparative', ['Aggettivi corti: -er e the -est', 'Aggettivi lunghi: more e the most', 'Irregolari'], 'Comparativi: -er, more, than',
    "Aggettivi corti: + er (cheap → cheaper, big → bigger, happy → happier). Aggettivi lunghi: more davanti (more expensive). Irregolari: good → better, bad → worse. \"Più … di\" = -er / more … than. O -er o more, mai tutti e due.",
    () => {
      const [A, aIt, B, bIt, adj, cmp, adjIt, piu] = pick(CMP), be = ['English', 'Italian'].includes(A) ? 'is' : 'is';
      const why = cmpWhy(adj, cmp), right = [`${A} ${be} ${cmp} than ${B}.`, ...(B === 'me' ? [`${A} ${be} ${cmp} than I am.`] : [])];
      const m = pick(['fill', 'fix', 'tr', 'tr']);
      if (m === 'fill') return F.fill(`${A} ${be} ___ than ${B}.`, [cmp], adj, { why, diag: x => dCmp(adj, cmp, `${x} than`) || spellingHint(lastWord(x), cmp.split(' ').pop()) });
      if (m === 'fix') {
        const bad = /^more /.test(cmp) ? `${adj}er` : ['good', 'bad'].includes(adj) ? `more ${adj}` : `more ${cmp}`;
        return coin(0.7) ? F.fix(`${A} ${be} ${bad} than ${B}.`, right, { why }) : F.fix(`${A} ${be} ${cmp} of ${B}.`, right, { why: 'Il secondo termine di paragone vuole than.' });
      }
      return F.tr(`${cap(aIt)} ${piu} ${adjIt} ${bIt}.`, right, { why, diag: x => dCmp(adj, cmp, x), gl: gloss([[aIt, A.replace(/^(The|My|This|Your|Today)\b/, m => m.toLowerCase())]], ['good', 'bad'].includes(adj) ? [] : [[adjIt, adj]], [[bIt.replace(/^(della|dello|dell'|dei|del|di) ?/, ''), B]]) });
    });

  const SUP = [['restaurant', 'il ristorante', 'expensive', 'most expensive', 'caro', ['in town', 'in the city'], 'della città'], ['building', 'il palazzo', 'tall', 'tallest', 'alto', ['in the world'], 'del mondo'],
    ['day', 'il giorno', 'happy', 'happiest', 'felice', ['of my life'], 'della mia vita'], ['player', 'il giocatore', 'good', 'best', 'forte', ['in the team'], 'della squadra'],
    ['film', 'il film', 'bad', 'worst', 'brutto', ['of the year'], "dell'anno"], ['city', 'la città', 'beautiful', 'most beautiful', 'bella', ['in Italy'], "d'Italia"],
    ['river', 'il fiume', 'long', 'longest', 'lungo', ['in the world'], 'del mondo'], ['room', 'la stanza', 'big', 'biggest', 'grande', ['in the house'], 'della casa'],
    ['student', 'lo studente', 'young', 'youngest', 'giovane', ['in the class'], 'della classe'], ['exercise', "l'esercizio", 'easy', 'easiest', 'facile', ['in the book'], 'del libro']];
  add('a1-12', 'superlative', ['Aggettivi corti: -er e the -est', 'Aggettivi lunghi: more e the most', 'Irregolari', 'Than, in, as … as'], 'Superlativi: the -est, the most, in',
    "\"Il più …\": the + -est con gli aggettivi corti (the tallest, the biggest, the happiest), the most con quelli lunghi (the most expensive). Irregolari: the best, the worst. \"Del mondo, della città\" = in the world, in town (con i luoghi in, non of).",
    () => {
      const [n, nIt, adj, sup, adjIt, places, plIt] = pick(SUP), pl = places[0];
      const right = places.map(p => `It's the ${sup} ${n} ${p}.`).concat(places.map(p => `It is the ${sup} ${n} ${p}.`));
      const why = /^most /.test(sup) ? `${b(adj)} è lungo: the most ${adj}.` : ['good', 'bad'].includes(adj) ? `${b(adj)} è irregolare: the ${sup}.` : `Aggettivo corto: the + -est, ${b('the ' + sup)}.`;
      const diag = x => /\bof the (world|city|town|team|class|house|book)\b/i.test(x) ? `"Del mondo / della città…" con i luoghi e i gruppi si dice ${b('in')}: ${pl}.` : /\bmost \w+est\b/i.test(x) || /\bmore\b/i.test(x) ? why : null;
      const m = pick(['fill', 'fix', 'tr']);
      if (m === 'fill') return F.fill(`It's the ___ ${n} ${pl}.`, [sup], adj, { why, diag: x => dCmp(adj, sup, x) || spellingHint(lastWord(x), sup.split(' ').pop()) });
      if (m === 'fix') return /in the|in town|in Italy/.test(pl) ? F.fix(`It's the ${sup} ${n} ${pl.replace(/^in (the )?/, 'of the ')}.`.replace('of the town', 'of the town'), right, { why: 'Con i luoghi e i gruppi si usa in: the best in the world.' })
        : F.fix(`It's the ${/^most/.test(sup) ? adj + 'est' : 'most ' + adj} ${n} ${pl}.`, right, { why });
      return F.tr(`È ${nIt} più ${adjIt} ${plIt}.`, right, { why, diag, gl: gloss([[nIt.replace(/^(il|lo|la|l') ?/, ''), n]], adj === 'good' ? [] : [[adjIt, adj]], [[plIt.replace(/^(della|dell'|del|d') ?/, ''), pl.replace(/^(in|of) (the )?/, '')]]) });
    });

  const AS = [["Rome isn't as big ___ London.", 'as', ['than', 'like'], 'Uguaglianza: as … as.'], ['My brother is taller ___ me.', 'than', ['of', 'that'], 'Il secondo termine di paragone vuole than.'],
    ["He's the best player ___ the team.", 'in', ['of', 'at'], 'Superlativo con un gruppo o un luogo: in.'], ["She's as tall ___ her mother.", 'as', ['than', 'like'], 'Uguaglianza: as … as.'],
    ['It was the best day ___ the year.', 'of', ['in', 'at'], 'Con un periodo di tempo si usa of: the best day of the year.'], ['Your car is more expensive ___ mine.', 'than', ['of', 'as'], 'Più … di = more … than.']];
  add('a1-12', 'than-as', 'Than, in, as … as', 'Than, as … as, in / of',
    "\"Più … di\" = -er / more … than. \"Come\" = as … as (as tall as); \"non … come\" = not as … as. Con \"il più\": in per i luoghi e i gruppi (the best in the team), of per i periodi di tempo (the best day of the year).",
    () => { const [q, a, others, why] = pick(AS); return F.choice(q, [a, ...others], a, { why }); });
})();
