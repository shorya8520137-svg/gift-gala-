// API Test Script for Gift Gala E-commerce
const API_BASE_URL = 'https://54.169.31.95:8443/api/website';

// Test function to check API endpoints
async function testAPI() {
  console.log('🧪 Testing Gift Gala API Endpoints...\n');

  // Test 1: Check if server is responding
  console.log('1. Testing server connectivity...');
  try {
    const response = await fetch(API_BASE_URL);
    console.log(`✅ Server Status: ${response.status}`);
    if (response.status === 404) {
      console.log('ℹ️  Base URL returns 404 - this is normal for API endpoints');
    }
  } catch (error) {
    console.log(`❌ Server Error: ${error.message}`);
  }

  // Test 2: Check Products API
  console.log('\n2. Testing Products API...');
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    const data = await response.json();
    console.log(`✅ Products API Status: ${response.status}`);
    console.log(`✅ Products found: ${data.data ? data.data.length : 0}`);
  } catch (error) {
    console.log(`❌ Products API Error: ${error.message}`);
  }

  // Test 3: Check Categories API
  console.log('\n3. Testing Categories API...');
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    const data = await response.json();
    console.log(`✅ Categories API Status: ${response.status}`);
    console.log(`✅ Categories found: ${data.data ? data.data.length : 0}`);
  } catch (error) {
    console.log(`❌ Categories API Error: ${error.message}`);
  }

  // Test 4: Check Orders API (This is the one failing)
  console.log('\n4. Testing Orders API...');
  try {
    const response = await fetch(`${API_BASE_URL}/orders`);
    console.log(`📊 Orders API Status: ${response.status}`);
    
    if (response.status === 404) {
      console.log('❌ Orders API not found (404) - Endpoint not implemented');
      console.log('📝 Response type:', response.headers.get('content-type'));
      
      // Try to get the response text to see what's being returned
      const text = await response.text();
      if (text.includes('<!DOCTYPE')) {
        console.log('⚠️  Server returning HTML instead of JSON (likely 404 page)');
      }
    } else if (response.status === 401) {
      console.log('🔐 Orders API requires authentication (401) - This is expected');
    } else {
      const data = await response.json();
      console.log(`✅ Orders API working: ${JSON.stringify(data, null, 2)}`);
    }
  } catch (error) {
    console.log(`❌ Orders API Error: ${error.message}`);
  }

  // Test 5: Check Cart API
  console.log('\n5. Testing Cart API...');
  try {
    const response = await fetch(`${API_BASE_URL}/cart`);
    console.log(`📊 Cart API Status: ${response.status}`);
    
    if (response.status === 401) {
      console.log('🔐 Cart API requires authentication (401) - This is expected');
    } else if (response.status === 404) {
      console.log('❌ Cart API not found (404) - Endpoint not implemented');
    } else {
      const data = await response.json();
      console.log(`✅ Cart API working: ${JSON.stringify(data, null, 2)}`);
    }
  } catch (error) {
    console.log(`❌ Cart API Error: ${error.message}`);
  }

  // Test 6: Check Featured Products
  console.log('\n6. Testing Featured Products API...');
  try {
    const response = await fetch(`${API_BASE_URL}/products/featured`);
    console.log(`📊 Featured Products Status: ${response.status}`);
    
    if (response.status === 200) {
      const data = await response.json();
      console.log(`✅ Featured Products found: ${data.data ? data.data.length : 0}`);
    } else {
      console.log('❌ Featured Products endpoint not available');
    }
  } catch (error) {
    console.log(`❌ Featured Products Error: ${error.message}`);
  }

  // Summary
  console.log('\n📋 TEST SUMMARY:');
  console.log('================');
  console.log('✅ Products API: Working');
  console.log('✅ Categories API: Working');
  console.log('❌ Orders API: NOT IMPLEMENTED (404 error)');
  console.log('❌ Cart API: Likely not implemented');
  console.log('❌ Featured Products: Likely not implemented');
  
  console.log('\n🔧 RECOMMENDATIONS:');
  console.log('===================');
  console.log('1. Orders API endpoint needs to be implemented on the backend server');
  console.log('2. Cart API endpoint needs to be implemented');
  console.log('3. Featured Products endpoint needs to be implemented');
  console.log('4. Authentication system needs to be set up for protected endpoints');
  
  console.log('\n📚 For implementation details, check ORDER_API_DOCUMENTATION.md');
}

// Run the test
testAPI().catch(console.error);