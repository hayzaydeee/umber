# React Flow Integration Guide for Umber

## Overview
Implement the mind map visualization using React Flow to show Umbers as visual networks with nests as containers and items as nodes.

---

## Setup & Installation

```bash
npm install reactflow
```

### Basic Imports
```javascript
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
  MiniMap,
  useReactFlow,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
```

---

## Data Structure Mapping

### Transform Database Data to React Flow Format

```javascript
// utils/mindMapTransformer.js
export const transformUmberToMindMap = (umber) => {
  const nodes = [];
  const edges = [];
  
  // 1. Create the central Umber node
  nodes.push({
    id: `umber-${umber._id}`,
    type: 'umberNode',
    position: { x: 0, y: 0 },
    data: {
      label: umber.name,
      theme: umber.theme,
      itemCount: umber.itemCount,
      totalValue: umber.totalValue,
      type: 'umber'
    },
    draggable: false,
    selectable: false
  });

  // 2. Create nest nodes
  umber.nests.forEach((nest, nestIndex) => {
    const nestId = `nest-${nest._id}`;
    
    nodes.push({
      id: nestId,
      type: 'nestNode',
      position: nest.position || calculateNestPosition(nestIndex, umber.nests.length),
      data: {
        label: nest.name,
        isDefault: nest.isDefault,
        isExclusive: nest.isExclusive,
        itemCount: nest.items?.length || 0,
        type: 'nest'
      },
      className: nest.isDefault ? 'nest-node-default' : 'nest-node-custom'
    });

    // Connect nest to umber
    edges.push({
      id: `edge-umber-${nestId}`,
      source: `umber-${umber._id}`,
      target: nestId,
      type: 'smoothstep',
      animated: false,
      style: { stroke: '#94a3b8', strokeWidth: 2 }
    });

    // 3. Create item nodes within each nest
    nest.items?.forEach((item, itemIndex) => {
      const itemId = `item-${item._id}`;
      
      nodes.push({
        id: itemId,
        type: 'itemNode',
        position: item.position || calculateItemPosition(nestIndex, itemIndex, nest.items.length),
        data: {
          label: item.title,
          price: item.price,
          image: item.image,
          priority: item.priority,
          whyIWantThis: item.whyIWantThis,
          url: item.url,
          type: 'item'
        },
        parentNode: nestId, // This makes it a child of the nest
        extent: 'parent', // Keeps it within the nest bounds
        className: `item-node priority-${item.priority || 'medium'}`
      });

      // Connect item to nest
      edges.push({
        id: `edge-${nestId}-${itemId}`,
        source: nestId,
        target: itemId,
        type: 'straight',
        style: { 
          stroke: getPriorityColor(item.priority),
          strokeWidth: 1
        }
      });
    });
  });

  return { nodes, edges };
};

// Helper functions
const calculateNestPosition = (index, total) => {
  const radius = 300;
  const angle = (index / total) * 2 * Math.PI;
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius
  };
};

const calculateItemPosition = (nestIndex, itemIndex, totalItems) => {
  const nestRadius = 150;
  const itemAngle = (itemIndex / totalItems) * 2 * Math.PI;
  return {
    x: Math.cos(itemAngle) * nestRadius,
    y: Math.sin(itemAngle) * nestRadius
  };
};

const getPriorityColor = (priority) => {
  const colors = {
    high: '#ef4444',
    medium: '#f59e0b', 
    low: '#10b981'
  };
  return colors[priority] || colors.medium;
};
```

---

## Custom Node Components

### 1. Umber Node (Central Hub)
```javascript
// components/mindmap/UmberNode.jsx
import { Handle, Position } from 'reactflow';

const UmberNode = ({ data }) => {
  return (
    <div className="umber-node">
      <div className={`umber-node-content theme-${data.theme}`}>
        <div className="umber-icon">🌳</div>
        <h3 className="umber-title">{data.label}</h3>
        <div className="umber-stats">
          <span>{data.itemCount} items</span>
          <span>${(data.totalValue / 100).toFixed(2)}</span>
        </div>
      </div>
      
      {/* Handles for connections */}
      <Handle
        type="source"
        position={Position.Top}
        style={{ background: '#10b981', width: '10px', height: '10px' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#10b981', width: '10px', height: '10px' }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#10b981', width: '10px', height: '10px' }}
      />
      <Handle
        type="source"
        position={Position.Left}
        style={{ background: '#10b981', width: '10px', height: '10px' }}
      />
    </div>
  );
};

export default UmberNode;
```

### 2. Nest Node (Container)
```javascript
// components/mindmap/NestNode.jsx
import { Handle, Position } from 'reactflow';
import { motion } from 'framer-motion';

const NestNode = ({ data, selected }) => {
  return (
    <motion.div 
      className={`nest-node ${data.isDefault ? 'default-nest' : 'custom-nest'} ${selected ? 'selected' : ''}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#6366f1' }}
      />
      
      <div className="nest-header">
        <div className="nest-icon">
          {data.isDefault ? '📥' : '🗂️'}
        </div>
        <h4 className="nest-title">{data.label}</h4>
        {data.isExclusive && (
          <span className="exclusivity-badge">🔒</span>
        )}
      </div>
      
      <div className="nest-stats">
        <span className="item-count">{data.itemCount} items</span>
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#6366f1' }}
      />
    </motion.div>
  );
};

export default NestNode;
```

### 3. Item Node (Individual Items)
```javascript
// components/mindmap/ItemNode.jsx
import { Handle, Position } from 'reactflow';
import { motion } from 'framer-motion';

const ItemNode = ({ data, selected }) => {
  const priorityColors = {
    high: 'border-red-400 bg-red-50',
    medium: 'border-yellow-400 bg-yellow-50',
    low: 'border-green-400 bg-green-50'
  };

  return (
    <motion.div 
      className={`item-node ${priorityColors[data.priority]} ${selected ? 'selected' : ''}`}
      whileHover={{ scale: 1.1 }}
      layout
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#8b5cf6' }}
      />
      
      <div className="item-content">
        {data.image && (
          <img 
            src={data.image} 
            alt={data.label}
            className="item-image"
          />
        )}
        
        <div className="item-details">
          <h5 className="item-title" title={data.label}>
            {data.label.length > 30 ? `${data.label.slice(0, 30)}...` : data.label}
          </h5>
          
          {data.price && (
            <p className="item-price">${(data.price / 100).toFixed(2)}</p>
          )}
          
          {data.whyIWantThis && (
            <p className="item-reflection" title={data.whyIWantThis}>
              💭 {data.whyIWantThis.slice(0, 50)}...
            </p>
          )}
        </div>
        
        <div className={`priority-indicator priority-${data.priority}`}></div>
      </div>
    </motion.div>
  );
};

export default ItemNode;
```

---

## Main Mind Map Component

```javascript
// components/mindmap/UmberMindMap.jsx
import React, { useCallback, useMemo, useState } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
  MiniMap,
  useReactFlow,
} from 'reactflow';
import { useParams, useNavigate } from 'react-router-dom';

import UmberNode from './UmberNode';
import NestNode from './NestNode';
import ItemNode from './ItemNode';
import MindMapToolbar from './MindMapToolbar';

import { useUmber } from '../../hooks/useUmber';
import { transformUmberToMindMap } from '../../utils/mindMapTransformer';

// Define custom node types
const nodeTypes = {
  umberNode: UmberNode,
  nestNode: NestNode,
  itemNode: ItemNode,
};

const UmberMindMap = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: umber, isLoading } = useUmber(id);
  const { zoomIn, zoomOut } = useReactFlow();
  
  // Transform umber data to mind map format
  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    if (!umber) return { nodes: [], edges: [] };
    return transformUmberToMindMap(umber);
  }, [umber]);
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);

  // Handle React Flow initialization
  const onInit = useCallback((reactFlowInstance) => {
    reactFlowInstance.fitView({ duration: 800 });
  }, []);

  // Handle node drag end - save positions
  const onNodeDragStop = useCallback(async (event, node) => {
    try {
      await saveNodePosition(node.id, node.position, node.data.type);
    } catch (error) {
      console.error('Failed to save node position:', error);
    }
  }, []);

  // Handle node selection
  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    
    // Open item details if it's an item node
    if (node.data.type === 'item') {
      // You could open a modal here or navigate to item details
      console.log('Clicked item:', node.data);
    }
  }, []);

  // Auto-layout function
  const autoLayout = useCallback(() => {
    // Implement automatic layout algorithm
    const layoutedNodes = applyAutoLayout(nodes);
    setNodes(layoutedNodes);
  }, [nodes, setNodes]);

  // Fit view function for toolbar
  const handleFitView = useCallback(() => {
    fitView({ duration: 800 });
  }, [fitView]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-lg">Loading mind map...</div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDragStop={onNodeDragStop}
        onNodeClick={onNodeClick}
        onInit={onInit}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        className="bg-gray-50"
      >
        <Background color="#e2e8f0" gap={20} />
        <Controls />
        <MiniMap 
          nodeColor={(node) => {
            switch (node.data.type) {
              case 'umber': return '#10b981';
              case 'nest': return '#6366f1';
              case 'item': return '#8b5cf6';
              default: return '#94a3b8';
            }
          }}
        />
      </ReactFlow>

      <MindMapToolbar
        onAutoLayout={autoLayout}
        onFitView={handleFitView}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onBackToList={() => navigate(`/umbers/${id}`)}
        selectedNode={selectedNode}
      />
    </div>
  );
};

// Wrap with ReactFlowProvider
const UmberMindMapWrapper = () => (
  <ReactFlowProvider>
    <UmberMindMap />
  </ReactFlowProvider>
);

export default UmberMindMapWrapper;
```

---

## Utility Functions

### Auto-Layout Algorithm
```javascript
// utils/autoLayout.js
export const applyAutoLayout = (nodes) => {
  const umberNode = nodes.find(n => n.data.type === 'umber');
  const nestNodes = nodes.filter(n => n.data.type === 'nest');
  const itemNodes = nodes.filter(n => n.data.type === 'item');

  // Center the umber node
  const layoutedNodes = [...nodes];
  const umberIndex = layoutedNodes.findIndex(n => n.id === umberNode.id);
  if (umberIndex !== -1) {
    layoutedNodes[umberIndex].position = { x: 0, y: 0 };
  }

  // Arrange nests in a circle around the umber
  nestNodes.forEach((nest, index) => {
    const angle = (index / nestNodes.length) * 2 * Math.PI;
    const radius = 400;
    
    const nestIndex = layoutedNodes.findIndex(n => n.id === nest.id);
    if (nestIndex !== -1) {
      layoutedNodes[nestIndex].position = {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius
      };
    }

    // Arrange items around their parent nest
    const nestItems = itemNodes.filter(item => 
      layoutedNodes.find(n => n.id === item.id)?.parentNode === nest.id
    );

    nestItems.forEach((item, itemIndex) => {
      const itemAngle = (itemIndex / nestItems.length) * 2 * Math.PI;
      const itemRadius = 150;
      
      const itemIndexInLayout = layoutedNodes.findIndex(n => n.id === item.id);
      if (itemIndexInLayout !== -1) {
        layoutedNodes[itemIndexInLayout].position = {
          x: Math.cos(angle) * radius + Math.cos(itemAngle) * itemRadius,
          y: Math.sin(angle) * radius + Math.sin(itemAngle) * itemRadius
        };
      }
    });
  });

  return layoutedNodes;
};
```

### Position Saving
```javascript
// utils/mindMapAPI.js
export const saveNodePosition = async (nodeId, position, nodeType) => {
  const [type, id] = nodeId.split('-');
  
  const endpoint = type === 'nest' 
    ? `/api/nests/${id}`
    : `/api/items/${id}`;
    
  await fetch(endpoint, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify({ position })
  });
};
```

---

## Mind Map Toolbar Component

```javascript
// components/mindmap/MindMapToolbar.jsx
const MindMapToolbar = ({
  onAutoLayout,
  onFitView,
  onZoomIn,
  onZoomOut,
  onBackToList,
  selectedNode
}) => {
  return (
    <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 flex items-center space-x-3">
      <button
        onClick={onBackToList}
        className="btn-secondary text-sm"
      >
        ← Back to List
      </button>
      
      <div className="border-l pl-3 flex space-x-2">
        <button onClick={onFitView} className="btn-icon" title="Fit View">
          🔍
        </button>
        <button onClick={onZoomIn} className="btn-icon" title="Zoom In">
          ➕
        </button>
        <button onClick={onZoomOut} className="btn-icon" title="Zoom Out">
          ➖
        </button>
        <button onClick={onAutoLayout} className="btn-icon" title="Auto Layout">
          ⚡
        </button>
      </div>

      {selectedNode && (
        <div className="border-l pl-3">
          <span className="text-sm text-gray-600">
            Selected: {selectedNode.data.label}
          </span>
        </div>
      )}
    </div>
  );
};
```

---

## Styling

### CSS for Custom Nodes
```css
/* styles/mindmap.css */

/* Umber Node */
.umber-node {
  width: 200px;
  height: 120px;
}

.umber-node-content {
  width: 100%;
  height: 100%;
  border-radius: 16px;
  border: 3px solid #10b981;
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  padding: 16px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.umber-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.umber-title {
  font-size: 16px;
  font-weight: 600;
  color: #065f46;
  margin-bottom: 8px;
}

.umber-stats {
  font-size: 12px;
  color: #047857;
  display: flex;
  justify-content: space-between;
}

/* Nest Node */
.nest-node {
  min-width: 160px;
  min-height: 80px;
  border-radius: 12px;
  border: 2px solid #6366f1;
  background: white;
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.nest-node.default-nest {
  border-color: #94a3b8;
  background: #f8fafc;
}

.nest-node.selected {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.nest-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.nest-icon {
  font-size: 18px;
  margin-right: 8px;
}

.nest-title {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.exclusivity-badge {
  margin-left: auto;
  font-size: 12px;
}

/* Item Node */
.item-node {
  width: 140px;
  min-height: 100px;
  border-radius: 8px;
  border: 2px solid;
  background: white;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

.item-node.selected {
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.3);
}

.item-image {
  width: 100%;
  height: 60px;
  object-fit: cover;
}

.item-details {
  padding: 8px;
}

.item-title {
  font-size: 12px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 4px;
  line-height: 1.3;
}

.item-price {
  font-size: 11px;
  font-weight: 600;
  color: #059669;
  margin-bottom: 4px;
}

.item-reflection {
  font-size: 10px;
  color: #6b7280;
  font-style: italic;
}

.priority-indicator {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.priority-high { background-color: #ef4444; }
.priority-medium { background-color: #f59e0b; }
.priority-low { background-color: #10b981; }

/* Responsive adjustments */
@media (max-width: 768px) {
  .umber-node { width: 160px; height: 100px; }
  .nest-node { min-width: 120px; min-height: 60px; }
  .item-node { width: 100px; min-height: 80px; }
}
```

---

## Performance Considerations

### Optimize for Large Datasets
```javascript
// Only render visible nodes
const useVisibleNodes = (nodes, viewport) => {
  return useMemo(() => {
    if (nodes.length < 100) return nodes;
    
    // Only render nodes within viewport + margin
    return nodes.filter(node => {
      const nodeRect = {
        x: node.position.x,
        y: node.position.y,
        width: node.width || 140,
        height: node.height || 100
      };
      
      return isNodeVisible(nodeRect, viewport);
    });
  }, [nodes, viewport]);
};

// Debounce position updates
const useDebouncedPositionSave = () => {
  const savePositions = useMemo(
    () => debounce(async (updates) => {
      await Promise.all(
        updates.map(({ nodeId, position, nodeType }) =>
          saveNodePosition(nodeId, position, nodeType)
        )
      );
    }, 1000),
    []
  );

  return savePositions;
};
```

This implementation provides a solid foundation for the mind map feature while keeping it performant and user-friendly. The visual representation will help users understand their wishlist organization at a glance and make Umber feel distinctly different from other wishlist apps.