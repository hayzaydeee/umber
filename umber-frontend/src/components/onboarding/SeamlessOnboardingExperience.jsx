// ===== SEAMLESS ONBOARDING EXPERIENCE =====
// One continuous flow where components progressively appear and activate
// No stage transitions - everything exists on a persistent canvas

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useOnboarding, ONBOARDING_STAGES } from '../../contexts/OnboardingContext';
import { useTheme, ThemeToggle } from '../../contexts/ThemeContext';
import UmberText from '../ui/UmberText';
import MindMapCanvas from '../mindMap/MindMapCanvas';
import { CollaborativeWritingSequence } from './AnimationOptions';

// ===== MAIN SEAMLESS ONBOARDING CANVAS =====
const SeamlessOnboardingExperience = () => {
  const { currentStage, startOnboarding } = useOnboarding();

  // Start onboarding when component mounts
  useEffect(() => {
    startOnboarding();
  }, [startOnboarding]);

  return (
    <div className="min-h-screen bg-umber-950 relative overflow-hidden">
      {/* Void Stage: Initial animation sequence */}
      {currentStage === ONBOARDING_STAGES.VOID && <VoidSequence />}
      
      {/* Progressive Assembly: Components appear and stay */}
      {currentStage !== ONBOARDING_STAGES.VOID && (
        <>
          <NavigationAssembly />
          <EvolvingWelcomeCard />
          <ProgressiveCanvas />
          <ContextualTools />
        </>
      )}
      
      {/* Always Available */}
      <OnboardingProgress />
      <ThemeToggle className="fixed top-4 right-4 z-50 bg-white/80 dark:bg-umber-800/80 backdrop-blur-sm shadow-lg" />
      
      {/* Debug info in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 left-4 bg-black/80 text-white px-3 py-2 rounded text-sm font-mono z-50">
          Stage: {currentStage}
        </div>
      )}
    </div>
  );
};

// ===== VOID SEQUENCE =====
// The contemplative opening with washing effect that transitions to foundation
const VoidSequence = () => {
  const { advanceToFoundation } = useOnboarding();
  const { toggleTheme } = useTheme();
  const [userName] = useState('Alex'); // Mock for now
  const [textShouldFade, setTextShouldFade] = useState(false);

  const handleSequenceComplete = () => {
    setTextShouldFade(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-umber-50 to-white flex items-center justify-center absolute inset-0">
      <motion.div className="text-center relative max-w-6xl">
        
        {/* Collaborative Writing Animation */}
        <CollaborativeWritingSequence
          userName={userName}
          onComplete={handleSequenceComplete}
          shouldFade={textShouldFade}
        />

        {/* Washing Effect */}
        <AnimatePresence>
          {textShouldFade && (
            <>
              {/* First wave - Lighter wash */}
              <motion.div
                className="fixed inset-0 z-10 pointer-events-none"
                style={{
                  background: 'linear-gradient(45deg, rgba(77, 124, 15, 0.2), rgba(161, 98, 7, 0.2), rgba(146, 64, 14, 0.2))'
                }}
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: '0%', opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                onAnimationComplete={() => {
                  setTimeout(() => {
                    toggleTheme();
                    setTimeout(() => {
                      advanceToFoundation();
                    }, 500);
                  }, 500);
                }}
              />
              
              {/* Second wave - Darker wash */}
              <motion.div
                className="fixed inset-0 z-20 pointer-events-none bg-umber-950"
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 1.2, delay: 0.8, ease: "easeInOut" }}
              />
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// ===== NAVIGATION ASSEMBLY =====
// Stage 1: Foundation (2-5s) - Spatial memory creation
const NavigationAssembly = () => {
  const { currentStage } = useOnboarding();
  const [sideNavActive, setSideNavActive] = useState(false);
  const [sideNavHasUmber, setSideNavHasUmber] = useState(false);

  // SideNav activates when user starts typing in Stage 2
  useEffect(() => {
    if (currentStage === ONBOARDING_STAGES.FOUNDATION) {
      // Reset to foundation state
      setSideNavActive(false);
      setSideNavHasUmber(false);
    }
  }, [currentStage]);

  // Listen for umber creation to show actual umber in SideNav
  useEffect(() => {
    if (currentStage === ONBOARDING_STAGES.CANVAS_AWAKENING) {
      setSideNavHasUmber(true);
    }
  }, [currentStage]);

  return (
    <>
      {/* Top Navigation - EXACTLY per spec */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-16 bg-white/90 dark:bg-umber-900/90 backdrop-blur-sm border-b border-umber-100 dark:border-umber-700 z-40"
        style={{ opacity: 0.7 }} // FIXED at 70% opacity
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 0.7 }}
        transition={{ duration: 0.5, delay: 0 }} // Exact spec timing
      >
        <div className="flex items-center justify-between h-full px-6">
          <h1 className="text-2xl font-display font-bold text-umber-600 dark:text-umber-400">
            <UmberText>umber</UmberText>
          </h1>
          <div className="flex items-center gap-4">
            {/* Search (disabled) */}
            <div className="w-8 h-8 rounded-full bg-umber-200 dark:bg-umber-600 opacity-40" />
            {/* Profile (ghost) */}
            <div className="w-8 h-8 rounded-full bg-umber-200 dark:bg-umber-600 opacity-40" />
          </div>
        </div>
      </motion.div>
      
      {/* Side Navigation - Transforms based on user action */}
      <motion.div
        className="fixed left-6 top-1/2 transform -translate-y-1/2 w-16 bg-white/90 dark:bg-umber-900/90 backdrop-blur-sm border border-umber-200 dark:border-umber-700 rounded-2xl shadow-lg p-2 z-40 transition-all duration-300"
        initial={{ x: -240, opacity: 0 }}
        animate={{ 
          x: 0, 
          opacity: sideNavActive ? 1.0 : 0.7,
          boxShadow: sideNavActive 
            ? "0 0 20px rgba(77, 124, 15, 0.3)" // Subtle glow when active
            : "0 4px 6px rgba(0, 0, 0, 0.1)"
        }}
        transition={{ duration: 0.5, delay: 0.5 }} // Exact spec timing
      >
        <div className="flex flex-col gap-2">
          {sideNavHasUmber ? (
            // Show actual umber after creation
            <motion.div 
              className="w-12 h-12 rounded-xl bg-moss-100 dark:bg-moss-800 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <span className="text-lg">📚</span>
            </motion.div>
          ) : (
            // Empty state placeholder
            <div className="w-12 h-12 rounded-xl bg-umber-100 dark:bg-umber-700 opacity-60" />
          )}
          <div className="w-12 h-12 rounded-xl bg-umber-100 dark:bg-umber-700 opacity-40" />
          <div className="w-12 h-12 rounded-xl bg-umber-100 dark:bg-umber-700 opacity-40" />
        </div>
        
        {/* "Your umbers will appear here" tooltip */}
        {!sideNavActive && (
          <motion.div
            className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-umber-50 dark:bg-umber-800 border border-umber-200 dark:border-umber-600 rounded-lg px-3 py-2 shadow-lg pointer-events-none"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.5, duration: 0.3 }}
          >
            <p className="text-xs text-umber-600 dark:text-umber-400 whitespace-nowrap">
              <UmberText>Your umbers will appear here</UmberText>
            </p>
          </motion.div>
        )}
      </motion.div>
      
      {/* Bottom Navigation - All tools visible but disabled */}
      <motion.div
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-umber-900/90 backdrop-blur-sm border border-umber-200 dark:border-umber-700 rounded-2xl shadow-lg px-6 py-3 z-40"
        style={{ opacity: 0.7 }} // FIXED at 70% opacity
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 0.7 }}
        transition={{ duration: 0.5, delay: 1.0 }} // Exact spec timing
      >
        <BottomNavTools />
      </motion.div>
    </>
  );

  // Expose method for WelcomeCard to trigger SideNav activation
  window.activateSideNav = (active) => setSideNavActive(active);
};

// ===== BOTTOM NAV TOOLS =====
// Stage 4: Tools activate contextually based on need
const BottomNavTools = () => {
  const { currentStage, ...state } = useOnboarding();
  
  const tools = [
    {
      id: 'views',
      icon: '🔄',
      tooltip: 'Switch between layouts',
      unlockAfter: 1, // After first item
      active: false
    },
    {
      id: 'filter', 
      icon: '🔍',
      tooltip: 'Filter your items',
      unlockAfter: 2, // After second item
      active: false
    },
    {
      id: 'nests',
      icon: '📁', 
      tooltip: 'Organize into groups',
      unlockAfter: 3, // After third item
      active: false
    },
    {
      id: 'add',
      icon: '➕',
      tooltip: 'Quick add item',
      unlockAfter: 1,
      active: false
    }
  ];

  const itemCount = state.userCreations?.items?.length || 0;

  return (
    <div className="flex items-center gap-4">
      {tools.map((tool, i) => {
        const isUnlocked = itemCount >= tool.unlockAfter;
        const shouldGlow = isUnlocked && itemCount === tool.unlockAfter;

        return (
          <motion.div
            key={tool.id}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
              isUnlocked 
                ? 'bg-moss-100 dark:bg-moss-800 opacity-100 cursor-pointer' 
                : 'bg-umber-200 dark:bg-umber-600 opacity-40 cursor-not-allowed'
            }`}
            animate={shouldGlow ? {
              boxShadow: [
                "0 0 0 0 rgba(77, 124, 15, 0.7)",
                "0 0 0 10px rgba(77, 124, 15, 0)",
                "0 0 0 0 rgba(77, 124, 15, 0)"
              ]
            } : {}}
            transition={{ 
              duration: 1, 
              repeat: shouldGlow ? 3 : 0,
              delay: 0.5 
            }}
            whileHover={isUnlocked ? { scale: 1.1 } : {}}
            title={tool.tooltip}
          >
            <span className="text-sm">{tool.icon}</span>
          </motion.div>
        );
      })}
    </div>
  );
};

// ===== EVOLVING WELCOME CARD =====
// Content changes based on stage, position stays consistent - ONLY element at 100% opacity
const EvolvingWelcomeCard = () => {
  const { currentStage, createUmber, addItem, ...state } = useOnboarding();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const categories = [
    { name: 'Books', emoji: '📚', color: 'moss' },
    { name: 'Tech', emoji: '💻', color: 'ochre' },
    { name: 'Fashion', emoji: '👕', color: 'umber' },
    { name: 'Wellness', emoji: '🧘', color: 'moss' }
  ];

  // Stage 2: Handle typing to activate SideNav
  useEffect(() => {
    if (selectedCategory && currentStage === ONBOARDING_STAGES.FOUNDATION) {
      setIsTyping(true);
      // Activate SideNav through global method
      if (window.activateSideNav) {
        window.activateSideNav(true);
      }
    }
  }, [selectedCategory, currentStage]);

  const handleUmberCreation = () => {
    if (selectedCategory) {
      createUmber({ 
        name: selectedCategory.name, 
        category: selectedCategory.name 
      });
    }
  };

  // Stage 3: Handle item addition with the "money shot" animation
  const handleAddItem = () => {
    const activeUmber = state.userCreations.umbers[0];
    if (activeUmber) {
      // This will trigger the magical card-to-node flight animation
      addItem({ 
        name: 'The Seven Husbands of Evelyn Hugo', 
        price: 1299,
        image: null,
        url: null
      }, activeUmber.id);
    }
  };

  const getCardContent = () => {
    switch (currentStage) {
      case ONBOARDING_STAGES.FOUNDATION:
        return {
          title: 'create your first umber',
          description: 'umbers are collections of things you want. choose a category that excites you.',
          buttonText: selectedCategory ? `create ${selectedCategory.name} umber` : 'choose category',
          onAction: selectedCategory ? handleUmberCreation : null,
          showCategories: true
        };
      
      case ONBOARDING_STAGES.CANVAS_AWAKENING:
        return {
          title: 'add your first item',
          description: 'what\'s something you\'ve been wanting? add it to see the magic happen.',
          buttonText: 'add item',
          onAction: handleAddItem,
          showCategories: false,
          showItemPreview: true
        };

      case ONBOARDING_STAGES.TOOL_ACTIVATION:
        return {
          title: 'tools unlocked! ⚡',
          description: 'your workspace is complete. explore the tools in the bottom bar to organize and filter your items.',
          buttonText: 'start exploring',
          onAction: () => {}, // Complete onboarding
          showCategories: false
        };
      
      default:
        return {
          title: 'welcome to your umber workspace',
          description: 'let\'s create something amazing together.',
          buttonText: 'continue',
          onAction: () => {},
          showCategories: false
        };
    }
  };

  const content = getCardContent();

  return (
    <motion.div 
      className="fixed right-16 top-1/2 transform -translate-y-1/2 z-50"
      initial={{ opacity: 0, x: 30, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }} // FULL OPACITY - only element at 100%
      transition={{ duration: 0.5, delay: 2.0 }} // Exact spec timing - arrives last
    >
      <div className="bg-white dark:bg-umber-800 rounded-2xl shadow-xl border border-umber-100 dark:border-umber-700 p-6 max-w-sm">
        <motion.h3 
          className="text-xl font-semibold text-umber-800 dark:text-umber-200 mb-3"
          key={content.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <UmberText>{content.title}</UmberText>
        </motion.h3>
        
        <motion.p 
          className="text-umber-600 dark:text-umber-400 mb-6 leading-relaxed"
          key={content.description}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <UmberText>{content.description}</UmberText>
        </motion.p>
        
        {/* Stage 2: Category selection */}
        {content.showCategories && (
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category.name}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedCategory?.name === category.name
                      ? 'border-moss-500 bg-moss-50 dark:bg-moss-900'
                      : 'border-gray-200 dark:border-gray-600 hover:border-moss-300'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-2xl mb-1">{category.emoji}</div>
                  <div className="text-sm font-medium text-umber-700 dark:text-umber-300">
                    {category.name}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Stage 3: Item preview before the magic */}
        {content.showItemPreview && (
          <motion.div 
            className="mb-6 p-4 border border-umber-200 dark:border-umber-600 rounded-lg"
            id="item-preview-card" // For flight animation positioning
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-moss-100 dark:bg-moss-800 rounded-lg flex items-center justify-center">
                <span className="text-lg">📚</span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-umber-800 dark:text-umber-200">
                  The Seven Husbands of Evelyn Hugo
                </h4>
                <p className="text-sm text-umber-600 dark:text-umber-400">$12.99</p>
              </div>
            </div>
          </motion.div>
        )}
        
        <motion.button
          className={`w-full px-4 py-3 rounded-lg font-medium ${
            content.onAction 
              ? 'bg-gradient-to-r from-moss-600 to-moss-700 text-white hover:shadow-lg'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
          onClick={content.onAction}
          disabled={!content.onAction}
          whileHover={content.onAction ? { y: -2 } : {}}
          whileTap={content.onAction ? { y: 0, scale: 0.98 } : {}}
        >
          <UmberText>{content.buttonText}</UmberText>
        </motion.button>
      </div>
    </motion.div>
  );
};

// ===== PROGRESSIVE CANVAS =====
// Stage 3: The Canvas Awakens - THE MONEY SHOT
const ProgressiveCanvas = () => {
  const { currentStage, ...state } = useOnboarding();
  const [canvasOpacity, setCanvasOpacity] = useState(0);
  const [showFlightAnimation, setShowFlightAnimation] = useState(false);
  const [flightComplete, setFlightComplete] = useState(false);

  // Stage 3: Canvas starts materializing (10% opacity) when umber is created
  useEffect(() => {
    if (currentStage === ONBOARDING_STAGES.CANVAS_AWAKENING && state.userCreations.umbers.length > 0) {
      setCanvasOpacity(0.1);
    }
  }, [currentStage, state.userCreations.umbers]);

  // Stage 3: Item flight animation when first item is added
  useEffect(() => {
    if (state.userCreations.items.length > 0 && !flightComplete) {
      setShowFlightAnimation(true);
      // After flight completes, reveal full canvas
      setTimeout(() => {
        setFlightComplete(true);
        setCanvasOpacity(1);
      }, 1000); // Flight animation duration
    }
  }, [state.userCreations.items, flightComplete]);

  if (currentStage === ONBOARDING_STAGES.VOID) return null;

  return (
    <>
      {/* Canvas materializes gradually */}
      <motion.div
        className="absolute inset-0 pt-16 pb-20 px-24"
        animate={{ opacity: canvasOpacity }}
        transition={{ duration: 0.5 }}
      >
        {/* Faint circular outline in center - Stage 2 hint */}
        {currentStage === ONBOARDING_STAGES.CANVAS_AWAKENING && state.userCreations.umbers.length > 0 && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-moss-300 dark:border-moss-700 rounded-full opacity-30"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        )}
        
        {/* Mind Map Canvas */}
        {flightComplete && <MindMapCanvas />}
      </motion.div>

      {/* Stage 3: THE MONEY SHOT - Item Flight Animation */}
      {showFlightAnimation && (
        <ItemFlightAnimation 
          onComplete={() => setFlightComplete(true)}
        />
      )}
    </>
  );
};

// ===== ITEM FLIGHT ANIMATION =====
// The magical card-to-node transformation that creates the "aha" moment
const ItemFlightAnimation = ({ onComplete }) => {
  const [flightProgress, setFlightProgress] = useState(0);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [endPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    // Capture start position from the item preview card
    const previewCard = document.getElementById('item-preview-card');
    if (previewCard) {
      const rect = previewCard.getBoundingClientRect();
      setStartPosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    }

    // Flight animation
    const duration = 800;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setFlightProgress(progress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        onComplete();
      }
    };
    
    requestAnimationFrame(animate);
  }, [onComplete]);

  // Calculate current position using bezier curve
  const currentPosition = {
    x: startPosition.x + (endPosition.x - startPosition.x) * flightProgress,
    y: startPosition.y + (endPosition.y - startPosition.y) * flightProgress - Math.sin(flightProgress * Math.PI) * 100 // Arc upward
  };

  // Transform during flight - card becomes node
  const getTransform = () => {
    if (flightProgress < 0.5) {
      // First half: Still mostly card-like
      return {
        borderRadius: 8 - (flightProgress * 8),
        scale: 1 + (flightProgress * 0.2),
        width: 200 - (flightProgress * 50),
        height: 80 - (flightProgress * 20)
      };
    } else {
      // Second half: Becoming node-like
      const secondHalfProgress = (flightProgress - 0.5) * 2;
      return {
        borderRadius: secondHalfProgress * 64, // Becomes circular
        scale: 1.2 - (secondHalfProgress * 0.4),
        width: 150 - (secondHalfProgress * 90), // Becomes 60px circle
        height: 60
      };
    }
  };

  const transform = getTransform();

  return (
    <motion.div
      className="fixed pointer-events-none z-50 bg-white dark:bg-umber-800 border border-umber-200 dark:border-umber-600 flex items-center justify-center"
      style={{
        left: currentPosition.x - transform.width / 2,
        top: currentPosition.y - transform.height / 2,
        width: transform.width,
        height: transform.height,
        borderRadius: transform.borderRadius,
        transform: `scale(${transform.scale})`,
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}
      animate={{
        opacity: flightProgress < 0.9 ? 1 : 0
      }}
    >
      {flightProgress < 0.5 ? (
        // Card appearance
        <div className="flex items-center gap-2 p-2">
          <span className="text-lg">📚</span>
          <div className="text-xs">
            <div className="font-medium">Book</div>
            <div className="text-gray-500">$12.99</div>
          </div>
        </div>
      ) : (
        // Node appearance
        <span className="text-lg">📚</span>
      )}
    </motion.div>
  );
};

// ===== CONTEXTUAL TOOLS =====
// Tools activate based on need, not time
const ContextualTools = () => {
  // This will connect to the bottom nav and activate tools contextually
  // For now, it's a placeholder
  return null;
};

// ===== ONBOARDING PROGRESS =====
// Persistent progress indicator
const OnboardingProgress = () => {
  const { currentStage } = useOnboarding();
  
  const getProgressData = () => {
    switch (currentStage) {
      case ONBOARDING_STAGES.VOID:
        return { active: 0, total: 6 };
      case ONBOARDING_STAGES.FOUNDATION:
        return { active: 1, total: 6 };
      case ONBOARDING_STAGES.CANVAS_AWAKENING:
        return { active: 2, total: 6 };
      case ONBOARDING_STAGES.TOOL_ACTIVATION:
        return { active: 4, total: 6 };
      case ONBOARDING_STAGES.COMPLETE:
        return { active: 6, total: 6 };
      default:
        return { active: 0, total: 6 };
    }
  };

  const { active, total } = getProgressData();

  return (
    <motion.div
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 3.5 }}
    >
      <div className="flex items-center gap-2">
        {[...Array(total)].map((_, i) => (
          <motion.div 
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-500 ${
              i < active ? 'bg-moss-500' : 'bg-umber-300'
            }`}
            animate={i === active - 1 ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default SeamlessOnboardingExperience;
