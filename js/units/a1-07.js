UNIT({
  id: 'a1-07', n: 7, level: 'A1', stop: 'Present continuous',
  title: 'Present continuous',
  sub: 'Azioni in corso, situazioni temporanee, la differenza con il present simple',
  intro: "\"Cosa fai?\" in italiano può voler dire due cose: che lavoro fai, o cosa stai facendo adesso. In inglese sono due tempi diversi, e sbagliare cambia il senso della frase.",
  theory: [
    { h: 'Come si forma', b: `
      <p><b>be</b> (am / is / are) + verbo in <b>-ing</b>.</p>
      ${T(['Affermativa', 'Negativa', 'Domanda'], [["I'm working", "I'm not working", 'Am I working?'], ["you're working", "you aren't working", 'Are you working?'], ["he / she / it's working", "he / she / it isn't working", 'Is he / she / it working?'], ["we / they're working", "we / they aren't working", 'Are we / they working?']], 'plain')}
      ${EX(["I'm writing an email.", 'Sto scrivendo una mail.'], ["It's raining.", 'Sta piovendo.'], ['What are you doing?', 'Cosa stai facendo?'])}` },
    { h: 'Regole di scrittura dell\'-ing', b: `
      ${T(['Il verbo finisce in…', 'Regola', 'Esempi'], [['-e muta', 'cade la e', 'write → writing, make → making, have → having'], ['-ie', 'ie → y', 'lie → lying, die → dying'], ['consonante-vocale-consonante, accento sull\'ultima sillaba', 'si raddoppia la consonante', 'sit → sitting, run → running, stop → stopping, begin → beginning'], ['tutti gli altri', '+ ing', 'play → playing, eat → eating, open → opening']], 'plain')}
      ${N("<p>Non si raddoppia se l'accento non è sull'ultima sillaba (<i>open → opening, visit → visiting</i>) o se la consonante finale è w, x, y (<i>show → showing, fix → fixing</i>). Nell'inglese britannico una l finale preceduta da una sola vocale si raddoppia anche senza accento: <i>travel → travelling, cancel → cancelling</i> (in americano <i>traveling</i>).</p>")}` },
    { h: 'Quando si usa', b: `
      ${T(['Uso', 'Esempio'], [['azione in corso adesso', "Be quiet, the baby<b>'s sleeping</b>."], ['situazione temporanea', "I<b>'m working</b> from home this week."], ['cambiamento in corso', "It<b>'s getting</b> dark."], ['programmi futuri già fissati (unità 11)', "I<b>'m meeting</b> Anna tomorrow."]], 'plain')}
      <p>Parole che spesso lo accompagnano: <i>now, right now, at the moment, today, this week, these days, Look!, Listen!</i></p>` },
    { h: 'Simple o continuous?', b: `
      ${T(['Present simple', 'Present continuous'], [['abitudine, cosa permanente', 'ora, cosa temporanea'], ['I <b>work</b> in Milan. (è il mio lavoro)', "I<b>'m working</b> in Milan this month. (per ora)"], ['What <b>do</b> you <b>do</b>? (che lavoro fai?)', 'What <b>are</b> you <b>doing</b>? (cosa stai facendo?)'], ['It <b>rains</b> a lot in London.', "It<b>'s raining</b>. Take an umbrella."]], 'plain')}
      <p>I <b>verbi di stato</b> visti nell'unità 4 (know, like, want, need, understand, believe, belong...) restano al simple anche se parli di adesso.</p>
      ${EX(['I <b>know</b> what you mean.', 'So cosa intendi.'], ['I <b>want</b> a coffee.', 'Voglio un caffè.'])}
      ${N("<p><b>Have</b> nel senso di possedere è di stato (<i>I have a car</i>), ma nelle espressioni d'azione va al continuous: <i>I'm having breakfast, She's having a shower, We're having fun</i>. Lo stesso per <b>think</b>: <i>I think so</i> (opinione) ma <i>I'm thinking about it</i> (ci sto pensando).</p>")}` },
    { h: 'Errori tipici', b: ERR(
      ['I am knowing the answer.', 'I know the answer.', 'Know è un verbo di stato.'],
      ['Look! It rains.', "Look! It's raining.", 'Sta succedendo adesso.'],
      ['She is haveing a shower.', "She's having a shower.", 'La e muta cade.'],
      ['I working now.', "I'm working now.", 'Manca be.'],
      ['I am waiting the bus.', "I'm waiting for the bus.", 'Aspettare qualcuno/qualcosa = wait for.']) },
  ],
  exercises: [
    { t: 'f', q: 'Listen! The baby ___!', h: 'cry', a: ['is crying', "'s crying"] },
    { t: 'f', q: 'I ___ an email at the moment.', h: 'write', a: ['am writing', "'m writing"] },
    { t: 'f', q: 'They ___ to me.', h: 'not / listen', a: ["aren't listening", 'are not listening', "'re not listening"] },
    { t: 'f', q: 'What ___ you doing?', a: ['are'] },
    { t: 'f', q: 'She ___ next to the window.', h: 'sit', a: ['is sitting', "'s sitting"], why: 'Sit: consonante-vocale-consonante, si raddoppia la t.' },
    { t: 'f', q: 'We ___ a great time.', h: 'have', a: ['are having', "'re having"] },
    { t: 'c', q: "I ___ this soup. It's delicious.", o: ['love', 'am loving'], a: 'love', why: 'Love è un verbo di stato.' },
    { t: 'c', q: 'Water ___ at 100 degrees.', o: ['boils', 'is boiling'], a: 'boils', why: 'Fatto sempre vero: present simple.' },
    { t: 'c', q: 'Be quiet! The children ___.', o: ['sleep', 'are sleeping'], a: 'are sleeping' },
    { t: 'c', q: 'This week I ___ from home.', o: ['work', 'am working'], a: 'am working', why: 'Situazione temporanea.' },
    { t: 'c', q: '"What do you do?" significa…', o: ['Che lavoro fai?', 'Cosa stai facendo?'], a: 'Che lavoro fai?' },
    { t: 'c', q: 'I ___ what you mean.', o: ['understand', 'am understanding'], a: 'understand' },
    { t: 'x', q: 'I am knowing the answer.', a: ['I know the answer.'] },
    { t: 'x', q: 'Look! It rains.', a: ["Look! It's raining."] },
    { t: 'x', q: 'She is haveing a shower.', a: ["She's having a shower."] },
    { t: 't', it: 'Cosa stai facendo?', a: ['What are you doing?'] },
    { t: 't', it: "Sto aspettando l'autobus.", a: ["I'm waiting for the bus."], why: 'Wait vuole for.' },
    { t: 't', it: 'Questa settimana lavoro da casa.', a: ["I'm working from home this week.", "This week I'm working from home."] },
    { t: 'o', it: 'Non sta piovendo adesso.', a: ['It is not raining now.'] },
    { t: 'o', it: 'Con chi stai parlando?', a: ['Who are you talking to?'], why: 'La preposizione va in fondo alla domanda.' },
  ],
});
