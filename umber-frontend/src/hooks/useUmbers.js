import { useState, useEffect, useCallback } from 'react';
import { umbersApi } from '../api';

export const useUmbers = () => {
  const [umbers, setUmbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all umbers
  const fetchUmbers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await umbersApi.getUmbers();
      setUmbers(response.umbers || []);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch umbers:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new umber
  const createUmber = useCallback(async (umberData) => {
    try {
      const response = await umbersApi.createUmber(umberData);
      setUmbers(prev => [response.umber, ...prev]);
      return response.umber;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Update umber
  const updateUmber = useCallback(async (id, umberData) => {
    try {
      const response = await umbersApi.updateUmber(id, umberData);
      setUmbers(prev => 
        prev.map(umber => 
          umber._id === id ? response.umber : umber
        )
      );
      return response.umber;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Delete umber
  const deleteUmber = useCallback(async (id) => {
    try {
      await umbersApi.deleteUmber(id);
      setUmbers(prev => prev.filter(umber => umber._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Search umbers
  const searchUmbers = useCallback(async (query) => {
    try {
      const response = await umbersApi.searchUmbers(query);
      return response.umbers || [];
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Update mind map position
  const updateMindMapPosition = useCallback(async (id, position) => {
    try {
      const response = await umbersApi.updateMindMapPosition(id, position);
      setUmbers(prev => 
        prev.map(umber => 
          umber._id === id ? { ...umber, mindMapPosition: position } : umber
        )
      );
      return response.umber;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Get umber by ID from current state
  const getUmberById = useCallback((id) => {
    return umbers.find(umber => umber._id === id);
  }, [umbers]);

  // Refresh data
  const refresh = useCallback(() => {
    fetchUmbers();
  }, [fetchUmbers]);

  // Load data on mount
  useEffect(() => {
    fetchUmbers();
  }, [fetchUmbers]);

  return {
    umbers,
    loading,
    error,
    createUmber,
    updateUmber,
    deleteUmber,
    searchUmbers,
    updateMindMapPosition,
    getUmberById,
    refresh
  };
};
