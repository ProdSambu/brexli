// Genera gli MP3 di tutte le frasi inglesi del corso con Piper (voce en_GB "cori").
// Uso: PIPER=…/piper.exe MODEL=…/en_GB-cori-high.onnx LAMEJS_DIR=…/enc node tools/build-audio.mjs
// Crea audio/<hash>.mp3 e js/audio-manifest.js; le frasi già generate vengono saltate.
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { spawn } from 'child_process';
import { pathToFileURL } from 'url';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')), '..');
const { PIPER, MODEL, LAMEJS_DIR } = process.env;
if (!PIPER || !MODEL || !LAMEJS_DIR) throw new Error('Servono PIPER, MODEL e LAMEJS_DIR');
const lame = await import(pathToFileURL(path.join(LAMEJS_DIR, 'node_modules/@breezystack/lamejs/dist/lamejs.js')).href);

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
const todo = items.filter(i => !fs.existsSync(path.join(outDir, `${i.k}.mp3`)));
console.log(`${items.length} frasi, da generare: ${todo.length}`);

// ---- Piper: un solo processo, una riga JSON per frase ----
const tmp = path.join(root, 'audio', '.wav');
fs.mkdirSync(tmp, { recursive: true });
// i WAV rimasti da un giro interrotto non si rigenerano
const toSynth = todo.filter(i => !fs.existsSync(path.join(tmp, `${i.k}.wav`)));
console.log(`da sintetizzare con Piper: ${toSynth.length}`);
if (toSynth.length) {
  await new Promise((resolve, reject) => {
    const p = spawn(PIPER, ['--model', MODEL, '--json-input', '--sentence_silence', '0.15', '--length_scale', '1.05'], { stdio: ['pipe', 'ignore', 'inherit'] });
    p.on('error', reject);
    p.on('close', code => code === 0 ? resolve() : reject(new Error('piper exit ' + code)));
    for (const i of toSynth) p.stdin.write(JSON.stringify({ text: i.t, output_file: path.join(tmp, `${i.k}.wav`) }) + '\n');
    p.stdin.end();
  });
}

// ---- WAV → MP3 mono 40 kbps ----
let bytes = 0;
for (const i of todo) {
  const wav = path.join(tmp, `${i.k}.wav`);
  const buf = fs.readFileSync(wav);
  const sr = buf.readUInt32LE(24), off = buf.indexOf('data') + 8;
  const n = Math.floor((buf.length - off) / 2);
  const pcm = new Int16Array(n);
  for (let j = 0; j < n; j++) pcm[j] = buf.readInt16LE(off + j * 2);
  const enc = new lame.Mp3Encoder(1, sr, 40);
  const parts = [];
  for (let j = 0; j < pcm.length; j += 1152) { const b = enc.encodeBuffer(pcm.subarray(j, j + 1152)); if (b.length) parts.push(Buffer.from(b)); }
  parts.push(Buffer.from(enc.flush()));
  const mp3 = Buffer.concat(parts);
  fs.writeFileSync(path.join(outDir, `${i.k}.mp3`), mp3);
  bytes += mp3.length;
  fs.unlinkSync(wav);
}
fs.rmSync(tmp, { recursive: true, force: true });

// ---- manifest: quali frasi hanno un file ----
const keys = items.map(i => i.k).filter(k => fs.existsSync(path.join(outDir, `${k}.mp3`))).sort();
fs.writeFileSync(path.join(root, 'js/audio-manifest.js'), `// Generato da tools/build-audio.mjs: frasi con un MP3 in audio/\nwindow.AUDIO_KEYS = new Set(${JSON.stringify(keys)});\n`);
console.log(`fatto: ${todo.length} nuovi file (${(bytes / 1e6).toFixed(1)} MB), ${keys.length} nel manifest`);
