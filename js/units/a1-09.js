UNIT({
  id: 'a1-09', n: 9, level: 'A1',
  title: 'Il passato di <i>be</i>: <i>was</i> e <i>were</i>',
  sub: 'Ero, sono stato, c\'era; nascere; le espressioni di tempo passato',
  intro: "Il primo passo nel passato. Due sole forme, was e were, che coprono quello che in italiano è ero, fui, sono stato.",
  theory: [
    { h: 'Le forme', b: `
      ${T(['Affermativa', 'Negativa', 'Domanda'], [['I was', "I wasn't", 'Was I...?'], ['you were', "you weren't", 'Were you...?'], ['he / she / it was', "he / she / it wasn't", 'Was he / she / it...?'], ['we were', "we weren't", 'Were we...?'], ['they were', "they weren't", 'Were they...?']], 'plain')}
      <p><b>Was</b> per I, he, she, it. <b>Were</b> per you, we, they. Domande e negazioni funzionano come al presente: inversione e <i>not</i>, niente <i>do</i>.</p>
      ${EX(['I <b>was</b> at home yesterday.', 'Ieri ero a casa.'], ["The film <b>wasn't</b> very good.", 'Il film non era un granché.'], ['<b>Were</b> you tired? — Yes, I <b>was</b>.', 'Eri stanco? — Sì.'], ['Where <b>were</b> you last night?', 'Dove eri ieri sera?'])}` },
    { h: 'Un passato, tre tempi italiani', b: `
      <p>L'inglese usa <b>was / were</b> dove l'italiano sceglie tra imperfetto, passato prossimo e passato remoto.</p>
      ${EX(['It <b>was</b> cold.', 'Faceva freddo.'], ['I <b>was</b> in London last year.', "Sono stato a Londra l'anno scorso."], ['He <b>was</b> a great writer.', 'Fu / è stato un grande scrittore.'])}` },
    { h: 'Nascere: be born', b: `
      <p>"Nascere" in inglese si dice <b>be born</b>, e quando parli della tua nascita è sempre al passato. "Sono nato" non è <i>I am born</i>.</p>
      ${EX(['I <b>was born</b> in 1998.', 'Sono nato nel 1998.'], ['Where <b>were</b> you <b>born</b>?', 'Dove sei nato?'], ['My daughter <b>was born</b> in May.', 'Mia figlia è nata a maggio.'])}` },
    { h: 'There was, there were', b: `
      ${EX(['<b>There was</b> a lot of traffic.', "C'era molto traffico."], ['<b>There were</b> fifty people at the party.', "C'erano cinquanta persone alla festa."], ['<b>Was there</b> a problem?', "C'è stato un problema?"])}` },
    { h: 'Espressioni di tempo passato', b: `
      ${T(['Inglese', 'Italiano'], [['yesterday', 'ieri'], ['yesterday morning / afternoon', 'ieri mattina / pomeriggio'], ['last night', 'ieri sera, stanotte'], ['last week / month / year', 'la settimana / il mese / l\'anno scorso'], ['two days ago', 'due giorni fa'], ['in 2010', 'nel 2010']], 'plain')}
      ${N("<p><b>Ago</b> va <b>dopo</b> la durata: <i>three years ago</i> (tre anni fa). Non si dice <i>before three years</i>. E \"ieri sera\" è quasi sempre <i>last night</i>, non <i>yesterday night</i>.</p>")}` },
    { h: 'Errori tipici', b: ERR(
      ['I am born in 1998.', 'I was born in 1998.', 'Nascere è sempre al passato.'],
      ['Before two days I was ill.', 'I was ill two days ago.', 'Fa = ago, dopo la durata.'],
      ['You was right.', 'You were right.', 'Con you: were.'],
      ['Did you be at home?', 'Were you at home?', 'Be non usa did.'],
      ['Yesterday night', 'Last night', 'Ieri sera = last night.']) },
  ],
  exercises: [
    { t: 'c', q: 'I ___ at home yesterday.', o: ['was', 'were'], a: 'was' },
    { t: 'c', q: 'We ___ very tired last night.', o: ['was', 'were'], a: 'were' },
    { t: 'c', q: 'Where ___ you born?', o: ['are', 'were', 'did'], a: 'were', why: 'Nascere = be born, al passato.' },
    { t: 'c', q: 'There ___ a lot of people at the party.', o: ['was', 'were'], a: 'were', why: 'A lot of people è plurale.' },
    { t: 'c', q: 'I was in Spain two years ___.', o: ['ago', 'before', 'last'], a: 'ago' },
    { t: 'c', q: 'Where were you ___ night?', o: ['yesterday', 'last', 'ago'], a: 'last' },
    { t: 'f', q: 'The film ___ very good.', h: 'be, negativa', a: ["wasn't", 'was not'] },
    { t: 'f', q: '___ your parents at home?', a: ['Were'] },
    { t: 'f', q: 'It ___ cold yesterday.', a: ['was'] },
    { t: 'f', q: 'She ___ at school last week.', h: 'be, negativa', a: ["wasn't", 'was not'] },
    { t: 'f', q: '"Was the hotel nice?" "Yes, it ___."', a: ['was'] },
    { t: 'x', q: 'I am born in 1998.', a: ['I was born in 1998.'] },
    { t: 'x', q: 'Before two days I was ill.', a: ['I was ill two days ago.', 'Two days ago I was ill.'] },
    { t: 'x', q: 'You was right.', a: ['You were right.'] },
    { t: 't', it: 'Dove eri ieri sera?', a: ['Where were you last night?', 'Where were you yesterday evening?'] },
    { t: 't', it: 'Sono nata a Palermo.', a: ['I was born in Palermo.'] },
    { t: 't', it: "C'era molto traffico.", a: ['There was a lot of traffic.', 'There was lots of traffic.', 'There was heavy traffic.'] },
    { t: 't', it: 'Ieri faceva caldo.', a: ['It was hot yesterday.', 'Yesterday it was hot.', 'It was warm yesterday.', 'Yesterday it was warm.'] },
    { t: 'o', it: 'Non eravamo stanchi.', a: ['We were not tired.'] },
    { t: 'o', it: 'Sono stato a Londra tre anni fa.', a: ['I was in London three years ago.', 'Three years ago I was in London.'] },
  ],
});
