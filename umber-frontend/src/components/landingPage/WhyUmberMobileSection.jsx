import React from "react";
import { motion } from "motion/react";
import UmberText from "../ui/UmberText";

function WhyUmberMobileSection() {
  return (
    <section className="lg:hidden bg-gradient-to-b from-white via-umber-50 to-moss-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Why Umber Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-moss-100 rounded-full px-4 py-2 mb-6">
            <span className="text-moss-700 text-sm font-medium">
              🤔 Why Choose Us
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-semibold text-umber-800 mb-6">
            <UmberText>why umber?</UmberText>
          </h2>
          <div className="space-y-4 text-umber-700 max-w-2xl mx-auto">
            <p className="text-sm sm:text-base leading-relaxed">
              <UmberText>
                in a world of endless options and impulse purchases, umber
                provides a peaceful space to curate your desires. Our platform
                encourages reflection before action, helping you understand what
                truly matters.
              </UmberText>
            </p>
            <p className="text-sm sm:text-base leading-relaxed">
              <UmberText>
                whether you're building a reading list, tracking tech gadgets,
                or organizing beauty products, umber turns wishful thinking into
                thoughtful planning.
              </UmberText>
            </p>
            <p className="text-sm sm:text-base leading-relaxed">
              <UmberText>
                the name "umber" represents the grounded approach we take to
                consumption - natural, considered, and beautiful.
              </UmberText>
            </p>
          </div>
        </motion.div>

        {/* Philosophy Section */}
        <motion.div
          className="bg-umber-800 rounded-xl p-6 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl sm:text-2xl font-display font-semibold text-moss-200 mb-4">
            <UmberText>Our Philosophy</UmberText>
          </h3>
          <p className="text-base sm:text-lg text-moss-100 max-w-3xl mx-auto leading-relaxed mb-6">
            <UmberText>
              The space between wanting something and buying it is where wisdom
              lives. umber gives you that space.
            </UmberText>
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-moss-300">
            <span className="px-3 py-2 bg-moss-800/30 rounded-full text-sm">
              <UmberText>Mindful Curation</UmberText>
            </span>
            <span className="px-3 py-2 bg-moss-800/30 rounded-full text-sm">
              <UmberText>Thoughtful Design</UmberText>
            </span>
            <span className="px-3 py-2 bg-moss-800/30 rounded-full text-sm">
              <UmberText>Sustainable Choices</UmberText>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default WhyUmberMobileSection;
