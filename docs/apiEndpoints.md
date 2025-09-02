# Umber API Endpoints

## Authentication Routes

### POST `/api/auth/register`
**Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123"
}
```
**Response:** User object + JWT token

### POST `/api/auth/login`
**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
**Response:** User object + JWT token

### POST `/api/auth/logout`
**Headers:** Authorization Bearer token
**Response:** Success message

### GET `/api/auth/me`
**Headers:** Authorization Bearer token
**Response:** Current user object

---

## User Routes

### GET `/api/users/profile`
**Headers:** Authorization Bearer token
**Response:** User profile with preferences

### PUT `/api/users/profile`
**Headers:** Authorization Bearer token
**Body:**
```json
{
  "name": "Updated Name",
  "avatar": "https://example.com/avatar.jpg",
  "preferences": {
    "defaultTheme": "sanctuary",
    "defaultPrivacy": "private"
  }
}
```

---

## Umber Routes

### GET `/api/umbers`
**Headers:** Authorization Bearer token
**Query:** `?page=1&limit=10&sort=createdAt`
**Response:**
```json
{
  "umbers": [
    {
      "_id": "...",
      "name": "Tech Dreams",
      "theme": "sanctuary",
      "itemCount": 5,
      "totalValue": 299900,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ],
  "total": 3,
  "page": 1,
  "pages": 1
}
```

### GET `/api/umbers/:id`
**Headers:** Authorization Bearer token
**Response:** Full umber with nests and items
```json
{
  "_id": "...",
  "name": "Tech Dreams",
  "description": "Gadgets I want",
  "theme": "sanctuary",
  "budgetTarget": 500000,
  "nests": [
    {
      "_id": "...",
      "name": "Unnested",
      "isDefault": true,
      "items": [...]
    },
    {
      "_id": "...",
      "name": "Office Setup",
      "isExclusive": false,
      "items": [...]
    }
  ],
  "totalValue": 299900,
  "itemCount": 5
}
```

### POST `/api/umbers`
**Headers:** Authorization Bearer token
**Body:**
```json
{
  "name": "Home Wishlist",
  "description": "Things for the house",
  "theme": "minimalist",
  "budgetTarget": 200000,
  "privacy": "private"
}
```
**Response:** Created umber object (auto-creates "Unnested" nest)

### PUT `/api/umbers/:id`
**Headers:** Authorization Bearer token
**Body:** Same as POST (partial updates allowed)

### DELETE `/api/umbers/:id`
**Headers:** Authorization Bearer token
**Response:** Success message

---

## Nest Routes

### GET `/api/umbers/:umberId/nests`
**Headers:** Authorization Bearer token
**Response:** Array of nests for the umber

### POST `/api/umbers/:umberId/nests`
**Headers:** Authorization Bearer token
**Body:**
```json
{
  "name": "Living Room",
  "description": "Cozy vibes",
  "isExclusive": false,
  "position": { "x": 100, "y": 200 }
}
```

### PUT `/api/nests/:id`
**Headers:** Authorization Bearer token
**Body:** Nest update data

### DELETE `/api/nests/:id`
**Headers:** Authorization Bearer token
**Response:** Success (moves items to "Unnested")

---

## Item Routes

### GET `/api/umbers/:umberId/items`
**Headers:** Authorization Bearer token
**Query:** `?nestId=optional&status=wanting&page=1&limit=20`
**Response:** Paginated items

### POST `/api/umbers/:umberId/items`
**Headers:** Authorization Bearer token
**Body:**
```json
{
  "url": "https://amazon.com/product-link",
  "whyIWantThis": "Because it would help with work",
  "priority": "medium"
}
```
**Response:** Created item (after URL scraping)

### POST `/api/items/scrape`
**Headers:** Authorization Bearer token
**Body:**
```json
{
  "url": "https://amazon.com/product-link"
}
```
**Response:**
```json
{
  "title": "MacBook Pro 16-inch",
  "price": 249900,
  "currency": "USD",
  "image": "https://...",
  "brand": "Apple",
  "description": "...",
  "availability": "in stock"
}
```

### PUT `/api/items/:id`
**Headers:** Authorization Bearer token
**Body:**
```json
{
  "whyIWantThis": "Updated reflection",
  "priority": "high",
  "status": "ready",
  "position": { "x": 150, "y": 250 }
}
```

### DELETE `/api/items/:id`
**Headers:** Authorization Bearer token
**Response:** Success

### POST `/api/items/:id/purchase`
**Headers:** Authorization Bearer token
**Body:**
```json
{
  "purchasedAt": "2024-01-15T10:30:00Z",
  "actualPrice": 229900
}
```

---

## Item-Nest Relationship Routes

### POST `/api/items/:itemId/nests`
**Headers:** Authorization Bearer token
**Body:**
```json
{
  "nestIds": ["nest1", "nest2"]
}
```
**Response:** Updated relationships

### DELETE `/api/items/:itemId/nests/:nestId`
**Headers:** Authorization Bearer token
**Response:** Success

### GET `/api/nests/:nestId/items`
**Headers:** Authorization Bearer token
**Response:** Items in this nest

---

## Mind Map Routes

### GET `/api/umbers/:id/mindmap`
**Headers:** Authorization Bearer token
**Response:**
```json
{
  "nodes": [
    {
      "id": "nest_123",
      "type": "nest",
      "data": { "name": "Office", "itemCount": 3 },
      "position": { "x": 100, "y": 100 }
    },
    {
      "id": "item_456",
      "type": "item",
      "data": { "title": "MacBook Pro", "price": 249900, "image": "..." },
      "position": { "x": 200, "y": 150 }
    }
  ],
  "edges": [
    {
      "id": "edge_1",
      "source": "nest_123",
      "target": "item_456",
      "type": "default"
    }
  ]
}
```

### PUT `/api/umbers/:id/mindmap/positions`
**Headers:** Authorization Bearer token
**Body:**
```json
{
  "updates": [
    {
      "id": "nest_123",
      "type": "nest",
      "position": { "x": 150, "y": 120 }
    },
    {
      "id": "item_456", 
      "type": "item",
      "position": { "x": 250, "y": 180 }
    }
  ]
}
```

---

## Dashboard/Analytics Routes

### GET `/api/dashboard`
**Headers:** Authorization Bearer token
**Response:**
```json
{
  "totalUmbers": 3,
  "totalItems": 25,
  "totalValue": 1299900,
  "recentActivity": [...],
  "topUmbers": [
    {
      "_id": "...",
      "name": "Tech Dreams",
      "itemCount": 8,
      "totalValue": 599900
    }
  ]
}
```

### GET `/api/umbers/:id/analytics`
**Headers:** Authorization Bearer token
**Response:**
```json
{
  "itemsByStatus": {
    "wanting": 5,
    "cooling-off": 2,
    "ready": 1,
    "purchased": 3
  },
  "averageItemPrice": 12500,
  "priceDistribution": [...],
  "timeToDecision": "5.2 days"
}
```

---

## Error Response Format
```json
{
  "error": true,
  "message": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

---

## Authentication Notes
- All routes except `/api/auth/register` and `/api/auth/login` require JWT token
- Token should be passed as `Authorization: Bearer <token>`
- Tokens expire after 30 days
- Users can only access their own data (enforced by userId filtering)