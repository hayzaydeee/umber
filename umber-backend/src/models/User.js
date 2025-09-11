const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: false, // Making optional for migration period
    minlength: 6
  },
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  
  // Magic Link Authentication fields
  emailVerified: { 
    type: Boolean, 
    default: false 
  },
  magicLinkToken: { 
    type: String 
  },
  magicLinkExpires: { 
    type: Date 
  },
  lastLoginIP: { 
    type: String 
  },
  loginAttempts: { 
    type: Number, 
    default: 0 
  },
  lastAttempt: { 
    type: Date 
  },
  
  // Onboarding tracking
  onboardingCompleted: { 
    type: Boolean, 
    default: false 
  },
  onboardingStage: { 
    type: String, 
    default: 'not_started',
    enum: [
      'not_started', 'welcome', 'umberCreationIntro', 'umberCreationForm', 
      'umberCreationSuccess', 'nestCreationIntro', 'nestCreationForm', 
      'nestCreationSuccess', 'itemCreationIntro', 'itemCreationForm', 
      'itemCreationSuccess', 'toolsIntro', 'completion', 'finished'
    ]
  },
  onboardingSessionId: { type: String },
  onboardingStartTime: { type: Date },
  onboardingCompletionTime: { type: Date },
  
  // Profile info
  avatar: { type: String },
  preferences: {
    theme: { type: String, default: 'umber', enum: ['umber', 'moss', 'ochre'] },
    notifications: { type: Boolean, default: true },
    privacy: { 
      type: String, 
      default: 'private', 
      enum: ['private', 'friends', 'public'] 
    }
  }
}, { 
  timestamps: true,
  toJSON: { 
    transform: function(doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Update onboarding progress
userSchema.methods.updateOnboardingProgress = function(stage, sessionId = null) {
  this.onboardingStage = stage;
  if (sessionId) this.onboardingSessionId = sessionId;
  if (stage === 'welcome' && !this.onboardingStartTime) {
    this.onboardingStartTime = new Date();
  }
  if (stage === 'finished') {
    this.onboardingCompleted = true;
    this.onboardingCompletionTime = new Date();
  }
  return this.save();
};

module.exports = mongoose.model('User', userSchema);