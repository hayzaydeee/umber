import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';

export function ItemNode({ id, data, selected }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
      className={`
        relative group cursor-pointer
        bg-gradient-to-br from-umber-100 to-umber-200 
        dark:from-umber-700 dark:to-umber-800
        border-2 border-umber-300 dark:border-umber-600
        rounded-md shadow-sm hover:shadow-md
        transition-all duration-200
        min-w-[90px] min-h-[55px] p-2
        ${selected ? 'ring-2 ring-umber-500 ring-offset-2 dark:ring-offset-umber-900' : ''}
      `}
    >
      {/* Item Image or Icon - Consistent with your asset approach */}
      {data.image ? (
        <div className="absolute -top-2 -left-2 w-6 h-6 
          rounded-full overflow-hidden 
          shadow-md border-2 border-white dark:border-umber-900 
          bg-umber-200 dark:bg-umber-600">
          <img 
            src={data.image} 
            alt={data.label}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="absolute -top-2 -left-2 w-6 h-6 
          bg-gradient-to-r from-umber-500 to-umber-600 
          dark:from-umber-400 dark:to-umber-500
          rounded-full flex items-center justify-center 
          shadow-md border-2 border-white dark:border-umber-900">
          <span className="text-white font-semibold text-xs">•</span>
        </div>
      )}

      {/* Content - Using your typography patterns */}
      <div className="text-center pt-1">
        <h5 className="font-body font-medium text-umber-900 dark:text-umber-100 text-xs truncate leading-tight">
          {data.label}
        </h5>
        {data.price && (
          <p className="font-body text-umber-700 dark:text-umber-300 text-xs font-semibold mt-0.5">
            ${data.price}
          </p>
        )}
        {data.url && (
          <div className="text-umber-500 dark:text-umber-400 text-xs mt-0.5">
            <span className="inline-block w-1 h-1 bg-umber-500 dark:bg-umber-400 rounded-full opacity-60"></span>
          </div>
        )}
      </div>

      {/* Handles - Umber themed */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-2 !h-2 !bg-umber-400 dark:!bg-umber-500 !border-2 !border-umber-600 dark:!border-umber-400 hover:!scale-110 transition-transform"
        style={{ left: -4 }}
      />
      
      {/* Optional source handle for sub-items */}
      {data.hasSubItems && (
        <Handle
          type="source"
          position={Position.Right}
          className="!w-2 !h-2 !bg-umber-400 dark:!bg-umber-500 !border-2 !border-umber-600 dark:!border-umber-400 hover:!scale-110 transition-transform"
          style={{ right: -4 }}
        />
      )}
    </motion.div>
  );
}

export default ItemNode;
