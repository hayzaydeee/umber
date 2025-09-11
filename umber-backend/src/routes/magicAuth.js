const express = require('express');
const crypto = require('crypto');
const User = require('../models/User');
const { generateToken } = require('../middleware/auth');
const emailService = require('../services/emailService');
const RateLimiter = require('../middleware/rateLimiter');
const router = express.Router();

// Send Magic Link (replaces both register and login)
router.post('/send-magic-link', async (req, res) => {
  try {
    const { email, name } = req.body;
    
    // Validation
    if (!email) {
      return res.status(400).json({ 
        error: 'Email is required' 
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ 
        error: 'Please enter a valid email address' 
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    
    // Rate limiting check
    try {
      await RateLimiter.checkRateLimit(normalizedEmail, req.ip);
    } catch (rateLimitError) {
      return res.status(429).json({ 
        error: rateLimitError.message 
      });
    }
    
    // Find existing user or determine if new user
    let user = await User.findOne({ email: normalizedEmail });
    let isNewUser = false;
    
    if (!user) {
      // New user - validate name is provided
      if (!name || !name.trim()) {
        return res.status(400).json({ 
          error: 'Name is required for new accounts',
          isNewUser: true
        });
      }
      
      // Create new user
      user = new User({
        email: normalizedEmail,
        name: name.trim(),
        emailVerified: false
      });
      
      isNewUser = true;
    }
    
    // Generate secure magic link token
    const token = crypto.randomBytes(32).toString('hex');
    user.magicLinkToken = token;
    user.magicLinkExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    
    await user.save();
    
    // Send magic link email
    try {
      await emailService.sendMagicLink(normalizedEmail, token, user.name);
      
      console.log(`📧 Magic link sent to ${normalizedEmail} (${isNewUser ? 'new' : 'existing'} user)`);
      
      res.json({
        message: 'Magic link sent! Check your email to sign in.',
        email: normalizedEmail,
        isNewUser
      });
      
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      
      // Clear the magic link token if email failed
      user.magicLinkToken = undefined;
      user.magicLinkExpires = undefined;
      await user.save();
      
      return res.status(500).json({ 
        error: 'Failed to send magic link. Please try again.' 
      });
    }
    
  } catch (error) {
    console.error('Magic link generation error:', error);
    res.status(500).json({ 
      error: 'Server error. Please try again.' 
    });
  }
});

// Verify Magic Link and Issue JWT
router.get('/verify/:token', async (req, res) => {
  try {
    const { token } = req.params;
    
    if (!token) {
      return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/auth/error?reason=missing_token`);
    }
    
    // Find user with valid magic link token
    const user = await User.findOne({
      magicLinkToken: token,
      magicLinkExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      console.log(`❌ Invalid or expired magic link token: ${token.substring(0, 8)}...`);
      return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/auth/error?reason=invalid_token`);
    }
    
    // Clear magic link token (single use)
    user.magicLinkToken = undefined;
    user.magicLinkExpires = undefined;
    user.emailVerified = true;
    user.lastLoginIP = req.ip;
    user.loginAttempts = 0;
    user.lastAttempt = undefined;
    
    await user.save();
    
    // Clear rate limiting for this user
    await RateLimiter.recordSuccessfulLogin(user.email, req.ip);
    
    // Generate JWT token (7 days expiration)
    const jwtToken = generateToken(user._id);
    
    console.log(`✅ Magic link verified for ${user.email}`);
    
    // Redirect to frontend with token
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/auth/success?token=${jwtToken}`);
    
  } catch (error) {
    console.error('Magic link verification error:', error);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/auth/error?reason=server_error`);
  }
});

// Development Test Route - Generate Magic Link URL (bypasses email)
router.post('/test-magic-link', async (req, res) => {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return res.status(404).json({ error: 'Not found' });
  }

  try {
    const { email, name } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    
    // Find or create user
    let user = await User.findOne({ email: normalizedEmail });
    let isNewUser = false;
    
    if (!user) {
      if (!name || !name.trim()) {
        return res.status(400).json({ 
          error: 'Name is required for new accounts',
          isNewUser: true
        });
      }
      
      user = new User({
        email: normalizedEmail,
        name: name.trim(),
        emailVerified: false
      });
      
      isNewUser = true;
    }
    
    // Generate secure magic link token
    const token = crypto.randomBytes(32).toString('hex');
    user.magicLinkToken = token;
    user.magicLinkExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    
    await user.save();
    
    // Return the magic link URL instead of sending email
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const magicLink = `http://localhost:5000/api/magic-auth/verify/${token}`;
    
    console.log(`🧪 Test magic link generated for ${normalizedEmail}`);
    console.log(`🔗 Magic Link: ${magicLink}`);
    
    res.json({
      message: 'Magic link generated (test mode)',
      email: normalizedEmail,
      isNewUser,
      magicLink, // Include the link for testing
      token
    });
    
  } catch (error) {
    console.error('Test magic link generation error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Check if email exists (for UX - to show name field for new users)
router.post('/check-email', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    
    res.json({
      exists: !!user,
      name: user?.name
    });
    
  } catch (error) {
    console.error('Email check error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
