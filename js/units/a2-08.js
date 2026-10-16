UNIT({
  id: 'a2-08', n: 8, level: 'A2', stop: 'Something',
  title: '<i>Something</i>, <i>anything</i>, <i>nothing</i>, <i>everything</i>',
  sub: 'Qualcosa, niente, qualcuno, nessuno, dappertutto',
  intro: "Sono le parole per dire \"qualcosa\", \"niente\", \"qualcuno\", \"nessuno\", \"dappertutto\". Seguono le stesse regole di <i>some</i> e <i>any</i> della fermata 6 A1. E in inglese il \"no\" si dice una volta sola.",
  theory: [
    { h: 'La tabella', b: `
      <p>Sono costruite come i mattoncini: un <b>primo pezzo</b> (some, any, no, every) + un <b>secondo pezzo</b> che dice se parli di cose, persone o luoghi.</p>
      ${T(['', 'cose', 'persone', 'luoghi'], [['some-', 'something (qualcosa)', 'somebody · someone (qualcuno)', 'somewhere (da qualche parte)'], ['any-', 'anything', 'anybody · anyone', 'anywhere'], ['no-', 'nothing (niente)', 'nobody · no one (nessuno)', 'nowhere (da nessuna parte)'], ['every-', 'everything (tutto)', 'everybody · everyone (tutti)', 'everywhere (dappertutto)']])}
      <p><i>Somebody</i> e <i>someone</i> vogliono dire la stessa cosa; vale anche per le altre coppie in -body / -one.</p>
      ${TIP(`<p>Il secondo pezzo è sempre lo stesso: <b>-thing</b> = cosa, <b>-body / -one</b> = persona, <b>-where</b> = dove. Basta cambiare il primo: <i>some</i>thing, <i>no</i>thing, <i>every</i>thing.</p>`)}` },
    { h: 'Quando si usa quale', b: `
      <p>Le regole sono quelle di <i>some</i> e <i>any</i>: <b>some-</b> nelle frasi normali, <b>any-</b> con le domande e il "non".</p>
      ${T(['Forma', 'Uso', 'Esempio'], [['some-', 'frasi affermative, offerte e richieste', "I saw <b>somebody</b> in the garden. · Would you like <b>something</b> to drink?"], ['any-', 'frasi negative e domande', "I didn't see <b>anybody</b>. · Is there <b>anything</b> to eat?"], ['no-', 'con il verbo affermativo, è già negativo', 'I saw <b>nobody</b>. · There\'s <b>nothing</b> in the fridge.'], ['every-', 'tutto, tutti, ovunque', '<b>Everybody</b> is here. · I\'ve looked <b>everywhere</b>.']], 'plain')}
      ${N("<p><b>Everybody</b> (tutti), <b>nobody</b> e <b>somebody</b> vanno col verbo al singolare, come he e she: <i>Everybody <b>is</b> ready</i>, <i>Nobody <b>knows</b></i>. In italiano \"tutti\" è plurale: occhio al verbo.</p>")}
      ${TIP(`<p>Come per <i>some</i> e <i>any</i>: <b>S</b>ome = <b>S</b>ì; <b>A</b>ny = quando c'è un <b>?</b> o un <b>not</b>.</p><p><b>Every</b>body = "ogni persona": una alla volta, quindi singolare (<i>everybody <b>is</b></i>).</p>`)}` },
    { h: 'Una negazione sola', b: `
      <p>In italiano diciamo "<b>non</b> ho visto <b>nessuno</b>": due no. In inglese <b>ne basta uno</b>. Hai due possibilità: <b>not + any-</b> oppure il verbo senza not + <b>no-</b>.</p>
      ${T(['Italiano', 'Inglese', 'Sbagliato'], [['Non ho visto nessuno.', "I didn't see anybody. · I saw nobody.", "I didn't see nobody."], ['Non ho detto niente.', "I didn't say anything. · I said nothing.", "I didn't say nothing."], ['Non lo trovo da nessuna parte.', "I can't find it anywhere.", "I can't find it nowhere."]], 'plain')}
      <p>Quando è il primo pezzo della frase ("nessuno ha chiamato"), si usa <b>no-</b>:</p>
      ${EX(['<b>Nobody</b> called.', 'Non ha chiamato nessuno.'], ['<b>Nothing</b> happened.', 'Non è successo niente.'], ["I didn't see <b>anybody</b>.", 'Non ho visto nessuno.'], ["I can't find my keys <b>anywhere</b>.", 'Non trovo le chiavi da nessuna parte.'])}
      ${TIP(`<p>In inglese due "no" si annullano, come in matematica: meno per meno fa più. Quindi un no solo: <i>I didn't see <b>any</b>body</i> oppure <i>I saw <b>no</b>body</i>, mai tutti e due.</p>`)}` },
    { h: 'Any- nelle affermative, e else', b: `
      <p>In una frase normale (senza not e senza domanda) <b>any-</b> vuol dire <b>"qualsiasi"</b>: <i>You can sit <b>anywhere</b></i> (siediti dove vuoi), <i>Ask me <b>anything</b></i> (chiedimi qualsiasi cosa).</p>
      <p><b>Else</b> dopo queste parole vuol dire <b>"altro"</b>: <i>something else</i> (qualcos'altro), <i>somebody else</i> (qualcun altro), <i>somewhere else</i> (da un'altra parte), <i>anything else?</i> (altro?).</p>
      ${TIP(`<p><i>Anything else?</i> è la domanda che ti fa sempre il cameriere o il cassiere: "altro?". Ricordala così e non la dimentichi più.</p>`)}` },
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
