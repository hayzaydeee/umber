import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  EnvelopeClosedIcon,
  LockClosedIcon,
  EyeOpenIcon,
  EyeNoneIcon,
  PersonIcon,
  CheckIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@radix-ui/react-icons";
import Button from "../components/ui/Button";
import UmberText from "../components/ui/UmberText";

function Signup() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username =
        "Username can only contain letters, numbers, and underscores";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!acceptedTerms) {
      newErrors.terms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();

    if (validateStep1()) {
      setCurrentStep(2);
      setErrors({}); // Clear any previous errors
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(1);
    setErrors({}); // Clear any errors from step 2
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep2()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual user registration
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // For now, just navigate to dashboard
      // In real implementation, you'd handle user registration and authentication
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
      setErrors({
        submit:
          "An account with this email already exists. Please try signing in instead.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsGoogleLoading(true);

    try {
      // Simulate Google OAuth flow - replace with actual Google Sign-In implementation
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For now, just navigate to dashboard
      // In real implementation, you'd handle Google OAuth registration here
      navigate("/dashboard");
    } catch (error) {
      console.error("Google signup error:", error);
      setErrors({ submit: "Google sign-up failed. Please try again." });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const getPasswordStrength = (password) => {
    if (password.length === 0) return { strength: 0, label: "" };
    if (password.length < 6)
      return { strength: 1, label: "Weak", color: "bg-red-500" };
    if (password.length < 8)
      return { strength: 2, label: "Fair", color: "bg-yellow-500" };
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password))
      return { strength: 2, label: "Fair", color: "bg-yellow-500" };
    return { strength: 3, label: "Strong", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength(formData.password);

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
            <h1 className="text-4xl font-display font-bold text-umber-800 mb-2">
              <UmberText>umber</UmberText>
            </h1>

            <p className="text-xl font-family-body text-umber-700 mb-2">
              <UmberText>Join the community</UmberText>
            </p>
          </motion.div>
        </div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex items-center justify-center space-x-4 mb-8"
        >
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                currentStep >= 1
                  ? "bg-moss-600 text-white"
                  : "bg-umber-200 text-umber-600"
              }`}
            >
              1
            </div>
            <span
              className={`ml-2 text-sm font-medium transition-colors ${
                currentStep >= 1 ? "text-moss-700" : "text-umber-500"
              }`}
            >
              <UmberText>Basic Info</UmberText>
            </span>
          </div>
          <div
            className={`w-8 h-1 rounded transition-colors ${
              currentStep >= 2 ? "bg-moss-600" : "bg-umber-200"
            }`}
          ></div>
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                currentStep >= 2
                  ? "bg-moss-600 text-white"
                  : "bg-umber-200 text-umber-600"
              }`}
            >
              2
            </div>
            <span
              className={`ml-2 text-sm font-medium transition-colors ${
                currentStep >= 2 ? "text-moss-700" : "text-umber-500"
              }`}
            >
              <UmberText>Security</UmberText>
            </span>
          </div>
        </motion.div>

        {/* Signup Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
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

          {currentStep === 1 ? (
            <form onSubmit={handleNextStep} className="space-y-6">
              {/* Name Fields - Side by Side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name Field */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-umber-700 mb-2"
                  >
                    <UmberText>first name</UmberText>
                  </label>
                  <div className="relative">
                    <PersonIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-umber-400 w-5 h-5" />
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`
                      w-full pl-11 pr-4 py-3 border rounded-lg outline-none transition-all duration-200
                      ${
                        errors.firstName
                          ? "border-red-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                          : "border-umber-300 focus:ring-2 focus:ring-moss-500/20 focus:border-moss-500"
                      }
                    `}
                      placeholder="John"
                      autoComplete="given-name"
                    />
                  </div>
                  {errors.firstName && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-600"
                    >
                      <UmberText>{errors.firstName}</UmberText>
                    </motion.p>
                  )}
                </div>

                {/* Last Name Field */}
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-umber-700 mb-2"
                  >
                    <UmberText>last name</UmberText>
                  </label>
                  <div className="relative">
                    <PersonIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-umber-400 w-5 h-5" />
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`
                      w-full pl-11 pr-4 py-3 border rounded-lg outline-none transition-all duration-200
                      ${
                        errors.lastName
                          ? "border-red-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                          : "border-umber-300 focus:ring-2 focus:ring-moss-500/20 focus:border-moss-500"
                      }
                    `}
                      placeholder="Doe"
                      autoComplete="family-name"
                    />
                  </div>
                  {errors.lastName && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-600"
                    >
                      <UmberText>{errors.lastName}</UmberText>
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Username Field */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-umber-700 mb-2"
                >
                  <UmberText>username</UmberText>
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
                      ${
                        errors.username
                          ? "border-red-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                          : "border-umber-300 focus:ring-2 focus:ring-moss-500/20 focus:border-moss-500"
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
              </div>

              {/* Next Button */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  variant="contemplative"
                  size="md"
                  className="px-8"
                >
                  <UmberText>
                    continue <ArrowRightIcon className="inline-block" />
                  </UmberText>
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 2 Header */}
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-umber-800 mb-2">
                  <UmberText>welcome, {formData.firstName}!</UmberText>
                </h3>
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-umber-700 mb-2"
                >
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
                      ${
                        errors.email
                          ? "border-red-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                          : "border-umber-300 focus:ring-2 focus:ring-moss-500/20 focus:border-moss-500"
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

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-umber-700 mb-2"
                >
                  <UmberText>password</UmberText>
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
                      ${
                        errors.password
                          ? "border-red-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                          : "border-umber-300 focus:ring-2 focus:ring-moss-500/20 focus:border-moss-500"
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
                          style={{
                            width: `${(passwordStrength.strength / 3) * 100}%`,
                          }}
                        />
                      </div>
                      <span
                        className={`text-xs font-medium ${
                          passwordStrength.strength === 1
                            ? "text-red-600"
                            : passwordStrength.strength === 2
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      >
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
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-umber-700 mb-2"
                >
                  <UmberText>confirm password</UmberText>
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
                      ${
                        errors.confirmPassword
                          ? "border-red-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                          : "border-umber-300 focus:ring-2 focus:ring-moss-500/20 focus:border-moss-500"
                      }
                    `}
                    placeholder="confirm your password"
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
                  {formData.confirmPassword &&
                    formData.password === formData.confirmPassword && (
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

              {/* Terms and Conditions */}
              <div>
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => {
                      setAcceptedTerms(e.target.checked);
                      if (errors.terms) {
                        setErrors((prev) => ({ ...prev, terms: "" }));
                      }
                    }}
                    className="w-4 h-4 text-moss-600 border-umber-300 rounded focus:ring-moss-500 focus:ring-2 mt-0.5"
                  />
                  <span className="text-sm text-umber-600">
                    <UmberText>
                      I agree to the{" "}
                      <button
                        type="button"
                        className="text-moss-600 hover:text-moss-700 font-medium transition-colors"
                      >
                        terms of service
                      </button>{" "}
                      and{" "}
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

              {/* Navigation Buttons */}
              <div className="flex justify-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={handlePreviousStep}
                  className="px-6"
                >
                  <ArrowLeftIcon className="font-bold" />
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
                      <UmberText>creating account...</UmberText>
                    </>
                  ) : (
                    <UmberText>create account</UmberText>
                  )}
                </Button>
              </div>
            </form>
          )}

          {/* Google Signup Button - Only show on Step 1 */}
          {currentStep === 1 && (
            <>
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

              {/* Google Signup Button */}
              <div className="flex justify-center mb-6">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  disabled={isGoogleLoading}
                  onClick={handleGoogleSignup}
                  className="px-6 border-umber-300 hover:border-umber-400"
                >
                  {isGoogleLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-umber-400/30 border-t-umber-600 rounded-full animate-spin mr-3" />
                      <UmberText>creating account with Google...</UmberText>
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
                      <UmberText>sign up with Google</UmberText>
                    </>
                  )}
                </Button>
              </div>
            </>
          )}

          {/* Sign In Link */}
          <div className="text-center">
            <div className="mt-6 mb-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-umber-200"></div>
                </div>
                <div className="relative flex justify-center text-sm"></div>
              </div>
            </div>
            <p className="text-umber-600 mt-4">
              <UmberText>
                already have an account?{" "}
                <Link
                  to="/login"
                  className="text-moss-600 hover:text-moss-700 font-medium transition-colors"
                >
                  sign in
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
            <UmberText>
              <ArrowLeftIcon className="w-4 h-4 inline-block mr-1" /> back to
              home
            </UmberText>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Signup;
