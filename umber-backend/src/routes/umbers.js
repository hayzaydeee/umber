const express = require('express');
const Umber = require('../models/Umber');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Get all user's umbers
router.get('/', auth, async (req, res) => {
  try {
    const umbers = await Umber.find({ 
      userId: req.userId, 
      isDeleted: { $ne: true } 
    }).sort({ createdAt: -1 });

    res.json({
      umbers,
      count: umbers.length
    });
  } catch (error) {
    console.error('Get umbers error:', error);
    res.status(500).json({ error: 'Server error fetching umbers' });
  }
});

// Get single umber by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const umber = await Umber.findOne({ 
      _id: req.params.id, 
      userId: req.userId,
      isDeleted: { $ne: true }
    });

    if (!umber) {
      return res.status(404).json({ error: 'Umber not found' });
    }

    res.json({ umber });
  } catch (error) {
    console.error('Get umber error:', error);
    res.status(500).json({ error: 'Server error fetching umber' });
  }
});

// Create new umber
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, icon, color, theme, mindMapPosition, tags, category, isOnboardingEntity, onboardingSessionId } = req.body;

    // Validation
    if (!name || name.trim().length === 0) {
      return res.status(400).json({ error: 'Umber name is required' });
    }

    if (name.length > 100) {
      return res.status(400).json({ error: 'Umber name must be 100 characters or less' });
    }

    // Create umber
    const umber = new Umber({
      name: name.trim(),
      description: description?.trim(),
      icon: icon || '📋',
      color: color || '#8B5A2B',
      theme: theme || 'umber',
      userId: req.userId,
      mindMapPosition: mindMapPosition || { x: 400, y: 300 },
      tags: tags || [],
      category: category?.trim(),
      isOnboardingEntity: isOnboardingEntity || false,
      onboardingSessionId: onboardingSessionId
    });

    await umber.save();

    // Update user's onboarding progress if this is an onboarding entity
    if (isOnboardingEntity && onboardingSessionId) {
      await req.user.updateOnboardingProgress('umberCreationSuccess', onboardingSessionId);
    }

    res.status(201).json({
      message: 'Umber created successfully',
      umber
    });
  } catch (error) {
    console.error('Create umber error:', error);
    res.status(500).json({ error: 'Server error creating umber' });
  }
});

// Update umber
router.patch('/:id', auth, async (req, res) => {
  try {
    const umber = await Umber.findOne({ 
      _id: req.params.id, 
      userId: req.userId,
      isDeleted: { $ne: true }
    });

    if (!umber) {
      return res.status(404).json({ error: 'Umber not found' });
    }

    const allowedUpdates = ['name', 'description', 'icon', 'color', 'theme', 'mindMapPosition', 'tags', 'category', 'privacy'];
    const updates = {};

    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key) && req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    });

    // Validation
    if (updates.name !== undefined) {
      if (!updates.name || updates.name.trim().length === 0) {
        return res.status(400).json({ error: 'Umber name is required' });
      }
      if (updates.name.length > 100) {
        return res.status(400).json({ error: 'Umber name must be 100 characters or less' });
      }
      updates.name = updates.name.trim();
    }

    if (updates.description !== undefined) {
      updates.description = updates.description?.trim();
    }

    Object.keys(updates).forEach(key => {
      umber[key] = updates[key];
    });

    await umber.save();

    res.json({
      message: 'Umber updated successfully',
      umber
    });
  } catch (error) {
    console.error('Update umber error:', error);
    res.status(500).json({ error: 'Server error updating umber' });
  }
});

// Delete umber (soft delete)
router.delete('/:id', auth, async (req, res) => {
  try {
    const umber = await Umber.findOne({ 
      _id: req.params.id, 
      userId: req.userId,
      isDeleted: { $ne: true }
    });

    if (!umber) {
      return res.status(404).json({ error: 'Umber not found' });
    }

    await umber.softDelete();

    res.json({ message: 'Umber deleted successfully' });
  } catch (error) {
    console.error('Delete umber error:', error);
    res.status(500).json({ error: 'Server error deleting umber' });
  }
});

// Search umbers
router.get('/search/:query', auth, async (req, res) => {
  try {
    const query = req.params.query;
    
    const umbers = await Umber.find({
      userId: req.userId,
      isDeleted: { $ne: true },
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } },
        { category: { $regex: query, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });

    res.json({
      umbers,
      count: umbers.length,
      query
    });
  } catch (error) {
    console.error('Search umbers error:', error);
    res.status(500).json({ error: 'Server error searching umbers' });
  }
});

// Get umber stats
router.get('/:id/stats', auth, async (req, res) => {
  try {
    const umber = await Umber.findOne({ 
      _id: req.params.id, 
      userId: req.userId,
      isDeleted: { $ne: true }
    });

    if (!umber) {
      return res.status(404).json({ error: 'Umber not found' });
    }

    // Refresh stats
    await umber.updateStats();

    res.json({
      stats: {
        totalItems: umber.totalItems,
        totalValue: umber.totalValue,
        nestsCount: umber.nests ? umber.nests.length : 0,
        createdAt: umber.createdAt,
        lastUpdated: umber.updatedAt
      }
    });
  } catch (error) {
    console.error('Get umber stats error:', error);
    res.status(500).json({ error: 'Server error fetching umber stats' });
  }
});

module.exports = router;