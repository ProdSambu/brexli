// Genera gli MP3 di tutte le frasi inglesi del corso con Kokoro (voce americana maschile "am_michael").
// Uso: KOKORO_DIR=…/kokoro LAMEJS_DIR=…/enc node tools/build-audio.mjs   (FORCE=1 per rifarli tutti)
// Crea audio/<hash>.mp3 e js/audio-manifest.js; le frasi già generate vengono saltate.
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { pathToFileURL } from 'url';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')), '..');
const { KOKORO_DIR, LAMEJS_DIR, FORCE } = process.env;
const VOICE = process.env.VOICE || 'am_michael';
if (!KOKORO_DIR || !LAMEJS_DIR) throw new Error('Servono KOKORO_DIR e LAMEJS_DIR');
const lame = await import(pathToFileURL(path.join(LAMEJS_DIR, 'node_modules/@breezystack/lamejs/dist/lamejs.js')).href);
const { KokoroTTS } = await import(pathToFileURL(path.join(KOKORO_DIR, 'node_modules/kokoro-js/dist/kokoro.js')).href);

// ---- carica i contenuti come fa il browser ----
const ctx = { console }; ctx.window = ctx; vm.createContext(ctx);
const load = f => vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
load('js/kit.js'); load('js/verbs.js');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const [, f] of html.matchAll(/<script src="(js\/units\/[^"]+)"/g)) load(f);
const { UNITS, VERBS } = ctx;
vm.runInContext(fs.readFileSync(path.join(root, 'js/speech.js'), 'utf8'), ctx);
const { speechKey, sayTexts } = ctx.SPEECH;

// ---- raccoglie i testi ----
const texts = new Set();
const unescape = s => s.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
for (const u of UNITS) {
  for (const s of u.theory) for (const [, t] of s.b.matchAll(/data-say="([^"]*)"/g)) texts.add(unescape(t));
  for (const ex of u.exercises) for (const t of sayTexts(ex)) texts.add(t);
}
for (const v of VERBS.ALL) texts.add(v.b);
for (const v of VERBS.IRR) texts.add(`${v.b}, ${v.p1}, ${v.pp1}`);

const outDir = path.join(root, 'audio');
fs.mkdirSync(outDir, { recursive: true });
const items = [...texts].filter(Boolean).map(t => ({ t, k: speechKey(t) }));
const todo = items.filter(i => FORCE || !fs.existsSync(path.join(outDir, `${i.k}.mp3`)));
console.log(`${items.length} frasi, da generare: ${todo.length} (voce ${VOICE})`);

// ---- Kokoro → PCM 16 bit → MP3 mono 48 kbps ----
const tts = todo.length ? await KokoroTTS.from_pretrained('onnx-community/Kokoro-82M-v1.0-ONNX', { dtype: 'fp32', device: 'cpu' }) : null;
let bytes = 0, done = 0;
for (const i of todo) {
  // Kokoro legge meglio le parole isolate con un punto finale ("go." invece di "go")
  const say = /[.?!]$/.test(i.t) ? i.t : `${i.t}.`;
  const audio = await tts.generate(say, { voice: VOICE, speed: 0.92 });
  const f = audio.audio, sr = audio.sampling_rate;
  // un filo di silenzio all'inizio e alla fine, così la prima sillaba non viene tagliata
  const pad = Math.round(sr * 0.08);
  const pcm = new Int16Array(f.length + pad * 2);
  for (let j = 0; j < f.length; j++) pcm[j + pad] = Math.max(-32768, Math.min(32767, Math.round(f[j] * 32767)));
  const enc = new lame.Mp3Encoder(1, sr, 48);
  const parts = [];
  for (let j = 0; j < pcm.length; j += 1152) { const b = enc.encodeBuffer(pcm.subarray(j, j + 1152)); if (b.length) parts.push(Buffer.from(b)); }
  parts.push(Buffer.from(enc.flush()));
  const mp3 = Buffer.concat(parts);
  fs.writeFileSync(path.join(outDir, `${i.k}.mp3`), mp3);
  bytes += mp3.length;
  if (++done % 100 === 0) console.log(`${done}/${todo.length}`);
}

// ---- manifest: quali frasi hanno un file; i file che non servono più vengono tolti ----
const keys = new Set(items.map(i => i.k));
for (const f of fs.readdirSync(outDir)) if (f.endsWith('.mp3') && !keys.has(f.slice(0, -4))) fs.unlinkSync(path.join(outDir, f));
const present = [...keys].filter(k => fs.existsSync(path.join(outDir, `${k}.mp3`))).sort();
fs.writeFileSync(path.join(root, 'js/audio-manifest.js'), `// Generato da tools/build-audio.mjs: frasi con un MP3 in audio/ (voce ${VOICE}, Kokoro)\nwindow.AUDIO_KEYS = new Set(${JSON.stringify(present)});\n`);
console.log(`fatto: ${done} file nuovi (${(bytes / 1e6).toFixed(1)} MB), ${present.length} nel manifest`);
