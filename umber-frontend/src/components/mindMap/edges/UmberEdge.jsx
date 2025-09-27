import React from 'react';
import { BaseEdge, getSmoothStepPath, EdgeLabelRenderer } from '@xyflow/react';
import { motion } from 'motion/react';

/**
 * UmberEdge - Custom edge component for connections between umbers
 * 
 * Features:
 * - Smooth curved paths with proper routing
 * - Umber-themed styling and colors
 * - Animated flow indicators
 * - Hover states and interactions
 * - Support for different relationship types
 */
function UmberEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  selected,
  animated,
  data,
}) {
  // Calculate the smooth step path
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 16,
  });

  // Edge styling based on state and type
  const getEdgeStyle = () => {
    const baseStyle = {
      stroke: '#6B7D67',
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      ...style,
    };

    // Different styles based on relationship type
    if (data?.type === 'nest') {
      baseStyle.stroke = '#B8915F';
      baseStyle.strokeDasharray = '5,5';
    } else if (data?.type === 'related') {
      baseStyle.stroke = '#998772';
      baseStyle.strokeDasharray = '3,3';
    }

    // Selected state
    if (selected) {
      baseStyle.strokeWidth = 3;
      baseStyle.stroke = '#5B6F57';
    }

    // Animated state
    if (animated) {
      baseStyle.strokeDasharray = '8,4';
    }

    return baseStyle;
  };

  const edgeStyle = getEdgeStyle();

  return (
    <>
      {/* Main edge path */}
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={edgeStyle}
        className={`
          transition-all duration-200 ease-in-out
          ${selected ? 'drop-shadow-sm' : ''}
          ${animated ? 'animate-pulse' : ''}
        `}
      />

      {/* Animated flow indicators */}
      {animated && (
        <motion.circle
          r="3"
          fill="#6B7D67"
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            offsetPath: `path('${edgePath}')`,
          }}
        />
      )}

      {/* Edge label for relationship type */}
      {data?.label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
            }}
            className="nodrag nopan"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="
                bg-white/90 backdrop-blur-sm 
                border border-umber-200 
                rounded-full px-2 py-1 
                text-xs font-medium text-umber-700
                shadow-sm
              "
            >
              {data.label}
            </motion.div>
          </div>
        </EdgeLabelRenderer>
      )}

      {/* Hover zone for easier selection */}
      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth="12"
        className="hover:stroke-moss-500/20 cursor-pointer transition-colors"
      />
    </>
  );
}

export default UmberEdge;
