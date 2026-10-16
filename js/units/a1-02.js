UNIT({
  id: 'a1-02', n: 2, level: 'A1', stop: 'Articoli',
  title: 'Articoli, plurali, <i>this</i> e <i>that</i>',
  sub: 'a / an / the, quando non si usa l\'articolo, plurali regolari e irregolari',
  intro: "In italiano gli articoli sono tanti (il, lo, la, un, una…), in inglese sono solo tre: <b>a</b>, <b>an</b> e <b>the</b>. Sono facili da scegliere, ma l'inglese li usa meno di noi: a volte dove noi mettiamo l'articolo, loro non mettono niente.",
  theory: [
    { h: 'A o an: conta il suono', b: `
      <p><b>A</b> e <b>an</b> vogliono dire <b>un / una</b>, sia al maschile sia al femminile. Per scegliere fra i due <b>non guardare la lettera, ascolta il suono</b> con cui comincia la parola dopo:</p>
      <ul><li>se la parola comincia con il suono di una <b>consonante</b>, usi <b>a</b>: <i>a book, a car</i>;</li><li>se comincia con il suono di una <b>vocale</b> (a, e, i, o, u), usi <b>an</b>: <i>an apple, an egg</i>.</li></ul>
      <p>Di solito suono e lettera coincidono. Ci sono però parole che si scrivono in un modo e si pronunciano in un altro:</p>
      ${T(['a + suono consonantico', 'an + suono vocalico'], [['a book, a car', 'an apple, an egg'], ['a <b>u</b>niversity (si dice "iuniversity")', 'an <b>h</b>our (l\'h non si sente)'], ['a <b>E</b>uropean (si dice "iuropean")', 'an <b>h</b>onest man'], ['a <b>o</b>ne-way ticket (si dice "uan")', 'an <b>u</b>mbrella']], 'plain')}
      <p>Quando dici che lavoro fa qualcuno, l'inglese mette sempre <i>a / an</i>, anche se in italiano non c'è:</p>
      ${EX(["She's <b>a</b> doctor.", 'Fa il medico. / È medico.'], ["I'm <b>an</b> engineer.", 'Sono ingegnere.'])}
      ${TIP(`<p>Prova a dire "a apple": la lingua si inceppa fra le due vocali. La <b>n</b> di <b>an</b> serve proprio a far scorrere la voce: <i>an apple</i>.</p><p>Quindi fidati dell'orecchio, non degli occhi: <i>an hour</i> (l'h non si sente), <i>a university</i> (si sente "iu").</p>`)}` },
    { h: 'The, e quando non si mette', b: `
      <p><b>The</b> vuol dire il, lo, la, i, gli, le: è uno solo per tutto. Si usa quando parli di una cosa <b>precisa</b>, che chi ascolta sa già qual è.</p>
      ${EX(['Close <b>the</b> door, please.', 'Chiudi la porta, per favore.'], ['<b>The</b> film was great.', 'Il film era bellissimo.'])}
      <p>La grande differenza con l'italiano: <b>quando parli di una cosa in generale, in inglese l'articolo non si mette</b>.</p>
      ${EX(['I like music.', 'Mi piace la musica.'], ['Dogs are loyal.', 'I cani sono fedeli.'], ['Life is short.', 'La vita è breve.'], ['Money is important.', 'I soldi sono importanti.'])}
      <p>Confronta: <i>I like <b>the</b> music in this film</i> (proprio la musica di questo film) e <i>I like music</i> (la musica in generale, tutta).</p>
      ${N(`<p>L'articolo non si mette nemmeno:</p><ul><li>prima di <i>my, your, his…</i>: <i>my car</i>, mai <i>the my car</i>;</li><li>con le lingue e gli sport: <i>English is easy, I play football</i>;</li><li>con i pasti: <i>have lunch</i>;</li><li>in alcune espressioni fisse: <i>at home, at work, in bed, to school</i>.</li></ul>`)}
      ${TIP(`<p>Chiediti: <b>"Quale?"</b> Se sai rispondere (quella porta lì, il film di ieri sera), metti <b>the</b>. Se la risposta è "tutti, in generale" (i cani, la musica, la vita), <b>niente articolo</b>.</p>`)}` },
    { h: 'I plurali', b: `
      <p>Per fare il plurale di solito basta aggiungere <b>-s</b>: <i>book → books</i>. Alcune parole cambiano un po' quando si scrivono, e poche altre sono irregolari: quelle vanno imparate a memoria.</p>
      ${T(['Regola', 'Esempi'], [['quasi tutti: + s', 'book → books, car → cars'], ['-s, -ss, -sh, -ch, -x: + es', 'bus → buses, glass → glasses, box → boxes, watch → watches'], ['alcuni in -o: + es', 'potato → potatoes, tomato → tomatoes (ma photos, pianos)'], ['consonante + y: -ies', 'city → cities, baby → babies (ma day → days)'], ['molti in -f / -fe: -ves', 'knife → knives, wife → wives, half → halves, life → lives']], 'plain')}
      ${T(['Singolare', 'Plurale irregolare'], [['man', 'men'], ['woman', 'women'], ['child', 'children'], ['person', 'people'], ['foot', 'feet'], ['tooth', 'teeth'], ['mouse', 'mice'], ['fish · sheep', 'fish · sheep (uguale)']])}
      ${N(`<p><b>People</b> (le persone, la gente) è plurale: <i>People are friendly</i>, non <i>people is</i>. Al contrario <b>news</b> (le notizie) va col singolare anche se finisce in -s: <i>The news is good</i>. Sono sempre plurali <i>jeans, trousers</i> (pantaloni), <i>glasses</i> (occhiali), <i>scissors</i> (forbici): come in italiano "i pantaloni".</p>`)}
      ${TIP(`<p>La <b>-es</b> serve per riuscire a pronunciare il plurale: prova a dire "boxs" o "watchs", non si riesce. Con <i>-s, -sh, -ch, -x</i> ci vuole una sillaba in più: <i>boxes, watches</i>.</p><p>Gli irregolari più comuni sono le persone: <b>man → men, woman → women, child → children, person → people</b>. Imparali insieme, come una famiglia.</p>`)}` },
    { h: 'This, that, these, those', b: `
      <p>Sono le parole per indicare le cose. Dipendono da due domande: <b>è vicino o lontano?</b> <b>È uno o sono tanti?</b></p>
      ${T(['', 'vicino', 'lontano'], [['singolare', 'this (questo/a)', 'that (quello/a)'], ['plurale', 'these (questi/e)', 'those (quelli/e)']])}
      ${EX(['<b>This</b> coffee is cold.', 'Questo caffè è freddo.'], ['<b>Those</b> shoes are nice.', 'Quelle scarpe sono belle.'], ["<b>That</b>'s a good idea.", 'È una buona idea.'], ['<b>These</b> are my children.', 'Questi sono i miei figli.'])}
      ${N("<p><i>That's…</i> si usa tantissimo per commentare quello che qualcuno ha appena detto: <i>That's true</i> (è vero), <i>That's strange</i> (strano), <i>That's why…</i> (ecco perché…).</p>")}
      ${TIP(`<p><b>This</b> e <b>these</b> = <b>qui</b>, vicino a te. <b>That</b> e <b>those</b> = <b>là</b>, lontano.</p><p>These e those sono le parole <b>più lunghe</b>, perché indicano <b>più cose</b>. Questi = these, quelli = those.</p>`)}` },
    { h: 'Errori tipici', b: ERR(
      ['She is teacher.', 'She is a teacher.', "Con le professioni l'articolo indeterminativo è obbligatorio."],
      ['The life is beautiful.', 'Life is beautiful.', 'Si parla in generale: niente articolo.'],
      ['The news are bad.', 'The news is bad.', 'News è singolare.'],
      ['My friends are at the home.', 'My friends are at home.', 'At home è un\'espressione fissa senza articolo.'],
      ['I have a informations.', 'I have some information.', 'Information non ha plurale e non vuole a/an.']) },
  ],
  exercises: [
    { t: 'c', q: "It's ___ old house.", o: ['a', 'an'], a: 'an', why: 'Old comincia con suono vocalico.' },
    { t: 'c', q: 'She is ___ university student.', o: ['a', 'an'], a: 'a', why: 'University si pronuncia /ju:/, un suono consonantico.' },
    { t: 'c', q: 'We waited for ___ hour.', o: ['a', 'an'], a: 'an', why: "In hour l'h è muta: il suono iniziale è vocalico." },
    { t: 'c', q: 'I love ___ music.', o: ['the', 'a', '— (nessun articolo)'], a: '— (nessun articolo)', why: 'Si parla della musica in generale: niente articolo.' },
    { t: 'c', q: '___ shoes over there are mine.', o: ['This', 'That', 'These', 'Those'], a: 'Those', why: 'Plurale e lontano (over there): those.' },
    { t: 'c', q: 'The people here ___ very friendly.', o: ['is', 'are'], a: 'are', why: 'People è plurale.' },
    { t: 'f', q: 'one child, two ___', a: ['children'] },
    { t: 'f', q: 'one city, three ___', a: ['cities'] },
    { t: 'f', q: 'one knife, two ___', a: ['knives'] },
    { t: 'f', q: 'a box, two ___', a: ['boxes'] },
    { t: 'f', q: 'one person, four ___', a: ['people'] },
    { t: 'f', q: 'one day, seven ___', a: ['days'], why: 'Vocale + y: si aggiunge solo -s.' },
    { t: 'x', q: 'She is teacher.', a: ['She is a teacher.', "She's a teacher."] },
    { t: 'x', q: 'The life is beautiful.', a: ['Life is beautiful.'] },
    { t: 'x', q: 'The news are bad.', a: ['The news is bad.'] },
    { t: 'x', q: 'My friends are at the home.', a: ['My friends are at home.'] },
    { t: 't', it: 'Questi bambini sono stanchi.', a: ['These children are tired.', 'These kids are tired.'] },
    { t: 't', it: "Quella donna è un'avvocata.", a: ['That woman is a lawyer.', 'That woman is a solicitor.', 'That woman is an attorney.'], sec: 'A o an: conta il suono' },
    { t: 't', it: 'I cani sono animali intelligenti.', a: ['Dogs are intelligent animals.', 'Dogs are clever animals.', 'Dogs are smart animals.'], why: 'Parlando dei cani in generale non si usa the.' },
    { t: 'o', it: 'Quelle persone sono inglesi.', a: ['Those people are English.'] },
  ],
});
