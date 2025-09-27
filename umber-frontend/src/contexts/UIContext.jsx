import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { eventBus } from './FlowMachineContext';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [elements, setElements] = useState({
    sidebar: { 
      visible: false, 
      animated: false, 
      highlighted: false,
      revealed: false 
    },
    bottomnav: { 
      visible: false, 
      highlightedTool: null,
      revealed: false 
    },
    mindmap: { 
      visible: true, 
      focusedNode: null, 
      dimmed: false,
      interactionEnabled: true 
    },
    actionCard: { 
      position: 'center', 
      size: 'large', 
      phase: 'welcome',
      visible: true 
    },
    topnav: {
      visible: true,
      dimmed: false
    }
  });

  // Subscribe to events from flow machine
  useEffect(() => {
    const subscriptions = [
      eventBus.subscribe('reveal_sidebar', ({ delay = 0 }) => {
        console.log('🎨 UI: Revealing sidebar in', delay, 'ms');
        setTimeout(() => {
          updateElement('sidebar', { 
            visible: true, 
            animated: true, 
            revealed: true 
          });
          updateElement('actionCard', { 
            position: 'right', 
            size: 'medium' 
          });
        }, delay);
      }),
      
      eventBus.subscribe('reveal_bottomnav', ({ delay = 0 }) => {
        console.log('🎨 UI: Revealing bottom nav in', delay, 'ms');
        setTimeout(() => {
          updateElement('bottomnav', { 
            visible: true,
            revealed: true 
          });
          updateElement('actionCard', { 
            position: 'center', 
            size: 'medium' 
          });
        }, delay);
      }),
      
      eventBus.subscribe('highlight_element', ({ element, highlight }) => {
        console.log('🎨 UI: Highlighting', element, highlight);
        updateElement(element, { highlighted: highlight });
      }),
      
      eventBus.subscribe('dim_interface', () => {
        console.log('🎨 UI: Dimming interface');
        batchUpdateElements({
          mindmap: { dimmed: true },
          sidebar: { highlighted: false },
          bottomnav: { highlighted: false },
          topnav: { dimmed: true }
        });
      }),
      
      eventBus.subscribe('brighten_interface', () => {
        console.log('🎨 UI: Brightening interface');
        Object.keys(elements).forEach(elementId => {
          updateElement(elementId, { 
            dimmed: false, 
            highlighted: false 
          });
        });
      }),

      eventBus.subscribe('focus_mindmap_node', ({ nodeId }) => {
        console.log('🎨 UI: Focusing mindmap node:', nodeId);
        updateElement('mindmap', { 
          focusedNode: nodeId 
        });
      }),

      eventBus.subscribe('enable_mindmap_interaction', ({ enabled = true }) => {
        console.log('🎨 UI: Mindmap interaction:', enabled);
        updateElement('mindmap', { 
          interactionEnabled: enabled 
        });
      }),

      eventBus.subscribe('highlight_tool', ({ tool }) => {
        console.log('🎨 UI: Highlighting tool:', tool);
        updateElement('bottomnav', { 
          highlightedTool: tool 
        });
      }),

      eventBus.subscribe('move_actioncard', ({ position, size }) => {
        console.log('🎨 UI: Moving ActionCard to:', position, size);
        updateElement('actionCard', { 
          position: position || elements.actionCard.position,
          size: size || elements.actionCard.size
        });
      })
    ];

    return () => subscriptions.forEach(unsubscribe => unsubscribe());
  }, []);

  const updateElement = useCallback((elementId, updates) => {
    setElements(prev => ({
      ...prev,
      [elementId]: { ...prev[elementId], ...updates }
    }));
  }, []);

  const batchUpdateElements = useCallback((updates) => {
    setElements(prev => {
      const newElements = { ...prev };
      Object.entries(updates).forEach(([elementId, elementUpdates]) => {
        newElements[elementId] = { ...newElements[elementId], ...elementUpdates };
      });
      return newElements;
    });
  }, []);

  // Helper methods
  const resetUIToDefault = useCallback(() => {
    setElements({
      sidebar: { visible: false, animated: false, highlighted: false, revealed: false },
      bottomnav: { visible: false, highlightedTool: null, revealed: false },
      mindmap: { visible: true, focusedNode: null, dimmed: false, interactionEnabled: true },
      actionCard: { position: 'center', size: 'large', phase: 'welcome', visible: true },
      topnav: { visible: true, dimmed: false }
    });
  }, []);

  const getElementState = useCallback((elementId) => {
    return elements[elementId];
  }, [elements]);

  return (
    <UIContext.Provider value={{ 
      elements, 
      updateElement, 
      batchUpdateElements,
      resetUIToDefault,
      getElementState
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUIState = (selector) => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUIState must be used within UIProvider');
  }
  return selector ? selector(context) : context;
};

// Convenience hooks for specific elements
export const useSidebarState = () => {
  const { elements } = useUIState();
  return elements.sidebar;
};

export const useBottomNavState = () => {
  const { elements } = useUIState();
  return elements.bottomnav;
};

export const useMindMapState = () => {
  const { elements } = useUIState();
  return elements.mindmap;
};

export const useActionCardState = () => {
  const { elements } = useUIState();
  return elements.actionCard;
};
