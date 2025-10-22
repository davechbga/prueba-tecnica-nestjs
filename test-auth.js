const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testAuth() {
  try {
    console.log('🔍 Probando autenticación...\n');

    // 1. Hacer login
    console.log('1. Haciendo login...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'test@ejemplo.com',
      password: 'password123'
    });

    console.log('✅ Login exitoso:', loginResponse.data);
    const token = loginResponse.data.access_token;
    console.log('🔑 Token obtenido:', token.substring(0, 50) + '...\n');

    // 2. Probar endpoint de prueba /auth/test
    console.log('2. Probando /auth/test con token...');
    try {
      const testResponse = await axios.get(`${BASE_URL}/auth/test`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('✅ /auth/test exitoso:', testResponse.data);
    } catch (error) {
      console.log('❌ /auth/test falló:', error.response?.data || error.message);
    }

    // 3. Probar endpoint /rooms con token
    console.log('\n3. Probando /rooms con token...');
    try {
      const roomsResponse = await axios.get(`${BASE_URL}/rooms`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('✅ /rooms exitoso:', roomsResponse.data);
    } catch (error) {
      console.log('❌ /rooms falló:', error.response?.data || error.message);
    }

    // 4. Probar endpoint /reservations con token
    console.log('\n4. Probando /reservations/user con token...');
    try {
      const reservationsResponse = await axios.get(`${BASE_URL}/reservations/user`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('✅ /reservations exitoso:', reservationsResponse.data);
    } catch (error) {
      console.log('❌ /reservations falló:', error.response?.data || error.message);
    }

  } catch (error) {
    console.error('❌ Error general:', error.response?.data || error.message);
  }
}

testAuth();
