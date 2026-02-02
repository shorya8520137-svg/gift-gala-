const express = require('express')
const router = express.Router()

// Sample cart data (replace with database/session storage)
const carts = {}

// GET /api/cart/:userId - Get user's cart
router.get('/:userId', (req, res) => {
  const { userId } = req.params
  const cart = carts[userId] || { items: [], total: 0 }
  
  res.json({
    success: true,
    data: cart
  })
})

// POST /api/cart/:userId/add - Add item to cart
router.post('/:userId/add', (req, res) => {
  const { userId } = req.params
  const { productId, quantity = 1, price, name } = req.body
  
  if (!productId || !price || !name) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields'
    })
  }
  
  if (!carts[userId]) {
    carts[userId] = { items: [], total: 0 }
  }
  
  const cart = carts[userId]
  const existingItem = cart.items.find(item => item.productId === productId)
  
  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.items.push({
      productId,
      name,
      price,
      quantity
    })
  }
  
  // Recalculate total
  cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  
  res.json({
    success: true,
    message: 'Item added to cart',
    data: cart
  })
})

// PUT /api/cart/:userId/update - Update cart item quantity
router.put('/:userId/update', (req, res) => {
  const { userId } = req.params
  const { productId, quantity } = req.body
  
  if (!carts[userId]) {
    return res.status(404).json({
      success: false,
      message: 'Cart not found'
    })
  }
  
  const cart = carts[userId]
  const item = cart.items.find(item => item.productId === productId)
  
  if (!item) {
    return res.status(404).json({
      success: false,
      message: 'Item not found in cart'
    })
  }
  
  if (quantity <= 0) {
    cart.items = cart.items.filter(item => item.productId !== productId)
  } else {
    item.quantity = quantity
  }
  
  // Recalculate total
  cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  
  res.json({
    success: true,
    message: 'Cart updated',
    data: cart
  })
})

// DELETE /api/cart/:userId/remove/:productId - Remove item from cart
router.delete('/:userId/remove/:productId', (req, res) => {
  const { userId, productId } = req.params
  
  if (!carts[userId]) {
    return res.status(404).json({
      success: false,
      message: 'Cart not found'
    })
  }
  
  const cart = carts[userId]
  cart.items = cart.items.filter(item => item.productId !== productId)
  
  // Recalculate total
  cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  
  res.json({
    success: true,
    message: 'Item removed from cart',
    data: cart
  })
})

// DELETE /api/cart/:userId/clear - Clear entire cart
router.delete('/:userId/clear', (req, res) => {
  const { userId } = req.params
  
  carts[userId] = { items: [], total: 0 }
  
  res.json({
    success: true,
    message: 'Cart cleared',
    data: carts[userId]
  })
})

module.exports = router