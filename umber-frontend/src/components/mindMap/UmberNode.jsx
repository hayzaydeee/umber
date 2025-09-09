import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';

export function UmberNode({ id, data, selected }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`
        relative group cursor-pointer
        bg-gradient-to-br from-moss-100 to-moss-200 
        dark:from-moss-800 dark:to-moss-900
        border-2 border-moss-300 dark:border-moss-600
        rounded-xl shadow-lg hover:shadow-xl
        transition-all duration-200
        min-w-[140px] min-h-[90px] p-4
        ${selected ? 'ring-2 ring-moss-500 ring-offset-2 dark:ring-offset-umber-900' : ''}
      `}
    >
      {/* Umber Icon - Using your button styling patterns */}
      <div className="absolute -top-3 -left-3 w-8 h-8 
        bg-gradient-to-r from-moss-600 to-moss-700 
        dark:from-moss-500 dark:to-moss-600
        rounded-full flex items-center justify-center 
        shadow-md border-2 border-white dark:border-umber-800">
        <span className="text-white font-semibold text-sm font-display">U</span>
      </div>

      {/* Content - Using your typography system */}
      <div className="text-center pt-1">
        <h3 className="font-display font-semibold text-moss-900 dark:text-moss-100 text-sm mb-1 leading-tight">
          {data.label}
        </h3>
        <p className="font-body text-moss-700 dark:text-moss-300 text-xs">
          {data.category}
        </p>
        {data.itemCount && (
          <p className="font-body text-moss-600 dark:text-moss-400 text-xs mt-1 font-medium">
            {data.itemCount} items
          </p>
        )}
      </div>

      {/* Handles - Styled to match your system */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-moss-400 dark:!bg-moss-500 !border-2 !border-moss-600 dark:!border-moss-400 hover:!scale-110 transition-transform"
        style={{ top: -6 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-moss-400 dark:!bg-moss-500 !border-2 !border-moss-600 dark:!border-moss-400 hover:!scale-110 transition-transform"
        style={{ bottom: -6 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="nest-connection"
        className="!w-3 !h-3 !bg-moss-400 dark:!bg-moss-500 !border-2 !border-moss-600 dark:!border-moss-400 hover:!scale-110 transition-transform"
        style={{ right: -6 }}
      />
    </motion.div>
  );
}

export default UmberNode;
