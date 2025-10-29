import apiClient, { handleApiResponse, handleApiError, setAuthToken } from './client';

export const authApi = {
  // Send magic link (replaces both register and login)
  sendMagicLink: async (email, name = null) => {
    try {
      const response = await apiClient.post('/magic-auth/send-magic-link', { 
        email, 
        name 
      });
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Verify magic link token
  verifyMagicLink: async (token) => {
    try {
      const response = await apiClient.post('/magic-auth/verify-magic-link', { 
        token 
      });
      const data = handleApiResponse(response);
      
      // Set auth token if verification is successful
      if (data.authToken) {
        setAuthToken(data.authToken);
      }
      
      return data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Legacy register method (for compatibility) - now uses magic links
  register: async (userData) => {
    try {
      const { email, name } = userData;
      const response = await apiClient.post('/magic-auth/send-magic-link', { 
        email, 
        name 
      });
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Legacy login method (for compatibility) - now uses magic links  
  login: async (credentials) => {
    try {
      const { email } = credentials;
      const response = await apiClient.post('/magic-auth/send-magic-link', { 
        email 
      });
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Logout user
  logout: () => {
    setAuthToken(null);
    return Promise.resolve();
  },

  // Get current user profile
  getProfile: async () => {
    try {
      const response = await apiClient.get('/users/profile');
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.patch('/users/profile', profileData);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Update onboarding progress
  updateOnboardingProgress: async (stage, sessionId, metadata = {}) => {
    try {
      const response = await apiClient.patch('/auth/onboarding', {
        stage,
        sessionId,
        metadata
      });
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get onboarding status
  getOnboardingStatus: async () => {
    try {
      const response = await apiClient.get('/users/onboarding');
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Reset onboarding (for testing)
  resetOnboarding: async () => {
    try {
      const response = await apiClient.post('/users/onboarding/reset');
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Update user preferences
  updatePreferences: async (preferences) => {
    try {
      const response = await apiClient.patch('/users/preferences', { preferences });
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get user statistics
  getUserStats: async () => {
    try {
      const response = await apiClient.get('/users/stats');
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('umber_token');
  },

  // Set auth token (exposed from client)
  setAuthToken: (token) => {
    setAuthToken(token);
  }
};
