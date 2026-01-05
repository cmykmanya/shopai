const fetch = require('node-fetch');

async function testAuth() {
  try {
    const response = await fetch('http://localhost:3000/api/auth/callback/credentials?callbackUrl=/&json=true', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@example.com',
        password: 'password',
        redirect: false
      }),
    });
    
    const data = await response.json();
    console.log('Response:', data);
    
    if (response.ok) {
      console.log('Authentication successful!');
      console.log('Session token:', data);
    } else {
      console.log('Authentication failed:', data);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

testAuth();