// Test script to verify both authentication methods
const API_BASE_URL = 'https://54.169.31.95:8443/api/website'
const ACCESS_TOKEN = 'wk_live_3c6930a44febffade97a5e1a00e4db23a0dc552e3bf8a55800c1f3fd1f03de37'

// Helper function to get authentication headers
const getAuthHeaders = (useApiKey = false) => {
  const baseHeaders = {
    'Content-Type': 'application/json'
  }
  
  if (useApiKey) {
    // Option 2: X-API-Key header
    return {
      ...baseHeaders,
      'X-API-Key': ACCESS_TOKEN
    }
  } else {
    // Option 1: Authorization Bearer header
    return {
      ...baseHeaders,
      'Authorization': `Bearer ${ACCESS_TOKEN}`
    }
  }
}

async function testBothAuthMethods() {
  console.log('🧪 Testing Both Authentication Methods...\n')
  
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
  
  // Test 1: Authorization Bearer Header
  console.log('1. Testing Authorization Bearer Header...')
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: getAuthHeaders(false), // Option 1: Authorization Bearer
      body: JSON.stringify(orderData)
    })
    
    const data = await response.json()
    console.log('✅ Authorization Bearer:', data.success ? 'SUCCESS' : 'FAILED')
    if (data.success) {
      console.log(`   Order ID: ${data.data?.order_id}`)
      console.log(`   Order Number: ${data.data?.order_number}`)
    } else {
      console.log(`   Error: ${data.message || 'Unknown error'}`)
    }
    console.log()
  } catch (error) {
    console.log('❌ Authorization Bearer: FAILED -', error.message, '\n')
  }
  
  // Test 2: X-API-Key Header
  console.log('2. Testing X-API-Key Header...')
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: getAuthHeaders(true), // Option 2: X-API-Key
      body: JSON.stringify(orderData)
    })
    
    const data = await response.json()
    console.log('✅ X-API-Key:', data.success ? 'SUCCESS' : 'FAILED')
    if (data.success) {
      console.log(`   Order ID: ${data.data?.order_id}`)
      console.log(`   Order Number: ${data.data?.order_number}`)
    } else {
      console.log(`   Error: ${data.message || 'Unknown error'}`)
    }
    console.log()
  } catch (error) {
    console.log('❌ X-API-Key: FAILED -', error.message, '\n')
  }
  
  // Test 3: Get Orders with Authorization Bearer
  console.log('3. Testing Get Orders with Authorization Bearer...')
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      headers: getAuthHeaders(false) // Option 1: Authorization Bearer
    })
    
    const data = await response.json()
    console.log('✅ Get Orders (Bearer):', data.success ? 'SUCCESS' : 'FAILED')
    if (data.success) {
      console.log(`   Found ${data.data?.length || 0} orders`)
    } else {
      console.log(`   Error: ${data.message || 'Unknown error'}`)
    }
    console.log()
  } catch (error) {
    console.log('❌ Get Orders (Bearer): FAILED -', error.message, '\n')
  }
  
  // Test 4: Get Orders with X-API-Key
  console.log('4. Testing Get Orders with X-API-Key...')
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      headers: getAuthHeaders(true) // Option 2: X-API-Key
    })
    
    const data = await response.json()
    console.log('✅ Get Orders (API Key):', data.success ? 'SUCCESS' : 'FAILED')
    if (data.success) {
      console.log(`   Found ${data.data?.length || 0} orders`)
    } else {
      console.log(`   Error: ${data.message || 'Unknown error'}`)
    }
    console.log()
  } catch (error) {
    console.log('❌ Get Orders (API Key): FAILED -', error.message, '\n')
  }
  
  console.log('🎉 Dual Authentication Method Test Complete!')
  console.log('\n📋 Summary:')
  console.log('- Option 1: Authorization: Bearer TOKEN')
  console.log('- Option 2: X-API-Key: TOKEN')
  console.log('- Website will try Bearer first, fallback to API Key if needed')
}

// Run the test
testBothAuthMethods().catch(console.error)