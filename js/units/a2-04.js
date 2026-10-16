UNIT({
  id: 'a2-04', n: 4, level: 'A2', stop: 'Perfect o past?',
  title: 'Present perfect o past simple?',
  sub: 'La domanda da farsi: il tempo è finito?',
  intro: "Il nostro \"ho fatto\" in inglese a volte è present perfect (<i>I've done</i>), a volte past simple (<i>I did</i>). Per scegliere basta <b>una domanda sola</b>: vale la pena ripetersela finché diventa automatica.",
  theory: [
    { h: 'La domanda da farsi', b: `
      <p>Prima di scegliere, chiediti: <b>il tempo di cui parlo è finito?</b></p>
      <ul><li><b>Sì</b>, è finito (ieri, la settimana scorsa, nel 2019) → <b>past simple</b>: <i>I saw him yesterday</i>.</li><li><b>No</b>, non è finito, oppure non dico quando → <b>present perfect</b>: <i>I've seen him three times this week</i>.</li></ul>
      ${T(['Past simple', 'Present perfect'], [['tempo finito, detto o sottinteso', 'tempo non detto, o periodo non ancora finito'], ['yesterday, last week, in 2019, two days ago, when I was a child', 'ever, never, just, already, yet, so far, for, since'], ['<b>I saw</b> him yesterday.', "<b>I've seen</b> him three times this week."], ['<b>Did</b> you <b>see</b> the match on Sunday?', '<b>Have</b> you <b>seen</b> the match? (non importa quando)']], 'plain')}
      ${N('<p>Le domande con <b>When…?</b> (quando?) chiedono un momento preciso, quindi vogliono sempre il past simple: <i>When did you arrive?</i>, mai <i>When have you arrived?</i></p>')}
      ${TIP(`<p>Pensa a una <b>porta</b>: se il tempo è chiuso (ieri, nel 2019, tre giorni fa) la porta è chiusa → <b>past simple</b>. Se la porta è ancora aperta (oggi, questa settimana, nella vita, mai) → <b>present perfect</b>.</p>`)}` },
    { h: 'Today, this week, this year', b: `
      <p><i>Today</i> (oggi), <i>this week</i> (questa settimana), <i>this year</i> (quest'anno) non sono ancora finiti: ci sei dentro. Per questo vogliono il present perfect.</p>
      ${EX(["I've drunk three coffees <b>today</b>.", 'Oggi ho bevuto tre caffè.'], ["We haven't had a holiday <b>this year</b>.", "Quest'anno non abbiamo fatto vacanze."])}
      <p><i>This morning</i> (stamattina) dipende da che ora è: alle dieci di mattina dici <i>I've had two coffees this morning</i>; alle cinque del pomeriggio la mattina è finita, quindi <i>I had two coffees this morning</i>.</p>
      ${TIP(`<p>Guarda l'orologio: <b>sei ancora dentro</b> quel periodo? Allora è present perfect. Ne sei già uscito? Past simple.</p>`)}` },
    { h: 'Come va una conversazione', b: `
      <p>Di solito si comincia con il present perfect (la notizia, l'esperienza) e poi si continua con il past simple (i dettagli: quando, dove, com'era).</p>
      ${EX(['Have you ever been to Japan?', 'Sei mai stato in Giappone?'], ['Yes, I have. I went there in 2018.', 'Sì. Ci sono andato nel 2018.'], ['Really? Did you like it?', 'Davvero? Ti è piaciuto?'], ['I loved it. The food was amazing.', 'Moltissimo. Il cibo era fantastico.'])}
      ${TIP(`<p>Come un titolo di giornale e il suo articolo: il <b>titolo</b> è present perfect ("<i>I've been to Japan!</i>"), l'<b>articolo</b> con i dettagli è past simple ("<i>I went in 2018, it was amazing</i>").</p>`)}` },
    { h: 'Persone e periodi del passato', b: `
      <p>Se la persona non c'è più, o se quel periodo della vita è chiuso, si usa il past simple anche senza dire una data.</p>
      ${EX(['Shakespeare <b>wrote</b> 39 plays.', 'Shakespeare ha scritto 39 opere teatrali.'], ['My grandfather <b>worked</b> in a factory.', 'Mio nonno ha lavorato in fabbrica.'])}
      <p>Confronta: <i>My sister has worked in three countries</i> (mia sorella lavora ancora: la sua storia continua).</p>
      ${TIP(`<p>La storia di quella persona può ancora continuare? Sì → present perfect. No, è un capitolo chiuso → past simple.</p>`)}` },
    { h: 'Errori tipici', b: ERR(
      ["I've seen him yesterday.", 'I saw him yesterday.', 'Yesterday è un tempo finito.'],
      ['When have you bought it?', 'When did you buy it?', 'When vuole il past simple.'],
      ["I've been to Rome in 2020.", 'I went to Rome in 2020.', 'Con la data: past simple.'],
      ['Did you ever eat sushi?', 'Have you ever eaten sushi?', 'Esperienza nella vita: present perfect (in britannico).'],
      ["I've finished school ten years ago.", 'I finished school ten years ago.', 'Ago vuole il past simple.']) },
  ],
  exercises: [
    { t: 'c', q: 'I ___ him yesterday.', o: ['saw', 'have seen'], a: 'saw' },
    { t: 'c', q: '___ you ever ___ to Scotland?', o: ['Have / been', 'Did / go', 'Were / been'], a: 'Have / been' },
    { t: 'c', q: 'When ___ the film start?', o: ['did', 'has', 'have'], a: 'did', why: 'When chiede un momento: past simple.' },
    { t: 'c', q: '___ three cups of coffee today.', o: ["I've had", 'I had'], a: "I've had", why: 'Today non è finito.' },
    { t: 'c', q: 'Mozart ___ more than 600 pieces of music.', o: ['wrote', 'has written'], a: 'wrote', why: 'Mozart non c\'è più: past simple.' },
    { t: 'c', q: '"Have you seen my glasses?" "Yes, I ___ them on the table an hour ago."', o: ['saw', 'have seen'], a: 'saw' },
    { t: 'c', q: "We ___ in Rome when I was a child.", o: ['lived', 'have lived'], a: 'lived' },
    { t: 'f', q: 'She ___ to Paris last month.', h: 'go', a: ['went'] },
    { t: 'f', q: 'I ___ this book. It\'s great!', h: 'just / finish', a: ['have just finished', "'ve just finished"] },
    { t: 'f', q: 'When ___ you arrive?', a: ['did'] },
    { t: 'f', q: 'They ___ married in 2012.', h: 'get', a: ['got'] },
    { t: 'x', q: "I've seen him yesterday.", a: ['I saw him yesterday.', 'Yesterday I saw him.'] },
    { t: 'x', q: 'When have you bought it?', a: ['When did you buy it?'] },
    { t: 'x', q: "I've finished school ten years ago.", a: ['I finished school ten years ago.'] },
    { t: 't', it: 'Hai mai visto un film di Fellini?', a: ['Have you ever seen a Fellini film?', 'Have you ever seen a film by Fellini?', 'Have you ever seen a Fellini movie?'] },
    { t: 't', it: "L'ho visto l'anno scorso.", a: ['I saw it last year.', 'I saw him last year.'] },
    { t: 't', it: 'Quando sei arrivato?', a: ['When did you arrive?', 'When did you get here?'] },
    { t: 't', it: 'Oggi ho lavorato molto.', a: ["I've worked a lot today.", "I've worked hard today.", "Today I've worked a lot."] },
    { t: 'o', it: 'Quando hai comprato questa giacca?', a: ['When did you buy this jacket?'] },
    { t: 'o', it: 'Non ho visto Luca questa settimana.', a: ["I haven't seen Luca this week."] },
  ],
});
