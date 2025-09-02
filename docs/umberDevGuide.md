# Umber AI Coding Guide
*Complete reference for AI assistants working on Umber codebase*

## Project Overview

**Umber** is a contemplative commerce platform - a mindful wishlist app that helps users curate meaningful collections and transform want into wisdom. Think Pinterest meets wishlist with intentional design.

**Core Features:**
- **Umbers** - Main collections (like "Tech Dreams", "Home Wishlist")
- **Nests** - Sub-containers within Umbers (like "Office", "Living Room", + default "Unnested")
- **Items** - Individual wishlist items scraped from URLs
- **Mind Maps** - Visual React Flow representation of Umbers/Nests/Items
- **Reflection Prompts** - "Why do I want this?" for mindful curation

**Key Differentiator:** Mind map visualization + contemplative approach to shopping

---

## Tech Stack & Architecture

### Frontend (umber-frontend/)
```javascript
// Core Stack
React 18 + Vite + Tailwind CSS + Framer Motion
React Router DOM + React Query + Axios
React Flow (for mind maps)

// Key Libraries
import { useQuery, useMutation } from 'react-query';
import { motion } from 'framer-motion';
import ReactFlow, { useNodesState, useEdgesState } from 'reactflow';
```

### Backend (umber-backend/)
```javascript
// Core Stack  
Node.js + Express + MongoDB + Mongoose
JWT Authentication + Microlink API (URL scraping)

// Key Libraries
import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import mql from '@microlink/mql';
```

---

## Code Patterns & Conventions

### 1. React Component Patterns

**Component Structure:**
```javascript
// components/items/ItemCard.jsx
import { motion } from 'framer-motion';
import { useItems } from '../../hooks/useItems';

const ItemCard = ({ item, onEdit, onDelete }) => {
  // Hooks at top
  const { updateItem } = useItems();
  
  // Event handlers
  const handlePriorityChange = (newPriority) => {
    updateItem.mutate({ ...item, priority: newPriority });
  };
  
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-sm border p-4"
      whileHover={{ scale: 1.02 }}
    >
      {/* Component content */}
    </motion.div>
  );
};

export default ItemCard;
```

**Key Patterns:**
- Default export for components
- Props destructured in function signature
- Hooks called at component top
- Event handlers use `handle` prefix
- Motion components for interactions
- Consistent className patterns

### 2. Custom Hooks Pattern

```javascript
// hooks/useUmber.js
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { umberService } from '../services/umbers';

export const useUmber = (id) => {
  return useQuery(['umber', id], () => umberService.getById(id), {
    enabled: !!id
  });
};

export const useUmbers = () => {
  return useQuery('umbers', umberService.getAll);
};

export const useCreateUmber = () => {
  const queryClient = useQueryClient();
  
  return useMutation(umberService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('umbers');
    }
  });
};
```

### 3. Service Layer Pattern

```javascript
// services/umbers.js
import { api } from './api';

export const umberService = {
  getAll: () => api.get('/umbers').then(res => res.data),
  
  getById: (id) => api.get(`/umbers/${id}`).then(res => res.data),
  
  create: (umberData) => api.post('/umbers', umberData).then(res => res.data),
  
  update: (id, updateData) => api.put(`/umbers/${id}`, updateData).then(res => res.data),
  
  delete: (id) => api.delete(`/umbers/${id}`)
};
```

### 4. Backend Controller Pattern

```javascript
// controllers/umberController.js
import { UmberService } from '../services/umberService.js';
import { validationResult } from 'express-validator';

export const createUmber = async (req, res, next) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    // Business logic
    const umber = await UmberService.create({
      ...req.body,
      userId: req.user.id
    });
    
    // Response
    res.status(201).json({ umber });
  } catch (error) {
    next(error);
  }
};
```

---

## Critical Principles

### 1. AVOID useEffect Unless Absolutely Necessary
```javascript
// ❌ BAD - Unnecessary useEffect
const [data, setData] = useState([]);
useEffect(() => {
  if (items) {
    setData(processItems(items));
  }
}, [items]);

// ✅ GOOD - Use useMemo instead
const data = useMemo(() => {
  return items ? processItems(items) : [];
}, [items]);
```

### 2. Data Hierarchy Pattern
```javascript
// Always maintain this hierarchy:
User → Umbers → (Items + Nests)
Nests → Items (via ItemNestMembership)

// Items ALWAYS belong to Umbers first
// Items OPTIONALLY belong to Nests within that Umber
// Default "Unnested" nest catches loose items
```

### 3. State Management Strategy
```javascript
// Server State: React Query
const { data: umbers } = useUmbers();

// Global App State: React Context  
const { user, login, logout } = useAuth();

// Local UI State: useState
const [isModalOpen, setIsModalOpen] = useState(false);

// Computed State: useMemo
const sortedItems = useMemo(() => 
  items?.sort((a, b) => a.createdAt - b.createdAt), [items]
);
```

---

## Styling Conventions

### Tailwind Patterns
```javascript
// Component containers
className="bg-white rounded-lg shadow-sm border p-4"

// Cards with hover
className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"

// Buttons
className="btn-primary" // Custom class
className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"

// Grid layouts
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"

// Flexbox patterns
className="flex items-center justify-between"
className="flex flex-col space-y-4"
```

### Motion Patterns
```javascript
// Card hover effects
<motion.div 
  whileHover={{ scale: 1.02 }}
  transition={{ type: "spring", stiffness: 300 }}
>

// Page transitions
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>

// Modal animations
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
>
```

---

## File Naming Conventions

### Frontend
```
PascalCase for components: ItemCard.jsx, UmberMindMap.jsx
camelCase for hooks: useAuth.js, useUrlScraper.js
camelCase for services: umberService.js, authService.js
camelCase for utils: mindMapTransformer.js, validators.js
PascalCase for pages: DashboardPage.jsx, LoginPage.jsx
```

### Backend
```
camelCase for files: userController.js, umberService.js
PascalCase for models: User.js, Umber.js, Item.js
camelCase for routes: auth.js, umbers.js, items.js
camelCase for middleware: authMiddleware.js, validation.js
```

---

## API Response Patterns

### Success Responses
```javascript
// Single item
res.json({ umber: umberData });

// Lists with pagination
res.json({
  umbers: umberArray,
  total: 25,
  page: 1,
  pages: 3
});

// Creation success
res.status(201).json({ umber: newUmber });
```

### Error Responses
```javascript
// Validation errors
res.status(400).json({
  error: 'Validation failed',
  details: [
    { field: 'name', message: 'Name is required' }
  ]
});

// Generic errors
res.status(500).json({
  error: 'Internal server error',
  message: 'Something went wrong'
});
```

---

## React Flow Integration Patterns

### Mind Map Data Transformation
```javascript
// Always transform database data to React Flow format
const transformUmberToMindMap = (umber) => {
  const nodes = [
    // Central Umber node
    {
      id: `umber-${umber._id}`,
      type: 'umberNode',
      position: { x: 0, y: 0 },
      data: { label: umber.name, type: 'umber' }
    }
  ];
  
  // Add nest nodes in circle around umber
  // Add item nodes around their parent nests
  // Return { nodes, edges }
};
```

### Custom Node Structure
```javascript
// components/mindmap/nodes/ItemNode.jsx
const ItemNode = ({ data, selected }) => {
  return (
    <motion.div className={`item-node ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Top} />
      {/* Node content */}
      <Handle type="source" position={Position.Bottom} />
    </motion.div>
  );
};
```

---

## URL Scraping Patterns

### Frontend Usage
```javascript
const { scrapeUrl, isScrapingUrl, scrapingError } = useUrlScraper();

const handleUrlSubmit = async (url) => {
  try {
    const scrapedData = await scrapeUrl(url);
    setItemData(scrapedData);
  } catch (error) {
    // Error handling
  }
};
```

### Backend Implementation
```javascript
// Always provide fallback data
const scrapeUrl = async (url) => {
  try {
    const { data } = await mql(url, { /* selectors */ });
    return processScrapedData(data);
  } catch (error) {
    return {
      title: extractTitleFromUrl(url),
      image: null,
      price: null,
      scrapingFailed: true
    };
  }
};
```

---

## Database Patterns

### Model Structure
```javascript
// models/Umber.js
const umberSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true, maxlength: 100 },
  theme: { type: String, default: 'sanctuary' },
  budgetTarget: Number, // in cents
  
  // Denormalized for performance
  itemCount: { type: Number, default: 0 },
  totalValue: { type: Number, default: 0 }
}, { timestamps: true });
```

### Query Patterns
```javascript
// Always filter by userId for security
const getUserUmbers = async (userId) => {
  return await Umber.find({ userId }).sort({ createdAt: -1 });
};

// Populate related data efficiently
const getUmberWithDetails = async (umberId, userId) => {
  return await Umber.findOne({ _id: umberId, userId })
    .populate({
      path: 'nests',
      populate: { path: 'items' }
    });
};
```

---

## Form Patterns

### React Hook Form Integration
```javascript
import { useForm } from 'react-hook-form';

const CreateUmberModal = ({ isOpen, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const createUmber = useCreateUmber();
  
  const onSubmit = (data) => {
    createUmber.mutate(data, {
      onSuccess: () => {
        onClose();
      }
    });
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('name', { required: 'Name is required' })}
          placeholder="Umber name..."
        />
        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
      </form>
    </Modal>
  );
};
```

---

## Testing Patterns

### Frontend Tests
```javascript
// Use React Testing Library patterns
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

const renderWithQuery = (component) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );
};
```

### Backend Tests
```javascript
// Use supertest for API testing
import request from 'supertest';
import app from '../server.js';

describe('POST /api/umbers', () => {
  it('should create a new umber', async () => {
    const response = await request(app)
      .post('/api/umbers')
      .set('Authorization', `Bearer ${validToken}`)
      .send({ name: 'Test Umber' });
      
    expect(response.status).toBe(201);
    expect(response.body.umber.name).toBe('Test Umber');
  });
});
```

---

## Performance Guidelines

### Frontend Optimization
```javascript
// Lazy load heavy components
const UmberMindMap = lazy(() => import('./components/mindmap/UmberMindMap'));

// Memoize expensive calculations
const processedItems = useMemo(() => 
  items?.map(item => ({ ...item, processed: true })), [items]
);

// Debounce user input
const debouncedSearch = useMemo(
  () => debounce(searchItems, 300), []
);
```

### Backend Optimization
```javascript
// Use indexes for frequent queries
umberSchema.index({ userId: 1, createdAt: -1 });

// Paginate large results
const getUmbers = async (userId, page = 1, limit = 20) => {
  const skip = (page - 1) * limit;
  return await Umber.find({ userId }).skip(skip).limit(limit);
};
```

This guide ensures any AI assistant can write code that perfectly fits the Umber codebase patterns and principles.