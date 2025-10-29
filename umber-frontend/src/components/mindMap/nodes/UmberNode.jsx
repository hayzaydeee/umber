import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';
import { Handle, Position, useUpdateNodeInternals } from '@xyflow/react';
import { motion } from 'motion/react';
import { 
  DotsHorizontalIcon, 
  Pencil1Icon, 
  TrashIcon, 
  PlusIcon,
  StarIcon,
  StarFilledIcon 
} from '@radix-ui/react-icons';

/**
 * UmberNode - Custom node component for displaying umbers in the mind map
 * 
 * Features:
 * - Editable labels with dynamic width
 * - Color-coded based on umber theme
 * - Interactive handles for connections
 * - Context menu for actions
 * - Responsive design with hover states
 * - Integration with umber data structure
 */
function UmberNode({ id, data, selected }) {
  const [isEditing, setIsEditing] = useState(data?.isNew || false);
  const [label, setLabel] = useState(data?.label || 'New Umber');
  const [showMenu, setShowMenu] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const inputRef = useRef(null);
  const nodeRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();

  // Auto-focus new nodes
  useLayoutEffect(() => {
    if (data?.isNew && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 100);
    }
  }, [data?.isNew]);

  // Dynamic width based on content
  useLayoutEffect(() => {
    if (inputRef.current) {
      const minWidth = 120;
      const padding = 40; // Account for padding and icon
      const textWidth = label.length * 8; // Approximate character width
      const newWidth = Math.max(minWidth, textWidth + padding);
      
      if (nodeRef.current) {
        nodeRef.current.style.width = `${newWidth}px`;
        updateNodeInternals(id);
      }
    }
  }, [label, id, updateNodeInternals]);

  // Handle label editing
  const handleLabelChange = useCallback((e) => {
    setLabel(e.target.value);
  }, []);

  const handleLabelSubmit = useCallback(() => {
    setIsEditing(false);
    // Here you would typically update the node data via API
    console.log('Updating umber label:', { id, label });
  }, [id, label]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleLabelSubmit();
    } else if (e.key === 'Escape') {
      setLabel(data?.label || 'New Umber');
      setIsEditing(false);
    }
  }, [handleLabelSubmit, data?.label]);

  // Context menu actions
  const handleEdit = useCallback(() => {
    setIsEditing(true);
    setShowMenu(false);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 100);
  }, []);

  const handleDelete = useCallback(() => {
    console.log('Deleting umber:', id);
    setShowMenu(false);
    // Here you would typically delete the node via API
  }, [id]);

  const handleAddChild = useCallback(() => {
    console.log('Adding child to umber:', id);
    setShowMenu(false);
    // Here you would typically create a new connected node
  }, [id]);

  // Node styling based on type and state
  const getNodeStyle = () => {
    const baseStyle = {
      background: 'linear-gradient(135deg, #F7F6F4 0%, #EDEAE5 100%)',
      border: '2px solid #C8BCA8',
      borderRadius: '12px',
      padding: '8px 12px',
      minHeight: '48px',
      position: 'relative',
      transition: 'all 0.2s ease',
      cursor: isEditing ? 'text' : 'grab',
    };

    if (data?.isUmber) {
      baseStyle.background = 'linear-gradient(135deg, #E3E7E2 0%, #C9D2C7 100%)';
      baseStyle.border = '2px solid #6B7D67';
    }

    if (data?.isNest) {
      baseStyle.background = 'linear-gradient(135deg, #F5EFE4 0%, #EDDCC5 100%)';
      baseStyle.border = '2px solid #B8915F';
    }

    if (selected) {
      baseStyle.boxShadow = '0 0 0 3px rgba(107, 125, 103, 0.3)';
      baseStyle.borderColor = '#6B7D67';
    }

    if (isHovered && !isEditing) {
      baseStyle.transform = 'scale(1.02)';
      baseStyle.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    }

    return baseStyle;
  };

  // Icon based on umber type
  const getNodeIcon = () => {
    if (data?.icon) return data.icon;
    if (data?.isUmber) return '📦';
    if (data?.isNest) return '📁';
    return '⭐';
  };

  // Node color for indicators
  const getNodeColor = () => {
    if (data?.color) return data.color;
    if (data?.isUmber) return '#6B7D67';
    if (data?.isNest) return '#B8915F';
    return '#998772';
  };

  return (
    <>
      {/* Invisible handles for connections */}
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: getNodeColor(),
          width: 8,
          height: 8,
          border: '2px solid white',
          opacity: isHovered || selected ? 1 : 0,
        }}
      />
      
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: getNodeColor(),
          width: 8,
          height: 8,
          border: '2px solid white',
          opacity: isHovered || selected ? 1 : 0,
        }}
      />

      {/* Main node content */}
      <motion.div
        ref={nodeRef}
        style={getNodeStyle()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, type: "spring" }}
        data-element={data?.isUmber ? "umber-node" : undefined}
      >
        {/* Node content */}
        <div className="flex items-center space-x-2 relative z-10">
          {/* Icon */}
          <div className="flex-shrink-0">
            <span className="text-lg">{getNodeIcon()}</span>
          </div>

          {/* Label */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <input
                ref={inputRef}
                type="text"
                value={label}
                onChange={handleLabelChange}
                onBlur={handleLabelSubmit}
                onKeyDown={handleKeyPress}
                className="w-full bg-transparent border-none outline-none text-sm font-medium text-umber-800 placeholder-umber-400"
                placeholder="Enter umber name..."
                style={{ pointerEvents: 'all' }}
              />
            ) : (
              <div
                className="text-sm font-medium text-umber-800 truncate cursor-pointer"
                onDoubleClick={handleEdit}
                style={{ pointerEvents: isEditing ? 'none' : 'all' }}
              >
                {label}
              </div>
            )}
          </div>

          {/* Menu button */}
          {(isHovered || showMenu) && !isEditing && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="flex-shrink-0 p-1 rounded hover:bg-white/50 transition-colors"
              style={{ pointerEvents: 'all' }}
            >
              <DotsHorizontalIcon className="w-3 h-3 text-umber-600" />
            </button>
          )}
        </div>

        {/* Metadata */}
        {data && (data.totalItems > 0 || data.totalValue > 0) && !isEditing && (
          <div className="mt-1 flex items-center space-x-2 text-xs text-umber-600">
            {data.totalItems > 0 && (
              <span>{data.totalItems} items</span>
            )}
            {data.totalValue > 0 && (
              <span>${data.totalValue}</span>
            )}
          </div>
        )}

        {/* Context Menu */}
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute top-full left-0 mt-2 bg-white border border-umber-200 rounded-lg shadow-lg py-1 z-50 min-w-[120px]"
            style={{ pointerEvents: 'all' }}
          >
            <button
              onClick={handleEdit}
              className="w-full px-3 py-2 text-left text-sm text-umber-700 hover:bg-umber-50 flex items-center space-x-2"
            >
              <Pencil1Icon className="w-3 h-3" />
              <span>Edit</span>
            </button>
            
            <button
              onClick={handleAddChild}
              className="w-full px-3 py-2 text-left text-sm text-umber-700 hover:bg-umber-50 flex items-center space-x-2"
            >
              <PlusIcon className="w-3 h-3" />
              <span>Add Child</span>
            </button>
            
            <div className="border-t border-umber-200 my-1" />
            
            <button
              onClick={handleDelete}
              className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
            >
              <TrashIcon className="w-3 h-3" />
              <span>Delete</span>
            </button>
          </motion.div>
        )}

        {/* Drag handle - invisible overlay for dragging */}
        {!isEditing && (
          <div
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            style={{ pointerEvents: 'all' }}
          />
        )}
      </motion.div>

      {/* Click outside handler for menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowMenu(false)}
          style={{ pointerEvents: 'all' }}
        />
      )}
    </>
  );
}

export default UmberNode;
