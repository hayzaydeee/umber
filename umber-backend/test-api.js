const axios = require('axios');

// Test configuration
const BASE_URL = 'http://localhost:5000/api';
let authToken = '';
let testUserId = '';

// Test user data
const testUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  password: 'testPassword123'
};

// Test data
const testUmber = {
  name: 'My Books Collection',
  description: 'All my favorite books',
  icon: '📚',
  color: '#8B4513',
  category: 'Literature'
};

const testNest = {
  name: 'Fiction Books',
  description: 'My fiction book collection',
  icon: '📖',
  category: 'Fiction'
};

const testItem = {
  name: 'The Great Gatsby',
  description: 'Classic American novel by F. Scott Fitzgerald',
  price: 12.99,
  currency: 'USD',
  category: 'Fiction',
  brand: 'Scribner',
  condition: 'New'
};

async function runTests() {
  console.log('🚀 Starting Umber Backend API Tests...\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing health check...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check passed:', healthResponse.data);

    // Test 2: User Registration
    console.log('\n2️⃣ Testing user registration...');
    const registerResponse = await axios.post(`${BASE_URL}/auth/register`, testUser);
    authToken = registerResponse.data.token;
    console.log('✅ Registration successful');

    // Test 3: User Login
    console.log('\n3️⃣ Testing user login...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: testUser.email,
      password: testUser.password
    });
    authToken = loginResponse.data.token;
    console.log('✅ Login successful');

    // Set authorization header for subsequent requests
    const authHeaders = { headers: { Authorization: `Bearer ${authToken}` } };

    // Test 4: Get User Profile
    console.log('\n4️⃣ Testing get user profile...');
    const profileResponse = await axios.get(`${BASE_URL}/users/profile`, authHeaders);
    testUserId = profileResponse.data.user._id;
    console.log('✅ Profile retrieved:', profileResponse.data.user.firstName);

    // Test 5: Create Umber
    console.log('\n5️⃣ Testing create umber...');
    const umberResponse = await axios.post(`${BASE_URL}/umbers`, testUmber, authHeaders);
    const createdUmber = umberResponse.data.umber;
    console.log('✅ Umber created:', createdUmber.name);

    // Test 6: Get Umbers
    console.log('\n6️⃣ Testing get umbers...');
    const umbersResponse = await axios.get(`${BASE_URL}/umbers`, authHeaders);
    console.log('✅ Umbers retrieved:', umbersResponse.data.count, 'umbers');

    // Test 7: Create Nest
    console.log('\n7️⃣ Testing create nest...');
    const nestData = { ...testNest, umberId: createdUmber._id };
    const nestResponse = await axios.post(`${BASE_URL}/nests`, nestData, authHeaders);
    const createdNest = nestResponse.data.nest;
    console.log('✅ Nest created:', createdNest.name);

    // Test 8: Get Nests for Umber
    console.log('\n8️⃣ Testing get nests for umber...');
    const nestsResponse = await axios.get(`${BASE_URL}/nests/umber/${createdUmber._id}`, authHeaders);
    console.log('✅ Nests retrieved:', nestsResponse.data.count, 'nests');

    // Test 9: Create Item
    console.log('\n9️⃣ Testing create item...');
    const itemData = { 
      ...testItem, 
      umberId: createdUmber._id, 
      nestId: createdNest._id 
    };
    const itemResponse = await axios.post(`${BASE_URL}/items`, itemData, authHeaders);
    const createdItem = itemResponse.data.item;
    console.log('✅ Item created:', createdItem.name);

    // Test 10: Get Items for Nest
    console.log('\n🔟 Testing get items for nest...');
    const itemsResponse = await axios.get(`${BASE_URL}/items/nest/${createdNest._id}`, authHeaders);
    console.log('✅ Items retrieved:', itemsResponse.data.count, 'items');

    // Test 11: Create Item from URL
    console.log('\n1️⃣1️⃣ Testing create item from URL...');
    const urlItemData = {
      url: 'https://www.amazon.com/dp/B08N5WRWNW',
      umberId: createdUmber._id,
      nestId: createdNest._id
    };
    const urlItemResponse = await axios.post(`${BASE_URL}/items/from-url`, urlItemData, authHeaders);
    console.log('✅ URL item created:', urlItemResponse.data.item.name);

    // Test 12: Dashboard Overview
    console.log('\n1️⃣2️⃣ Testing dashboard overview...');
    const dashboardResponse = await axios.get(`${BASE_URL}/dashboard/overview`, authHeaders);
    console.log('✅ Dashboard overview:', JSON.stringify(dashboardResponse.data.overview.counts, null, 2));

    // Test 13: Search Functionality
    console.log('\n1️⃣3️⃣ Testing search...');
    const searchResponse = await axios.get(`${BASE_URL}/dashboard/search/book`, authHeaders);
    console.log('✅ Search results:', searchResponse.data.counts);

    // Test 14: Mind Map Data
    console.log('\n1️⃣4️⃣ Testing mind map data...');
    const mindMapResponse = await axios.get(`${BASE_URL}/dashboard/mindmap`, authHeaders);
    console.log('✅ Mind map data:', mindMapResponse.data.totalUmbers, 'umbers,', mindMapResponse.data.totalNests, 'nests');

    // Test 15: User Stats
    console.log('\n1️⃣5️⃣ Testing user stats...');
    const statsResponse = await axios.get(`${BASE_URL}/users/stats`, authHeaders);
    console.log('✅ User stats:', JSON.stringify(statsResponse.data.stats, null, 2));

    console.log('\n🎉 All tests passed! Backend is working correctly.');

  } catch (error) {
    console.error('\n❌ Test failed:', error.response?.data || error.message);
    
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

// Helper function to check if server is running
async function checkServerHealth() {
  try {
    const response = await axios.get(`${BASE_URL}/health`);
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

// Main execution
async function main() {
  console.log('Checking if server is running...');
  
  const isServerRunning = await checkServerHealth();
  
  if (!isServerRunning) {
    console.log('❌ Server is not running. Please start the server first:');
    console.log('   cd umber-backend');
    console.log('   npm run dev');
    return;
  }

  await runTests();
}

main();
