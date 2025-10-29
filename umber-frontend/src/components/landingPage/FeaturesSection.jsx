import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import UmberText from "../ui/UmberText";
import Button from "../ui/Button";
import {mainFeatures, miniFeatures} from "../../data/Features.jsx";

function FeaturesSection() {
  const navigate = useNavigate();
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [clickedFeature, setClickedFeature] = useState(null);

  // Auto-dismiss clicked state after 3 seconds
  React.useEffect(() => {
    if (clickedFeature !== null) {
      const timer = setTimeout(() => {
        setClickedFeature(null);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [clickedFeature]);

  const handleFeatureClick = (index) => {
    setClickedFeature(clickedFeature === index ? null : index);
  };

  const isFeatureActive = (index) => {
    return clickedFeature === index || hoveredFeature === index;
  };


  return (
    <section id="features" className="bg-gradient-to-b from-ochre-50 via-white to-moss-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-moss-100 rounded-full px-4 py-2 mb-6">
            <span className="text-moss-700 text-sm font-medium">✨ Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-umber-800 mb-6">
            <UmberText>your all-purpose wishlist app</UmberText>
          </h2>
          <p className="text-lg sm:text-xl text-umber-600 max-w-3xl mx-auto leading-relaxed">
            <UmberText>
              discover a variety of our advanced features.
            </UmberText>
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`bg-gradient-to-br ${feature.bgGradient} rounded-2xl md:rounded-3xl p-6 md:p-8 border ${feature.borderColor} hover:shadow-xl transition-all duration-300`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm ${feature.borderColor} border`}>
                  <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl md:text-2xl font-display font-semibold text-umber-800">
                      <UmberText>{feature.title}</UmberText>
                    </h3>
                    {feature.comingSoon && (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gradient-to-r from-ochre-100 to-ochre-200 text-ochre-800 rounded-full border border-ochre-300">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <p className="text-sm md:text-base text-umber-700 leading-relaxed">
                    <UmberText>{feature.description}</UmberText>
                  </p>
                </div>
              </div>
              
              {/* Feature Mockup */}
              <div className="flex justify-center">
                {feature.mockup}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mini Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl md:text-3xl font-display font-bold text-umber-800 mb-12">
            <UmberText>...and so much more!</UmberText>
          </h3>
        </motion.div>

        {/* Mini Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
          {miniFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-umber-100 hover:shadow-lg transition-all duration-300 text-center cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, scale: 1.02 }}
              onHoverStart={() => setHoveredFeature(index)}
              onHoverEnd={() => setHoveredFeature(null)}
              onClick={() => handleFeatureClick(index)}
            >
              <div className="relative h-16 flex items-center justify-center mb-3">
                <AnimatePresence mode="wait">
                  {!isFeatureActive(index) ? (
                    <motion.div
                      key="icon"
                      className="w-12 h-12 bg-umber-100 rounded-xl flex items-center justify-center"
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.8 }}
                      transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
                    >
                      <feature.icon className="w-6 h-6 text-umber-600" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="content"
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
                    >
                      <div className="flex items-center justify-center gap-2 mb-2 mt-5">
                        <motion.h4 
                          className="font-semibold text-umber-800 text-sm md:text-base"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: 0.1 }}
                        >
                          <UmberText>{feature.title}</UmberText>
                        </motion.h4>
                        {feature.comingSoon && (
                          <motion.span 
                            className="inline-flex items-center px-1.5 py-0.5 text-xs font-medium bg-gradient-to-r from-ochre-100 to-ochre-200 text-ochre-800 rounded-full border border-ochre-300"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2, delay: 0.15 }}
                          >
                            Coming Soon
                          </motion.span>
                        )}
                      </div>
                      <motion.p 
                        className="text-xs md:text-sm text-umber-600"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.2 }}
                      >
                        <UmberText>{feature.description}</UmberText>
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Default state title (hidden on hover/click) */}
              <AnimatePresence>
                {!isFeatureActive(index) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="relative"
                  >
                    <h4 className="font-semibold text-umber-800 mb-1 text-sm md:text-base">
                      <UmberText>{feature.title}</UmberText>
                    </h4>
                    {feature.comingSoon && (
                      <span className="inline-flex items-center px-1.5 py-0.5 text-xs font-medium bg-gradient-to-r from-ochre-100 to-ochre-200 text-ochre-800 rounded-full border border-ochre-300 mt-1">
                        Coming Soon
                      </span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        {/* <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Button 
            variant="contemplative"
            size="md"
            onClick={() => navigate('/auth')}}
            className="px-8 py-4"
          >
            <UmberText>try them out →</UmberText>
          </Button>
        </motion.div> */}
      </div>
    </section>
  );
}

export default FeaturesSection;
