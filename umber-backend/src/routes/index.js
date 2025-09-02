import express from 'express';
import authRoutes from './auth.js';
import userRoutes from './users.js';
import umberRoutes from './umbers.js';
import nestRoutes from './nests.js';
import itemRoutes from './items.js';
import mindmapRoutes from './mindmap.js';
import dashboardRoutes from './dashboard.js';

const router = express.Router();

// Route definitions
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/umbers', umberRoutes);
router.use('/nests', nestRoutes);
router.use('/items', itemRoutes);
router.use('/mindmap', mindmapRoutes);
router.use('/dashboard', dashboardRoutes);

// API info endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'Umber API v1.0',
    description: 'Contemplative commerce platform API',
    version: '1.0.0',
    docs: '/api/docs', // Future API documentation endpoint
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      umbers: '/api/umbers',
      nests: '/api/nests',
      items: '/api/items',
      mindmap: '/api/mindmap',
      dashboard: '/api/dashboard'
    }
  });
});

export default router;
