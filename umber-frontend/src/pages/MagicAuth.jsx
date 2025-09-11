import React from 'react';
import { motion } from 'motion/react';
import MagicAuthForm from '../components/auth/MagicAuthForm';

const MagicAuth = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-umber-50 to-umber-100 flex items-center justify-center p-4">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-umber-800 mb-4">
            🌿 Umber
          </h1>
          <p className="text-umber-600 text-lg">
            Organize your world, one collection at a time
          </p>
        </motion.div>
        
        <MagicAuthForm />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-500">
            New to Umber? No worries! Just enter your email and we'll create your account.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default MagicAuth;
