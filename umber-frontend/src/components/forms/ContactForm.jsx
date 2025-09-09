import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  EnvelopeClosedIcon, 
  PersonIcon, 
  ChatBubbleIcon,
  PaperPlaneIcon,
  CheckIcon
} from '@radix-ui/react-icons';
import UmberText from '../ui/UmberText';

function ContactForm({ onSuccess, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
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
      // Simulate API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess(formData);
      }

      // Auto-close after success
      setTimeout(() => {
        if (onClose) {
          onClose();
        }
      }, 2000);

    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error state here
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (isSubmitted) {
    return (
      <div className="p-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckIcon className="w-8 h-8 text-green-600" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            <UmberText>message sent successfully!</UmberText>
          </h3>
          <p className="text-gray-600">
            <UmberText>
              thank you for reaching out. we'll get back to you as soon as possible.
            </UmberText>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-umber-800 mb-2">
          <UmberText>get in touch</UmberText>
        </h3>
        <p className="text-umber-600 text-sm">
          <UmberText>
            have questions for us? we'd love to hear from you.
          </UmberText>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-umber-700 mb-1">
            <UmberText>name</UmberText>
          </label>
          <div className="relative">
            <PersonIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-umber-400 w-4 h-4" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`
                w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition-colors
                ${errors.name 
                  ? 'border-red-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-500' 
                  : 'border-umber-300 focus:ring-2 focus:ring-ochre-500/20 focus:border-ochre-500'
                }
              `}
              placeholder="Your full name"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">
              <UmberText>{errors.name}</UmberText>
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-umber-700 mb-1">
            <UmberText>email</UmberText>
          </label>
          <div className="relative">
            <EnvelopeClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-umber-400 w-4 h-4" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`
                w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition-colors
                ${errors.email 
                  ? 'border-red-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-500' 
                  : 'border-umber-300 focus:ring-2 focus:ring-ochre-500/20 focus:border-ochre-500'
                }
              `}
              placeholder="your.email@example.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">
              <UmberText>{errors.email}</UmberText>
            </p>
          )}
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-umber-700 mb-1">
            <UmberText>subject</UmberText>
          </label>
          <div className="relative">
            <ChatBubbleIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-umber-400 w-4 h-4" />
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`
                w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition-colors
                ${errors.subject 
                  ? 'border-red-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-500' 
                  : 'border-umber-300 focus:ring-2 focus:ring-ochre-500/20 focus:border-ochre-500'
                }
              `}
              placeholder="What's this about?"
            />
          </div>
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600">
              <UmberText>{errors.subject}</UmberText>
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-umber-700 mb-1">
            <UmberText>message</UmberText>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={`
              w-full px-4 py-3 border rounded-lg outline-none transition-colors resize-none
              ${errors.message 
                ? 'border-red-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-500' 
                : 'border-umber-300 focus:ring-2 focus:ring-ochre-500/20 focus:border-ochre-500'
              }
            `}
            placeholder="Tell us more about your inquiry..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">
              <UmberText>{errors.message}</UmberText>
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className={`
              w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold
              transition-all duration-200 disabled:cursor-not-allowed
              ${isSubmitting
                ? 'bg-gray-100 text-gray-400'
                : 'bg-gradient-to-r from-ochre-500 to-ochre-600 hover:from-ochre-600 hover:to-ochre-700 text-white hover:shadow-lg'
              }
            `}
            whileHover={!isSubmitting ? { scale: 1.02 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                <UmberText>sending...</UmberText>
              </>
            ) : (
              <>
                <PaperPlaneIcon className="w-4 h-4" />
                <UmberText>send message</UmberText>
              </>
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
