import React from 'react';
import { motion } from 'motion/react';
import { 
  ZoomInIcon, 
  ZoomOutIcon, 
  TargetIcon,
  MagnifyingGlassIcon,
  EyeOpenIcon,
  EyeClosedIcon,
  GridIcon,
  ViewHorizontalIcon,
  ResetIcon,
  PlusIcon,
  DownloadIcon,
  Share1Icon,
} from '@radix-ui/react-icons';
import { BackgroundVariant } from '@xyflow/react';
import { useUIState } from '../../contexts/UIContext';

/**
 * MindMapToolbar - Control panel for mind map interactions
 * 
 * Features:
 * - Zoom and viewport controls
 * - View options (minimap, background)
 * - Export and sharing options
 * - Quick actions for node creation
 * - Integration with UI state management
 */
function MindMapToolbar({
  onFitView,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onToggleMiniMap,
  onToggleBackground,
  showMiniMap,
  backgroundVariant,
  isLoaded,
}) {
  const { elements } = useUIState();

  // Toolbar button component
  const ToolbarButton = ({ 
    onClick, 
    icon: Icon, 
    label, 
    active = false, 
    disabled = false,
    className = "" 
  }) => (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`
        flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all
        ${active 
          ? 'bg-moss-500 text-white shadow-sm' 
          : 'bg-white/80 text-umber-700 hover:bg-white hover:text-umber-800 border border-umber-200'
        }
        ${disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:shadow-md cursor-pointer'
        }
        ${className}
      `}
      title={label}
    >
      <Icon className="w-4 h-4" />
      <span className="hidden sm:inline">{label}</span>
    </motion.button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="bg-white/90 backdrop-blur-sm border border-umber-200 rounded-xl shadow-lg p-2"
    >
      <div className="flex items-center space-x-2">
        {/* Zoom Controls */}
        <div className="flex items-center space-x-1 border-r border-umber-200 pr-2">
          <ToolbarButton
            onClick={onZoomOut}
            icon={ZoomOutIcon}
            label="Zoom Out"
            disabled={!isLoaded}
          />
          
          <ToolbarButton
            onClick={onResetZoom}
            icon={ResetIcon}
            label="Reset Zoom"
            disabled={!isLoaded}
          />
          
          <ToolbarButton
            onClick={onZoomIn}
            icon={ZoomInIcon}
            label="Zoom In"
            disabled={!isLoaded}
          />
        </div>

        {/* View Controls */}
        <div className="flex items-center space-x-1 border-r border-umber-200 pr-2">
          <ToolbarButton
            onClick={onFitView}
            icon={TargetIcon}
            label="Fit View"
            disabled={!isLoaded}
          />
          
          <ToolbarButton
            onClick={onToggleMiniMap}
            icon={showMiniMap ? EyeOpenIcon : EyeClosedIcon}
            label={showMiniMap ? "Hide MiniMap" : "Show MiniMap"}
            active={showMiniMap}
            disabled={!isLoaded}
          />
          
          <ToolbarButton
            onClick={onToggleBackground}
            icon={backgroundVariant === BackgroundVariant.Dots ? GridIcon : ViewHorizontalIcon}
            label="Toggle Background"
            disabled={!isLoaded}
          />
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-1 border-r border-umber-200 pr-2">
          <ToolbarButton
            onClick={() => console.log('Add new umber')}
            icon={PlusIcon}
            label="Add Umber"
            disabled={!isLoaded}
          />
          
          <ToolbarButton
            onClick={() => console.log('Search mind map')}
            icon={MagnifyingGlassIcon}
            label="Search"
            disabled={!isLoaded}
          />
        </div>

        {/* Export & Share */}
        <div className="flex items-center space-x-1">
          <ToolbarButton
            onClick={() => console.log('Export mind map')}
            icon={DownloadIcon}
            label="Export"
            disabled={!isLoaded}
          />
          
          <ToolbarButton
            onClick={() => console.log('Share mind map')}
            icon={Share1Icon}
            label="Share"
            disabled={!isLoaded}
          />
        </div>
      </div>

      {/* Loading indicator */}
      {!isLoaded && (
        <div className="flex items-center justify-center mt-2 pt-2 border-t border-umber-200">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border-2 border-moss-500 border-t-transparent rounded-full"
          />
          <span className="ml-2 text-xs text-umber-600">Loading mind map...</span>
        </div>
      )}
    </motion.div>
  );
}

export default MindMapToolbar;
