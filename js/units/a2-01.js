UNIT({
  id: 'a2-01', n: 1, level: 'A2', stop: 'Ever e never',
  title: 'Present perfect: le esperienze',
  sub: 'have / has + participio, ever, never, been e gone',
  intro: "Il present perfect si scrive come il nostro passato prossimo (\"ho visto\" = <i>I have seen</i>), ma non si usa allo stesso modo. Si comincia dall'uso più facile: raccontare le <b>esperienze della vita</b>, senza dire quando sono successe.",
  theory: [
    { h: 'Come si forma', b: `
      <p>È fatto come "<b>ho</b> visto": <b>have</b> (o <b>has</b> con he, she, it) + il <b>participio</b>. Il participio è la terza colonna dei verbi irregolari (<i>seen, eaten, been</i>); per i verbi regolari è la solita forma in <b>-ed</b> (<i>worked</i>).</p>
      ${T(['Affermativa', 'Negativa', 'Domanda'], [["I've seen", "I haven't seen", 'Have you seen...?'], ["you've seen", "you haven't seen", 'Have we seen...?'], ["he / she / it's seen", "he / she / it hasn't seen", 'Has she seen...?'], ["we / they've seen", "we / they haven't seen", 'Have they seen...?']], 'plain')}
      ${N("<p>In <i>she's seen</i> la <b>'s</b> vuol dire <b>has</b>, non is: lo capisci dal participio che viene dopo.</p>")}
      <p>Risposte brevi: <i>Yes, I have. / No, I haven't. / Yes, she has. / No, she hasn't.</i></p>
      <p>I participi irregolari che userai di più: <i>been, done, gone, had, made, seen, eaten, written, read, taken, met, bought, found, lost</i>. L'elenco completo è nella pagina <a href="#/irregolari">Verbi irregolari</a>.</p>
      ${TIP(`<p>La formula è la stessa dell'italiano: <b>ho + visto</b> = <b>have + seen</b>. Solo che in inglese il verbo "avere" serve sempre, anche dove noi diciamo "sono": "sono stato" = <i>I have been</i>.</p>`)}` },
    { h: 'Le esperienze: quando non importa', b: `
      <p>Si usa per dire che una cosa ti è successa (o non ti è mai successa) <b>nella vita, fino a oggi</b>, quando non conta il momento preciso.</p>
      ${EX(["I've <b>been</b> to London three times.", 'Sono stato a Londra tre volte.'], ["She's <b>never</b> <b>driven</b> a car.", 'Non ha mai guidato una macchina.'], ['<b>Have</b> you <b>ever</b> <b>eaten</b> sushi?', 'Hai mai mangiato il sushi?'], ["We've <b>met</b> before.", 'Ci siamo già conosciuti.'])}
      <p>Appena dici <b>quando</b> è successo, devi passare al past simple (lo vedi bene alla fermata 4):</p>
      ${EX(['I <b>went</b> to London in 2019.', 'Sono andato a Londra nel 2019.'])}
      ${TIP(`<p>Immagina il tuo <b>curriculum di vita</b>: "sono stato a Londra, ho guidato un camion, non ho mai mangiato il sushi". Sono cose che hai nel bagaglio, non conta quando: present perfect.</p><p>Se aggiungi una data, diventa un racconto: past simple.</p>`)}` },
    { h: 'Ever e never', b: `
      <p>Tutti e due si traducono "mai", ma in due sensi diversi:</p>
      ${T(['Parola', 'Dove', 'Esempio'], [['ever (mai, nel senso di "qualche volta")', 'nelle domande, tra soggetto e participio', 'Have you ever seen a ghost?'], ['never (mai, nel senso di "nessuna volta")', 'nelle frasi affermative, tra have e participio', "I've never seen a ghost."]], 'plain')}
      <p><b>Never</b> vuol già dire "non… mai": niente <i>not</i>. "Non ho mai visto" è <i>I've never seen</i>, non <i>I haven't never seen</i>.</p>
      <p>Dopo "il più…", <b>ever</b> vuol dire "di sempre", "in vita mia":</p>
      ${EX(["It's the best film I've <b>ever</b> seen.", 'È il film più bello che abbia mai visto.'], ["She's the nicest person I've <b>ever</b> met.", 'È la persona più gentile che abbia mai conosciuto.'])}
      ${TIP(`<p><b>Ever</b> = "<b>e</b>ventualmente, qualche volta?": va nelle domande. <b>Never</b> = "<b>n</b>essuna volta": comincia con la <b>n</b> di <b>no</b>, ed è già negativo.</p>`)}` },
    { h: 'Been o gone?', b: `
      <p>Il verbo <i>go</i> ha due participi che vogliono dire cose diverse:</p>
      ${T(['Forma', 'Significato', 'Esempio'], [['have been to', 'ci sono stato e sono tornato', "She's been to Paris. (ci è stata, ora è qui)"], ['have gone to', 'è andato e adesso è là', "She's gone to Paris. (adesso è a Parigi)"]], 'plain')}
      <p>Per raccontare i viaggi fatti si usa quasi sempre <b>been to</b>: <i>Have you ever been to Japan?</i></p>
      ${TIP(`<p><b>Been</b> = andata <b>e ritorno</b>, sei di nuovo qui. <b>Gone</b> = <b>solo andata</b>, è ancora là. Pensa a "gone" come a "andato via".</p>`)}` },
    { h: 'Errori tipici', b: ERR(
      ['Have you ever went to Spain?', 'Have you ever been to Spain?', 'Dopo have serve il participio: went è il past simple.'],
      ["I haven't never seen it.", "I've never seen it.", 'Never è già negativo.'],
      ["I've been to London last year.", 'I went to London last year.', 'Con un momento preciso (last year) serve il past simple.'],
      ["I've been in Rome three times.", "I've been to Rome three times.", 'Per i viaggi: been to.'],
      ['She have seen it.', "She's seen it.", 'Terza persona: has.']) },
  ],
  exercises: [
    { t: 'f', q: 'I ___ that film.', h: 'see, present perfect', a: ['have seen', "'ve seen"] },
    { t: 'f', q: 'She ___ to Japan.', h: 'be, present perfect', a: ['has been', "'s been"] },
    { t: 'f', q: '___ you ever eaten snails?', a: ['Have'] },
    { t: 'f', q: 'We ___ a horse.', h: 'never / ride', a: ['have never ridden', "'ve never ridden"], why: 'Ride – rode – ridden. Never va tra have e il participio.' },
    { t: 'f', q: 'He ___ my message.', h: 'not / read', a: ["hasn't read", 'has not read'] },
    { t: 'f', q: "It's the best book I've ___ read.", a: ['ever'] },
    { t: 'c', q: 'Have you ever ___ to New York?', o: ['been', 'gone', 'went'], a: 'been', why: 'Per le esperienze di viaggio: been to.' },
    { t: 'c', q: '"Where\'s Anna?" "She\'s ___ to the shop. She\'ll be back soon."', o: ['gone', 'been'], a: 'gone', why: 'Anna è andata e non è ancora tornata: gone.' },
    { t: 'c', q: '"Have you ever met him?" "No, I ___."', o: ["haven't", "didn't", "don't"], a: "haven't" },
    { t: 'c', q: 'I ___ to Paris in 2018.', o: ['went', 'have been', 'have gone'], a: 'went', why: 'In 2018 è un momento preciso: past simple.' },
    { t: 'c', q: 'She has ___ three books.', o: ['written', 'wrote', 'writed'], a: 'written' },
    { t: 'x', q: 'Have you ever went to Spain?', a: ['Have you ever been to Spain?'] },
    { t: 'x', q: "I haven't never seen snow.", a: ["I've never seen snow.", "I haven't ever seen snow."] },
    { t: 'x', q: "I've been to London last year.", a: ['I went to London last year.', 'Last year I went to London.'] },
    { t: 't', it: 'Sei mai stato in Irlanda?', a: ['Have you ever been to Ireland?'] },
    { t: 't', it: 'Non ho mai visto il mare.', a: ["I've never seen the sea."] },
    { t: 't', it: 'È la pizza più buona che abbia mai mangiato.', a: ["It's the best pizza I've ever eaten.", "It's the best pizza I've ever had."] },
    { t: 't', it: 'Abbiamo già conosciuto tuo fratello.', a: ["We've already met your brother.", "We've met your brother before.", "We've met your brother."] },
    { t: 'o', it: 'Lei non ha mai guidato una macchina.', a: ['She has never driven a car.'] },
    { t: 'o', it: 'Quante volte sei stato a Roma?', a: ['How many times have you been to Rome?'] },
  ],
});
