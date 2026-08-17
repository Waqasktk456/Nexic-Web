// =============================================
// API Configuration with Caching
// =============================================

const API_BASE_URL = 'https://nexic-web.onrender.com';

const API = {
  BASE_URL: API_BASE_URL,
  AUTH: {
    SIGNUP: `${API_BASE_URL}/api/auth/signup`,
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    VERIFY: `${API_BASE_URL}/api/auth/verify`,
    RESEND_OTP: `${API_BASE_URL}/api/auth/resend-otp`,
  },
  TEAM: {
    GET_ALL: `${API_BASE_URL}/api/team`,
    GET_ONE: (id) => `${API_BASE_URL}/api/team/${id}`,
    CREATE: `${API_BASE_URL}/api/team`,
    UPDATE: (id) => `${API_BASE_URL}/api/team/${id}`,
    DELETE: (id) => `${API_BASE_URL}/api/team/${id}`,
  },
  WEBSITES: {
    GET_ALL: `${API_BASE_URL}/api/websites`,
    GET_ONE: (id) => `${API_BASE_URL}/api/websites/${id}`,
    CREATE: `${API_BASE_URL}/api/websites`,
    UPDATE: (id) => `${API_BASE_URL}/api/websites/${id}`,
    DELETE: (id) => `${API_BASE_URL}/api/websites/${id}`,
  }
};

// Simple cache implementation
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const cache = new Map();

API.cachedFetch = async function(url, options = {}) {
  const cacheKey = url + JSON.stringify(options);
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
  
  const data = await response.json();
  cache.set(cacheKey, { data, timestamp: Date.now() });
  
  return data;
};

window.API = API;
