import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { HomeIcon, ArrowLeftIcon } from '@radix-ui/react-icons';
import UmberText from '../components/ui/UmberText';
import Button from '../components/ui/Button';

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-moss-50 via-white to-ochre-50">
      {/* Simple Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-umber-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold text-umber-800">
            <UmberText>umber</UmberText>
          </h1>
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              <UmberText>Back to home</UmberText>
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
            className="w-24 h-24 bg-gradient-to-r from-moss-500 to-moss-600 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <HomeIcon className="w-12 h-12 text-white" />
          </motion.div>

          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-umber-800 mb-4">
              <UmberText>Welcome to Umber!</UmberText>
            </h1>
            <p className="text-xl text-umber-600 mb-8 max-w-2xl mx-auto">
              <UmberText>
                You've successfully signed in to your contemplative commerce dashboard. 
                Your mindful wishlist journey begins here.
              </UmberText>
            </p>
          </motion.div>

          {/* Coming Soon Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-2xl shadow-xl border border-umber-100 p-8 md:p-12 max-w-2xl mx-auto"
          >
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-umber-800 mb-4">
                <UmberText>Dashboard Coming Soon</UmberText>
              </h2>
              <p className="text-umber-600 mb-6">
                <UmberText>
                  We're crafting a beautiful, contemplative dashboard experience. 
                  Soon you'll be able to create wishlists, organize your desires, 
                  and practice mindful commerce.
                </UmberText>
              </p>
            </div>

            {/* Features Preview */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-moss-50 rounded-lg p-4 text-left">
                <h3 className="font-semibold text-moss-800 mb-2">
                  <UmberText>Smart Wishlists</UmberText>
                </h3>
                <p className="text-sm text-moss-700">
                  <UmberText>Organize desires mindfully</UmberText>
                </p>
              </div>
              <div className="bg-ochre-50 rounded-lg p-4 text-left">
                <h3 className="font-semibold text-ochre-800 mb-2">
                  <UmberText>AI Insights</UmberText>
                </h3>
                <p className="text-sm text-ochre-700">
                  <UmberText>Understand your patterns</UmberText>
                </p>
              </div>
              <div className="bg-umber-50 rounded-lg p-4 text-left">
                <h3 className="font-semibold text-umber-800 mb-2">
                  <UmberText>Mindful Sharing</UmberText>
                </h3>
                <p className="text-sm text-umber-700">
                  <UmberText>Connect with others</UmberText>
                </p>
              </div>
              <div className="bg-moss-50 rounded-lg p-4 text-left">
                <h3 className="font-semibold text-moss-800 mb-2">
                  <UmberText>Contemplative Commerce</UmberText>
                </h3>
                <p className="text-sm text-moss-700">
                  <UmberText>Shop with intention</UmberText>
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <p className="text-sm text-umber-500 mb-4">
                <UmberText>In the meantime, explore our contemplative approach to commerce</UmberText>
              </p>
              <Link to="/">
                <Button variant="contemplative" size="lg">
                  <UmberText>Explore Umber</UmberText>
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-umber-500">
              <UmberText>
                Want to be notified when the dashboard launches?{' '}
                <button className="text-moss-600 hover:text-moss-700 font-medium transition-colors">
                  Join our early access list
                </button>
              </UmberText>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
