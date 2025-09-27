import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import UmberText from '../../ui/UmberText';

const DragInstructionCard = ({ 
  title,
  description,
  targetElement,
  instructionType = 'drag', // 'drag', 'click', 'hover'
  onDragDetected,
  onInstructionComplete 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [showPointer, setShowPointer] = useState(true);

  useEffect(() => {
    // Simulate drag detection for demo purposes
    // In real implementation, this would listen to actual drag events
    const checkForDrag = () => {
      if (targetElement) {
        const element = document.querySelector(`[data-element="${targetElement}"]`);
        if (element) {
          // Listen for actual drag events
          const handleDragStart = () => {
            setIsDragging(true);
            setShowPointer(false);
            onDragDetected?.();
          };

          const handleDragEnd = () => {
            setIsDragging(false);
          };

          element.addEventListener('dragstart', handleDragStart);
          element.addEventListener('dragend', handleDragEnd);

          return () => {
            element.removeEventListener('dragstart', handleDragStart);
            element.removeEventListener('dragend', handleDragEnd);
          };
        }
      }
    };

    const cleanup = checkForDrag();
    return cleanup;
  }, [targetElement, onDragDetected]);

  const getInstructionIcon = () => {
    switch (instructionType) {
      case 'drag':
        return (
          <svg className="w-8 h-8 text-umber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        );
      case 'click':
        return (
          <svg className="w-8 h-8 text-umber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-umber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3.5M3 16.5h18" />
          </svg>
        );
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <UmberText variant="h3" className="text-umber-800 mb-3">
          {title}
        </UmberText>
        <UmberText variant="body" className="text-umber-600 leading-relaxed">
          {description}
        </UmberText>
      </div>

      {/* Interactive Instruction Area */}
      <div className="flex flex-col items-center space-y-6">
        
        {/* Instruction Icon */}
        <motion.div
          className="relative flex items-center justify-center"
          animate={showPointer ? { scale: [1, 1.1, 1] } : { scale: 1 }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="p-4 bg-umber-100 rounded-full">
            {getInstructionIcon()}
          </div>

          {/* Animated pointer for drag instruction */}
          <AnimatePresence>
            {showPointer && instructionType === 'drag' && (
              <motion.div
                className="absolute"
                initial={{ opacity: 0, x: -20, y: -20 }}
                animate={{ 
                  opacity: [0, 1, 1, 0],
                  x: [-20, 0, 20, 40],
                  y: [-20, 0, 20, 40]
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                <div className="w-6 h-6 bg-umber-500 rounded-full shadow-lg" />
                <motion.div
                  className="absolute inset-0 w-6 h-6 bg-umber-500 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Visual Target Indicator */}
        <motion.div
          className="flex items-center space-x-3 text-umber-500"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.div>
          <UmberText variant="small" className="text-umber-600">
            {targetElement === 'umber-node' && 'find the umber node in the mind map'}
            {targetElement === 'nest-node' && 'find the nest node you just created'}
            {!targetElement?.includes('node') && 'look for the highlighted area'}
          </UmberText>
        </motion.div>

        {/* Status Feedback */}
        <AnimatePresence>
          {isDragging && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-green-100 border border-green-300 rounded-lg p-3"
            >
              <div className="flex items-center space-x-2 text-green-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <UmberText variant="small">
                  perfect! keep dragging...
                </UmberText>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <UmberText variant="tiny" className="text-umber-500">
            {instructionType === 'drag' && 'click and hold, then drag to create a connection'}
            {instructionType === 'click' && 'click when you\'re ready'}
            {instructionType === 'hover' && 'hover over the element to see options'}
          </UmberText>
        </motion.div>
      </div>

      {/* Progress indicator */}
      <motion.div 
        className="mt-8 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === 1 ? 'bg-umber-500' : 'bg-umber-200'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DragInstructionCard;
