import { apiClient } from './client';

export const magicAuthAPI = {
  // Send magic link to email
  sendMagicLink: async ({ email, name }) => {
    const response = await apiClient.post('/magic-auth/send-magic-link', {
      email,
      name
    });
    return response.data;
  },

  // Check if email already exists (for UX)
  checkEmail: async (email) => {
    const response = await apiClient.post('/magic-auth/check-email', {
      email
    });
    return response.data;
  },

  // Get user profile (existing)
  getProfile: async () => {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },

  // Logout (clear token)
  logout: () => {
    localStorage.removeItem('token');
  }
};
