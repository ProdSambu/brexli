UNIT({
  id: 'a1-01', n: 1, level: 'A1', stop: 'To be',
  title: 'Il verbo <i>to be</i>',
  sub: 'Pronomi soggetto, essere al presente, domande e risposte brevi',
  intro: "<i>To be</i> vuol dire <b>essere</b>. Ti serve per dire chi sei, come stai, dove sei e quanti anni hai. Lo userai in quasi ogni frase, quindi vale la pena saperlo benissimo.",
  theory: [
    { h: 'I pronomi soggetto', b: `
      ${T(['Inglese', 'Italiano'], [['I', 'io'], ['you', 'tu'], ['he', 'lui'], ['she', 'lei'], ['it', 'esso, essa (cose, animali, ora, meteo)'], ['we', 'noi'], ['you', 'voi'], ['they', 'loro']])}
      <p>In italiano puoi dire solo "sono stanco": il verbo fa già capire che parli di te. In inglese no: <b>devi sempre dire chi fa l'azione</b>. Non "am tired", ma <b>I</b> am tired.</p>
      ${EX(['<b>I</b> am tired.', 'Sono stanco.'], ['<b>It</b> is late.', 'È tardi.'], ['<b>It</b> is cold today.', 'Oggi fa freddo.'])}
      ${N(`<p><b>I</b> (io) si scrive sempre con la maiuscola, anche in mezzo alla frase.</p><p><b>You</b> vuol dire tu, voi e anche Lei: è sempre la stessa parola.</p><p><b>It</b> si usa per le cose e gli animali. Si usa anche quando in italiano il soggetto non c'è proprio: per l'ora, il tempo che fa, le distanze (<i>It's ten o'clock, It's sunny, It's far</i>).</p>`)}
      ${TIP(`<p>In inglese il verbo non sta mai da solo: qualcuno deve sempre «reggerlo». Se in italiano non c'è nessuno ("fa freddo", "è tardi"), in inglese ci metti <b>it</b>: <i>It's cold. It's late.</i></p>`)}` },
    { h: 'Forma affermativa', b: `
      <p>Al presente <i>be</i> ha solo tre forme. Scegli quella giusta guardando chi c'è prima:</p>
      <ul><li><b>am</b> va solo con <b>I</b> (io);</li><li><b>is</b> va con <b>una persona o una cosa sola</b>: he, she, it, ma anche <i>my brother, Anna, the car</i>;</li><li><b>are</b> va con <b>you</b> e con <b>più persone o cose</b>: we, they, ma anche <i>my parents, the keys</i>.</li></ul>
      ${T(['Forma piena', 'Contratta', 'Italiano'], [['I am', "I'm", 'io sono'], ['you are', "you're", 'tu sei'], ['he is', "he's", 'lui è'], ['she is', "she's", 'lei è'], ['it is', "it's", 'è'], ['we are', "we're", 'noi siamo'], ['you are', "you're", 'voi siete'], ['they are', "they're", 'loro sono']])}
      <p>Quando si parla si usa quasi sempre la forma corta, con l'apostrofo (<i>I'm, she's, they're</i>): l'apostrofo prende il posto della lettera che manca. La forma lunga si usa nei testi più seri.</p>
      ${EX(["I'm Italian.", 'Sono italiano.'], ["She's a doctor.", 'Fa il medico.'], ["We're in the car.", 'Siamo in macchina.'], ["They're my friends.", 'Sono miei amici.'])}
      ${TIP(`<p><b>is</b> = una sola persona o cosa. <b>are</b> = tante (e sempre con you). <b>am</b> = solo io.</p><p>Hai un soggetto lungo, tipo <i>my parents</i> o <i>the teacher</i>? Prova a sostituirlo con una parola sola: se diventa <b>he, she, it</b> usi <b>is</b>, se diventa <b>they</b> usi <b>are</b>.</p>`)}` },
    { h: 'Forma negativa', b: `
      <p>Per dire "non" basta mettere <b>not</b> subito dopo am, is, are. Non serve nient'altro.</p>
      ${T(['Forma piena', 'Contratta'], [['I am not', "I'm not"], ['you are not', "you aren't · you're not"], ['he / she / it is not', "he isn't · he's not"], ['we / you / they are not', "we aren't · we're not"]])}
      ${EX(["I'm not ready.", 'Non sono pronto.'], ["It isn't expensive.", 'Non è caro.'], ["They aren't at home.", 'Non sono a casa.'])}
      ${N("<p>Con <b>I</b> la forma corta è solo <b>I'm not</b>: <i>amn't</i> non esiste.</p>")}
      ${TIP(`<p>In italiano il "non" va <b>prima</b> del verbo (non sono), in inglese il <i>not</i> va <b>dopo</b>: <i>I am not</i>. Prima il verbo, poi il no.</p>`)}` },
    { h: 'Domande e risposte brevi', b: `
      <p>In italiano per fare una domanda basta cambiare il tono della voce: "sei pronto?". In inglese invece <b>due parole si scambiano di posto</b>: il verbo va davanti a chi fa l'azione.</p>
      ${T(['Affermazione', 'Domanda'], [['You are ready.', '<b>Are you</b> ready?'], ['She is your sister.', '<b>Is she</b> your sister?'], ['They are from Milan.', 'Where <b>are they</b> from?']], 'plain')}
      ${EX(['Are you ready?', 'Sei pronto?'], ['Is she your sister?', 'È tua sorella?'], ['Where are they from?', 'Di dove sono?'], ['How old is your brother?', 'Quanti anni ha tuo fratello?'])}
      <p>Rispondere solo <i>yes</i> o <i>no</i> sembra un po' brusco. Di solito si aggiunge una <b>risposta breve</b>: chi + il verbo della domanda.</p>
      ${T(['Domanda', 'Sì', 'No'], [['Are you tired?', 'Yes, I am.', "No, I'm not."], ['Is he at work?', 'Yes, he is.', "No, he isn't."], ['Are they Italian?', 'Yes, they are.', "No, they aren't."]], 'plain')}
      ${N("<p>Nella risposta breve con il sì <b>non si accorcia mai</b>: <i>Yes, I am</i>, non <i>Yes, I'm</i>.</p>")}
      ${TIP(`<p>Domanda = <b>scambia le due parole</b>: <i>you are</i> → <i>are you?</i> Come girare due carte sul tavolo.</p><p>Risposta breve = <b>ripeti il verbo della domanda</b>: Are you…? → Yes, I am. Is he…? → No, he isn't.</p>`)}` },
    { h: "Quando l'italiano dice avere", b: `
      <p>Per l'età, la fame, la sete, il freddo, il caldo, la paura e poche altre cose, l'italiano usa <i>avere</i> ("ho fame"). L'inglese invece usa <b>be</b>: "sono affamato". È l'errore più comune per chi parla italiano.</p>
      ${T(['Italiano', 'Inglese'], [['ho 25 anni', "I'm 25 · I'm 25 years old"], ['ho fame · ho sete', "I'm hungry · I'm thirsty"], ['ho freddo · ho caldo', "I'm cold · I'm hot"], ['ho sonno', "I'm sleepy · I'm tired"], ['ho paura', "I'm afraid · I'm scared"], ['ho ragione · ho torto', "I'm right · I'm wrong"], ['ho fretta', "I'm in a hurry"]], 'plain')}
      ${EX(["How old are you? — I'm thirty.", 'Quanti anni hai? — Trenta.'], ["You're right.", 'Hai ragione.'], ["It's hot in here.", 'Fa caldo qui dentro.'])}
      ${TIP(`<p>Prima di tradurre, giralo nella tua testa: "ho fame" → <b>sono affamato</b>, "ho sete" → <b>sono assetato</b>, "ho 20 anni" → <b>sono ventenne</b>. Così ti viene naturale usare be: <i>I'm hungry, I'm thirsty, I'm 20.</i></p>`)}` },
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
    { t: 'f', q: 'Where ___ your parents from?', a: ['are'], sec: 'Domande e risposte brevi' },
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
