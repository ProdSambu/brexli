UNIT({
  id: 'a1-03', n: 3, level: 'A1', stop: 'Possesso',
  title: 'Possesso: <i>my</i>, <i>mine</i>, <i>\'s</i> e <i>have got</i>',
  sub: 'Aggettivi e pronomi possessivi, genitivo sassone, have got',
  intro: "Dire di chi è una cosa sembra banale, ma qui l'inglese ragiona al contrario dell'italiano: il possessivo dipende da chi possiede, non dalla cosa posseduta.",
  theory: [
    { h: 'Aggettivi possessivi', b: `
      ${T(['Soggetto', 'Possessivo', 'Esempio'], [['I', 'my', 'my phone'], ['you', 'your', 'your bag'], ['he', 'his', 'his car'], ['she', 'her', 'her car'], ['it', 'its', 'its name'], ['we', 'our', 'our house'], ['you', 'your', 'your teacher'], ['they', 'their', 'their children']])}
      <p>In italiano "suo/sua" si accorda con la cosa posseduta. In inglese conta <b>chi possiede</b>: <i>his</i> se è un uomo, <i>her</i> se è una donna, qualunque sia la cosa.</p>
      ${EX(['Marco loves <b>his</b> wife.', 'Marco ama sua moglie.'], ['Giulia is with <b>her</b> brother.', 'Giulia è con suo fratello.'], ['The dog is in <b>its</b> bed.', 'Il cane è nella sua cuccia.'])}
      ${N("<p>Il possessivo non vuole mai l'articolo: <i>my car</i>, non <i>the my car</i>. E attenzione a <b>its</b> (suo, di una cosa) e <b>it's</b> (= it is): suonano uguali, si scrivono diversi.</p>")}` },
    { h: 'Pronomi possessivi', b: `
      <p>Quando il possessivo sostituisce la cosa, si usa il pronome: <b>mine, yours, his, hers, ours, yours, theirs</b>. Anche qui niente articolo.</p>
      ${EX(['This book is <b>mine</b>.', 'Questo libro è mio.'], ['Is this yours?', 'È tuo questo?'], ["It isn't my bag, it's <b>hers</b>.", 'Non è la mia borsa, è sua.'])}` },
    { h: "Il genitivo sassone: 's", b: `
      <p>Per dire che qualcosa appartiene a una persona, l'inglese non usa "the car of Anna" ma mette il possessore davanti con <b>'s</b>.</p>
      ${T(['Possessore', 'Forma', 'Esempio'], [['singolare', "+ 's", "Anna<b>'s</b> car, my father<b>'s</b> job"], ['plurale in -s', "+ '", "my parents<b>'</b> house"], ['plurale irregolare', "+ 's", "the children<b>'s</b> toys, people<b>'s</b> opinions"]], 'plain')}
      ${EX(["This is my brother's room.", 'Questa è la camera di mio fratello.'], ["Whose jacket is this? — It's Luca's.", 'Di chi è questa giacca? — È di Luca.'])}
      ${N("<p>Con le cose (non persone) di solito si usa <b>of</b>: <i>the end of the film, the top of the page</i>. La domanda \"di chi?\" è <b>whose</b>.</p>")}` },
    { h: 'Have got', b: `
      <p>Per il possesso, le relazioni familiari, l'aspetto fisico e i malanni, nell'inglese britannico si usa molto <b>have got</b>. Significa semplicemente "avere".</p>
      ${T(['Affermativa', 'Negativa', 'Domanda'], [["I've got", "I haven't got", 'Have I got...?'], ["you've got", "you haven't got", 'Have you got...?'], ["he/she/it's got", "he/she/it hasn't got", 'Has he/she/it got...?'], ["we/they've got", "we/they haven't got", 'Have we/they got...?']], 'plain')}
      ${EX(["I've got two sisters.", 'Ho due sorelle.'], ["She's got blue eyes.", 'Ha gli occhi azzurri.'], ["Have you got a car? — No, I haven't.", 'Hai la macchina? — No.'], ["He's got a cold.", 'Ha il raffreddore.'])}
      ${N("<p>In <i>she's got</i> la <b>'s</b> sta per <b>has</b>, non per is. In alternativa si può usare <b>have</b> da solo (<i>I have two sisters</i>, <i>Do you have a car?</i>), più comune nell'inglese americano: lo vediamo con il present simple. <i>Have got</i> esiste solo al presente.</p>")}` },
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
    { t: 'c', q: '"Is this your phone?" "Yes, it\'s ___."', o: ['my', 'mine', 'me'], a: 'mine' },
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
