import { useState, useEffect, useCallback } from 'react';
import { dashboardApi } from '../api';

export const useDashboard = () => {
  const [overview, setOverview] = useState(null);
  const [umbers, setUmbers] = useState([]);
  const [mindMapData, setMindMapData] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard overview
  const fetchOverview = useCallback(async () => {
    try {
      const response = await dashboardApi.getOverview();
      setOverview(response.overview);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch dashboard overview:', err);
    }
  }, []);

  // Fetch dashboard umbers
  const fetchDashboardUmbers = useCallback(async () => {
    try {
      const response = await dashboardApi.getDashboardUmbers();
      setUmbers(response.umbers || []);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch dashboard umbers:', err);
    }
  }, []);

  // Fetch mind map data
  const fetchMindMapData = useCallback(async () => {
    try {
      const response = await dashboardApi.getMindMapData();
      setMindMapData(response);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch mind map data:', err);
    }
  }, []);

  // Fetch activity feed
  const fetchActivity = useCallback(async (limit = 20, skip = 0) => {
    try {
      const response = await dashboardApi.getActivity(limit, skip);
      if (skip === 0) {
        setActivity(response.activities || []);
      } else {
        setActivity(prev => [...prev, ...(response.activities || [])]);
      }
      return response;
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch activity:', err);
      throw err;
    }
  }, []);

  // Global search
  const globalSearch = useCallback(async (query) => {
    try {
      const response = await dashboardApi.globalSearch(query);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Fetch onboarding dashboard
  const fetchOnboardingDashboard = useCallback(async () => {
    try {
      const response = await dashboardApi.getOnboardingDashboard();
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Fetch all dashboard data
  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      await Promise.all([
        fetchOverview(),
        fetchDashboardUmbers(),
        fetchMindMapData(),
        fetchActivity()
      ]);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  }, [fetchOverview, fetchDashboardUmbers, fetchMindMapData, fetchActivity]);

  // Refresh all data
  const refresh = useCallback(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Load more activity
  const loadMoreActivity = useCallback(async () => {
    try {
      const currentCount = activity.length;
      await fetchActivity(20, currentCount);
    } catch (err) {
      console.error('Failed to load more activity:', err);
    }
  }, [activity.length, fetchActivity]);

  // Load data on mount
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    overview,
    umbers,
    mindMapData,
    activity,
    loading,
    error,
    globalSearch,
    fetchOnboardingDashboard,
    refresh,
    loadMoreActivity
  };
};
