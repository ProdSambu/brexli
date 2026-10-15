// Server degli account da solo (sviluppo locale o servizio dedicato).
// Con DATABASE_URL usa Postgres; senza, un database in memoria (pg-mem) che si azzera al riavvio.
import express from 'express';
import { createRequire } from 'module';
import { brexliApi } from './api.mjs';

const require = createRequire(import.meta.url);
const { mergeProgress } = require('../js/progress.js');

let pool;
if (process.env.DATABASE_URL) {
  const { default: pg } = await import('pg');
  pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: /sslmode=disable/.test(process.env.DATABASE_URL) ? false : { rejectUnauthorized: false },
    max: 3,
  });
} else {
  const { newDb } = await import('pg-mem');
  pool = new (newDb().adapters.createPg().Pool)();
  console.log('Nessun DATABASE_URL: uso un database in memoria');
}

const app = express();
app.set('trust proxy', 1);
// risponde subito anche a database freddo: serve a svegliare il servizio e al controllo di Render
app.get('/api/health', (req, res) => { res.set('Access-Control-Allow-Origin', '*'); res.json({ ok: true }); });
app.use('/api', brexliApi({ pool, mergeProgress }));
app.get('/', (req, res) => res.type('text').send('Brexli API'));
const port = process.env.PORT || 3100;
app.listen(port, () => console.log(`API di Brexli su http://localhost:${port}/api`));
