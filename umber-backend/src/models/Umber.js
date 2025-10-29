const mongoose = require('mongoose');

const umberSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 100
  },
  description: { 
    type: String,
    trim: true,
    maxlength: 500
  },
  icon: { 
    type: String, 
    default: '📋',
    maxlength: 10
  },
  color: { 
    type: String, 
    default: '#8B5A2B',
    validate: {
      validator: function(v) {
        // Accept hex codes
        if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v)) {
          return true;
        }
        // Accept theme color names
        const themeColors = [
          'umber', 'moss', 'ochre', 'sage', 'earth', 'clay', 'forest', 'stone'
        ];
        return themeColors.includes(v.toLowerCase());
      },
      message: 'Color must be a valid hex code (e.g., #8B5A2B) or theme name (umber, moss, ochre, sage, earth, clay, forest, stone)'
    }
  },
  theme: {
    type: String,
    default: 'umber',
    enum: ['umber', 'moss', 'ochre', 'custom']
  },
  
  // Ownership
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  
  // Onboarding tracking
  isOnboardingEntity: { 
    type: Boolean, 
    default: false 
  },
  onboardingSessionId: { type: String },
  
  // Mind map positioning
  mindMapPosition: {
    x: { type: Number, default: 400 },
    y: { type: Number, default: 300 }
  },
  
  // Privacy settings
  privacy: {
    type: String,
    default: 'private',
    enum: ['private', 'friends', 'public']
  },
  
  // Sharing
  sharedWith: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    permission: { type: String, enum: ['view', 'edit'], default: 'view' },
    sharedAt: { type: Date, default: Date.now }
  }],
  
  // Stats
  totalItems: { type: Number, default: 0 },
  totalValue: { type: Number, default: 0 },
  
  // Metadata
  tags: [{ type: String, trim: true }],
  category: { type: String, trim: true },
  
  // Soft delete
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date }
}, { 
  timestamps: true 
});

// Indexes for performance
umberSchema.index({ userId: 1, isDeleted: 1 });
umberSchema.index({ name: 'text', description: 'text' });
umberSchema.index({ tags: 1 });
umberSchema.index({ category: 1 });

// Pre-save hook to convert theme color names to hex codes
umberSchema.pre('save', function(next) {
  if (this.isModified('color')) {
    const colorMap = {
      'umber': '#8B5A2B',
      'moss': '#6B7D67',
      'ochre': '#B8915F',
      'sage': '#A8B8A4',
      'earth': '#7A5D36',
      'clay': '#CDA47D',
      'forest': '#485449',
      'stone': '#C8BCA8'
    };
    
    const colorKey = this.color.toLowerCase();
    if (colorMap[colorKey]) {
      this.color = colorMap[colorKey];
    }
  }
  next();
});

// Virtual for nested relationships
umberSchema.virtual('nests', {
  ref: 'Nest',
  localField: '_id',
  foreignField: 'umberId'
});

// Populate nests by default when querying
umberSchema.pre(/^find/, function() {
  this.populate({
    path: 'nests',
    match: { isDeleted: { $ne: true } }
  });
});

// Update stats when nests/items change
umberSchema.methods.updateStats = async function() {
  const Nest = mongoose.model('Nest');
  const Item = mongoose.model('Item');
  
  // Get all nests for this umber
  const nests = await Nest.find({ umberId: this._id, isDeleted: { $ne: true } });
  const nestIds = nests.map(nest => nest._id);
  
  // Get all items in these nests
  const items = await Item.find({ nestId: { $in: nestIds }, isDeleted: { $ne: true } });
  
  this.totalItems = items.length;
  this.totalValue = items.reduce((sum, item) => sum + (item.price || 0), 0);
  
  return this.save();
};

// Soft delete method
umberSchema.methods.softDelete = function() {
  this.isDeleted = true;
  this.deletedAt = new Date();
  return this.save();
};

module.exports = mongoose.model('Umber', umberSchema);