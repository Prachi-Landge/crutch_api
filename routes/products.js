const express = require('express');
const router = express.Router();
const productsData = require('../data/products.json');

// GET all products with optional query parameters
router.get('/', (req, res) => {
  let products = [...productsData];
  
  // Sorting
  if (req.query.sort) {
    const sortOrder = req.query.sort.toLowerCase();
    products.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else if (sortOrder === 'desc') {
        return b.price - a.price;
      }
      return 0;
    });
  }
  
  // Limiting
  if (req.query.limit) {
    const limit = parseInt(req.query.limit);
    products = products.slice(0, limit);
  }
  
  res.json(products);
});

// GET all categories (must be before /:id to avoid conflict)
router.get('/categories', (req, res) => {
  const categories = [...new Set(productsData.map(p => p.category))];
  res.json(categories);
});

// GET products by category
router.get('/category/:category', (req, res) => {
  const category = req.params.category;
  const products = productsData.filter(p => 
    p.category.toLowerCase() === category.toLowerCase()
  );
  
  if (products.length > 0) {
    res.json(products);
  } else {
    res.status(404).json({ error: 'No products found in this category' });
  }
});

// GET single product by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = productsData.find(p => p.id === id);
  
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

module.exports = router;