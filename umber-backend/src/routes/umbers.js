import express from 'express';
// import { getUmbers, getUmber, createUmber, updateUmber, deleteUmber } from '../controllers/umberController.js';
// import { protect } from '../middleware/auth.js';

const router = express.Router();

// Placeholder routes - to be implemented
router.get('/', (req, res) => {
  res.json({ message: 'Get umbers endpoint - coming soon' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'Get single umber endpoint - coming soon' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create umber endpoint - coming soon' });
});

router.put('/:id', (req, res) => {
  res.json({ message: 'Update umber endpoint - coming soon' });
});

router.delete('/:id', (req, res) => {
  res.json({ message: 'Delete umber endpoint - coming soon' });
});

export default router;
