import { useState, useEffect, useCallback } from 'react';
import { dashboardApi } from '../api/dashboard';

// Global refresh trigger for mind map data
let globalRefreshTrigger = 0;
export const triggerMindMapRefresh = () => {
  globalRefreshTrigger += 1;
  // Dispatch a custom event for components to listen to
  window.dispatchEvent(new CustomEvent('mindMapRefresh'));
};

/**
 * useMindMapData - Custom hook for managing mind map data
 * 
 * Features:
 * - Fetches mind map data from the dashboard API
 * - Handles loading states and error handling
 * - Provides refresh capability
 * - Integrates with existing API infrastructure
 * - Optimized for React Flow consumption
 */
export function useMindMapData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch mind map data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await dashboardApi.getMindMapData();
      
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error || 'Failed to fetch mind map data');
      }
    } catch (err) {
      console.error('Mind map data fetch error:', err);
      setError(err.message || 'Network error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  // Refresh data function
  const refreshData = useCallback(() => {
    fetchData();
  }, [fetchData]);

  // Initial data fetch and listen for refresh events
  useEffect(() => {
    fetchData();
    
    // Listen for global refresh events
    const handleRefresh = () => fetchData();
    window.addEventListener('mindMapRefresh', handleRefresh);
    
    return () => {
      window.removeEventListener('mindMapRefresh', handleRefresh);
    };
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refreshData,
  };
}
