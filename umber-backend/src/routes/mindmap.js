import express from 'express';

const router = express.Router();

// Placeholder routes - to be implemented
router.get('/:id', (req, res) => {
  res.json({ message: 'Get mind map data endpoint - coming soon' });
});

router.put('/:id/positions', (req, res) => {
  res.json({ message: 'Update mind map positions endpoint - coming soon' });
});

export default router;
