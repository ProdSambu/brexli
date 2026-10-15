UNIT({
  id: 'a2-06', n: 6, level: 'A2', stop: 'Much e many',
  title: '<i>Much</i>, <i>many</i>, <i>a lot of</i>, <i>a few</i>, <i>a little</i>',
  sub: 'Nomi numerabili e non numerabili, le quantità',
  intro: "\"Molto\" e \"poco\" in inglese cambiano a seconda che la cosa si possa contare o no. E alcune parole che in italiano si contano (informazioni, consigli, mobili) in inglese non si contano affatto.",
  theory: [
    { h: 'Numerabili e non numerabili', b: `
      <p>I nomi <b>numerabili</b> hanno il plurale e si possono contare: <i>a chair, two chairs</i>. I <b>non numerabili</b> non hanno plurale e non vogliono <i>a / an</i>: <i>water, money, music</i>.</p>
      <p>Alcuni sono non numerabili in inglese ma numerabili in italiano. Sono singolari e non prendono mai la -s:</p>
      ${T(['Inglese', 'Italiano'], [['information', 'informazioni'], ['advice', 'consigli'], ['news', 'notizie'], ['furniture', 'mobili'], ['luggage · baggage', 'bagagli'], ['homework', 'compiti'], ['hair', 'capelli'], ['bread', 'pane'], ['work', 'lavoro'], ['traffic · weather', 'traffico · tempo atmosferico']], 'plain')}
      ${EX(['Can you give me some <b>information</b>?', 'Mi puoi dare delle informazioni?'], ['Her <b>hair</b> is very long.', 'Ha i capelli lunghissimi.'], ['That\'s a good <b>piece of advice</b>.', 'È un buon consiglio.'])}
      ${N('<p>Per contarli si usa un\'unità: <i>a piece of advice, a piece of furniture, a slice of bread, a bottle of water</i>.</p>')}` },
    { h: 'Much, many, a lot of', b: `
      ${T(['', 'Con', 'Dove si usa', 'Esempio'], [['many', 'numerabili plurali', 'soprattutto negative e domande', "There aren't many people."], ['much', 'non numerabili', 'soprattutto negative e domande', "I don't have much time."], ['a lot of · lots of', 'tutti e due', 'soprattutto affermative', 'She has a lot of friends. · We drank lots of water.']], 'plain')}
      <p>Le domande sulla quantità: <b>How many</b> + plurale, <b>How much</b> + non numerabile (e per i prezzi: <i>How much is it?</i>).</p>
      ${EX(['How <b>many</b> brothers have you got?', 'Quanti fratelli hai?'], ['How <b>much</b> money do you need?', 'Quanti soldi ti servono?'])}
      ${N("<p>Nelle frasi affermative <i>much</i> suona formale o strano: <i>I have much money</i> non si dice. Si usa <b>a lot of</b>.</p>")}` },
    { h: 'A few, a little, few, little', b: `
      ${T(['', 'Con', 'Senso', 'Esempio'], [['a few', 'numerabili', 'qualche, alcuni (abbastanza)', 'I have a few friends in London.'], ['a little', 'non numerabili', 'un po\' (abbastanza)', 'Can I have a little milk?'], ['few', 'numerabili', 'pochi (troppo pochi)', 'Few people came. (peccato)'], ['little', 'non numerabili', 'poco (troppo poco)', 'We have little time. (dobbiamo sbrigarci)']], 'plain')}
      <p>Con <b>too</b>: <i>too many cars, too much noise</i> (troppe macchine, troppo rumore). Con <b>enough</b>: <i>enough chairs, enough time</i> (abbastanza).</p>` },
    { h: 'Errori tipici', b: ERR(
      ['There are much people.', 'There are a lot of people.', 'People è numerabile: many o a lot of.'],
      ['I need some informations.', 'I need some information.', 'Information non ha plurale.'],
      ['How many money do you have?', 'How much money do you have?', 'Money non si conta: how much.'],
      ['Can I have a few water?', 'Can I have a little water?', 'Water non si conta: a little.'],
      ['She gave me a good advice.', 'She gave me some good advice.', 'Advice non vuole a: some advice, a piece of advice.']) },
  ],
  exercises: [
    { t: 'c', q: 'How ___ sugar do you take?', o: ['much', 'many'], a: 'much' },
    { t: 'c', q: 'How ___ languages do you speak?', o: ['many', 'much'], a: 'many' },
    { t: 'c', q: "There aren't ___ shops in this village.", o: ['many', 'much'], a: 'many' },
    { t: 'c', q: "I don't have ___ time today.", o: ['much', 'many'], a: 'much' },
    { t: 'c', q: 'She has ___ friends.', o: ['a lot of', 'much'], a: 'a lot of', why: 'Nelle affermative si usa a lot of.' },
    { t: 'c', q: 'Can I ask you ___ questions?', o: ['a few', 'a little'], a: 'a few' },
    { t: 'c', q: 'Just ___ milk, please.', o: ['a little', 'a few'], a: 'a little' },
    { t: 'c', q: 'The news ___ good today.', o: ['is', 'are'], a: 'is' },
    { t: 'c', q: 'There\'s too ___ traffic in this city.', o: ['much', 'many'], a: 'much', why: 'Traffic è non numerabile.' },
    { t: 'f', q: 'Can you give me some ___?', h: 'informazioni', a: ['information'] },
    { t: 'f', q: 'We bought some new ___ for the living room.', h: 'mobili', a: ['furniture'] },
    { t: 'f', q: 'How ___ does this jacket cost?', a: ['much'] },
    { t: 'x', q: 'There are much people here.', a: ['There are a lot of people here.', 'There are lots of people here.', 'There are many people here.'] },
    { t: 'x', q: 'I need some informations.', a: ['I need some information.'] },
    { t: 'x', q: 'How many money do you need?', a: ['How much money do you need?'] },
    { t: 'x', q: 'He gave me a good advice.', a: ['He gave me some good advice.', 'He gave me a good piece of advice.', 'He gave me good advice.'] },
    { t: 't', it: 'Ho qualche amico qui.', a: ['I have a few friends here.', "I've got a few friends here.", 'I have some friends here.', "I've got some friends here."], why: '"Qualche" in senso positivo: a few (o some).' },
    { t: 'c', q: 'It was a boring party. ___ people came.', o: ['Few', 'A few'], a: 'Few', why: 'Pochi, troppo pochi, in senso negativo: few senza a.' },
    { t: 't', it: 'Ci sono troppe macchine.', a: ['There are too many cars.'] },
    { t: 't', it: 'Quanti anni ha tuo padre?', a: ['How old is your father?', 'How old is your dad?'], why: 'Per l\'età non si usa how many: si chiede how old.' },
    { t: 'o', it: 'Non abbiamo molto tempo.', a: ["We don't have much time."] },
    { t: 'o', it: 'I tuoi capelli sono bellissimi.', a: ['Your hair is beautiful.'] },
  ],
});
