import React from 'react';
import { motion } from 'motion/react';
import MagicAuthForm from '../components/auth/MagicAuthForm';
import UmberText from '../components/ui/UmberText';

const MagicAuth = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ochre-50 via-white to-moss-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-4xl font-display font-bold text-umber-800 mb-4">
              <UmberText>umber</UmberText>
            </h1>
            {/* <p className="text-xl font-family-body text-umber-700 mb-2">
              <UmberText>sign in with magic</UmberText>
            </p> */}
            <p className="text-sm text-umber-600">
              <UmberText>no password needed - just your email</UmberText>
            </p>
          </motion.div>
        </div>

        {/* Magic Auth Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl border border-umber-100 p-8"
        >
          <MagicAuthForm />
          
          {/* Footer Note */}
          <div className="mt-6 pt-6 border-t border-umber-200">
            <div className="text-center">
              <p className="text-xs text-umber-500">
                <UmberText>
                  new to umber? just enter your email and we'll create your account automatically
                </UmberText>
              </p>
              <p className="text-xs text-umber-400 mt-1">
                <UmberText>
                  magic links expire after 15 minutes for your security
                </UmberText>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MagicAuth;
