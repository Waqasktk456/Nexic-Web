// =============================================
// API Configuration
// Change API_BASE_URL here to update everywhere
// =============================================

const API_BASE_URL = 'http://localhost:5000';

const API = {
  BASE_URL: API_BASE_URL,
  AUTH: {
    SIGNUP: `${API_BASE_URL}/api/auth/signup`,
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    VERIFY: `${API_BASE_URL}/api/auth/verify`,
    RESEND_OTP: `${API_BASE_URL}/api/auth/resend-otp`,
  }
};

// Export for use in other files
window.API = API;
