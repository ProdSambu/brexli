// Chiavi dei file audio: condivise tra il sito e tools/build-audio.mjs.
(() => {
  const clean = t => String(t).replace(/\s+/g, ' ').trim();
  // FNV-1a a 32 bit sul testo ripulito: stesso testo, stesso file
  function speechKey(t) {
    let h = 0x811c9dc5;
    for (const ch of clean(t)) { h ^= ch.codePointAt(0); h = Math.imul(h, 0x01000193) >>> 0; }
    return h.toString(16).padStart(8, '0');
  }
  const fillIn = (q, x) => q.replace('___', x.trim()).replace(/ '/g, "'").replace(/\s+([.,!?])/g, '$1');
  // Le frasi inglesi che un esercizio può far ascoltare (soluzione, ripasso, dettato)
  function sayTexts(ex) {
    if (ex.t === 'c') return ex.q.includes('___') ? [ex.q.replace('___', ex.a)] : [];
    if (ex.t === 'f') return [fillIn(ex.q, ex.a[0])];
    return ex.a ? [ex.a[0]] : [];
  }
  window.SPEECH = { speechKey, fillIn, sayTexts, clean };
})();
