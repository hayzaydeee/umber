const express = require('express');
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Server error fetching profile' });
  }
});

// Update user profile
router.patch('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const allowedUpdates = ['firstName', 'lastName', 'email', 'preferences'];
    const updates = {};

    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key) && req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    });

    // Validation
    if (updates.firstName !== undefined) {
      if (updates.firstName.trim().length === 0) {
        return res.status(400).json({ error: 'First name cannot be empty' });
      }
      updates.firstName = updates.firstName.trim();
    }

    if (updates.lastName !== undefined) {
      if (updates.lastName.trim().length === 0) {
        return res.status(400).json({ error: 'Last name cannot be empty' });
      }
      updates.lastName = updates.lastName.trim();
    }

    if (updates.email !== undefined) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(updates.email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }
      
      // Check if email is already taken by another user
      const existingUser = await User.findOne({ 
        email: updates.email.toLowerCase(), 
        _id: { $ne: req.userId } 
      });
      
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }
      
      updates.email = updates.email.toLowerCase();
    }

    Object.keys(updates).forEach(key => {
      user[key] = updates[key];
    });

    await user.save();

    // Return user without password
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      message: 'Profile updated successfully',
      user: userResponse
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Server error updating profile' });
  }
});

// Get user onboarding status
router.get('/onboarding', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('onboardingProgress isOnboardingComplete');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      onboardingProgress: user.onboardingProgress,
      isOnboardingComplete: user.isOnboardingComplete
    });
  } catch (error) {
    console.error('Get onboarding status error:', error);
    res.status(500).json({ error: 'Server error fetching onboarding status' });
  }
});

// Update onboarding progress
router.patch('/onboarding', auth, async (req, res) => {
  try {
    const { stage, sessionId, metadata } = req.body;

    if (!stage) {
      return res.status(400).json({ error: 'Onboarding stage is required' });
    }

    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.updateOnboardingProgress(stage, sessionId, metadata);

    res.json({
      message: 'Onboarding progress updated',
      onboardingProgress: user.onboardingProgress,
      isOnboardingComplete: user.isOnboardingComplete
    });
  } catch (error) {
    console.error('Update onboarding error:', error);
    res.status(500).json({ error: 'Server error updating onboarding progress' });
  }
});

// Reset onboarding (for testing/demo purposes)
router.post('/onboarding/reset', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.onboardingProgress = [];
    user.isOnboardingComplete = false;
    await user.save();

    res.json({
      message: 'Onboarding progress reset successfully',
      onboardingProgress: user.onboardingProgress,
      isOnboardingComplete: user.isOnboardingComplete
    });
  } catch (error) {
    console.error('Reset onboarding error:', error);
    res.status(500).json({ error: 'Server error resetting onboarding' });
  }
});

// Update user preferences
router.patch('/preferences', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { preferences } = req.body;

    if (!preferences || typeof preferences !== 'object') {
      return res.status(400).json({ error: 'Valid preferences object is required' });
    }

    // Merge with existing preferences
    user.preferences = {
      ...user.preferences,
      ...preferences
    };

    await user.save();

    res.json({
      message: 'Preferences updated successfully',
      preferences: user.preferences
    });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({ error: 'Server error updating preferences' });
  }
});

// Get user statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const Umber = require('../models/Umber');
    const Nest = require('../models/Nest');
    const Item = require('../models/Item');

    const [umbersCount, nestsCount, itemsCount] = await Promise.all([
      Umber.countDocuments({ userId: req.userId, isDeleted: { $ne: true } }),
      Nest.countDocuments({ userId: req.userId, isDeleted: { $ne: true } }),
      Item.countDocuments({ userId: req.userId, isDeleted: { $ne: true } })
    ]);

    // Calculate total value of all items
    const valueAggregation = await Item.aggregate([
      { 
        $match: { 
          userId: req.userId, 
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

    const user = await User.findById(req.userId).select('createdAt');

    res.json({
      stats: {
        umbersCount,
        nestsCount,
        itemsCount,
        totalValue,
        memberSince: user.createdAt,
        lastActivity: new Date()
      }
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ error: 'Server error fetching user statistics' });
  }
});

// Delete user account (soft delete)
router.delete('/account', auth, async (req, res) => {
  try {
    const { confirmPassword } = req.body;

    if (!confirmPassword) {
      return res.status(400).json({ error: 'Password confirmation is required' });
    }

    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await user.comparePassword(confirmPassword);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Soft delete user and all their data
    const Umber = require('../models/Umber');
    const Nest = require('../models/Nest');
    const Item = require('../models/Item');

    await Promise.all([
      User.findByIdAndUpdate(req.userId, { 
        isDeleted: true, 
        deletedAt: new Date(),
        email: `deleted_${Date.now()}_${user.email}` // Prevent email conflicts
      }),
      Umber.updateMany({ userId: req.userId }, { isDeleted: true, deletedAt: new Date() }),
      Nest.updateMany({ userId: req.userId }, { isDeleted: true, deletedAt: new Date() }),
      Item.updateMany({ userId: req.userId }, { isDeleted: true, deletedAt: new Date() })
    ]);

    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({ error: 'Server error deleting account' });
  }
});

module.exports = router;