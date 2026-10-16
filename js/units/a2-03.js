UNIT({
  id: 'a2-03', n: 3, level: 'A2', stop: 'For e since',
  title: 'Present perfect con <i>for</i> e <i>since</i>',
  sub: 'Da quanto tempo: il presente italiano che in inglese diventa perfect',
  intro: "\"Vivo qui da tre anni\". In italiano usiamo il presente, in inglese no: la cosa è cominciata nel passato e dura ancora, quindi serve il present perfect. È uno degli errori più duri a morire per chi parla italiano.",
  theory: [
    { h: 'Una situazione che dura fino a oggi', b: `
      <p>Quando una cosa è <b>cominciata nel passato e continua ancora adesso</b>, e dici da quanto tempo, l'inglese usa il present perfect. In italiano diciamo presente + "da": "vivo qui <b>da</b> tre anni".</p>
      ${EX(["I've <b>lived</b> here for three years.", 'Vivo qui da tre anni.'], ["We've <b>known</b> each other since 2015.", 'Ci conosciamo dal 2015.'], ["She's <b>been</b> ill since Monday.", 'È malata da lunedì.'], ['How long <b>have</b> you <b>had</b> this car?', 'Da quanto tempo hai questa macchina?'])}
      ${N("<p>Se dici <i>I live here for three years</i>, un inglese capisce \"vivrò qui per tre anni\", come un progetto. Il presente non fa capire che ci vivi già da prima.</p>")}
      ${TIP(`<p>Quando in italiano senti <b>"da" + tempo</b> (da tre anni, da lunedì, da quanto tempo?), in inglese accendi il present perfect: <i>I've lived…, I've known…, How long have you…?</i></p><p>Immagina una <b>linea</b> che parte nel passato e arriva fino a oggi, senza interrompersi.</p>`)}` },
    { h: 'For o since?', b: `
      <p>Il "da" italiano in inglese diventa <b>for</b> o <b>since</b>:</p>
      ${T(['', 'Indica', 'Esempi'], [['for', 'una durata: quanto tempo', 'for ten minutes, for two weeks, for years, for a long time, for ages'], ['since', 'il punto di partenza: da quando', 'since 9 o\'clock, since Monday, since 2010, since Christmas, since I was a child']])}
      ${EX(["I've been here <b>for</b> an hour.", 'Sono qui da un\'ora.'], ["I've been here <b>since</b> six o'clock.", 'Sono qui dalle sei.'])}
      ${TIP(`<p>Prova a mettere <b>"per"</b> al posto di "da": "da tre anni" → "<b>per</b> tre anni" funziona → <b>for</b> (for e per si somigliano!).</p><p>Se invece c'è un <b>momento</b> che trovi sul calendario o sull'orologio (lunedì, il 2010, le sei), è <b>since</b>: "<b>a partire da</b>".</p>`)}` },
    { h: 'Azioni che continuano: have been + -ing', b: `
      <p>Se quello che dura è un'<b>azione</b> (aspettare, lavorare, studiare, piovere), di solito si usa <b>have / has been</b> + verbo in <b>-ing</b>.</p>
      ${EX(["I've <b>been waiting</b> for an hour.", 'Aspetto da un\'ora.'], ["It's <b>been raining</b> since this morning.", 'Piove da stamattina.'], ['How long have you <b>been studying</b> English?', 'Da quanto tempo studi inglese?'])}
      <p>I verbi "invisibili" (<i>know, be, like, have</i> quando vuol dire possedere) non vanno in -ing nemmeno qui: <i>I've known her for years</i>, mai <i>I've been knowing</i>.</p>
      ${TIP(`<p>È il present continuous ("sto aspettando") che si allunga all'indietro nel tempo: "<b>sto aspettando da</b> un'ora" = <i>I've <b>been waiting</b> for an hour</i>.</p>`)}` },
    { h: 'For, since e ago', b: `
      <p><b>Ago</b> (fa) dice <b>quando</b> è successa una cosa finita, e vuole il past simple. <b>For</b> e <b>since</b> invece misurano una cosa che <b>dura fino a oggi</b>.</p>
      ${EX(['I met her ten years <b>ago</b>.', "L'ho conosciuta dieci anni fa."], ["I've known her <b>for</b> ten years.", 'La conosco da dieci anni.'])}
      ${TIP(`<p>"Dieci anni <b>fa</b>" è un punto fermo nel passato → <i>ago</i> + past simple. "<b>Da</b> dieci anni" è una linea che arriva a oggi → <i>for</i> + present perfect.</p>`)}` },
    { h: 'Errori tipici', b: ERR(
      ['I live here since 2015.', "I've lived here since 2015.", 'Situazione che dura da allora: present perfect.'],
      ['I know him for ten years.', "I've known him for ten years.", 'Stesso caso: present perfect.'],
      ["I've lived here since three years.", "I've lived here for three years.", 'Tre anni è una durata: for.'],
      ['How long do you live here?', 'How long have you lived here?', 'Da quanto tempo: present perfect.'],
      ["I'm waiting since an hour.", "I've been waiting for an hour.", 'Azione che dura: present perfect continuous, con for.']) },
  ],
  exercises: [
    { t: 'c', q: "I've worked here ___ 2019.", o: ['since', 'for', 'from'], a: 'since' },
    { t: 'c', q: "She's been in the shower ___ twenty minutes.", o: ['for', 'since', 'from'], a: 'for' },
    { t: 'c', q: "We've known each other ___ we were children.", o: ['since', 'for', 'ago'], a: 'since' },
    { t: 'c', q: 'I met him three years ___.', o: ['ago', 'for', 'since'], a: 'ago' },
    { t: 'c', q: 'How long ___ in Milan?', o: ['have you lived', 'do you live', 'are you living'], a: 'have you lived' },
    { t: 'c', q: "I've ___ her for years.", o: ['known', 'been knowing', 'know'], a: 'known', why: 'Know è un verbo di stato: niente forma in -ing.' },
    { t: 'f', q: 'They ___ married for ten years.', h: 'be, present perfect', a: ['have been', "'ve been"] },
    { t: 'f', q: 'It ___ since this morning.', h: 'rain, present perfect continuous', a: ['has been raining', "'s been raining"] },
    { t: 'f', q: 'How long ___ you had your dog?', a: ['have'] },
    { t: 'f', q: "I've been waiting ___ half an hour.", a: ['for'] },
    { t: 'x', q: 'I live here since 2015.', a: ["I've lived here since 2015.", "I've been living here since 2015."] },
    { t: 'x', q: 'I know him for ten years.', a: ["I've known him for ten years."] },
    { t: 'x', q: "We've been here since two hours.", a: ["We've been here for two hours."] },
    { t: 'x', q: 'How long do you study English?', a: ['How long have you studied English?', 'How long have you been studying English?'] },
    { t: 't', it: 'Vivo a Torino da cinque anni.', a: ["I've lived in Turin for five years.", "I've been living in Turin for five years."] },
    { t: 't', it: 'Lavoro qui da gennaio.', a: ["I've worked here since January.", "I've been working here since January."] },
    { t: 't', it: 'Da quanto tempo conosci Marco?', a: ['How long have you known Marco?'] },
    { t: 't', it: "Ti aspetto da un'ora!", a: ["I've been waiting for you for an hour!", "I've waited for you for an hour!"] },
    { t: 'o', it: 'Non lo vedo da Natale.', a: ["I haven't seen him since Christmas."] },
    { t: 'o', it: 'Studia inglese da due anni.', a: ['She has been studying English for two years.'] },
  ],
});
