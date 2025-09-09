import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useOnboarding, ONBOARDING_STAGES } from '../../contexts/OnboardingContext';
import { useTheme, ThemeToggle } from '../../contexts/ThemeContext';
import UmberText from '../ui/UmberText';
import MindMapCanvas from '../mindMap/MindMapCanvas';
import ItemFlightAnimation, { useItemFlight } from '../mindMap/ItemFlightAnimation';

// Stage-specific components (we'll build these next)
const VoidStage = () => {
  const { getStageBackground } = useTheme();
  
  return (
    <div className={`min-h-screen ${getStageBackground('void')} flex items-center justify-center transition-colors duration-700`}>
      {/* The contemplative 2-second pause */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <motion.div
          className="w-16 h-16 rounded-full bg-gradient-to-r from-moss-400 to-moss-600 mx-auto mb-4"
          initial={{ scale: 0 }}
          animate={{ 
            scale: [0, 1.2, 1],
            opacity: [0, 1, 0.8] 
          }}
          transition={{ 
            duration: 1, 
            ease: "easeOut",
            delay: 1 
          }}
        />
        <motion.p
          className="text-lg text-umber-600 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <UmberText>let's build your space</UmberText>
        </motion.p>
      </motion.div>
    </div>
  );
};

const FoundationStage = () => {
  const { getStageBackground } = useTheme();
  const { advanceToFirstCreation } = useOnboarding();

  useEffect(() => {
    // Auto-advance after navigation skeleton is shown (3 seconds)
    const timer = setTimeout(() => {
      advanceToFirstCreation();
    }, 3000);

    return () => clearTimeout(timer);
  }, [advanceToFirstCreation]);

  return (
    <div className={`min-h-screen ${getStageBackground('foundation')} relative transition-colors duration-700`}>
      {/* Ghost Navigation Elements */}
      <NavigationSkeleton />
      
      {/* Foundation message */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2 }}
        >
          <p className="text-xl text-umber-700 dark:text-umber-300 font-light transition-colors duration-300">
            <UmberText>your workspace is awakening</UmberText>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const FirstCreationStage = () => {
  const { getStageBackground } = useTheme();
  
  return (
    <div className={`min-h-screen ${getStageBackground('creation')} relative transition-colors duration-700`}>
      {/* Active Navigation */}
      <NavigationSkeleton active />
      
      {/* Welcome Card positioned center-right */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-50">
        <WelcomeCard stage="firstCreation" />
      </div>
    </div>
  );
};

const CanvasAwakeningStage = () => {
  const { getStageBackground } = useTheme();
  const { flyingItems, handleFlightComplete } = useItemFlight();
  
  return (
    <div className={`min-h-screen ${getStageBackground('awakening')} relative transition-colors duration-700`}>
      {/* Active Navigation */}
      <NavigationSkeleton active />
      
      {/* Mind Map Canvas */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="w-full h-full"
        >
          <MindMapCanvas />
        </motion.div>
      </div>
      
      {/* Welcome Card for item addition */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-50">
        <WelcomeCard stage="canvasAwakening" />
      </div>
      
      {/* Flying item animations */}
      {flyingItems.map((flight) => (
        <ItemFlightAnimation
          key={flight.id}
          item={flight.item}
          startPosition={flight.startPosition}
          targetPosition={flight.targetPosition}
          onComplete={() => handleFlightComplete(flight.id, flight.item)}
        />
      ))}
    </div>
  );
};

const PatternEmergenceStage = () => {
  const { getStageBackground } = useTheme();
  
  return (
    <div className={`min-h-screen ${getStageBackground('emergence')} relative transition-colors duration-700`}>
      {/* Active Navigation */}
      <NavigationSkeleton active />
      
      {/* Mind map with multiple items */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-96 h-96">
          {/* Simple mind map representation */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-r from-umber-600 to-umber-700 flex items-center justify-center text-white text-sm font-semibold z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Books
          </motion.div>
          
          {/* Item nodes */}
          <motion.div
            className="absolute top-20 left-20 w-16 h-16 rounded-full bg-gradient-to-r from-moss-400 to-moss-600 flex items-center justify-center text-white text-xs"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Item 1
          </motion.div>
          
          <motion.div
            className="absolute bottom-20 right-20 w-16 h-16 rounded-full bg-gradient-to-r from-ochre-400 to-ochre-600 flex items-center justify-center text-white text-xs"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Item 2
          </motion.div>
          
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.line
              x1="50%" y1="50%" x2="30%" y2="30%"
              stroke="rgb(77, 124, 15)"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            <motion.line
              x1="50%" y1="50%" x2="70%" y2="70%"
              stroke="rgb(77, 124, 15)"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
          </svg>
        </div>
      </div>
      
      {/* Welcome Card for completion */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-50">
        <WelcomeCard stage="patternEmergence" />
      </div>
    </div>
  );
};

const CompleteStage = () => {
  const { getStageBackground } = useTheme();
  
  return (
    <div className={`min-h-screen ${getStageBackground('complete')} relative transition-colors duration-700`}>
      {/* Full active navigation */}
      <NavigationSkeleton active complete />
      
      {/* Success message */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-center max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-24 h-24 rounded-full bg-gradient-to-r from-moss-500 to-moss-600 flex items-center justify-center mx-auto mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
          >
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </motion.div>
          
          <h1 className="text-4xl font-display font-bold text-umber-800 mb-4">
            <UmberText>welcome to umber</UmberText>
          </h1>
          
          <p className="text-xl text-umber-600 mb-8">
            <UmberText>your contemplative commerce journey begins now</UmberText>
          </p>
          
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-moss-600 to-moss-700 text-white rounded-lg font-medium hover:from-moss-700 hover:to-moss-800 transition-all duration-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ y: -2, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
            whileTap={{ y: 0, scale: 0.98 }}
          >
            <UmberText>start exploring</UmberText>
          </motion.button>
        </motion.div>
      </div>
      
      {/* Minimized Welcome Card */}
      <motion.div
        className="fixed bottom-6 right-6 w-12 h-12 bg-moss-600 rounded-full flex items-center justify-center text-white cursor-pointer shadow-lg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        whileHover={{ scale: 1.1 }}
      >
        ?
      </motion.div>
    </div>
  );
};

// Placeholder components (we'll build these next)
const NavigationSkeleton = ({ active = false, complete = false }) => {
  return (
    <>
      {/* Top Navigation */}
      <motion.div
        className={`fixed top-0 left-0 right-0 h-16 bg-white/90 dark:bg-umber-900/90 backdrop-blur-sm border-b border-umber-100 dark:border-umber-700 z-40 transition-colors duration-300 ${
          active ? 'opacity-100' : 'opacity-70'
        }`}
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: active ? 1 : 0.7 }}
        transition={{ duration: 0.5, delay: 0 }}
      >
        <div className="flex items-center justify-between h-full px-6">
          <h1 className="text-2xl font-display font-bold text-umber-800 dark:text-umber-200 transition-colors duration-300">
            <UmberText>umber</UmberText>
          </h1>
          <div className="flex items-center gap-4">
            <div className={`w-8 h-8 rounded-full transition-colors duration-300 ${active ? 'bg-moss-200 dark:bg-moss-700' : 'bg-umber-200 dark:bg-umber-700'}`} />
            <div className={`w-8 h-8 rounded-full transition-colors duration-300 ${active ? 'bg-moss-200 dark:bg-moss-700' : 'bg-umber-200 dark:bg-umber-700'}`} />
          </div>
        </div>
      </motion.div>
      
      {/* Side Navigation */}
      <motion.div
        className={`fixed left-6 top-1/2 transform -translate-y-1/2 w-16 bg-white/90 dark:bg-umber-900/90 backdrop-blur-sm border border-umber-200 dark:border-umber-700 rounded-2xl shadow-lg p-2 z-40 transition-colors duration-300 ${
          active ? 'opacity-100' : 'opacity-70'
        }`}
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: active ? 1 : 0.7 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex flex-col gap-2">
          <div className={`w-12 h-12 rounded-xl transition-colors duration-300 ${active ? 'bg-moss-100 dark:bg-moss-800' : 'bg-umber-100 dark:bg-umber-800'}`} />
          <div className={`w-12 h-12 rounded-xl transition-colors duration-300 ${active ? 'bg-umber-50 dark:bg-umber-700' : 'bg-umber-100 dark:bg-umber-800'}`} />
          <div className={`w-12 h-12 rounded-xl transition-colors duration-300 ${active ? 'bg-umber-50 dark:bg-umber-700' : 'bg-umber-100 dark:bg-umber-800'}`} />
        </div>
      </motion.div>
      
      {/* Bottom Navigation */}
      <motion.div
        className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-umber-900/90 backdrop-blur-sm border border-umber-200 dark:border-umber-700 rounded-2xl shadow-lg px-6 py-3 z-40 transition-colors duration-300 ${
          active ? 'opacity-100' : 'opacity-70'
        }`}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: active ? 1 : 0.7 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="flex items-center gap-4">
          <div className={`w-8 h-8 rounded-lg transition-colors duration-300 ${active ? 'bg-moss-200 dark:bg-moss-700' : 'bg-umber-200 dark:bg-umber-700'}`} />
          <div className={`w-8 h-8 rounded-lg transition-colors duration-300 ${active ? 'bg-umber-100 dark:bg-umber-800' : 'bg-umber-200 dark:bg-umber-700'}`} />
          <div className={`w-8 h-8 rounded-lg transition-colors duration-300 ${active ? 'bg-umber-100 dark:bg-umber-800' : 'bg-umber-200 dark:bg-umber-700'}`} />
          <div className={`w-8 h-8 rounded-lg transition-colors duration-300 ${active ? 'bg-umber-100 dark:bg-umber-800' : 'bg-umber-200 dark:bg-umber-700'}`} />
        </div>
      </motion.div>
    </>
  );
};

const WelcomeCard = ({ stage }) => {
  const { createUmber, addItem, completeOnboarding, skipOnboarding } = useOnboarding();
  
  const getCardContent = () => {
    switch (stage) {
      case 'firstCreation':
        return {
          title: 'create your first umber',
          description: 'umbers are collections of things you want. start with something you\'re passionate about.',
          buttonText: 'create umber',
          onAction: () => createUmber({ name: 'Books' }) // Mock for now
        };
      
      case 'canvasAwakening':
        return {
          title: 'add your first item',
          description: 'what\'s something you\'ve been wanting? add it to see the magic happen.',
          buttonText: 'add item',
          onAction: () => addItem({ name: 'The Seven Husbands of Evelyn Hugo', price: 899 }, 1) // Mock
        };
      
      case 'patternEmergence':
        return {
          title: 'beautiful, isn\'t it?',
          description: 'this is your desire map. as you add more items, you\'ll discover patterns in what you want.',
          buttonText: 'complete onboarding',
          onAction: completeOnboarding
        };
      
      default:
        return {
          title: 'welcome',
          description: 'let\'s get started',
          buttonText: 'continue',
          onAction: () => {}
        };
    }
  };
  
  const content = getCardContent();
  
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl border border-umber-100 p-6 max-w-sm"
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      <h3 className="text-xl font-semibold text-umber-800 mb-3">
        <UmberText>{content.title}</UmberText>
      </h3>
      
      <p className="text-umber-600 mb-6 leading-relaxed">
        <UmberText>{content.description}</UmberText>
      </p>
      
      <div className="flex flex-col gap-3">
        <motion.button
          className="w-full px-4 py-3 bg-gradient-to-r from-moss-600 to-moss-700 text-white rounded-lg font-medium"
          onClick={content.onAction}
          whileHover={{ y: -2, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
          whileTap={{ y: 0, scale: 0.98 }}
        >
          <UmberText>{content.buttonText}</UmberText>
        </motion.button>
        
        <button
          className="text-sm text-umber-500 hover:text-umber-700 transition-colors"
          onClick={() => skipOnboarding('user_choice')}
        >
          <UmberText>skip for now</UmberText>
        </button>
      </div>
    </motion.div>
  );
};

// ===== MAIN COMPONENT =====
const OnboardingExperience = () => {
  const { currentStage, startOnboarding } = useOnboarding();
  
  // Start onboarding when component mounts
  useEffect(() => {
    startOnboarding();
  }, [startOnboarding]);
  
  const renderStage = () => {
    switch (currentStage) {
      case ONBOARDING_STAGES.VOID:
        return <VoidStage />;
      
      case ONBOARDING_STAGES.FOUNDATION:
        return <FoundationStage />;
      
      case ONBOARDING_STAGES.FIRST_CREATION:
        return <FirstCreationStage />;
      
      case ONBOARDING_STAGES.CANVAS_AWAKENING:
        return <CanvasAwakeningStage />;
      
      case ONBOARDING_STAGES.PATTERN_EMERGENCE:
        return <PatternEmergenceStage />;
      
      case ONBOARDING_STAGES.COMPLETE:
        return <CompleteStage />;
      
      default:
        return <VoidStage />;
    }
  };
  
  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderStage()}
        </motion.div>
      </AnimatePresence>
      
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle className="bg-white/80 dark:bg-umber-800/80 backdrop-blur-sm shadow-lg" />
      </div>
      
      {/* Debug info in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 left-4 bg-black/80 text-white px-3 py-2 rounded text-sm font-mono z-50">
          Stage: {currentStage}
        </div>
      )}
    </div>
  );
};

export default OnboardingExperience;
