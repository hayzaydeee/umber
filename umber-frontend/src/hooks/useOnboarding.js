import { useState, useEffect, useCallback } from 'react';
import { authApi } from '../api';
import { useAuth } from './useAuth';

export const useOnboarding = () => {
  const { user, updateOnboardingProgress: updateAuthProgress } = useAuth();
  const [onboardingData, setOnboardingData] = useState(null);
  const [currentSession, setCurrentSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Generate session ID for tracking onboarding flow
  const generateSessionId = useCallback(() => {
    return `onboarding_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Start new onboarding session
  const startOnboardingSession = useCallback(() => {
    const sessionId = generateSessionId();
    setCurrentSession(sessionId);
    return sessionId;
  }, [generateSessionId]);

  // Update onboarding progress
  const updateProgress = useCallback(async (stage, metadata = {}) => {
    if (!currentSession) {
      console.warn('No active onboarding session');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await updateAuthProgress(stage, currentSession, metadata);
      
      // Update local onboarding data
      setOnboardingData(prev => ({
        ...prev,
        onboardingProgress: response.onboardingProgress,
        isOnboardingComplete: response.isOnboardingComplete
      }));
      
      return response;
    } catch (err) {
      setError(err.message);
      console.error('Failed to update onboarding progress:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentSession, updateAuthProgress]);

  // Get onboarding status
  const fetchOnboardingStatus = useCallback(async () => {
    try {
      setLoading(true);
      const response = await authApi.getOnboardingStatus();
      setOnboardingData(response);
      return response;
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch onboarding status:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Reset onboarding (for testing)
  const resetOnboarding = useCallback(async () => {
    try {
      setLoading(true);
      await authApi.resetOnboarding();
      setOnboardingData({
        onboardingProgress: [],
        isOnboardingComplete: false
      });
      setCurrentSession(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Check if a specific stage is completed
  const isStageCompleted = useCallback((stage) => {
    if (!onboardingData?.onboardingProgress) return false;
    return onboardingData.onboardingProgress.some(
      progress => progress.stage === stage && progress.completed
    );
  }, [onboardingData]);

  // Get progress for a specific stage
  const getStageProgress = useCallback((stage) => {
    if (!onboardingData?.onboardingProgress) return null;
    return onboardingData.onboardingProgress.find(
      progress => progress.stage === stage
    );
  }, [onboardingData]);

  // Get completion percentage
  const getCompletionPercentage = useCallback(() => {
    if (!onboardingData?.onboardingProgress) return 0;
    
    const totalStages = [
      'welcomeViewed',
      'umberCreationStarted',
      'umberCreationSuccess',
      'nestCreationStarted', 
      'nestCreationSuccess',
      'itemCreationStarted',
      'itemCreationSuccess',
      'urlItemCreationSuccess',
      'reflectionCompleted',
      'onboardingCompleted'
    ];
    
    const completedStages = onboardingData.onboardingProgress.filter(
      progress => progress.completed
    ).length;
    
    return Math.round((completedStages / totalStages.length) * 100);
  }, [onboardingData]);

  // Initialize onboarding data from user context
  useEffect(() => {
    if (user) {
      setOnboardingData({
        onboardingProgress: user.onboardingProgress || [],
        isOnboardingComplete: user.isOnboardingComplete || false
      });
    }
  }, [user]);

  // Load onboarding status on mount
  useEffect(() => {
    if (!user) return;
    fetchOnboardingStatus();
  }, [user, fetchOnboardingStatus]);

  return {
    onboardingData,
    currentSession,
    loading,
    error,
    startOnboardingSession,
    updateProgress,
    resetOnboarding,
    isStageCompleted,
    getStageProgress,
    getCompletionPercentage,
    refresh: fetchOnboardingStatus
  };
};
