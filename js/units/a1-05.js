UNIT({
  id: 'a1-05', n: 5, level: 'A1', stop: 'Do e does',
  title: 'Present simple: negazioni e domande',
  sub: 'L\'ausiliare do / does, risposte brevi, avverbi di frequenza',
  intro: "In italiano per dire \"non\" basta il non, e per fare una domanda basta il tono della voce. In inglese, con i verbi normali, serve un aiutante: <b>do</b>. Non si traduce, ma senza di lui la frase non sta in piedi.",
  theory: [
    { h: 'La negativa: don\'t e doesn\'t', b: `
      <p>In inglese non si può dire <i>I not work</i>. Prima del verbo ci vuole l'aiutante <b>don't</b> (o <b>doesn't</b>), e il verbo resta <b>così com'è</b>.</p>
      <ul><li><b>don't</b> con I, you, we, they;</li><li><b>doesn't</b> con he, she, it (una persona o una cosa sola).</li></ul>
      ${T(['Persona', 'Negativa', 'Forma piena'], [['I / you / we / they', "don't work", 'do not work'], ['he / she / it', "<b>doesn't</b> work", 'does not work']], 'plain')}
      ${EX(["I <b>don't</b> like horror films.", "Non mi piacciono i film dell'orrore."], ["He <b>doesn't</b> drive.", 'Non guida.'], ["They <b>don't</b> live here.", 'Non abitano qui.'])}
      ${N("<p>Con he, she, it la -s si sposta: va su <b>does</b> e il verbo la perde. Si dice <i>she doesn't work</i>, mai <i>she doesn't works</i>.</p>")}
      ${TIP(`<p><b>La -s è una sola e non si sdoppia.</b> In <i>she works</i> sta sul verbo; in <i>she doesn't work</i> se l'è presa <b>does</b>. Se vedi does, il verbo dopo è "nudo".</p>`)}` },
    { h: 'Le domande: do e does', b: `
      <p>Per fare una domanda metti <b>Do</b> (o <b>Does</b> con he, she, it) <b>all'inizio</b>. Poi chi fa l'azione, poi il verbo così com'è. Se c'è una parola come <i>where, what, when</i>, va prima di tutto.</p>
      ${T(['Parola interrogativa', 'Ausiliare', 'Soggetto', 'Verbo', ''], [['', 'Do', 'you', 'speak', 'French?'], ['', 'Does', 'she', 'live', 'here?'], ['Where', 'do', 'your parents', 'live?', ''], ['What', 'does', 'he', 'do?', ''], ['How often', 'do', 'you', 'go', 'to the cinema?']], 'plain')}
      ${EX(['<b>Do</b> you speak French?', 'Parli francese?'], ['Where <b>does</b> she work?', 'Dove lavora?'], ['What <b>do</b> you do?', 'Che lavoro fai?'])}
      ${N("<p><i>What do you do?</i> è il modo normale per chiedere che lavoro fa qualcuno. Il primo <i>do</i> è l'aiutante, il secondo è il verbo \"fare\".</p>")}
      <p>Per rispondere in breve, ripeti l'aiutante:</p>
      ${T(['Domanda', 'Sì', 'No'], [['Do you smoke?', 'Yes, I do.', "No, I don't."], ['Does he cook?', 'Yes, he does.', "No, he doesn't."]], 'plain')}
      ${TIP(`<p>L'ordine della domanda si ricorda con <b>"Q-A-S-V"</b>: <b>Q</b>uestion word (where, what…), <b>A</b>iutante (do / does), <b>S</b>oggetto, <b>V</b>erbo. <i>Where · does · she · work?</i></p>`)}` },
    { h: 'Due eccezioni importanti', b: `
      <p><b>1. Il verbo be non usa mai do.</b> Fa le domande e le negative da solo, come hai visto alla fermata 1.</p>
      ${EX(["Are you tired?", 'Sei stanco?'], ["She isn't here.", 'Non è qui.'])}
      <p><b>2. Quando chiedi "chi fa l'azione?"</b> (<i>who</i> = chi) non serve do: il verbo resta come in una frase normale, con la -s.</p>
      ${EX(['Who <b>lives</b> in this house?', 'Chi abita in questa casa?'], ['What <b>happens</b> next?', 'Cosa succede dopo?'])}
      <p>Confronta: <i>Who <b>do you</b> love?</i> (chi ami tu?) e <i>Who <b>loves</b> you?</i> (chi è che ti ama?).</p>
      ${TIP(`<p><b>Be</b> è il re dei verbi: si arrangia da solo e non chiede mai aiuto a do. <i>Are you…? I'm not…</i> Mai <i>Do you are…?</i></p>`)}` },
    { h: 'Avverbi di frequenza', b: `
      <p>Sono le parole che dicono <b>quante volte</b> fai una cosa:</p>
      ${T(['Avverbio', 'Italiano'], [['always', 'sempre'], ['usually', 'di solito'], ['often', 'spesso'], ['sometimes', 'a volte'], ['rarely · hardly ever', 'raramente · quasi mai'], ['never', 'mai']])}
      <p>Si mettono <b>prima del verbo</b> (<i>I often go</i>). Ma se il verbo è <b>be</b>, vanno <b>dopo</b> (<i>she's always late</i>).</p>
      ${EX(['I <b>usually</b> have lunch at home.', 'Di solito pranzo a casa.'], ["She's <b>always</b> late.", 'È sempre in ritardo.'], ['We <b>never</b> eat meat.', 'Non mangiamo mai carne.'])}
      ${N("<p><b>Never</b> vuol già dire \"non… mai\": <i>I never go out</i>, non <i>I don't never go out</i>. In inglese il \"no\" si dice una volta sola.</p>")}
      ${TIP(`<p>L'avverbio si siede <b>davanti ai verbi normali</b> (<i>I <b>always</b> drink coffee</i>) ma <b>dietro a be</b>, il re, che vuole stare davanti (<i>I'm <b>always</b> tired</i>).</p>`)}` },
    { h: 'Errori tipici', b: ERR(
      ['She doesn\'t works here.', "She doesn't work here.", 'Dopo does il verbo torna alla forma base.'],
      ['Where you live?', 'Where do you live?', "Manca l'ausiliare."],
      ['Do you are tired?', 'Are you tired?', 'Be non usa do.'],
      ["I don't never go out.", 'I never go out.', 'Niente doppia negazione.'],
      ['I go often to the cinema.', 'I often go to the cinema.', "L'avverbio di frequenza va prima del verbo."]) },
  ],
  exercises: [
    { t: 'f', q: 'I ___ horror films.', h: 'not / like', a: ["don't like", 'do not like'] },
    { t: 'f', q: 'He ___ to work.', h: 'not / drive', a: ["doesn't drive", 'does not drive'] },
    { t: 'f', q: '___ she speak French?', a: ['Does'] },
    { t: 'f', q: 'Where ___ your parents live?', a: ['do'], why: 'Your parents è plurale: do.' },
    { t: 'f', q: 'What ___ your brother do?', a: ['does'] },
    { t: 'f', q: 'My sister ___ meat.', h: 'not / eat', a: ["doesn't eat", 'does not eat'] },
    { t: 'c', q: "She doesn't ___ meat.", o: ['eat', 'eats', 'eating'], a: 'eat', why: 'Dopo does/doesn\'t il verbo va alla forma base.' },
    { t: 'c', q: '"Do you smoke?" "No, I ___."', o: ["don't", "doesn't", "am not"], a: "don't" },
    { t: 'c', q: 'Who ___ in this house?', o: ['lives', 'does live', 'do live'], a: 'lives', why: 'La domanda è sul soggetto (chi abita?): niente do.' },
    { t: 'c', q: '"Is he Spanish?" "No, he ___."', o: ["isn't", "doesn't", "don't"], a: "isn't", why: 'La domanda usa be, quindi anche la risposta.' },
    { t: 'c', q: '___ you often tired?', o: ['Are', 'Do', 'Does'], a: 'Are' },
    { t: 'o', it: 'Lei non beve mai caffè.', a: ['She never drinks coffee.'] },
    { t: 'o', it: 'Di solito pranzo a casa.', a: ['I usually have lunch at home.', 'Usually I have lunch at home.'] },
    { t: 'o', it: 'Dove lavora tuo fratello?', a: ['Where does your brother work?'] },
    { t: 'x', q: "I don't never go out.", a: ['I never go out.'] },
    { t: 'x', q: 'Does she works here?', a: ['Does she work here?'] },
    { t: 'x', q: 'Where you live?', a: ['Where do you live?'] },
    { t: 'x', q: 'I go often to the cinema.', a: ['I often go to the cinema.', 'I go to the cinema often.'], why: "Often va prima del verbo principale (oppure in fondo alla frase), mai tra il verbo e il complemento." },
    { t: 't', it: 'Che lavoro fa tua madre?', a: ['What does your mother do?', 'What does your mum do?', 'What does your mom do?', "What's your mother's job?", "What's your mum's job?", 'What job does your mother do?', 'What job does your mum do?'] },
    { t: 't', it: 'Non capisco.', a: ["I don't understand."] },
    { t: 't', it: 'Quanto spesso vai al cinema?', a: ['How often do you go to the cinema?', 'How often do you go to the movies?'] },
  ],
});
