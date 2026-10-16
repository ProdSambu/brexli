// Verbi: elenco degli irregolari, verbi regolari comuni e coniugatore.
(() => {
const IRR_SRC = `arise|arose|arisen|sorgere, presentarsi
awake|awoke|awoken|svegliarsi
be|was / were|been|essere
bear|bore|borne / born|sopportare (be born = nascere)
beat|beat|beaten|battere, sconfiggere
become|became|become|diventare
begin|began|begun|cominciare
bend|bent|bent|piegare
bet|bet|bet|scommettere
bite|bit|bitten|mordere
bleed|bled|bled|sanguinare
blow|blew|blown|soffiare
break|broke|broken|rompere
bring|brought|brought|portare (verso chi parla)
build|built|built|costruire
burn|burnt / burned|burnt / burned|bruciare
buy|bought|bought|comprare
catch|caught|caught|afferrare, prendere
choose|chose|chosen|scegliere
come|came|come|venire
cost|cost|cost|costare
cut|cut|cut|tagliare
deal|dealt|dealt|trattare, gestire
dig|dug|dug|scavare
do|did|done|fare
draw|drew|drawn|disegnare
dream|dreamt / dreamed|dreamt / dreamed|sognare
drink|drank|drunk|bere
drive|drove|driven|guidare
eat|ate|eaten|mangiare
fall|fell|fallen|cadere
feed|fed|fed|nutrire, dare da mangiare
feel|felt|felt|sentire (sensazioni), sentirsi
fight|fought|fought|combattere, litigare
find|found|found|trovare
fly|flew|flown|volare
forbid|forbade|forbidden|proibire
forget|forgot|forgotten|dimenticare
forgive|forgave|forgiven|perdonare
freeze|froze|frozen|congelare
get|got|got / gotten|ottenere, ricevere, diventare (gotten è americano)
give|gave|given|dare
go|went|gone|andare
grow|grew|grown|crescere, coltivare
hang|hung|hung|appendere
have|had|had|avere
hear|heard|heard|udire, sentire
hide|hid|hidden|nascondere
hit|hit|hit|colpire
hold|held|held|tenere in mano
hurt|hurt|hurt|ferire, fare male
keep|kept|kept|tenere, mantenere
know|knew|known|sapere, conoscere
lay|laid|laid|posare, apparecchiare
lead|led|led|guidare, condurre
learn|learnt / learned|learnt / learned|imparare
leave|left|left|partire, lasciare
lend|lent|lent|prestare
let|let|let|lasciare, permettere
lie|lay|lain|giacere, stare sdraiato (mentire invece è regolare: lie – lied – lied)
light|lit|lit|accendere
lose|lost|lost|perdere
make|made|made|fare, fabbricare
mean|meant|meant|significare, intendere
meet|met|met|incontrare, conoscere
pay|paid|paid|pagare
put|put|put|mettere
quit|quit|quit|smettere, lasciare
read|read|read|leggere (al passato si pronuncia /red/)
ride|rode|ridden|andare (in bici, a cavallo)
ring|rang|rung|suonare, telefonare
rise|rose|risen|sorgere, aumentare
run|ran|run|correre
say|said|said|dire
see|saw|seen|vedere
seek|sought|sought|cercare
sell|sold|sold|vendere
send|sent|sent|mandare
set|set|set|fissare, impostare
shake|shook|shaken|scuotere
shine|shone|shone|splendere
shoot|shot|shot|sparare
show|showed|shown|mostrare
shut|shut|shut|chiudere
sing|sang|sung|cantare
sink|sank|sunk|affondare
sit|sat|sat|sedersi, essere seduto
sleep|slept|slept|dormire
slide|slid|slid|scivolare
smell|smelt / smelled|smelt / smelled|odorare, annusare
speak|spoke|spoken|parlare
spell|spelt / spelled|spelt / spelled|fare lo spelling
spend|spent|spent|spendere, trascorrere
spread|spread|spread|spalmare, diffondere
stand|stood|stood|stare in piedi
steal|stole|stolen|rubare
stick|stuck|stuck|attaccare, incollare
sting|stung|stung|pungere
strike|struck|struck|colpire
swear|swore|sworn|giurare, imprecare
sweep|swept|swept|spazzare
swim|swam|swum|nuotare
take|took|taken|prendere
teach|taught|taught|insegnare
tear|tore|torn|strappare
tell|told|told|dire (a qualcuno), raccontare
think|thought|thought|pensare
throw|threw|thrown|lanciare
understand|understood|understood|capire
upset|upset|upset|turbare, sconvolgere
wake|woke|woken|svegliarsi, svegliare
wear|wore|worn|indossare
win|won|won|vincere
write|wrote|written|scrivere`;

const REG_SRC = `admit|ammettere
agree|essere d'accordo
allow|permettere
answer|rispondere
arrive|arrivare
ask|chiedere, domandare
believe|credere
borrow|prendere in prestito
call|chiamare, telefonare
carry|portare (in mano, addosso)
change|cambiare
clean|pulire
close|chiudere
cook|cucinare
cry|piangere
dance|ballare
decide|decidere
die|morire
enjoy|godersi, divertirsi
enter|entrare
explain|spiegare
finish|finire
fix|aggiustare, sistemare
follow|seguire
happen|succedere
hate|odiare
help|aiutare
hope|sperare
jump|saltare
kiss|baciare
like|piacere
listen|ascoltare
live|vivere, abitare
look|guardare, sembrare
love|amare
miss|perdere (treno), sentire la mancanza
move|muovere, traslocare
need|avere bisogno
offer|offrire
open|aprire
order|ordinare
plan|progettare, pianificare
play|giocare, suonare
prefer|preferire
pull|tirare
push|spingere
rain|piovere
remember|ricordare
return|tornare, restituire
smile|sorridere
start|iniziare
stay|restare, alloggiare
stop|fermare, smettere
study|studiare
talk|parlare, chiacchierare
travel|viaggiare
try|provare
turn|girare
use|usare
visit|visitare, andare a trovare
wait|aspettare
walk|camminare
want|volere
wash|lavare
watch|guardare (TV, partita)
work|lavorare
worry|preoccuparsi`;

const DOUBLE = new Set(['begin', 'forget', 'prefer', 'admit', 'refer', 'occur', 'permit', 'control', 'travel', 'cancel', 'quit', 'regret', 'upset', 'commit', 'forbid', 'label', 'model']);
const doubles = v => DOUBLE.has(v) || /^[^aeiou]*[aeiou][^aeiouwxy]$/.test(v);

function third(v) {
  if (v === 'be') return 'is';
  if (v === 'have') return 'has';
  if (/(s|x|z|ch|sh|o)$/.test(v)) return v + 'es';
  if (/[^aeiou]y$/.test(v)) return v.slice(0, -1) + 'ies';
  return v + 's';
}
function ing(v) {
  if (v === 'be') return 'being';
  if (/ie$/.test(v)) return v.slice(0, -2) + 'ying';
  if (/[^eoy]e$/.test(v)) return v.slice(0, -1) + 'ing';
  if (doubles(v)) return v + v.slice(-1) + 'ing';
  return v + 'ing';
}
function ed(v) {
  if (/e$/.test(v)) return v + 'd';
  if (/[^aeiou]y$/.test(v)) return v.slice(0, -1) + 'ied';
  if (doubles(v)) return v + v.slice(-1) + 'ed';
  return v + 'ed';
}

function make(b, it, p, pp, irr) {
  p = p || ed(b); pp = pp || ed(b);
  // p1 / pp1: la prima forma, quella usata nelle tabelle (burnt / burned → burnt)
  return { b, it, p, pp, p1: p.split(' / ')[0], pp1: pp.split(' / ')[0], irr, third: third(b), ing: ing(b) };
}
const IRR = IRR_SRC.split('\n').map(l => { const [b, p, pp, it] = l.split('|'); return make(b, it, p, pp, true); });
const REG = REG_SRC.split('\n').map(l => { const [b, it] = l.split('|'); return make(b, it, null, null, false); });
const ALL = [...IRR, ...REG].sort((a, b) => a.b.localeCompare(b.b));

// I modali non si coniugano: hanno una forma sola (unità 8)
const MODALS = ['can', 'could', 'must', 'should', 'may', 'might', 'will', 'would', 'shall', 'ought'];

function find(q) {
  q = String(q || '').toLowerCase().trim().replace(/^to\s+/, '');
  if (!q) return null;
  if (MODALS.includes(q)) return { modal: q };
  const hit = ALL.find(v => v.b === q);
  if (hit) return { v: hit };
  const fromForm = IRR.find(v => v.p.split(' / ').includes(q) || v.pp.split(' / ').includes(q));
  if (fromForm) return { v: fromForm, from: q };
  if (/^[a-z]{2,}$/.test(q)) return { v: make(q, '', null, null, false), guessed: true };
  return null;
}

// Coniugazione
const P = [
  { s: 'I', be: 'am', was: 'was' },
  { s: 'you', be: 'are', was: 'were' },
  { s: 'he / she / it', be: 'is', was: 'was', t: true },
  { s: 'we', be: 'are', was: 'were' },
  { s: 'they', be: 'are', was: 'were' },
];
const cap = s => s[0].toUpperCase() + s.slice(1);
const beNeg = p => p.s === 'I' ? "I'm not" : `${p.s} ${p.be}n't`;

function tenses(v) {
  const be = v.b === 'be';
  return [
    { name: 'Present simple', lv: 'A1', use: 'Abitudini, fatti, stati permanenti. ≈ presente indicativo.',
      aff: p => be ? `${p.s} ${p.be}` : `${p.s} ${p.t ? v.third : v.b}`,
      neg: p => be ? beNeg(p) : `${p.s} ${p.t ? "doesn't" : "don't"} ${v.b}`,
      q: p => be ? `${cap(p.be)} ${p.s}?` : `${p.t ? 'Does' : 'Do'} ${p.s} ${v.b}?` },
    { name: 'Present continuous', lv: 'A1', use: 'Azione in corso adesso o situazione temporanea. ≈ sto + gerundio.',
      aff: p => `${p.s} ${p.be} ${v.ing}`, neg: p => `${beNeg(p)} ${v.ing}`, q: p => `${cap(p.be)} ${p.s} ${v.ing}?` },
    { name: 'Past simple', lv: 'A1', use: 'Azione conclusa in un momento preciso del passato. ≈ passato prossimo / remoto.',
      aff: p => be ? `${p.s} ${p.was}` : `${p.s} ${v.p1}`,
      neg: p => be ? `${p.s} ${p.was}n't` : `${p.s} didn't ${v.b}`,
      q: p => be ? `${cap(p.was)} ${p.s}?` : `Did ${p.s} ${v.b}?` },
    { name: 'Past continuous', lv: 'A2', use: 'Azione in corso in un momento del passato. ≈ stavo + gerundio, imperfetto.',
      aff: p => `${p.s} ${p.was} ${v.ing}`, neg: p => `${p.s} ${p.was}n't ${v.ing}`, q: p => `${cap(p.was)} ${p.s} ${v.ing}?` },
    { name: 'Present perfect', lv: 'A2', use: 'Passato legato al presente: esperienze, risultati, azioni non concluse. Mai con tempi finiti (yesterday, in 2019).',
      aff: p => `${p.s} ${p.t ? 'has' : 'have'} ${v.pp1}`, neg: p => `${p.s} ${p.t ? "hasn't" : "haven't"} ${v.pp1}`, q: p => `${p.t ? 'Has' : 'Have'} ${p.s} ${v.pp1}?` },
    { name: 'Past perfect', lv: 'B1', use: 'Un passato avvenuto prima di un altro passato. ≈ trapassato prossimo.',
      aff: p => `${p.s} had ${v.pp1}`, neg: p => `${p.s} hadn't ${v.pp1}`, q: p => `Had ${p.s} ${v.pp1}?` },
    { name: 'Future with will', lv: 'A1', use: 'Previsioni, decisioni prese sul momento, promesse, offerte.',
      aff: p => `${p.s} will ${v.b}`, neg: p => `${p.s} won't ${v.b}`, q: p => `Will ${p.s} ${v.b}?` },
    { name: 'Be going to', lv: 'A1', use: 'Intenzioni già decise e previsioni basate su ciò che si vede.',
      aff: p => `${p.s} ${p.be} going to ${v.b}`, neg: p => `${beNeg(p)} going to ${v.b}`, q: p => `${cap(p.be)} ${p.s} going to ${v.b}?` },
    { name: 'Conditional (would)', lv: 'B1', use: '≈ condizionale presente: I would go = andrei.',
      aff: p => `${p.s} would ${v.b}`, neg: p => `${p.s} wouldn't ${v.b}`, q: p => `Would ${p.s} ${v.b}?` },
  ];
}

window.VERBS = { IRR, REG, ALL, find, tenses, PERSONS: P, ed, ing, third };
})();
