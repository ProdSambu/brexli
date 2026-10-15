UNIT({
  id: 'a2-10', n: 10, level: 'A2', stop: '-ing o to',
  title: 'Verbo + <i>-ing</i> o verbo + <i>to</i>',
  sub: 'Enjoy swimming, want to swim; dopo le preposizioni; lo scopo',
  intro: "Quando un verbo ne regge un altro, in italiano c'è quasi sempre l'infinito. In inglese dipende dal primo verbo: alcuni vogliono la forma in -ing, altri to + verbo, e qualcuno cambia significato.",
  theory: [
    { h: 'Verbi seguiti da -ing', b: `
      ${T(['Verbo', 'Esempio', 'Italiano'], [['enjoy', 'I enjoy <b>swimming</b>.', 'Mi piace nuotare.'], ['finish', "I've finished <b>reading</b> it.", "Ho finito di leggerlo."], ['mind', "Do you mind <b>waiting</b>?", 'Ti dispiace aspettare?'], ['avoid', 'Avoid <b>eating</b> late.', 'Evita di mangiare tardi.'], ['suggest', 'He suggested <b>going</b> out.', 'Ha proposto di uscire.'], ['keep', 'She keeps <b>calling</b> me.', 'Continua a chiamarmi.'], ['miss', 'I miss <b>living</b> by the sea.', 'Mi manca vivere al mare.'], ['imagine, practise, consider', "Imagine <b>living</b> there!", 'Immagina di vivere lì!'], ["can't stand · don't mind", "I can't stand <b>waiting</b>.", 'Non sopporto aspettare.']], 'plain')}` },
    { h: 'Verbi seguiti da to + verbo', b: `
      ${T(['Verbo', 'Esempio', 'Italiano'], [['want · would like', 'I want <b>to go</b> home.', 'Voglio andare a casa.'], ['need', 'You need <b>to rest</b>.', 'Devi riposare.'], ['decide', 'We decided <b>to stay</b>.', 'Abbiamo deciso di restare.'], ['hope · plan', 'I hope <b>to see</b> you soon.', 'Spero di vederti presto.'], ['promise · agree · refuse', 'She promised <b>to help</b>.', 'Ha promesso di aiutare.'], ['learn · manage', 'I managed <b>to finish</b>.', 'Sono riuscito a finire.'], ['offer · seem · forget', 'He offered <b>to drive</b>.', 'Si è offerto di guidare.']], 'plain')}
      <p>Con <b>like, love, hate, start, begin, continue</b> vanno bene tutte e due: <i>I like swimming / I like to swim. It started raining / It started to rain.</i> Ma <b>would like</b> vuole sempre to: <i>I'd like to go.</i></p>` },
    { h: 'Due verbi che cambiano significato', b: `
      ${T(['Forma', 'Significato', 'Esempio'], [['stop + -ing', 'smettere di fare', 'I stopped <b>smoking</b>. (ho smesso di fumare)'], ['stop + to', 'fermarsi per fare', 'I stopped <b>to smoke</b>. (mi sono fermato a fumare)'], ['remember + -ing', 'ricordarsi di aver fatto', 'I remember <b>meeting</b> him. (mi ricordo di averlo conosciuto)'], ['remember + to', 'ricordarsi di fare', 'Remember <b>to lock</b> the door. (ricordati di chiudere)']], 'plain')}` },
    { h: 'Dopo una preposizione: sempre -ing', b: `
      <p>Dopo <i>at, in, of, for, about, before, after, without</i> e tutte le altre preposizioni, il verbo va in <b>-ing</b>. In italiano c'è l'infinito.</p>
      ${EX(["I'm good <b>at cooking</b>.", 'Sono bravo a cucinare.'], ["Thanks <b>for helping</b> me.", 'Grazie di avermi aiutato.'], ["She left <b>without saying</b> goodbye.", 'È andata via senza salutare.'], ["I'm thinking <b>about moving</b>.", 'Sto pensando di trasferirmi.'], ['Wash your hands <b>before eating</b>.', 'Lavati le mani prima di mangiare.'])}` },
    { h: 'Lo scopo: to, non for', b: `
      <p>Per dire <i>perché</i> fai qualcosa (per + infinito) si usa <b>to</b> + verbo.</p>
      ${EX(['I went to the shop <b>to buy</b> some milk.', 'Sono andato al negozio per comprare del latte.'], ["I'm saving money <b>to travel</b>.", 'Risparmio per viaggiare.'])}
      ${N('<p><i>for buy</i> è un calco dall\'italiano e non esiste. <b>For</b> si usa con un nome: <i>I went out for a walk</i>.</p>')}` },
    { h: 'Errori tipici', b: ERR(
      ['I enjoy to swim.', 'I enjoy swimming.', 'Enjoy vuole -ing.'],
      ['I want going home.', 'I want to go home.', 'Want vuole to.'],
      ["I'm interested in learn English.", "I'm interested in learning English.", 'Dopo una preposizione: -ing.'],
      ['I went there for buy bread.', 'I went there to buy bread.', 'Lo scopo si esprime con to.'],
      ['Thank you for help me.', 'Thank you for helping me.', 'Dopo for: -ing.']) },
  ],
  exercises: [
    { t: 'f', q: 'I enjoy ___ in the sea.', h: 'swim', a: ['swimming'] },
    { t: 'f', q: 'We decided ___ at home.', h: 'stay', a: ['to stay'] },
    { t: 'f', q: 'Do you mind ___ the window?', h: 'open', a: ['opening'] },
    { t: 'f', q: 'She promised ___ me.', h: 'help', a: ['to help'] },
    { t: 'f', q: "I'm good at ___.", h: 'cook', a: ['cooking'] },
    { t: 'f', q: 'He left without ___ goodbye.', h: 'say', a: ['saying'] },
    { t: 'f', q: "I'd like ___ a coffee, please.", h: 'have', a: ['to have'] },
    { t: 'f', q: 'Have you finished ___ the report?', h: 'write', a: ['writing'] },
    { t: 'c', q: 'I need ___ more sleep.', o: ['to get', 'getting', 'get'], a: 'to get' },
    { t: 'c', q: 'He stopped ___ two years ago. Now he\'s much healthier.', o: ['smoking', 'to smoke'], a: 'smoking', why: 'Ha smesso di fumare: stop + -ing.' },
    { t: 'c', q: 'Remember ___ the lights before you go out.', o: ['to turn off', 'turning off'], a: 'to turn off', why: 'Ricordati di fare una cosa: remember + to.' },
    { t: 'c', q: 'I went to the bank ___ some money.', o: ['to get', 'for get', 'for getting'], a: 'to get' },
    { t: 'c', q: 'She suggested ___ a taxi.', o: ['taking', 'to take'], a: 'taking' },
    { t: 'x', q: 'I enjoy to swim.', a: ['I enjoy swimming.'] },
    { t: 'x', q: "I'm interested in learn English.", a: ["I'm interested in learning English."] },
    { t: 'x', q: 'I went there for buy bread.', a: ['I went there to buy bread.', 'I went there to buy some bread.'] },
    { t: 'x', q: 'Thank you for help me.', a: ['Thank you for helping me.'] },
    { t: 't', it: 'Ho deciso di imparare lo spagnolo.', a: ["I've decided to learn Spanish.", 'I decided to learn Spanish.'] },
    { t: 't', it: 'Mi piace leggere.', a: ['I like reading.', 'I like to read.', 'I enjoy reading.', 'I love reading.', 'I love to read.'] },
    { t: 't', it: 'Grazie di essere venuto.', a: ['Thank you for coming.', 'Thanks for coming.'] },
    { t: 'o', it: 'Smetti di lamentarti!', a: ['Stop complaining!'] },
  ],
});
