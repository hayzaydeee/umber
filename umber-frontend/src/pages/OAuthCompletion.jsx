import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  PersonIcon,
  CheckIcon
} from '@radix-ui/react-icons';
import Button from '../components/ui/Button';
import UmberText from '../components/ui/UmberText';

function OAuthCompletion() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get pre-filled data from OAuth (passed via state)
  const oauthData = location.state || {};
  
  const [formData, setFormData] = useState({
    firstName: oauthData.firstName || '',
    lastName: oauthData.lastName || '',
    email: oauthData.email || '',
    username: '',
    profilePicture: oauthData.profilePicture || null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username.trim())) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    if (!acceptedTerms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call to complete OAuth user setup
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Complete the user profile and redirect to dashboard
      navigate('/dashboard');
      
    } catch (error) {
      console.error('OAuth completion error:', error);
      setErrors({ submit: 'Failed to complete setup. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ochre-50 via-white to-moss-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-4xl font-display font-bold text-umber-800 mb-4">
              <UmberText>umber</UmberText>
            </h1>
            <h2 className="text-xl font-family-body text-umber-700 mb-2">
              <UmberText>almost there!</UmberText>
            </h2>
            <p className="text-sm text-umber-600">
              <UmberText>just choose a username to complete your account setup.</UmberText>
            </p>
          </motion.div>
        </div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center items-center space-x-4 mb-8"
        >
          {[1, 2].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                  ${step <= 2 
                    ? 'bg-moss-600 text-white' 
                    : 'bg-umber-200 text-umber-500'
                  }
                `}
              >
                {step === 1 ? (
                  <CheckIcon className="w-4 h-4" />
                ) : (
                  step
                )}
              </div>
              {step < 2 && (
                <div className="w-8 h-0.5 mx-2 bg-moss-600" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Completion Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl border border-umber-100 p-8"
        >
          {/* Welcome Message */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              {formData.profilePicture ? (
                <img 
                  src={formData.profilePicture} 
                  alt="Profile" 
                  className="w-16 h-16 rounded-full border-2 border-moss-200"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-moss-100 flex items-center justify-center">
                  <PersonIcon className="w-8 h-8 text-moss-600" />
                </div>
              )}
            </div>
            <h3 className="text-lg font-semibold text-umber-800 mb-2">
              <UmberText>welcome, {formData.firstName}!</UmberText>
            </h3>
            <p className="text-sm text-umber-600">
              <UmberText>your Google account has been connected successfully.</UmberText>
            </p>
          </div>

          {/* General Error */}
          {errors.submit && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6"
            >
              <p className="text-sm text-red-700">
                <UmberText>{errors.submit}</UmberText>
              </p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Pre-filled Info Display */}
            <div className="bg-moss-50 border border-moss-200 rounded-lg p-4 mb-6">
              <div className="space-y-1 text-sm text-moss-700">
                <p><UmberText><strong>name:</strong> {formData.firstName} {formData.lastName}</UmberText></p>
                <p><UmberText><strong>email:</strong> {formData.email} ✓</UmberText></p>
              </div>
            </div>

            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-umber-700 mb-2">
                <UmberText>choose your username</UmberText>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-umber-400 text-sm">
                  @
                </span>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`
                    w-full pl-8 pr-4 py-3 border rounded-lg outline-none transition-all duration-200
                    ${errors.username 
                      ? 'border-red-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-500' 
                      : 'border-umber-300 focus:ring-2 focus:ring-moss-500/20 focus:border-moss-500'
                    }
                  `}
                  placeholder="username"
                  autoComplete="username"
                />
              </div>
              {errors.username && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-600"
                >
                  <UmberText>{errors.username}</UmberText>
                </motion.p>
              )}
              <p className="mt-1 text-xs text-umber-500">
                <UmberText>this will be your unique identifier on umber.</UmberText>
              </p>
            </div>

            {/* Terms and Conditions */}
            <div>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => {
                    setAcceptedTerms(e.target.checked);
                    if (errors.terms) {
                      setErrors(prev => ({ ...prev, terms: '' }));
                    }
                  }}
                  className="w-4 h-4 text-moss-600 border-umber-300 rounded focus:ring-moss-500 focus:ring-2 mt-0.5"
                />
                <span className="text-sm text-umber-600">
                  <UmberText>
                    i agree to the{' '}
                    <button
                      type="button"
                      className="text-moss-600 hover:text-moss-700 font-medium transition-colors"
                    >
                      terms of service
                    </button>
                    {' '}and{' '}
                    <button
                      type="button"
                      className="text-moss-600 hover:text-moss-700 font-medium transition-colors"
                    >
                      privacy policy
                    </button>
                  </UmberText>
                </span>
              </label>
              {errors.terms && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-600"
                >
                  <UmberText>{errors.terms}</UmberText>
                </motion.p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                type="submit"
                variant="contemplative"
                size="md"
                disabled={isSubmitting}
                className="px-8"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    <UmberText>completing setup...</UmberText>
                  </>
                ) : (
                  <UmberText>complete account setup</UmberText>
                )}
              </Button>
            </div>
          </form>

          {/* Alternative Sign Up */}
          <div className="mt-6 text-center">
            <p className="text-sm text-umber-600">
              <UmberText>
                want to use a different account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="text-moss-600 hover:text-moss-700 font-medium transition-colors"
                >
                  sign up manually
                </button>
              </UmberText>
            </p>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <button
            onClick={() => navigate('/')}
            className="text-umber-600 hover:text-umber-700 transition-colors text-sm"
          >
            <UmberText>← back to home</UmberText>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default OAuthCompletion;
