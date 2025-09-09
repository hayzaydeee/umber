import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';

export function NestNode({ id, data, selected }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
      className={`
        relative group cursor-pointer
        bg-gradient-to-br from-ochre-100 to-ochre-200 
        dark:from-ochre-800 dark:to-ochre-900
        border-2 border-ochre-300 dark:border-ochre-600
        rounded-lg shadow-md hover:shadow-lg
        transition-all duration-200
        min-w-[110px] min-h-[70px] p-3
        ${selected ? 'ring-2 ring-ochre-500 ring-offset-2 dark:ring-offset-umber-900' : ''}
      `}
    >
      {/* Nest Icon - Complementary to Umber styling */}
      <div className="absolute -top-2 -left-2 w-6 h-6 
        bg-gradient-to-r from-ochre-600 to-ochre-700 
        dark:from-ochre-500 dark:to-ochre-600
        rounded-full flex items-center justify-center 
        shadow-md border-2 border-white dark:border-umber-800">
        <span className="text-white font-semibold text-xs font-display">N</span>
      </div>

      {/* Content - Consistent typography */}
      <div className="text-center pt-1">
        <h4 className="font-display font-medium text-ochre-900 dark:text-ochre-100 text-xs mb-1 leading-tight">
          {data.label}
        </h4>
        {data.itemCount && (
          <p className="font-body text-ochre-600 dark:text-ochre-400 text-xs font-medium">
            {data.itemCount} items
          </p>
        )}
      </div>

      {/* Handles - Ochre themed */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-2 !h-2 !bg-ochre-400 dark:!bg-ochre-500 !border-2 !border-ochre-600 dark:!border-ochre-400 hover:!scale-110 transition-transform"
        style={{ left: -4 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="item-connection"
        className="!w-2 !h-2 !bg-ochre-400 dark:!bg-ochre-500 !border-2 !border-ochre-600 dark:!border-ochre-400 hover:!scale-110 transition-transform"
        style={{ right: -4 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2 !h-2 !bg-ochre-400 dark:!bg-ochre-500 !border-2 !border-ochre-600 dark:!border-ochre-400 hover:!scale-110 transition-transform"
        style={{ bottom: -4 }}
      />
    </motion.div>
  );
}

export default NestNode;
