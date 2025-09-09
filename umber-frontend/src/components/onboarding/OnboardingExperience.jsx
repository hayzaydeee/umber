import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useOnboarding, ONBOARDING_STAGES } from '../../contexts/OnboardingContext';
import { useTheme, ThemeToggle } from '../../contexts/ThemeContext';
import UmberText from '../ui/UmberText';
import MindMapCanvas from '../mindMap/MindMapCanvas';
import ItemFlightAnimation, { useItemFlight } from '../mindMap/ItemFlightAnimation';
import { CollaborativeWritingSequence } from './AnimationOptions';

// Stage-specific components (we'll build these next)
const VoidStage = () => {
  const { toggleTheme } = useTheme();
  const [userName, setUserName] = useState('Alex'); // Mock for now
  const [textShouldFade, setTextShouldFade] = useState(false);

  const handleSequenceComplete = () => {
    setTextShouldFade(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-umber-50 to-white flex items-center justify-center">
      <motion.div className="text-center relative max-w-6xl">
        
        {/* Using Collaborative Writing Animation from AnimationOptions */}
        <CollaborativeWritingSequence
          userName={userName}
          onComplete={handleSequenceComplete}
          shouldFade={textShouldFade}
          className=""
        />

        {/* Washing Effect */}
        <AnimatePresence>
          {textShouldFade && (
            <>
              {/* First wave - Lighter moss wash */}
              <motion.div
                className="fixed inset-0 z-10 pointer-events-none"
                style={{
                  background: 'linear-gradient(45deg, rgba(77, 124, 15, 0.2), rgba(161, 98, 7, 0.2), rgba(146, 64, 14, 0.2))'
                }}
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: '0%', opacity: 1 }}
                transition={{ 
                  duration: 1.5, 
                  ease: "easeInOut" 
                }}
                onAnimationComplete={() => {
                  setTimeout(() => {
                    toggleTheme();
                  }, 200);
                }}
              />
              
              {/* Second wave - Medium earth wash */}
              <motion.div
                className="fixed inset-0 z-20 pointer-events-none"
                style={{
                  background: 'linear-gradient(45deg, rgba(146, 64, 14, 0.4), rgba(120, 53, 15, 0.4), rgba(161, 98, 7, 0.4))'
                }}
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: '0%', opacity: 1 }}
                transition={{ 
                  duration: 1.8, 
                  delay: 0.3,
                  ease: "easeInOut" 
                }}
              />
              
              {/* Final wave - Dark mode wash */}
              <motion.div
                className="fixed inset-0 z-30 pointer-events-none"
                style={{
                  background: 'linear-gradient(45deg, #171717, #262626, #171717)'
                }}
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: '0%', opacity: 1 }}
                transition={{ 
                  duration: 2, 
                  delay: 0.6,
                  ease: "easeInOut" 
                }}
              />
            </>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
};

const FoundationStage = () => {
  const { createUmber } = useOnboarding();
  const [isCreatingUmber, setIsCreatingUmber] = React.useState(false);
  const [umbersideNavActive, setUmberSideNavActive] = React.useState(false);

  return (
    <div className="min-h-screen bg-umber-950 relative">
      {/* Spatial Assembly - Navigation slides in from edges */}
      <NavigationSkeleton sideNavActive={umbersideNavActive} />
      
      {/* Welcome Card - Interactive Creation (center-right, full opacity) */}
      <motion.div 
        className="absolute right-16 top-1/2 transform -translate-y-1/2 z-50"
        initial={{ opacity: 0, x: 30, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ 
          duration: 0.8, 
          delay: 2.0,  // 2 second delay as per proposal
          ease: [0.645, 0.045, 0.355, 1.000]
        }}
      >
        <WelcomeCard 
          stage="firstCreation" 
          onUmberTyping={(text) => {
            // Activate SideNav as user types
            setUmberSideNavActive(text.length > 0);
          }}
          onUmberCreation={(umber) => {
            setIsCreatingUmber(true);
            createUmber(umber);
          }}
        />
      </motion.div>
      
      {/* Foundation messages - ambient background context */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center space-y-8">
          {/* Phase 1: Foundation message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <p className="text-lg text-umber-400/60 font-light">
              <UmberText>foundation</UmberText>
            </p>
          </motion.div>
          
          {/* Phase 2: Creation prompt appears after navigation is assembled */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.8 }}
          >
            <p className="text-sm text-umber-400/80 font-light max-w-md">
              <UmberText>create your first umber to see the interface come alive</UmberText>
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Progress indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 3.5 }}
      >
        <div className="flex items-center gap-2">
          <motion.div 
            className="w-2 h-2 rounded-full bg-moss-500"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div 
            className={`w-2 h-2 rounded-full transition-colors duration-500 ${
              umbersideNavActive ? 'bg-moss-500' : 'bg-umber-300'
            }`}
            animate={umbersideNavActive ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="w-2 h-2 rounded-full bg-umber-300"></div>
          <div className="w-2 h-2 rounded-full bg-umber-300"></div>
          <div className="w-2 h-2 rounded-full bg-umber-300"></div>
          <div className="w-2 h-2 rounded-full bg-umber-300"></div>
        </div>
      </motion.div>
    </div>
  );
};

const CanvasAwakeningStage = () => {
  const { flyingItems, handleFlightComplete } = useItemFlight();
  const { ...state } = useOnboarding();
  
  // Show different content based on how many items exist
  const hasNoItems = state.userCreations.items.length === 0;
  const hasOneItem = state.userCreations.items.length === 1;
  const hasMultipleItems = state.userCreations.items.length >= 2;
  
  return (
    <div className="min-h-screen bg-umber-950 relative">
      {/* Active Navigation with tool activation */}
      <NavigationSkeleton active />
      
      {/* Mind Map Canvas - grows more sophisticated as items are added */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            // Add subtle pulse when pattern emerges
            ...(hasMultipleItems && {
              scale: [1, 1.02, 1],
              transition: { duration: 2, delay: 1 }
            })
          }}
          transition={{ duration: 0.8, type: "spring" }}
          className="w-full h-full"
        >
          <MindMapCanvas />
        </motion.div>
      </div>
      
      {/* Pattern emergence celebration */}
      {hasMultipleItems && (
        <motion.div
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 3, delay: 0.5 }}
        >
          <div className="text-6xl">✨</div>
        </motion.div>
      )}
      
      {/* Contextual messaging overlay */}
      {hasMultipleItems && (
        <motion.div
          className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <div className="bg-white/90 dark:bg-umber-900/90 backdrop-blur-sm border border-umber-200 dark:border-umber-700 rounded-lg px-4 py-2 shadow-lg">
            <p className="text-sm text-umber-600 dark:text-umber-300">
              <UmberText>beautiful patterns are emerging... ✨</UmberText>
            </p>
          </div>
        </motion.div>
      )}
      
      {/* Welcome Card with dynamic content */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-50">
        <WelcomeCard 
          stage={hasMultipleItems ? "patternEmergence" : "canvasAwakening"} 
        />
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
      
      {/* Progress indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-moss-500"></div>
          <div className="w-2 h-2 rounded-full bg-moss-500"></div>
          <div className="w-2 h-2 rounded-full bg-moss-500"></div>
          <div className={`w-2 h-2 rounded-full ${hasMultipleItems ? 'bg-moss-500' : 'bg-umber-300'}`}></div>
        </div>
      </motion.div>
    </div>
  );
};

const ToolActivationStage = () => {
  const { completeOnboarding, ...state } = useOnboarding();
  
  // Auto-progress to completion after tools are shown
  useEffect(() => {
    const timer = setTimeout(() => {
      completeOnboarding();
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [completeOnboarding]);
  
  return (
    <div className="min-h-screen bg-umber-950 relative">
      {/* Fully Active Navigation with tool highlights */}
      <NavigationSkeleton active complete />
      
      {/* Main Canvas with full interactivity */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0.9 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          <MindMapCanvas />
        </motion.div>
      </div>
      
      {/* Tool activation celebration */}
      <motion.div
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="bg-white/90 dark:bg-umber-900/90 backdrop-blur-sm border border-umber-200 dark:border-umber-700 rounded-lg px-6 py-3 shadow-lg">
          <p className="text-sm text-umber-600 dark:text-umber-300 text-center">
            <UmberText>tools unlocked! ⚡ try exploring your new workspace</UmberText>
          </p>
        </div>
      </motion.div>
      
      {/* Final completion card */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-50">
        <WelcomeCard stage="toolActivation" />
      </div>
    </div>
  );
};

const CompleteStage = () => {
  
  return (
    <div className="min-h-screen bg-umber-950 relative">
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

// Enhanced Navigation Skeleton - Stage 1+2: Foundation + First Creation
const NavigationSkeleton = ({ active = false, complete = false, sideNavActive = false }) => {
  return (
    <>
      {/* Top Navigation - Spatial Assembly */}
      <motion.div
        className={`fixed top-0 left-0 right-0 h-16 bg-white/90 dark:bg-umber-900/90 backdrop-blur-sm border-b border-umber-100 dark:border-umber-700 z-40 transition-colors duration-300`}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 0.7 }}
        transition={{ 
          duration: 0.8, 
          delay: 0,
          ease: [0.645, 0.045, 0.355, 1.000] // Custom easing for spatial assembly feel
        }}
      >
        <div className="flex items-center justify-between h-full px-6">
          <motion.h1 
            className="text-2xl font-display font-bold text-umber-600 dark:text-umber-400 transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.3 }}
          >
            <UmberText>umber</UmberText>
          </motion.h1>
          <div className="flex items-center gap-4">
            <motion.div 
              className="w-8 h-8 rounded-full bg-umber-200 dark:bg-umber-600 opacity-50"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
            />
            <motion.div 
              className="w-8 h-8 rounded-full bg-umber-200 dark:bg-umber-600 opacity-50"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
            />
          </div>
        </div>
        {/* Subtle construction indicator */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-moss-300 to-ochre-300 opacity-30"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.8, duration: 1.5 }}
        />
      </motion.div>
      
      {/* Side Navigation - Spatial Assembly with Activation */}
      <motion.div
        className={`fixed left-6 top-1/2 transform -translate-y-1/2 w-16 bg-white/90 dark:bg-umber-900/90 backdrop-blur-sm border border-umber-200 dark:border-umber-700 rounded-2xl shadow-lg p-2 z-40 transition-all duration-500`}
        initial={{ x: -240, opacity: 0 }}
        animate={{ 
          x: 0, 
          opacity: sideNavActive ? 1.0 : 0.7,
          boxShadow: sideNavActive 
            ? "0 10px 30px rgba(77, 124, 15, 0.2)" 
            : "0 4px 6px rgba(0, 0, 0, 0.1)"
        }}
        transition={{ 
          duration: 0.8, 
          delay: 0.5,
          ease: [0.645, 0.045, 0.355, 1.000]
        }}
      >
        <div className="flex flex-col gap-2">
          <motion.div 
            className={`w-12 h-12 rounded-xl transition-all duration-500 ${
              sideNavActive 
                ? 'bg-moss-100 dark:bg-moss-800 opacity-90' 
                : 'bg-umber-100 dark:bg-umber-700 opacity-60'
            }`}
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
          />
          <motion.div 
            className="w-12 h-12 rounded-xl bg-umber-100 dark:bg-umber-700 opacity-60"
            initial={{ scale: 0, rotate: 10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
          />
          <motion.div 
            className="w-12 h-12 rounded-xl bg-umber-100 dark:bg-umber-700 opacity-60"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 1.0, type: "spring", stiffness: 200 }}
          />
        </div>
        {/* Assembly pulse indicator - activates when sideNav becomes active */}
        <motion.div
          className={`absolute -right-1 -top-1 w-3 h-3 rounded-full transition-all duration-500 ${
            sideNavActive ? 'bg-moss-400 opacity-80' : 'bg-moss-400 opacity-40'
          }`}
          animate={{ 
            scale: sideNavActive ? [1, 1.8, 1] : [1, 1.5, 1],
            opacity: sideNavActive ? [0.8, 1, 0.8] : [0.4, 0.8, 0.4]
          }}
          transition={{ 
            duration: sideNavActive ? 1.5 : 2, 
            repeat: Infinity, 
            delay: 1.2,
            ease: "easeInOut"
          }}
        />
        
        {/* Active state message */}
        {sideNavActive && (
          <motion.div
            className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-moss-50 dark:bg-moss-900 border border-moss-200 dark:border-moss-700 rounded-lg px-3 py-2 shadow-lg"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-xs text-moss-800 dark:text-moss-200 font-medium whitespace-nowrap">
              <UmberText>your umbers will live here</UmberText>
            </p>
          </motion.div>
        )}
      </motion.div>
      
      {/* Bottom Navigation - Spatial Assembly */}
      <motion.div
        className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-umber-900/90 backdrop-blur-sm border border-umber-200 dark:border-umber-700 rounded-2xl shadow-lg px-6 py-3 z-40 transition-colors duration-300`}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 0.7 }}
        transition={{ 
          duration: 0.8, 
          delay: 1.0,
          ease: [0.645, 0.045, 0.355, 1.000]
        }}
      >
        <div className="flex items-center gap-4">
          {/* Tool placeholders with spatial assembly animations */}
          <motion.div 
            className="w-8 h-8 rounded-lg bg-umber-200 dark:bg-umber-600 opacity-50"
            initial={{ scale: 0, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ 
              delay: 1.3, 
              type: "spring", 
              stiffness: 300,
              damping: 20 
            }}
          />
          <motion.div 
            className="w-8 h-8 rounded-lg bg-umber-200 dark:bg-umber-600 opacity-50"
            initial={{ scale: 0, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ 
              delay: 1.4, 
              type: "spring", 
              stiffness: 300,
              damping: 20 
            }}
          />
          <motion.div 
            className="w-8 h-8 rounded-lg bg-umber-200 dark:bg-umber-600 opacity-50"
            initial={{ scale: 0, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ 
              delay: 1.5, 
              type: "spring", 
              stiffness: 300,
              damping: 20 
            }}
          />
          <motion.div 
            className="w-8 h-8 rounded-lg bg-umber-200 dark:bg-umber-600 opacity-50"
            initial={{ scale: 0, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ 
              delay: 1.6, 
              type: "spring", 
              stiffness: 300,
              damping: 20 
            }}
          />
        </div>
        {/* Assembly progress indicator */}
        <motion.div
          className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-ochre-400 opacity-40"
          animate={{ 
            y: [-2, -6, -2],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            delay: 1.8,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </>
  );
};

const WelcomeCard = ({ stage, onUmberTyping, onUmberCreation }) => {
  const { createUmber, addItem, completeOnboarding, skipOnboarding, ...state } = useOnboarding();
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [umberName, setUmberName] = React.useState('');
  
  const categories = [
    { name: 'Books', emoji: '📚', color: 'moss' },
    { name: 'Tech', emoji: '💻', color: 'ochre' },
    { name: 'Fashion', emoji: '👕', color: 'umber' },
    { name: 'Wellness', emoji: '🧘', color: 'moss' }
  ];

  // Handle typing events for SideNav activation
  const handleUmberNameChange = (value) => {
    setUmberName(value);
    if (onUmberTyping) {
      onUmberTyping(value);
    }
  };

  // Handle umber creation
  const handleUmberCreation = () => {
    if (selectedCategory) {
      const umber = { 
        name: selectedCategory.name, 
        category: selectedCategory.name 
      };
      createUmber(umber);
      if (onUmberCreation) {
        onUmberCreation(umber);
      }
    }
  };

  // Trigger typing effect when category is selected
  React.useEffect(() => {
    if (selectedCategory && onUmberTyping) {
      onUmberTyping(selectedCategory.name);
    }
  }, [selectedCategory, onUmberTyping]);
  
  const getCardContent = () => {
    switch (stage) {
      case 'firstCreation':
        return {
          title: 'create your first umber',
          description: 'umbers are collections of things you want. choose a category that excites you.',
          buttonText: selectedCategory ? `create ${selectedCategory.name} umber` : 'choose category',
          onAction: selectedCategory ? handleUmberCreation : null,
          showCategories: true
        };
      
      case 'canvasAwakening':
        const activeUmber = state.userCreations.umbers[0];
        const categoryItems = {
          'Books': [
            { name: 'The Seven Husbands of Evelyn Hugo', price: 899 },
            { name: 'Project Hail Mary', price: 1299 }
          ],
          'Tech': [
            { name: 'MacBook Pro M3', price: 199900 },
            { name: 'AirPods Pro', price: 24900 }
          ],
          'Fashion': [
            { name: 'Vintage Leather Jacket', price: 15900 },
            { name: 'Designer Sneakers', price: 12000 }
          ],
          'Wellness': [
            { name: 'Meditation Cushion', price: 4900 },
            { name: 'Essential Oil Diffuser', price: 8900 }
          ]
        };
        
        const items = categoryItems[activeUmber?.name] || categoryItems['Books'];
        
        return {
          title: 'add your first item',
          description: 'what\'s something you\'ve been wanting? add it to see the magic happen.',
          buttonText: 'add item',
          onAction: () => {
            if (activeUmber) {
              // Add first item
              addItem({ 
                name: items[0].name, 
                price: items[0].price,
                image: null,
                url: null
              }, activeUmber.id);
              
              // Add second item after a short delay to show the pattern emerging
              setTimeout(() => {
                addItem({ 
                  name: items[1].name, 
                  price: items[1].price,
                  image: null,
                  url: null
                }, activeUmber.id);
              }, 1500);
            }
          }
        };
      
      case 'patternEmergence':
        return {
          title: 'beautiful, isn\'t it?',
          description: 'this is your desire map. watch how your items naturally organize themselves.',
          buttonText: 'continue',
          onAction: () => {} // Pattern emergence is automatic
        };
      
      case 'toolActivation':
        return {
          title: 'tools unlocked! ⚡',
          description: 'your workspace is complete. explore the tools in the bottom bar to organize and filter your items.',
          buttonText: 'start exploring',
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
      
      {/* Category selection for firstCreation stage */}
      {content.showCategories && (
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <motion.button
                key={category.name}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedCategory?.name === category.name
                    ? 'border-moss-500 bg-moss-50'
                    : 'border-gray-200 hover:border-moss-300'
                }`}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-2xl mb-1">{category.emoji}</div>
                <div className="text-sm font-medium text-umber-700">
                  {category.name}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex flex-col gap-3">
        <motion.button
          className={`w-full px-4 py-3 rounded-lg font-medium ${
            content.onAction 
              ? 'bg-gradient-to-r from-moss-600 to-moss-700 text-white'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
          onClick={content.onAction}
          disabled={!content.onAction}
          whileHover={content.onAction ? { y: -2, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" } : {}}
          whileTap={content.onAction ? { y: 0, scale: 0.98 } : {}}
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
      
      case ONBOARDING_STAGES.CANVAS_AWAKENING:
        return <CanvasAwakeningStage />;
      
      case ONBOARDING_STAGES.TOOL_ACTIVATION:
        return <ToolActivationStage />;
      
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
