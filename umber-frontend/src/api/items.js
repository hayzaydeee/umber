import apiClient, { handleApiResponse, handleApiError } from './client';

export const itemsApi = {
  // Get all items for a nest
  getItemsByNest: async (nestId) => {
    try {
      const response = await apiClient.get(`/items/nest/${nestId}`);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get all items for an umber
  getItemsByUmber: async (umberId) => {
    try {
      const response = await apiClient.get(`/items/umber/${umberId}`);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get single item by ID
  getItem: async (id) => {
    try {
      const response = await apiClient.get(`/items/${id}`);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Create new item
  createItem: async (itemData) => {
    try {
      const response = await apiClient.post('/items', itemData);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Create item from URL (with scraping)
  createItemFromUrl: async (urlData) => {
    try {
      const response = await apiClient.post('/items/from-url', urlData);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Update item
  updateItem: async (id, itemData) => {
    try {
      const response = await apiClient.patch(`/items/${id}`, itemData);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Delete item (soft delete)
  deleteItem: async (id) => {
    try {
      const response = await apiClient.delete(`/items/${id}`);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Search items within an umber
  searchItems: async (umberId, query) => {
    try {
      const response = await apiClient.get(`/items/umber/${umberId}/search/${encodeURIComponent(query)}`);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get item price history
  getItemPriceHistory: async (id) => {
    try {
      const response = await apiClient.get(`/items/${id}/price-history`);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Update item reflection
  updateItemReflection: async (id, reflection) => {
    try {
      const response = await apiClient.patch(`/items/${id}/reflection`, {
        userReflection: reflection
      });
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  }
};
