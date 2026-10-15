UNIT({
  id: 'a2-08', n: 8, level: 'A2', stop: 'Something',
  title: '<i>Something</i>, <i>anything</i>, <i>nothing</i>, <i>everything</i>',
  sub: 'Qualcosa, niente, qualcuno, nessuno, dappertutto',
  intro: "Le stesse regole di some e any, applicate a cose, persone e luoghi. Con una differenza importante rispetto all'italiano: in inglese la negazione si mette una volta sola.",
  theory: [
    { h: 'La tabella', b: `
      ${T(['', 'cose', 'persone', 'luoghi'], [['some-', 'something (qualcosa)', 'somebody · someone (qualcuno)', 'somewhere (da qualche parte)'], ['any-', 'anything', 'anybody · anyone', 'anywhere'], ['no-', 'nothing (niente)', 'nobody · no one (nessuno)', 'nowhere (da nessuna parte)'], ['every-', 'everything (tutto)', 'everybody · everyone (tutti)', 'everywhere (dappertutto)']])}
      <p><i>Somebody</i> e <i>someone</i> sono uguali; lo stesso per le altre coppie in -body / -one.</p>` },
    { h: 'Quando si usa quale', b: `
      ${T(['Forma', 'Uso', 'Esempio'], [['some-', 'frasi affermative, offerte e richieste', "I saw <b>somebody</b> in the garden. · Would you like <b>something</b> to drink?"], ['any-', 'frasi negative e domande', "I didn't see <b>anybody</b>. · Is there <b>anything</b> to eat?"], ['no-', 'con il verbo affermativo, è già negativo', 'I saw <b>nobody</b>. · There\'s <b>nothing</b> in the fridge.'], ['every-', 'tutto, tutti, ovunque', '<b>Everybody</b> is here. · I\'ve looked <b>everywhere</b>.']], 'plain')}
      ${N("<p><b>Everybody</b>, <b>nobody</b>, <b>somebody</b> sono singolari: <i>Everybody <b>is</b> ready</i>, <i>Nobody <b>knows</b></i>. In italiano \"tutti\" è plurale: attenzione al verbo.</p>")}` },
    { h: 'Una negazione sola', b: `
      <p>In italiano si dice "non ho visto nessuno", con due negazioni. In inglese una basta: o <b>not + any-</b>, o il verbo affermativo + <b>no-</b>.</p>
      ${T(['Italiano', 'Inglese', 'Sbagliato'], [['Non ho visto nessuno.', "I didn't see anybody. · I saw nobody.", "I didn't see nobody."], ['Non ho detto niente.', "I didn't say anything. · I said nothing.", "I didn't say nothing."], ['Non lo trovo da nessuna parte.', "I can't find it anywhere.", "I can't find it nowhere."]], 'plain')}
      <p>All'inizio della frase, come soggetto, si usa <b>no-</b>:</p>
      ${EX(['<b>Nobody</b> called.', 'Non ha chiamato nessuno.'], ['<b>Nothing</b> happened.', 'Non è successo niente.'], ["I didn't see <b>anybody</b>.", 'Non ho visto nessuno.'], ["I can't find my keys <b>anywhere</b>.", 'Non trovo le chiavi da nessuna parte.'])}` },
    { h: 'Any- nelle affermative, e else', b: `
      <p>In una frase affermativa <b>any-</b> significa "qualsiasi": <i>You can sit <b>anywhere</b></i> (dove vuoi). <i>Ask me <b>anything</b></i> (qualsiasi cosa).</p>
      <p><b>Else</b> dopo queste parole significa "altro": <i>something else</i> (qualcos'altro), <i>somebody else</i> (qualcun altro), <i>somewhere else</i> (da un'altra parte), <i>anything else?</i> (altro?).</p>` },
    { h: 'Errori tipici', b: ERR(
      ["I didn't say nothing.", "I didn't say anything.", 'Una sola negazione.'],
      ['Everybody are here.', 'Everybody is here.', 'Everybody è singolare.'],
      ["Nobody don't know.", 'Nobody knows.', 'Nobody è già negativo e singolare.'],
      ['Is there somebody here?', 'Is there anybody here?', 'Nelle domande di solito any-.'],
      ['I want to go in another place.', 'I want to go somewhere else.', 'Un altro posto: somewhere else.']) },
  ],
  exercises: [
    { t: 'c', q: "There's ___ at the door.", o: ['somebody', 'anybody', 'nobody'], a: 'somebody' },
    { t: 'c', q: "I didn't buy ___.", o: ['anything', 'something', 'nothing'], a: 'anything', why: 'Negativa con not: any-.' },
    { t: 'c', q: "There's ___ in the fridge. Let's go shopping.", o: ['nothing', 'anything', 'something'], a: 'nothing' },
    { t: 'c', q: '___ knows the answer. It\'s too difficult.', o: ['Nobody', 'Anybody', 'Somebody'], a: 'Nobody' },
    { t: 'c', q: 'Everybody ___ tired.', o: ['is', 'are'], a: 'is' },
    { t: 'c', q: 'Would you like ___ to drink?', o: ['something', 'anything'], a: 'something', why: 'Nelle offerte si usa some-.' },
    { t: 'c', q: "I've looked ___ but I can't find my keys.", o: ['everywhere', 'anywhere', 'nowhere'], a: 'everywhere' },
    { t: 'c', q: 'This table is taken. Let\'s sit ___ else.', o: ['somewhere', 'anywhere', 'nowhere'], a: 'somewhere' },
    { t: 'f', q: 'Did ___ call me?', h: 'qualcuno', a: ['anybody', 'anyone', 'somebody', 'someone'], why: 'Nelle domande di solito anybody / anyone.' },
    { t: 'f', q: "I can't see ___. It's too dark.", h: 'niente', a: ['anything'] },
    { t: 'f', q: '"Anything ___?" "No, thank you."', h: 'altro', a: ['else'] },
    { t: 'x', q: "I didn't say nothing.", a: ["I didn't say anything.", 'I said nothing.'] },
    { t: 'x', q: 'Everybody are here.', a: ['Everybody is here.', 'Everyone is here.'] },
    { t: 'x', q: "Nobody don't know.", a: ['Nobody knows.', 'No one knows.'] },
    { t: 't', it: 'Non è successo niente.', a: ['Nothing happened.'] },
    { t: 't', it: 'Non conosco nessuno qui.', a: ["I don't know anybody here.", "I don't know anyone here.", 'I know nobody here.', 'I know no one here.'] },
    { t: 't', it: 'Tutti sono stanchi.', a: ['Everybody is tired.', 'Everyone is tired.'] },
    { t: 't', it: 'Vuoi qualcos\'altro?', a: ['Do you want anything else?', 'Do you want something else?', 'Would you like anything else?', 'Would you like something else?'] },
    { t: 'o', it: 'Non riesco a trovarlo da nessuna parte.', a: ["I can't find it anywhere."] },
    { t: 'o', it: 'Qualcuno ha preso il mio ombrello.', a: ['Somebody has taken my umbrella.'] },
  ],
});
