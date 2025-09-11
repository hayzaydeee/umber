import apiClient, { handleApiResponse, handleApiError } from './client';

export const dashboardApi = {
  // Get dashboard overview
  getOverview: async () => {
    try {
      const response = await apiClient.get('/dashboard/overview');
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get umbers with their stats for dashboard
  getDashboardUmbers: async () => {
    try {
      const response = await apiClient.get('/dashboard/umbers');
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get mind map data
  getMindMapData: async () => {
    try {
      const response = await apiClient.get('/dashboard/mindmap');
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get activity feed
  getActivity: async (limit = 20, skip = 0) => {
    try {
      const response = await apiClient.get('/dashboard/activity', {
        params: { limit, skip }
      });
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Global search across all content
  globalSearch: async (query) => {
    try {
      const response = await apiClient.get(`/dashboard/search/${encodeURIComponent(query)}`);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get onboarding dashboard data
  getOnboardingDashboard: async () => {
    try {
      const response = await apiClient.get('/dashboard/onboarding');
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  }
};
