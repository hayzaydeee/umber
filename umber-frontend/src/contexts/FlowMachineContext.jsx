import { createContext, useContext, useReducer, useEffect, useState, useMemo } from 'react';

// Simple event bus for cross-component communication
class EventBus {
  constructor() {
    this.events = {};
  }

  subscribe(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
    return () => {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    };
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
}

export const eventBus = new EventBus();

// Flow machine configuration
const onboardingFlowConfig = {
  initial: 'welcome',
  context: {
    sessionId: Date.now().toString(),
    completedStages: [],
    createdEntities: {},
    startTime: Date.now(),
    userName: 'friend' // Will be populated from user data
  },
  states: {
    welcome: {
      on: { WRITING_COMPLETE: 'umberCreationIntro' }
    },
    umberCreationIntro: {
      on: { SHOW_FORM: 'umberCreationForm' }
    },
    umberCreationForm: {
      on: { 
        UMBER_CREATED: {
          target: 'umberCreationSuccess',
          actions: ['recordUmberCreation', 'triggerSidebarReveal']
        }
      }
    },
    umberCreationSuccess: {
      on: { SIDEBAR_EXPLAINED: 'nestCreationIntro' }
    },
    nestCreationIntro: {
      on: { DRAG_DETECTED: 'nestCreationForm' }
    },
    nestCreationForm: {
      on: { 
        NEST_CREATED: {
          target: 'nestCreationSuccess',
          actions: ['recordNestCreation']
        }
      }
    },
    nestCreationSuccess: {
      on: { CONTINUE_TO_ITEM: 'itemCreationIntro' }
    },
    itemCreationIntro: {
      on: { DRAG_DETECTED: 'itemCreationForm' }
    },
    itemCreationForm: {
      on: { 
        ITEM_CREATED: {
          target: 'itemCreationSuccess',
          actions: ['recordItemCreation', 'triggerBottomNavReveal']
        }
      }
    },
    itemCreationSuccess: {
      on: { BOTTOMNAV_EXPLAINED: 'toolsIntro' }
    },
    toolsIntro: {
      on: { TOOLS_EXPLAINED: 'completion' }
    },
    completion: {
      on: { 
        START_MASTERY_TOUR: 'masteryTour',
        COMPLETE_ONBOARDING: 'finished'
      }
    },
    masteryTour: {
      on: { TOUR_COMPLETE: 'finished' }
    },
    finished: { type: 'final' }
  },
  actions: {
    recordUmberCreation: (context, payload) => ({
      completedStages: [...context.completedStages, 'umber_creation'],
      createdEntities: { ...context.createdEntities, umber: payload.umber }
    }),
    triggerSidebarReveal: () => {
      setTimeout(() => eventBus.emit('reveal_sidebar', { delay: 1000 }), 500);
      return {};
    },
    recordNestCreation: (context, payload) => ({
      completedStages: [...context.completedStages, 'nest_creation'],
      createdEntities: { ...context.createdEntities, nest: payload.nest }
    }),
    recordItemCreation: (context, payload) => ({
      completedStages: [...context.completedStages, 'item_creation'],
      createdEntities: { ...context.createdEntities, item: payload.item }
    }),
    triggerBottomNavReveal: () => {
      setTimeout(() => eventBus.emit('reveal_bottomnav', { delay: 1000 }), 500);
      return {};
    }
  }
};

// Flow machine implementation
const createFlowMachine = (config) => {
  let currentState = config.initial;
  let context = { ...config.context };
  const listeners = new Set();

  return {
    get state() { return currentState; },
    get context() { return context; },
    
    send(event, payload) {
      console.log(`🎯 FlowMachine: Received event '${event}' in state '${currentState}'`, { payload });
      const stateConfig = config.states[currentState];
      const transition = stateConfig?.on?.[event];
      
      if (transition) {
        const prevState = currentState;
        
        if (typeof transition === 'string') {
          currentState = transition;
        } else {
          currentState = transition.target;
          
          // Execute actions
          if (transition.actions) {
            transition.actions.forEach(actionName => {
              const action = config.actions[actionName];
              if (action) {
                const updates = action(context, payload);
                context = { ...context, ...updates };
              }
            });
          }
        }
        
        // Notify listeners
        const transitionEvent = {
          type: 'TRANSITION',
          from: prevState,
          to: currentState,
          event,
          payload,
          context
        };
        
        listeners.forEach(listener => listener(transitionEvent));
        eventBus.emit('flow_state_change', transitionEvent);
        
        // Debug logging
        console.log(`🎯 Flow: ${prevState} → ${currentState} (${event})`, { payload, context });
      } else {
        console.warn(`⚠️ Invalid transition: ${event} from ${currentState}`);
      }
    },
    
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    
    can(event) {
      return !!config.states[currentState]?.on?.[event];
    },

    // Helper methods
    isInState(stateName) {
      return currentState === stateName;
    },

    hasCompleted(stage) {
      return context.completedStages.includes(stage);
    },

    getCreatedEntity(type) {
      return context.createdEntities[type];
    }
  };
};

const FlowMachineContext = createContext();

export const FlowMachineProvider = ({ children }) => {
  const [machine] = useState(() => createFlowMachine(onboardingFlowConfig));
  const [machineState, setMachineState] = useState(machine.state);
  const [machineContext, setMachineContext] = useState(machine.context);
  
  // Subscribe to machine changes and update React state
  useEffect(() => {
    const unsubscribe = machine.subscribe((event) => {
      console.log('🔄 Flow State Change:', event);
      // Update React state to trigger re-renders
      setMachineState(machine.state);
      setMachineContext(machine.context);
    });
    
    return unsubscribe;
  }, [machine]);
  
  // Create a wrapper that exposes React state instead of machine internals
  const machineWrapper = useMemo(() => ({
    state: machineState,
    context: machineContext,
    send: machine.send.bind(machine),
    can: machine.can.bind(machine),
    subscribe: machine.subscribe.bind(machine)
  }), [machine, machineState, machineContext]);
  
  return (
    <FlowMachineContext.Provider value={machineWrapper}>
      {children}
    </FlowMachineContext.Provider>
  );
};

export const useFlowMachine = () => {
  const machine = useContext(FlowMachineContext);
  if (!machine) {
    throw new Error('useFlowMachine must be used within FlowMachineProvider');
  }
  return machine;
};

// Convenience hooks
export const useFlowState = () => {
  const machine = useFlowMachine();
  return machine.state;
};

export const useFlowContext = () => {
  const machine = useFlowMachine();
  return machine.context;
};

export const useFlowActions = () => {
  const machine = useFlowMachine();
  return {
    send: machine.send,
    can: machine.can,
    isInState: machine.isInState,
    hasCompleted: machine.hasCompleted,
    getCreatedEntity: machine.getCreatedEntity
  };
};
