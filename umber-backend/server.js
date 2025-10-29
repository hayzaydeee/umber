const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Enhanced request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`📡 ${req.method} ${req.url} - ${new Date().toISOString()}`);
  
  // Log request body for POST/PUT/PATCH requests
  if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
    console.log(`📝 Request Body:`, JSON.stringify(req.body, null, 2));
  }
  
  // Capture the original res.json and res.send methods
  const originalJson = res.json;
  const originalSend = res.send;
  
  res.json = function(obj) {
    const duration = Date.now() - start;
    console.log(`✅ ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`);
    console.log(`📤 Response:`, JSON.stringify(obj, null, 2));
    return originalJson.call(this, obj);
  };
  
  res.send = function(data) {
    const duration = Date.now() - start;
    console.log(`✅ ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`);
    console.log(`📤 Response:`, data);
    return originalSend.call(this, data);
  };
  
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Umber backend is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Umber backend is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/magic-auth', require('./src/routes/magicAuth')); // New magic link auth routes
app.use('/api/umbers', require('./src/routes/umbers'));
app.use('/api/nests', require('./src/routes/nests'));
app.use('/api/items', require('./src/routes/items'));
app.use('/api/users', require('./src/routes/users'));
app.use('/api/dashboard', require('./src/routes/dashboard'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`❌ Error in ${req.method} ${req.url}:`);
  console.error(`❌ Error details:`, err.message);
  console.error(`❌ Stack trace:`, err.stack);
  
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Database connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/umber';
    
    console.log('Connecting to MongoDB...');
    console.log('URI:', mongoURI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')); // Hide credentials in logs
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB connected successfully');
    console.log('Database:', mongoose.connection.name);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Umber backend running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
  });
};

startServer();