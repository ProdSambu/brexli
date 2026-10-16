UNIT({
  id: 'a1-11', n: 11, level: 'A1', stop: 'Futuro',
  title: 'Il futuro: <i>will</i>, <i>going to</i>, present continuous',
  sub: 'Decisioni, intenzioni, appuntamenti; il presente dopo when e if',
  intro: "In italiano parliamo del futuro quasi sempre con il presente: \"domani vado a Roma\". L'inglese ha tre modi diversi, e sceglie in base a una cosa sola: <b>quanto è già deciso</b>.",
  theory: [
    { h: 'Will', b: `
      <p>Metti <b>will</b> davanti al verbo, uguale per tutti: <i>I will go, she will go</i>. Corto: <i>I'll, she'll</i>. Per dire "non" si usa <b>won't</b> (= will not).</p>
      <p>Si usa quando <b>decidi in quel momento</b>, quando prometti, quando offri aiuto o quando dici cosa pensi che succederà:</p>
      ${T(['Uso', 'Esempio', 'Italiano'], [['decisione presa sul momento', "The phone's ringing. — I<b>'ll</b> get it.", 'Rispondo io.'], ['previsione, opinione', 'I think it <b>will</b> rain.', 'Penso che pioverà.'], ['promessa', "I <b>won't</b> tell anyone.", 'Non lo dirò a nessuno.'], ['offerta', "I<b>'ll</b> help you.", 'Ti aiuto io.']], 'plain')}
      ${N("<p>Per offrirti di fare qualcosa con una domanda si usa <b>Shall I…?</b> o <b>Shall we…?</b>: <i>Shall I open the window?</i> (Apro la finestra?)</p>")}
      ${TIP(`<p><i>Will</i> è come <i>can</i>: non cambia mai, niente -s, niente <i>to</i>. <i>She will go</i>, mai <i>she wills</i> o <i>will to go</i>.</p><p>Pensa a <b>will</b> come a una decisione <b>istantanea</b>: squilla il telefono e dici "<i>I'll get it!</i>", rispondo io.</p>`)}` },
    { h: 'Be going to', b: `
      <p>Si forma con <b>am / is / are going to</b> + il verbo. Vuol dire "<b>ho intenzione di</b>" oppure "<b>sta per</b>":</p>
      ${T(['Uso', 'Esempio', 'Italiano'], [['intenzione già decisa', "I<b>'m going to</b> buy a new car.", 'Ho intenzione di comprare una macchina nuova.'], ['previsione basata su ciò che si vede', "Look at those clouds! It<b>'s going to</b> rain.", 'Guarda che nuvole! Sta per piovere.']], 'plain')}
      <p>La differenza con <i>will</i>: con <i>going to</i> avevi <b>già deciso prima</b> di parlarne.</p>
      ${EX(["We've decided: we<b>'re going to</b> sell the house.", 'Abbiamo deciso: vendiamo la casa.'], ["What <b>are</b> you <b>going to</b> do this summer?", "Cosa fai quest'estate?"])}
      ${TIP(`<p><b>Going to</b> = "sto andando verso" quella cosa: la decisione è già in viaggio. <b>Will</b> = decido adesso.</p><p>Se in italiano puoi dire "<b>ho intenzione di</b>", usa <i>going to</i>.</p>`)}` },
    { h: 'Present continuous per il futuro', b: `
      <p>Per un <b>appuntamento già preso</b>, con un giorno o un'ora, si usa il present continuous (<i>I'm meeting</i>). In italiano qui usiamo il presente: "domani vedo Anna".</p>
      ${EX(["I<b>'m meeting</b> Anna at six tomorrow.", 'Domani alle sei vedo Anna.'], ["<b>We're flying</b> to Dublin on Friday.", 'Venerdì voliamo a Dublino.'], ["I<b>'m going</b> to the dentist tomorrow.", 'Domani vado dal dentista.'])}
      <p>Il <b>present simple</b> invece si usa solo per gli orari ufficiali, come treni e film: <i>The train <b>leaves</b> at 7.15. The film <b>starts</b> at nine.</i></p>
      ${TIP(`<p>Se è <b>scritto sull'agenda</b> (appuntamento, biglietto già comprato), usa il present continuous: <i>I'm seeing the dentist tomorrow.</i></p><p>Se è <b>scritto su un orario pubblico</b> (treno, cinema), usa il present simple: <i>The train leaves at 7.</i></p>`)}` },
    { h: 'Dopo when, if, as soon as: presente', b: `
      <p>Quando parli del futuro, dopo <b>when</b> (quando), <b>if</b> (se), <b>as soon as</b> (appena), <b>before, after, until</b> l'inglese mette il <b>presente</b>, non <i>will</i>. L'italiano invece spesso mette il futuro.</p>
      ${EX(["I'll call you <b>when I arrive</b>.", 'Ti chiamo quando arriverò.'], ["<b>If it rains</b>, we'll stay at home.", 'Se pioverà, resteremo a casa.'], ["I'll tell her <b>as soon as I see</b> her.", 'Glielo dirò appena la vedrò.'])}
      ${TIP(`<p>In ogni frase basta <b>un solo will</b>. Va nella parte principale (<i>I'll call you</i>), mai dopo <i>when</i> o <i>if</i> (<i>when I arrive</i>). Il futuro si capisce già dall'altra metà.</p>`)}` },
    { h: 'Riassunto', b: `
      <p>Chiediti: <b>quanto è già deciso?</b></p>
      ${T(['Situazione', 'Forma'], [['decido adesso, prometto, offro, prevedo in base a un\'opinione', 'will'], ['ho già deciso; vedo che sta per succedere', 'be going to'], ['ho un appuntamento, è tutto organizzato', 'present continuous'], ['orario ufficiale', 'present simple']])}
      ${TIP(`<p>Dal meno deciso al più deciso: <b>will</b> (decido ora) → <b>going to</b> (l'ho deciso) → <b>present continuous</b> (l'ho anche organizzato, è sull'agenda).</p>`)}` },
    { h: 'Errori tipici', b: ERR(
      ['I will to help you.', "I'll help you.", 'Dopo will niente to.'],
      ["When I will finish, I'll call you.", "When I finish, I'll call you.", 'Dopo when: presente.'],
      ['Tomorrow I go to the dentist.', "I'm going to the dentist tomorrow.", 'Appuntamento fissato: present continuous.'],
      ['If it will rain, we stay at home.', "If it rains, we'll stay at home.", 'Dopo if il presente; nella frase principale il futuro.']) },
  ],
  exercises: [
    { t: 'c', q: 'The phone is ringing! — OK, ___ it.', o: ["I'll answer", "I'm going to answer", 'I answer'], a: "I'll answer", why: 'Decisione presa sul momento: will.' },
    { t: 'c', q: 'Look at those clouds! It ___ rain.', o: ['is going to', 'will'], a: 'is going to', why: 'Previsione basata su ciò che si vede: going to.' },
    { t: 'c', q: "I ___ my dentist at 4 tomorrow. It's in my diary.", o: ['am seeing', 'see', 'will see'], a: 'am seeing', why: 'Appuntamento fissato: present continuous.' },
    { t: 'c', q: 'We have decided: we ___ sell the house.', o: ['are going to', 'will'], a: 'are going to', why: 'Decisione già presa: going to.' },
    { t: 'c', q: 'The train ___ at 7.15 tomorrow morning.', o: ['leaves', 'is leaving', 'leave'], a: 'leaves', why: 'Orario ufficiale: present simple.' },
    { t: 'c', q: "I'll call you when I ___ home.", o: ['get', 'will get'], a: 'get', why: 'Dopo when: presente.' },
    { t: 'c', q: '___ I open the window?', o: ['Shall', 'Will', 'Am'], a: 'Shall', why: 'Per offrirsi di fare qualcosa: Shall I...?' },
    { t: 'f', q: 'I think it ___ a good film.', h: 'be, futuro', a: ['will be', "'ll be"] },
    { t: 'f', q: "Don't worry, I ___ anyone.", h: 'not / tell', a: ["won't tell", 'will not tell'] },
    { t: 'f', q: 'What ___ you going to do this summer?', a: ['are'] },
    { t: 'f', q: 'If it ___, we will stay at home.', h: 'rain', a: ['rains'] },
    { t: 'x', q: 'I will to help you.', a: ["I'll help you."] },
    { t: 'x', q: "When I will finish, I'll call you.", a: ["When I finish, I'll call you.", "I'll call you when I finish."] },
    { t: 'x', q: 'Tomorrow I go to the dentist.', a: ["Tomorrow I'm going to the dentist.", "I'm going to the dentist tomorrow."] },
    { t: 't', it: 'Domani sera vedo Luca.', a: ["I'm seeing Luca tomorrow evening.", "I'm meeting Luca tomorrow evening.", "I'm seeing Luca tomorrow night.", "I'm meeting Luca tomorrow night.", "Tomorrow evening I'm seeing Luca.", "Tomorrow evening I'm meeting Luca.", "Tomorrow night I'm seeing Luca.", "Tomorrow night I'm meeting Luca."], why: 'Appuntamento fissato: present continuous.' },
    { t: 't', it: 'Ti aiuto io!', a: ["I'll help you!", 'Let me help you!'], why: 'Offerta spontanea: will.' },
    { t: 't', it: 'Ho intenzione di imparare lo spagnolo.', a: ["I'm going to learn Spanish.", "I'm going to study Spanish."] },
    { t: 'o', it: 'Domani non pioverà.', a: ['It will not rain tomorrow.', 'Tomorrow it will not rain.'] },
    { t: 'o', it: 'Cosa farai stasera?', a: ['What are you doing tonight?'], why: 'Per i programmi della serata si usa il present continuous.' },
  ],
});
