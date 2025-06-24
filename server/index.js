require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// CORS configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL, process.env.RAILWAY_STATIC_URL].filter(Boolean)
    : ['http://localhost:3000', 'http://localhost:8164'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import routes
const postersRouter = require('./src/routes/posters');
const instagramRouter = require('./src/routes/instagram');

// API Routes
app.use('/api/ping', (req, res) => res.json({ message: 'pong' }));
app.use('/api/posters', postersRouter);
app.use('/api/instagram', instagramRouter);

// Serve static files from Next.js build in production
if (process.env.NODE_ENV === 'production') {
  const nextOutPath = path.join(__dirname, '../muralla-dashboard/out');
  
  // Serve Next.js static files
  app.use(express.static(nextOutPath));
  
  // Handle client-side routing - serve index.html for all non-API routes
  app.get('*', (req, res) => {
    // Skip API routes
    if (req.path.startsWith('/api/')) {
      return res.status(404).json({ error: 'API route not found' });
    }
    
    // Serve Next.js index.html for all other routes
    res.sendFile(path.join(nextOutPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
