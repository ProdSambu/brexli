UNIT({
  id: 'a2-05', n: 5, level: 'A2', stop: 'Past continuous',
  title: 'Past continuous e past simple',
  sub: 'Lo sfondo e l\'azione: when, while, e l\'imperfetto italiano',
  intro: "Per raccontare serve distinguere lo sfondo (cosa stava succedendo) dall'azione che lo interrompe. È il lavoro del past continuous insieme al past simple.",
  theory: [
    { h: 'Come si forma', b: `
      <p><b>was / were</b> + verbo in <b>-ing</b>.</p>
      ${T(['Affermativa', 'Negativa', 'Domanda'], [['I / he / she / it was working', "I / he / she / it wasn't working", 'Was she working?'], ['you / we / they were working', "you / we / they weren't working", 'Were they working?']], 'plain')}
      ${EX(['At eight o\'clock I <b>was having</b> dinner.', 'Alle otto stavo cenando.'], ['What <b>were</b> you <b>doing</b> last night at ten?', 'Cosa stavi facendo ieri sera alle dieci?'])}` },
    { h: 'Azione in corso e azione che la interrompe', b: `
      <p>Il past continuous descrive un'azione <b>in corso</b> in un momento del passato; il past simple descrive un'azione <b>breve</b> che succede nel mezzo.</p>
      ${EX(['I <b>was having</b> a shower when the phone <b>rang</b>.', 'Stavo facendo la doccia quando ha squillato il telefono.'], ['While we <b>were walking</b> home, it <b>started</b> to rain.', 'Mentre tornavamo a casa, ha cominciato a piovere.'])}
      ${T(['Parola', 'Di solito con', 'Esempio'], [['when', 'il past simple (l\'azione breve)', '...when the phone rang.'], ['while', 'il past continuous (l\'azione lunga)', 'While I was cooking, ...']], 'plain')}
      <p>Due azioni lunghe nello stesso momento: tutte e due al past continuous. <i>While I was cooking, he was watching TV.</i></p>
      <p>Due azioni una dopo l'altra: tutte e due al past simple. <i>When she arrived, we had dinner.</i> (prima è arrivata, poi abbiamo cenato)</p>` },
    { h: "L'imperfetto italiano non è sempre past continuous", b: `
      <p>L'imperfetto italiano ha tre usi, e in inglese diventano tre cose diverse:</p>
      ${T(['Italiano', 'Uso', 'Inglese'], [['Stavo / mangiavo quando...', 'azione in corso', 'I was eating when...'], ['Da bambino giocavo a calcio.', 'abitudine passata', 'I played football as a child. (oppure I used to play)'], ['Era stanco. Avevo fame.', 'stato', 'He was tired. I was hungry.']], 'plain')}
      ${N('<p>Per le <b>abitudini</b> del passato si usa il past simple (o <i>used to</i>, che vediamo nella linea B1), non il past continuous: <i>Every summer we went to the sea</i>, non <i>we were going</i>. E i verbi di stato restano semplici: <i>I knew</i>, mai <i>I was knowing</i>.</p>')}` },
    { h: 'Errori tipici', b: ERR(
      ['When I was a child I was going to the sea every summer.', 'When I was a child I went to the sea every summer.', 'Abitudine passata: past simple.'],
      ['I was knowing the answer.', 'I knew the answer.', 'Know è un verbo di stato.'],
      ['While I walked home, I was seeing an accident.', 'While I was walking home, I saw an accident.', 'L\'azione lunga al continuous, quella breve al simple.'],
      ['What did you do at ten last night?', 'What were you doing at ten last night?', 'Un momento preciso nel mezzo di un\'attività: past continuous.']) },
  ],
  exercises: [
    { t: 'f', q: 'I ___ TV when you called.', h: 'watch', a: ['was watching'] },
    { t: 'f', q: 'They ___ football when it started to rain.', h: 'play', a: ['were playing'] },
    { t: 'f', q: 'She was cooking when the lights ___ out.', h: 'go', a: ['went'] },
    { t: 'f', q: 'What ___ you doing at midnight?', a: ['were'] },
    { t: 'f', q: 'We ___ when the teacher came in.', h: 'not / talk', a: ["weren't talking", 'were not talking'] },
    { t: 'c', q: 'I was reading ___ I heard a noise.', o: ['when', 'while'], a: 'when', why: 'Azione breve che interrompe: when + past simple.' },
    { t: 'c', q: '___ I was waiting for the bus, I met Anna.', o: ['While', 'When', 'During'], a: 'While', why: 'Azione lunga: while + past continuous.' },
    { t: 'c', q: 'When I was a child, I ___ to school by bike.', o: ['went', 'was going'], a: 'went', why: 'Abitudine passata: past simple.' },
    { t: 'c', q: 'I ___ the answer, so I put my hand up.', o: ['knew', 'was knowing'], a: 'knew' },
    { t: 'c', q: 'While I was cooking, my brother ___ the table.', o: ['was laying', 'laid'], a: 'was laying', why: 'Due azioni lunghe in parallelo: entrambe al continuous.' },
    { t: 'c', q: 'When she arrived, we ___ dinner, so she sat down and joined us.', o: ['had', 'were having'], a: 'were having', why: 'La cena era già in corso quando è arrivata. Con had il senso cambierebbe: prima è arrivata, poi avete cenato.' },
    { t: 'x', q: 'I was knowing the answer.', a: ['I knew the answer.'] },
    { t: 'x', q: 'While I walked home, I was seeing an accident.', a: ['While I was walking home, I saw an accident.', 'I saw an accident while I was walking home.'] },
    { t: 'x', q: 'Every summer we were going to the sea.', a: ['Every summer we went to the sea.', 'We went to the sea every summer.'] },
    { t: 't', it: 'Stavo dormendo quando hai chiamato.', a: ['I was sleeping when you called.', 'I was asleep when you called.'] },
    { t: 't', it: 'Cosa stavi facendo ieri alle otto?', a: ['What were you doing at eight yesterday?', "What were you doing yesterday at eight?", "What were you doing at eight o'clock yesterday?", "What were you doing yesterday at eight o'clock?", 'What were you doing at 8 yesterday?'] },
    { t: 't', it: 'Da piccolo giocavo a tennis.', a: ['I played tennis when I was a child.', 'I played tennis as a child.', 'I used to play tennis when I was a child.', 'I used to play tennis as a child.', 'When I was a child I played tennis.', 'When I was little I played tennis.', 'I played tennis when I was little.'] },
    { t: 't', it: 'Ero stanco.', a: ['I was tired.'] },
    { t: 'o', it: 'Mentre guidavo, ho visto un incidente.', a: ['While I was driving, I saw an accident.', 'I saw an accident while I was driving.'] },
    { t: 'o', it: 'Non stavamo ascoltando.', a: ["We weren't listening."] },
  ],
});
