UNIT({
  id: 'a2-07', n: 7, level: 'A2', stop: 'Must e have to',
  title: '<i>Must</i>, <i>have to</i>, <i>should</i>',
  sub: 'Dovere, non dovere, dovresti',
  intro: "L'italiano ha un solo verbo, dovere. L'inglese ne usa tre, e al negativo cambiano del tutto significato: \"you mustn't\" e \"you don't have to\" vogliono dire cose quasi opposte.",
  theory: [
    { h: 'Must e have to', b: `
      <p>Al positivo significano tutti e due "dovere" e spesso sono intercambiabili. La sfumatura:</p>
      ${T(['', 'Chi decide l\'obbligo', 'Esempio'], [['must', 'chi parla (o un cartello, un regolamento scritto)', 'I must call my mum. · Passengers must wear seat belts.'], ['have to', 'le circostanze, le regole esterne', 'I have to work on Saturdays. · She has to wear a uniform.']], 'plain')}
      <p><b>Must</b> è un modale: forma unica, niente <i>to</i>, niente <i>do</i> (<i>she must go</i>). <b>Have to</b> è un verbo normale: <i>she has to go, do you have to go?, I don't have to go</i>.</p>
      ${N('<p>Must non ha passato né futuro: si usa have to. Passato: <b>had to</b> (<i>I had to wait</i>). Futuro: <b>will have to</b> (<i>You\'ll have to wait</i>).</p>')}` },
    { h: "Mustn't o don't have to? La trappola", b: `
      ${T(['Forma', 'Significato', 'Esempio'], [["mustn't", 'è vietato, non farlo!', "You <b>mustn't</b> smoke here. (Qui non si fuma.)"], ["don't have to", 'non è necessario, puoi farlo o no', "You <b>don't have to</b> come. (Non sei obbligato.)"]], 'plain')}
      ${EX(["You <b>mustn't</b> tell anyone.", 'Non devi dirlo a nessuno.'], ["Tomorrow is Sunday, so I <b>don't have to</b> get up early.", 'Domani è domenica, quindi non devo alzarmi presto.'])}
      <p>In italiano "non devi" vale per entrambi i casi. Chiediti: è un divieto o solo una cosa non necessaria?</p>` },
    { h: 'Should: il consiglio', b: `
      <p><b>should</b> = dovrei, dovresti (consiglio, opinione). È un modale come can e must.</p>
      ${EX(['You <b>should</b> see a doctor.', 'Dovresti andare dal medico.'], ["You <b>shouldn't</b> eat so much sugar.", 'Non dovresti mangiare tanto zucchero.'], ['<b>Should</b> I call her?', 'Dovrei chiamarla?'], ['I think you <b>should</b> go.', 'Secondo me dovresti andare.'])}` },
    { h: 'Errori tipici', b: ERR(
      ["You don't have to smoke here.", "You mustn't smoke here.", 'È un divieto: mustn\'t.'],
      ['I must to go.', 'I must go.', 'Dopo must niente to.'],
      ['She musts work.', 'She must work.', 'I modali non prendono la -s.'],
      ['Yesterday I must work late.', 'Yesterday I had to work late.', 'Al passato: had to.'],
      ['You should to rest.', 'You should rest.', 'Dopo should niente to.'],
      ['Do I must pay?', 'Do I have to pay?', 'Nelle domande si usa have to (o Must I pay?, più formale).']) },
  ],
  exercises: [
    { t: 'c', q: "You ___ park here. It's a hospital entrance.", o: ["mustn't", "don't have to"], a: "mustn't", why: 'È un divieto.' },
    { t: 'c', q: "It's Saturday, so I ___ go to work.", o: ["don't have to", "mustn't"], a: "don't have to", why: 'Non è vietato, solo non necessario.' },
    { t: 'c', q: 'She ___ wear a uniform at work.', o: ['has to', 'have to', 'must to'], a: 'has to' },
    { t: 'c', q: 'Yesterday I ___ wait for two hours.', o: ['had to', 'must', 'musted'], a: 'had to' },
    { t: 'c', q: "You look tired. You ___ go to bed.", o: ['should', 'must to', 'have'], a: 'should' },
    { t: 'c', q: '___ I bring anything to the party?', o: ['Do I have to', 'Do I must', 'Have I to'], a: 'Do I have to' },
    { t: 'c', q: "You ___ tell her. It's a secret!", o: ["mustn't", "don't have to", "shouldn't to"], a: "mustn't" },
    { t: 'f', q: 'You ___ pay now. You can pay later.', h: 'have to, negativa', a: ["don't have to", 'do not have to'] },
    { t: 'f', q: 'I ___ go to the dentist tomorrow.', h: 'have to', a: ['have to'] },
    { t: 'f', q: 'He ___ get up early yesterday.', h: 'have to, passato', a: ['had to'] },
    { t: 'f', q: 'You ___ eat so much chocolate.', h: 'should, negativa', a: ["shouldn't", 'should not'] },
    { t: 'x', q: 'I must to go now.', a: ['I must go now.', 'I have to go now.'] },
    { t: 'x', q: 'She musts work late.', a: ['She must work late.', 'She has to work late.'] },
    { t: 'x', q: 'Yesterday I must work late.', a: ['Yesterday I had to work late.', 'I had to work late yesterday.'] },
    { t: 'x', q: 'You should to see a doctor.', a: ['You should see a doctor.'] },
    { t: 't', it: 'Non devi toccarlo! È pericoloso.', a: ["You mustn't touch it! It's dangerous.", "Don't touch it! It's dangerous."] },
    { t: 't', it: 'Non devi venire se non vuoi.', a: ["You don't have to come if you don't want to.", "You don't have to come if you don't want."] },
    { t: 't', it: 'Dovresti studiare di più.', a: ['You should study more.'] },
    { t: 't', it: 'Ho dovuto prendere un taxi.', a: ['I had to take a taxi.', 'I had to get a taxi.', 'I had to take a cab.'] },
    { t: 'o', it: 'Dobbiamo partire alle sei.', a: ['We have to leave at six.'] },
    { t: 'o', it: 'Secondo te dovrei chiamarlo?', a: ['Do you think I should call him?'] },
  ],
});
