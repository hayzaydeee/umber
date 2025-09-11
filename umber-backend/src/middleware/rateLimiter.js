const User = require('../models/User');

// In-memory rate limiting (for production, use Redis)
const rateLimitStore = new Map();

const RATE_LIMIT = {
  MAX_ATTEMPTS: 3,
  WINDOW_MS: 60 * 60 * 1000, // 1 hour
  PROGRESSIVE_DELAY: [0, 30000, 120000] // 0s, 30s, 2min delays
};

class RateLimiter {
  static getKey(email, ip) {
    return `${email}:${ip}`;
  }

  static async checkRateLimit(email, ip) {
    const key = this.getKey(email, ip);
    const now = Date.now();
    
    // Get current attempts
    let attempts = rateLimitStore.get(key) || { count: 0, lastAttempt: 0, resetTime: now + RATE_LIMIT.WINDOW_MS };
    
    // Reset if window expired
    if (now > attempts.resetTime) {
      attempts = { count: 0, lastAttempt: 0, resetTime: now + RATE_LIMIT.WINDOW_MS };
    }
    
    // Check if too many attempts
    if (attempts.count >= RATE_LIMIT.MAX_ATTEMPTS) {
      const timeLeft = Math.ceil((attempts.resetTime - now) / 1000 / 60); // minutes
      throw new Error(`Too many magic link requests. Please try again in ${timeLeft} minutes.`);
    }
    
    // Check progressive delay
    if (attempts.count > 0) {
      const timeSinceLastAttempt = now - attempts.lastAttempt;
      const requiredDelay = RATE_LIMIT.PROGRESSIVE_DELAY[attempts.count - 1] || 0;
      
      if (timeSinceLastAttempt < requiredDelay) {
        const waitTime = Math.ceil((requiredDelay - timeSinceLastAttempt) / 1000);
        throw new Error(`Please wait ${waitTime} seconds before requesting another magic link.`);
      }
    }
    
    // Update attempts
    attempts.count++;
    attempts.lastAttempt = now;
    rateLimitStore.set(key, attempts);
    
    return true;
  }

  static async recordSuccessfulLogin(email, ip) {
    const key = this.getKey(email, ip);
    // Clear rate limit on successful login
    rateLimitStore.delete(key);
  }
}

module.exports = RateLimiter;
