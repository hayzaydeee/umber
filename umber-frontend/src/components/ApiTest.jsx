import React, { useState, useEffect } from 'react';
import { healthCheck, authApi, umbersApi } from '../api';

const ApiTest = () => {
  const [status, setStatus] = useState({
    backend: 'Checking...',
    auth: 'Not tested',
    data: 'Not tested'
  });
  const [testResults, setTestResults] = useState([]);

  const addResult = (test, success, message) => {
    setTestResults(prev => [...prev, { test, success, message, timestamp: new Date() }]);
  };

  const runTests = async () => {
    setTestResults([]);
    setStatus({ backend: 'Testing...', auth: 'Testing...', data: 'Testing...' });

    try {
      // Test 1: Backend Health Check
      const health = await healthCheck();
      addResult('Backend Health', true, `Server running: ${health.message}`);
      setStatus(prev => ({ ...prev, backend: '✅ Connected' }));

      // Test 2: Authentication (Register test user)
      try {
        const testUser = {
          firstName: 'API',
          lastName: 'Test',
          email: `apitest${Date.now()}@example.com`,
          password: 'testpass123'
        };
        
        const authResponse = await authApi.register(testUser);
        addResult('User Registration', true, `User created: ${authResponse.user?.name || 'Unknown'}`);
        
        // Test 3: Get Profile
        const profile = await authApi.getProfile();
        addResult('Get Profile', true, `Profile loaded: ${profile.user?.name || 'Unknown'}`);
        
        setStatus(prev => ({ ...prev, auth: '✅ Working' }));

        // Test 4: Create Umber
        const testUmber = {
          name: 'API Test Collection',
          description: 'Testing API integration',
          icon: '🧪',
          color: '#4F46E5'
        };
        
        const umberResponse = await umbersApi.createUmber(testUmber);
        addResult('Create Umber', true, `Umber created: ${umberResponse.umber?.name}`);

        // Test 5: Fetch Umbers
        const umbersResponse = await umbersApi.getUmbers();
        addResult('Fetch Umbers', true, `Found ${umbersResponse.umbers?.length || 0} umbers`);
        
        setStatus(prev => ({ ...prev, data: '✅ Working' }));

      } catch (authError) {
        addResult('Authentication', false, authError.message);
        setStatus(prev => ({ ...prev, auth: '❌ Failed', data: '⏸️ Skipped' }));
      }

    } catch (healthError) {
      addResult('Backend Health', false, healthError.message);
      setStatus({ backend: '❌ Failed', auth: '⏸️ Skipped', data: '⏸️ Skipped' });
    }
  };

  useEffect(() => {
    runTests();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">API Integration Test</h2>
      
      {/* Status Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-700">Backend Connection</h3>
          <p className="text-lg">{status.backend}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-700">Authentication</h3>
          <p className="text-lg">{status.auth}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-700">Data Operations</h3>
          <p className="text-lg">{status.data}</p>
        </div>
      </div>

      {/* Test Results */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">Test Results</h3>
        {testResults.length === 0 ? (
          <p className="text-gray-500">Running tests...</p>
        ) : (
          <div className="space-y-2">
            {testResults.map((result, index) => (
              <div 
                key={index}
                className={`p-3 rounded-lg flex items-center justify-between ${
                  result.success 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">
                    {result.success ? '✅' : '❌'}
                  </span>
                  <div>
                    <span className="font-medium">{result.test}</span>
                    <p className="text-sm text-gray-600">{result.message}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">
                  {result.timestamp.toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={runTests}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Run Tests Again
        </button>
        <button
          onClick={() => {
            setTestResults([]);
            setStatus({ backend: 'Ready', auth: 'Ready', data: 'Ready' });
          }}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Clear Results
        </button>
      </div>

      {/* API Info */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-700 mb-2">API Configuration</h4>
        <p className="text-sm text-gray-600">
          Backend URL: {import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}
        </p>
        <p className="text-sm text-gray-600">
          Environment: {import.meta.env.MODE}
        </p>
      </div>
    </div>
  );
};

export default ApiTest;
