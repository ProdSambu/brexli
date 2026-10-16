UNIT({
  id: 'a1-12', n: 12, level: 'A1', stop: 'Comparativi',
  title: 'Comparativi e superlativi',
  sub: '-er / more, the -est / the most, than, as … as',
  intro: "\"Più grande\", \"il più caro\", \"alto come suo padre\". La regola dipende da una cosa sola: se l'aggettivo è <b>corto</b> o <b>lungo</b>. Poi ci sono tre irregolari che si usano sempre.",
  theory: [
    { h: 'Aggettivi corti: -er e the -est', b: `
      <p>Agli aggettivi <b>corti</b> (quelli che si dicono in un colpo solo, come <i>big, cheap, tall</i>) si aggiunge:</p>
      <ul><li><b>-er</b> per dire "più …": <i>cheap → cheaper</i> (più economico);</li><li><b>the -est</b> per dire "il più …": <i>the cheapest</i> (il più economico).</li></ul>
      <p>Valgono come corti anche gli aggettivi di due sillabe che finiscono in <b>-y</b>: <i>happy → happier</i>.</p>
      ${T(['Aggettivo', 'Comparativo', 'Superlativo', 'Regola'], [['cheap', 'cheaper', 'the cheapest', '+ er / + est'], ['nice', 'nicer', 'the nicest', 'finisce in -e: + r / + st'], ['big', 'bigger', 'the biggest', 'consonante-vocale-consonante: raddoppio'], ['happy', 'happier', 'the happiest', 'anche di due sillabe in -y: y → ier / iest']])}
      ${TIP(`<p>Per sapere se un aggettivo è corto, <b>battilo con le mani</b>: <i>big</i> = un colpo → corto, <i>-er</i>. <i>ex-pen-sive</i> = tre colpi → lungo, <i>more</i>.</p><p>E le regole di scrittura sono sempre le stesse che conosci già: big → bi<b>gg</b>er, happ<b>y</b> → happ<b>ier</b>.</p>`)}` },
    { h: 'Aggettivi lunghi: more e the most', b: `
      <p>Gli aggettivi <b>lunghi</b> (due sillabe o più, tranne quelli in -y) non cambiano: davanti metti <b>more</b> (più) o <b>the most</b> (il più).</p>
      ${T(['Aggettivo', 'Comparativo', 'Superlativo'], [['expensive', 'more expensive', 'the most expensive'], ['interesting', 'more interesting', 'the most interesting'], ['beautiful', 'more beautiful', 'the most beautiful']])}
      <p>Per dire "meno" si usa <b>less</b> (meno) e <b>the least</b> (il meno): <i>less expensive, the least interesting</i>.</p>
      ${TIP(`<p><b>O -er o more, mai tutti e due.</b> Una parola lunga è già "pesante": invece di allungarla ancora con -er, le metti <i>more</i> davanti. Quindi <i>taller</i> o <i>more expensive</i>, ma mai <i>more taller</i>.</p>`)}` },
    { h: 'Irregolari', b: `
      <p>Sono solo tre, ma li userai continuamente:</p>
      ${T(['Aggettivo', 'Comparativo', 'Superlativo'], [['good', 'better', 'the best'], ['bad', 'worse', 'the worst'], ['far', 'further / farther', 'the furthest / farthest']])}
      ${EX(['Your English is <b>better</b> than mine.', 'Il tuo inglese è migliore del mio.'], ["It's <b>the worst</b> day of my life.", 'È il giorno peggiore della mia vita.'])}
      ${TIP(`<p>Sono irregolari anche in italiano! buono → <b>migliore</b> → il <b>migliore</b>; cattivo → <b>peggiore</b> → il <b>peggiore</b>. Così: good → <b>better</b> → the <b>best</b>; bad → <b>worse</b> → the <b>worst</b>.</p>`)}` },
    { h: 'Than, in, as … as', b: `
      <p>Il "<b>di</b>" dei paragoni (più alto <b>di</b> me) si dice <b>than</b>.</p>
      ${EX(['A car is faster <b>than</b> a bike.', 'Una macchina è più veloce di una bici.'], ["She's taller <b>than</b> me.", 'È più alta di me.'])}
      <p>Con "il più…", il "di" diventa <b>in</b> davanti a un luogo o a un gruppo (del mondo, della squadra) e <b>of</b> davanti a un periodo di tempo (dell'anno, della mia vita).</p>
      ${EX(["It's the tallest building <b>in</b> the world.", 'È il palazzo più alto del mondo.'], ["He's the best player <b>in</b> the team.", 'È il giocatore migliore della squadra.'], ['It was the best day <b>of</b> the year.', "Fu il giorno più bello dell'anno."])}
      <p>Per dire "<b>come</b>" (alto come lui) si usa <b>as … as</b>; per dire "non … come", <b>not as … as</b>.</p>
      ${EX(["He's <b>as</b> tall <b>as</b> his father.", 'È alto come suo padre.'], ["Rome isn't <b>as</b> big <b>as</b> London.", 'Roma non è grande come Londra.'])}
      ${TIP(`<p><b>Than</b> e <b>"che"</b> si somigliano: più alto <b>che</b> me → taller <b>than</b> me.</p><p><b>In</b> = dentro un posto o un gruppo (in the world, in the team). <b>Of</b> = un pezzo di tempo (of the year, of my life).</p><p><b>As … as</b> è un panino: l'aggettivo sta in mezzo. <i>as <b>tall</b> as</i>.</p>`)}` },
    { h: 'Errori tipici', b: ERR(
      ['This exercise is more easy.', 'This exercise is easier.', 'Easy finisce in -y: easier.'],
      ['She is more taller than me.', "She's taller than me.", 'O -er o more, mai entrambi.'],
      ['He is taller of me.', "He's taller than me.", 'Il secondo termine vuole than.'],
      ['the best restaurant of the city', 'the best restaurant in the city', 'Con i luoghi si usa in.'],
      ['more good', 'better', 'Good è irregolare.']) },
  ],
  exercises: [
    { t: 'f', q: 'A car is ___ than a bike.', h: 'fast', a: ['faster'] },
    { t: 'f', q: 'This hotel is ___ than the other one.', h: 'expensive', a: ['more expensive'] },
    { t: 'f', q: 'Today is ___ than yesterday.', h: 'hot', a: ['hotter'], why: 'Hot raddoppia la t.' },
    { t: 'f', q: 'She is ___ now than last year.', h: 'happy', a: ['happier'] },
    { t: 'f', q: "It's the ___ pizza in town.", h: 'good', a: ['best'] },
    { t: 'f', q: 'This is the ___ day of my life.', h: 'bad', a: ['worst'] },
    { t: 'f', q: 'Everest is the ___ mountain in the world.', h: 'high', a: ['highest'] },
    { t: 'f', q: "It's the ___ city in Italy.", h: 'beautiful', a: ['most beautiful'] },
    { t: 'f', q: 'My house is ___ than yours.', h: 'big', a: ['bigger'] },
    { t: 'c', q: 'My brother is taller ___ me.', o: ['than', 'of', 'that'], a: 'than' },
    { t: 'c', q: "He's the best player ___ the team.", o: ['in', 'of'], a: 'in' },
    { t: 'c', q: 'Your English is ___ than mine.', o: ['better', 'more good', 'gooder'], a: 'better' },
    { t: 'c', q: "Rome isn't as big ___ London.", o: ['as', 'than', 'like'], a: 'as' },
    { t: 'x', q: 'This exercise is more easy.', a: ['This exercise is easier.'] },
    { t: 'x', q: 'She is more taller than me.', a: ["She's taller than me.", "She's taller than I am."] },
    { t: 'x', q: 'It is the most big house in the street.', a: ["It's the biggest house in the street.", "It's the biggest house on the street."] },
    { t: 't', it: "Il treno è più veloce dell'autobus.", a: ['The train is faster than the bus.', 'The train is quicker than the bus.'] },
    { t: 't', it: 'È il ristorante più caro della città.', a: ["It's the most expensive restaurant in the city.", "It's the most expensive restaurant in town."] },
    { t: 't', it: 'Sei alto come tuo padre.', a: ["You're as tall as your father.", "You're as tall as your dad."] },
    { t: 'o', it: 'Mia sorella è più giovane di me.', a: ['My sister is younger than me.'] },
  ],
});
