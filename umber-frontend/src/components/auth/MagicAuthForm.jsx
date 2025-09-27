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
      if (formData.email && formData.email.includes('@') && formData.email.includes('.')) {
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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <div className="w-16 h-16 mx-auto mb-6 bg-moss-100 rounded-full flex items-center justify-center">
          <CheckCircledIcon className="w-8 h-8 text-moss-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-umber-800 mb-4">
          <UmberText>check your email</UmberText>
        </h2>
        
        <p className="text-umber-600 mb-4">
          <UmberText>
            we've sent a magic link to <strong>{formData.email}</strong>
          </UmberText>
        </p>
        
        <div className="bg-moss-50 border border-moss-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-moss-700">
            <UmberText>
              click the link in your email to sign in. the link expires in 15 minutes for security.
            </UmberText>
          </p>
        </div>
        
        <Button
          variant="outline"
          onClick={() => {
            setLinkSent(false);
            setFormData({ email: '', name: '' });
          }}
          className="border-umber-300 hover:border-umber-400"
        >
          <UmberText>send another link</UmberText>
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-red-50 border border-red-200 rounded-lg p-3"
        >
          <div className="flex items-center space-x-2">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />
            <p className="text-sm text-red-700">
              <UmberText>{error}</UmberText>
            </p>
          </div>
        </motion.div>
      )}

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-umber-700 mb-2">
          <UmberText>email address</UmberText>
        </label>
        <div className="relative">
          <EnvelopeClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-umber-400 w-5 h-5" />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="enter your email"
            required
            className="w-full pl-11 pr-12 py-3 border border-umber-300 rounded-lg outline-none transition-all duration-200 focus:ring-2 focus:ring-moss-500/20 focus:border-moss-500"
          />
          {checkingEmail && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-moss-600 border-t-transparent"></div>
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
          transition={{ duration: 0.3 }}
        >
          <label htmlFor="name" className="block text-sm font-medium text-umber-700 mb-2">
            <UmberText>your name</UmberText>
          </label>
          <div className="relative">
            <PersonIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-umber-400 w-5 h-5" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="enter your name"
              required={isNewUser}
              className="w-full pl-11 pr-4 py-3 border border-umber-300 rounded-lg outline-none transition-all duration-200 focus:ring-2 focus:ring-moss-500/20 focus:border-moss-500"
            />
          </div>
        </motion.div>
      )}

      {/* Status Indicator */}
      {!checkingEmail && formData.email && formData.email.includes('@') && formData.email.includes('.') && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          {isNewUser ? (
            <div className="flex items-center justify-center space-x-2 text-moss-600 bg-moss-50 rounded-lg py-2 px-4">
              <span className="text-lg">✨</span>
              <p className="text-sm">
                <UmberText>creating new account for {formData.email}</UmberText>
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2 text-ochre-600 bg-ochre-50 rounded-lg py-2 px-4">
              <span className="text-lg">👋</span>
              <p className="text-sm">
                <UmberText>welcome back!</UmberText>
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button
          type="submit"
          variant="contemplative"
          size="md"
          disabled={isSubmitting || checkingEmail}
          className="px-8"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              <UmberText>sending magic link...</UmberText>
            </>
          ) : (
            <UmberText>
              {isNewUser ? 'create account' : 'send magic link'}
            </UmberText>
          )}
        </Button>
      </div>
    </form>
  );
};

export default MagicAuthForm;
