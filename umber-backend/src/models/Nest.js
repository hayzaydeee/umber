const mongoose = require('mongoose');

const nestSchema = new mongoose.Schema({
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
    default: '📁',
    maxlength: 10
  },
  color: { 
    type: String, 
    default: '#A0A0A0',
    match: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  },
  
  // Relationships
  umberId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Umber', 
    required: true 
  },
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
    x: { type: Number, default: 200 },
    y: { type: Number, default: 200 }
  },
  
  // Organization
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  sortOrder: { type: Number, default: 0 },
  
  // Stats
  totalItems: { type: Number, default: 0 },
  totalValue: { type: Number, default: 0 },
  
  // Metadata
  tags: [{ type: String, trim: true }],
  purpose: { type: String, trim: true }, // Why this nest exists
  
  // Soft delete
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date }
}, { 
  timestamps: true 
});

// Indexes
nestSchema.index({ umberId: 1, isDeleted: 1 });
nestSchema.index({ userId: 1, isDeleted: 1 });
nestSchema.index({ name: 'text', description: 'text' });
nestSchema.index({ priority: 1 });

// Virtual for items
nestSchema.virtual('items', {
  ref: 'Item',
  localField: '_id',
  foreignField: 'nestId'
});

// Populate items when querying
nestSchema.pre(/^find/, function() {
  this.populate({
    path: 'items',
    match: { isDeleted: { $ne: true } }
  });
});

// Update stats when items change
nestSchema.methods.updateStats = async function() {
  const Item = mongoose.model('Item');
  
  const items = await Item.find({ nestId: this._id, isDeleted: { $ne: true } });
  
  this.totalItems = items.length;
  this.totalValue = items.reduce((sum, item) => sum + (item.price || 0), 0);
  
  await this.save();
  
  // Update parent umber stats
  const Umber = mongoose.model('Umber');
  const umber = await Umber.findById(this.umberId);
  if (umber) {
    await umber.updateStats();
  }
  
  return this;
};

// Soft delete method
nestSchema.methods.softDelete = function() {
  this.isDeleted = true;
  this.deletedAt = new Date();
  return this.save();
};

module.exports = mongoose.model('Nest', nestSchema);
