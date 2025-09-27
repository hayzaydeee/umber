import React from 'react';
import { motion } from 'motion/react';
import { 
  Cross2Icon, 
  DotsHorizontalIcon,
  Pencil1Icon,
  TrashIcon,
  PlusIcon,
  EyeOpenIcon,
  CalendarIcon,
  CubeIcon,
  TokensIcon,
} from '@radix-ui/react-icons';

/**
 * NodeDetailsPanel - Side panel for displaying selected node information
 * 
 * Features:
 * - Detailed node information display
 * - Quick edit capabilities
 * - Action buttons for node operations
 * - Stats and metadata visualization
 * - Smooth animations and transitions
 */
function NodeDetailsPanel({ selectedNode, onClose }) {
  if (!selectedNode) return null;

  const { data } = selectedNode;

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Format currency helper
  const formatCurrency = (amount) => {
    if (!amount || amount === 0) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Get node type display name
  const getNodeTypeDisplay = () => {
    if (data?.isUmber) return 'Umber';
    if (data?.isNest) return 'Nest';
    return 'Node';
  };

  // Get node color
  const getNodeColor = () => {
    if (data?.color) return data.color;
    if (data?.isUmber) return '#6B7D67';
    if (data?.isNest) return '#B8915F';
    return '#998772';
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 bottom-0 w-80 bg-white border-l border-umber-200 shadow-2xl z-50 overflow-y-auto"
      >
        {/* Header */}
        <div className="p-4 border-b border-umber-200 bg-gradient-to-r from-moss-50 to-ochre-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getNodeColor() }}
              />
              <span className="text-sm font-medium text-umber-600">
                {getNodeTypeDisplay()}
              </span>
            </div>
            
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-white/60 transition-colors"
            >
              <Cross2Icon className="w-4 h-4 text-umber-600" />
            </button>
          </div>
          
          <h2 className="text-lg font-semibold text-umber-800 mt-2 break-words">
            {data?.label || 'Untitled'}
          </h2>
          
          {data?.description && (
            <p className="text-sm text-umber-600 mt-1">
              {data.description}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-2">
            <button className="flex flex-col items-center p-3 bg-umber-50 hover:bg-umber-100 rounded-lg transition-colors">
              <Pencil1Icon className="w-4 h-4 text-umber-600 mb-1" />
              <span className="text-xs text-umber-700">Edit</span>
            </button>
            
            <button className="flex flex-col items-center p-3 bg-umber-50 hover:bg-umber-100 rounded-lg transition-colors">
              <PlusIcon className="w-4 h-4 text-umber-600 mb-1" />
              <span className="text-xs text-umber-700">Add Child</span>
            </button>
            
            <button className="flex flex-col items-center p-3 bg-umber-50 hover:bg-umber-100 rounded-lg transition-colors">
              <EyeOpenIcon className="w-4 h-4 text-umber-600 mb-1" />
              <span className="text-xs text-umber-700">View</span>
            </button>
          </div>

          {/* Stats */}
          {(data?.totalItems > 0 || data?.totalValue > 0) && (
            <div className="bg-gradient-to-br from-moss-50 to-ochre-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-umber-800 mb-3">Statistics</h3>
              
              <div className="space-y-3">
                {data.totalItems > 0 && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CubeIcon className="w-4 h-4 text-moss-600" />
                      <span className="text-sm text-umber-700">Total Items</span>
                    </div>
                    <span className="text-sm font-medium text-umber-800">
                      {data.totalItems}
                    </span>
                  </div>
                )}
                
                {data.totalValue > 0 && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TokensIcon className="w-4 h-4 text-ochre-600" />
                      <span className="text-sm text-umber-700">Total Value</span>
                    </div>
                    <span className="text-sm font-medium text-umber-800">
                      {formatCurrency(data.totalValue)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="bg-umber-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-umber-800 mb-3">Details</h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-umber-600">ID</span>
                <span className="text-umber-800 font-mono text-xs">
                  {selectedNode.id.slice(0, 8)}...
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-umber-600">Type</span>
                <span className="text-umber-800">{getNodeTypeDisplay()}</span>
              </div>
              
              {data?.parentUmber && (
                <div className="flex justify-between">
                  <span className="text-umber-600">Parent</span>
                  <span className="text-umber-800">{data.parentUmber}</span>
                </div>
              )}
              
              {data?.createdAt && (
                <div className="flex justify-between">
                  <span className="text-umber-600">Created</span>
                  <span className="text-umber-800">{formatDate(data.createdAt)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Nests (for umber nodes) */}
          {data?.isUmber && data?.nests && data.nests.length > 0 && (
            <div className="bg-ochre-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-umber-800 mb-3">
                Nests ({data.nests.length})
              </h3>
              
              <div className="space-y-2">
                {data.nests.slice(0, 5).map((nest, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-umber-700 truncate">
                      {nest.name || `Nest ${index + 1}`}
                    </span>
                    <span className="text-xs text-umber-600">
                      {nest.totalItems || 0} items
                    </span>
                  </div>
                ))}
                
                {data.nests.length > 5 && (
                  <div className="text-xs text-umber-600 text-center pt-2">
                    +{data.nests.length - 5} more nests
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="border-t border-umber-200 pt-4">
            <div className="space-y-2">
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-moss-500 text-white rounded-lg hover:bg-moss-600 transition-colors">
                <EyeOpenIcon className="w-4 h-4" />
                <span>View Full Details</span>
              </button>
              
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-white border border-umber-200 text-umber-700 rounded-lg hover:bg-umber-50 transition-colors">
                <DotsHorizontalIcon className="w-4 h-4" />
                <span>More Actions</span>
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="border-t border-red-200 pt-4">
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
              <TrashIcon className="w-4 h-4" />
              <span>Delete {getNodeTypeDisplay()}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default NodeDetailsPanel;
