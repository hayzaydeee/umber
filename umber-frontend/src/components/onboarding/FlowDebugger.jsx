import React from 'react';
import { useFlowMachine, useFlowState, useFlowContext } from '../../contexts/FlowMachineContext';
import { useUIState } from '../../contexts/UIContext';
import Button from '../ui/Button';
import UmberText from '../ui/UmberText';
import ActionCard from './ActionCard';

const FlowDebugger = () => {
  const machine = useFlowMachine();
  const currentState = useFlowState();
  const context = useFlowContext();
  const { elements } = useUIState();

  const handleEvent = (event, payload = {}) => {
    machine.send(event, payload);
  };

  const possibleEvents = {
    welcome: ['WRITING_COMPLETE'],
    umberCreationIntro: ['SHOW_FORM'],
    umberCreationForm: ['UMBER_CREATED'],
    umberCreationSuccess: ['SIDEBAR_EXPLAINED'],
    nestCreationIntro: ['DRAG_DETECTED'],
    nestCreationForm: ['NEST_CREATED'],
    nestCreationSuccess: ['CONTINUE_TO_ITEM'],
    itemCreationIntro: ['DRAG_DETECTED'],
    itemCreationForm: ['ITEM_CREATED'],
    itemCreationSuccess: ['BOTTOMNAV_EXPLAINED'],
    toolsIntro: ['TOOLS_EXPLAINED'],
    completion: ['START_MASTERY_TOUR', 'COMPLETE_ONBOARDING'],
    masteryTour: ['TOUR_COMPLETE']
  };

  const availableEvents = possibleEvents[currentState] || [];

  return (
    <div className="fixed top-4 left-4 bg-white p-4 rounded-lg shadow-lg border z-50 max-w-sm">
      <h3 className="font-semibold mb-3">
        <UmberText>flow machine debugger</UmberText>
      </h3>
      
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-600">Current State:</p>
          <p className="font-mono text-sm bg-gray-100 p-1 rounded">
            {currentState}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">Completed Stages:</p>
          <p className="font-mono text-xs bg-gray-100 p-1 rounded">
            {context.completedStages.join(', ') || 'none'}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">Created Entities:</p>
          <div className="font-mono text-xs bg-gray-100 p-1 rounded">
            {Object.entries(context.createdEntities).map(([key, value]) => (
              <div key={key}>{key}: {value.name || 'unnamed'}</div>
            ))}
          </div>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">UI Elements:</p>
          <div className="font-mono text-xs bg-gray-100 p-1 rounded space-y-1">
            <div>Sidebar: {elements.sidebar.visible ? '✅' : '❌'}</div>
            <div>BottomNav: {elements.bottomnav.visible ? '✅' : '❌'}</div>
            <div>ActionCard: {elements.actionCard.position} / {elements.actionCard.size}</div>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-gray-600 mb-2">Available Events:</p>
          <div className="space-y-1">
            {availableEvents.map(event => (
              <Button
                key={event}
                size="sm"
                variant="outline"
                onClick={() => handleEvent(event, { 
                  // Mock data for testing
                  umber: { name: 'Test Umber', id: '123' },
                  nest: { name: 'Test Nest', id: '456' },
                  item: { name: 'Test Item', id: '789' }
                })}
                className="w-full text-left text-xs"
              >
                <UmberText>{event}</UmberText>
              </Button>
            ))}
          </div>
        </div>
        
        <Button
          size="sm"
          variant="soft"
          onClick={() => window.location.reload()}
          className="w-full text-xs"
        >
          <UmberText>reset (reload)</UmberText>
        </Button>
      </div>

      {/* ActionCard for Testing */}
      <ActionCard />
    </div>
  );
};

export default FlowDebugger;
