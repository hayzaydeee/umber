import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  Panel,
  MiniMap,
  useStoreApi,
  useOnSelectionChange,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion } from 'motion/react';
import { PlusIcon, HomeIcon, EyeOpenIcon, ZoomInIcon, ZoomOutIcon, TargetIcon } from '@radix-ui/react-icons';

import UmberNode from './nodes/UmberNode';
import UmberEdge from './edges/UmberEdge';
import MindMapToolbar from './MindMapToolbar';
import NodeDetailsPanel from './NodeDetailsPanel';
import { useMindMapData } from '../../hooks/useMindMapData';
import { useUIState } from '../../contexts/UIContext';

// Node and edge types for React Flow
const nodeTypes = {
  umber: UmberNode,
};

const edgeTypes = {
  umber: UmberEdge,
};

// Default viewport settings
const defaultViewport = { x: 0, y: 0, zoom: 1 };

/**
 * MindMapCanvas - The core visualization component for umbers
 * 
 * Features:
 * - Interactive node-based visualization of umbers and their relationships
 * - Custom nodes with umber theming and data
 * - Smooth animations and transitions
 * - Toolbar with essential controls
 * - Integration with existing onboarding and UI systems
 * - Responsive design with proper scaling
 */
function MindMapCanvas() {
  const { data: mindMapData, loading, error, refreshData } = useMindMapData();
  const { elements } = useUIState();
  
  // React Flow state
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // UI state
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [showMiniMap, setShowMiniMap] = useState(true);
  const [backgroundVariant, setBackgroundVariant] = useState(BackgroundVariant.Dots);
  
  // References
  const connectingNodeId = useRef(null);
  const reactFlowWrapper = useRef(null);
  
  // React Flow instance
  const { 
    project, 
    getViewport, 
    setViewport, 
    fitView, 
    zoomIn, 
    zoomOut, 
    zoomTo 
  } = useReactFlow();
  const store = useStoreApi();

  // Handle selection changes
  useOnSelectionChange({
    onChange: ({ nodes: selectedNodes }) => {
      setSelectedNodes(selectedNodes);
    },
  });

  // Transform API data into React Flow nodes and edges
  const transformMindMapData = useCallback((data) => {
    if (!data?.mindMapData) return { nodes: [], edges: [] };

    const transformedNodes = [];
    const transformedEdges = [];

    data.mindMapData.forEach((umber, index) => {
      // Calculate position - arrange in a circular pattern initially
      const angle = (index / data.mindMapData.length) * 2 * Math.PI;
      const radius = Math.max(200, data.mindMapData.length * 30);
      const x = umber.mindMapPosition?.x ?? Math.cos(angle) * radius;
      const y = umber.mindMapPosition?.y ?? Math.sin(angle) * radius;

      // Create umber node
      const umberNode = {
        id: umber._id,
        type: 'umber',
        position: { x, y },
        data: {
          label: umber.name,
          description: umber.description,
          icon: umber.icon,
          color: umber.color,
          totalItems: umber.totalItems || 0,
          totalValue: umber.totalValue || 0,
          nests: umber.nests || [],
          isUmber: true,
        },
        draggable: true,
        selectable: true,
      };

      transformedNodes.push(umberNode);

      // Create nest nodes connected to this umber
      if (umber.nests && umber.nests.length > 0) {
        umber.nests.forEach((nest, nestIndex) => {
          const nestAngle = angle + (nestIndex - (umber.nests.length - 1) / 2) * 0.3;
          const nestRadius = radius * 0.6;
          const nestX = x + Math.cos(nestAngle) * nestRadius;
          const nestY = y + Math.sin(nestAngle) * nestRadius;

          const nestNode = {
            id: nest._id,
            type: 'umber',
            position: { x: nestX, y: nestY },
            data: {
              label: nest.name,
              totalItems: nest.totalItems || 0,
              parentUmber: umber.name,
              isNest: true,
            },
            draggable: true,
            selectable: true,
            parentNode: umber._id,
          };

          transformedNodes.push(nestNode);

          // Create edge between umber and nest
          const nestEdge = {
            id: `${umber._id}-${nest._id}`,
            source: umber._id,
            target: nest._id,
            type: 'umber',
            animated: false,
            style: { stroke: '#6B7D67', strokeWidth: 2 },
          };

          transformedEdges.push(nestEdge);
        });
      }
    });

    return { nodes: transformedNodes, edges: transformedEdges };
  }, []);

  // Update nodes and edges when data changes
  useEffect(() => {
    if (mindMapData && !loading) {
      const { nodes: newNodes, edges: newEdges } = transformMindMapData(mindMapData);
      setNodes(newNodes);
      setEdges(newEdges);
      setIsLoaded(true);
      
      // Fit view after a short delay to ensure nodes are rendered
      setTimeout(() => {
        fitView({ duration: 800, padding: 0.1 });
      }, 100);
    }
  }, [mindMapData, loading, transformMindMapData, setNodes, setEdges, fitView]);

  // Handle connection events for creating new relationships
  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback((event) => {
    const targetIsPane = event.target.classList.contains('react-flow__pane');
    
    if (targetIsPane && connectingNodeId.current) {
      // Create new umber at dropped position
      const { nodeLookup } = store.getState();
      const parentNode = nodeLookup.get(connectingNodeId.current);
      
      if (parentNode && reactFlowWrapper.current) {
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const position = project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const newNodeId = `new-${Date.now()}`;
        const newNode = {
          id: newNodeId,
          type: 'umber',
          position,
          data: {
            label: 'New Umber',
            description: 'Click to edit',
            totalItems: 0,
            totalValue: 0,
            isUmber: true,
            isNew: true,
          },
          draggable: true,
          selectable: true,
        };

        const newEdge = {
          id: `${connectingNodeId.current}-${newNodeId}`,
          source: connectingNodeId.current,
          target: newNodeId,
          type: 'umber',
          animated: true,
          style: { stroke: '#6B7D67', strokeWidth: 2 },
        };

        setNodes((nds) => [...nds, newNode]);
        setEdges((eds) => [...eds, newEdge]);
      }
    }

    connectingNodeId.current = null;
  }, [project, store, setNodes, setEdges]);

  // Handle regular connections between existing nodes
  const onConnect = useCallback((params) => {
    const newEdge = {
      ...params,
      type: 'umber',
      animated: false,
      style: { stroke: '#6B7D67', strokeWidth: 2 },
    };
    setEdges((eds) => addEdge(newEdge, eds));
  }, [setEdges]);

  // Toolbar actions
  const handleFitView = useCallback(() => {
    fitView({ duration: 800, padding: 0.1 });
  }, [fitView]);

  const handleZoomIn = useCallback(() => {
    zoomIn({ duration: 200 });
  }, [zoomIn]);

  const handleZoomOut = useCallback(() => {
    zoomOut({ duration: 200 });
  }, [zoomOut]);

  const handleResetZoom = useCallback(() => {
    zoomTo(1, { duration: 500 });
  }, [zoomTo]);

  const toggleMiniMap = useCallback(() => {
    setShowMiniMap(prev => !prev);
  }, []);

  const toggleBackground = useCallback(() => {
    setBackgroundVariant(prev => 
      prev === BackgroundVariant.Dots ? BackgroundVariant.Lines : BackgroundVariant.Dots
    );
  }, []);

  // Handle loading and error states
  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-moss-50 via-white to-ochre-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-moss-500 border-t-transparent rounded-full"
        />
        <span className="ml-3 text-umber-600">Loading your mind map...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-moss-50 via-white to-ochre-50">
        <div className="text-center">
          <div className="text-umber-800 text-lg font-medium mb-2">Unable to load mind map</div>
          <div className="text-umber-600 text-sm mb-4">{error}</div>
          <button
            onClick={refreshData}
            className="px-4 py-2 bg-moss-500 text-white rounded-lg hover:bg-moss-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative bg-gradient-to-br from-moss-50 via-white to-ochre-50" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultViewport={defaultViewport}
        minZoom={0.1}
        maxZoom={2}
        attributionPosition="bottom-left"
        className="mind-map-canvas"
        fitView
        fitViewOptions={{ padding: 0.1 }}
      >
        {/* Background Pattern */}
        <Background 
          variant={backgroundVariant}
          gap={20}
          size={1}
          color="#C8BCA8"
          style={{ opacity: 0.3 }}
        />

        {/* Controls */}
        <Controls
          position="bottom-right"
          className="bg-white/90 backdrop-blur-sm border border-umber-200 rounded-xl shadow-lg"
          showInteractive={false}
        />

        {/* MiniMap */}
        {showMiniMap && (
          <MiniMap
            position="bottom-left"
            className="bg-white/90 backdrop-blur-sm border border-umber-200 rounded-xl shadow-lg"
            maskColor="#F7F6F4"
            nodeColor={(node) => {
              if (node.data?.isUmber) return '#6B7D67';
              if (node.data?.isNest) return '#B8915F';
              return '#998772';
            }}
            nodeStrokeWidth={2}
            zoomable
            pannable
          />
        )}

        {/* Custom Toolbar */}
        <Panel position="top-center">
          <MindMapToolbar
            onFitView={handleFitView}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onResetZoom={handleResetZoom}
            onToggleMiniMap={toggleMiniMap}
            onToggleBackground={toggleBackground}
            showMiniMap={showMiniMap}
            backgroundVariant={backgroundVariant}
            isLoaded={isLoaded}
          />
        </Panel>

        {/* Welcome message for empty state */}
        {isLoaded && nodes.length === 0 && (
          <Panel position="top-center" className="mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/90 backdrop-blur-sm border border-umber-200 rounded-xl shadow-lg p-6 max-w-md text-center"
            >
              <EyeOpenIcon className="w-12 h-12 text-moss-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-umber-800 mb-2">Your Mind Map Awaits</h3>
              <p className="text-umber-600 text-sm">
                Start creating umbers to see them visualized here. Each umber becomes a node in your personal knowledge map.
              </p>
            </motion.div>
          </Panel>
        )}
      </ReactFlow>

      {/* Node Details Panel */}
      {selectedNodes.length > 0 && (
        <NodeDetailsPanel
          selectedNode={selectedNodes[0]}
          onClose={() => setSelectedNodes([])}
        />
      )}
    </div>
  );
}

/**
 * MindMapCanvasProvider - Wrapper component that provides React Flow context
 */
function MindMapCanvasProvider(props) {
  return (
    <ReactFlowProvider>
      <MindMapCanvas {...props} />
    </ReactFlowProvider>
  );
}

export default MindMapCanvasProvider;
