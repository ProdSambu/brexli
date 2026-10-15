UNIT({
  id: 'a1-10', n: 10, level: 'A1',
  title: 'Past simple: regolari e irregolari',
  sub: '-ed e la sua pronuncia, i verbi irregolari, did e didn\'t',
  intro: "È il tempo del racconto: cosa hai fatto ieri, dove sei andato in vacanza. Si forma in modo semplice, ma i verbi più usati sono proprio quelli irregolari.",
  theory: [
    { h: 'Quando si usa', b: `
      <p>Per azioni <b>concluse</b> in un momento <b>definito</b> del passato (detto o sottinteso). Traduce sia il passato prossimo che il passato remoto.</p>
      ${EX(['I <b>saw</b> Marco yesterday.', 'Ieri ho visto Marco.'], ['We <b>went</b> to Paris in 2019.', 'Nel 2019 siamo andati a Parigi.'], ['She <b>called</b> me an hour ago.', "Mi ha chiamato un'ora fa."])}
      ${N("<p>Con un tempo concluso (yesterday, last week, in 2019, ago) <b>non si usa mai il present perfect</b>: <i>I have seen him yesterday</i> è sbagliato. Il calco dal passato prossimo italiano è l'errore più frequente.</p>")}` },
    { h: 'Verbi regolari: -ed', b: `
      <p>La forma è uguale per tutte le persone.</p>
      ${T(['Il verbo finisce in…', 'Regola', 'Esempi'], [['-e', '+ d', 'live → lived, arrive → arrived'], ['consonante + y', 'y → ied', 'study → studied, try → tried (ma play → played)'], ['consonante-vocale-consonante accentata', 'raddoppio + ed', 'stop → stopped, plan → planned, prefer → preferred'], ['-l (britannico)', 'raddoppio + ed', 'travel → travelled'], ['tutti gli altri', '+ ed', 'work → worked, want → wanted']], 'plain')}
      <h3>Come si pronuncia -ed</h3>
      ${T(['Suono', 'Quando', 'Esempi'], [['/t/', 'dopo suoni sordi: p, k, s, sh, ch, f', 'worked, stopped, watched, washed'], ['/d/', 'dopo suoni sonori e vocali', 'played, lived, called, opened'], ['/ɪd/', 'solo dopo t e d', 'wanted, needed, visited, decided']], 'plain')}
      ${EX(['worked', ''], ['played', ''], ['wanted', ''])}
      ${N('<p>La sillaba in più /ɪd/ si sente <b>solo</b> dopo t e d. <i>Worked</i> è una sillaba sola: "uorkt", non "uorked".</p>')}` },
    { h: 'Verbi irregolari', b: `
      <p>Molti verbi comuni hanno un past simple proprio, da imparare a memoria. Questi sono i più frequenti:</p>
      ${T(['Base', 'Past simple', 'Base', 'Past simple'], [['be', 'was / were', 'go', 'went'], ['have', 'had', 'get', 'got'], ['do', 'did', 'make', 'made'], ['say', 'said', 'see', 'saw'], ['come', 'came', 'take', 'took'], ['know', 'knew', 'think', 'thought'], ['buy', 'bought', 'eat', 'ate'], ['give', 'gave', 'find', 'found'], ['tell', 'told', 'leave', 'left']], 'plain')}
      <p>L'elenco completo, con l'allenamento, è nella pagina <a href="#/irregolari">Verbi irregolari</a>.</p>` },
    { h: 'Negativa e domande: did', b: `
      <p>Come al presente con do, ma l'ausiliare è <b>did</b> per tutte le persone. Dopo did il verbo torna alla <b>forma base</b>: il passato lo porta già l'ausiliare.</p>
      ${T(['Affermativa', 'Negativa', 'Domanda'], [['I worked', "I didn't work", 'Did you work?'], ['she went', "she didn't go", 'Did she go?'], ['they saw', "they didn't see", 'What did they see?']], 'plain')}
      ${EX(["We <b>didn't go</b> out last night.", 'Ieri sera non siamo usciti.'], ['<b>Did</b> you <b>enjoy</b> the film? — Yes, I <b>did</b>.', 'Ti è piaciuto il film? — Sì.'], ['What <b>did</b> you <b>do</b> at the weekend?', 'Cosa hai fatto nel fine settimana?'])}
      <p>Le eccezioni sono le stesse del presente: <b>be</b> non usa did (<i>Were you tired?</i>), e le domande sul soggetto nemmeno (<i>Who <b>called</b> you?</i>).</p>` },
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
