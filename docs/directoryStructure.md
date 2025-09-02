# Umber Monorepo Directory Structure

```
umber/
├── README.md
├── .gitignore
├── package.json                 # Root package.json for scripts
└── .env.example                 # Environment variables template

├── umber-frontend/               # React Application
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   ├── .env.example
│   │
│   ├── public/
│   │   ├── favicon.ico
│   │   └── manifest.json
│   │
│   └── src/
│       ├── main.jsx             # App entry point
│       ├── App.jsx              # Root component
│       │
│       ├── components/          # Reusable UI components
│       │   ├── ui/              # Basic UI components
│       │   │   ├── Button.jsx
│       │   │   ├── Modal.jsx
│       │   │   ├── Input.jsx
│       │   │   ├── LoadingSpinner.jsx
│       │   │   └── ErrorMessage.jsx
│       │   │
│       │   ├── layout/          # Layout components
│       │   │   ├── DashboardLayout.jsx
│       │   │   ├── Sidebar.jsx
│       │   │   ├── TopNav.jsx
│       │   │   └── PrivateRoute.jsx
│       │   │
│       │   ├── auth/            # Authentication components
│       │   │   ├── LoginForm.jsx
│       │   │   ├── RegisterForm.jsx
│       │   │   └── AuthGuard.jsx
│       │   │
│       │   ├── onboarding/      # Onboarding flow
│       │   │   ├── OnboardingFlow.jsx
│       │   │   ├── CreateFirstUmber.jsx
│       │   │   ├── AddFirstItem.jsx
│       │   │   └── MindMapReveal.jsx
│       │   │
│       │   ├── dashboard/       # Dashboard components
│       │   │   ├── DashboardStats.jsx
│       │   │   ├── RecentActivity.jsx
│       │   │   ├── QuickActions.jsx
│       │   │   └── UmberGrid.jsx
│       │   │
│       │   ├── umbers/          # Umber management
│       │   │   ├── UmberCard.jsx
│       │   │   ├── UmberList.jsx
│       │   │   ├── CreateUmberModal.jsx
│       │   │   ├── EditUmberModal.jsx
│       │   │   ├── UmberHeader.jsx
│       │   │   └── UmberSettings.jsx
│       │   │
│       │   ├── nests/           # Nest organization
│       │   │   ├── NestTabs.jsx
│       │   │   ├── CreateNestModal.jsx
│       │   │   ├── NestSettings.jsx
│       │   │   └── NestGrid.jsx
│       │   │
│       │   ├── items/           # Item components
│       │   │   ├── ItemCard.jsx
│       │   │   ├── ItemGrid.jsx
│       │   │   ├── AddItemModal.jsx
│       │   │   ├── EditItemModal.jsx
│       │   │   ├── ItemActions.jsx
│       │   │   ├── ProductPreview.jsx
│       │   │   └── ItemDetails.jsx
│       │   │
│       │   └── mindmap/         # Mind map visualization
│       │       ├── UmberMindMap.jsx
│       │       ├── MindMapToolbar.jsx
│       │       ├── nodes/
│       │       │   ├── UmberNode.jsx
│       │       │   ├── NestNode.jsx
│       │       │   └── ItemNode.jsx
│       │       └── controls/
│       │           ├── ZoomControls.jsx
│       │           └── LayoutControls.jsx
│       │
│       ├── pages/               # Route-level components
│       │   ├── auth/
│       │   │   ├── LoginPage.jsx
│       │   │   ├── RegisterPage.jsx
│       │   │   └── OnboardingPage.jsx
│       │   │
│       │   ├── dashboard/
│       │   │   ├── DashboardPage.jsx
│       │   │   └── ProfilePage.jsx
│       │   │
│       │   ├── umbers/
│       │   │   ├── UmberListPage.jsx
│       │   │   ├── UmberDetailPage.jsx
│       │   │   └── UmberMindMapPage.jsx
│       │   │
│       │   └── error/
│       │       ├── NotFoundPage.jsx
│       │       └── ErrorBoundary.jsx
│       │
│       ├── hooks/               # Custom React hooks
│       │   ├── useAuth.js
│       │   ├── useUmber.js
│       │   ├── useItems.js
│       │   ├── useNests.js
│       │   ├── useDashboard.js
│       │   ├── useUrlScraper.js
│       │   ├── useMindMapData.js
│       │   └── useLocalStorage.js
│       │
│       ├── contexts/            # React contexts
│       │   ├── AuthContext.jsx
│       │   ├── ThemeContext.jsx
│       │   └── NotificationContext.jsx
│       │
│       ├── services/            # API service functions
│       │   ├── api.js           # Axios instance and interceptors
│       │   ├── auth.js          # Auth API calls
│       │   ├── umbers.js        # Umber API calls
│       │   ├── items.js         # Item API calls
│       │   ├── nests.js         # Nest API calls
│       │   └── dashboard.js     # Dashboard API calls
│       │
│       ├── utils/               # Utility functions
│       │   ├── mindMapTransformer.js
│       │   ├── autoLayout.js
│       │   ├── formatters.js    # Price, date formatting
│       │   ├── validators.js    # Form validation
│       │   ├── constants.js     # App constants
│       │   └── helpers.js       # General helpers
│       │
│       ├── styles/              # Global styles
│       │   ├── globals.css      # Global CSS + Tailwind
│       │   ├── mindmap.css      # Mind map specific styles
│       │   └── components.css   # Component-specific styles
│       │
│       └── assets/              # Static assets
│           ├── images/
│           │   ├── logo.svg
│           │   └── placeholders/
│           └── icons/
│               └── custom-icons.svg

└── umber-backend/                # Node.js Express API
    ├── package.json
    ├── server.js                # Entry point
    ├── .env.example
    │
    ├── src/
    │   ├── config/              # Configuration
    │   │   ├── database.js      # MongoDB connection
    │   │   ├── auth.js          # JWT configuration
    │   │   └── environment.js   # Environment variables
    │   │
    │   ├── models/              # MongoDB models
    │   │   ├── User.js
    │   │   ├── Umber.js
    │   │   ├── Nest.js
    │   │   ├── Item.js
    │   │   └── ItemNestMembership.js
    │   │
    │   ├── routes/              # API routes
    │   │   ├── index.js         # Route aggregator
    │   │   ├── auth.js          # Authentication routes
    │   │   ├── users.js         # User management
    │   │   ├── umbers.js        # Umber CRUD
    │   │   ├── nests.js         # Nest management
    │   │   ├── items.js         # Item management
    │   │   ├── mindmap.js       # Mind map data
    │   │   └── dashboard.js     # Dashboard analytics
    │   │
    │   ├── controllers/         # Route handlers
    │   │   ├── authController.js
    │   │   ├── userController.js
    │   │   ├── umberController.js
    │   │   ├── nestController.js
    │   │   ├── itemController.js
    │   │   ├── mindmapController.js
    │   │   └── dashboardController.js
    │   │
    │   ├── middleware/          # Express middleware
    │   │   ├── auth.js          # JWT verification
    │   │   ├── validation.js    # Request validation
    │   │   ├── errorHandler.js  # Global error handling
    │   │   ├── rateLimit.js     # Rate limiting
    │   │   └── cors.js          # CORS configuration
    │   │
    │   ├── services/            # Business logic
    │   │   ├── authService.js
    │   │   ├── umberService.js
    │   │   ├── itemService.js
    │   │   ├── urlScrapingService.js
    │   │   ├── mindmapService.js
    │   │   └── analyticsService.js
    │   │
    │   ├── utils/               # Utility functions
    │   │   ├── urlScraper.js    # URL scraping logic
    │   │   ├── validators.js    # Data validation
    │   │   ├── formatters.js    # Data formatting
    │   │   ├── cache.js         # Caching utilities
    │   │   └── logger.js        # Logging utility
    │   │
    │   └── tests/               # Test files
    │       ├── auth.test.js
    │       ├── umbers.test.js
    │       ├── items.test.js
    │       └── urlScraper.test.js
    │
    └── uploads/                 # File uploads (if needed)
        └── images/
```

## Root Level Configuration

### package.json (Root)
```json
{
  "name": "umber-monorepo",
  "private": true,
  "scripts": {
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "dev:frontend": "cd umber-frontend && npm run dev",
    "dev:backend": "cd umber-backend && npm run dev",
    "build": "cd umber-frontend && npm run build",
    "install:all": "npm install && cd umber-frontend && npm install && cd ../umber-backend && npm install",
    "deploy:frontend": "cd umber-frontend && npm run build && vercel --prod",
    "deploy:backend": "cd umber-backend && railway up"
  },
  "devDependencies": {
    "concurrently": "^7.6.0"
  }
}
```

### .gitignore
```
# Dependencies
node_modules/
*/node_modules/

# Environment files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
umber-frontend/dist/
umber-frontend/build/

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Database
*.sqlite
*.db

# Uploads
umber-backend/uploads/*
!umber-backend/uploads/.gitkeep
```

## Frontend Configuration Files

### umber-frontend/package.json
```json
{
  "name": "umber-frontend",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext js,jsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "react-query": "^3.39.0",
    "reactflow": "^11.10.0",
    "framer-motion": "^10.0.0",
    "axios": "^1.3.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.27",
    "@types/react-dom": "^18.0.10",
    "@vitejs/plugin-react": "^3.1.0",
    "vite": "^4.1.0",
    "eslint": "^8.34.0",
    "eslint-plugin-react": "^7.32.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.3.4",
    "tailwindcss": "^3.2.0",
    "autoprefixer": "^10.4.13",
    "postcss": "^8.4.21"
  }
}
```

### umber-frontend/vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          flow: ['reactflow'],
          motion: ['framer-motion']
        }
      }
    }
  }
})
```

## Backend Configuration Files

### umber-backend/package.json
```json
{
  "name": "umber-backend",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0",
    "cors": "^2.8.5",
    "helmet": "^6.0.1",
    "express-rate-limit": "^6.7.0",
    "express-validator": "^6.14.3",
    "@microlink/mql": "^0.10.0",
    "dotenv": "^16.0.3"
  },
  "devDependencies": {
    "nodemon": "^2.0.20",
    "jest": "^29.4.3",
    "supertest": "^6.3.3"
  }
}
```

### umber-backend/server.js
```javascript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import { connectDatabase } from './src/config/database.js';
import { errorHandler } from './src/middleware/errorHandler.js';
import routes from './src/routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDatabase();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
```

## Environment Files

### .env.example (Root)
```env
# Development
NODE_ENV=development

# Frontend
FRONTEND_URL=http://localhost:3000

# Backend  
BACKEND_URL=http://localhost:5000
```

### umber-frontend/.env.example
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Umber
VITE_APP_VERSION=0.1.0
```

### umber-backend/.env.example
```env
# Server
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/umber-dev
MONGODB_TEST_URI=mongodb://localhost:27017/umber-test

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=30d

# URL Scraping
MICROLINK_API_KEY=optional-for-higher-limits
SCRAPING_TIMEOUT=10000

# File Uploads
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# Logging
LOG_LEVEL=debug
```

This structure provides:
- Clean separation between frontend and backend
- Logical grouping of components by feature
- Scalable organization that can grow with the app
- Proper configuration for both development and production
- Clear paths for testing and deployment