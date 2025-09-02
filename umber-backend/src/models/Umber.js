import mongoose from 'mongoose';

const umberSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  name: {
    type: String,
    required: [true, 'Umber name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  theme: {
    type: String,
    enum: ['sanctuary', 'wanderlust', 'minimalist', 'industrial'],
    default: 'sanctuary'
  },
  color: {
    type: String,
    default: '#535147' // Default umber color
  },
  icon: {
    type: String,
    default: '🌳' // Default tree emoji
  },
  privacy: {
    type: String,
    enum: ['private', 'friends', 'public'],
    default: 'private'
  },
  budgetTarget: {
    type: Number, // in cents
    min: 0,
    default: null
  },
  // Denormalized fields for performance
  itemCount: {
    type: Number,
    default: 0,
    min: 0
  },
  totalValue: {
    type: Number, // sum of all item prices in cents
    default: 0,
    min: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
umberSchema.index({ userId: 1 });
umberSchema.index({ userId: 1, createdAt: -1 });
umberSchema.index({ userId: 1, name: 1 });

// Virtual for nests
umberSchema.virtual('nests', {
  ref: 'Nest',
  localField: '_id',
  foreignField: 'umberId'
});

// Virtual for items
umberSchema.virtual('items', {
  ref: 'Item',
  localField: '_id',
  foreignField: 'umberId'
});

// Virtual for formatted total value
umberSchema.virtual('totalValueFormatted').get(function() {
  return (this.totalValue / 100).toFixed(2);
});

// Virtual for budget progress
umberSchema.virtual('budgetProgress').get(function() {
  if (!this.budgetTarget) return null;
  return Math.min((this.totalValue / this.budgetTarget) * 100, 100);
});

// Instance method to update counts
umberSchema.methods.updateCounts = async function() {
  const Item = mongoose.model('Item');
  
  const items = await Item.find({ umberId: this._id, isActive: true });
  
  this.itemCount = items.length;
  this.totalValue = items.reduce((sum, item) => sum + (item.price || 0), 0);
  
  return this.save();
};

// Static method to get user's umbers with pagination
umberSchema.statics.getUserUmbers = function(userId, options = {}) {
  const { page = 1, limit = 10, sort = '-createdAt' } = options;
  const skip = (page - 1) * limit;
  
  return this.find({ userId, isActive: true })
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate('nests')
    .populate('items');
};

// Pre-remove middleware to clean up related data
umberSchema.pre('remove', async function(next) {
  try {
    const Nest = mongoose.model('Nest');
    const Item = mongoose.model('Item');
    
    // Remove all nests in this umber
    await Nest.deleteMany({ umberId: this._id });
    
    // Remove all items in this umber
    await Item.deleteMany({ umberId: this._id });
    
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model('Umber', umberSchema);
