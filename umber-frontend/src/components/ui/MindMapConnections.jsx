import { useState, useEffect } from 'react';

const MindMapConnections = () => {
  const [screenSize, setScreenSize] = useState('desktop');

  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth < 640) {
        setScreenSize('mobile');
      } else if (window.innerWidth < 768) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Configuration for each screen size
  const configs = {
    mobile: {
      viewBox: "0 0 280 160",
      strokeWidth: 2,
      connections: [
        { x1: 120, y1: 70, x2: 40, y2: 32, gradient: "livingGradient", dashArray: "4,2" },
        { x1: 160, y1: 70, x2: 240, y2: 40, gradient: "kitchenGradient", dashArray: "5,2" },
        { x1: 160, y1: 90, x2: 240, y2: 128, gradient: "outdoorGradient", dashArray: "3,3" },
        { x1: 120, y1: 90, x2: 40, y2: 120, gradient: "bedroomGradient", dashArray: "4,2" }
      ]
    },
    tablet: {
      viewBox: "0 0 290 192",
      strokeWidth: 2.5,
      connections: [
        { x1: 125, y1: 86, x2: 50, y2: 44, gradient: "livingGradient", dashArray: "4,2" },
        { x1: 165, y1: 86, x2: 240, y2: 48, gradient: "kitchenGradient", dashArray: "6,2" },
        { x1: 165, y1: 106, x2: 240, y2: 148, gradient: "outdoorGradient", dashArray: "3,3" },
        { x1: 125, y1: 106, x2: 50, y2: 144, gradient: "bedroomGradient", dashArray: "5,2" }
      ]
    },
    desktop: {
      viewBox: "0 0 300 224",
      strokeWidth: 3,
      connections: [
        { x1: 130, y1: 95, x2: 0, y2: 53, gradient: "livingGradient", dashArray: "5,3" },
        { x1: 170, y1: 95, x2: 300, y2: 60, gradient: "kitchenGradient", dashArray: "7,2" },
        { x1: 170, y1: 129, x2: 300, y2: 171, gradient: "outdoorGradient", dashArray: "4,4" },
        { x1: 130, y1: 129, x2: 0, y2: 164, gradient: "bedroomGradient", dashArray: "6,3" }
      ]
    }
  };

  const currentConfig = configs[screenSize];

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox={currentConfig.viewBox}
    >
      {/* Define gradients */}
      <defs>
        <linearGradient id="livingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#84cc16" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#65a30d" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="kitchenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#d97706" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="outdoorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#65a30d" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#16a34a" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="bedroomGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a3a3a3" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#6b7280" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      
      {/* Render connections based on current screen size */}
      {currentConfig.connections.map((connection, index) => (
        <line
          key={index}
          x1={connection.x1}
          y1={connection.y1}
          x2={connection.x2}
          y2={connection.y2}
          stroke={`url(#${connection.gradient})`}
          strokeWidth={currentConfig.strokeWidth}
          strokeDasharray={connection.dashArray}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
};

export default MindMapConnections;
