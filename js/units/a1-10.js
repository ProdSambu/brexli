UNIT({
  id: 'a1-10', n: 10, level: 'A1', stop: 'Past simple',
  title: 'Past simple: regolari e irregolari',
  sub: '-ed e la sua pronuncia, i verbi irregolari, did e didn\'t',
  intro: "È il tempo per raccontare: cosa hai fatto ieri, dove sei andato in vacanza. È anche facile, perché è <b>uguale per tutte le persone</b>. L'unica fatica sono i verbi irregolari, che sono proprio i più usati.",
  theory: [
    { h: 'Quando si usa', b: `
      <p>Per una cosa <b>finita</b>, successa in un momento <b>preciso</b> del passato: ieri, l'anno scorso, due giorni fa. Traduce sia "ho visto" sia "vidi".</p>
      ${EX(['I <b>saw</b> Marco yesterday.', 'Ieri ho visto Marco.'], ['We <b>went</b> to Paris in 2019.', 'Nel 2019 siamo andati a Parigi.'], ['She <b>called</b> me an hour ago.', "Mi ha chiamato un'ora fa."])}
      ${N("<p>In italiano diciamo \"<b>ho</b> visto\", ma in inglese con <i>yesterday, last week, ago</i> non si usa <i>have</i>: si dice <i>I saw him yesterday</i>, non <i>I have seen him yesterday</i>. È l'errore più comune.</p>")}
      ${TIP(`<p>Se nella frase c'è un <b>quando</b> già finito (ieri, la settimana scorsa, nel 2019, tre giorni fa), usa il past simple. Il "quando" chiude la porta del passato.</p>`)}` },
    { h: 'Verbi regolari: -ed', b: `
      <p>Ai verbi regolari si aggiunge <b>-ed</b>, ed è uguale per tutti: <i>I worked, she worked, they worked</i>. Qualche verbo cambia un po' quando si scrive:</p>
      ${T(['Il verbo finisce in…', 'Regola', 'Esempi'], [['-e', '+ d', 'live → lived, arrive → arrived'], ['consonante + y', 'y → ied', 'study → studied, try → tried (ma play → played)'], ['consonante-vocale-consonante accentata', 'raddoppio + ed', 'stop → stopped, plan → planned, prefer → preferred'], ['-l (britannico)', 'raddoppio + ed', 'travel → travelled'], ['tutti gli altri', '+ ed', 'work → worked, want → wanted']], 'plain')}
      <h3>Come si pronuncia -ed</h3>
      <p>La <i>e</i> di <i>-ed</i> di solito <b>non si sente</b>: <i>worked</i> si dice "uòrkt", tutto in un colpo. Si sente solo dopo <b>t</b> e <b>d</b>: <i>wanted</i> = "uòn-tid".</p>
      ${T(['Suono', 'Quando', 'Esempi'], [['/t/', 'dopo suoni sordi: p, k, s, sh, ch, f', 'worked, stopped, watched, washed'], ['/d/', 'dopo suoni sonori e vocali', 'played, lived, called, opened'], ['/ɪd/', 'solo dopo t e d', 'wanted, needed, visited, decided']], 'plain')}
      ${EX(['worked', ''], ['played', ''], ['wanted', ''])}
      ${TIP(`<p>Le regole di scrittura sono le stesse dell'<b>-ing</b> e della <b>-s</b>: la <b>y</b> dopo una consonante cambia (stud<b>ied</b>), e il "panino" consonante-vocale-consonante raddoppia (sto<b>pp</b>ed). Le hai già viste: le stai solo riusando.</p>`)}` },
    { h: 'Verbi irregolari', b: `
      <p>Molti verbi, proprio quelli che usi di più, al passato cambiano del tutto. Vanno imparati a memoria. Questi sono i più comuni:</p>
      ${T(['Base', 'Past simple', 'Base', 'Past simple'], [['be', 'was / were', 'go', 'went'], ['have', 'had', 'get', 'got'], ['do', 'did', 'make', 'made'], ['say', 'said', 'see', 'saw'], ['come', 'came', 'take', 'took'], ['know', 'knew', 'think', 'thought'], ['buy', 'bought', 'eat', 'ate'], ['give', 'gave', 'find', 'found'], ['tell', 'told', 'leave', 'left']], 'plain')}
      <p>L'elenco completo, con l'allenamento, è nella pagina <a href="#/irregolari">Verbi irregolari</a>.</p>
      ${TIP(`<p>Imparali <b>a gruppi che suonano uguali</b>, è molto più facile:</p><ul><li>buy → <b>bought</b>, think → <b>thought</b>, bring → <b>brought</b> (tutti in <i>-ought</i>);</li><li>know → <b>knew</b>, grow → <b>grew</b>, throw → <b>threw</b> (tutti in <i>-ew</i>);</li><li>come → <b>came</b>, give → <b>gave</b>, take → <b>took</b> (cambia solo la vocale).</li></ul><p>Bastano cinque minuti al giorno nella pagina dei verbi irregolari.</p>`)}` },
    { h: 'Negativa e domande: did', b: `
      <p>Funziona come al presente con <i>do</i>, ma l'aiutante è <b>did</b>, uguale per tutti. Dopo <i>did</i> il verbo torna <b>com'era</b> (<i>go, see, work</i>), perché il passato lo porta già <i>did</i>.</p>
      ${T(['Affermativa', 'Negativa', 'Domanda'], [['I worked', "I didn't work", 'Did you work?'], ['she went', "she didn't go", 'Did she go?'], ['they saw', "they didn't see", 'What did they see?']], 'plain')}
      ${EX(["We <b>didn't go</b> out last night.", 'Ieri sera non siamo usciti.'], ['<b>Did</b> you <b>enjoy</b> the film? — Yes, I <b>did</b>.', 'Ti è piaciuto il film? — Sì.'], ['What <b>did</b> you <b>do</b> at the weekend?', 'Cosa hai fatto nel fine settimana?'])}
      <p>Le eccezioni sono le stesse del presente: <b>be</b> non usa <i>did</i> (<i>Were you tired?</i>), e quando chiedi "chi?" nemmeno (<i>Who <b>called</b> you?</i>).</p>
      ${TIP(`<p><b>Il passato si dice una volta sola.</b> Se c'è già <i>did</i>, il verbo dopo non va al passato: <i>didn't <b>go</b></i>, mai <i>didn't went</i>. È la stessa regola della -s con <i>does</i>.</p>`)}` },
    { h: 'Errori tipici', b: ERR(
      ["I didn't went to school.", "I didn't go to school.", 'Dopo didn\'t: forma base.'],
      ['Did you saw that?', 'Did you see that?', 'Dopo did: forma base.'],
      ['I have seen him yesterday.', 'I saw him yesterday.', 'Yesterday è un tempo concluso: past simple.'],
      ['She studyed in Bologna.', 'She studied in Bologna.', 'Consonante + y → ied.'],
      ['Who did call you?', 'Who called you?', 'Domanda sul soggetto: niente did.']) },
  ],
  exercises: [
    { t: 'f', q: 'I ___ my grandmother last Sunday.', h: 'visit', a: ['visited'] },
    { t: 'f', q: 'We ___ at a petrol station.', h: 'stop', a: ['stopped'], why: 'Stop raddoppia la p.' },
    { t: 'f', q: 'She ___ in Bologna.', h: 'study', a: ['studied'] },
    { t: 'f', q: 'They ___ to Paris in 2019.', h: 'go', a: ['went'] },
    { t: 'f', q: 'He ___ a new car last month.', h: 'buy', a: ['bought'] },
    { t: 'f', q: 'I ___ Marco yesterday.', h: 'see', a: ['saw'] },
    { t: 'f', q: 'We ___ out last night.', h: 'not / go', a: ["didn't go", 'did not go'] },
    { t: 'f', q: 'What ___ you do at the weekend?', a: ['did'] },
    { t: 'f', q: '___ she call you?', a: ['Did'] },
    { t: 'f', q: 'I ___ him the truth.', h: 'tell', a: ['told'] },
    { t: 'c', q: "I didn't ___ the email.", o: ['read', 'readed', 'reads'], a: 'read', why: "Dopo didn't la forma base (read, che al passato si scrive uguale ma si pronuncia /red/)." },
    { t: 'c', q: 'Did you ___ the match?', o: ['see', 'saw', 'seen'], a: 'see' },
    { t: 'c', q: 'Who ___ the window?', o: ['broke', 'did break', 'did broke'], a: 'broke', why: 'Domanda sul soggetto: niente did.' },
    { t: 'c', q: 'In "wanted" la -ed si pronuncia…', o: ['/ɪd/ (una sillaba in più)', '/t/', '/d/'], a: '/ɪd/ (una sillaba in più)', why: 'Dopo t e d la -ed aggiunge una sillaba.' },
    { t: 'x', q: "I didn't went to school.", a: ["I didn't go to school."] },
    { t: 'x', q: 'Did you saw that?', a: ['Did you see that?'] },
    { t: 'x', q: 'I have seen him yesterday.', a: ['I saw him yesterday.', 'Yesterday I saw him.'] },
    { t: 't', it: 'Ieri ho perso le chiavi.', a: ['I lost my keys yesterday.', 'Yesterday I lost my keys.', 'I lost the keys yesterday.', 'Yesterday I lost the keys.'], why: "Parlando delle proprie cose l'inglese preferisce il possessivo: my keys." },
    { t: 't', it: 'Cosa hai fatto ieri sera?', a: ['What did you do last night?', 'What did you do yesterday evening?'] },
    { t: 't', it: 'Non ho capito.', a: ["I didn't understand."] },
    { t: 't', it: 'Lei è arrivata alle otto.', a: ['She arrived at eight.', 'She arrived at 8.', "She arrived at eight o'clock.", "She arrived at 8 o'clock."] },
    { t: 't', it: 'Abbiamo mangiato una pizza.', a: ['We ate a pizza.', 'We had a pizza.', 'We ate pizza.', 'We had pizza.'], why: 'Eat è irregolare: eat – ate – eaten. Con i pasti si usa spesso anche have: we had a pizza.' },
    { t: 'o', it: 'Ieri non siamo usciti.', a: ["We didn't go out yesterday.", "Yesterday we didn't go out."] },
  ],
});
