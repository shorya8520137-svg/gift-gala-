// Debug script to test API authentication
const API_BASE_URL = 'https://54.169.31.95:8443/api/website'
const ACCESS_TOKEN = 'wk_live_3c6930a44febffade97a5e1a00e4db23a0dc552e3bf8a55800c1f3fd1f03de37'

async function debugAPI() {
  console.log('🔍 Debugging API Authentication...\n')
  
  const testOrderData = {
    cartItems: [
      {
        productId: "1",
        quantity: 1,
        customization: {}
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
      city: "Test City",
      state: "TS",
      postalCode: "12345",
      country: "US"
    },
    payment: {
      method: "credit_card",
      transactionId: `debug_${Date.now()}`,
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

  // Test different authentication methods
  const authMethods = [
    {
      name: 'Authorization Bearer',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      }
    },
    {
      name: 'X-API-Key',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': ACCESS_TOKEN
      }
    },
    {
      name: 'Both Headers',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'X-API-Key': ACCESS_TOKEN
      }
    }
  ]

  for (const method of authMethods) {
    console.log(`Testing: ${method.name}`)
    console.log('Headers:', JSON.stringify(method.headers, null, 2))
    
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: method.headers,
        body: JSON.stringify(testOrderData)
      })
      
      console.log(`Status: ${response.status} ${response.statusText}`)
      
      const responseText = await response.text()
      console.log('Response:', responseText)
      
      try {
        const data = JSON.parse(responseText)
        console.log('Parsed:', data)
      } catch (e) {
        console.log('Could not parse as JSON')
      }
      
    } catch (error) {
      console.log('Error:', error.message)
    }
    
    console.log('---\n')
  }
}

debugAPI().catch(console.error)