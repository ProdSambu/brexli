UNIT({
  id: 'a1-07', n: 7, level: 'A1', stop: 'Present continuous',
  title: 'Present continuous',
  sub: 'Azioni in corso, situazioni temporanee, la differenza con il present simple',
  intro: "In italiano \"cosa fai?\" può voler dire due cose: che lavoro fai, oppure cosa stai facendo adesso. In inglese sono due tempi diversi. Questo è quello per <b>adesso</b>: corrisponde al nostro \"sto facendo\".",
  theory: [
    { h: 'Come si forma', b: `
      <p>È uguale all'italiano "<b>sto</b> mangi<b>ando</b>": due pezzi. Al posto di "sto, stai, sta" metti <b>am / is / are</b>; al posto di "-ando / -endo" metti <b>-ing</b>.</p>
      ${T(['Affermativa', 'Negativa', 'Domanda'], [["I'm working", "I'm not working", 'Am I working?'], ["you're working", "you aren't working", 'Are you working?'], ["he / she / it's working", "he / she / it isn't working", 'Is he / she / it working?'], ["we / they're working", "we / they aren't working", 'Are we / they working?']], 'plain')}
      ${EX(["I'm writing an email.", 'Sto scrivendo una mail.'], ["It's raining.", 'Sta piovendo.'], ['What are you doing?', 'Cosa stai facendo?'])}
      ${TIP(`<p><b>sto</b> + mangi<b>ando</b> = <b>I'm</b> + eat<b>ing</b>. Due pezzi in italiano, due pezzi in inglese: se ne scrivi uno solo (<i>I eating</i>), manca qualcosa.</p><p>Negativa e domanda funzionano come con <i>be</i> alla fermata 1: <i>I'm not eating</i>, <i>Are you eating?</i></p>`)}` },
    { h: 'Regole di scrittura dell\'-ing', b: `
      <p>Quasi sempre basta aggiungere <b>-ing</b>. Ci sono tre piccoli casi in cui la parola cambia:</p>
      ${T(['Il verbo finisce in…', 'Regola', 'Esempi'], [['-e muta', 'cade la e', 'write → writing, make → making, have → having'], ['-ie', 'ie → y', 'lie → lying, die → dying'], ['consonante-vocale-consonante, accento sull\'ultima sillaba', 'si raddoppia la consonante', 'sit → sitting, run → running, stop → stopping, begin → beginning'], ['tutti gli altri', '+ ing', 'play → playing, eat → eating, open → opening']], 'plain')}
      ${N("<p>La consonante non raddoppia quando la voce non cade sulla fine della parola (<i>open → opening, visit → visiting</i>) e non raddoppiano mai w, x, y (<i>show → showing, fix → fixing</i>).</p><p>Nell'inglese britannico la <b>l</b> finale raddoppia sempre: <i>travel → travelling</i> (in americano <i>traveling</i>).</p>")}
      ${TIP(`<p>Per il raddoppio pensa a un panino: <b>consonante + vocale + consonante</b> (s-i-t, r-u-n, s-t-o-p). Se la parola finisce così, la consonante finale si raddoppia per "proteggere" la vocale: <i>sit<b>t</b>ing, run<b>n</b>ing, stop<b>p</b>ing</i>.</p>`)}` },
    { h: 'Quando si usa', b: `
      <p>Per quello che succede <b>proprio adesso</b>, o <b>in questo periodo</b> e poi finirà.</p>
      ${T(['Uso', 'Esempio'], [['azione in corso adesso', "Be quiet, the baby<b>'s sleeping</b>."], ['situazione temporanea', "I<b>'m working</b> from home this week."], ['cambiamento in corso', "It<b>'s getting</b> dark."], ['programmi futuri già fissati (fermata 11)', "I<b>'m meeting</b> Anna tomorrow."]], 'plain')}
      <p>Lo riconosci da parole come <i>now</i> (adesso), <i>right now</i> (proprio adesso), <i>at the moment</i> (in questo momento), <i>today, this week</i>, e da <i>Look!</i> (guarda!) e <i>Listen!</i> (ascolta!).</p>
      ${TIP(`<p>Se in italiano puoi dire <b>"sto + -ando / -endo"</b> (sto lavorando, sta piovendo), in inglese usi il present continuous.</p>`)}` },
    { h: 'Simple o continuous?', b: `
      <p>Il present simple è per le cose <b>di sempre</b>, il present continuous per le cose <b>di adesso</b>:</p>
      ${T(['Present simple', 'Present continuous'], [['abitudine, cosa permanente', 'ora, cosa temporanea'], ['I <b>work</b> in Milan. (è il mio lavoro)', "I<b>'m working</b> in Milan this month. (per ora)"], ['What <b>do</b> you <b>do</b>? (che lavoro fai?)', 'What <b>are</b> you <b>doing</b>? (cosa stai facendo?)'], ['It <b>rains</b> a lot in London.', "It<b>'s raining</b>. Take an umbrella."]], 'plain')}
      <p>Ricordati dei <b>verbi di stato</b> della fermata 4 (<i>know, like, want, need, understand, believe…</i>): restano al simple anche se parli di adesso.</p>
      ${EX(['I <b>know</b> what you mean.', 'So cosa intendi.'], ['I <b>want</b> a coffee.', 'Voglio un caffè.'])}
      ${N("<p><b>Have</b> quando vuol dire \"possedere\" è uno stato (<i>I have a car</i>). Quando è un'azione invece va in -ing: <i>I'm having breakfast</i> (sto facendo colazione), <i>She's having a shower</i> (si sta facendo la doccia).</p><p>Lo stesso vale per <b>think</b>: <i>I think so</i> (penso di sì, è un'opinione) ma <i>I'm thinking about it</i> (ci sto pensando).</p>")}
      ${TIP(`<p>Fatti una domanda: <b>"Di solito o adesso?"</b> Di solito → <i>I work</i>. Adesso → <i>I'm working</i>.</p><p>E se il verbo è "invisibile" (sapere, volere, piacere), resta sempre al simple.</p>`)}` },
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
