UNIT({
  id: 'a2-09', n: 9, level: 'A2', stop: 'If + presente',
  title: 'Il primo condizionale: <i>if</i> + presente',
  sub: 'Possibilità reali nel futuro, unless, e le verità generali',
  intro: "\"Se domani piove, restiamo a casa.\" Per dire cosa succederà <b>se</b> succede qualcosa, l'inglese ha uno schema fisso. La regola più importante va contro l'italiano: dopo <i>if</i> non si mette mai <i>will</i>.",
  theory: [
    { h: 'La struttura', b: `
      <p>Lo schema ha due metà: <b>if + presente</b> (la condizione) e <b>will + verbo</b> (quello che succederà). Si usa per cose possibili, che potrebbero davvero succedere.</p>
      ${EX(['If it <b>rains</b>, we\'<b>ll stay</b> at home.', 'Se piove (pioverà), restiamo (resteremo) a casa.'], ['If you <b>don\'t hurry</b>, you\'<b>ll miss</b> the train.', 'Se non ti sbrighi, perdi il treno.'], ['What <b>will</b> you <b>do</b> if she <b>says</b> no?', 'Cosa farai se dice di no?'])}
      <p>Le due metà si possono scambiare. Se cominci con <i>if</i> metti la virgola; se <i>if</i> sta in mezzo, di solito no: <i>We'll stay at home if it rains.</i></p>
      ${N("<p>In italiano a volte mettiamo il futuro dopo \"se\" (\"se pioverà\"). In inglese dopo <b>if</b>, come dopo <b>when</b> e <b>as soon as</b>, ci vuole il <b>presente</b>: <i>if it rains</i>, mai <i>if it will rain</i>.</p>")}
      ${TIP(`<p><b>Will non entra mai nella stanza dell'if.</b> La metà con <i>if</i> è al presente, l'altra metà ha il <i>will</i>. Un solo <i>will</i> per frase.</p>`)}` },
    { h: 'Altre forme nella frase principale', b: `
      <p>Nella metà senza <i>if</i>, al posto di <i>will</i> puoi mettere anche un ordine o un verbo come <i>can</i> e <i>should</i>:</p>
      ${EX(['If you see Marco, <b>tell</b> him to call me.', 'Se vedi Marco, digli di chiamarmi.'], ['If you finish early, you <b>can</b> go home.', 'Se finisci presto, puoi andare a casa.'], ['If you feel ill, you <b>should</b> stay in bed.', 'Se non stai bene, dovresti restare a letto.'])}
      ${TIP(`<p>La metà con <i>if</i> resta sempre al presente. L'altra metà è libera: <i>will</i>, <i>can</i>, <i>should</i> o un ordine (<i>tell him!</i>).</p>`)}` },
    { h: 'Unless = if not', b: `
      <p><b>Unless</b> vuol dire "<b>a meno che non</b>", cioè <i>if … not</i>. Il "non" ce l'ha già dentro, quindi il verbo dopo resta senza <i>not</i>.</p>
      ${EX(["I won't go <b>unless</b> you come with me.", 'Non ci vado a meno che tu non venga con me.'], ["<b>Unless</b> you hurry, you'll be late.", 'Se non ti sbrighi, farai tardi.'])}
      ${TIP(`<p><b>Un</b>less comincia come <b>un</b>happy, <b>un</b>known: quell'<i>un-</i> è già un "non". Quindi <i>unless you hurry</i>, mai <i>unless you don't hurry</i>.</p>`)}` },
    { h: 'Il condizionale zero: le verità generali', b: `
      <p>Per le cose che succedono <b>sempre</b> (come funziona la natura, le tue abitudini) si mette il presente in tutte e due le metà. Qui <i>if</i> vuol dire quasi "ogni volta che".</p>
      ${EX(['If you heat ice, it <b>melts</b>.', 'Se scaldi il ghiaccio, si scioglie.'], ["If I drink coffee at night, I <b>can't</b> sleep.", 'Se bevo caffè la sera, non riesco a dormire.'])}
      ${TIP(`<p>Se puoi sostituire "se" con "<b>ogni volta che</b>", è una verità di sempre: presente + presente. Se parli di una volta sola nel futuro: presente + <i>will</i>.</p>`)}` },
    { h: 'If o when?', b: `
      <p><b>When</b> (quando) è per le cose <b>sicure</b>, <b>if</b> (se) per quelle <b>possibili</b>.</p>
      ${EX(["<b>When</b> I get home, I'll call you.", 'Quando arrivo a casa ti chiamo. (arriverò di sicuro)'], ["<b>If</b> I get the job, I'll buy a car.", 'Se ottengo il lavoro, compro una macchina. (forse)'])}
      ${TIP(`<p>È come in italiano: "<b>quando</b> arrivo" (succederà di sicuro) e "<b>se</b> arrivo" (forse sì, forse no).</p>`)}` },
    { h: 'Errori tipici', b: ERR(
      ["If it will rain, we'll stay at home.", "If it rains, we'll stay at home.", 'Dopo if: presente.'],
      ["If I'll see him, I tell him.", "If I see him, I'll tell him.", 'Presente dopo if, will nella principale.'],
      ["Unless you don't hurry, you'll be late.", "Unless you hurry, you'll be late.", 'Unless contiene già il not.'],
      ["When I will arrive, I'll call you.", "When I arrive, I'll call you.", 'Anche dopo when: presente.']) },
  ],
  exercises: [
    { t: 'f', q: 'If it ___ tomorrow, we will go to the beach.', h: 'be sunny', a: ['is sunny', "'s sunny"] },
    { t: 'f', q: "If you study, you ___ the exam.", h: 'pass', a: ['will pass', "'ll pass"] },
    { t: 'f', q: "If she ___ the bus, she'll be late.", h: 'miss', a: ['misses'] },
    { t: 'f', q: "We won't go out if it ___.", h: 'rain', a: ['rains'] },
    { t: 'f', q: "I'll call you when I ___ home.", h: 'get', a: ['get'] },
    { t: 'f', q: "If you heat water to 100 degrees, it ___.", h: 'boil', a: ['boils'], why: 'Verità generale: presente anche nella principale.' },
    { t: 'c', q: 'If you ___ him, say hello from me.', o: ['see', 'will see', 'saw'], a: 'see' },
    { t: 'c', q: "I won't come ___ you invite me.", o: ['unless', 'if', 'when'], a: 'unless' },
    { t: 'c', q: "___ I get the job, I'll buy a new car.", o: ['If', 'When', 'Unless'], a: 'If', why: 'Non è sicuro che otterrai il lavoro: if.' },
    { t: 'c', q: "If you're tired, ___ to bed.", o: ['go', 'you go', 'going'], a: 'go' },
    { t: 'c', q: "What will you do if they ___ you?", o: ["don't call", "won't call", "didn't call"], a: "don't call" },
    { t: 'x', q: "If it will rain, we'll stay at home.", a: ["If it rains, we'll stay at home.", "We'll stay at home if it rains."] },
    { t: 'x', q: "If I'll see him, I tell him.", a: ["If I see him, I'll tell him.", "I'll tell him if I see him."] },
    { t: 'x', q: "Unless you don't hurry, you'll be late.", a: ["Unless you hurry, you'll be late.", "If you don't hurry, you'll be late."] },
    { t: 't', it: 'Se piove, prendo un taxi.', a: ["If it rains, I'll take a taxi.", "If it rains, I'll get a taxi.", "I'll take a taxi if it rains.", "I'll get a taxi if it rains."] },
    { t: 't', it: 'Se non mangi, avrai fame.', a: ["If you don't eat, you'll be hungry.", "You'll be hungry if you don't eat."] },
    { t: 't', it: 'Ti chiamo appena arrivo.', a: ["I'll call you as soon as I arrive.", "I'll call you as soon as I get there.", "I'll call you as soon as I get here.", "I'll phone you as soon as I arrive."] },
    { t: 't', it: 'Se vedi Anna, dille di chiamarmi.', a: ['If you see Anna, tell her to call me.', 'Tell Anna to call me if you see her.', 'If you see Anna, ask her to call me.'] },
    { t: 'o', it: 'Se perdi il treno, puoi prendere il prossimo.', a: ['If you miss the train, you can take the next one.'] },
    { t: 'o', it: 'Cosa farai se ti dice di no?', a: ['What will you do if she says no?'] },
  ],
});
