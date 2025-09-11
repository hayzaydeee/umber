const express = require('express');
const Nest = require('../models/Nest');
const Umber = require('../models/Umber');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Get all nests for an umber
router.get('/umber/:umberId', auth, async (req, res) => {
  try {
    // Verify umber belongs to user
    const umber = await Umber.findOne({ 
      _id: req.params.umberId, 
      userId: req.userId,
      isDeleted: { $ne: true }
    });

    if (!umber) {
      return res.status(404).json({ error: 'Umber not found' });
    }

    const nests = await Nest.find({ 
      umberId: req.params.umberId,
      userId: req.userId,
      isDeleted: { $ne: true }
    }).sort({ createdAt: -1 });

    res.json({
      nests,
      count: nests.length,
      umberId: req.params.umberId
    });
  } catch (error) {
    console.error('Get nests error:', error);
    res.status(500).json({ error: 'Server error fetching nests' });
  }
});

// Get single nest by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const nest = await Nest.findOne({ 
      _id: req.params.id, 
      userId: req.userId,
      isDeleted: { $ne: true }
    });

    if (!nest) {
      return res.status(404).json({ error: 'Nest not found' });
    }

    res.json({ nest });
  } catch (error) {
    console.error('Get nest error:', error);
    res.status(500).json({ error: 'Server error fetching nest' });
  }
});

// Create new nest
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, umberId, icon, color, tags, category, parentNestId, isOnboardingEntity, onboardingSessionId } = req.body;

    // Validation
    if (!name || name.trim().length === 0) {
      return res.status(400).json({ error: 'Nest name is required' });
    }

    if (!umberId) {
      return res.status(400).json({ error: 'Umber ID is required' });
    }

    if (name.length > 100) {
      return res.status(400).json({ error: 'Nest name must be 100 characters or less' });
    }

    // Verify umber exists and belongs to user
    const umber = await Umber.findOne({ 
      _id: umberId, 
      userId: req.userId,
      isDeleted: { $ne: true }
    });

    if (!umber) {
      return res.status(404).json({ error: 'Umber not found' });
    }

    // If parentNestId provided, verify it exists and belongs to same umber
    if (parentNestId) {
      const parentNest = await Nest.findOne({
        _id: parentNestId,
        umberId: umberId,
        userId: req.userId,
        isDeleted: { $ne: true }
      });

      if (!parentNest) {
        return res.status(404).json({ error: 'Parent nest not found' });
      }
    }

    // Create nest
    const nest = new Nest({
      name: name.trim(),
      description: description?.trim(),
      umberId,
      parentNestId,
      icon: icon || '📁',
      color: color || '#8B5A2B',
      userId: req.userId,
      tags: tags || [],
      category: category?.trim(),
      isOnboardingEntity: isOnboardingEntity || false,
      onboardingSessionId: onboardingSessionId
    });

    await nest.save();

    // Update parent umber stats
    await umber.updateStats();

    // Update user's onboarding progress if this is an onboarding entity
    if (isOnboardingEntity && onboardingSessionId) {
      await req.user.updateOnboardingProgress('nestCreationSuccess', onboardingSessionId);
    }

    res.status(201).json({
      message: 'Nest created successfully',
      nest
    });
  } catch (error) {
    console.error('Create nest error:', error);
    res.status(500).json({ error: 'Server error creating nest' });
  }
});

// Update nest
router.patch('/:id', auth, async (req, res) => {
  try {
    const nest = await Nest.findOne({ 
      _id: req.params.id, 
      userId: req.userId,
      isDeleted: { $ne: true }
    });

    if (!nest) {
      return res.status(404).json({ error: 'Nest not found' });
    }

    const allowedUpdates = ['name', 'description', 'icon', 'color', 'tags', 'category', 'parentNestId'];
    const updates = {};

    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key) && req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    });

    // Validation
    if (updates.name !== undefined) {
      if (!updates.name || updates.name.trim().length === 0) {
        return res.status(400).json({ error: 'Nest name is required' });
      }
      if (updates.name.length > 100) {
        return res.status(400).json({ error: 'Nest name must be 100 characters or less' });
      }
      updates.name = updates.name.trim();
    }

    if (updates.description !== undefined) {
      updates.description = updates.description?.trim();
    }

    // If updating parentNestId, verify it exists and belongs to same umber
    if (updates.parentNestId !== undefined && updates.parentNestId !== null) {
      const parentNest = await Nest.findOne({
        _id: updates.parentNestId,
        umberId: nest.umberId,
        userId: req.userId,
        isDeleted: { $ne: true }
      });

      if (!parentNest) {
        return res.status(404).json({ error: 'Parent nest not found' });
      }

      // Prevent circular reference
      if (updates.parentNestId === nest._id.toString()) {
        return res.status(400).json({ error: 'Nest cannot be its own parent' });
      }
    }

    Object.keys(updates).forEach(key => {
      nest[key] = updates[key];
    });

    await nest.save();

    // Update parent umber stats
    const umber = await Umber.findById(nest.umberId);
    if (umber) {
      await umber.updateStats();
    }

    res.json({
      message: 'Nest updated successfully',
      nest
    });
  } catch (error) {
    console.error('Update nest error:', error);
    res.status(500).json({ error: 'Server error updating nest' });
  }
});

// Delete nest (soft delete)
router.delete('/:id', auth, async (req, res) => {
  try {
    const nest = await Nest.findOne({ 
      _id: req.params.id, 
      userId: req.userId,
      isDeleted: { $ne: true }
    });

    if (!nest) {
      return res.status(404).json({ error: 'Nest not found' });
    }

    await nest.softDelete();

    // Update parent umber stats
    const umber = await Umber.findById(nest.umberId);
    if (umber) {
      await umber.updateStats();
    }

    res.json({ message: 'Nest deleted successfully' });
  } catch (error) {
    console.error('Delete nest error:', error);
    res.status(500).json({ error: 'Server error deleting nest' });
  }
});

// Search nests within an umber
router.get('/umber/:umberId/search/:query', auth, async (req, res) => {
  try {
    const query = req.params.query;
    const umberId = req.params.umberId;

    // Verify umber belongs to user
    const umber = await Umber.findOne({ 
      _id: umberId, 
      userId: req.userId,
      isDeleted: { $ne: true }
    });

    if (!umber) {
      return res.status(404).json({ error: 'Umber not found' });
    }
    
    const nests = await Nest.find({
      umberId: umberId,
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
      nests,
      count: nests.length,
      query,
      umberId
    });
  } catch (error) {
    console.error('Search nests error:', error);
    res.status(500).json({ error: 'Server error searching nests' });
  }
});

// Get nest stats
router.get('/:id/stats', auth, async (req, res) => {
  try {
    const nest = await Nest.findOne({ 
      _id: req.params.id, 
      userId: req.userId,
      isDeleted: { $ne: true }
    });

    if (!nest) {
      return res.status(404).json({ error: 'Nest not found' });
    }

    // Refresh stats
    await nest.updateStats();

    res.json({
      stats: {
        totalItems: nest.totalItems,
        totalValue: nest.totalValue,
        itemsCount: nest.items ? nest.items.length : 0,
        createdAt: nest.createdAt,
        lastUpdated: nest.updatedAt
      }
    });
  } catch (error) {
    console.error('Get nest stats error:', error);
    res.status(500).json({ error: 'Server error fetching nest stats' });
  }
});

module.exports = router;