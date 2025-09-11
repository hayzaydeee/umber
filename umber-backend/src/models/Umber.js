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
    match: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
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