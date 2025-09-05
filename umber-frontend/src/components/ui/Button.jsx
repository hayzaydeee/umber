import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  loading = false,
  className = '',
  onClick,
  ...props 
}, ref) => {
  
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-moss-600 hover:bg-moss-700 text-umber-50 focus:ring-moss-500 border-2 border-moss-700',
    secondary: 'bg-ochre-500 hover:bg-ochre-600 text-umber-50 focus:ring-ochre-400 border-2 border-ochre-600',
    outline: 'border-2 border-umber-400 text-umber-800 hover:bg-umber-100 focus:ring-umber-400 bg-umber-50',
    ghost: 'text-umber-700 hover:text-umber-900 hover:bg-umber-100 focus:ring-umber-400',
    danger: 'bg-red-600 hover:bg-red-700 text-umber-50 focus:ring-red-500 border-2 border-red-700'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm rounded-lg',
    md: 'px-4 py-2 text-base rounded-xl',
    lg: 'px-6 py-3 text-lg rounded-xl',
    xl: 'px-8 py-4 text-xl rounded-2xl'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <motion.button
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {loading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
            className="opacity-25"
          />
          <path 
            fill="currentColor" 
            d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            className="opacity-75"
          />
        </svg>
      )}
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
