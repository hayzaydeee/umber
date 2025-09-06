import { motion } from "motion/react";
import UmberText from "../ui/UmberText";
import DashboardSnapshot from "../demo/DashboardSnapshot";
import MobileDashboardSnapshot from "../demo/MobileDashboardSnapshot";

function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-screen bg-gradient-to-b from-umber-50/20 to-moss-50 py-12 md:py-20"
    >
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
            <span className="text-moss-700 text-sm font-medium">
             💡about us
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-umber-800 mb-6">
            <UmberText>what's umber?</UmberText>
          </h2>
          <p className="text-lg sm:text-xl text-umber-600 max-w-3xl mx-auto leading-relaxed">
            <UmberText>
              umber is a contemplative approach to wishlist management. we
              believe in mindful consumption and the beauty of organized desire.
            </UmberText>
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center mb-12 md:mb-20">
          {/* Mobile: Dashboard Only, Desktop: Dashboard + Why Umber */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative lg:order-2 order-1"
          >
            <div className="relative">
              {/* Desktop Dashboard */}
              <div className="hidden lg:block">
                <DashboardSnapshot />
              </div>
              
              {/* Mobile Dashboard */}
              <div className="lg:hidden">
                <MobileDashboardSnapshot />
              </div>
            </div>
          </motion.div>

          {/* Text Content - Desktop Only */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="hidden lg:block lg:order-1"
          >
            <h3 className="text-3xl font-display font-semibold text-umber-800 mb-6">
              <UmberText>why umber?</UmberText>
            </h3>
            <div className="space-y-6 text-umber-700">
              <p className="text-lg leading-relaxed">
                  in a world of endless options and impulse purchases, umber
                  provides a peaceful space to curate your desires. Our platform
                  encourages reflection before action, helping you understand
                  what truly matters.
              </p>
              <div className="my-8 text-center">
                <p className="text-xl text-umber-800 bg-gradient-to-r from-moss-100 to-ochre-100 rounded-xl px-6 py-4 border border-moss-200">
                  we call it: <span className="text-xl font-bold text-moss-700 italic font-family-display">contemplative commerce</span>
                </p>
              </div>
              <p className="text-lg leading-relaxed">
                  create your first umber today and experience the difference thoughtful desire makes. 
                  do it for your focus, and your finances.
                </p>
              <p className="text-lg leading-relaxed">
                  the name "umber" represents the earth-toned, grounded approach
                  we take to consumption - natural, considered, and beautiful.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Philosophy Section - Desktop Only */}
        <motion.div
          className="hidden lg:block bg-umber-800 rounded-2xl p-12 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-display font-semibold text-moss-200 mb-6">
            <UmberText>our philosophy</UmberText>
          </h3>
          <p className="text-xl text-moss-100 max-w-4xl mx-auto leading-relaxed mb-8 ">
              <UmberText>"The space between wanting something and buying it is where wisdom lives. umber gives you that space."</UmberText>
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-moss-300">
            <span className="px-4 py-2 bg-moss-800/30 rounded-full text-sm">
              <UmberText>mindful curation</UmberText>
            </span>
            <span className="px-4 py-2 bg-moss-800/30 rounded-full text-sm">
              <UmberText>sustainable choices</UmberText>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutSection;
