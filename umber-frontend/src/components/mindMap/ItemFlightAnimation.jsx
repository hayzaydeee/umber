import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useOnboarding } from '../../contexts/OnboardingContext';

export function ItemFlightAnimation({ 
  item, 
  startPosition, 
  targetPosition, 
  onComplete,
  delay = 0 
}) {
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(true);

  const startAnimation = async () => {
    // Phase 1: Lift off with slight rotation and scale
    await controls.start({
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.3, ease: "easeOut" }
    });

    // Phase 2: Begin flight path with Bezier curve
    const midPoint = {
      x: (startPosition.x + targetPosition.x) / 2,
      y: startPosition.y - 100, // Arc upward
    };

    await controls.start({
      x: [startPosition.x, midPoint.x, targetPosition.x],
      y: [startPosition.y, midPoint.y, targetPosition.y],
      scale: [1.1, 0.8, 1],
      rotate: [5, 15, 0],
      transition: { 
        duration: 1.2, 
        ease: "easeInOut",
        times: [0, 0.5, 1]
      }
    });

    // Phase 3: Landing transformation (card → node)
    await controls.start({
      scale: 0.9,
      opacity: 0.8,
      transition: { duration: 0.2 }
    });

    // Complete the animation
    setIsVisible(false);
    onComplete?.(item);
  };

  // Auto-start animation when component mounts
  useEffect(() => {
    const timer = setTimeout(startAnimation, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!isVisible) return null;

  return (
    <motion.div
      animate={controls}
      initial={{ 
        x: startPosition.x, 
        y: startPosition.y,
        scale: 1,
        rotate: 0
      }}
      className="fixed z-50 pointer-events-none"
      style={{
        left: 0,
        top: 0,
      }}
    >
      {/* Flying Item Card - Using your design system colors */}
      <div className="bg-umber-50 dark:bg-umber-800 rounded-lg shadow-lg border-2 border-moss-200 dark:border-moss-700 p-3 min-w-[120px] transition-colors duration-300">
        <div className="flex items-center space-x-2">
          {item.image && (
            <img 
              src={item.image} 
              alt={item.name}
              className="w-8 h-8 rounded object-cover"
            />
          )}
          <div>
            <h4 className="font-semibold text-sm text-umber-900 dark:text-umber-100 transition-colors duration-300">{item.name}</h4>
            {item.price && (
              <p className="text-xs text-moss-600 dark:text-moss-400 transition-colors duration-300">${item.price}</p>
            )}
          </div>
        </div>
        
        {/* Trailing particles effect - Using your moss colors */}
        <motion.div
          className="absolute -right-1 top-1/2 w-2 h-2 bg-moss-400 dark:bg-moss-500 rounded-full transition-colors duration-300"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: 0.1,
          }}
        />
        <motion.div
          className="absolute -right-3 top-1/3 w-1 h-1 bg-moss-300 dark:bg-moss-600 rounded-full transition-colors duration-300"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: 0.2,
          }}
        />
      </div>
    </motion.div>
  );
}

// Hook to trigger item flight animations
export function useItemFlight() {
  const { currentStage, addItemToCanvas } = useOnboarding();
  const [flyingItems, setFlyingItems] = useState([]);

  const triggerItemFlight = (item, startElement, targetPosition) => {
    const startRect = startElement.getBoundingClientRect();
    const startPosition = {
      x: startRect.left + startRect.width / 2,
      y: startRect.top + startRect.height / 2,
    };

    const flightId = `flight-${Date.now()}-${Math.random()}`;
    
    setFlyingItems(prev => [...prev, {
      id: flightId,
      item,
      startPosition,
      targetPosition,
    }]);
  };

  const handleFlightComplete = (flightId, item) => {
    // Remove the flying item
    setFlyingItems(prev => prev.filter(f => f.id !== flightId));
    
    // Add to mind map canvas
    addItemToCanvas?.(item);
  };

  return {
    flyingItems,
    triggerItemFlight,
    handleFlightComplete,
  };
}

export default ItemFlightAnimation;