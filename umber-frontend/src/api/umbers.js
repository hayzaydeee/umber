import apiClient, { handleApiResponse, handleApiError } from './client';

export const umbersApi = {
  // Get all user's umbers
  getUmbers: async () => {
    try {
      const response = await apiClient.get('/umbers');
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get single umber by ID
  getUmber: async (id) => {
    try {
      const response = await apiClient.get(`/umbers/${id}`);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Create new umber
  createUmber: async (umberData) => {
    try {
      const response = await apiClient.post('/umbers', umberData);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Update umber
  updateUmber: async (id, umberData) => {
    try {
      const response = await apiClient.patch(`/umbers/${id}`, umberData);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Delete umber (soft delete)
  deleteUmber: async (id) => {
    try {
      const response = await apiClient.delete(`/umbers/${id}`);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Search umbers
  searchUmbers: async (query) => {
    try {
      const response = await apiClient.get(`/umbers/search/${encodeURIComponent(query)}`);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get umber statistics
  getUmberStats: async (id) => {
    try {
      const response = await apiClient.get(`/umbers/${id}/stats`);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Update umber mind map position
  updateMindMapPosition: async (id, position) => {
    try {
      const response = await apiClient.patch(`/umbers/${id}`, {
        mindMapPosition: position
      });
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  }
};
