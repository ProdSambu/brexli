UNIT({
  id: 'a1-09', n: 9, level: 'A1', stop: 'Was e were',
  title: 'Il passato di <i>be</i>: <i>was</i> e <i>were</i>',
  sub: 'Ero, sono stato, c\'era; nascere; le espressioni di tempo passato',
  intro: "Il primo passo nel passato. <i>Be</i> al passato ha solo due forme, <b>was</b> e <b>were</b>, e valgono per \"ero\", \"sono stato\" e \"fui\": tre tempi italiani in uno.",
  theory: [
    { h: 'Le forme', b: `
      <p>Scegli come al presente:</p>
      <ul><li><b>was</b> con <b>I</b> e con <b>una persona o una cosa sola</b> (he, she, it);</li><li><b>were</b> con <b>you</b> e con <b>più persone o cose</b> (we, they).</li></ul>
      ${T(['Affermativa', 'Negativa', 'Domanda'], [['I was', "I wasn't", 'Was I...?'], ['you were', "you weren't", 'Were you...?'], ['he / she / it was', "he / she / it wasn't", 'Was he / she / it...?'], ['we were', "we weren't", 'Were we...?'], ['they were', "they weren't", 'Were they...?']], 'plain')}
      <p>Negativa e domanda come al presente: <i>not</i> dopo il verbo, e per la domanda le due parole si scambiano. Niente <i>do</i> né <i>did</i>.</p>
      ${EX(['I <b>was</b> at home yesterday.', 'Ieri ero a casa.'], ["The film <b>wasn't</b> very good.", 'Il film non era un granché.'], ['<b>Were</b> you tired? — Yes, I <b>was</b>.', 'Eri stanco? — Sì.'], ['Where <b>were</b> you last night?', 'Dove eri ieri sera?'])}
      ${TIP(`<p>Fai un passo indietro nel tempo: <b>am</b> e <b>is</b> diventano <b>was</b>, <b>are</b> diventa <b>were</b>.</p><p>Anche le lettere aiutano: <b>is</b> e <b>was</b> finiscono tutte e due con la <b>s</b>; <b>are</b> e <b>were</b> finiscono tutte e due con <b>-re</b>.</p>`)}` },
    { h: 'Un passato, tre tempi italiani', b: `
      <p>In italiano scegli tra "ero", "sono stato" e "fui". In inglese no: è sempre <b>was / were</b>.</p>
      ${EX(['It <b>was</b> cold.', 'Faceva freddo.'], ['I <b>was</b> in London last year.', "Sono stato a Londra l'anno scorso."], ['He <b>was</b> a great writer.', 'Fu / è stato un grande scrittore.'])}
      ${TIP(`<p>Ogni volta che in italiano c'è <b>essere al passato</b> (ero, eri, era, sono stato, fu…), in inglese c'è <b>was</b> o <b>were</b>. Non serve pensare a quale passato è.</p>`)}` },
    { h: 'Nascere: be born', b: `
      <p>"Nascere" in inglese si dice <b>be born</b> (letteralmente "essere nato"). Quando dici dove o quando sei nato è <b>sempre al passato</b>: "sono nato" è <i>I was born</i>, non <i>I am born</i>.</p>
      ${EX(['I <b>was born</b> in 1998.', 'Sono nato nel 1998.'], ['Where <b>were</b> you <b>born</b>?', 'Dove sei nato?'], ['My daughter <b>was born</b> in May.', 'Mia figlia è nata a maggio.'])}
      ${TIP(`<p>Sei nato <b>una volta, nel passato</b>: quindi <b>was</b> born. In italiano "sono nato" sembra presente, ma la nascita è già successa.</p>`)}` },
    { h: 'There was, there were', b: `
      <p>"C'era" si dice <b>there was</b>, "c'erano" si dice <b>there were</b>. È <i>there is / there are</i> della fermata 6, portato al passato.</p>
      ${EX(['<b>There was</b> a lot of traffic.', "C'era molto traffico."], ['<b>There were</b> fifty people at the party.', "C'erano cinquanta persone alla festa."], ['<b>Was there</b> a problem?', "C'è stato un problema?"])}` },
    { h: 'Espressioni di tempo passato', b: `
      <p>Sono le parole che dicono <b>quando</b> è successo:</p>
      ${T(['Inglese', 'Italiano'], [['yesterday', 'ieri'], ['yesterday morning / afternoon', 'ieri mattina / pomeriggio'], ['last night', 'ieri sera, stanotte'], ['last week / month / year', 'la settimana / il mese / l\'anno scorso'], ['two days ago', 'due giorni fa'], ['in 2010', 'nel 2010']], 'plain')}
      ${N("<p><b>Ago</b> (fa) va <b>dopo</b> il tempo: <i>three years ago</i> (tre anni fa). Non si dice <i>before three years</i>.</p><p>\"Ieri sera\" si dice <i>last night</i>, non <i>yesterday night</i>.</p>")}
      ${TIP(`<p><b>Ago</b> si comporta proprio come il nostro <b>"fa"</b>: sta in fondo. Tre anni <b>fa</b> = three years <b>ago</b>.</p><p><b>Last</b> = "scorso": la settimana scorsa = <i>last week</i>, ieri sera = <i>last night</i> (la notte scorsa).</p>`)}` },
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
