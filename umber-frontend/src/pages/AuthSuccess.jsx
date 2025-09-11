import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircledIcon } from '@radix-ui/react-icons';
import { useAuth } from '../hooks/useAuth.jsx';

const AuthSuccess = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      // Store JWT token
      localStorage.setItem('token', token);
      
      // Update auth context
      login(token);
      
      // Small delay for better UX, then redirect
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } else {
      // No token, redirect to error
      navigate('/auth/error?reason=missing_token');
    }
  }, [searchParams, login, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-umber-50 to-umber-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg text-center"
      >
        <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircledIcon className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome to Umber!
        </h1>
        
        <p className="text-gray-600 mb-6">
          You've been successfully signed in. Redirecting to your dashboard...
        </p>
        
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-umber-600 border-t-transparent"></div>
          <span className="text-umber-600">Loading your umbers...</span>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthSuccess;
