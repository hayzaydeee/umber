import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useFlowMachine } from '../../contexts/FlowMachineContext';
import { useUIState } from '../../contexts/UIContext';
import AnimationOptions from './AnimationOptions';

// API imports
import { umbersApi } from '../../api/umbers';
import { nestsApi } from '../../api/nests';
import { itemsApi } from '../../api/items';
import { triggerMindMapRefresh } from '../../hooks/useMindMapData';

// Import card component types (we'll create these next)
import CreationGuide from './cards/CreationGuide';
import FormPreviewCard from './cards/FormPreviewCard';
import SimpleFormCard from './cards/SimpleFormCard';
import SuccessCard from './cards/SuccessCard';
import DragInstructionCard from './cards/DragInstructionCard';
import ToolsExplanationCard from './cards/ToolsExplanationCard';
import CompletionCard from './cards/CompletionCard';

const ActionCard = () => {
  const { state: flowState, context: flowContext, send } = useFlowMachine();
  const { elements } = useUIState();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const lastTransitionState = useRef(null);
  
  // Reset transitioning state when flow state changes
  useEffect(() => {
    if (lastTransitionState.current !== flowState) {
      setIsTransitioning(false);
      lastTransitionState.current = flowState;
    }
  }, [flowState]);
  
  // Create stable callbacks to prevent multiple triggers
  const callbacks = useMemo(() => ({
    onWelcomeComplete: () => {
      if (isTransitioning || flowState !== 'welcome') return;
      console.log('🎯 Welcome completed, transitioning...');
      setIsTransitioning(true);
      send('WRITING_COMPLETE');
    },
    onShowForm: () => {
      if (isTransitioning || flowState !== 'umberCreationIntro') return;
      console.log('🎯 Showing umber creation form...');
      setIsTransitioning(true);
      send('SHOW_FORM');
    },
    onUmberCreated: async (data) => {
      if (isTransitioning || flowState !== 'umberCreationForm') return;
      console.log('📝 Umber form submitted:', data);
      setIsTransitioning(true);
      
      try {
        // Mark as onboarding entity
        const umberData = {
          ...data,
          isOnboardingEntity: true,
          onboardingSessionId: Date.now().toString() // Simple session ID
        };
        
        console.log('🚀 Creating umber via API:', umberData);
        const result = await umbersApi.createUmber(umberData);
        
        if (result.success) {
          console.log('✅ Umber created successfully:', result.data);
          // Trigger mind map refresh
          triggerMindMapRefresh();
          send('UMBER_CREATED', { 
            umber: result.data, // Store the full umber object with ID
            formData: data // Keep original form data for reference
          });
        } else {
          console.error('❌ Failed to create umber:', result.error);
          // Still transition for demo purposes, but log the error
          send('UMBER_CREATED', { umber: data });
        }
      } catch (error) {
        console.error('❌ Error creating umber:', error);
        // Still transition for demo purposes, but log the error
        send('UMBER_CREATED', { umber: data });
      }
    },
    onSidebarExplained: () => send('SIDEBAR_EXPLAINED'),
    onDragDetected: () => send('DRAG_DETECTED'),
    onNestCreated: async (data) => {
      console.log('📝 Nest form submitted:', data);
      
      try {
        // Get the created umber ID from context
        const createdUmber = context?.umber;
        if (!createdUmber?._id) {
          console.error('❌ No umber ID found in context for nest creation');
          send('NEST_CREATED', { nest: data });
          return;
        }
        
        const nestData = {
          ...data,
          umberId: createdUmber._id,
          isOnboardingEntity: true,
          onboardingSessionId: createdUmber.onboardingSessionId
        };
        
        console.log('🚀 Creating nest via API:', nestData);
        const result = await nestsApi.createNest(nestData);
        
        if (result.success) {
          console.log('✅ Nest created successfully:', result.data);
          triggerMindMapRefresh();
          send('NEST_CREATED', { nest: result.data });
        } else {
          console.error('❌ Failed to create nest:', result.error);
          send('NEST_CREATED', { nest: data });
        }
      } catch (error) {
        console.error('❌ Error creating nest:', error);
        send('NEST_CREATED', { nest: data });
      }
    },
    onContinueToItem: () => send('CONTINUE_TO_ITEM'),
    onItemCreated: async (data) => {
      console.log('📝 Item form submitted:', data);
      
      try {
        // Get the created nest ID from context
        const createdNest = context?.nest;
        const createdUmber = context?.umber;
        
        if (!createdNest?._id || !createdUmber?._id) {
          console.error('❌ No nest/umber ID found in context for item creation');
          send('ITEM_CREATED', { item: data });
          return;
        }
        
        const itemData = {
          ...data,
          nestId: createdNest._id,
          umberId: createdUmber._id,
          isOnboardingEntity: true,
          onboardingSessionId: createdUmber.onboardingSessionId
        };
        
        console.log('🚀 Creating item via API:', itemData);
        const result = await itemsApi.createItem(itemData);
        
        if (result.success) {
          console.log('✅ Item created successfully:', result.data);
          triggerMindMapRefresh();
          send('ITEM_CREATED', { item: result.data });
        } else {
          console.error('❌ Failed to create item:', result.error);
          send('ITEM_CREATED', { item: data });
        }
      } catch (error) {
        console.error('❌ Error creating item:', error);
        send('ITEM_CREATED', { item: data });
      }
    },
    onBottomnavExplained: () => send('BOTTOMNAV_EXPLAINED'),
    onToolsExplained: () => send('TOOLS_EXPLAINED'),
    onStartMasteryTour: () => send('START_MASTERY_TOUR'),
    onCompleteOnboarding: () => send('COMPLETE_ONBOARDING')
  }), [send, isTransitioning, flowState]);

  // ActionCard configuration for each flow state
  const stateConfigs = useMemo(() => ({
    welcome: {
      component: CreationGuide,
      props: {
        title: `welcome ${flowContext.userName || "friend"}, to umber!`,
        description: "we're here to help you know why you want what you want, and just to make your wishlisting look better, and feel easier.",
        buttonText: "let's start curating",
        onContinue: callbacks.onWelcomeComplete
      },
      position: 'center',
      size: 'large'
    },
    
    umberCreationIntro: {
      component: CreationGuide,
      props: {
        title: "let's create your first umber",
        description: "I'm your ActionCard - I'll guide you through everything you do in Umber. start by creating your first umber.",
        buttonText: "show me how",
        onContinue: callbacks.onShowForm
      },
      position: 'center',
      size: 'medium'
    },
    
    umberCreationForm: {
      component: SimpleFormCard,
      props: {
        title: "create your umber",
        formType: "umber",
        description: "fill in the details to see your umber preview",
        onFormSubmit: callbacks.onUmberCreated
      },
      position: 'center',
      size: 'medium'
    },
    
    umberCreationSuccess: {
      component: SuccessCard,
      props: {
        title: `${flowContext.createdEntities?.umber?.name || 'umber'} created successfully!`,
        description: "your umber appears in both the mind map and sidebar. this helps you remember where everything lives.",
        autoAdvance: true,
        autoAdvanceDelay: 3000,
        onAdvance: callbacks.onSidebarExplained
      },
      position: 'center',
      size: 'medium'
    },
    
    nestCreationIntro: {
      component: DragInstructionCard,
      props: {
        title: "your umber is currently empty",
        description: "let's add your first nest. drag outward from the umber node to create a connection.",
        targetElement: "umber-node",
        instructionType: "drag",
        onDragDetected: callbacks.onDragDetected
      },
      position: 'right',
      size: 'medium'
    },
    
    nestCreationForm: {
      component: FormPreviewCard,
      props: {
        title: "create your nest",
        formType: "nest",
        description: "nests help organize items within your umber",
        preview: flowContext.nestFormData,
        onFormSubmit: callbacks.onNestCreated
      },
      position: 'right',
      size: 'medium'
    },
    
    nestCreationSuccess: {
      component: SuccessCard,
      props: {
        title: `${flowContext.createdEntities?.nest?.name || 'nest'} created!`,
        description: "great! now you can add items to this nest.",
        autoAdvance: false,
        buttonText: "add my first item",
        onAdvance: callbacks.onContinueToItem
      },
      position: 'center',
      size: 'medium'
    },
    
    itemCreationIntro: {
      component: DragInstructionCard,
      props: {
        title: "time to add your first item",
        description: "drag from the nest to create your first item. try adding something you've been wanting!",
        targetElement: "nest-node",
        instructionType: "drag",
        onDragDetected: callbacks.onDragDetected
      },
      position: 'right',
      size: 'medium'
    },
    
    itemCreationForm: {
      component: FormPreviewCard,
      props: {
        title: "add your item",
        formType: "item",
        description: "add a URL or describe what you want",
        preview: flowContext.itemFormData,
        onFormSubmit: callbacks.onItemCreated
      },
      position: 'right',
      size: 'medium'
    },
    
    itemCreationSuccess: {
      component: SuccessCard,
      props: {
        title: `${flowContext.createdEntities?.item?.name || 'item'} added!`,
        description: "your first item is now saved. notice how the bottom navigation appeared with useful tools.",
        autoAdvance: true,
        autoAdvanceDelay: 3000,
        onAdvance: callbacks.onBottomnavExplained
      },
      position: 'center',
      size: 'medium'
    },
    
    toolsIntro: {
      component: ToolsExplanationCard,
      props: {
        title: "discover your tools",
        description: "the bottom navigation gives you quick access to powerful features",
        tools: ['mindmap', 'search', 'insights', 'export'],
        onComplete: callbacks.onToolsExplained
      },
      position: 'center',
      size: 'medium'
    },
    
    completion: {
      component: CompletionCard,
      props: {
        title: "you're ready to start curating!",
        description: "you've learned the basics. ready to explore more advanced features?",
        completedEntities: flowContext.createdEntities,
        onStartMastery: callbacks.onStartMasteryTour,
        onComplete: callbacks.onCompleteOnboarding
      },
      position: 'center',
      size: 'large'
    }
    
  }), [flowState, flowContext, callbacks]);

  const currentConfig = stateConfigs[flowState];

  // Debug logging
  console.log('🎯 ActionCard render:', {
    flowState,
    hasConfig: !!currentConfig,
    actionCardVisible: elements.actionCard.visible,
    availableConfigs: Object.keys(stateConfigs)
  });

  if (!currentConfig) {
    console.warn(`⚠️ No ActionCard configuration for state: ${flowState}`);
    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999] bg-red-100 border border-red-300 rounded-lg p-4">
        <p className="text-red-800">Missing config for state: {flowState}</p>
        <p className="text-sm text-red-600">Available: {Object.keys(stateConfigs).join(', ')}</p>
      </div>
    );
  }

  const Component = currentConfig.component;
  const position = elements.actionCard.position || currentConfig.position;
  const size = elements.actionCard.size || currentConfig.size;

  // Don't render if ActionCard should be hidden
  if (!elements.actionCard.visible) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={flowState} // Re-animate when state changes
        className={`action-card ${getPositionStyles(position, size)}`}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ 
          duration: 0.4, 
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
        layout
        style={{ zIndex: 9999 }} // Ensure it's on top
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-umber-100 overflow-hidden backdrop-blur-sm">
          <Component {...currentConfig.props} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Helper function for position styles
const getPositionStyles = (position, size) => {
  const positions = {
    center: 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
    right: 'fixed top-1/2 right-8 transform -translate-y-1/2',
    left: 'fixed top-1/2 left-8 transform -translate-y-1/2',
    'top-center': 'fixed top-8 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'fixed bottom-8 left-1/2 transform -translate-x-1/2',
    floating: 'absolute' // Position will be set by drag interaction
  };
  
  const sizes = {
    small: 'w-80 max-w-sm',
    medium: 'w-96 max-w-md', 
    large: 'w-[500px] max-w-lg',
    xl: 'w-[600px] max-w-2xl'
  };
  
  return `${positions[position]} ${sizes[size]} z-[9999]`;
};

export default ActionCard;
