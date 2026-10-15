UNIT({
  id: 'a1-01', n: 1, level: 'A1', stop: 'To be',
  title: 'Il verbo <i>to be</i>',
  sub: 'Pronomi soggetto, essere al presente, domande e risposte brevi',
  intro: "È il verbo su cui si regge tutto il resto: serve per dire chi sei, come stai, dove sei, quanti anni hai. Ed è anche il primo punto in cui l'inglese smette di somigliare all'italiano.",
  theory: [
    { h: 'I pronomi soggetto', b: `
      ${T(['Inglese', 'Italiano'], [['I', 'io'], ['you', 'tu'], ['he', 'lui'], ['she', 'lei'], ['it', 'esso, essa (cose, animali, ora, meteo)'], ['we', 'noi'], ['you', 'voi'], ['they', 'loro']])}
      <p>In italiano il soggetto si può sottintendere ("sono stanco"), perché la desinenza del verbo dice già chi parla. In inglese no: le forme dei verbi sono quasi tutte uguali, quindi <b>il soggetto va sempre espresso</b>.</p>
      ${EX(['<b>I</b> am tired.', 'Sono stanco.'], ['<b>It</b> is late.', 'È tardi.'], ['<b>It</b> is cold today.', 'Oggi fa freddo.'])}
      ${N(`<p><b>I</b> si scrive sempre maiuscolo, anche a metà frase. <b>You</b> vale per tu, voi e anche per il Lei di cortesia: l'inglese non fa differenza.</p><p><b>It</b> fa anche da soggetto "vuoto" quando in italiano il soggetto non c'è proprio: ora, meteo, distanze, giudizi (<i>It's ten o'clock, It's sunny, It's far, It's important</i>).</p>`)}` },
    { h: 'Forma affermativa', b: `
      ${T(['Forma piena', 'Contratta', 'Italiano'], [['I am', "I'm", 'io sono'], ['you are', "you're", 'tu sei'], ['he is', "he's", 'lui è'], ['she is', "she's", 'lei è'], ['it is', "it's", 'è'], ['we are', "we're", 'noi siamo'], ['you are', "you're", 'voi siete'], ['they are', "they're", 'loro sono']])}
      <p>Nel parlato e nella scrittura informale si usano quasi sempre le forme contratte. Quella piena serve nei testi formali o per dare enfasi.</p>
      ${EX(["I'm Italian.", 'Sono italiano.'], ["She's a doctor.", 'Fa il medico.'], ["We're in the car.", 'Siamo in macchina.'], ["They're my friends.", 'Sono miei amici.'])}` },
    { h: 'Forma negativa', b: `
      <p>Si mette <b>not</b> dopo il verbo. Con <i>is</i> e <i>are</i> esistono due contrazioni, entrambe corrette.</p>
      ${T(['Forma piena', 'Contratta'], [['I am not', "I'm not"], ['you are not', "you aren't · you're not"], ['he / she / it is not', "he isn't · he's not"], ['we / you / they are not', "we aren't · we're not"]])}
      ${EX(["I'm not ready.", 'Non sono pronto.'], ["It isn't expensive.", 'Non è caro.'], ["They aren't at home.", 'Non sono a casa.'])}
      ${N("<p>La forma <i>amn't</i> non esiste: con <b>I</b> si dice solo <b>I'm not</b>.</p>")}` },
    { h: 'Domande e risposte brevi', b: `
      <p>In italiano una domanda si riconosce solo dall'intonazione: "sei pronto?". In inglese <b>cambia l'ordine delle parole</b>: il verbo passa davanti al soggetto.</p>
      ${T(['Affermazione', 'Domanda'], [['You are ready.', '<b>Are you</b> ready?'], ['She is your sister.', '<b>Is she</b> your sister?'], ['They are from Milan.', 'Where <b>are they</b> from?']], 'plain')}
      ${EX(['Are you ready?', 'Sei pronto?'], ['Is she your sister?', 'È tua sorella?'], ['Where are they from?', 'Di dove sono?'], ['How old is your brother?', 'Quanti anni ha tuo fratello?'])}
      <p>Rispondere solo <i>yes</i> o <i>no</i> suona brusco. Di solito si aggiunge la <b>risposta breve</b>: soggetto + verbo.</p>
      ${T(['Domanda', 'Sì', 'No'], [['Are you tired?', 'Yes, I am.', "No, I'm not."], ['Is he at work?', 'Yes, he is.', "No, he isn't."], ['Are they Italian?', 'Yes, they are.', "No, they aren't."]], 'plain')}
      ${N("<p>Nella risposta breve affermativa <b>non si contrae mai</b>: <i>Yes, I am</i>, non <i>Yes, I'm</i>.</p>")}` },
    { h: "Quando l'italiano dice avere", b: `
      <p>Con l'età, le sensazioni fisiche e alcuni stati d'animo l'italiano usa <i>avere</i>, l'inglese usa <b>be</b>. È l'errore più diffuso in assoluto tra i principianti italiani.</p>
      ${T(['Italiano', 'Inglese'], [['ho 25 anni', "I'm 25 · I'm 25 years old"], ['ho fame · ho sete', "I'm hungry · I'm thirsty"], ['ho freddo · ho caldo', "I'm cold · I'm hot"], ['ho sonno', "I'm sleepy · I'm tired"], ['ho paura', "I'm afraid · I'm scared"], ['ho ragione · ho torto', "I'm right · I'm wrong"], ['ho fretta', "I'm in a hurry"]], 'plain')}
      ${EX(["How old are you? — I'm thirty.", 'Quanti anni hai? — Trenta.'], ["You're right.", 'Hai ragione.'], ["It's hot in here.", 'Fa caldo qui dentro.'])}` },
    { h: 'Errori tipici', b: ERR(
      ['I have 20 years.', "I'm 20.", "L'età si dice con be. Si può aggiungere years old, ma mai solo years."],
      ['Is cold today.', "It's cold today.", 'Il soggetto non si omette: per il meteo si usa it.'],
      ["Yes, I'm.", 'Yes, I am.', 'Niente contrazione nelle risposte brevi affermative.'],
      ['Are you italian?', 'Are you Italian?', 'Nazionalità e lingue vogliono sempre la maiuscola.'],
      ["I'm agree.", 'I agree.', '"Essere d\'accordo" in inglese è un verbo solo: agree. Niente be.']) },
  ],
  exercises: [
    { t: 'c', q: 'My brother ___ a nurse.', o: ['am', 'is', 'are'], a: 'is', why: 'My brother equivale a he, quindi is.' },
    { t: 'c', q: 'We ___ from Naples.', o: ['am', 'is', 'are'], a: 'are' },
    { t: 'c', q: 'Paul and I ___ friends.', o: ['am', 'is', 'are'], a: 'are', why: 'Paul and I = we, quindi are.' },
    { t: 'c', q: 'The keys ___ on the table.', o: ['is', 'are'], a: 'are', why: 'The keys è plurale (= they).' },
    { t: 'c', q: '"Are you Italian?" "Yes, ___."', o: ['I am', "I'm", 'I are'], a: 'I am', why: "Nelle risposte brevi affermative non si usa la forma contratta." },
    { t: 'f', q: 'They ___ in the office today.', h: 'be, negativa', a: ["aren't", 'are not', "'re not"] },
    { t: 'f', q: 'It ___ expensive.', h: 'be, negativa', a: ["isn't", 'is not', "'s not"] },
    { t: 'f', q: 'I ___ hungry.', h: 'be, negativa', a: ["'m not", 'am not'], why: "Con I la negativa contratta è solo I'm not." },
    { t: 'f', q: '___ you tired?', a: ['Are'], why: 'Nella domanda il verbo va davanti al soggetto.' },
    { t: 'f', q: 'Where ___ your parents from?', a: ['are'] },
    { t: 't', it: 'Ho ventidue anni.', a: ["I'm twenty-two.", "I'm twenty-two years old.", "I'm 22.", "I'm 22 years old."], why: "L'età si esprime con be: I'm 22, oppure I'm 22 years old." },
    { t: 't', it: 'Lei ha ragione.', a: ["She's right.", "You're right."], why: '"Avere ragione" = be right. (Se intendevi il Lei di cortesia, è You\'re right.)' },
    { t: 't', it: 'Oggi fa freddo.', a: ["It's cold today.", "Today it's cold.", "It is cold today."], why: 'Per il meteo il soggetto è it.' },
    { t: 't', it: 'Siete pronti?', a: ['Are you ready?'] },
    { t: 't', it: 'Non sono stanco, ho fame.', a: ["I'm not tired, I'm hungry.", "I'm not tired. I'm hungry.", "I'm not tired, but I'm hungry."], why: 'Fame si esprime con be hungry.' },
    { t: 'o', it: 'Di dove sei?', a: ['Where are you from?'], why: 'La preposizione from resta in fondo alla domanda.' },
    { t: 'o', it: 'Mia sorella non è a casa.', a: ['My sister is not at home.'] },
    { t: 'x', q: 'She have 30 years.', a: ["She's 30.", "She's 30 years old.", "She's thirty.", "She's thirty years old."], why: "L'età vuole be, non have." },
    { t: 'x', q: 'Is very late.', a: ["It's very late."], why: 'Il soggetto va sempre espresso: qui è it.' },
    { t: 'x', q: "Yes, I'm.", a: ['Yes, I am.'], strict: true, why: 'Nelle risposte brevi affermative la forma contratta non si usa.' },
  ],
});
