UNIT({
  id: 'a1-06', n: 6, level: 'A1', stop: 'There is',
  title: '<i>There is</i>, <i>there are</i>, <i>some</i> e <i>any</i>',
  sub: 'C\'è / ci sono, quantità indefinite, preposizioni di luogo',
  intro: "Per dire che qualcosa esiste o si trova da qualche parte, l'inglese ha una struttura fissa. Insieme a some e any e alle preposizioni di luogo, è quello che serve per descrivere un posto.",
  theory: [
    { h: 'There is / there are', b: `
      ${T(['', 'singolare', 'plurale'], [['affermativa', "there is · there's", 'there are'], ['negativa', "there isn't", "there aren't"], ['domanda', 'is there...?', 'are there...?'], ['risposta breve', "Yes, there is. / No, there isn't.", "Yes, there are. / No, there aren't."]])}
      ${EX(["<b>There's</b> a bank near here.", "C'è una banca qui vicino."], ['<b>There are</b> three bedrooms.', 'Ci sono tre camere da letto.'], ['<b>Is there</b> a problem?', "C'è un problema?"], ['How many people <b>are there</b>?', 'Quante persone ci sono?'])}
      <p>Il verbo concorda con la prima cosa nominata: <i>there <b>is</b> a table and two chairs</i>.</p>` },
    { h: 'There is o it is?', b: `
      <p><b>There is</b> introduce qualcosa per la prima volta, dice che esiste. <b>It is</b> parla di qualcosa che già conosciamo.</p>
      ${EX(["There's a cat in the garden. It's black.", "C'è un gatto in giardino. È nero."])}
      ${N('<p>Attenzione al calco "in my town <i>has</i> a park": il verbo avere qui non c\'entra. Si dice <i>There\'s a park in my town</i>.</p>')}` },
    { h: 'Some e any', b: `
      <p>Indicano una quantità non precisata, come "dei, delle, un po' di". Si usano con i nomi plurali e con quelli non numerabili (milk, water, money, time).</p>
      ${T(['', 'Uso', 'Esempio'], [['some', 'frasi affermative', "There's some milk in the fridge."], ['any', 'frasi negative', "There aren't any eggs."], ['any', 'domande', 'Are there any questions?'], ['some', 'offerte e richieste', 'Would you like some tea? · Can I have some water?']], 'plain')}
      <p><b>No</b> equivale a <i>not any</i> e si usa con il verbo affermativo: <i>There are no eggs</i> = <i>There aren't any eggs</i>.</p>
      ${EX(["There's <b>no</b> time.", "Non c'è tempo."], ["I haven't got <b>any</b> money.", 'Non ho soldi.'])}` },
    { h: 'Preposizioni di luogo', b: `
      ${T(['Preposizione', 'Significato', 'Esempio'], [['in', 'dentro; città, paesi', 'in the box, in Rome, in Italy'], ['on', 'sopra (a contatto); superfici, piani', 'on the table, on the wall, on the second floor'], ['at', 'in un punto, presso', 'at the station, at the door, at home, at work'], ['under', 'sotto', 'under the bed'], ['next to', 'accanto a', 'next to the window'], ['between', 'tra (due cose)', 'between the bank and the bar'], ['in front of', 'davanti a', 'in front of the school'], ['opposite', 'di fronte (dall\'altra parte)', 'opposite the church'], ['behind', 'dietro', 'behind the door'], ['near', 'vicino a', 'near the station']], 'plain')}
      ${N('<p><b>In front of</b> è "davanti a", dalla stessa parte: <i>in front of the school</i>. Se la farmacia è dall\'altra parte della strada rispetto alla banca, si dice <i>opposite the bank</i> (di fronte alla banca). <b>Next to</b> vuole sempre <i>to</i>; <i>near</i> e <i>opposite</i> di solito no: <i>near the station, opposite the church</i>.</p>')}` },
    { h: 'Errori tipici', b: ERR(
      ['There is three bedrooms.', 'There are three bedrooms.', 'Plurale: there are.'],
      ['In my town has a big park.', "There's a big park in my town.", '"C\'è" si dice con there is, non con have.'],
      ["There aren't some biscuits.", "There aren't any biscuits.", 'Nelle negative si usa any.'],
      ['The bank is next the station.', 'The bank is next to the station.', 'Next to vuole sempre to.'],
      ['I live at Rome.', 'I live in Rome.', 'Con le città si usa in.']) },
  ],
  exercises: [
    { t: 'c', q: '___ a bank near here?', o: ['Is there', 'Are there', 'There is'], a: 'Is there' },
    { t: 'c', q: 'There ___ two chairs in the kitchen.', o: ['is', 'are'], a: 'are' },
    { t: 'c', q: 'There ___ any milk in the fridge.', o: ["isn't", "aren't"], a: "isn't", why: 'Milk è non numerabile: singolare.' },
    { t: 'c', q: 'Are there ___ shops in your street?', o: ['some', 'any'], a: 'any', why: 'Nelle domande si usa any.' },
    { t: 'c', q: 'There are ___ apples on the table.', o: ['some', 'any'], a: 'some' },
    { t: 'c', q: 'The keys are ___ the table.', o: ['in', 'on', 'at'], a: 'on' },
    { t: 'c', q: "She's ___ work now.", o: ['in', 'on', 'at'], a: 'at', why: 'At work, at home, at school: espressioni fisse.' },
    { t: 'c', q: 'I live ___ Rome.', o: ['in', 'on', 'at'], a: 'in' },
    { t: 'c', q: 'The pharmacy is ___ the bank and the post office.', o: ['between', 'opposite', 'next'], a: 'between' },
    { t: 'f', q: 'There ___ any eggs.', h: 'be, negativa', a: ["aren't", 'are not'] },
    { t: 'f', q: '___ there a problem?', a: ['Is'] },
    { t: 'f', q: 'How many people ___ there?', a: ['are'] },
    { t: 'x', q: 'There is three bedrooms.', a: ['There are three bedrooms.'] },
    { t: 'x', q: 'In my town has a big park.', a: ["There's a big park in my town.", "In my town there's a big park."] },
    { t: 'x', q: "There aren't some biscuits.", a: ["There aren't any biscuits.", 'There are no biscuits.'] },
    { t: 't', it: "C'è un supermercato vicino a casa mia.", a: ["There's a supermarket near my house.", "There's a supermarket near my home.", "There's a supermarket near where I live."] },
    { t: 't', it: 'Ci sono degli errori nel testo.', a: ['There are some mistakes in the text.', 'There are some errors in the text.', 'There are mistakes in the text.', 'There are errors in the text.'] },
    { t: 't', it: "Non c'è tempo.", a: ["There's no time.", "There isn't any time.", "There isn't time."] },
    { t: 'o', it: 'Il gatto è sotto il letto.', a: ['The cat is under the bed.'] },
    { t: 'o', it: 'Ci sono delle domande?', a: ['Are there any questions?'] },
  ],
});
