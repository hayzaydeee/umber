import { useEffect } from 'react';
import { motion } from 'motion/react';
import Button from '../../ui/Button';
import UmberText from '../../ui/UmberText';

const SuccessCard = ({ 
  title,
  description,
  autoAdvance = false,
  autoAdvanceDelay = 3000,
  buttonText = "continue",
  onAdvance 
}) => {

  useEffect(() => {
    if (autoAdvance && onAdvance) {
      console.log('🎯 SuccessCard: Setting up auto-advance timer', { autoAdvanceDelay });
      const timer = setTimeout(() => {
        console.log('⏰ SuccessCard: Auto-advance timer triggered, calling onAdvance');
        onAdvance();
      }, autoAdvanceDelay);

      return () => {
        console.log('🧹 SuccessCard: Cleaning up auto-advance timer');
        clearTimeout(timer);
      };
    } else {
      console.log('🚫 SuccessCard: Auto-advance not enabled', { autoAdvance, onAdvance: !!onAdvance });
    }
  }, [autoAdvance, autoAdvanceDelay, onAdvance]);

  return (
    <div className="p-8 text-center">
      {/* Success Animation */}
      <motion.div
        className="mb-6 flex justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: 0.1 
        }}
      >
        <motion.div
          className="relative"
          animate={{ 
            rotate: [0, -5, 5, -5, 0],
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut"
          }}
        >
          {/* Success checkmark */}
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
            <motion.svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </motion.svg>
          </div>

          {/* Confetti particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: ['#ff7300', '#ffa500', '#ffb347', '#ffd700'][i % 4],
                top: '50%',
                left: '50%',
              }}
              initial={{ 
                scale: 0,
                x: 0,
                y: 0,
                opacity: 1
              }}
              animate={{ 
                scale: [0, 1, 0],
                x: Math.cos((i * 45) * Math.PI / 180) * 60,
                y: Math.sin((i * 45) * Math.PI / 180) * 60,
                opacity: [1, 1, 0]
              }}
              transition={{ 
                duration: 1.5,
                delay: 0.5 + (i * 0.1),
                repeat: Infinity,
                repeatDelay: 4
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <UmberText 
          variant="h3" 
          className="text-umber-800 mb-3"
        >
          {title}
        </UmberText>
        
        <UmberText 
          variant="body" 
          className="text-umber-600 leading-relaxed"
        >
          {description}
        </UmberText>
      </motion.div>

      {/* Action Button (only if not auto-advancing) */}
      {!autoAdvance && onAdvance && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button 
            onClick={onAdvance}
            className="px-8 py-3"
          >
            {buttonText}
          </Button>
        </motion.div>
      )}

      {/* Auto-advance progress indicator */}
      {autoAdvance && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6"
        >
          <div className="flex justify-center items-center space-x-2 text-umber-500">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="w-4 h-4"
            >
              <svg 
                className="w-full h-full" 
                viewBox="0 0 24 24" 
                fill="none"
              >
                <circle 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                  strokeDasharray="60"
                  strokeDashoffset="60"
                  opacity="0.3"
                />
                <motion.circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="60"
                  initial={{ strokeDashoffset: 60 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ 
                    duration: autoAdvanceDelay / 1000,
                    ease: "linear" 
                  }}
                />
              </svg>
            </motion.div>
            <UmberText variant="tiny" className="text-umber-500">
              continuing automatically...
            </UmberText>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SuccessCard;
