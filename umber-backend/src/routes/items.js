const express = require('express');
const Item = require('../models/Item');
const Nest = require('../models/Nest');
const Umber = require('../models/Umber');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Get all items for a nest
router.get('/nest/:nestId', auth, async (req, res) => {
  try {
    // Verify nest belongs to user
    const nest = await Nest.findOne({ 
      _id: req.params.nestId, 
      userId: req.userId,
      isDeleted: { $ne: true }
    });

    if (!nest) {
      return res.status(404).json({ error: 'Nest not found' });
    }

    const items = await Item.find({ 
      nestId: req.params.nestId,
      userId: req.userId,
      isDeleted: { $ne: true }
    }).sort({ createdAt: -1 });

    res.json({
      items,
      count: items.length,
      nestId: req.params.nestId
    });
  } catch (error) {
    console.error('Get items error:', error);
    res.status(500).json({ error: 'Server error fetching items' });
  }
});

// Get all items for an umber
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

    const items = await Item.find({ 
      umberId: req.params.umberId,
      userId: req.userId,
      isDeleted: { $ne: true }
    }).sort({ createdAt: -1 });

    res.json({
      items,
      count: items.length,
      umberId: req.params.umberId
    });
  } catch (error) {
    console.error('Get items error:', error);
    res.status(500).json({ error: 'Server error fetching items' });
  }
});

// Get single item by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const item = await Item.findOne({ 
      _id: req.params.id, 
      userId: req.userId,
      isDeleted: { $ne: true }
    });

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({ item });
  } catch (error) {
    console.error('Get item error:', error);
    res.status(500).json({ error: 'Server error fetching item' });
  }
});

// Create new item
router.post('/', auth, async (req, res) => {
  try {
    const { 
      name, 
      description, 
      nestId, 
      umberId,
      price, 
      currency,
      url,
      category,
      tags,
      brand,
      model,
      condition,
      size,
      color,
      images,
      reflectionPrompt,
      userReflection,
      scrapedData,
      isOnboardingEntity,
      onboardingSessionId
    } = req.body;

    // Validation
    if (!name || name.trim().length === 0) {
      return res.status(400).json({ error: 'Item name is required' });
    }

    if (!umberId) {
      return res.status(400).json({ error: 'Umber ID is required' });
    }

    if (name.length > 200) {
      return res.status(400).json({ error: 'Item name must be 200 characters or less' });
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

    // If nestId provided, verify it exists and belongs to same umber
    let nest = null;
    if (nestId) {
      nest = await Nest.findOne({
        _id: nestId,
        umberId: umberId,
        userId: req.userId,
        isDeleted: { $ne: true }
      });

      if (!nest) {
        return res.status(404).json({ error: 'Nest not found' });
      }
    }

    // Create item
    const item = new Item({
      name: name.trim(),
      description: description?.trim(),
      nestId,
      umberId,
      userId: req.userId,
      price: price || 0,
      currency: currency || 'USD',
      url: url?.trim(),
      category: category?.trim(),
      tags: tags || [],
      brand: brand?.trim(),
      model: model?.trim(),
      condition: condition?.trim(),
      size: size?.trim(),
      color: color?.trim(),
      images: images || [],
      reflectionPrompt: reflectionPrompt?.trim(),
      userReflection: userReflection?.trim(),
      scrapedData: scrapedData || {},
      isOnboardingEntity: isOnboardingEntity || false,
      onboardingSessionId: onboardingSessionId
    });

    await item.save();

    // Update parent stats
    if (nest) {
      await nest.updateStats();
    }
    await umber.updateStats();

    // Update user's onboarding progress if this is an onboarding entity
    if (isOnboardingEntity && onboardingSessionId) {
      await req.user.updateOnboardingProgress('itemCreationSuccess', onboardingSessionId);
    }

    res.status(201).json({
      message: 'Item created successfully',
      item
    });
  } catch (error) {
    console.error('Create item error:', error);
    res.status(500).json({ error: 'Server error creating item' });
  }
});

// Create item from URL (with scraping)
router.post('/from-url', auth, async (req, res) => {
  try {
    const { url, umberId, nestId, isOnboardingEntity, onboardingSessionId } = req.body;

    if (!url || !url.trim()) {
      return res.status(400).json({ error: 'URL is required' });
    }

    if (!umberId) {
      return res.status(400).json({ error: 'Umber ID is required' });
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

    // If nestId provided, verify it exists
    let nest = null;
    if (nestId) {
      nest = await Nest.findOne({
        _id: nestId,
        umberId: umberId,
        userId: req.userId,
        isDeleted: { $ne: true }
      });

      if (!nest) {
        return res.status(404).json({ error: 'Nest not found' });
      }
    }

    // Use URL scraping service
    const UrlScrapingService = require('../services/urlScrapingService');
    const scrapingService = new UrlScrapingService();
    const scrapedData = await scrapingService.scrapeUrl(url.trim());

    const item = new Item({
      name: scrapedData.title,
      description: scrapedData.description,
      nestId,
      umberId,
      userId: req.userId,
      price: scrapedData.price,
      currency: scrapedData.currency,
      url: url.trim(),
      images: scrapedData.images,
      brand: scrapedData.brand,
      category: scrapedData.category,
      scrapedData: scrapedData,
      isOnboardingEntity: isOnboardingEntity || false,
      onboardingSessionId: onboardingSessionId
    });

    await item.save();

    // Update parent stats
    if (nest) {
      await nest.updateStats();
    }
    await umber.updateStats();

    // Update user's onboarding progress if this is an onboarding entity
    if (isOnboardingEntity && onboardingSessionId) {
      await req.user.updateOnboardingProgress('urlItemCreationSuccess', onboardingSessionId);
    }

    res.status(201).json({
      message: 'Item created from URL successfully',
      item,
      scrapingSuccess: scrapedData.success !== false
    });
  } catch (error) {
    console.error('Create item from URL error:', error);
    res.status(500).json({ error: 'Server error creating item from URL' });
  }
});

// Update item
router.patch('/:id', auth, async (req, res) => {
  try {
    const item = await Item.findOne({ 
      _id: req.params.id, 
      userId: req.userId,
      isDeleted: { $ne: true }
    });

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const allowedUpdates = [
      'name', 'description', 'price', 'currency', 'url', 'category', 'tags',
      'brand', 'model', 'condition', 'size', 'color', 'images', 
      'reflectionPrompt', 'userReflection', 'nestId'
    ];
    const updates = {};

    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key) && req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    });

    // Validation
    if (updates.name !== undefined) {
      if (!updates.name || updates.name.trim().length === 0) {
        return res.status(400).json({ error: 'Item name is required' });
      }
      if (updates.name.length > 200) {
        return res.status(400).json({ error: 'Item name must be 200 characters or less' });
      }
      updates.name = updates.name.trim();
    }

    if (updates.description !== undefined) {
      updates.description = updates.description?.trim();
    }

    // If updating nestId, verify it exists and belongs to same umber
    if (updates.nestId !== undefined && updates.nestId !== null) {
      const nest = await Nest.findOne({
        _id: updates.nestId,
        umberId: item.umberId,
        userId: req.userId,
        isDeleted: { $ne: true }
      });

      if (!nest) {
        return res.status(404).json({ error: 'Nest not found' });
      }
    }

    // Track price changes
    if (updates.price !== undefined && updates.price !== item.price) {
      await item.addPriceHistory(updates.price, updates.currency || item.currency);
    }

    Object.keys(updates).forEach(key => {
      item[key] = updates[key];
    });

    await item.save();

    // Update parent stats
    const nest = await Nest.findById(item.nestId);
    if (nest) {
      await nest.updateStats();
    }
    
    const umber = await Umber.findById(item.umberId);
    if (umber) {
      await umber.updateStats();
    }

    res.json({
      message: 'Item updated successfully',
      item
    });
  } catch (error) {
    console.error('Update item error:', error);
    res.status(500).json({ error: 'Server error updating item' });
  }
});

// Delete item (soft delete)
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Item.findOne({ 
      _id: req.params.id, 
      userId: req.userId,
      isDeleted: { $ne: true }
    });

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    await item.softDelete();

    // Update parent stats
    const nest = await Nest.findById(item.nestId);
    if (nest) {
      await nest.updateStats();
    }
    
    const umber = await Umber.findById(item.umberId);
    if (umber) {
      await umber.updateStats();
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Delete item error:', error);
    res.status(500).json({ error: 'Server error deleting item' });
  }
});

// Search items within an umber
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
    
    const items = await Item.find({
      umberId: umberId,
      userId: req.userId,
      isDeleted: { $ne: true },
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } },
        { category: { $regex: query, $options: 'i' } },
        { brand: { $regex: query, $options: 'i' } },
        { model: { $regex: query, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });

    res.json({
      items,
      count: items.length,
      query,
      umberId
    });
  } catch (error) {
    console.error('Search items error:', error);
    res.status(500).json({ error: 'Server error searching items' });
  }
});

// Get item price history
router.get('/:id/price-history', auth, async (req, res) => {
  try {
    const item = await Item.findOne({ 
      _id: req.params.id, 
      userId: req.userId,
      isDeleted: { $ne: true }
    });

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({
      priceHistory: item.priceHistory || [],
      currentPrice: item.price,
      currency: item.currency
    });
  } catch (error) {
    console.error('Get price history error:', error);
    res.status(500).json({ error: 'Server error fetching price history' });
  }
});

// Update item reflection
router.patch('/:id/reflection', auth, async (req, res) => {
  try {
    const { userReflection } = req.body;

    const item = await Item.findOne({ 
      _id: req.params.id, 
      userId: req.userId,
      isDeleted: { $ne: true }
    });

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    item.userReflection = userReflection?.trim();
    await item.save();

    res.json({
      message: 'Item reflection updated successfully',
      reflection: item.userReflection
    });
  } catch (error) {
    console.error('Update reflection error:', error);
    res.status(500).json({ error: 'Server error updating reflection' });
  }
});

module.exports = router;