const express = require('express')
const router = express.Router()

// Sample orders data (replace with database)
const orders = []

// POST /api/orders - Create new order
router.post('/', (req, res) => {
  const {
    userId,
    items,
    total,
    shippingAddress,
    paymentMethod,
    customerInfo
  } = req.body

  if (!userId || !items || !total || !shippingAddress) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields'
    })
  }

  const order = {
    id: orders.length + 1,
    userId,
    items,
    total,
    shippingAddress,
    paymentMethod,
    customerInfo,
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  }

  orders.push(order)

  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    data: order
  })
})

// GET /api/orders/:userId - Get user's orders
router.get('/:userId', (req, res) => {
  const { userId } = req.params
  const userOrders = orders.filter(order => order.userId === userId)

  res.json({
    success: true,
    count: userOrders.length,
    data: userOrders
  })
})

// GET /api/orders/order/:orderId - Get specific order
router.get('/order/:orderId', (req, res) => {
  const { orderId } = req.params
  const order = orders.find(o => o.id === parseInt(orderId))

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    })
  }

  res.json({
    success: true,
    data: order
  })
})

// PUT /api/orders/:orderId/status - Update order status
router.put('/:orderId/status', (req, res) => {
  const { orderId } = req.params
  const { status } = req.body

  const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
  
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid status'
    })
  }

  const order = orders.find(o => o.id === parseInt(orderId))

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    })
  }

  order.status = status
  order.updatedAt = new Date()

  res.json({
    success: true,
    message: 'Order status updated',
    data: order
  })
})

module.exports = router