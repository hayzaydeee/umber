# Umber Database Schema (MongoDB)

## Collections Overview
- **users** - User accounts and authentication
- **umbers** - Main collection containers
- **nests** - Sub-containers within umbers
- **items** - Individual wishlist items
- **item_nest_memberships** - Many-to-many relationship between items and nests

---

## Users Collection
```javascript
{
  _id: ObjectId,
  email: String, // required, unique
  name: String, // required
  password: String, // hashed
  createdAt: Date,
  updatedAt: Date,
  
  // Optional profile fields
  avatar: String, // URL
  preferences: {
    defaultTheme: String, // "sanctuary", "minimalist", etc.
    defaultPrivacy: String // "private", "friends", "public"
  }
}
```

## Umbers Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId, // required, ref to users
  name: String, // required, "Tech Dreams", "Home Wishlist"
  description: String, // optional
  theme: String, // "sanctuary", "wanderlust", "minimalist", etc.
  
  // Visual/Organization
  color: String, // hex color for mind map
  icon: String, // emoji or icon identifier
  
  // Settings
  privacy: String, // "private", "friends", "public"
  budgetTarget: Number, // optional, in cents
  
  // Metadata
  createdAt: Date,
  updatedAt: Date,
  itemCount: Number, // denormalized for performance
  totalValue: Number // sum of all item prices, in cents
}
```

## Nests Collection
```javascript
{
  _id: ObjectId,
  umberId: ObjectId, // required, ref to umbers
  name: String, // required, "Living Room", "Office", "Unnested"
  description: String, // optional
  
  // Settings
  isExclusive: Boolean, // default false, whether items can be in multiple nests
  isDefault: Boolean, // true for "Unnested" nest
  
  // Visual positioning for mind map
  position: {
    x: Number,
    y: Number
  },
  
  // Metadata
  createdAt: Date,
  updatedAt: Date,
  itemCount: Number // denormalized
}
```

## Items Collection
```javascript
{
  _id: ObjectId,
  umberId: ObjectId, // required, ref to umbers
  userId: ObjectId, // required, ref to users (for security)
  
  // Core item data
  title: String, // required
  url: String, // original URL
  price: Number, // in cents, optional
  currency: String, // "USD", "EUR", etc.
  image: String, // scraped or uploaded image URL
  
  // Scraped metadata
  brand: String,
  description: String,
  availability: String, // "in stock", "out of stock", etc.
  
  // User reflection
  whyIWantThis: String, // the contemplative prompt response
  priority: String, // "high", "medium", "low"
  
  // Status tracking
  status: String, // "wanting", "cooling-off", "ready", "purchased", "passed"
  purchasedAt: Date, // when they bought it
  addedAt: Date, // when they added to umber
  
  // Visual positioning for mind map
  position: {
    x: Number,
    y: Number
  },
  
  // Metadata
  createdAt: Date,
  updatedAt: Date,
  lastScrapedAt: Date // for price/availability updates
}
```

## Item_Nest_Memberships Collection
```javascript
{
  _id: ObjectId,
  itemId: ObjectId, // required, ref to items
  nestId: ObjectId, // required, ref to nests
  
  // Relationship metadata
  addedAt: Date,
  addedBy: ObjectId, // ref to users
  
  // Visual connection data for mind map
  connectionStyle: String, // "solid", "dashed", etc.
}
```

---

## Indexes for Performance

```javascript
// Users
db.users.createIndex({ "email": 1 }, { unique: true })

// Umbers
db.umbers.createIndex({ "userId": 1 })
db.umbers.createIndex({ "userId": 1, "createdAt": -1 })

// Nests
db.nests.createIndex({ "umberId": 1 })

// Items
db.items.createIndex({ "umberId": 1 })
db.items.createIndex({ "userId": 1 })
db.items.createIndex({ "umberId": 1, "createdAt": -1 })
db.items.createIndex({ "url": 1 }) // for duplicate detection

// Item_Nest_Memberships
db.item_nest_memberships.createIndex({ "itemId": 1 })
db.item_nest_memberships.createIndex({ "nestId": 1 })
db.item_nest_memberships.createIndex({ "itemId": 1, "nestId": 1 }, { unique: true })
```

---

## Key Design Decisions

1. **Denormalized Counts**: `itemCount` and `totalValue` stored directly on umbers/nests for fast dashboard loading
2. **Position Storage**: X/Y coordinates stored for mind map persistence
3. **Flexible Relationships**: Items always belong to umbers, optionally to nests via membership table
4. **Status Tracking**: Items can progress through wanting → cooling-off → ready → purchased
5. **Metadata Preservation**: Original URLs and scraped data kept for re-scraping and updates