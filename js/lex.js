// Vocabolario bilingue per i generatori: soggetti, azioni, espressioni di tempo, in inglese e in italiano.
// Serve a costruire frasi sempre nuove (anche da tradurre) e a riconoscere che forma ha scritto chi risponde.
(() => {
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const cap = s => s ? s[0].toUpperCase() + s.slice(1) : s;
  const uniq = a => [...new Set(a)];
  const V = b => VERBS.find(b).v;

  /* ---------- soggetti ----------
     p: persona 0-5 (io, tu, lui/lei, noi, voi, loro); it: soggetto italiano ('' = sottinteso, come in italiano);
     pr: pronome inglese che lo sostituisce; g: genere per il participio con essere (m, f, mp) */
  const SUBJ = [
    { en: 'I', p: 0, it: '', pr: 'I', g: 'm' },
    { en: 'you', p: 1, it: '', pr: 'you', g: 'm' },
    { en: 'he', p: 2, it: 'lui', pr: 'he', g: 'm' },
    { en: 'she', p: 2, it: 'lei', pr: 'she', g: 'f' },
    { en: 'we', p: 3, it: '', pr: 'we', g: 'mp' },
    { en: 'they', p: 5, it: '', pr: 'they', g: 'mp' },
    { en: 'my brother', p: 2, it: 'mio fratello', pr: 'he', g: 'm' },
    { en: 'my sister', p: 2, it: 'mia sorella', pr: 'she', g: 'f' },
    { en: 'Anna', p: 2, it: 'Anna', pr: 'she', g: 'f' },
    { en: 'Luca', p: 2, it: 'Luca', pr: 'he', g: 'm' },
    { en: 'Mr Rossi', p: 2, it: 'il signor Rossi', pr: 'he', g: 'm' },
    { en: 'our teacher', p: 2, it: 'la nostra insegnante', pr: 'she', g: 'f' },
    { en: 'my parents', p: 5, it: 'i miei genitori', pr: 'they', g: 'mp' },
    { en: 'my friends', p: 5, it: 'i miei amici', pr: 'they', g: 'mp' },
    { en: 'Sara and Tom', p: 5, it: 'Sara e Tom', pr: 'they', g: 'mp' },
    { en: 'the children', p: 5, it: 'i bambini', pr: 'they', g: 'mp' },
  ];
  const is3 = s => s.p === 2;
  // per le traduzioni evitiamo "lui"/"lei" da soli: "Lei" in italiano può essere anche il Lei di cortesia
  const SUBJ_TR = SUBJ.filter(s => s.en !== 'he' && s.en !== 'she');
  const enSubj = (s, start) => start ? cap(s.en) : s.en;
  const subjDesc = s => s.en === s.pr ? `«${s.en}»` : `«${s.en}» (= ${s.pr})`;

  const BE = ['am', 'are', 'is', 'are', 'are', 'are'];
  const WAS = ['was', 'were', 'was', 'were', 'were', 'were'];
  const beShort = { am: "'m", is: "'s", are: "'re" };

  /* ---------- verbi italiani di servizio ---------- */
  const IT = {
    avere: ['ho', 'hai', 'ha', 'abbiamo', 'avete', 'hanno'],
    essere: ['sono', 'sei', 'è', 'siamo', 'siete', 'sono'],
    stare: ['sto', 'stai', 'sta', 'stiamo', 'state', 'stanno'],
    potere: ['posso', 'puoi', 'può', 'possiamo', 'potete', 'possono'],
    sapere: ['so', 'sai', 'sa', 'sappiamo', 'sapete', 'sanno'],
  };
  const agree = (stem, g) => stem + ({ m: 'o', f: 'a', mp: 'i', fp: 'e' }[g] || 'o');

  /* ---------- azioni ----------
     [verbo, complemento, complementi alternativi, complemento italiano (null = non si traduce),
      presente italiano (6 forme), participio (per "essere" senza la vocale finale), ausiliare a/e, gerundio,
      traduzioni alternative accettate [verbo, complemento]] */
  const ACT = [
    ['work', 'in a bank', ['at a bank'], 'in banca', 'lavoro lavori lavora lavoriamo lavorate lavorano', 'lavorato', 'a', 'lavorando'],
    ['live', 'in London', [], 'a Londra', 'abito abiti abita abitiamo abitate abitano', 'abitato', 'a', 'abitando'],
    ['play', 'the guitar', [], 'la chitarra', 'suono suoni suona suoniamo suonate suonano', 'suonato', 'a', 'suonando'],
    ['study', 'medicine', [], 'medicina', 'studio studi studia studiamo studiate studiano', 'studiato', 'a', 'studiando'],
    ['teach', 'English', [], 'inglese', 'insegno insegni insegna insegniamo insegnate insegnano', 'insegnato', 'a', 'insegnando'],
    ['speak', 'three languages', [], 'tre lingue', 'parlo parli parla parliamo parlate parlano', 'parlato', 'a', 'parlando'],
    ['cook', 'dinner', ['the dinner'], 'la cena', 'cucino cucini cucina cuciniamo cucinate cucinano', 'cucinato', 'a', 'cucinando', [['make', 'dinner']]],
    ['read', 'the newspaper', ['the paper'], 'il giornale', 'leggo leggi legge leggiamo leggete leggono', 'letto', 'a', 'leggendo'],
    ['write', 'emails', ['e-mails'], 'email', 'scrivo scrivi scrive scriviamo scrivete scrivono', 'scritto', 'a', 'scrivendo'],
    ['go', 'to the gym', [], 'in palestra', 'vado vai va andiamo andate vanno', 'andat', 'e', 'andando'],
    ['drink', 'coffee', [], 'il caffè', 'bevo bevi beve beviamo bevete bevono', 'bevuto', 'a', 'bevendo'],
    ['eat', 'fish', [], 'pesce', 'mangio mangi mangia mangiamo mangiate mangiano', 'mangiato', 'a', 'mangiando'],
    ['wash', 'the car', [], 'la macchina', 'lavo lavi lava laviamo lavate lavano', 'lavato', 'a', 'lavando'],
    ['buy', 'fresh bread', [], 'il pane fresco', 'compro compri compra compriamo comprate comprano', 'comprato', 'a', 'comprando'],
    ['make', 'pizza', ['a pizza', 'pizzas'], 'la pizza', 'faccio fai fa facciamo fate fanno', 'fatto', 'a', 'facendo'],
    ['take', 'the bus', [], "l'autobus", 'prendo prendi prende prendiamo prendete prendono', 'preso', 'a', 'prendendo', [['catch', 'the bus']]],
    ['swim', 'in the sea', [], 'nel mare', 'nuoto nuoti nuota nuotiamo nuotate nuotano', 'nuotato', 'a', 'nuotando'],
    ['run', 'in the park', [], 'nel parco', 'corro corri corre corriamo correte corrono', 'corso', 'a', 'correndo'],
    ['watch', 'films', ['movies'], 'film', 'guardo guardi guarda guardiamo guardate guardano', 'guardato', 'a', 'guardando'],
    ['listen', 'to the radio', [], 'la radio', 'ascolto ascolti ascolta ascoltiamo ascoltate ascoltano', 'ascoltato', 'a', 'ascoltando'],
    ['wait', 'for the bus', [], "l'autobus", 'aspetto aspetti aspetta aspettiamo aspettate aspettano', 'aspettato', 'a', 'aspettando'],
    ['clean', 'the kitchen', [], 'la cucina', 'pulisco pulisci pulisce puliamo pulite puliscono', 'pulito', 'a', 'pulendo'],
    ['wear', 'a uniform', [], 'una divisa', 'indosso indossi indossa indossiamo indossate indossano', 'indossato', 'a', 'indossando'],
    ['visit', 'the museum', [], 'il museo', 'visito visiti visita visitiamo visitate visitano', 'visitato', 'a', 'visitando'],
    ['sell', 'old books', [], 'libri vecchi', 'vendo vendi vende vendiamo vendete vendono', 'venduto', 'a', 'vendendo'],
    ['do', 'the shopping', [], 'la spesa', 'faccio fai fa facciamo fate fanno', 'fatto', 'a', 'facendo'],
    ['catch', 'the train', [], 'il treno', 'prendo prendi prende prendiamo prendete prendono', 'preso', 'a', 'prendendo', [['take', 'the train']]],
    ['sing', 'in a choir', [], 'in un coro', 'canto canti canta cantiamo cantate cantano', 'cantato', 'a', 'cantando'],
    ['fix', 'old bikes', ['old bicycles'], 'vecchie biciclette', 'aggiusto aggiusti aggiusta aggiustiamo aggiustate aggiustano', 'aggiustato', 'a', 'aggiustando', [['repair', 'old bikes']]],
    ['try', 'new recipes', [], 'nuove ricette', 'provo provi prova proviamo provate provano', 'provato', 'a', 'provando'],
    ['plan', 'a trip', [], 'un viaggio', 'organizzo organizzi organizza organizziamo organizzate organizzano', 'organizzato', 'a', 'organizzando'],
    ['send', 'messages', [], 'messaggi', 'mando mandi manda mandiamo mandate mandano', 'mandato', 'a', 'mandando'],
    ['carry', 'a heavy bag', [], 'una borsa pesante', 'porto porti porta portiamo portate portano', 'portato', 'a', 'portando'],
    ['drive', 'to work', [], null],
    ['meet', 'friends', [], null],
    ['dance', 'salsa', [], 'la salsa', 'ballo balli balla balliamo ballate ballano', 'ballato', 'a', 'ballando'],
    ['stop', 'work at six', [], null],
  ].map(([b, rest, alt, itRest, itPres, itPart, aux, itGer, trAlt]) => ({
    v: V(b), rest, alt: alt || [], itRest, itPres: itPres ? itPres.split(' ') : null, itPart, aux, itGer, trAlt: trAlt || [],
  }));
  const ACT_TR = ACT.filter(a => a.itRest);
  // infinito italiano ricavato dal gerundio (lavorando → lavorare), con le poche eccezioni
  const INF_EXC = { facendo: 'fare', bevendo: 'bere', pulendo: 'pulire' };
  for (const a of ACT) if (a.itGer) a.itInf = INF_EXC[a.itGer] || a.itGer.replace(/ando$/, 'are').replace(/endo$/, 'ere');
  // futuro semplice: lavorerò, leggerò, pulirò; andrò, berrò, farò
  const FUT_STEM = { andare: 'andr', bere: 'berr', fare: 'far', vedere: 'vedr', avere: 'avr', essere: 'sar' };
  const FUT_END = ['ò', 'ai', 'à', 'emo', 'ete', 'anno'];
  function itFut(a, s) {
    const inf = a.itInf;
    const stem = FUT_STEM[inf] || (/iare$/.test(inf) ? inf.replace(/iare$/, 'er') : /ire$/.test(inf) ? inf.replace(/ire$/, 'ir') : inf.replace(/[ae]re$/, 'er'));
    return stem + FUT_END[s.p];
  }

  /* ---------- espressioni di tempo [inglese, italiano, alternative inglesi] ---------- */
  const T_PRES = [['every day', 'ogni giorno'], ['on Mondays', 'il lunedì', ['on Monday', 'every Monday']], ['at the weekend', 'nel fine settimana', ['on the weekend', 'at weekends', 'on weekends']],
    ['twice a week', 'due volte alla settimana'], ['every morning', 'ogni mattina'], ['every evening', 'ogni sera']];
  const T_NOW = [['now', 'adesso', ['right now']], ['at the moment', 'in questo momento', ['now', 'right now']], ['right now', 'proprio adesso', ['now']]];
  const T_PAST = [['yesterday', 'ieri'], ['last week', 'la settimana scorsa'], ['two days ago', 'due giorni fa'], ['last night', 'ieri sera', ['yesterday evening']],
    ['in 2019', 'nel 2019'], ['last summer', "l'estate scorsa"]];

  /* ---------- frasi italiane ---------- */
  // "Mia sorella non lavora in banca ogni giorno?" — soggetto sottinteso se è un pronome come in italiano
  function itSentence(s, verbIt, rest, time, { neg = false, q = false } = {}) {
    const parts = [s.it, neg ? 'non' : '', verbIt, rest || '', time || ''].filter(Boolean);
    return cap(parts.join(' ')) + (q ? '?' : '.');
  }
  const itPres = (a, s) => a.itPres[s.p];
  const itPast = (a, s) => `${(a.aux === 'e' ? IT.essere : IT.avere)[s.p]} ${a.aux === 'e' ? agree(a.itPart, s.g) : a.itPart}`;
  const itCont = (a, s) => `${IT.stare[s.p]} ${a.itGer}`;

  /* ---------- frasi inglesi e loro varianti accettate ---------- */
  // Tutte le combinazioni: complemento principale o alternativo, tempo in fondo o all'inizio, traduzioni alternative del verbo
  function enVariants(s, verbPhrase, a, time, { q = false, timeFront = true, altVerb = null } = {}) {
    const rests = [a.rest, ...a.alt];
    const times = time ? [time[0], ...(time[2] || [])] : [''];
    const out = [];
    const build = (vp, rest) => {
      for (const t of times) {
        out.push(`${cap(`${s.en} ${vp} ${rest}${t ? ' ' + t : ''}`)}${q ? '?' : '.'}`);
        if (t && timeFront && !q) out.push(`${cap(t)} ${s.en} ${vp} ${rest}.`);
      }
    };
    for (const r of rests) build(verbPhrase, r);
    if (altVerb) for (const [vb, rest] of a.trAlt) build(altVerb(V(vb)), rest);
    return uniq(out);
  }

  /* ---------- "parole utili" per le traduzioni ----------
     Il vocabolario che serve, mai la parte su cui verte l'esercizio: il verbo si dà all'infinito
     (cantare → sing), così -s, passato e -ing restano da fare a chi risponde. */
  const glS = s => s.it && s.it !== s.en && !['lui', 'lei'].includes(s.it) ? [[s.it.replace(/^il signor /, 'signor '), s.en]] : [];
  // listen to, wait for: la preposizione va col verbo (ascoltare → listen to · la radio → the radio)
  const PREP_V = { listen: 'to', wait: 'for' };
  const glA = a => {
    if (!a.itInf) return [];
    const p = PREP_V[a.v.b], rest = p && a.rest.startsWith(p + ' ') ? a.rest.slice(p.length + 1) : a.rest;
    return [[a.itInf, p ? `${a.v.b} ${p}` : a.v.b], ...(a.itRest ? [[a.itRest, rest]] : [])];
  };
  const glT = t => t && t[1] ? [[t[1], t[0]]] : [];
  const gloss = (...lists) => uniq(lists.flat().filter(p => p && p[0] && p[1] && p[0].toLowerCase() !== p[1].toLowerCase()).map(p => JSON.stringify(p))).map(p => JSON.parse(p));

  /* ---------- che forma del verbo ha scritto chi risponde? ---------- */
  function kindOf(word, v) {
    const w = String(word || '').toLowerCase().trim();
    if (!w) return 'empty';
    const k = [];
    if (w === v.b) k.push('base');
    if (w === v.third) k.push('third');
    if (w === v.ing) k.push('ing');
    if (v.p.split(' / ').includes(w)) k.push('past');
    if (v.pp.split(' / ').includes(w)) k.push('pp');
    if (v.irr && w === VERBS.ed(v.b)) k.push('regularized');
    return k.length ? k : ['other'];
  }
  const has = (kinds, k) => kinds.includes(k);

  window.LEX = { pick, shuffle, cap, uniq, V, SUBJ, SUBJ_TR, is3, enSubj, subjDesc, BE, WAS, beShort, IT, agree, ACT, ACT_TR, T_PRES, T_NOW, T_PAST, itFut,
    itSentence, itPres, itPast, itCont, enVariants, kindOf, has, glS, glA, glT, gloss };
})();
