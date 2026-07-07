require('dotenv').config();
const axios = require('axios');

async function test() {
  const BASE = 'http://localhost:5000/api/admin';
  const testEmail = 'newuser_' + Date.now() + '@gmail.com';
  const testPassword = 'mypassword123';
  const testName = 'New User Test';

  console.log('=== Testing Register + Login with a brand new email ===\n');

  // 1. Register
  try {
    const res = await axios.post(`${BASE}/register`, { name: testName, email: testEmail, password: testPassword });
    console.log('✅ Register SUCCESS');
    console.log('   token returned:', res.data.token ? 'YES ✅' : 'NO ❌');
    console.log('   admin.id:', res.data.admin?.id ? 'YES ✅' : 'NO ❌');
  } catch (err) {
    console.log('❌ Register FAILED:', err.response?.data?.message || err.message);
    process.exit(1);
  }

  // 2. Login with same email
  try {
    const res = await axios.post(`${BASE}/login`, { email: testEmail, password: testPassword });
    console.log('\n✅ Login SUCCESS');
    console.log('   token returned:', res.data.token ? 'YES ✅' : 'NO ❌');
    console.log('   admin.name:', res.data.admin?.name);
    console.log('   admin.email:', res.data.admin?.email);
  } catch (err) {
    console.log('\n❌ Login FAILED:', err.response?.data?.message || err.message);
  }

  // 3. Test existing accounts
  console.log('\n=== Testing all existing admin logins ===\n');
  const accounts = [
    { email: 'admin@medislot.ai', password: 'admin123' },
    { email: 'sai@gmail.com', password: 'vemireddy' },
    { email: 'testadmin@example.com', password: 'Password123' },
  ];

  for (const acc of accounts) {
    try {
      const res = await axios.post(`${BASE}/login`, acc);
      console.log(`✅ ${acc.email} => Name: ${res.data.admin?.name}, Token: ${res.data.token ? 'YES' : 'NO'}`);
    } catch (err) {
      console.log(`❌ ${acc.email} => FAILED: ${err.response?.data?.message || err.message}`);
    }
  }

  // 4. Cleanup: delete the test account
  const connectDB = require('./config/db');
  const Admin = require('./models/Admin');
  await connectDB();
  await Admin.deleteOne({ email: testEmail });
  console.log('\nCleaned up test account.');
  process.exit(0);
}

test();
