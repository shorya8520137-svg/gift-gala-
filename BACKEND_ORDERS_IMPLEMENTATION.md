# Backend Orders API Implementation Guide

## 🎯 Purpose
This guide shows how to implement the missing Orders API endpoints on your backend server at `https://54.169.31.95:8443/api/website`

## 📋 Current Status
- ✅ **Products API**: Working (`/products`)
- ✅ **Categories API**: Working (`/categories`)
- ❌ **Orders API**: Missing (`/orders`) - **NEEDS IMPLEMENTATION**
- ❌ **Cart API**: Missing (`/cart`) - **NEEDS IMPLEMENTATION**

---

## 🚀 Quick Implementation (Node.js/Express)

### 1. Orders Route Handler

Create or update your orders route file:

```javascript
// routes/orders.js
const express = require('express');
const router = express.Router();

// Middleware for authentication (implement based on your auth system)
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      error: { code: 'UNAUTHORIZED', message: 'Access token required' }
    });
  }
  
  // Verify JWT token here (implement based on your auth system)
  // For now, we'll skip verification for testing
  req.user = { id: 1 }; // Mock user
  next();
};

// GET /orders - Get user orders
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const userId = req.user.id;
    
    // Mock data for testing - replace with actual database query
    const mockOrders = [
      {
        id: 1,
        user_id: userId,
        order_number: 'ORD-2026-001',
        total_amount: 129.99,
        tax_amount: 10.40,
        shipping_amount: 0,
        discount_amount: 0,
        final_amount: 140.39,
        status: 'delivered',
        payment_status: 'paid',
        payment_method: 'Credit Card',
        shipping_address: {
          full_name: 'John Doe',
          phone: '+1234567890',
          email: 'john@example.com',
          address_line_1: '123 Main St',
          city: 'New York',
          state: 'NY',
          postal_code: '10001',
          country: 'US'
        },
        billing_address: {
          full_name: 'John Doe',
          phone: '+1234567890',
          email: 'john@example.com',
          address_line_1: '123 Main St',
          city: 'New York',
          state: 'NY',
          postal_code: '10001',
          country: 'US'
        },
        items: [
          {
            id: 1,
            product_id: 1,
            product_name: 'Custom Tumbler',
            product_image: '/images/products/tumbler.jpg',
            quantity: 1,
            unit_price: 129.99,
            total_price: 129.99
          }
        ],
        created_at: '2025-01-15T10:00:00.000Z',
        updated_at: '2025-01-20T15:30:00.000Z',
        delivered_at: '2025-01-20T15:30:00.000Z',
        tracking_number: 'TRK123456789'
      }
    ];
    
    // Filter by status if provided
    let filteredOrders = mockOrders;
    if (status && status !== 'all') {
      filteredOrders = mockOrders.filter(order => order.status === status);
    }
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: paginatedOrders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: filteredOrders.length,
        pages: Math.ceil(filteredOrders.length / limit)
      }
    });
    
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to fetch orders' }
    });
  }
});

// GET /orders/:id - Get single order
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const orderId = parseInt(req.params.id);
    const userId = req.user.id;
    
    // Mock single order - replace with database query
    const mockOrder = {
      id: orderId,
      user_id: userId,
      order_number: `ORD-2026-${orderId.toString().padStart(3, '0')}`,
      total_amount: 129.99,
      tax_amount: 10.40,
      shipping_amount: 0,
      discount_amount: 0,
      final_amount: 140.39,
      status: 'delivered',
      payment_status: 'paid',
      payment_method: 'Credit Card',
      shipping_address: {
        full_name: 'John Doe',
        phone: '+1234567890',
        email: 'john@example.com',
        address_line_1: '123 Main St',
        city: 'New York',
        state: 'NY',
        postal_code: '10001',
        country: 'US'
      },
      billing_address: {
        full_name: 'John Doe',
        phone: '+1234567890',
        email: 'john@example.com',
        address_line_1: '123 Main St',
        city: 'New York',
        state: 'NY',
        postal_code: '10001',
        country: 'US'
      },
      items: [
        {
          id: 1,
          product_id: 1,
          product_name: 'Custom Tumbler',
          product_image: '/images/products/tumbler.jpg',
          quantity: 1,
          unit_price: 129.99,
          total_price: 129.99
        }
      ],
      created_at: '2025-01-15T10:00:00.000Z',
      updated_at: '2025-01-20T15:30:00.000Z',
      delivered_at: '2025-01-20T15:30:00.000Z',
      tracking_number: 'TRK123456789'
    };
    
    res.json({
      success: true,
      data: mockOrder
    });
    
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to fetch order' }
    });
  }
});

// POST /orders - Create new order
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { items, shipping_address, billing_address, payment_method } = req.body;
    const userId = req.user.id;
    
    // Validate required fields
    if (!items || !items.length || !shipping_address || !payment_method) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_DATA', message: 'Missing required fields' }
      });
    }
    
    // Generate order number
    const orderNumber = `ORD-${Date.now()}`;
    
    // Calculate totals (implement your pricing logic)
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
    const taxAmount = subtotal * 0.08; // 8% tax
    const shippingAmount = subtotal > 100 ? 0 : 9.99; // Free shipping over $100
    const finalAmount = subtotal + taxAmount + shippingAmount;
    
    // Mock order creation - replace with database insert
    const newOrder = {
      id: Date.now(),
      user_id: userId,
      order_number: orderNumber,
      total_amount: subtotal,
      tax_amount: taxAmount,
      shipping_amount: shippingAmount,
      discount_amount: 0,
      final_amount: finalAmount,
      status: 'pending',
      payment_status: 'pending',
      payment_method: payment_method,
      shipping_address: shipping_address,
      billing_address: billing_address || shipping_address,
      items: items.map((item, index) => ({
        id: index + 1,
        product_id: item.product_id,
        product_name: item.product_name || `Product ${item.product_id}`,
        product_image: item.product_image || '/images/placeholder.svg',
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.quantity * item.unit_price,
        variant_details: item.variant_details || {}
      })),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    res.status(201).json({
      success: true,
      data: {
        order_id: newOrder.id,
        order_number: newOrder.order_number,
        total_amount: newOrder.final_amount,
        status: newOrder.status
      }
    });
    
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to create order' }
    });
  }
});

// PUT /orders/:id/cancel - Cancel order
router.put('/:id/cancel', authenticateToken, async (req, res) => {
  try {
    const orderId = parseInt(req.params.id);
    const { reason } = req.body;
    
    // Mock cancellation - replace with database update
    res.json({
      success: true,
      data: {
        orderId: orderId,
        status: 'cancelled',
        cancelledAt: new Date().toISOString(),
        reason: reason || 'Customer requested cancellation'
      }
    });
    
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to cancel order' }
    });
  }
});

module.exports = router;
```

### 2. Update Main Server File

Add the orders route to your main server file:

```javascript
// server.js or app.js
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/website/products', require('./routes/products'));
app.use('/api/website/categories', require('./routes/categories'));
app.use('/api/website/orders', require('./routes/orders')); // ADD THIS LINE

// Start server
const PORT = process.env.PORT || 8443;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 3. Cart API Implementation

```javascript
// routes/cart.js
const express = require('express');
const router = express.Router();

// Mock cart storage (use database in production)
let userCarts = {};

// GET /cart - Get user cart
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = userCarts[userId] || {
      id: userId,
      user_id: userId,
      items: [],
      total_items: 0,
      subtotal: 0,
      tax_amount: 0,
      shipping_amount: 0,
      discount_amount: 0,
      total_amount: 0,
      updated_at: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: cart
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to get cart' }
    });
  }
});

// POST /cart/add - Add item to cart
router.post('/add', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { product_id, quantity, variant_details } = req.body;
    
    if (!userCarts[userId]) {
      userCarts[userId] = {
        id: userId,
        user_id: userId,
        items: [],
        total_items: 0,
        subtotal: 0,
        tax_amount: 0,
        shipping_amount: 0,
        discount_amount: 0,
        total_amount: 0,
        updated_at: new Date().toISOString()
      };
    }
    
    // Mock product data - replace with database query
    const mockProduct = {
      id: product_id,
      product_name: `Product ${product_id}`,
      product_image: '/images/placeholder.svg',
      price: 29.99,
      offer_price: null,
      stock_quantity: 100
    };
    
    // Add or update item in cart
    const existingItemIndex = userCarts[userId].items.findIndex(
      item => item.product_id === product_id
    );
    
    if (existingItemIndex >= 0) {
      userCarts[userId].items[existingItemIndex].quantity += quantity;
    } else {
      userCarts[userId].items.push({
        id: Date.now(),
        product_id: product_id,
        product_name: mockProduct.product_name,
        product_image: mockProduct.product_image,
        price: mockProduct.price,
        offer_price: mockProduct.offer_price,
        quantity: quantity,
        variant_details: variant_details || {},
        stock_quantity: mockProduct.stock_quantity
      });
    }
    
    // Recalculate totals
    const subtotal = userCarts[userId].items.reduce(
      (sum, item) => sum + (item.quantity * (item.offer_price || item.price)), 0
    );
    
    userCarts[userId].total_items = userCarts[userId].items.reduce(
      (sum, item) => sum + item.quantity, 0
    );
    userCarts[userId].subtotal = subtotal;
    userCarts[userId].tax_amount = subtotal * 0.08;
    userCarts[userId].shipping_amount = subtotal > 100 ? 0 : 9.99;
    userCarts[userId].total_amount = subtotal + userCarts[userId].tax_amount + userCarts[userId].shipping_amount;
    userCarts[userId].updated_at = new Date().toISOString();
    
    res.json({
      success: true,
      message: 'Item added to cart'
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to add to cart' }
    });
  }
});

module.exports = router;
```

---

## 🔧 Implementation Steps

### Step 1: Add to your server
1. Create `routes/orders.js` with the code above
2. Create `routes/cart.js` with the code above
3. Update your main server file to include these routes

### Step 2: Test the endpoints
1. Restart your server
2. Test with: `https://54.169.31.95:8443/api/website/orders`
3. Use the API test page: `https://frontend-sigma-two-47.vercel.app/api-test.html`

### Step 3: Update frontend
Once the API is working, update the orders page to use real API:

```javascript
// In frontend/app/account/orders/page.tsx
// Uncomment lines 22-25 and remove mock data
const response = await api.getOrders(token, { 
  status: selectedStatus === 'all' ? undefined : selectedStatus 
})
setOrders(response.data || [])
```

---

## 📚 Related Documentation

- **Complete API Reference**: `ORDER_API_DOCUMENTATION.md`
- **Database Schema**: See ORDER_API_DOCUMENTATION.md section
- **Frontend Integration**: See ORDER_API_DOCUMENTATION.md examples

---

## 🚨 Important Notes

1. **Authentication**: Implement proper JWT verification
2. **Database**: Replace mock data with actual database queries
3. **Validation**: Add proper input validation
4. **Error Handling**: Implement comprehensive error handling
5. **Security**: Add rate limiting and input sanitization

This implementation will make your Orders API work and fix the 404 errors! 🚀