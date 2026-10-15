UNIT({
  id: 'a1-04', n: 4, level: 'A1', stop: 'Present simple',
  title: 'Present simple: forma affermativa',
  sub: 'Abitudini e fatti, la -s della terza persona, regole di scrittura',
  intro: "Il primo vero tempo verbale. È facilissimo da formare, ma ha una trappola che resta attaccata per anni: la -s alla terza persona singolare.",
  theory: [
    { h: 'Quando si usa', b: `
      <p>Il present simple descrive cose che sono vere in generale o che si ripetono: abitudini, routine, fatti, stati permanenti.</p>
      ${EX(['I <b>work</b> in Milan.', 'Lavoro a Milano.'], ['She <b>drinks</b> coffee every morning.', 'Beve il caffè tutte le mattine.'], ['Water <b>boils</b> at 100 degrees.', "L'acqua bolle a 100 gradi."], ['We <b>live</b> near the station.', 'Abitiamo vicino alla stazione.'])}
      <p>Non si usa per ciò che sta succedendo in questo momento: per quello c'è il present continuous (unità 7). Il presente italiano copre entrambi i casi, l'inglese no.</p>` },
    { h: 'Come si forma', b: `
      <p>Si usa la forma base del verbo (l'infinito senza <i>to</i>) per tutte le persone, <b>tranne he, she, it, che aggiungono -s</b>.</p>
      ${T(['Persona', 'work', 'live'], [['I', 'work', 'live'], ['you', 'work', 'live'], ['<b>he / she / it</b>', '<b>works</b>', '<b>lives</b>'], ['we', 'work', 'live'], ['they', 'work', 'live']])}
      <p>La -s va con qualunque soggetto singolare di terza persona, anche nomi e parole come <i>everybody, nobody, my mother, the shop</i>.</p>
      ${EX(['My mother <b>works</b> in a hospital.', 'Mia madre lavora in ospedale.'], ['Everybody <b>knows</b> him.', 'Lo conoscono tutti.'], ['The shop <b>opens</b> at nine.', 'Il negozio apre alle nove.'])}` },
    { h: 'Regole di scrittura della -s', b: `
      ${T(['Il verbo finisce in…', 'Si aggiunge', 'Esempi'], [['-s, -ss, -sh, -ch, -x, -o', '-es', 'watch → watches, finish → finishes, go → goes, do → does'], ['consonante + y', '-ies', 'study → studies, try → tries, fly → flies'], ['vocale + y', '-s', 'play → plays, buy → buys, say → says'], ['tutti gli altri', '-s', 'work → works, eat → eats']], 'plain')}
      ${N('<p>A parte <i>be</i> (he <b>is</b>), l\'unico verbo con una terza persona davvero irregolare è <b>have → has</b>: <i>He has a dog</i>, non <i>he haves</i>.</p>')}` },
    { h: 'Le espressioni di tempo', b: `
      ${T(['Inglese', 'Italiano'], [['every day / every week', 'ogni giorno / ogni settimana'], ['on Mondays', 'il lunedì (tutti i lunedì)'], ['at the weekend', 'nel fine settimana'], ['in the morning / in the evening', 'di mattina / di sera'], ['at night', 'di notte'], ['once a week', 'una volta alla settimana'], ['twice a month', 'due volte al mese']], 'plain')}
      ${EX(['I go to the gym <b>twice a week</b>.', 'Vado in palestra due volte alla settimana.'], ['He plays football <b>on Saturdays</b>.', 'Gioca a calcio il sabato.'])}
      ${N("<p>Le espressioni di tempo di solito vanno <b>in fondo</b> alla frase (o all'inizio), non in mezzo tra verbo e complemento.</p>")}` },
    { h: 'Verbi di stato', b: `
      <p>Alcuni verbi non descrivono azioni ma stati: gusti, pensieri, possesso. Si usano quasi sempre al present simple, anche se il riferimento è "adesso".</p>
      ${T(['Gusti', 'Mente', 'Altro'], [['like, love, hate, prefer', 'know, understand, believe, remember', 'want, need, own, belong']], 'plain')}
      ${EX(['I <b>know</b> the answer.', 'So la risposta.'], ['She <b>wants</b> a new phone.', 'Vuole un telefono nuovo.'])}` },
    { h: 'Errori tipici', b: ERR(
      ['He work in a bank.', 'He works in a bank.', 'Terza persona singolare: serve la -s.'],
      ['My parents lives in Turin.', 'My parents live in Turin.', 'My parents è plurale: niente -s.'],
      ['She haves a dog.', 'She has a dog.', 'Have alla terza persona diventa has.'],
      ['He studys medicine.', 'He studies medicine.', 'Consonante + y: -ies.'],
      ['I go every day to work.', 'I go to work every day.', "L'espressione di tempo va in fondo."]) },
  ],
  exercises: [
    { t: 'f', q: 'She ___ in a bank.', h: 'work', a: ['works'] },
    { t: 'f', q: 'My brother ___ medicine.', h: 'study', a: ['studies'], why: 'Consonante + y: la y diventa ies.' },
    { t: 'f', q: 'He ___ TV every evening.', h: 'watch', a: ['watches'], why: 'Verbi in -ch: + es.' },
    { t: 'f', q: 'The film ___ at ten.', h: 'finish', a: ['finishes'] },
    { t: 'f', q: 'My parents ___ in Turin.', h: 'live', a: ['live'], why: 'Soggetto plurale: nessuna -s.' },
    { t: 'f', q: 'Water ___ at 100 degrees.', h: 'boil', a: ['boils'] },
    { t: 'f', q: 'She ___ breakfast at seven.', h: 'have', a: ['has'] },
    { t: 'f', q: 'He ___ to the gym twice a week.', h: 'go', a: ['goes'] },
    { t: 'f', q: 'Tom ___ the guitar.', h: 'play', a: ['plays'], why: 'Vocale + y: solo -s.' },
    { t: 'f', q: 'Everybody ___ him.', h: 'know', a: ['knows'], why: 'Everybody è singolare in inglese.' },
    { t: 'c', q: 'My sister and I ___ to the same school.', o: ['go', 'goes'], a: 'go', why: 'My sister and I = we.' },
    { t: 'c', q: 'The museum ___ on Mondays.', o: ['close', 'closes', 'closing'], a: 'closes' },
    { t: 'x', q: 'She speak three languages.', a: ['She speaks three languages.'] },
    { t: 'x', q: 'My friends lives near here.', a: ['My friends live near here.'] },
    { t: 'x', q: 'He trys to help.', a: ['He tries to help.'] },
    { t: 't', it: 'Mio padre lavora in ospedale.', a: ['My father works in a hospital.', 'My dad works in a hospital.', 'My father works at a hospital.', 'My dad works at a hospital.', 'My father works in the hospital.', 'My dad works in the hospital.', 'My father works at the hospital.', 'My dad works at the hospital.'] },
    { t: 't', it: 'Il lunedì vado in palestra.', a: ['I go to the gym on Mondays.', 'On Mondays I go to the gym.', 'I go to the gym on Monday.', 'On Monday I go to the gym.', 'I go to the gym every Monday.', 'Every Monday I go to the gym.'] },
    { t: 't', it: 'Lei guarda la TV ogni sera.', a: ['She watches TV every evening.', 'She watches TV every night.', 'Every evening she watches TV.', 'Every night she watches TV.', 'She watches television every evening.', 'She watches television every night.'], why: 'Watch TV si dice senza articolo.' },
    { t: 'o', it: 'Il negozio apre alle nove.', a: ['The shop opens at nine.'] },
    { t: 'o', it: 'Mia sorella vive a Londra.', a: ['My sister lives in London.'] },
  ],
});
