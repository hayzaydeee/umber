import apiClient, { handleApiResponse, handleApiError } from './client';

export const nestsApi = {
  // Get all nests for an umber
  getNestsByUmber: async (umberId) => {
    try {
      const response = await apiClient.get(`/nests/umber/${umberId}`);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get single nest by ID
  getNest: async (id) => {
    try {
      const response = await apiClient.get(`/nests/${id}`);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Create new nest
  createNest: async (nestData) => {
    try {
      const response = await apiClient.post('/nests', nestData);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Update nest
  updateNest: async (id, nestData) => {
    try {
      const response = await apiClient.patch(`/nests/${id}`, nestData);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Delete nest (soft delete)
  deleteNest: async (id) => {
    try {
      const response = await apiClient.delete(`/nests/${id}`);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Search nests within an umber
  searchNests: async (umberId, query) => {
    try {
      const response = await apiClient.get(`/nests/umber/${umberId}/search/${encodeURIComponent(query)}`);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get nest statistics
  getNestStats: async (id) => {
    try {
      const response = await apiClient.get(`/nests/${id}/stats`);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  }
};
