import { useCallback, useState, useRef } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  applyNodeChanges, 
  applyEdgeChanges, 
  addEdge,
  useStoreApi,
  ReactFlowProvider 
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import UmberNode from './UmberNode';
import NestNode from './NestNode';
import ItemNode from './ItemNode';

// Define custom node types
const nodeTypes = {
  umber: UmberNode,
  nest: NestNode,
  item: ItemNode,
};

// Initial demo data - styled for your system
const initialNodes = [
  {
    id: 'umber-1',
    type: 'umber',
    position: { x: 250, y: 100 },
    data: { 
      label: 'My Skincare', 
      category: 'Beauty & Personal Care',
      itemCount: 5 
    },
  },
];

const initialEdges = [];

function MindMapFlow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const connectingNodeId = useRef(null);
  const store = useStoreApi();

  // Handle node changes (drag, select, etc.)
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  // Handle edge changes
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  // Handle new connections
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({
      ...params,
      style: { 
        stroke: 'var(--color-moss-600)', 
        strokeWidth: 2,
        opacity: 0.8
      },
      type: 'smoothstep',
    }, eds)),
    []
  );

  // Start connection tracking
  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  // Handle connection end - create new nodes when dropping on empty space
  const onConnectEnd = useCallback((event) => {
    const { nodeLookup } = store.getState();
    const targetIsPane = event.target.classList.contains('react-flow__pane');
    
    if (targetIsPane && connectingNodeId.current) {
      const parentNode = nodeLookup.get(connectingNodeId.current);
      
      if (parentNode) {
        // Calculate position for new node
        const panePosition = {
          x: event.clientX,
          y: event.clientY,
        };
        
        // Create new node based on parent type
        const newNode = createChildNode(parentNode, panePosition);
        const newEdge = {
          id: `${parentNode.id}-${newNode.id}`,
          source: parentNode.id,
          target: newNode.id,
          sourceHandle: getSourceHandle(parentNode.type),
          style: { 
            stroke: getEdgeColor(parentNode.type), 
            strokeWidth: 2,
            opacity: 0.8
          },
          type: 'smoothstep',
        };

        setNodes((nds) => [...nds, newNode]);
        setEdges((eds) => [...eds, newEdge]);
      }
    }
    
    connectingNodeId.current = null;
  }, [store]);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        nodeTypes={nodeTypes}
        fitView
        nodeOrigin={[0.5, 0.5]}
        className="bg-gradient-to-br from-umber-50 via-white to-moss-50 dark:from-umber-900 dark:via-umber-800 dark:to-moss-900 transition-colors duration-300"
        connectionLineStyle={{
          stroke: 'var(--color-moss-600)',
          strokeWidth: 2,
          strokeDasharray: '5,5',
          opacity: 0.6,
        }}
      >
        <Background 
          variant="dots" 
          gap={24} 
          size={1.5} 
          className="opacity-30 dark:opacity-20"
          color="var(--color-moss-400)"
        />
        <Controls 
          showInteractive={false}
          className="!bg-white/90 dark:!bg-umber-800/90 !border !border-moss-200 dark:!border-moss-700 !shadow-lg !backdrop-blur-sm"
          style={{
            button: {
              backgroundColor: 'transparent',
              border: 'none',
              color: 'var(--color-moss-700)',
            }
          }}
        />
      </ReactFlow>
    </div>
  );
}

// Helper function to create child nodes with proper theming
function createChildNode(parentNode, position) {
  const nodeId = `${parentNode.type}-child-${Date.now()}`;
  
  // Determine child node type based on parent
  let childType, childData;
  
  if (parentNode.type === 'umber') {
    childType = 'nest';
    childData = {
      label: 'New Nest',
      itemCount: 0,
    };
  } else if (parentNode.type === 'nest') {
    childType = 'item';
    childData = {
      label: 'New Item',
      price: null,
      url: null,
    };
  } else {
    // Items can have sub-items
    childType = 'item';
    childData = {
      label: 'Sub Item',
      price: null,
      url: null,
    };
  }

  return {
    id: nodeId,
    type: childType,
    position: {
      x: position.x - 50, // Offset from cursor
      y: position.y - 25,
    },
    data: childData,
    parentNode: parentNode.id, // This enables hierarchical movement
  };
}

// Helper to get the correct source handle
function getSourceHandle(nodeType) {
  switch (nodeType) {
    case 'umber':
      return 'nest-connection';
    case 'nest':
      return 'item-connection';
    default:
      return undefined;
  }
}

// Helper to get edge colors based on connection type
function getEdgeColor(nodeType) {
  switch (nodeType) {
    case 'umber':
      return 'var(--color-moss-600)';
    case 'nest':
      return 'var(--color-ochre-600)';
    default:
      return 'var(--color-umber-600)';
  }
}

// Main component with provider
export function MindMapCanvas() {
  return (
    <ReactFlowProvider>
      <MindMapFlow />
    </ReactFlowProvider>
  );
}

export default MindMapCanvas;
