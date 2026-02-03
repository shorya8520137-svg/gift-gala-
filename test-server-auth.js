// Test script to verify server authentication requirements
const API_BASE_URL = 'https://54.169.31.95:8443/api/website'
const ACCESS_TOKEN = 'wk_live_3c6930a44febffade97a5e1a00e4db23a0dc552e3bf8a55800c1f3fd1f03de37'

async function testServerAuth() {
  console.log('🧪 Testing Server Authentication Requirements...\n')
  
  // Test different header formats
  const authFormats = [
    {
      name: 'X-API-Key (current)',
      headers: {
        'X-API-Key': ACCESS_TOKEN,
        'Content-Type': 'application/json'
      }
    },
    {
      name: 'Authorization Bearer',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    },
    {
      name: 'Authorization (no Bearer)',
      headers: {
        'Authorization': ACCESS_TOKEN,
        'Content-Type': 'application/json'
      }
    },
    {
      name: 'x-api-key (lowercase)',
      headers: {
        'x-api-key': ACCESS_TOKEN,
        'Content-Type': 'application/json'
      }
    },
    {
      name: 'API-Key',
      headers: {
        'API-Key': ACCESS_TOKEN,
        'Content-Type': 'application/json'
      }
    },
    {
      name: 'Token',
      headers: {
        'Token': ACCESS_TOKEN,
        'Content-Type': 'application/json'
      }
    },
    {
      name: 'Access-Token',
      headers: {
        'Access-Token': ACCESS_TOKEN,
        'Content-Type': 'application/json'
      }
    }
  ]

  // Test each format with categories endpoint
  for (const format of authFormats) {
    console.log(`Testing: ${format.name}`)
    console.log('Headers:', JSON.stringify(format.headers, null, 2))
    
    try {
      const response = await fetch(`${API_BASE_URL}/categories`, {
        method: 'GET',
        headers: format.headers
      })
      
      console.log(`Status: ${response.status} ${response.statusText}`)
      
      if (response.ok) {
        const data = await response.json()
        console.log('✅ SUCCESS! This format works.')
        console.log('Response:', data.success ? 'Valid JSON response' : 'Invalid response')
        console.log('---\n')
        return format // Return successful format
      } else {
        const errorText = await response.text()
        console.log('❌ Failed:', errorText)
      }
      
    } catch (error) {
      console.log('❌ Network Error:', error.message)
    }
    
    console.log('---\n')
  }
  
  console.log('🔍 All authentication formats failed. Server may require different token or format.')
}

// Test with products endpoint too
async function testProductsEndpoint() {
  console.log('\n🧪 Testing Products Endpoint...\n')
  
  const headers = {
    'X-API-Key': ACCESS_TOKEN,
    'Content-Type': 'application/json'
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/products?limit=5`, {
      headers
    })
    
    console.log(`Products Status: ${response.status} ${response.statusText}`)
    const responseText = await response.text()
    console.log('Products Response:', responseText)
    
  } catch (error) {
    console.log('Products Error:', error.message)
  }
}

// Run tests
testServerAuth()
  .then(() => testProductsEndpoint())
  .catch(console.error)