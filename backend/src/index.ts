import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';
import {
  analyticsSnapshot,
  businesses,
  erasActivities,
  erasOverview,
  erasTiers,
  jobListings,
  marketplaceItems,
  platformOverview,
  serviceOfferings
} from './data';

const app = express();
app.use(cors());
app.use(express.json());

// In-memory store (replace with DB in prod)
const requests: Record<string, any> = {};

const router = express.Router();

router.get('/health', (_req, res) => res.json({ status: 'ok' }));

router.get('/overview', (_req, res) => {
  res.json({
    platform: platformOverview,
    metrics: analyticsSnapshot,
    modules: {
      businesses: businesses.length,
      marketplace: marketplaceItems.length,
      jobs: jobListings.length,
      services: serviceOfferings.length
    }
  });
});

router.get('/businesses', (_req, res) => {
  res.json(businesses);
});

router.get('/marketplace', (_req, res) => {
  res.json(marketplaceItems);
});

router.get('/jobs', (_req, res) => {
  res.json(jobListings);
});

router.get('/services', (_req, res) => {
  res.json(serviceOfferings);
});

router.get('/eras', (_req, res) => {
  res.json({ overview: erasOverview, activities: erasActivities, tiers: erasTiers });
});

router.post('/requests', (req, res) => {
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

router.get('/requests', (_req, res) => {
  res.json(Object.values(requests));
});

router.get('/requests/:id', (req, res) => {
  const r = requests[req.params.id];
  if (!r) return res.status(404).json({ error: 'not_found' });
  return res.json(r);
});

app.use('/api/v1', router);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Backend listening on ${port}`));
