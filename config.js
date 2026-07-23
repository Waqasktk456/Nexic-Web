// =============================================
// API Configuration
// Change API_BASE_URL here to update everywhere
// =============================================

const API_BASE_URL = 'https://nexic-web.onrender.com'; // Render production URL


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

// Export for use in other files
window.API = API;
