UNIT({
  id: 'a1-06', n: 6, level: 'A1', stop: 'There is',
  title: '<i>There is</i>, <i>there are</i>, <i>some</i> e <i>any</i>',
  sub: 'C\'è / ci sono, quantità indefinite, preposizioni di luogo',
  intro: "Come si dice \"c'è\" e \"ci sono\", come si dice \"dei / delle / un po' di\" (<i>some</i> e <i>any</i>) e come si dice dove si trova una cosa (<i>in, on, at…</i>). Con queste tre cose puoi descrivere qualsiasi posto.",
  theory: [
    { h: 'There is / there are', b: `
      <p>"C'è" si dice <b>there is</b> (corto: <i>there's</i>), "ci sono" si dice <b>there are</b>. Per la negativa aggiungi <i>not</i>, per la domanda scambi le due parole: <i>is there…?</i></p>
      ${T(['', 'singolare', 'plurale'], [['affermativa', "there is · there's", 'there are'], ['negativa', "there isn't", "there aren't"], ['domanda', 'is there...?', 'are there...?'], ['risposta breve', "Yes, there is. / No, there isn't.", "Yes, there are. / No, there aren't."]])}
      ${EX(["<b>There's</b> a bank near here.", "C'è una banca qui vicino."], ['<b>There are</b> three bedrooms.', 'Ci sono tre camere da letto.'], ['<b>Is there</b> a problem?', "C'è un problema?"], ['How many people <b>are there</b>?', 'Quante persone ci sono?'])}
      <p>Se elenchi più cose, conta la prima: <i>there <b>is</b> a table and two chairs</i> (c'è un tavolo e due sedie).</p>
      ${TIP(`<p>Si traduce parola per parola: <b>there</b> = ci, <b>is</b> = è, <b>are</b> = sono. Quindi <b>c'è = there is</b>, <b>ci sono = there are</b>.</p>`)}` },
    { h: 'There is o it is?', b: `
      <p><b>There is</b> serve a dire che una cosa <b>c'è</b>, quando ne parli per la prima volta. <b>It is</b> serve a dire <b>com'è</b> una cosa di cui hai già parlato.</p>
      ${EX(["There's a cat in the garden. It's black.", "C'è un gatto in giardino. È nero."])}
      ${N('<p>Non tradurre "la mia città <i>ha</i> un parco" pensando ad avere: in inglese si dice <i>There\'s a park in my town</i> (c\'è un parco nella mia città).</p>')}
      ${TIP(`<p><b>There is</b> = "c'è". <b>It is</b> = "è". Se in italiano dici "c'è", in inglese hai bisogno di <i>there</i>.</p>`)}` },
    { h: 'Some e any', b: `
      <p>Vogliono dire <b>"dei, delle, un po' di"</b>: una quantità che non dici con precisione. Si usano con le cose al plurale (<i>eggs</i>) e con quelle che non si contano (<i>milk, water, money, time</i>).</p>
      ${T(['', 'Uso', 'Esempio'], [['some', 'frasi affermative', "There's some milk in the fridge."], ['any', 'frasi negative', "There aren't any eggs."], ['any', 'domande', 'Are there any questions?'], ['some', 'offerte e richieste', 'Would you like some tea? · Can I have some water?']], 'plain')}
      <p>Al posto di <i>not any</i> puoi usare <b>no</b> con il verbo senza <i>not</i>: <i>There are no eggs</i> = <i>There aren't any eggs</i> (non ci sono uova).</p>
      ${EX(["There's <b>no</b> time.", "Non c'è tempo."], ["I haven't got <b>any</b> money.", 'Non ho soldi.'])}
      ${TIP(`<p><b>S</b>ome = <b>S</b>ì: frasi normali, affermative.</p><p><b>A</b>ny = <b>A</b>ltrimenti: quando c'è un <b>no</b> o un <b>?</b> (negative e domande).</p><p>Unica eccezione: quando offri o chiedi qualcosa si usa <i>some</i> anche nella domanda (<i>Would you like some tea?</i>), perché ti aspetti un sì.</p>`)}` },
    { h: 'Preposizioni di luogo', b: `
      <p>Sono le parole che dicono <b>dove</b> si trova una cosa: dentro, sopra, sotto, accanto…</p>
      ${T(['Preposizione', 'Significato', 'Esempio'], [['in', 'dentro; città, paesi', 'in the box, in Rome, in Italy'], ['on', 'sopra (a contatto); superfici, piani', 'on the table, on the wall, on the second floor'], ['at', 'in un punto, presso', 'at the station, at the door, at home, at work'], ['under', 'sotto', 'under the bed'], ['next to', 'accanto a', 'next to the window'], ['between', 'tra (due cose)', 'between the bank and the bar'], ['in front of', 'davanti a', 'in front of the school'], ['opposite', 'di fronte (dall\'altra parte)', 'opposite the church'], ['behind', 'dietro', 'behind the door'], ['near', 'vicino a', 'near the station']], 'plain')}
      ${N('<p><b>In front of</b> = davanti a (dalla stessa parte). <b>Opposite</b> = di fronte, dall\'altra parte della strada.</p><p><b>Next to</b> vuole sempre il <i>to</i> (<i>next to the bank</i>). <i>Near</i> e <i>opposite</i> invece no: <i>near the station, opposite the church</i>.</p>')}
      ${TIP(`<p>Immagina tre forme:</p><ul><li><b>IN</b> = una <b>scatola</b>: sei dentro (in the box, in Rome, in Italy);</li><li><b>ON</b> = un <b>tavolo</b>: sei appoggiato sopra (on the table, on the wall);</li><li><b>AT</b> = un <b>puntino</b> sulla mappa: sei lì (at the station, at home, at work).</li></ul>`)}` },
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
