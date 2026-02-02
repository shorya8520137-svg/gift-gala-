// Detailed API Test with better error handling
const https = require('https');
const http = require('http');

const API_BASE_URL = 'https://54.169.31.95:8443/api/website';

// Test function with detailed diagnostics
async function detailedAPITest() {
  console.log('🔍 Detailed API Diagnostics for Gift Gala\n');
  console.log(`Testing server: ${API_BASE_URL}\n`);

  // Test 1: Basic connectivity test
  console.log('1. Testing basic server connectivity...');
  
  try {
    // Create a custom agent that ignores SSL certificate errors (for testing)
    const agent = new https.Agent({
      rejectUnauthorized: false
    });

    const response = await fetch(API_BASE_URL, {
      method: 'GET',
      agent: agent,
      timeout: 10000
    });
    
    console.log(`✅ Server responded with status: ${response.status}`);
    console.log(`✅ Content-Type: ${response.headers.get('content-type')}`);
    
    const text = await response.text();
    console.log(`✅ Response preview: ${text.substring(0, 200)}...`);
    
  } catch (error) {
    console.log(`❌ Connection failed: ${error.message}`);
    console.log(`❌ Error code: ${error.code || 'Unknown'}`);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('🔍 Diagnosis: Server is not running or not accepting connections');
    } else if (error.message.includes('ENOTFOUND')) {
      console.log('🔍 Diagnosis: DNS resolution failed - server address not found');
    } else if (error.message.includes('ETIMEDOUT')) {
      console.log('🔍 Diagnosis: Connection timed out - server might be slow or blocked');
    } else if (error.message.includes('certificate')) {
      console.log('🔍 Diagnosis: SSL certificate issue');
    }
  }

  // Test 2: Try different endpoints
  const endpoints = [
    '/products',
    '/categories', 
    '/orders',
    '/cart',
    '/products/featured'
  ];

  console.log('\n2. Testing individual endpoints...');
  
  for (const endpoint of endpoints) {
    try {
      console.log(`\nTesting: ${API_BASE_URL}${endpoint}`);
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        timeout: 5000
      });
      
      console.log(`  Status: ${response.status}`);
      console.log(`  Content-Type: ${response.headers.get('content-type')}`);
      
      if (response.status === 200) {
        try {
          const data = await response.json();
          console.log(`  ✅ JSON Response: ${JSON.stringify(data).substring(0, 100)}...`);
        } catch (e) {
          console.log(`  ⚠️  Response is not valid JSON`);
        }
      } else if (response.status === 404) {
        console.log(`  ❌ Endpoint not found (404)`);
      } else if (response.status === 401) {
        console.log(`  🔐 Authentication required (401)`);
      } else {
        console.log(`  ⚠️  Unexpected status code`);
      }
      
    } catch (error) {
      console.log(`  ❌ Error: ${error.message}`);
    }
  }

  // Test 3: Check if it's a CORS issue
  console.log('\n3. Testing CORS headers...');
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'OPTIONS'
    });
    
    console.log(`CORS preflight status: ${response.status}`);
    console.log(`Access-Control-Allow-Origin: ${response.headers.get('access-control-allow-origin')}`);
    console.log(`Access-Control-Allow-Methods: ${response.headers.get('access-control-allow-methods')}`);
    
  } catch (error) {
    console.log(`CORS test failed: ${error.message}`);
  }

  // Summary and recommendations
  console.log('\n📋 DIAGNOSTIC SUMMARY:');
  console.log('======================');
  console.log('Based on the test results above:');
  console.log('');
  console.log('If all tests failed with connection errors:');
  console.log('  - The server at 54.169.31.95:8443 might be down');
  console.log('  - Check if the server is running');
  console.log('  - Verify firewall settings');
  console.log('  - Confirm the correct IP address and port');
  console.log('');
  console.log('If server responds but endpoints return 404:');
  console.log('  - The API endpoints are not implemented yet');
  console.log('  - Need to implement /orders, /cart endpoints on backend');
  console.log('  - Check ORDER_API_DOCUMENTATION.md for implementation details');
  console.log('');
  console.log('If CORS errors occur:');
  console.log('  - Backend needs CORS configuration');
  console.log('  - Add appropriate Access-Control headers');
}

// Run the detailed test
detailedAPITest().catch(console.error);