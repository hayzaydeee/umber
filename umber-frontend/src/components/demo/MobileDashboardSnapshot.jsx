import React from "react";
import { motion } from "motion/react";
import { PlusIcon, DotsHorizontalIcon, HomeIcon, MagnifyingGlassIcon, PersonIcon } from "@radix-ui/react-icons";
import UmberText from "../ui/UmberText";

function MobileDashboardSnapshot() {
  const categories = [
    {
      name: "Books",
      items: 8,
      total: "£127.20",
      color: "moss",
      bgGradient: "from-moss-50 to-moss-100"
    },
    {
      name: "Tech",
      items: 5,
      total: "£1,247.99",
      color: "ochre",
      bgGradient: "from-ochre-50 to-ochre-100"
    }
  ];

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Mobile Phone Frame */}
      <div className="bg-gray-900 rounded-3xl p-2 shadow-2xl">
        <div className="bg-white rounded-2xl overflow-hidden">
          {/* Status Bar */}
          <div className="bg-white px-4 py-2 flex justify-between items-center text-xs">
            <span className="font-medium">9:41</span>
            <div className="flex gap-1">
              <div className="w-4 h-2 bg-gray-300 rounded-sm"></div>
              <div className="w-1 h-2 bg-gray-300 rounded-sm"></div>
            </div>
          </div>

          {/* App Header */}
          <div className="px-4 py-3 border-b border-umber-100">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-display font-semibold text-umber-800">
                <UmberText>umber</UmberText>
              </h1>
              <DotsHorizontalIcon className="w-5 h-5 text-umber-600" />
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            <div className="text-sm text-umber-600 mb-2">Your Umbers</div>
            
            {categories.map((category) => (
              <motion.div
                key={category.name}
                className={`bg-gradient-to-r ${category.bgGradient} rounded-xl p-3 border border-${category.color}-200`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-umber-800 text-sm">
                    <UmberText>{category.name}</UmberText>
                  </h3>
                  <span className={`text-xs px-2 py-1 bg-${category.color}-200 text-${category.color}-800 rounded-full`}>
                    {category.items} items
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-umber-800">
                    {category.total}
                  </span>
                  <PlusIcon className={`w-4 h-4 text-${category.color}-600`} />
                </div>
              </motion.div>
            ))}

            {/* Add New Button */}
            <div className="border-2 border-dashed border-umber-300 rounded-xl p-3 flex items-center justify-center">
              <div className="flex items-center gap-2 text-umber-600">
                <PlusIcon className="w-4 h-4" />
                <span className="text-sm font-medium">New Umber</span>
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="border-t border-umber-100 p-3">
            <div className="flex justify-around">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 bg-moss-600 rounded-lg mb-1 flex items-center justify-center">
                  <HomeIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs text-moss-700 font-medium">Home</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 bg-umber-300 rounded-lg mb-1 flex items-center justify-center">
                  <MagnifyingGlassIcon className="w-4 h-4 text-umber-600" />
                </div>
                <span className="text-xs text-umber-600">Search</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 bg-umber-300 rounded-lg mb-1 flex items-center justify-center">
                  <PersonIcon className="w-4 h-4 text-umber-600" />
                </div>
                <span className="text-xs text-umber-600">Profile</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileDashboardSnapshot;
