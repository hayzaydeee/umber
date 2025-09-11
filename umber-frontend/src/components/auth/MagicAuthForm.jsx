import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  EnvelopeClosedIcon, 
  PersonIcon,
  CheckCircledIcon,
  ExclamationTriangleIcon
} from '@radix-ui/react-icons';
import Button from '../ui/Button';
import UmberText from '../ui/UmberText';
import { magicAuthAPI } from '../../api/magicAuth';

const MagicAuthForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: ''
  });
  const [isNewUser, setIsNewUser] = useState(false);
  const [linkSent, setLinkSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [checkingEmail, setCheckingEmail] = useState(false);

  // Check if email exists when user types
  useEffect(() => {
    const checkEmailExists = async () => {
      if (formData.email && formData.email.includes('@')) {
        setCheckingEmail(true);
        try {
          const result = await magicAuthAPI.checkEmail(formData.email);
          setIsNewUser(!result.exists);
          if (result.exists && result.name) {
            setFormData(prev => ({ ...prev, name: result.name }));
          }
        } catch (error) {
          console.error('Email check failed:', error);
        } finally {
          setCheckingEmail(false);
        }
      }
    };

    const debounceTimer = setTimeout(checkEmailExists, 500);
    return () => clearTimeout(debounceTimer);
  }, [formData.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const result = await magicAuthAPI.sendMagicLink({
        email: formData.email,
        name: isNewUser ? formData.name : undefined
      });

      setLinkSent(true);
      console.log('Magic link sent:', result);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send magic link. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (error) setError('');
  };

  if (linkSent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg"
      >
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircledIcon className="w-8 h-8 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Check Your Email
          </h2>
          
          <p className="text-gray-600 mb-4">
            We've sent a magic link to <strong>{formData.email}</strong>
          </p>
          
          <div className="bg-umber-50 border border-umber-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-umber-700">
              Click the link in your email to sign in. The link expires in 15 minutes for security.
            </p>
          </div>
          
          <Button
            variant="outline"
            onClick={() => {
              setLinkSent(false);
              setFormData({ email: '', name: '' });
            }}
            className="w-full"
          >
            Send Another Link
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg"
    >
      <div className="text-center mb-6">
        <UmberText className="text-3xl font-bold mb-2">
          Welcome to Umber
        </UmberText>
        <p className="text-gray-600">
          Sign in with your email - no password needed!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <div className="relative">
            <EnvelopeClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-umber-500 focus:border-transparent transition-colors"
            />
            {checkingEmail && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-umber-600 border-t-transparent"></div>
              </div>
            )}
          </div>
        </div>

        {/* Name Input (for new users) */}
        {isNewUser && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <div className="relative">
              <PersonIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required={isNewUser}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-umber-500 focus:border-transparent transition-colors"
              />
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg"
          >
            <ExclamationTriangleIcon className="w-5 h-5" />
            <span className="text-sm">{error}</span>
          </motion.div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting || checkingEmail}
          className="w-full"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span>Sending Magic Link...</span>
            </div>
          ) : (
            <>
              {isNewUser ? 'Create Account' : 'Send Magic Link'}
            </>
          )}
        </Button>

        {/* Status Indicator */}
        {!checkingEmail && formData.email && formData.email.includes('@') && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-center text-gray-500"
          >
            {isNewUser ? (
              <span className="text-blue-600">✨ Creating new account for {formData.email}</span>
            ) : (
              <span className="text-green-600">👋 Welcome back!</span>
            )}
          </motion.p>
        )}
      </form>

      {/* Footer */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-xs text-center text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy.
          Magic links expire after 15 minutes for your security.
        </p>
      </div>
    </motion.div>
  );
};

export default MagicAuthForm;
