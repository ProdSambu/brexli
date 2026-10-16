UNIT({
  id: 'a1-08', n: 8, level: 'A1', stop: 'Can',
  title: '<i>Can</i>, <i>could</i> e l\'imperativo',
  sub: 'Capacità, permesso, richieste; dare istruzioni',
  intro: "<i>Can</i> vuol dire <b>sapere</b> (fare una cosa), <b>potere</b> e <b>riuscire</b>: tre verbi italiani in una parola sola. Ed è molto più facile degli altri verbi, perché non cambia mai.",
  theory: [
    { h: 'Come funziona can', b: `
      <p><i>Can</i> ha tre regole semplici:</p>
      <ul><li>è <b>uguale per tutti</b>: <i>I can, she can, they can</i> (niente -s);</li><li>dopo c'è il verbo <b>senza to</b>: <i>I can swim</i>;</li><li>non usa mai <b>do</b>: la domanda è <i>Can you…?</i>, la negativa è <i>can't</i>.</li></ul>
      ${T(['Affermativa', 'Negativa', 'Domanda', 'Risposta breve'], [['I can swim', "I can't / cannot swim", 'Can I swim?', 'Yes, I can.'], ['she can swim', "she can't swim", 'Can she swim?', "No, she can't."]], 'plain')}
      ${N("<p>La negativa per intero si scrive tutta attaccata: <b>cannot</b>.</p>")}
      ${TIP(`<p><i>Can</i> è un verbo <b>pigro</b>: non prende la -s, non vuole il <i>to</i> e non chiede aiuto a <i>do</i>. Lo lasci sempre così com'è.</p><p>Domanda e negativa funzionano come con <i>be</i>: <i>you can</i> → <i>Can you?</i> → <i>you can't</i>.</p>`)}` },
    { h: 'I significati di can', b: `
      <p>In italiano usiamo tre verbi diversi, in inglese basta <i>can</i>:</p>
      ${T(['Significato', 'Esempio', 'Italiano'], [['capacità', 'She can speak four languages.', 'Sa parlare quattro lingue.'], ['possibilità', "I can't sleep.", 'Non riesco a dormire.'], ['permesso', 'Can I open the window?', 'Posso aprire la finestra?'], ['richiesta', 'Can you help me?', 'Mi aiuti?']], 'plain')}
      <p>Con <i>see</i> (vedere) e <i>hear</i> (sentire) l'inglese mette <i>can</i> anche quando in italiano non c'è:</p>
      ${EX(["I <b>can't</b> see anything.", 'Non vedo niente.'], ['<b>Can</b> you hear me?', 'Mi senti?'])}
      ${TIP(`<p>Se in italiano c'è <b>so</b>, <b>posso</b> o <b>riesco a</b> seguito da un verbo, in inglese è quasi sempre <b>can</b>: <i>so nuotare, posso entrare, riesco a vedere</i> → <i>I can swim, Can I come in, I can see</i>.</p>`)}` },
    { h: 'Could', b: `
      <p><b>Could</b> ha due usi: è il <b>passato</b> di can (<i>sapevo, potevo, riuscivo</i>) ed è il modo più <b>gentile</b> per chiedere qualcosa (<i>potresti…?</i>).</p>
      ${EX(['When I was five I <b>could</b> read.', 'A cinque anni sapevo leggere.'], ['<b>Could</b> you close the door, please?', 'Potrebbe chiudere la porta, per favore?'], ["I <b>couldn't</b> find my keys.", 'Non riuscivo a trovare le chiavi.'])}
      ${TIP(`<p><i>Can you…?</i> = puoi…? <b>Could you…?</b> = potresti…? Con chi non conosci, usa <i>could</i>: è come passare dal "tu" al "Lei".</p>`)}` },
    { h: "L'imperativo", b: `
      <p>Per dire a qualcuno di fare una cosa si usa il <b>verbo da solo</b>, senza <i>you</i> davanti. Vale sia per "tu" sia per "voi".</p>
      ${EX(['Open the window.', 'Apri / aprite la finestra.'], ['Sit down, please.', 'Siediti, per favore.'])}
      <p>Per dire di <b>non</b> farla, metti <b>don't</b> davanti (anche con <i>be</i>):</p>
      ${EX(["<b>Don't</b> touch it!", 'Non toccarlo!'], ["<b>Don't be</b> late.", 'Non fare tardi.'])}
      <p>Per proporre di fare una cosa insieme ("andiamo!", "mangiamo!") metti <b>let's</b> davanti:</p>
      ${EX(["<b>Let's</b> go!", 'Andiamo!'], ["<b>Let's</b> not argue.", 'Non litighiamo.'])}
      ${N("<p>L'imperativo da solo può sembrare un ordine secco. Con le persone che non conosci aggiungi <i>please</i> o usa <i>Could you…?</i></p>")}
      ${TIP(`<p>Tre forme, tre parole:</p><ul><li>fai! → <b>verbo</b> (<i>Open!</i>)</li><li>non fare! → <b>don't</b> + verbo (<i>Don't open!</i>)</li><li>facciamo! → <b>let's</b> + verbo (<i>Let's open!</i>)</li></ul>`)}` },
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
