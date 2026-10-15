UNIT({
  id: 'a2-02', n: 2, level: 'A2', stop: 'Just, already, yet',
  title: 'Present perfect: <i>just</i>, <i>already</i>, <i>yet</i>',
  sub: 'Il passato recente che conta adesso',
  intro: "Il secondo uso del present perfect: qualcosa è successo da poco, o non è ancora successo, e la cosa che conta è la situazione di adesso. Tre parole piccole decidono il senso della frase.",
  theory: [
    { h: 'Un risultato che vale adesso', b: `
      <p>Il present perfect collega il passato al presente: non interessa <i>quando</i> è successo, ma che <i>adesso</i> la situazione è quella.</p>
      ${EX(["I've <b>lost</b> my keys.", 'Ho perso le chiavi. (e ora non le ho)'], ["Look! It's <b>stopped</b> raining.", 'Guarda, ha smesso di piovere.'], ["She's <b>broken</b> her arm.", 'Si è rotta un braccio. (ce l\'ha ingessato)'])}
      <p>Confronta: <i>I lost my keys yesterday, but I found them</i>. Qui c'è un momento preciso e una storia chiusa: past simple.</p>` },
    { h: 'Just, already, yet', b: `
      ${T(['Parola', 'Significato', 'Posizione', 'Esempio'], [['just', 'appena', 'tra have e il participio', "I've <b>just</b> finished."], ['already', 'già (prima del previsto)', 'tra have e il participio', "She's <b>already</b> left."], ['yet', 'ancora (negative) · già (domande)', 'in fondo alla frase', "I haven't eaten <b>yet</b>. · Have you eaten <b>yet</b>?"]], 'plain')}
      ${EX(["We've <b>just</b> arrived.", 'Siamo appena arrivati.'], ["I've <b>already</b> seen this film.", 'Ho già visto questo film.'], ["He hasn't called <b>yet</b>.", 'Non ha ancora chiamato.'], ['Have you finished <b>yet</b>?', 'Hai già finito? / Hai finito?'])}
      ${N("<p>Attenzione: \"già\" si traduce <b>already</b> nelle affermative e di solito <b>yet</b> nelle domande. \"Non ancora\" è <b>not ... yet</b>, con yet in fondo. Da solo, come risposta: <i>Not yet.</i> (Non ancora.)</p>")}` },
    { h: 'Inglese britannico e americano', b: `
      <p>Negli Stati Uniti con <i>just, already, yet</i> si usa spesso il past simple: <i>I just ate. Did you finish yet?</i> Nell'inglese britannico, quello di questo corso, si preferisce il present perfect: <i>I've just eaten. Have you finished yet?</i> Capirai entrambi; scrivi la forma britannica.</p>` },
    { h: 'Errori tipici', b: ERR(
      ["I've finished just.", "I've just finished.", 'Just va tra have e il participio.'],
      ['I have finished yet.', "I've already finished.", 'Nelle affermative "già" è already.'],
      ["I didn't finish yet.", "I haven't finished yet.", 'Con yet, in inglese britannico, il present perfect.'],
      ['Already I have eaten.', "I've already eaten.", 'Already va in mezzo, non all\'inizio.'],
      ["He hasn't yet called me.", "He hasn't called me yet.", 'Yet va in fondo.']) },
  ],
  exercises: [
    { t: 'c', q: "I've ___ finished my homework. Can I go out?", o: ['just', 'yet', 'ever'], a: 'just' },
    { t: 'c', q: "Have you booked the tickets ___?", o: ['yet', 'already', 'just'], a: 'yet', why: 'Nelle domande "già" è di solito yet, in fondo.' },
    { t: 'c', q: "She hasn't replied ___.", o: ['yet', 'already', 'still'], a: 'yet' },
    { t: 'c', q: "Don't tell me the end! I haven't seen it ___.", o: ['yet', 'already', 'just'], a: 'yet' },
    { t: 'c', q: "We've ___ eaten, thanks. We're not hungry.", o: ['already', 'yet', 'ever'], a: 'already' },
    { t: 'c', q: '"Is Tom here?" "No, he\'s just ___."', o: ['left', 'leave', 'leaving'], a: 'left' },
    { t: 'f', q: 'I ___ my phone. Can you call it?', h: 'lose, present perfect', a: ['have lost', "'ve lost"] },
    { t: 'f', q: 'The film ___ started. Sit down!', h: 'just', a: ['has just', "'s just"] },
    { t: 'f', q: "They haven't arrived ___.", a: ['yet'] },
    { t: 'f', q: 'She ___ the email.', h: 'already / send', a: ['has already sent', "'s already sent"] },
    { t: 'x', q: "I've finished just.", a: ["I've just finished."] },
    { t: 'x', q: 'I have done it yet.', a: ["I've already done it."] },
    { t: 'x', q: "He hasn't yet called me.", a: ["He hasn't called me yet."] },
    { t: 't', it: 'Non ho ancora finito.', a: ["I haven't finished yet."] },
    { t: 't', it: 'Siamo appena arrivati.', a: ["We've just arrived.", "We've just got here."] },
    { t: 't', it: 'Hai già mangiato?', a: ['Have you eaten yet?', 'Have you already eaten?'] },
    { t: 't', it: 'Ha già pagato lui.', a: ["He's already paid."] },
    { t: 't', it: 'Ho perso il portafoglio.', a: ["I've lost my wallet.", "I've lost my purse."], why: 'Non lo trovo adesso: present perfect.' },
    { t: 'o', it: 'Il treno è appena partito.', a: ['The train has just left.'] },
    { t: 'o', it: 'Non ho ancora letto la tua mail.', a: ["I haven't read your email yet."] },
  ],
});
