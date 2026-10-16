// "Parole utili" per le traduzioni scritte a mano della linea A1: il vocabolario che la lezione
// non ha spiegato, mai la regola su cui verte l'esercizio (i verbi si danno all'infinito).
(() => {
  const GL = {
    // A1-01
    'Ho ventidue anni.': [['ventidue', 'twenty-two']],
    'Lei ha ragione.': [['ragione', 'right']],
    'Oggi fa freddo.': [['oggi', 'today'], ['freddo', 'cold']],
    'Siete pronti?': [['pronto', 'ready']],
    'Non sono stanco, ho fame.': [['stanco', 'tired'], ['fame', 'hungry']],
    // A1-02
    'Questi bambini sono stanchi.': [['bambino', 'child'], ['stanco', 'tired']],
    'I cani sono animali intelligenti.': [['cane', 'dog'], ['animale', 'animal'], ['intelligente', 'intelligent']],
    "Quella donna è un'avvocata.": [['donna', 'woman'], ['avvocato / avvocata', 'lawyer']],
    // A1-03
    'Di chi è questa giacca?': [['giacca', 'jacket']],
    'Lui ha due figli.': [['figli', 'children']],
    'Il loro appartamento è piccolo.': [['appartamento', 'flat'], ['piccolo', 'small']],
    'La camera di mia sorella è grande.': [['camera', 'room'], ['sorella', 'sister'], ['grande', 'big']],
    // A1-04
    'Mio padre lavora in ospedale.': [['padre', 'father'], ['lavorare', 'work'], ['ospedale', 'hospital']],
    'Il lunedì vado in palestra.': [['lunedì', 'Monday'], ['andare in palestra', 'go to the gym']],
    'Lei guarda la TV ogni sera.': [['guardare la TV', 'watch TV'], ['ogni sera', 'every evening']],
    // A1-05
    'Che lavoro fa tua madre?': [['madre', 'mother']],
    'Non capisco.': [['capire', 'understand']],
    'Quanto spesso vai al cinema?': [['quanto spesso', 'how often'], ['andare al cinema', 'go to the cinema']],
    // A1-06
    'Ci sono degli errori nel testo.': [['errore', 'mistake'], ['testo', 'text']],
    "C'è un supermercato vicino a casa mia.": [['supermercato', 'supermarket'], ['vicino a', 'near'], ['casa mia', 'my house']],
    "Non c'è tempo.": [['tempo', 'time']],
    // A1-07
    'Cosa stai facendo?': [['fare', 'do']],
    'Questa settimana lavoro da casa.': [['questa settimana', 'this week'], ['lavorare da casa', 'work from home']],
    "Sto aspettando l'autobus.": [['aspettare', 'wait for'], ['autobus', 'bus']],
    // A1-08
    'Non riesco a dormire.': [['dormire', 'sleep']],
    'Posso entrare?': [['entrare', 'come in']],
    'Non toccarlo!': [['toccare', 'touch'], ['lo', 'it']],
    'Chiudi la porta, per favore.': [['chiudere', 'close'], ['porta', 'door'], ['per favore', 'please']],
    'Non vedo niente.': [['vedere', 'see'], ['niente (in una frase negativa)', 'anything']],
    // A1-09
    'Dove eri ieri sera?': [['dove', 'where'], ['ieri sera', 'last night']],
    'Ieri faceva caldo.': [['ieri', 'yesterday'], ['caldo', 'hot']],
    "C'era molto traffico.": [['molto', 'a lot of'], ['traffico', 'traffic']],
    // A1-10
    'Ieri ho perso le chiavi.': [['perdere', 'lose'], ['chiavi', 'keys'], ['ieri', 'yesterday']],
    'Cosa hai fatto ieri sera?': [['fare', 'do'], ['ieri sera', 'last night']],
    'Non ho capito.': [['capire', 'understand']],
    'Lei è arrivata alle otto.': [['arrivare', 'arrive'], ['alle otto', 'at eight']],
    'Abbiamo mangiato una pizza.': [['mangiare', 'eat']],
    // A1-11
    'Domani sera vedo Luca.': [['domani sera', 'tomorrow evening'], ['vedere', 'see / meet']],
    'Ti aiuto io!': [['aiutare', 'help']],
    'Ho intenzione di imparare lo spagnolo.': [['imparare', 'learn'], ['spagnolo', 'Spanish']],
    // A1-12
    "Il treno è più veloce dell'autobus.": [['treno', 'train'], ['veloce', 'fast'], ['autobus', 'bus']],
    'È il ristorante più caro della città.': [['ristorante', 'restaurant'], ['caro', 'expensive'], ['città', 'city']],
    'Sei alto come tuo padre.': [['alto', 'tall'], ['padre', 'father']],
  };
  for (const u of UNITS) if (u.level === 'A1') for (const ex of u.exercises) if (ex.t === 't' && !ex.gl && GL[ex.it]) ex.gl = GL[ex.it];
})();
