UNIT({
  id: 'a1-08', n: 8, level: 'A1',
  title: '<i>Can</i>, <i>could</i> e l\'imperativo',
  sub: 'Capacità, permesso, richieste; dare istruzioni',
  intro: "Can traduce sapere, potere e riuscire, tutto in una parola. È il primo verbo modale: si comporta in modo diverso da tutti gli altri verbi.",
  theory: [
    { h: 'Come funziona can', b: `
      <p>I verbi modali hanno regole proprie: <b>forma uguale per tutte le persone</b> (niente -s), <b>niente do</b> nelle domande e nelle negative, e sono seguiti dal verbo base <b>senza to</b>.</p>
      ${T(['Affermativa', 'Negativa', 'Domanda', 'Risposta breve'], [['I can swim', "I can't / cannot swim", 'Can I swim?', 'Yes, I can.'], ['she can swim', "she can't swim", 'Can she swim?', "No, she can't."]], 'plain')}
      ${N("<p>La negativa piena si scrive attaccata: <b>cannot</b>. Pronuncia britannica: <i>can't</i> /kɑːnt/, con la a lunga; <i>can</i> nella frase si pronuncia debole /kən/.</p>")}` },
    { h: 'I significati di can', b: `
      ${T(['Significato', 'Esempio', 'Italiano'], [['capacità', 'She can speak four languages.', 'Sa parlare quattro lingue.'], ['possibilità', "I can't sleep.", 'Non riesco a dormire.'], ['permesso', 'Can I open the window?', 'Posso aprire la finestra?'], ['richiesta', 'Can you help me?', 'Mi aiuti?']], 'plain')}
      <p>Con i verbi di percezione (see, hear, smell) l'inglese mette <i>can</i> dove l'italiano non mette niente:</p>
      ${EX(["I <b>can't</b> see anything.", 'Non vedo niente.'], ['<b>Can</b> you hear me?', 'Mi senti?'])}` },
    { h: 'Could', b: `
      <p><b>Could</b> è il passato di can per la capacità, ed è anche la forma più cortese per chiedere.</p>
      ${EX(['When I was five I <b>could</b> read.', 'A cinque anni sapevo leggere.'], ['<b>Could</b> you close the door, please?', 'Potrebbe chiudere la porta, per favore?'], ["I <b>couldn't</b> find my keys.", 'Non riuscivo a trovare le chiavi.'])}` },
    { h: "L'imperativo", b: `
      <p>Per dare istruzioni, ordini o consigli si usa il <b>verbo base</b>, senza soggetto. È uguale per tu e voi.</p>
      ${EX(['Open the window.', 'Apri / aprite la finestra.'], ['Sit down, please.', 'Siediti, per favore.'])}
      <p>La negativa è <b>don't</b> + verbo base, anche con be:</p>
      ${EX(["<b>Don't</b> touch it!", 'Non toccarlo!'], ["<b>Don't be</b> late.", 'Non fare tardi.'])}
      <p>Per proporre di fare qualcosa insieme: <b>let's</b> + verbo base.</p>
      ${EX(["<b>Let's</b> go!", 'Andiamo!'], ["<b>Let's</b> not argue.", 'Non litighiamo.'])}
      ${N("<p>L'imperativo da solo può suonare brusco. Con persone che non conosci è meglio <i>Could you...?</i> oppure aggiungere <i>please</i>.</p>")}` },
    { h: 'Errori tipici', b: ERR(
      ['Do you can swim?', 'Can you swim?', 'I modali non usano do.'],
      ['He cans cook.', 'He can cook.', 'Niente -s alla terza persona.'],
      ['I can to help you.', 'I can help you.', 'Dopo can niente to.'],
      ['Not open the window!', "Don't open the window!", "L'imperativo negativo vuole don't."],
      ["I don't can come.", "I can't come.", 'La negativa è can\'t, senza do.']) },
  ],
  exercises: [
    { t: 'c', q: 'She ___ speak four languages.', o: ['can', 'cans', 'can to'], a: 'can' },
    { t: 'c', q: '___ you help me, please?', o: ['Can', 'Do', 'Are'], a: 'Can' },
    { t: 'c', q: '"Can you drive?" "No, I ___."', o: ["can't", "don't", "am not"], a: "can't" },
    { t: 'c', q: '___ late! The film starts at eight.', o: ["Don't be", 'Not be', "Don't are"], a: "Don't be" },
    { t: 'c', q: "___ go to the beach! It's a beautiful day.", o: ["Let's", 'Let', 'Let us to'], a: "Let's" },
    { t: 'f', q: 'I ___ find my keys.', h: 'can, negativa', a: ["can't", 'cannot'] },
    { t: 'f', q: 'When I was six I ___ read.', h: 'passato di can', a: ['could'] },
    { t: 'f', q: '___ you close the door, please?', h: 'richiesta cortese', a: ['Could', 'Would', 'Can'], why: 'Could you...? e Would you...? sono le richieste più cortesi; Can you...? va bene tra amici.' },
    { t: 'f', q: "___ touch the oven! It's hot.", h: 'imperativo negativo', a: ["Don't", 'Do not'] },
    { t: 'x', q: 'Do you can swim?', a: ['Can you swim?'] },
    { t: 'x', q: 'He cans cook.', a: ['He can cook.'] },
    { t: 'x', q: 'I can to help you.', a: ['I can help you.'] },
    { t: 'x', q: 'Not open the window!', a: ["Don't open the window!"] },
    { t: 't', it: 'Non riesco a dormire.', a: ["I can't sleep."] },
    { t: 't', it: 'Posso entrare?', a: ['Can I come in?', 'May I come in?', 'Could I come in?'] },
    { t: 't', it: 'Non toccarlo!', a: ["Don't touch it!"] },
    { t: 't', it: 'Chiudi la porta, per favore.', a: ['Close the door, please.', 'Please close the door.', 'Shut the door, please.', 'Please shut the door.'] },
    { t: 't', it: 'Non vedo niente.', a: ["I can't see anything.", 'I can see nothing.', "I don't see anything."], why: "Con see, hear, smell l'inglese di solito aggiunge can: I can't see anything è la forma più naturale." },
    { t: 'o', it: 'Sai suonare la chitarra?', a: ['Can you play the guitar?'] },
    { t: 'o', it: 'Andiamo al cinema stasera.', a: ["Let's go to the cinema tonight.", "Tonight let's go to the cinema."] },
  ],
});
