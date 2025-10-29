import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { HomeIcon, ArrowLeftIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import UmberText from '../components/ui/UmberText';
import Button from '../components/ui/Button';
import ActionCard from '../components/onboarding/ActionCard';
import AppSideNav from '../components/layout/AppSideNav';
import { MindMapCanvas } from '../components/mindMap';
import { useFlowMachine } from '../contexts/FlowMachineContext';
import { useUIState } from '../contexts/UIContext';
import { ThemeToggle } from '../contexts/ThemeContext';
import { useAuth } from '../hooks/useAuth';

function Dashboard() {
  const { state: flowState, context } = useFlowMachine();
  const { elements } = useUIState();
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect unauthenticated users to auth page
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, loading, navigate]);

  // Debug logging
  console.log('📱 Dashboard render:', {
    flowState,
    context,
    actionCardVisible: elements.actionCard.visible
  });

  // Check if we're in onboarding mode
  const isOnboarding = flowState !== 'finished';
  const showMindMap = flowState === 'finished' || (
    // Show mind map during onboarding after umber creation
    ['umberCreationSuccess', 'nestCreationIntro', 'nestCreationForm', 'nestCreationSuccess', 
     'itemCreationIntro', 'itemCreationForm', 'itemCreationSuccess', 'toolsIntro'].includes(flowState)
  );
  
  // Debug overlay state
  const isInteractiveStep = ['nestCreationIntro', 'itemCreationIntro'].includes(flowState);
  const showOverlay = isOnboarding && elements.actionCard.visible && !isInteractiveStep;
  console.log('🎨 Dashboard overlay state:', { 
    isOnboarding, 
    actionCardVisible: elements.actionCard.visible, 
    flowState, 
    isInteractiveStep, 
    showOverlay 
  });

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-moss-50 via-white to-ochre-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-moss-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-umber-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-moss-50 via-white to-ochre-50">
      {/* ActionCard Overlay */}
      <ActionCard />
      
      {/* App Sidebar */}
      <AppSideNav />
      
      {/* Background Overlay when onboarding (hidden during interactive steps) */}
      {showOverlay && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]"
          style={{ pointerEvents: 'auto' }}
        />
      )}

      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-umber-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold text-umber-800">
            <UmberText>umber</UmberText>
          </h1>
          <div className="flex items-center space-x-3">
            {showMindMap && (
              <div className="flex items-center space-x-2 text-sm text-umber-600">
                <EyeOpenIcon className="w-4 h-4" />
                <span>Mind Map View</span>
              </div>
            )}
            <ThemeToggle />
            <Link to="/?force=true">
              <Button variant="outline" size="sm">
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                <UmberText>Back to home</UmberText>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${elements.sidebar.visible ? 'ml-64' : 'ml-0'}`}>
        {showMindMap ? (
          /* Mind Map Interface */
          <div className="h-[calc(100vh-80px)]">
            <MindMapCanvas />
          </div>
        ) : (
          /* Onboarding Welcome Content */
          <div className="max-w-4xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
              className="w-24 h-24 bg-gradient-to-r from-moss-500 to-moss-600 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <HomeIcon className="w-12 h-12 text-white" />
            </motion.div>

            {/* Welcome Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                <UmberText>Welcome to your dashboard!</UmberText>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                <UmberText>
                  Your personal curation space is ready. Start organizing your interests 
                  and discoveries in a way that makes sense to you.
                </UmberText>
              </p>
            </motion.div>
          </motion.div>
        </div>
      )}
      </div>
    </div>
  );
}

export default Dashboard;
