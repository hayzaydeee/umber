import React from 'react';
import { useFlowMachine } from '../contexts/FlowMachineContext';
import { useUIState } from '../contexts/UIContext';
import ActionCard from '../components/onboarding/ActionCard';
import UmberText from '../components/ui/UmberText';
import Button from '../components/ui/Button';

const OnboardingTest = () => {
  const { state, context, send } = useFlowMachine();
  const { elements, updateElement } = useUIState();

  const handleStart = () => {
    // Make sure ActionCard is visible and start onboarding
    updateElement('actionCard', { visible: true });
    // Flow should already start at 'welcome', but let's ensure it
    console.log('🚀 Starting onboarding, current state:', state);
  };

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-moss-50 via-white to-ochre-50 p-8">
      {/* ActionCard */}
      <ActionCard />

      {/* Background overlay when onboarding */}
      {elements.actionCard.visible && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]" />
      )}

      {/* Debug Panel */}
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 z-[10000] relative">
        <h1 className="text-2xl font-bold mb-4">
          <UmberText>onboarding test</UmberText>
        </h1>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700">Current State:</p>
            <p className="font-mono text-lg bg-gray-100 p-2 rounded">{state}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">ActionCard Visible:</p>
            <p className="font-mono bg-gray-100 p-2 rounded">
              {elements.actionCard.visible ? 'Yes' : 'No'}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">Completed Stages:</p>
            <p className="font-mono text-sm bg-gray-100 p-2 rounded">
              {context.completedStages.length > 0 
                ? context.completedStages.join(', ') 
                : 'None'}
            </p>
          </div>

          <div className="space-y-2">
            <Button onClick={handleStart} className="w-full">
              Start Onboarding
            </Button>
            <Button onClick={handleReset} variant="outline" className="w-full">
              Reset Flow
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTest;
