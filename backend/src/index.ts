import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';

const app = express();
app.use(cors());
app.use(express.json());

// In-memory store (replace with DB in prod)
const requests: Record<string, any> = {};

app.get('/api/v1/health', (_req, res) => res.json({ status: 'ok' }));

app.post('/api/v1/requests', (req, res) => {
  const id = nanoid();
  const now = new Date().toISOString();
  const r = {
    id,
    title: req.body.title || 'Untitled',
    description: req.body.description || '',
    status: 'open',
    created_at: now
  };
  requests[id] = r;
  res.status(201).json(r);
});

app.get('/api/v1/requests', (_req, res) => {
  res.json(Object.values(requests));
});

app.get('/api/v1/requests/:id', (req, res) => {
  const r = requests[req.params.id];
  if (!r) return res.status(404).json({ error: 'not_found' });
  return res.json(r);
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Backend listening on ${port}`));
