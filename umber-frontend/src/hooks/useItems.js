import { useState, useEffect, useCallback } from 'react';
import { itemsApi } from '../api';

export const useItems = (nestId, umberId) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch items for specific nest or umber
  const fetchItems = useCallback(async () => {
    if (!nestId && !umberId) {
      setItems([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      let response;
      if (nestId) {
        response = await itemsApi.getItemsByNest(nestId);
      } else {
        response = await itemsApi.getItemsByUmber(umberId);
      }
      
      setItems(response.items || []);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch items:', err);
    } finally {
      setLoading(false);
    }
  }, [nestId, umberId]);

  // Create new item
  const createItem = useCallback(async (itemData) => {
    try {
      const response = await itemsApi.createItem({
        ...itemData,
        nestId,
        umberId
      });
      setItems(prev => [response.item, ...prev]);
      return response.item;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [nestId, umberId]);

  // Create item from URL
  const createItemFromUrl = useCallback(async (urlData) => {
    try {
      const response = await itemsApi.createItemFromUrl({
        ...urlData,
        nestId,
        umberId
      });
      setItems(prev => [response.item, ...prev]);
      return response.item;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [nestId, umberId]);

  // Update item
  const updateItem = useCallback(async (id, itemData) => {
    try {
      const response = await itemsApi.updateItem(id, itemData);
      setItems(prev => 
        prev.map(item => 
          item._id === id ? response.item : item
        )
      );
      return response.item;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Delete item
  const deleteItem = useCallback(async (id) => {
    try {
      await itemsApi.deleteItem(id);
      setItems(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Update item reflection
  const updateReflection = useCallback(async (id, reflection) => {
    try {
      const response = await itemsApi.updateItemReflection(id, reflection);
      setItems(prev => 
        prev.map(item => 
          item._id === id ? { ...item, userReflection: reflection } : item
        )
      );
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Search items
  const searchItems = useCallback(async (query) => {
    if (!umberId) return [];
    
    try {
      const response = await itemsApi.searchItems(umberId, query);
      return response.items || [];
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [umberId]);

  // Get item by ID from current state
  const getItemById = useCallback((id) => {
    return items.find(item => item._id === id);
  }, [items]);

  // Refresh data
  const refresh = useCallback(() => {
    fetchItems();
  }, [fetchItems]);

  // Load data when nestId or umberId changes
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return {
    items,
    loading,
    error,
    createItem,
    createItemFromUrl,
    updateItem,
    deleteItem,
    updateReflection,
    searchItems,
    getItemById,
    refresh
  };
};
