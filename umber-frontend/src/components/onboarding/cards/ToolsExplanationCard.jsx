import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Button from '../../ui/Button';
import UmberText from '../../ui/UmberText';

const ToolsExplanationCard = ({ 
  title,
  description,
  tools = [],
  onComplete 
}) => {
  const [currentTool, setCurrentTool] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const toolInfo = {
    mindmap: {
      icon: '🗺️',
      name: 'mind map',
      description: 'visual overview of all your umbers, nests, and items',
      benefit: 'see connections and navigate quickly'
    },
    search: {
      icon: '🔍',
      name: 'search',
      description: 'find anything across all your umbers instantly',
      benefit: 'never lose track of your saved items'
    },
    insights: {
      icon: '📊',
      name: 'insights',
      description: 'discover patterns and trends in your collection',
      benefit: 'understand your interests better'
    },
    export: {
      icon: '📤',
      name: 'export',
      description: 'share your umbers or backup your data',
      benefit: 'keep your data safe and shareable'
    }
  };

  const handleStart = () => {
    setHasStarted(true);
  };

  const handleNext = () => {
    if (currentTool < tools.length - 1) {
      setCurrentTool(currentTool + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentTool > 0) {
      setCurrentTool(currentTool - 1);
    }
  };

  if (!hasStarted) {
    return (
      <div className="p-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <UmberText variant="h3" className="text-umber-800 mb-3">
            {title}
          </UmberText>
          <UmberText variant="body" className="text-umber-600 mb-6">
            {description}
          </UmberText>
        </motion.div>

        {/* Tools Preview Grid */}
        <motion.div
          className="grid grid-cols-2 gap-3 mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          {tools.map((tool, index) => (
            <motion.div
              key={tool}
              className="p-3 bg-umber-50 rounded-lg border border-umber-200"
              whileHover={{ scale: 1.02 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-2xl mb-1">{toolInfo[tool]?.icon}</div>
              <UmberText variant="small" className="font-medium text-umber-800">
                {toolInfo[tool]?.name}
              </UmberText>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button onClick={handleStart} className="px-8 py-3">
            explore tools
          </Button>
        </motion.div>
      </div>
    );
  }

  const tool = toolInfo[tools[currentTool]];

  return (
    <div className="p-8">
      {/* Progress Indicator */}
      <div className="flex justify-center mb-6">
        <div className="flex space-x-2">
          {tools.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentTool ? 'bg-umber-500' : 'bg-umber-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Tool Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTool}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          {/* Tool Icon */}
          <motion.div
            className="text-6xl mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
          >
            {tool.icon}
          </motion.div>

          {/* Tool Name */}
          <UmberText variant="h3" className="text-umber-800 mb-3">
            {tool.name}
          </UmberText>

          {/* Tool Description */}
          <UmberText variant="body" className="text-umber-600 mb-4 leading-relaxed">
            {tool.description}
          </UmberText>

          {/* Benefit Highlight */}
          <motion.div
            className="bg-umber-50 rounded-lg p-4 mb-6 border border-umber-200"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <UmberText variant="small" className="text-umber-700 font-medium">
              💡 {tool.benefit}
            </UmberText>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={handlePrevious}
          disabled={currentTool === 0}
          className="px-4 py-2"
        >
          previous
        </Button>

        <UmberText variant="small" className="text-umber-500">
          {currentTool + 1} of {tools.length}
        </UmberText>

        <Button
          onClick={handleNext}
          className="px-6 py-2"
        >
          {currentTool === tools.length - 1 ? 'finish' : 'next'}
        </Button>
      </div>
    </div>
  );
};

export default ToolsExplanationCard;
