import express from 'express';

const router = express.Router();

// Placeholder routes - to be implemented
router.get('/', (req, res) => {
  res.json({ message: 'Get items endpoint - coming soon' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create item endpoint - coming soon' });
});

router.post('/scrape', (req, res) => {
  res.json({ message: 'URL scraping endpoint - coming soon' });
});

export default router;
