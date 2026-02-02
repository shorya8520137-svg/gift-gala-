// Inventory API Integration Test
// This script tests the order placement integration with the inventory management system

const API_BASE_URL = 'https://54.169.31.95:8443/api/website'

// Test order data matching the inventory API format
const testOrderData = {
  cartItems: [
    {
      productId: "1", // Use a valid product ID from your system
      quantity: 2,
      customization: {
        text: "Happy Birthday Mom",
        color: "blue",
        size: "large"
      }
    }
  ],
  customer: {
    email: "test@example.com",
    firstName: "John",
    lastName: "Doe"
  },
  shippingAddress: {
    name: "John Doe",
    phone: "+1-555-123-4567",
    email: "john@example.com",
    addressLine1: "123 Main Street",
    addressLine2: "Apt 4B",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    country: "United States"
  },
  billingAddress: {
    name: "John Doe",
    phone: "+1-555-123-4567",
    email: "john@example.com",
    addressLine1: "456 Billing St",
    city: "New York",
    state: "NY",
    postalCode: "10002",
    country: "United States"
  },
  payment: {
    method: "credit_card",
    transactionId: `txn_${Date.now()}`,
    amount: 299.99,
    currency: "USD",
    status: "completed"
  },
  orderDetails: {
    subtotal: 249.99,
    tax: 25.00,
    shipping: 15.00,
    discount: 10.00,
    total: 299.99
  }
}

// Function to test order creation
async function testOrderCreation() {
  console.log('🧪 Testing Inventory API Order Integration...\n')
  
  try {
    console.log('📤 Sending order to inventory system...')
    console.log('API Endpoint:', `${API_BASE_URL}/orders`)
    console.log('Order Data:', JSON.stringify(testOrderData, null, 2))
    
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Note: In production, you would include authentication headers here
        // 'Authorization': 'Bearer YOUR_JWT_TOKEN',
        // 'X-API-Key': 'YOUR_API_KEY'
      },
      body: JSON.stringify(testOrderData)
    })
    
    console.log('\n📥 Response Status:', response.status)
    console.log('Response Headers:', Object.fromEntries(response.headers.entries()))
    
    const responseText = await response.text()
    console.log('\n📄 Raw Response:', responseText)
    
    try {
      const responseData = JSON.parse(responseText)
      console.log('\n✅ Parsed Response:', JSON.stringify(responseData, null, 2))
      
      if (responseData.success) {
        console.log('\n🎉 SUCCESS! Order created successfully!')
        console.log('Order ID:', responseData.data?.order_id || responseData.data?.orderId)
        console.log('Order Number:', responseData.data?.order_number || responseData.data?.orderNumber)
        console.log('\n💡 This order should now appear in your inventory dashboard!')
      } else {
        console.log('\n❌ Order creation failed:', responseData.message || responseData.error)
      }
    } catch (parseError) {
      console.log('\n⚠️  Response is not valid JSON. Raw response:', responseText)
      
      // Check if it's an HTML error page (404, 500, etc.)
      if (responseText.includes('<!DOCTYPE') || responseText.includes('<html>')) {
        console.log('🔍 Received HTML response - likely a 404 or server error page')
        console.log('💡 This suggests the /orders endpoint may not be implemented yet')
      }
    }
    
  } catch (error) {
    console.error('\n💥 Network Error:', error.message)
    console.log('🔍 This could indicate:')
    console.log('   - Network connectivity issues')
    console.log('   - CORS policy restrictions')
    console.log('   - Server is down or unreachable')
  }
}

// Function to test products endpoint (for comparison)
async function testProductsEndpoint() {
  console.log('\n🔍 Testing Products endpoint for comparison...')
  
  try {
    const response = await fetch(`${API_BASE_URL}/products?limit=1`)
    const responseText = await response.text()
    
    console.log('Products Response Status:', response.status)
    
    if (response.ok) {
      try {
        const data = JSON.parse(responseText)
        console.log('✅ Products API is working!')
        console.log('Sample product:', data.data?.[0]?.product_name || 'No products found')
      } catch (e) {
        console.log('⚠️  Products response is not JSON:', responseText.substring(0, 200))
      }
    } else {
      console.log('❌ Products API failed with status:', response.status)
    }
  } catch (error) {
    console.log('💥 Products API Error:', error.message)
  }
}

// Run the tests
async function runTests() {
  console.log('🚀 Starting Inventory API Integration Tests')
  console.log('=' .repeat(50))
  
  await testProductsEndpoint()
  console.log('\n' + '=' .repeat(50))
  await testOrderCreation()
  
  console.log('\n' + '=' .repeat(50))
  console.log('📋 Test Summary:')
  console.log('- If Products API works but Orders API returns 404: Orders endpoint needs implementation')
  console.log('- If both fail: Check server status and network connectivity')
  console.log('- If Orders API works: Integration successful! Check inventory dashboard')
  console.log('\n💡 Next Steps:')
  console.log('1. Verify the order appears in your inventory management dashboard')
  console.log('2. Test the complete checkout flow on the website')
  console.log('3. Add proper authentication (JWT token or API key) for production')
}

// Run tests if this file is executed directly
if (typeof window === 'undefined') {
  // Node.js environment - use built-in fetch (Node 18+)
  runTests()
} else {
  // Browser environment
  console.log('Run this in browser console or Node.js')
  window.testInventoryAPI = runTests
}