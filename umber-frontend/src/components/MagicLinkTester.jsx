import React, { useState } from 'react';
import { motion } from 'motion/react';
import Button from './ui/Button';
import { magicAuthAPI } from '../api/magicAuth';

const MagicLinkTester = () => {
  const [email, setEmail] = useState('test@example.com');
  const [name, setName] = useState('Test User');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const testMagicLink = async () => {
    setLoading(true);
    try {
      // Call the test endpoint directly
      const response = await fetch('http://localhost:5000/api/magic-auth/test-magic-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-yellow-800 mb-2">
          🧪 Magic Link Development Tester
        </h2>
        <p className="text-yellow-700 text-sm">
          This bypasses email sending and shows you the magic link directly.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name (for new users)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <Button 
            onClick={testMagicLink} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Generating...' : 'Generate Test Magic Link'}
          </Button>
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-gray-50 rounded-lg"
          >
            <h3 className="font-medium text-gray-800 mb-2">Result:</h3>
            
            {result.error ? (
              <div className="text-red-600">
                Error: {result.error}
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-green-600">✅ {result.message}</p>
                <p className="text-sm text-gray-600">
                  Email: {result.email} ({result.isNewUser ? 'New User' : 'Existing User'})
                </p>
                
                {result.magicLink && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Magic Link (click to test):
                    </p>
                    <a
                      href={result.magicLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      🔗 Test Magic Link
                    </a>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MagicLinkTester;
