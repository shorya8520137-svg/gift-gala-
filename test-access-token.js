// Test script to verify access token integration
const API_BASE_URL = 'https://54.169.31.95:8443/api/website'
const ACCESS_TOKEN = 'wk_live_3c6930a44febffade97a5e1a00e4db23a0dc552e3bf8a55800c1f3fd1f03de37'

async function testAccessToken() {
  console.log('🧪 Testing Access Token Integration...\n')
  
  // Test 1: Get Products (should work without token)
  console.log('1. Testing Products API (no auth required)...')
  try {
    const response = await fetch(`${API_BASE_URL}/products?limit=5`)
    const data = await response.json()
    console.log('✅ Products API:', data.success ? 'SUCCESS' : 'FAILED')
    console.log(`   Found ${data.data?.length || 0} products\n`)
  } catch (error) {
    console.log('❌ Products API: FAILED -', error.message, '\n')
  }
  
  // Test 2: Test Order Creation with Access Token
  console.log('2. Testing Order Creation with Access Token...')
  try {
    const orderData = {
      cartItems: [
        {
          productId: "1",
          quantity: 1,
          customization: {
            color: "black",
            text: "Test Order"
          }
        }
      ],
      customer: {
        email: "test@example.com",
        firstName: "Test",
        lastName: "User"
      },
      shippingAddress: {
        name: "Test User",
        phone: "+1234567890",
        email: "test@example.com",
        addressLine1: "123 Test St",
        addressLine2: "",
        city: "Test City",
        state: "TS",
        postalCode: "12345",
        country: "US"
      },
      payment: {
        method: "credit_card",
        transactionId: `test_txn_${Date.now()}`,
        amount: 99.99,
        currency: "USD",
        status: "completed"
      },
      orderDetails: {
        subtotal: 99.99,
        tax: 8.00,
        shipping: 0,
        discount: 0,
        total: 107.99
      }
    }
    
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      },
      body: JSON.stringify(orderData)
    })
    
    const data = await response.json()
    console.log('✅ Order Creation:', data.success ? 'SUCCESS' : 'FAILED')
    if (data.success) {
      console.log(`   Order ID: ${data.data?.order_id}`)
      console.log(`   Order Number: ${data.data?.order_number}`)
    } else {
      console.log(`   Error: ${data.message || 'Unknown error'}`)
    }
    console.log()
  } catch (error) {
    console.log('❌ Order Creation: FAILED -', error.message, '\n')
  }
  
  // Test 3: Test Get Orders with Access Token
  console.log('3. Testing Get Orders with Access Token...')
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      }
    })
    
    const data = await response.json()
    console.log('✅ Get Orders:', data.success ? 'SUCCESS' : 'FAILED')
    if (data.success) {
      console.log(`   Found ${data.data?.length || 0} orders`)
    } else {
      console.log(`   Error: ${data.message || 'Unknown error'}`)
    }
    console.log()
  } catch (error) {
    console.log('❌ Get Orders: FAILED -', error.message, '\n')
  }
  
  console.log('🎉 Access Token Integration Test Complete!')
}

// Run the test
testAccessToken().catch(console.error)