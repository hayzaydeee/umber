import React from "react";
import { motion } from "motion/react";
import UmberText from "../ui/UmberText";
import Button from "../ui/Button";
import { PlusIcon, BookmarkIcon, ArchiveIcon } from "@radix-ui/react-icons";

function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "create an umber",
      description: "start by creating your first umber - a collection for any category of items you desire. Books, tech, fashion, or anything else.",
      icon: PlusIcon,
      visual: (
        <div className="bg-gradient-to-br from-moss-100 to-moss-200 rounded-2xl p-4 md:p-6 h-40 md:h-48 flex items-center justify-center">
          <div className="bg-white rounded-xl p-3 md:p-4 shadow-sm border border-moss-200 w-full max-w-[180px] md:max-w-[200px]">
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-moss-600 rounded-lg flex items-center justify-center">
                <BookmarkIcon className="w-3 h-3 md:w-4 md:h-4 text-white" />
              </div>
              <div>
                <div className="text-xs md:text-sm font-semibold text-umber-800">Books</div>
                <div className="text-xs text-umber-600">new umber</div>
              </div>
            </div>
            <div className="w-full h-2 bg-moss-100 rounded-full">
              <div className="w-1/4 h-2 bg-moss-600 rounded-full"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      number: "02", 
      title: "add your first item",
      description: "Add items you want to your umber. Include details like price, priority, and notes to help you make mindful decisions.",
      icon: BookmarkIcon,
      visual: (
        <div className="bg-gradient-to-br from-ochre-100 to-ochre-200 rounded-2xl p-4 md:p-6 h-40 md:h-48 flex items-center justify-center">
          <div className="bg-white rounded-xl p-3 md:p-4 shadow-sm border border-ochre-200 w-full max-w-[180px] md:max-w-[200px] space-y-1 md:space-y-2">
            <div className="flex items-center gap-2 p-2 bg-ochre-50 rounded-lg">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-ochre-300 rounded"></div>
              <div className="text-xs">
                <div className="font-medium text-umber-800">Klara and the Sun</div>
                <div className="text-umber-600">£8.99</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-ochre-50 rounded-lg">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-ochre-300 rounded"></div>
              <div className="text-xs">
                <div className="font-medium text-umber-800">Project Hail Mary</div>
                <div className="text-umber-600">£9.99</div>
              </div>
            </div>
            <div className="border-2 border-dashed border-ochre-300 rounded-lg p-2 flex items-center justify-center">
              <PlusIcon className="w-3 h-3 md:w-4 md:h-4 text-ochre-600" />
            </div>
          </div>
        </div>
      )
    },
    {
      number: "03",
      title: "put it in a nest",
      description: "organize items into nests: sub-collections within your umbers. Group by priority, season, or any way that makes sense to you.",
      icon: ArchiveIcon,
      visual: (
        <div className="bg-gradient-to-br from-umber-100 to-umber-200 rounded-2xl p-4 md:p-6 h-40 md:h-48 flex items-center justify-center">
          <div className="bg-white rounded-xl p-3 md:p-4 shadow-sm border border-umber-200 w-full max-w-[180px] md:max-w-[200px]">
            <div className="text-xs font-semibold text-umber-800 mb-2">Books</div>
            <div className="space-y-1 md:space-y-2">
              <div className="bg-umber-50 rounded-lg p-2">
                <div className="text-xs font-medium text-umber-700 mb-1">Must Read</div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-umber-300 rounded-sm"></div>
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-umber-300 rounded-sm"></div>
                </div>
              </div>
              <div className="bg-umber-50 rounded-lg p-2">
                <div className="text-xs font-medium text-umber-700 mb-1">Maybe Later</div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-umber-300 rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="howItWorks" className="min-h-screen bg-gradient-to-b from-moss-50 via-white to-ochre-50 py-12 md:py-20">
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
            <span className="text-moss-700 text-sm font-medium">📚 How it works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-umber-800 mb-6">
            <UmberText>with us, organizing your wants is easy</UmberText>
          </h2>
          <p className="text-lg sm:text-xl text-umber-600 max-w-3xl mx-auto leading-relaxed">
            <UmberText>
              we make managing your wants effortless. start your journey with us in three easy steps:
            </UmberText>
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-umber-100 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Step Number */}
              <div className="text-3xl md:text-4xl font-display font-bold text-umber-300 mb-4">
                {step.number}
              </div>

              {/* Visual Demo */}
              <div className="mb-6">
                {step.visual}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-lg md:text-xl font-display font-semibold text-umber-800 mb-3">
                  <UmberText>{step.title}</UmberText>
                </h3>
                <p className="text-sm md:text-base text-umber-600 leading-relaxed">
                  <UmberText>{step.description}</UmberText>
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button 
            variant="contemplative"
            size="md"
            className="px-8 py-4"
          >
            <UmberText>get started →</UmberText>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
