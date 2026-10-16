UNIT({
  id: 'a1-03', n: 3, level: 'A1', stop: 'Possesso',
  title: 'Possesso: <i>my</i>, <i>mine</i>, <i>\'s</i> e <i>have got</i>',
  sub: 'Aggettivi e pronomi possessivi, genitivo sassone, have got',
  intro: "Come si dice di chi è una cosa: <i>my, your, his…</i>, <i>mine, yours…</i>, la <i>'s</i> di <i>Marco's car</i> e <i>have got</i> (avere). Attenzione a un punto in cui l'inglese ragiona al contrario dell'italiano: conta chi possiede, non la cosa posseduta.",
  theory: [
    { h: 'Aggettivi possessivi', b: `
      <p>Sono le parole <b>mio, tuo, suo…</b> che vanno davanti a una cosa: <i>my phone</i> (il mio telefono).</p>
      ${T(['Soggetto', 'Possessivo', 'Esempio'], [['I', 'my', 'my phone'], ['you', 'your', 'your bag'], ['he', 'his', 'his car'], ['she', 'her', 'her car'], ['it', 'its', 'its name'], ['we', 'our', 'our house'], ['you', 'your', 'your teacher'], ['they', 'their', 'their children']])}
      <p>In italiano diciamo "<b>suo</b> fratello" e "<b>sua</b> moglie": cambia secondo la cosa. In inglese invece conta <b>chi è il padrone</b>:</p>
      <ul><li><b>his</b> se il padrone è un <b>uomo</b>;</li><li><b>her</b> se il padrone è una <b>donna</b>;</li><li><b>their</b> se i padroni sono <b>più persone</b>.</li></ul>
      ${EX(['Marco loves <b>his</b> wife.', 'Marco ama sua moglie.'], ['Giulia is with <b>her</b> brother.', 'Giulia è con suo fratello.'], ['The dog is in <b>its</b> bed.', 'Il cane è nella sua cuccia.'])}
      ${N("<p>Davanti a <i>my, your, his…</i> non si mette mai <i>the</i>: <i>my car</i>, non <i>the my car</i>.</p><p>Non confondere <b>its</b> (suo, di una cosa o di un animale) con <b>it's</b> (= it is, è): si pronunciano uguali ma si scrivono diversi.</p>")}
      ${TIP(`<p>Prima di scegliere, chiediti: <b>"Di chi è?"</b> Di Marco → <b>his</b>. Di Giulia → <b>her</b>. Il fratello, la moglie, la macchina non contano.</p><p><b>His</b> comincia come <b>he</b>: è "di lui". <b>Her</b> è la stessa parola di <i>I love her</i> (amo lei): è "di lei".</p>`)}` },
    { h: 'Pronomi possessivi', b: `
      <p>Quando dici "è <b>mio</b>" senza ripetere la cosa, in inglese usi un'altra parola: <b>mine, yours, his, hers, ours, yours, theirs</b>. Anche qui niente <i>the</i>.</p>
      ${EX(['This book is <b>mine</b>.', 'Questo libro è mio.'], ['Is this yours?', 'È tuo questo?'], ["It isn't my bag, it's <b>hers</b>.", 'Non è la mia borsa, è sua.'])}
      ${TIP(`<p><b>my</b> + cosa (<i>my book</i>). <b>mine</b> da solo, alla fine (<i>it's mine</i>).</p><p>Quasi tutti finiscono con la <b>-s</b>: your<b>s</b>, her<b>s</b>, our<b>s</b>, their<b>s</b>. Fa eccezione solo <b>mine</b>, e <b>his</b> che ha già la sua s.</p>`)}` },
    { h: "Il genitivo sassone: 's", b: `
      <p>Per dire "la macchina <b>di</b> Anna", l'inglese non dice "the car of Anna". Mette <b>prima la persona</b>, poi <b>'s</b>, poi la cosa: <i>Anna's car</i>.</p>
      ${T(['Possessore', 'Forma', 'Esempio'], [['singolare', "+ 's", "Anna<b>'s</b> car, my father<b>'s</b> job"], ['plurale in -s', "+ '", "my parents<b>'</b> house"], ['plurale irregolare', "+ 's", "the children<b>'s</b> toys, people<b>'s</b> opinions"]], 'plain')}
      ${EX(["This is my brother's room.", 'Questa è la camera di mio fratello.'], ["Whose jacket is this? — It's Luca's.", 'Di chi è questa giacca? — È di Luca.'])}
      ${N("<p>Con le cose (non con le persone) di solito si usa <b>of</b>, come in italiano: <i>the end of the film</i> (la fine del film). Per chiedere \"di chi è?\" si usa <b>whose</b>.</p>")}
      ${TIP(`<p>Leggi la frase italiana <b>al contrario</b>: "la macchina di Anna" → <b>Anna → 's → car</b>. Prima il padrone, poi la sua cosa.</p><p>Se il padrone finisce già con la <b>-s</b> perché è un plurale (<i>parents</i>), basta l'apostrofo: <i>my parents' house</i>.</p>`)}` },
    { h: 'Have got', b: `
      <p><b>Have got</b> vuol dire semplicemente <b>avere</b>. Si usa tanto nell'inglese britannico per dire cosa hai, i tuoi parenti, com'è il tuo aspetto e se hai un malanno.</p>
      ${T(['Affermativa', 'Negativa', 'Domanda'], [["I've got", "I haven't got", 'Have I got...?'], ["you've got", "you haven't got", 'Have you got...?'], ["he/she/it's got", "he/she/it hasn't got", 'Has he/she/it got...?'], ["we/they've got", "we/they haven't got", 'Have we/they got...?']], 'plain')}
      ${EX(["I've got two sisters.", 'Ho due sorelle.'], ["She's got blue eyes.", 'Ha gli occhi azzurri.'], ["Have you got a car? — No, I haven't.", 'Hai la macchina? — No.'], ["He's got a cold.", 'Ha il raffreddore.'])}
      ${N("<p>In <i>she's got</i> la <b>'s</b> vuol dire <b>has</b>, non is.</p><p>Al posto di <i>have got</i> si può usare anche solo <b>have</b> (<i>I have two sisters</i>, <i>Do you have a car?</i>): è più americano e lo vedi bene alla fermata del present simple.</p>")}
      ${TIP(`<p>Con <b>he, she, it</b> si usa <b>has</b> got, con tutti gli altri <b>have</b> got: è la stessa regola della -s che vedrai al present simple.</p><p>Nella domanda <i>have</i> va davanti, come <i>be</i>: <i>you have got</i> → <i>Have you got…?</i></p>`)}` },
    { h: 'Errori tipici', b: ERR(
      ['The car of my father is red.', "My father's car is red.", "Con le persone si usa il genitivo sassone."],
      ['This bag is the mine.', 'This bag is mine.', "Il pronome possessivo non vuole articolo."],
      ['Marco and her wife', 'Marco and his wife', 'Il possessore è Marco, un uomo: his.'],
      ["The cat is in it's bed.", 'The cat is in its bed.', "It's = it is. Il possessivo è its."],
      ['I have got 30 years.', "I'm 30.", "L'età si dice con be (unità 1)."]) },
  ],
  exercises: [
    { t: 'c', q: 'Marco loves ___ wife.', o: ['his', 'her', 'its'], a: 'his', why: 'Il possessore è Marco, quindi his.' },
    { t: 'c', q: 'Giulia is with ___ brother.', o: ['his', 'her', 'their'], a: 'her', why: 'Il possessore è Giulia: her, anche se il fratello è maschio.' },
    { t: 'c', q: '___ a beautiful day.', o: ['Its', "It's"], a: "It's", why: "Serve it is: it's." },
    { t: 'c', q: 'The company changed ___ name.', o: ['its', "it's", 'his'], a: 'its' },
    { t: 'c', q: '"Is this your phone?" "Yes, it\'s ___."', o: ['my', 'mine', 'me'], a: 'mine', sec: 'Pronomi possessivi' },
    { t: 'c', q: '___ bag is this?', o: ['Who', 'Whose', "Who's"], a: 'Whose', why: 'Di chi = whose.' },
    { t: 'f', q: "This is my ___ house.", h: 'la casa dei miei genitori', a: ["parents'"], why: "Parents finisce già in -s: si aggiunge solo l'apostrofo." },
    { t: 'f', q: "These are the ___ toys.", h: 'i giocattoli dei bambini', a: ["children's"], why: "Children è un plurale irregolare senza -s: si aggiunge 's." },
    { t: 'f', q: 'She ___ two sisters.', h: 'have got', a: ['has got', "'s got"] },
    { t: 'f', q: '___ you got a car?', a: ['Have'] },
    { t: 'f', q: 'We ___ a garden.', h: 'have got, negativa', a: ["haven't got", 'have not got'] },
    { t: 'x', q: 'The car of my father is red.', a: ["My father's car is red.", "My dad's car is red."] },
    { t: 'x', q: 'This bag is the mine.', a: ['This bag is mine.'] },
    { t: 'x', q: 'Has she got a brother? Yes, she has got.', a: ['Has she got a brother? Yes, she has.', 'Yes, she has.'], why: 'Nella risposta breve si ripete solo has.' },
    { t: 't', it: 'Di chi è questa giacca?', a: ['Whose jacket is this?', 'Whose is this jacket?'] },
    { t: 't', it: 'Lui ha due figli.', a: ["He's got two children.", 'He has two children.', "He's got two sons.", 'He has two sons.', "He's got two kids.", 'He has two kids.'] },
    { t: 't', it: 'Il loro appartamento è piccolo.', a: ['Their flat is small.', 'Their apartment is small.'] },
    { t: 't', it: 'La camera di mia sorella è grande.', a: ["My sister's room is big.", "My sister's bedroom is big.", "My sister's room is large.", "My sister's bedroom is large."] },
    { t: 'o', it: 'Hai un fratello?', a: ['Have you got a brother?'] },
    { t: 'o', it: 'Questa non è la mia borsa, è sua (di lei).', a: ['This is not my bag, it is hers.'] },
  ],
});
