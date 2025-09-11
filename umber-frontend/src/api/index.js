// Export all API services
export { authApi } from './auth';
export { umbersApi } from './umbers';
export { nestsApi } from './nests';
export { itemsApi } from './items';
export { dashboardApi } from './dashboard';

// Export utilities
export { setAuthToken } from './client';
export { default as apiClient } from './client';

// Health check
export const healthCheck = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/health`);
    return await response.json();
  } catch (error) {
    throw new Error('Backend server is not responding');
  }
};
