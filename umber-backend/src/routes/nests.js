import express from 'express';

const router = express.Router();

// Placeholder routes - to be implemented
router.get('/', (req, res) => {
  res.json({ message: 'Get nests endpoint - coming soon' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create nest endpoint - coming soon' });
});

export default router;
