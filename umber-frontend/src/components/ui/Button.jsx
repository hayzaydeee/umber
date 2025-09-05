import React from "react";
import { motion } from "motion/react";

function Button({
  children,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
  ...props
}) {
  const baseClasses =
    "font-medium focus:outline-none focus:ring-3 focus:ring-moss-600/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer inline-flex items-center justify-center";

  const sizeClasses = {
    sm: "px-3 py-2 text-sm rounded-md",
    md: "px-4 py-3 text-base rounded-lg", 
    lg: "px-6 py-4 text-lg rounded-lg",
    xl: "px-8 py-4 text-xl rounded-xl",
  };

  const variantClasses = {
    // Primary - Moss green (contemplative action)
    primary: "shadow-sm",

    // Secondary - Ochre warm (secondary action)  
    secondary: "shadow-sm",

    // Outline - Moss border (subtle action)
    outline: "border-2",

    // Ghost - Minimal (very subtle action)
    ghost: "",

    // Soft - Umber subtle (background action)
    soft: "",

    // Contemplative - Special variant for thoughtful actions
    contemplative: "shadow-md",

    // Danger - For destructive actions
    danger: "shadow-sm",

    // Success - For positive actions
    success: "shadow-sm",
  };

  // Define hover and animation variants for each button type
  const getVariantStyles = (variant) => {
    switch (variant) {
      case "primary":
        return {
          initial: { backgroundColor: "rgb(77, 124, 15)", color: "white" }, // moss-700
          whileHover: { 
            backgroundColor: "rgb(63, 98, 18)", // moss-800
            y: -2,
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
          },
          whileTap: { y: 0, scale: 0.98 }
        };
      
      case "contemplative": 
        return {
          initial: { 
            background: "linear-gradient(to right, rgb(77, 124, 15), rgb(68, 64, 60))", // moss-700 to umber-700
            color: "white" 
          },
          whileHover: { 
            background: "linear-gradient(to right, rgb(63, 98, 18), rgb(41, 37, 36))", // moss-800 to umber-800
            y: -3,
            boxShadow: "0 15px 35px rgba(0,0,0,0.15)"
          },
          whileTap: { y: -1, scale: 0.98 }
        };
        
      case "outline":
        return {
          initial: { 
            backgroundColor: "rgba(77, 124, 15, 0)", // transparent moss-700
            color: "rgb(77, 124, 15)", // moss-700
            borderColor: "rgb(77, 124, 15)" 
          },
          whileHover: { 
            backgroundColor: "rgb(240, 253, 244)", // moss-50
            color: "rgb(63, 98, 18)", // moss-800
            borderColor: "rgb(63, 98, 18)",
            y: -2,
            boxShadow: "0 8px 20px rgba(77, 124, 15, 0.15)"
          },
          whileTap: { scale: 0.98, y: 0 }
        };
        
      case "ghost":
        return {
          initial: { 
            backgroundColor: "rgba(87, 83, 78, 0)", // transparent umber-700
            color: "rgb(87, 83, 78)" // umber-700
          },
          whileHover: { 
            backgroundColor: "rgb(240, 253, 244)", // moss-50
            color: "rgb(63, 98, 18)" // moss-800
          },
          whileTap: { scale: 0.95 }
        };
        
      default:
        return {
          initial: {},
          whileHover: { scale: 1.02 },
          whileTap: { scale: 0.98 }
        };
    }
  };

  const variantStyles = getVariantStyles(variant);

  return (
    <motion.button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      initial={variantStyles.initial}
      whileHover={variantStyles.whileHover}
      whileTap={variantStyles.whileTap}
      transition={{ duration: 0.2, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default Button;
