UNIT({
  id: 'a1-02', n: 2, level: 'A1',
  title: 'Articoli, plurali, <i>this</i> e <i>that</i>',
  sub: 'a / an / the, quando non si usa l\'articolo, plurali regolari e irregolari',
  intro: "L'inglese ha meno articoli dell'italiano ma li usa con regole diverse: dove noi lo mettiamo sempre, spesso loro non lo mettono affatto. Qui si vede quando sì e quando no.",
  theory: [
    { h: 'A o an: conta il suono', b: `
      <p>L'articolo indeterminativo è uno solo, non cambia per maschile e femminile. Diventa <b>an</b> davanti a un <b>suono</b> vocalico, non a una lettera vocale.</p>
      ${T(['a + suono consonantico', 'an + suono vocalico'], [['a book, a car', 'an apple, an egg'], ['a <b>u</b>niversity (/ju/)', 'an <b>h</b>our (h muta)'], ['a <b>E</b>uropean (/ju/)', 'an <b>h</b>onest man'], ['a <b>o</b>ne-way ticket (/w/)', 'an <b>u</b>mbrella']], 'plain')}
      <p>Davanti alle professioni l'inglese mette sempre l'articolo, anche dove l'italiano lo toglie:</p>
      ${EX(["She's <b>a</b> doctor.", 'Fa il medico. / È medico.'], ["I'm <b>an</b> engineer.", 'Sono ingegnere.'])}` },
    { h: 'The, e quando non si mette', b: `
      <p><b>The</b> è l'articolo determinativo, unico per tutti i generi e i numeri (il, lo, la, i, gli, le). Si usa quando si parla di qualcosa di specifico, che chi ascolta sa già quale sia.</p>
      ${EX(['Close <b>the</b> door, please.', 'Chiudi la porta, per favore.'], ['<b>The</b> film was great.', 'Il film era bellissimo.'])}
      <p>La differenza grossa con l'italiano: <b>quando si parla in generale non si usa l'articolo</b>.</p>
      ${EX(['I like music.', 'Mi piace la musica.'], ['Dogs are loyal.', 'I cani sono fedeli.'], ['Life is short.', 'La vita è breve.'], ['Money is important.', 'I soldi sono importanti.'])}
      <p>Confronta: <i>I like <b>the</b> music in this film</i> (proprio questa musica) e <i>I like music</i> (la musica in generale).</p>
      ${N(`<p>Niente articolo anche con: possessivi (<i>my car</i>, mai <i>the my car</i>), lingue (<i>English is easy</i>), sport (<i>I play football</i>), pasti (<i>have lunch</i>), e in espressioni fisse come <i>at home, at work, in bed, to school</i>.</p>`)}` },
    { h: 'I plurali', b: `
      <p>Di solito basta aggiungere <b>-s</b>. Ci sono però regole di scrittura e qualche plurale irregolare da imparare.</p>
      ${T(['Regola', 'Esempi'], [['quasi tutti: + s', 'book → books, car → cars'], ['-s, -ss, -sh, -ch, -x: + es', 'bus → buses, glass → glasses, box → boxes, watch → watches'], ['alcuni in -o: + es', 'potato → potatoes, tomato → tomatoes (ma photos, pianos)'], ['consonante + y: -ies', 'city → cities, baby → babies (ma day → days)'], ['molti in -f / -fe: -ves', 'knife → knives, wife → wives, half → halves, life → lives']], 'plain')}
      ${T(['Singolare', 'Plurale irregolare'], [['man', 'men'], ['woman', 'women'], ['child', 'children'], ['person', 'people'], ['foot', 'feet'], ['tooth', 'teeth'], ['mouse', 'mice'], ['fish · sheep', 'fish · sheep (uguale)']])}
      ${N(`<p><b>People</b> è plurale: <i>People are friendly</i>, non <i>people is</i>. Al contrario <b>news</b> è singolare anche se finisce in -s: <i>The news is good</i>. Sono sempre plurali <i>jeans, trousers, glasses</i> (occhiali), <i>scissors</i>.</p>`)}` },
    { h: 'This, that, these, those', b: `
      ${T(['', 'vicino', 'lontano'], [['singolare', 'this (questo/a)', 'that (quello/a)'], ['plurale', 'these (questi/e)', 'those (quelli/e)']])}
      ${EX(['<b>This</b> coffee is cold.', 'Questo caffè è freddo.'], ['<b>Those</b> shoes are nice.', 'Quelle scarpe sono belle.'], ["<b>That</b>'s a good idea.", 'È una buona idea.'], ['<b>These</b> are my children.', 'Questi sono i miei figli.'])}
      ${N("<p><i>That's...</i> si usa spessissimo per commentare qualcosa che è appena stato detto: <i>That's true, That's strange, That's why...</i></p>")}` },
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
    { t: 't', it: "Quella donna è un'avvocata.", a: ['That woman is a lawyer.', 'That woman is a solicitor.', 'That woman is an attorney.'] },
    { t: 't', it: 'I cani sono animali intelligenti.', a: ['Dogs are intelligent animals.', 'Dogs are clever animals.', 'Dogs are smart animals.'], why: 'Parlando dei cani in generale non si usa the.' },
    { t: 'o', it: 'Quelle persone sono inglesi.', a: ['Those people are English.'] },
  ],
});
