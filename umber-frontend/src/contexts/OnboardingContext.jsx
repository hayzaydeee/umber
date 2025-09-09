import React, { createContext, useContext, useReducer, useRef, useCallback } from 'react';

// ===== STAGE DEFINITIONS =====
export const ONBOARDING_STAGES = {
  VOID: 'void',
  FOUNDATION: 'foundation', 
  FIRST_CREATION: 'firstCreation',
  CANVAS_AWAKENING: 'canvasAwakening',
  PATTERN_EMERGENCE: 'patternEmergence',
  COMPLETE: 'complete'
};

// ===== INITIAL STATE =====
const initialState = {
  currentStage: ONBOARDING_STAGES.VOID,
  canSkip: false,
  isAnimating: false,
  progress: {
    voidCompleted: false,
    foundationCompleted: false,
    firstUmberCreated: false,
    firstItemAdded: false,
    mindMapRevealed: false
  },
  userCreations: {
    umbers: [],
    items: []
  },
  mindMap: {
    nodes: [],
    edges: [],
    isVisible: false
  },
  startTime: null,
  skipReason: null
};

// ===== REDUCER (Pure State Logic) =====
const onboardingReducer = (state, action) => {
  switch (action.type) {
    case 'START_ONBOARDING':
      return {
        ...state,
        currentStage: ONBOARDING_STAGES.VOID,
        startTime: Date.now(),
        canSkip: false
      };

    case 'ADVANCE_TO_FOUNDATION':
      return {
        ...state,
        currentStage: ONBOARDING_STAGES.FOUNDATION,
        canSkip: true, // Allow skipping after void stage
        progress: {
          ...state.progress,
          voidCompleted: true
        }
      };

    case 'ADVANCE_TO_FIRST_CREATION':
      return {
        ...state,
        currentStage: ONBOARDING_STAGES.FIRST_CREATION,
        progress: {
          ...state.progress,
          foundationCompleted: true
        }
      };

    case 'UMBER_CREATED':
      return {
        ...state,
        currentStage: ONBOARDING_STAGES.CANVAS_AWAKENING,
        userCreations: {
          ...state.userCreations,
          umbers: [...state.userCreations.umbers, action.umber]
        },
        progress: {
          ...state.progress,
          firstUmberCreated: true
        }
      };

    case 'ITEM_ADDED':
      return {
        ...state,
        currentStage: state.userCreations.items.length === 0 
          ? ONBOARDING_STAGES.CANVAS_AWAKENING 
          : ONBOARDING_STAGES.PATTERN_EMERGENCE,
        userCreations: {
          ...state.userCreations,
          items: [...state.userCreations.items, action.item]
        },
        progress: {
          ...state.progress,
          firstItemAdded: true,
          mindMapRevealed: state.userCreations.items.length > 0
        }
      };

    case 'ADD_ITEM_TO_CANVAS':
      return {
        ...state,
        mindMap: {
          ...state.mindMap,
          nodes: [...state.mindMap.nodes, action.node]
        }
      };

    case 'UPDATE_MIND_MAP_NODES':
      return {
        ...state,
        mindMap: {
          ...state.mindMap,
          nodes: action.nodes,
          edges: action.edges || state.mindMap.edges
        }
      };

    case 'REVEAL_MIND_MAP':
      return {
        ...state,
        mindMap: {
          ...state.mindMap,
          isVisible: true
        },
        currentStage: ONBOARDING_STAGES.CANVAS_AWAKENING
      };

    case 'SKIP_ONBOARDING':
      return {
        ...state,
        currentStage: ONBOARDING_STAGES.COMPLETE,
        skipReason: action.reason || 'user_choice',
        canSkip: false
      };

    case 'COMPLETE_ONBOARDING':
      return {
        ...state,
        currentStage: ONBOARDING_STAGES.COMPLETE,
        progress: {
          ...state.progress,
          mindMapRevealed: true
        }
      };

    case 'SET_ANIMATING':
      return {
        ...state,
        isAnimating: action.isAnimating
      };

    default:
      return state;
  }
};

// ===== CONTEXT CREATION =====
const OnboardingContext = createContext(null);

// ===== PROVIDER COMPONENT =====
export const OnboardingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(onboardingReducer, initialState);
  
  // Refs for cleanup and animation control
  const timersRef = useRef(new Set());

  // ===== CLEANUP UTILITIES =====
  // Simple functions - no useCallback needed
  const addTimer = (timerId) => {
    timersRef.current.add(timerId);
  };

  const clearTimer = (timerId) => {
    clearTimeout(timerId);
    timersRef.current.delete(timerId);
  };

  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current.clear();
  };

  // ===== STAGE TRANSITION METHODS =====
  // Keep useCallback - likely passed to components + has complex logic
  const startOnboarding = useCallback(() => {
    dispatch({ type: 'START_ONBOARDING' });
    
    // Auto-advance to foundation after 2 seconds
    const timerId = setTimeout(() => {
      dispatch({ type: 'ADVANCE_TO_FOUNDATION' });
    }, 2000);
    
    addTimer(timerId);
  }, []); // No dependencies since addTimer is now stable

  // Simple function - no callback needed
  const advanceToFirstCreation = () => {
    dispatch({ type: 'ADVANCE_TO_FIRST_CREATION' });
  };

  // Keep useCallback - creates complex objects + likely passed around
  const createUmber = useCallback((umberData) => {
    const umber = {
      id: Date.now(), // Simple ID for demo
      name: umberData.name,
      createdAt: new Date().toISOString(),
      items: []
    };
    
    dispatch({ type: 'UMBER_CREATED', umber });
    return umber;
  }, []);

  // Keep useCallback - creates complex objects + likely passed around
  const addItem = useCallback((itemData, umberId) => {
    const item = {
      id: Date.now(),
      ...itemData,
      umberId,
      createdAt: new Date().toISOString()
    };
    
    dispatch({ type: 'ITEM_ADDED', item });
    return item;
  }, []);

  // ===== MIND MAP METHODS =====
  const addItemToCanvas = useCallback((item) => {
    const node = {
      id: `item-${item.id}`,
      type: 'item',
      position: { x: Math.random() * 300, y: Math.random() * 200 },
      data: {
        label: item.name,
        price: item.price,
        image: item.image,
        url: item.url
      }
    };
    
    dispatch({ type: 'ADD_ITEM_TO_CANVAS', node });
  }, []);

  const updateMindMapNodes = useCallback((nodes, edges) => {
    dispatch({ type: 'UPDATE_MIND_MAP_NODES', nodes, edges });
  }, []);

  const revealMindMap = useCallback(() => {
    dispatch({ type: 'REVEAL_MIND_MAP' });
    
    // Trigger canvas awakening stage transition
    const timerId = setTimeout(() => {
      dispatch({ type: 'ADVANCE_TO_CANVAS_AWAKENING' });
    }, 1000);
    
    addTimer(timerId);
  }, []);

  // Keep useCallback - has cleanup logic + likely passed to skip buttons
  const skipOnboarding = useCallback((reason = 'user_choice') => {
    clearAllTimers(); // Clean up any pending timers
    dispatch({ type: 'SKIP_ONBOARDING', reason });
  }, []); // clearAllTimers is now stable

  // Keep useCallback - has cleanup logic
  const completeOnboarding = useCallback(() => {
    clearAllTimers();
    dispatch({ type: 'COMPLETE_ONBOARDING' });
  }, []);

  // Simple dispatch - no callback needed
  const setAnimating = (isAnimating) => {
    dispatch({ type: 'SET_ANIMATING', isAnimating });
  };

  // ===== HELPER METHODS =====
  // Keep useCallback - depends on state + likely used in conditional rendering
  const canAdvanceToNextStage = useCallback(() => {
    const { currentStage, userCreations } = state;
    
    switch (currentStage) {
      case ONBOARDING_STAGES.VOID:
        return false; // Auto-advances
      case ONBOARDING_STAGES.FOUNDATION:
        return true; // Can advance when welcome card is ready
      case ONBOARDING_STAGES.FIRST_CREATION:
        return userCreations.umbers.length > 0;
      case ONBOARDING_STAGES.CANVAS_AWAKENING:
        return userCreations.items.length > 0;
      case ONBOARDING_STAGES.PATTERN_EMERGENCE:
        return userCreations.items.length > 1;
      default:
        return false;
    }
  }, [state]);

  // Keep useCallback - simple but likely used in progress bars/UI
  const getProgressPercentage = useCallback(() => {
    const stages = Object.values(ONBOARDING_STAGES);
    const currentIndex = stages.indexOf(state.currentStage);
    return (currentIndex / (stages.length - 1)) * 100;
  }, [state.currentStage]);

  // ===== CLEANUP ON UNMOUNT =====
  React.useEffect(() => {
    return () => {
      clearAllTimers();
      // Could also clear animations here if needed
    };
  }, []); // clearAllTimers is now stable, no dependency needed

  // ===== CONTEXT VALUE =====
  const contextValue = {
    // State
    ...state,
    
    // Actions
    startOnboarding,
    advanceToFirstCreation,
    createUmber,
    addItem,
    skipOnboarding,
    completeOnboarding,
    setAnimating,
    
    // Mind Map Actions
    addItemToCanvas,
    updateMindMapNodes,
    revealMindMap,
    
    // Helpers
    canAdvanceToNextStage,
    getProgressPercentage,
    
    // Utilities
    addTimer,
    clearTimer,
    clearAllTimers
  };

  return (
    <OnboardingContext.Provider value={contextValue}>
      {children}
    </OnboardingContext.Provider>
  );
};

// ===== CUSTOM HOOK =====
export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  
  return context;
};

// ===== DEBUG UTILITIES (Development Only) =====
if (process.env.NODE_ENV === 'development') {
  window.UMBER_ONBOARDING_DEBUG = {
    stages: ONBOARDING_STAGES,
    getState: () => {
      // This would need to be set by the provider instance
      console.log('Debug state access - implement in provider if needed');
    }
  };
}
