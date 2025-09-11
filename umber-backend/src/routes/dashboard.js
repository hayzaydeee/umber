const express = require('express');
const User = require('../models/User');
const Umber = require('../models/Umber');
const Nest = require('../models/Nest');
const Item = require('../models/Item');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Get dashboard overview
router.get('/overview', auth, async (req, res) => {
  try {
    const userId = req.userId;

    // Get basic counts
    const [umbersCount, nestsCount, itemsCount] = await Promise.all([
      Umber.countDocuments({ userId, isDeleted: { $ne: true } }),
      Nest.countDocuments({ userId, isDeleted: { $ne: true } }),
      Item.countDocuments({ userId, isDeleted: { $ne: true } })
    ]);

    // Get recent items (last 5)
    const recentItems = await Item.find({ 
      userId, 
      isDeleted: { $ne: true } 
    })
    .sort({ createdAt: -1 })
    .limit(5)
    .select('name price currency url createdAt umberId nestId');

    // Get total value
    const valueAggregation = await Item.aggregate([
      { 
        $match: { 
          userId, 
          isDeleted: { $ne: true },
          price: { $exists: true, $ne: null }
        }
      },
      {
        $group: {
          _id: null,
          totalValue: { $sum: '$price' }
        }
      }
    ]);

    const totalValue = valueAggregation.length > 0 ? valueAggregation[0].totalValue : 0;

    // Get top categories
    const topCategories = await Item.aggregate([
      { 
        $match: { 
          userId, 
          isDeleted: { $ne: true },
          category: { $exists: true, $ne: null, $ne: '' }
        }
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalValue: { $sum: '$price' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // Get most valuable items
    const mostValuableItems = await Item.find({ 
      userId, 
      isDeleted: { $ne: true },
      price: { $gt: 0 }
    })
    .sort({ price: -1 })
    .limit(5)
    .select('name price currency url umberId nestId');

    res.json({
      overview: {
        counts: {
          umbers: umbersCount,
          nests: nestsCount,
          items: itemsCount
        },
        totalValue,
        recentItems,
        topCategories,
        mostValuableItems
      }
    });
  } catch (error) {
    console.error('Dashboard overview error:', error);
    res.status(500).json({ error: 'Server error fetching dashboard overview' });
  }
});

// Get umbers with their stats for dashboard
router.get('/umbers', auth, async (req, res) => {
  try {
    const userId = req.userId;

    const umbers = await Umber.find({ 
      userId, 
      isDeleted: { $ne: true } 
    })
    .sort({ updatedAt: -1 })
    .select('name description icon color theme totalItems totalValue mindMapPosition createdAt updatedAt');

    res.json({
      umbers,
      count: umbers.length
    });
  } catch (error) {
    console.error('Dashboard umbers error:', error);
    res.status(500).json({ error: 'Server error fetching dashboard umbers' });
  }
});

// Get mind map data
router.get('/mindmap', auth, async (req, res) => {
  try {
    const userId = req.userId;

    // Get all umbers with their positions
    const umbers = await Umber.find({ 
      userId, 
      isDeleted: { $ne: true } 
    })
    .select('name description icon color totalItems totalValue mindMapPosition')
    .lean();

    // Get all nests to show connections
    const nests = await Nest.find({ 
      userId, 
      isDeleted: { $ne: true } 
    })
    .select('name umberId totalItems')
    .lean();

    // Group nests by umber
    const umberConnections = {};
    nests.forEach(nest => {
      if (!umberConnections[nest.umberId]) {
        umberConnections[nest.umberId] = [];
      }
      umberConnections[nest.umberId].push(nest);
    });

    // Add connections to umbers
    const mindMapData = umbers.map(umber => ({
      ...umber,
      nests: umberConnections[umber._id] || []
    }));

    res.json({
      mindMapData,
      totalUmbers: umbers.length,
      totalNests: nests.length
    });
  } catch (error) {
    console.error('Dashboard mindmap error:', error);
    res.status(500).json({ error: 'Server error fetching mind map data' });
  }
});

// Get activity feed
router.get('/activity', auth, async (req, res) => {
  try {
    const userId = req.userId;
    const { limit = 20, skip = 0 } = req.query;

    // Get recent items with additional context
    const recentItems = await Item.find({ 
      userId, 
      isDeleted: { $ne: true } 
    })
    .sort({ createdAt: -1 })
    .skip(parseInt(skip))
    .limit(parseInt(limit))
    .populate('umberId', 'name icon color')
    .populate('nestId', 'name')
    .select('name price currency url createdAt');

    // Get recent umbers
    const recentUmbers = await Umber.find({ 
      userId, 
      isDeleted: { $ne: true } 
    })
    .sort({ createdAt: -1 })
    .limit(5)
    .select('name icon color createdAt');

    // Get recent nests
    const recentNests = await Nest.find({ 
      userId, 
      isDeleted: { $ne: true } 
    })
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('umberId', 'name icon color')
    .select('name createdAt');

    // Combine and sort all activities
    const activities = [
      ...recentItems.map(item => ({
        type: 'item',
        action: 'created',
        data: item,
        timestamp: item.createdAt
      })),
      ...recentUmbers.map(umber => ({
        type: 'umber',
        action: 'created',
        data: umber,
        timestamp: umber.createdAt
      })),
      ...recentNests.map(nest => ({
        type: 'nest',
        action: 'created',
        data: nest,
        timestamp: nest.createdAt
      }))
    ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
     .slice(0, parseInt(limit));

    res.json({
      activities,
      hasMore: activities.length === parseInt(limit)
    });
  } catch (error) {
    console.error('Dashboard activity error:', error);
    res.status(500).json({ error: 'Server error fetching activity feed' });
  }
});

// Get search results across all content
router.get('/search/:query', auth, async (req, res) => {
  try {
    const userId = req.userId;
    const query = req.params.query;
    const searchRegex = { $regex: query, $options: 'i' };

    // Search across all entities
    const [umbers, nests, items] = await Promise.all([
      Umber.find({
        userId,
        isDeleted: { $ne: true },
        $or: [
          { name: searchRegex },
          { description: searchRegex },
          { tags: { $in: [new RegExp(query, 'i')] } },
          { category: searchRegex }
        ]
      }).select('name description icon color totalItems totalValue').limit(10),

      Nest.find({
        userId,
        isDeleted: { $ne: true },
        $or: [
          { name: searchRegex },
          { description: searchRegex },
          { tags: { $in: [new RegExp(query, 'i')] } },
          { category: searchRegex }
        ]
      }).populate('umberId', 'name icon color')
        .select('name description totalItems totalValue').limit(10),

      Item.find({
        userId,
        isDeleted: { $ne: true },
        $or: [
          { name: searchRegex },
          { description: searchRegex },
          { tags: { $in: [new RegExp(query, 'i')] } },
          { category: searchRegex },
          { brand: searchRegex },
          { model: searchRegex }
        ]
      }).populate('umberId', 'name icon color')
        .populate('nestId', 'name')
        .select('name description price currency url').limit(15)
    ]);

    const totalResults = umbers.length + nests.length + items.length;

    res.json({
      query,
      results: {
        umbers,
        nests,
        items
      },
      counts: {
        umbers: umbers.length,
        nests: nests.length,
        items: items.length,
        total: totalResults
      }
    });
  } catch (error) {
    console.error('Dashboard search error:', error);
    res.status(500).json({ error: 'Server error performing search' });
  }
});

// Get onboarding dashboard data
router.get('/onboarding', auth, async (req, res) => {
  try {
    const userId = req.userId;

    // Get user's onboarding progress
    const user = await User.findById(userId).select('onboardingProgress isOnboardingComplete');

    // Get onboarding entities (items created during onboarding)
    const onboardingItems = await Item.find({
      userId,
      isOnboardingEntity: true,
      isDeleted: { $ne: true }
    }).populate('umberId', 'name icon color')
      .populate('nestId', 'name')
      .select('name description price currency url onboardingSessionId createdAt');

    const onboardingUmbers = await Umber.find({
      userId,
      isOnboardingEntity: true,
      isDeleted: { $ne: true }
    }).select('name description icon color totalItems totalValue onboardingSessionId createdAt');

    const onboardingNests = await Nest.find({
      userId,
      isOnboardingEntity: true,
      isDeleted: { $ne: true }
    }).populate('umberId', 'name icon color')
      .select('name description totalItems totalValue onboardingSessionId createdAt');

    res.json({
      onboardingProgress: user.onboardingProgress,
      isOnboardingComplete: user.isOnboardingComplete,
      onboardingEntities: {
        umbers: onboardingUmbers,
        nests: onboardingNests,
        items: onboardingItems
      }
    });
  } catch (error) {
    console.error('Onboarding dashboard error:', error);
    res.status(500).json({ error: 'Server error fetching onboarding dashboard' });
  }
});

module.exports = router;