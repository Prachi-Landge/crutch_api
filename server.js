const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const productsRoutes = require('./routes/products');
app.use('/products', productsRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Crutches API',
    version: '1.0.0',
    endpoints: {
      getAllProducts: 'GET /products',
      getProductById: 'GET /products/:id',
      getProductsByCategory: 'GET /products/category/:category',
      getAllCategories: 'GET /products/categories',
      limitProducts: 'GET /products?limit=5',
      sortProducts: 'GET /products?sort=asc'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Crutches API is running on http://localhost:${PORT}`);
});