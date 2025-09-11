import apiClient, { handleApiResponse, handleApiError, setAuthToken } from './client';

export const authApi = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await apiClient.post('/auth/register', userData);
      const data = handleApiResponse(response);
      
      // Set auth token if registration is successful
      if (data.token) {
        setAuthToken(data.token);
      }
      
      return data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      const data = handleApiResponse(response);
      
      // Set auth token if login is successful
      if (data.token) {
        setAuthToken(data.token);
      }
      
      return data;
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
  }
};
