UNIT({
  id: 'a2-03', n: 3, level: 'A2', stop: 'For e since',
  title: 'Present perfect con <i>for</i> e <i>since</i>',
  sub: 'Da quanto tempo: il presente italiano che in inglese diventa perfect',
  intro: "\"Vivo qui da tre anni\". In italiano è presente, in inglese no: la situazione è cominciata nel passato e dura ancora, quindi serve il present perfect. È uno degli errori più ostinati di chi parla italiano.",
  theory: [
    { h: 'Una situazione che dura fino a oggi', b: `
      <p>Quando qualcosa è iniziato nel passato e <b>continua adesso</b>, e diciamo da quanto tempo, l'inglese usa il present perfect. L'italiano usa il presente + "da".</p>
      ${EX(["I've <b>lived</b> here for three years.", 'Vivo qui da tre anni.'], ["We've <b>known</b> each other since 2015.", 'Ci conosciamo dal 2015.'], ["She's <b>been</b> ill since Monday.", 'È malata da lunedì.'], ['How long <b>have</b> you <b>had</b> this car?', 'Da quanto tempo hai questa macchina?'])}
      ${N("<p>Se dici <i>I live here for three years</i>, un inglese capisce \"vivrò qui per tre anni\" (un progetto). Il presente non dice che la cosa dura da prima.</p>")}` },
    { h: 'For o since?', b: `
      ${T(['', 'Indica', 'Esempi'], [['for', 'una durata: quanto tempo', 'for ten minutes, for two weeks, for years, for a long time, for ages'], ['since', 'il punto di partenza: da quando', 'since 9 o\'clock, since Monday, since 2010, since Christmas, since I was a child']])}
      ${EX(["I've been here <b>for</b> an hour.", 'Sono qui da un\'ora.'], ["I've been here <b>since</b> six o'clock.", 'Sono qui dalle sei.'])}
      <p>Trucco: se dopo "da" puoi mettere "per" (da tre anni = per tre anni), è <b>for</b>. Se indica un momento sul calendario o sull'orologio, è <b>since</b>.</p>` },
    { h: 'Azioni che continuano: have been + -ing', b: `
      <p>Per un'<b>azione</b> che dura (aspettare, lavorare, studiare, piovere) si usa spesso il <b>present perfect continuous</b>: <i>have / has been</i> + verbo in -ing.</p>
      ${EX(["I've <b>been waiting</b> for an hour.", 'Aspetto da un\'ora.'], ["It's <b>been raining</b> since this morning.", 'Piove da stamattina.'], ['How long have you <b>been studying</b> English?', 'Da quanto tempo studi inglese?'])}
      <p>I verbi di stato (<i>know, have</i> nel senso di possedere, <i>be, like</i>) restano al present perfect semplice: <i>I've known her for years</i>, mai <i>I've been knowing</i>.</p>` },
    { h: 'For, since e ago', b: `
      <p><b>Ago</b> (fa) indica quando è successa una cosa conclusa, e vuole il past simple. <b>For</b> e <b>since</b> misurano una durata che arriva a oggi.</p>
      ${EX(['I met her ten years <b>ago</b>.', "L'ho conosciuta dieci anni fa."], ["I've known her <b>for</b> ten years.", 'La conosco da dieci anni.'])}` },
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
