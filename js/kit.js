// Strumenti per scrivere le unità: ogni file in js/units chiama UNIT({...}).
window.UNITS = [];
// Ogni unità tiene l'elenco delle frasi d'esempio adatte al dettato (da 3 a 10 parole):
// a ogni sessione se ne pescano alcune a caso.
window.UNIT = u => {
  const says = [];
  for (const s of u.theory) for (const m of s.b.matchAll(/data-say="([^"]*)"/g)) says.push(m[1].replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&amp;/g, '&'));
  u.dict = [...new Set(says.filter(t => /^[A-Z][^—/()]*[.?!]$/.test(t) && t.split(' ').length >= 3 && t.split(' ').length <= 10))];
  UNITS.push(u);
};

const SPK = '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M2 6h2.5L8 3v10L4.5 10H2z"/><path d="M10.5 5.2a3.6 3.6 0 0 1 0 5.6" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><path d="M12.4 3.4a6 6 0 0 1 0 9.2" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>';
window.SPK = SPK;

const attr = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const strip = s => String(s).replace(/<[^>]+>/g, '');

// Esempio inglese con traduzione e pulsante audio
window.E = (en, it = '') =>
  `<p class="ex"><button class="say" type="button" data-say="${attr(strip(en))}" title="Ascolta">${SPK}</button><span class="en">${en}</span>${it ? `<span class="it">${it}</span>` : ''}</p>`;
// Gruppo di esempi: EX(["en","it"], ["en","it"])
window.EX = (...pairs) => `<div class="exs">${pairs.map(p => E(p[0], p[1])).join('')}</div>`;
// Tabella
window.T = (head, rows, cls = '') =>
  `<div class="tw"><table class="tbl ${cls}"><thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
// Nota a margine
window.N = html => `<aside class="note">${html}</aside>`;
// Errori tipici: ERR(["sbagliato","giusto","perché"], ...)
window.ERR = (...items) =>
  `<ul class="errs">${items.map(([w, r, why]) => `<li><span class="wrong">${w}</span><span class="arrow">→</span><span class="right">${r}</span>${why ? `<span class="why">${why}</span>` : ''}</li>`).join('')}</ul>`;

// Percorso: le linee ancora in costruzione (quando una linea ha le sue unità, questa voce si ignora). stop = nome breve della fermata sulla mappa
window.ROADMAP = [
  { lv: 'B1', name: 'Frasi complesse', desc: 'Ipotesi, passivo, discorso indiretto, frasi relative.', units: [
    ['Past perfect', 'Past perfect'],
    ['Passivo', 'Il passivo'],
    ['If + would', 'Il secondo condizionale'],
    ['Discorso indiretto', 'Il discorso indiretto'],
    ['Who, which, that', 'Frasi relative: who, which, that, whose'],
    ['Used to', 'Used to e would'],
    ['Wish', 'Il terzo condizionale e wish'],
    ['Phrasal verbs', 'Phrasal verbs essenziali'],
  ].map(([stop, title]) => ({ stop, title })) },
];
