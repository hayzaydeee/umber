import { useState, useEffect, useCallback } from 'react';
import { nestsApi } from '../api';

export const useNests = (umberId) => {
  const [nests, setNests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch nests for specific umber
  const fetchNests = useCallback(async () => {
    if (!umberId) {
      setNests([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await nestsApi.getNestsByUmber(umberId);
      setNests(response.nests || []);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch nests:', err);
    } finally {
      setLoading(false);
    }
  }, [umberId]);

  // Create new nest
  const createNest = useCallback(async (nestData) => {
    try {
      const response = await nestsApi.createNest({
        ...nestData,
        umberId
      });
      setNests(prev => [response.nest, ...prev]);
      return response.nest;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [umberId]);

  // Update nest
  const updateNest = useCallback(async (id, nestData) => {
    try {
      const response = await nestsApi.updateNest(id, nestData);
      setNests(prev => 
        prev.map(nest => 
          nest._id === id ? response.nest : nest
        )
      );
      return response.nest;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Delete nest
  const deleteNest = useCallback(async (id) => {
    try {
      await nestsApi.deleteNest(id);
      setNests(prev => prev.filter(nest => nest._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Search nests
  const searchNests = useCallback(async (query) => {
    if (!umberId) return [];
    
    try {
      const response = await nestsApi.searchNests(umberId, query);
      return response.nests || [];
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [umberId]);

  // Get nest by ID from current state
  const getNestById = useCallback((id) => {
    return nests.find(nest => nest._id === id);
  }, [nests]);

  // Refresh data
  const refresh = useCallback(() => {
    fetchNests();
  }, [fetchNests]);

  // Load data when umberId changes
  useEffect(() => {
    fetchNests();
  }, [fetchNests]);

  return {
    nests,
    loading,
    error,
    createNest,
    updateNest,
    deleteNest,
    searchNests,
    getNestById,
    refresh
  };
};
