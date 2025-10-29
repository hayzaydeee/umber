import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircledIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { authApi } from '../api/auth';
import UmberText from '../components/ui/UmberText';

const AuthSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleAuthSuccess = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        navigate('/auth/error?reason=missing_token');
        return;
      }

      try {
        setIsVerifying(true);
        
        // The token is already a valid JWT from the backend verification
        // We just need to set it as the auth token and authenticate the user
        console.log('Setting auth token from magic link verification');
        
        // Set the JWT token for authentication
        authApi.setAuthToken(token);
        
        // Small delay for better UX, then redirect
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
        
      } catch (error) {
        console.error('Auth token setup error:', error);
        setError(error.message || 'An error occurred during authentication');
        setTimeout(() => {
          navigate('/auth/error?reason=auth_error');
        }, 3000);
      } finally {
        setIsVerifying(false);
      }
    };

    handleAuthSuccess();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-moss-50 via-white to-ochre-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg text-center border border-umber-200"
      >
        {isVerifying ? (
          <>
            <div className="w-16 h-16 mx-auto mb-4 border-4 border-moss-500 border-t-transparent rounded-full animate-spin" />
            <h2 className="text-xl font-bold text-umber-800 mb-2">
              <UmberText>Verifying your magic link...</UmberText>
            </h2>
            <p className="text-umber-600">
              <UmberText>Please wait while we authenticate you</UmberText>
            </p>
          </>
        ) : error ? (
          <>
            <ExclamationTriangleIcon className="w-16 h-16 mx-auto mb-4 text-red-500" />
            <h2 className="text-xl font-bold text-red-800 mb-2">
              <UmberText>Verification Failed</UmberText>
            </h2>
            <p className="text-red-600 mb-4">
              <UmberText>{error}</UmberText>
            </p>
            <p className="text-umber-500 text-sm">
              <UmberText>Redirecting to error page...</UmberText>
            </p>
          </>
        ) : (
          <>
            <div className="w-20 h-20 mx-auto mb-6 bg-moss-100 rounded-full flex items-center justify-center">
              <CheckCircledIcon className="w-10 h-10 text-moss-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-umber-800 mb-2">
              <UmberText>Welcome to umber!</UmberText>
            </h1>
            
            <p className="text-umber-600 mb-6">
              <UmberText>You've been successfully authenticated. Redirecting to your dashboard...</UmberText>
            </p>
            
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-moss-600 border-t-transparent"></div>
              <span className="text-moss-600">
                <UmberText>Loading your umbers...</UmberText>
              </span>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default AuthSuccess;
