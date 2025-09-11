# Umber Backend

Backend API server for Umber - A contemplative commerce platform that helps users organize and reflect on their possessions through mind mapping and thoughtful curation.

## Features

- **User Authentication** - JWT-based authentication with bcrypt password hashing
- **Collection Management** - Create and organize Umbers (main collections) and Nests (sub-collections)
- **Item Tracking** - Add items with rich metadata, price tracking, and reflection prompts
- **URL Scraping** - Automatically extract product information from URLs
- **Mind Map Positioning** - Store spatial coordinates for visual mind mapping
- **Onboarding Flow** - Track user progress through guided onboarding
- **Dashboard Analytics** - Comprehensive statistics and activity feeds
- **Search Functionality** - Full-text search across all user content

## Tech Stack

- **Runtime**: Node.js 16+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcryptjs
- **Security**: Helmet, CORS, rate limiting
- **Scraping**: Cheerio and Axios for URL parsing
- **Development**: Nodemon, ESLint, Prettier

## Project Structure

```
umber-backend/
├── server.js                 # Main application entry point
├── src/
│   ├── config/
│   │   └── database.js       # MongoDB connection setup
│   ├── controllers/
│   │   └── authController.js # Authentication logic
│   ├── middleware/
│   │   ├── auth.js          # JWT authentication middleware
│   │   └── errorHandler.js  # Global error handling
│   ├── models/
│   │   ├── User.js          # User schema with onboarding tracking
│   │   ├── Umber.js         # Main collection schema
│   │   ├── Nest.js          # Sub-collection schema
│   │   └── Item.js          # Individual item schema
│   ├── routes/
│   │   ├── auth.js          # Authentication endpoints
│   │   ├── umbers.js        # Umber CRUD operations
│   │   ├── nests.js         # Nest CRUD operations
│   │   ├── items.js         # Item CRUD operations
│   │   ├── users.js         # User profile management
│   │   └── dashboard.js     # Analytics and dashboard data
│   ├── services/
│   │   └── urlScrapingService.js # URL content extraction
│   └── utils/               # Utility functions
├── uploads/                 # File upload storage
├── .env                     # Environment variables
└── test-api.js             # API testing script
```

## Installation

1. **Clone the repository**
   ```bash
   cd umber-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - Default connection: `mongodb://localhost:27017/umber-dev`

5. **Run the development server**
   ```bash
   npm run dev
   ```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/umber-dev` |
| `JWT_SECRET` | JWT signing secret | `your-super-secret-jwt-key` |
| `JWT_EXPIRES_IN` | JWT expiration time | `7d` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:3000` |

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get current user profile
- `PATCH /api/auth/onboarding` - Update onboarding progress

### Umbers (Main Collections)
- `GET /api/umbers` - Get all user's umbers
- `POST /api/umbers` - Create new umber
- `GET /api/umbers/:id` - Get specific umber
- `PATCH /api/umbers/:id` - Update umber
- `DELETE /api/umbers/:id` - Delete umber (soft delete)
- `GET /api/umbers/search/:query` - Search umbers

### Nests (Sub-Collections)
- `GET /api/nests/umber/:umberId` - Get nests for an umber
- `POST /api/nests` - Create new nest
- `GET /api/nests/:id` - Get specific nest
- `PATCH /api/nests/:id` - Update nest
- `DELETE /api/nests/:id` - Delete nest

### Items
- `GET /api/items/nest/:nestId` - Get items for a nest
- `GET /api/items/umber/:umberId` - Get items for an umber
- `POST /api/items` - Create new item
- `POST /api/items/from-url` - Create item from URL (with scraping)
- `GET /api/items/:id` - Get specific item
- `PATCH /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item
- `GET /api/items/:id/price-history` - Get item price history

### Dashboard
- `GET /api/dashboard/overview` - Dashboard statistics
- `GET /api/dashboard/umbers` - Umbers with stats
- `GET /api/dashboard/mindmap` - Mind map data
- `GET /api/dashboard/activity` - Activity feed
- `GET /api/dashboard/search/:query` - Global search

### Users
- `GET /api/users/profile` - Get user profile
- `PATCH /api/users/profile` - Update user profile
- `GET /api/users/stats` - Get user statistics
- `DELETE /api/users/account` - Delete user account

## Data Models

### User
- Authentication details (email, password)
- Profile information (firstName, lastName)
- Onboarding progress tracking
- User preferences

### Umber (Main Collection)
- Name, description, icon, color, theme
- Mind map positioning coordinates
- Total items and value statistics
- Soft delete functionality

### Nest (Sub-Collection)
- Belongs to an Umber
- Can have parent-child relationships
- Automatic statistics calculation
- Item organization

### Item
- Rich product metadata (name, description, price, brand, etc.)
- Price history tracking
- URL and scraped data storage
- Reflection prompts and user reflections
- Image storage capabilities

## Testing

### Run API Tests
```bash
npm test
```

### Test URL Scraping
```bash
npm run test:scraping
```

### Manual Testing
1. Start the server: `npm run dev`
2. Use the test script: `npm test`
3. Use Postman or similar tool with the API endpoints

## URL Scraping

The URL scraping service can extract product information from e-commerce websites:

- **Supported Data**: Title, description, price, currency, images, brand, availability
- **Fallback Handling**: Graceful degradation when scraping fails
- **Metadata Support**: Open Graph and product schema detection
- **Rate Limiting**: Built-in delays to respect website policies

Example usage:
```javascript
const UrlScrapingService = require('./src/services/urlScrapingService');
const service = new UrlScrapingService();
const result = await service.scrapeUrl('https://example.com/product');
```

## Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcryptjs with salt rounds
- **CORS Protection** - Configurable cross-origin resource sharing
- **Rate Limiting** - API request throttling
- **Helmet Security** - Security headers and protection
- **Input Validation** - Request data sanitization
- **Soft Deletes** - Data preservation for recovery

## Development

### Code Style
- Use Prettier for formatting: `npm run format`
- Follow ESLint rules: `npm run lint`
- Use CommonJS modules (require/module.exports)

### Database Migrations
- Models automatically create indexes
- Use Mongoose schema versioning for changes
- Soft delete preserves data integrity

### Error Handling
- Centralized error middleware
- Structured error responses
- Development vs production error details

## Production Deployment

1. Set `NODE_ENV=production`
2. Use strong JWT secret
3. Configure MongoDB Atlas or production database
4. Enable HTTPS
5. Set up process management (PM2)
6. Configure reverse proxy (Nginx)
7. Enable logging and monitoring

## Contributing

1. Fork the repository
2. Create feature branch
3. Write tests for new features
4. Follow code style guidelines
5. Submit pull request

## License

MIT License - see LICENSE file for details
