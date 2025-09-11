const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 200
  },
  description: { 
    type: String,
    trim: true,
    maxlength: 1000
  },
  
  // Product details
  price: { 
    type: Number,
    min: 0
  },
  currency: { 
    type: String, 
    default: 'USD',
    maxlength: 3
  },
  originalPrice: { type: Number }, // For tracking discounts
  
  // URLs and sources
  url: { 
    type: String,
    trim: true
  },
  sourceUrl: { type: String }, // Original scraped URL
  purchaseUrl: { type: String }, // Where to buy
  
  // Media
  images: [{
    url: { type: String, required: true },
    alt: { type: String },
    isPrimary: { type: Boolean, default: false }
  }],
  
  // Relationships
  nestId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Nest', 
    required: true 
  },
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
    x: { type: Number, default: 100 },
    y: { type: Number, default: 100 }
  },
  
  // Organization
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['wanted', 'considering', 'decided', 'purchased', 'gifted'],
    default: 'wanted'
  },
  
  // Metadata
  brand: { type: String, trim: true },
  model: { type: String, trim: true },
  category: { type: String, trim: true },
  tags: [{ type: String, trim: true }],
  
  // Scraping metadata
  scrapedData: {
    scrapedAt: { type: Date },
    source: { type: String }, // 'amazon', 'shopify', etc.
    confidence: { type: Number, min: 0, max: 1 }, // How confident we are in the data
    originalData: { type: mongoose.Schema.Types.Mixed } // Raw scraped data
  },
  
  // User reflection (contemplative aspect)
  reflection: {
    whyWanted: { type: String, trim: true },
    whenNeeded: { type: String, trim: true },
    howWillItServe: { type: String, trim: true },
    alternatives: { type: String, trim: true }
  },
  
  // Tracking
  dateWanted: { type: Date, default: Date.now },
  datePurchased: { type: Date },
  purchasePrice: { type: Number },
  
  // Price tracking
  priceHistory: [{
    price: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    source: { type: String },
    checkedAt: { type: Date, default: Date.now }
  }],
  
  // Availability
  inStock: { type: Boolean, default: true },
  lastStockCheck: { type: Date },
  
  // Reviews and ratings
  rating: { type: Number, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  
  // Soft delete
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date }
}, { 
  timestamps: true 
});

// Indexes
itemSchema.index({ nestId: 1, isDeleted: 1 });
itemSchema.index({ umberId: 1, isDeleted: 1 });
itemSchema.index({ userId: 1, isDeleted: 1 });
itemSchema.index({ name: 'text', description: 'text', brand: 'text' });
itemSchema.index({ price: 1 });
itemSchema.index({ priority: 1, status: 1 });
itemSchema.index({ category: 1 });
itemSchema.index({ tags: 1 });

// Virtual for primary image
itemSchema.virtual('primaryImage').get(function() {
  const primaryImg = this.images.find(img => img.isPrimary);
  return primaryImg || this.images[0] || null;
});

// Method to add price to history
itemSchema.methods.addPriceHistory = function(price, currency = 'USD', source = 'manual') {
  this.priceHistory.push({
    price,
    currency,
    source,
    checkedAt: new Date()
  });
  
  // Keep only last 50 price points
  if (this.priceHistory.length > 50) {
    this.priceHistory = this.priceHistory.slice(-50);
  }
  
  return this.save();
};

// Method to update nest and umber stats after changes
itemSchema.methods.updateParentStats = async function() {
  const Nest = mongoose.model('Nest');
  const nest = await Nest.findById(this.nestId);
  if (nest) {
    await nest.updateStats();
  }
};

// Update parent stats after save
itemSchema.post('save', function() {
  this.updateParentStats();
});

// Update parent stats after delete
itemSchema.post('findOneAndDelete', function(doc) {
  if (doc) {
    doc.updateParentStats();
  }
});

// Soft delete method
itemSchema.methods.softDelete = function() {
  this.isDeleted = true;
  this.deletedAt = new Date();
  return this.save();
};

module.exports = mongoose.model('Item', itemSchema);
