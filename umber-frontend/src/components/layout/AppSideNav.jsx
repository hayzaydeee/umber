import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HomeIcon, 
  MagnifyingGlassIcon, 
  PlusIcon, 
  EyeOpenIcon,
  GearIcon,
  PersonIcon,
  ArchiveIcon
} from '@radix-ui/react-icons';
import { useUIState } from '../../contexts/UIContext';
import { ThemeToggle } from '../../contexts/ThemeContext';
import UmberText from '../ui/UmberText';

/**
 * AppSideNav - Application sidebar navigation for umber management
 * 
 * Features:
 * - Shows/hides based on UI context state
 * - Navigation items for umber management
 * - Integration with onboarding flow
 * - Smooth animations and transitions
 */
function AppSideNav() {
  const { elements } = useUIState();
  const sidebarState = elements.sidebar;

  // Navigation items
  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon, active: true },
    { id: 'mindmap', label: 'Mind Map', icon: EyeOpenIcon },
    { id: 'search', label: 'Search', icon: MagnifyingGlassIcon },
    { id: 'create', label: 'Create', icon: PlusIcon },
    { id: 'library', label: 'Library', icon: ArchiveIcon },
    { id: 'settings', label: 'Settings', icon: GearIcon },
  ];

  return (
    <AnimatePresence>
      {sidebarState.visible && (
        <motion.div
          initial={{ x: -280, opacity: 0 }}
          animate={{ 
            x: 0, 
            opacity: 1,
            transition: {
              type: "spring",
              damping: 25,
              stiffness: 200,
              duration: 0.6
            }
          }}
          exit={{ 
            x: -280, 
            opacity: 0,
            transition: {
              duration: 0.3
            }
          }}
          className="fixed left-0 top-0 bottom-0 w-64 bg-white/95 backdrop-blur-sm border-r border-umber-200 shadow-xl z-30"
        >
          {/* Header */}
          <div className="p-6 border-b border-umber-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-moss-500 to-moss-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-2xl font-display italic">u</span>
                </div>
                <div>
                  <UmberText variant="h4" className="text-umber-800 font-semibold">
                    umber
                  </UmberText>
                  <UmberText variant="small" className="text-umber-600">
                    your curated space
                  </UmberText>
                </div>
              </div>
              
              {/* Theme Toggle */}
              <ThemeToggle className="p-2" />
            </div>
          </div>

          {/* Navigation */}
          <div className="p-4">
            <nav className="space-y-2">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      transition: { delay: index * 0.1 }
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200
                      ${item.active 
                        ? 'bg-moss-100 text-moss-700 shadow-sm' 
                        : 'text-umber-600 hover:bg-umber-50 hover:text-umber-800'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                );
              })}
            </nav>
          </div>

          {/* Recent Activity */}
          <div className="p-4 border-t border-umber-200 mt-auto">
            <UmberText variant="small" className="text-umber-600 font-medium mb-3">
              Recent Activity
            </UmberText>
            <div className="space-y-2">
              <div className="text-xs text-umber-500">
                Your recent umbers and collections will appear here
              </div>
            </div>
          </div>

          {/* User Profile */}
          <div className="p-4 border-t border-umber-200">
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-umber-600 hover:bg-umber-50 transition-colors">
              <div className="w-8 h-8 bg-gradient-to-br from-ochre-400 to-ochre-500 rounded-full flex items-center justify-center">
                <PersonIcon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-medium text-umber-800">Guest User</div>
                <div className="text-xs text-umber-600">curator@example.com</div>
              </div>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AppSideNav;
