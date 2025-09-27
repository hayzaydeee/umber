import { useState } from 'react';
import { motion } from 'motion/react';
import Button from '../../ui/Button';
import UmberText from '../../ui/UmberText';

const CreationGuide = ({ 
  title, 
  description, 
  buttonText = "continue",
  onContinue 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <UmberText 
            variant="h2" 
            className="text-umber-800 mb-3"
          >
            {title}
          </UmberText>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <UmberText 
            variant="body" 
            className="text-umber-600 leading-relaxed"
          >
            {description}
          </UmberText>
        </motion.div>
      </div>

      {/* Visual Element */}
      <motion.div 
        className="mb-8 flex justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="relative">
          {/* Animated Circle */}
          <motion.div
            className="w-24 h-24 rounded-full bg-gradient-to-br from-umber-400 to-umber-600 flex items-center justify-center shadow-lg"
            animate={{ 
              scale: isHovered ? 1.05 : 1,
              boxShadow: isHovered 
                ? "0 20px 25px -5px rgba(255, 115, 0, 0.1), 0 10px 10px -5px rgba(255, 115, 0, 0.04)"
                : "0 10px 15px -3px rgba(255, 115, 0, 0.1), 0 4px 6px -2px rgba(255, 115, 0, 0.05)"
            }}
            transition={{ duration: 0.2 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <motion.div
              animate={{ rotate: isHovered ? 5 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg 
                className="w-10 h-10 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
                />
              </svg>
            </motion.div>
          </motion.div>

          {/* Floating particles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-umber-300 rounded-full"
              style={{
                top: `${20 + i * 20}%`,
                left: `${80 + i * 10}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Action Button */}
      <motion.div 
        className="flex justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Button 
          onClick={onContinue}
          className="px-8 py-3 min-w-[140px]"
        >
          {buttonText}
        </Button>
      </motion.div>

      {/* Progress indicator */}
      <motion.div 
        className="mt-6 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === 0 ? 'bg-umber-500' : 'bg-umber-200'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CreationGuide;
