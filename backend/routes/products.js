const express = require('express')
const router = express.Router()

// Sample products data (replace with database)
const products = [
  // Tumbler Category
  {
    id: 1,
    name: 'Stainless Steel Tumbler',
    description: 'Double-wall insulated tumbler keeps drinks hot or cold for hours',
    price: 24.99,
    category: 'Tumbler',
    stock: 50,
    images: ['/images/products/tumbler/stainless-tumbler.jpg'],
    featured: true
  },
  {
    id: 2,
    name: 'Ceramic Travel Tumbler',
    description: 'Elegant ceramic tumbler with leak-proof lid',
    price: 19.99,
    category: 'Tumbler',
    stock: 30,
    images: ['/images/products/tumbler/ceramic-tumbler.jpg'],
    featured: false
  },
  
  // Framers Category
  {
    id: 3,
    name: 'Wooden Photo Frame',
    description: 'Handcrafted wooden frame perfect for family photos',
    price: 34.99,
    category: 'Framers',
    stock: 25,
    images: ['/images/products/framers/wooden-frame.jpg'],
    featured: true
  },
  {
    id: 4,
    name: 'Modern Metal Frame',
    description: 'Sleek metal frame with minimalist design',
    price: 29.99,
    category: 'Framers',
    stock: 40,
    images: ['/images/products/framers/metal-frame.jpg'],
    featured: false
  },
  
  // Table Accessories Category
  {
    id: 5,
    name: 'Elegant Table Runner',
    description: 'Premium fabric table runner for special occasions',
    price: 39.99,
    category: 'Table Accessories',
    stock: 20,
    images: ['/images/products/table-accessories/table-runner.jpg'],
    featured: true
  },
  {
    id: 6,
    name: 'Bamboo Coaster Set',
    description: 'Set of 6 eco-friendly bamboo coasters',
    price: 15.99,
    category: 'Table Accessories',
    stock: 60,
    images: ['/images/products/table-accessories/coasters.jpg'],
    featured: false
  },
  
  // Men Jewellery Category
  {
    id: 7,
    name: 'Classic Men\'s Watch',
    description: 'Sophisticated leather strap watch for the modern man',
    price: 149.99,
    category: 'Men Jewellery',
    stock: 15,
    images: ['/images/products/men-jewellery/mens-watch.jpg'],
    featured: true
  },
  {
    id: 8,
    name: 'Steel Chain Bracelet',
    description: 'Durable stainless steel bracelet with modern design',
    price: 79.99,
    category: 'Men Jewellery',
    stock: 35,
    images: ['/images/products/men-jewellery/mens-bracelet.jpg'],
    featured: false
  },
  
  // Valentine Category
  {
    id: 9,
    name: 'Valentine Gift Box',
    description: 'Romantic gift box perfect for Valentine\'s Day surprises',
    price: 49.99,
    category: 'Valentine',
    stock: 25,
    images: ['/images/products/valentine/valentine-gift-box.jpg'],
    featured: true
  },
  {
    id: 10,
    name: 'Love Heart Pendant',
    description: 'Beautiful heart-shaped pendant necklace',
    price: 89.99,
    category: 'Valentine',
    stock: 20,
    images: ['/images/products/valentine/heart-pendant.jpg'],
    featured: true
  }
]

// GET /api/products - Get all products
router.get('/', (req, res) => {
  const { category, featured, limit } = req.query
  
  let filteredProducts = [...products]
  
  if (category) {
    filteredProducts = filteredProducts.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    )
  }
  
  if (featured === 'true') {
    filteredProducts = filteredProducts.filter(p => p.featured)
  }
  
  if (limit) {
    filteredProducts = filteredProducts.slice(0, parseInt(limit))
  }
  
  res.json({
    success: true,
    count: filteredProducts.length,
    data: filteredProducts
  })
})

// GET /api/products/:id - Get single product
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id))
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    })
  }
  
  res.json({
    success: true,
    data: product
  })
})

// GET /api/products/search/:query - Search products
router.get('/search/:query', (req, res) => {
  const query = req.params.query.toLowerCase()
  
  const searchResults = products.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query)
  )
  
  res.json({
    success: true,
    count: searchResults.length,
    data: searchResults
  })
})

module.exports = router