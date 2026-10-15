// Unione dei progressi tra dispositivi: usata dal sito e dal server degli account.
// - unità e verbi irregolari: vince il risultato migliore
// - ripasso: vince la lista modificata più di recente (reviewAt), così un errore
//   risolto su un dispositivo non ricompare dall'altro
(function (root) {
  function clean(d) {
    d = d && typeof d === 'object' ? d : {};
    return {
      units: d.units && typeof d.units === 'object' ? d.units : {},
      review: Array.isArray(d.review) ? d.review : [],
      reviewAt: Number(d.reviewAt) || 0,
      irr: d.irr && typeof d.irr === 'object' ? d.irr : {},
    };
  }
  function mergeProgress(a, b) {
    a = clean(a); b = clean(b);
    const units = { ...a.units };
    for (const [id, p] of Object.entries(b.units)) {
      const q = units[id];
      if (!q) { units[id] = p; continue; }
      const latest = (p.at || 0) > (q.at || 0) ? p : q;
      units[id] = { best: Math.max(q.best || 0, p.best || 0), last: latest.last, at: Math.max(q.at || 0, p.at || 0) };
    }
    const irr = { ...a.irr };
    for (const [v, n] of Object.entries(b.irr)) irr[v] = Math.max(irr[v] || 0, n || 0);
    const newer = b.reviewAt > a.reviewAt ? b : a;
    return { units, review: newer.review, reviewAt: newer.reviewAt, irr };
  }
  const api = { mergeProgress, cleanProgress: clean };
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PROGRESS = api;
})(typeof window !== 'undefined' ? window : globalThis);
