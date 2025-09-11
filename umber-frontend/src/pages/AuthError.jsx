import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ExclamationTriangleIcon, 
  ClockIcon,
  LinkBreak2Icon,
  GearIcon
} from '@radix-ui/react-icons';
import Button from '../components/ui/Button';

const AuthError = () => {
  const [searchParams] = useSearchParams();
  const reason = searchParams.get('reason');

  const getErrorInfo = () => {
    switch (reason) {
      case 'invalid_token':
        return {
          icon: LinkBreak2Icon,
          title: 'Invalid Magic Link',
          message: 'This magic link is invalid or has already been used.',
          suggestion: 'Please request a new magic link to sign in.'
        };
      case 'missing_token':
        return {
          icon: LinkBreak2Icon,
          title: 'Missing Token',
          message: 'The magic link appears to be incomplete.',
          suggestion: 'Please click the full link from your email, or request a new one.'
        };
      case 'server_error':
        return {
          icon: GearIcon,
          title: 'Server Error',
          message: 'Something went wrong on our end.',
          suggestion: 'Please try again in a few moments.'
        };
      default:
        return {
          icon: ExclamationTriangleIcon,
          title: 'Authentication Error',
          message: 'There was a problem signing you in.',
          suggestion: 'Please try requesting a new magic link.'
        };
    }
  };

  const errorInfo = getErrorInfo();
  const IconComponent = errorInfo.icon;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-umber-50 to-umber-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg text-center"
      >
        <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <IconComponent className="w-10 h-10 text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {errorInfo.title}
        </h1>
        
        <p className="text-gray-600 mb-2">
          {errorInfo.message}
        </p>
        
        <p className="text-gray-500 text-sm mb-8">
          {errorInfo.suggestion}
        </p>
        
        <div className="space-y-3">
          <Link to="/auth">
            <Button className="w-full">
              Try Again
            </Button>
          </Link>
          
          <Link to="/">
            <Button variant="outline" className="w-full">
              Back to Home
            </Button>
          </Link>
        </div>
        
        {reason === 'invalid_token' && (
          <div className="mt-6 p-4 bg-umber-50 rounded-lg">
            <div className="flex items-center justify-center space-x-2 text-umber-700">
              <ClockIcon className="w-4 h-4" />
              <span className="text-sm">Magic links expire after 15 minutes for security</span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AuthError;
