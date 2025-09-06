import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  EnvelopeClosedIcon, 
  LockClosedIcon,
  EyeOpenIcon,
  EyeNoneIcon,
  CheckIcon,
  ArrowLeftIcon
} from '@radix-ui/react-icons';
import Button from '../components/ui/Button';
import UmberText from '../components/ui/UmberText';

function ForgotPassword() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // Password strength calculation
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    return {
      strength,
      label: strength === 0 ? 'Too weak' : strength === 1 ? 'Weak' : strength === 2 ? 'Fair' : strength === 3 ? 'Good' : 'Strong',
      color: strength <= 1 ? 'bg-red-500' : strength === 2 ? 'bg-yellow-500' : 'bg-green-500'
    };
  };

  const passwordStrength = calculatePasswordStrength(formData.password);

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.otp.trim()) {
      newErrors.otp = 'OTP is required';
    } else if (!/^\d{6}$/.test(formData.otp.trim())) {
      newErrors.otp = 'OTP must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (passwordStrength.strength < 2) {
      newErrors.password = 'Password is too weak. Include uppercase, numbers, and special characters';
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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

  const handleStep1Submit = async (e) => {
    e.preventDefault();
    
    if (!validateStep1()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call to send OTP
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setOtpSent(true);
      setCurrentStep(2);
      
      // Start resend timer
      setResendTimer(60);
      const timer = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
    } catch (error) {
      console.error('Send OTP error:', error);
      setErrors({ submit: 'Failed to send OTP. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStep2Submit = async (e) => {
    e.preventDefault();
    
    if (!validateStep2()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call to verify OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate OTP verification (in real implementation, check against backend)
      if (formData.otp === '123456') {
        setCurrentStep(3);
      } else {
        setErrors({ otp: 'Invalid OTP. Please try again.' });
      }
      
    } catch (error) {
      console.error('Verify OTP error:', error);
      setErrors({ submit: 'Failed to verify OTP. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStep3Submit = async (e) => {
    e.preventDefault();
    
    if (!validateStep3()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call to reset password
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success and redirect to login
      alert('Password reset successfully! Please login with your new password.');
      navigate('/login');
      
    } catch (error) {
      console.error('Reset password error:', error);
      setErrors({ submit: 'Failed to reset password. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0) return;

    setIsSubmitting(true);

    try {
      // Simulate API call to resend OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Start resend timer again
      setResendTimer(60);
      const timer = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      // Clear any existing OTP error
      setErrors(prev => ({ ...prev, otp: '' }));
      
    } catch (error) {
      console.error('Resend OTP error:', error);
      setErrors({ submit: 'Failed to resend OTP. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Reset your password';
      case 2: return 'Enter verification code';
      case 3: return 'Create new password';
      default: return 'Reset your password';
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1: return 'Enter your email address and we\'ll send you a verification code.';
      case 2: return `We've sent a 6-digit code to ${formData.email}. Enter it below to continue.`;
      case 3: return 'Choose a strong password for your account.';
      default: return '';
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
              <UmberText>{getStepTitle()}</UmberText>
            </h2>
            <p className="text-sm text-umber-600">
              <UmberText>{getStepDescription()}</UmberText>
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
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                  ${step <= currentStep 
                    ? 'bg-moss-600 text-white' 
                    : 'bg-umber-200 text-umber-500'
                  }
                `}
              >
                {step < currentStep ? (
                  <CheckIcon className="w-4 h-4" />
                ) : (
                  step
                )}
              </div>
              {step < 3 && (
                <div
                  className={`
                    w-8 h-0.5 mx-2 transition-all duration-300
                    ${step < currentStep ? 'bg-moss-600' : 'bg-umber-200'}
                  `}
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl border border-umber-100 p-8"
        >
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

          {/* Step 1: Email */}
          {currentStep === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-6">
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
                    className={`
                      w-full pl-11 pr-4 py-3 border rounded-lg outline-none transition-all duration-200
                      ${errors.email 
                        ? 'border-red-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-500' 
                        : 'border-umber-300 focus:ring-2 focus:ring-moss-500/20 focus:border-moss-500'
                      }
                    `}
                    placeholder="enter your email"
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
                      <UmberText>sending code...</UmberText>
                    </>
                  ) : (
                    <UmberText>send verification code</UmberText>
                  )}
                </Button>
              </div>
            </form>
          )}

          {/* Step 2: OTP */}
          {currentStep === 2 && (
            <form onSubmit={handleStep2Submit} className="space-y-6">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-umber-700 mb-2">
                  <UmberText>verification code</UmberText>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    maxLength={6}
                    className={`
                      w-full px-4 py-3 border rounded-lg outline-none transition-all duration-200 text-center text-xl font-mono tracking-widest
                      ${errors.otp 
                        ? 'border-red-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-500' 
                        : 'border-umber-300 focus:ring-2 focus:ring-moss-500/20 focus:border-moss-500'
                      }
                    `}
                    placeholder="000000"
                  />
                </div>
                {errors.otp && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-600"
                  >
                    <UmberText>{errors.otp}</UmberText>
                  </motion.p>
                )}
                
                {/* Resend OTP */}
                <div className="mt-4 text-center">
                  {resendTimer > 0 ? (
                    <p className="text-sm text-umber-600">
                      <UmberText>Resend code in {resendTimer}s</UmberText>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      disabled={isSubmitting}
                      className="text-sm text-moss-600 hover:text-moss-700 transition-colors"
                    >
                      <UmberText>didn't receive the code? resend</UmberText>
                    </button>
                  )}
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={handleBackStep}
                  className="px-6"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  <UmberText>back</UmberText>
                </Button>
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
                      <UmberText>verifying...</UmberText>
                    </>
                  ) : (
                    <UmberText>verify code</UmberText>
                  )}
                </Button>
              </div>
            </form>
          )}

          {/* Step 3: New Password */}
          {currentStep === 3 && (
            <form onSubmit={handleStep3Submit} className="space-y-6">
              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-umber-700 mb-2">
                  <UmberText>new password</UmberText>
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
                    placeholder="create a strong password"
                    autoComplete="new-password"
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
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                          style={{ width: `${(passwordStrength.strength / 4) * 100}%` }}
                        />
                      </div>
                      <span className={`text-xs font-medium ${
                        passwordStrength.strength <= 1 ? 'text-red-600' :
                        passwordStrength.strength === 2 ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        <UmberText>{passwordStrength.label}</UmberText>
                      </span>
                    </div>
                  </div>
                )}
                
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

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-umber-700 mb-2">
                  <UmberText>confirm new password</UmberText>
                </label>
                <div className="relative">
                  <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-umber-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`
                      w-full pl-11 pr-12 py-3 border rounded-lg outline-none transition-all duration-200
                      ${errors.confirmPassword 
                        ? 'border-red-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-500' 
                        : 'border-umber-300 focus:ring-2 focus:ring-moss-500/20 focus:border-moss-500'
                      }
                    `}
                    placeholder="confirm your new password"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-umber-400 hover:text-umber-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeNoneIcon className="w-5 h-5" />
                    ) : (
                      <EyeOpenIcon className="w-5 h-5" />
                    )}
                  </button>
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <CheckIcon className="absolute right-10 top-1/2 transform -translate-y-1/2 text-green-600 w-5 h-5" />
                  )}
                </div>
                {errors.confirmPassword && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-600"
                  >
                    <UmberText>{errors.confirmPassword}</UmberText>
                  </motion.p>
                )}
              </div>

              <div className="flex justify-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={handleBackStep}
                  className="px-6"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  <UmberText>back</UmberText>
                </Button>
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
                      <UmberText>resetting...</UmberText>
                    </>
                  ) : (
                    <UmberText>reset password</UmberText>
                  )}
                </Button>
              </div>
            </form>
          )}

          {/* Back to Login Link */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm text-moss-600 hover:text-moss-700 transition-colors inline-flex items-center"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-1" />
              <UmberText>back to login</UmberText>
            </Link>
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
            <UmberText>← back to home</UmberText>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ForgotPassword;
