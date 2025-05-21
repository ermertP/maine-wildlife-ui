// src/dataProvider.ts
import { fetchUtils } from 'ra-core';
import simpleRestProvider from 'ra-data-simple-rest';

// Point directly at your Express server:
const API_URL = 'http://localhost:5000';

console.log('React-Admin REST base URL:', API_URL);

const dataProvider = simpleRestProvider(
  API_URL,
  fetchUtils.fetchJson,
  'X-Total-Count'
);

export default dataProvider;