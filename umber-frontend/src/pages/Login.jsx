import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  EnvelopeClosedIcon, 
  LockClosedIcon,
  EyeOpenIcon,
  EyeNoneIcon,
} from '@radix-ui/react-icons';
import Button from '../components/ui/Button';
import UmberText from '../components/ui/UmberText';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For now, just navigate to home page
      // In real implementation, you'd handle authentication tokens here
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ submit: 'Invalid email or password. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    
    try {
      // Simulate Google OAuth flow - replace with actual Google Sign-In implementation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For now, just navigate to dashboard
      // In real implementation, you'd handle Google OAuth tokens here
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Google login error:', error);
      setErrors({ submit: 'Google sign-in failed. Please try again.' });
    } finally {
      setIsGoogleLoading(false);
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
            <p className="text-xl font-family-body text-umber-700 mb-2">
              <UmberText>welcome back!</UmberText>
            </p>
          </motion.div>
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl border border-umber-100 p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error */}
            {errors.submit && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-3"
              >
                <p className="text-sm text-red-700">
                  <UmberText>{errors.submit}</UmberText>
                </p>
              </motion.div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-umber-700 mb-2">
                <UmberText>Email address</UmberText>
              </label>
              <div className="relative">
                <EnvelopeClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-umber-400 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`
                    w-full pl-11 pr-4 py-3 border rounded-lg outline-none transition-all duration-200
                    ${errors.email 
                      ? 'border-red-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-500' 
                      : 'border-umber-300 focus:ring-2 focus:ring-moss-500/20 focus:border-moss-500'
                    }
                  `}
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-600"
                >
                  <UmberText>{errors.email}</UmberText>
                </motion.p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-umber-700 mb-2">
                <UmberText>Password</UmberText>
              </label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-umber-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`
                    w-full pl-11 pr-12 py-3 border rounded-lg outline-none transition-all duration-200
                    ${errors.password 
                      ? 'border-red-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-500' 
                      : 'border-umber-300 focus:ring-2 focus:ring-moss-500/20 focus:border-moss-500'
                    }
                  `}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-umber-400 hover:text-umber-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeNoneIcon className="w-5 h-5" />
                  ) : (
                    <EyeOpenIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-600"
                >
                  <UmberText>{errors.password}</UmberText>
                </motion.p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-moss-600 border-umber-300 rounded focus:ring-moss-500 focus:ring-2"
                />
                <span className="ml-2 text-sm text-umber-600">
                  <UmberText>Remember me</UmberText>
                </span>
              </label>
              <button
                type="button"
                className="text-sm text-moss-600 hover:text-moss-700 transition-colors"
              >
                <UmberText>Forgot password?</UmberText>
              </button>
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
                    <UmberText>signing in...</UmberText>
                  </>
                ) : (
                  <UmberText>sign in</UmberText>
                )}
              </Button>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-6 mb-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-umber-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-umber-500">
                  <UmberText>or continue with</UmberText>
                </span>
              </div>
            </div>
          </div>

          {/* Google Login Button */}
          <div className="flex justify-center mb-6">
            <Button
              type="button"
              variant="outline"
              size="md"
              disabled={isGoogleLoading || isSubmitting}
              onClick={handleGoogleLogin}
              className="px-6 border-umber-300 hover:border-umber-400"
            >
            {isGoogleLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-umber-400/30 border-t-umber-600 rounded-full animate-spin mr-3" />
                <UmberText>signing in with Google...</UmberText>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <UmberText>continue with Google</UmberText>
              </>
            )}
            </Button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-umber-600">
              <UmberText>
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="text-moss-600 hover:text-moss-700 font-medium transition-colors"
                >
                  Sign up
                </Link>
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
          <Link
            to="/"
            className="text-umber-600 hover:text-umber-700 transition-colors text-sm"
          >
            <UmberText>← Back to home</UmberText>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Login;
